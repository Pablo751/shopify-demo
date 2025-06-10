// File: src/services/courierFileGenerator.ts
import { ProcessedItem, DateRange } from '../types';
import { COURIER_CONFIG } from '../config/constants';
import { PropertyExtractor } from '../utils/propertyExtractor';
import { AddressUtils } from '../utils/addressUtils';
import { CsvParser } from '../utils/csvParser';

interface CourierItem {
  Name: string;
  SURNAME: string;
  Address_line_1: string;
  Address_line_2: string;
  Address_line_3: string;
  Postcode: string;
  BarCode: string;
  COUNTRY: string;
  SERVICE: string;
  WEIGHT: number;
  DESCRIPTION: string;
  [key: string]: string | number;
}

export class CourierFileGenerator {
  constructor(
    private addLog: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void
  ) {}

  generateCourierFile(processedItems: ProcessedItem[], dateRange: DateRange): void {
    if (!processedItems || processedItems.length === 0) {
      this.addLog('No processed items available to generate courier file.', 'warning');
      return;
    }

    this.addLog('🚀 Generating Courier Master file with CORRECTED property logic...', 'info');

    const ordersById = this.groupItemsByOrder(processedItems);
    const courierData = this.generateCourierData(ordersById);

    this.addLog(`✅ Generated ${courierData.length} rows for the courier file.`, 'success');
    
    CsvParser.generateCSV(
      courierData, 
      `shopify_courier_master_${dateRange.startDate}_to_${dateRange.endDate}.csv`
    );
  }

  private groupItemsByOrder(items: ProcessedItem[]): Record<string, ProcessedItem[]> {
    return items.reduce((acc, item) => {
      const orderId = item['ORDER ID'];
      if (!acc[orderId]) {
        acc[orderId] = [];
      }
      acc[orderId].push(item);
      return acc;
    }, {} as Record<string, ProcessedItem[]>);
  }

  private generateCourierData(ordersById: Record<string, ProcessedItem[]>): CourierItem[] {
    return Object.values(ordersById).flatMap(itemsInOrder => {
      const orderWeight = this.calculateOrderWeight(itemsInOrder);
      
      return itemsInOrder.map(item => {
        const courierInfo = item._courierData;
        if (!courierInfo) {
          throw new Error(`Missing courier data for item ${item['Item Number']}`);
        }

        const postcode = (courierInfo.shippingAddress.zip || '').trim().toUpperCase();
        const isHighlands = COURIER_CONFIG.HIGHLANDS_AND_ISLANDS_POSTCODES.some(
          prefix => postcode.startsWith(prefix)
        );
        const service = isHighlands 
          ? COURIER_CONFIG.STANDARD_SERVICE_NAME 
          : COURIER_CONFIG.NEXT_DAY_SERVICE_NAME;
        
        const shuffledAddr = AddressUtils.shuffleAddress(courierInfo.shippingAddress);

        return {
          'Name': courierInfo.customerFirstName,
          'SURNAME': courierInfo.customerLastName || '..',
          'Address_line_1': shuffledAddr[0],
          'Address_line_2': shuffledAddr[1],
          'Address_line_3': shuffledAddr[2],
          'Postcode': postcode,
          'BarCode': item['ORDER ID'],
          'COUNTRY': courierInfo.shippingAddress.country_code,
          'SERVICE': service,
          'WEIGHT': orderWeight,
          'DESCRIPTION': 'Car Mats',
        };
      });
    });
  }

  private calculateOrderWeight(itemsInOrder: ProcessedItem[]): number {
    if (itemsInOrder.length > 1) {
      this.addLog(`[WEIGHT LOGIC] Order #${itemsInOrder[0]['ORDER ID']}: Multi-item order. Weight set to 15.`, 'info');
      return 15;
    }

    const singleItem = itemsInOrder[0];
    const courierInfo = singleItem._courierData;
    if (!courierInfo) {
      return 15;
    }

    const properties = courierInfo.lineItemProperties || [];
    const matQuality = PropertyExtractor.extractProperty(properties, 'SELECT MAT QUALITY');
    const matColor = PropertyExtractor.extractProperty(properties, 'SELECT MAT COLOUR');
    
    this.addLog(`[WEIGHT DEBUG] Order #${singleItem['ORDER ID']}: Single item. Mat Quality: "${matQuality}", Mat Colour: "${matColor}"`, 'info');
    
    if (matQuality === 'ESSENTIAL' && matColor === 'BLACK') {
      return 1;
    }
    
    return 15;
  }
}