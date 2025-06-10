// File: src/services/orderProcessor.ts
import { Order, ProcessingResults, ProcessedItem, UnmatchedItem, KtypeMasterRecord } from '../types';
import { CarDetailsParser } from '../utils/carDetailsParser';
import { KtypeMasterMatcher } from './ktypeMasterMatcher';
import { AddressUtils } from '../utils/addressUtils';
import { PropertyExtractor } from '../utils/propertyExtractor';

export class OrderProcessor {
  constructor(
    private ktypemasterData: KtypeMasterRecord[],
    private addLog: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void
  ) {}

  async processOrders(
    orders: Order[],
    onProgress: (progressPercent: number, step: string) => void
  ): Promise<ProcessingResults> {
    const processedItems: ProcessedItem[] = [];
    const unmatchedItems: UnmatchedItem[] = [];
    const totalLineItemsCount = orders.reduce((sum, order) => sum + order.line_items.length, 0);
    let processedLineItems = 0;

    const matcher = new KtypeMasterMatcher(this.ktypemasterData, this.addLog);

    for (const order of orders) {
      const shuffledAddr = AddressUtils.shuffleAddress(order.shipping_address);

      for (const lineItem of order.line_items) {
        processedLineItems++;
        const progressPercent = (processedLineItems / totalLineItemsCount) * 100;
        onProgress(progressPercent, `Processing item ${processedLineItems}/${totalLineItemsCount}...`);

        this.addLog(`\n--- Processing: ${lineItem.title} ---`, 'info');
        
        const carDetails = CarDetailsParser.parseProductDetails(lineItem.title, lineItem.product_handle);
        
        if (!carDetails) {
          unmatchedItems.push({ 
            'Order ID': order.id, 
            'Order Number': order.order_number, 
            'Product Title': lineItem.title, 
            'Error': 'Could not parse details' 
          });
          this.addLog(`⚠️ Could not parse: ${lineItem.title}`, 'warning');
          continue;
        }
        
        const match = matcher.findBestMatch(carDetails);
        
        if (match) {
          const properties = lineItem.properties || [];
          const matQuality = PropertyExtractor.extractProperty(properties, 'SELECT MAT QUALITY');
          const matColor = PropertyExtractor.extractProperty(properties, 'SELECT MAT COLOUR');
          const trimColor = PropertyExtractor.extractProperty(properties, 'SELECT TRIM COLOUR');
          const heelPad = PropertyExtractor.extractProperty(properties, 'SELECT HEEL PAD');
          
          const personalisation = PropertyExtractor.extractProperty(properties, 'Personalisation');
          let embroideryText = 'No';
          if (personalisation) {
            const yourText = PropertyExtractor.extractProperty(properties, 'Your Text');
            const embroideryColor = PropertyExtractor.extractProperty(properties, 'Embroidery Colour');
            embroideryText = `Text: ${yourText}, Colour: ${embroideryColor}`;
          }

          for (let qty = 0; qty < lineItem.quantity; qty++) {
            const processedItem: ProcessedItem = {
              'FILE NAME': lineItem.sku || `SHOPIFY-${order.id}`,
              'Process DATE': new Date().toLocaleDateString('en-GB'),
              'ORIGIN OF ORDER': 'Shopify',
              'FIRST NAME': order.shipping_address?.first_name || '',
              'LAST NAME': order.shipping_address?.last_name || '',
              'ADD1': shuffledAddr[0],
              'ADD2': shuffledAddr[1],
              'ADD3': shuffledAddr[2],
              'ADD4': shuffledAddr[3],
              'POSTCODE': order.shipping_address?.zip || '',
              'TEL NO': order.shipping_address?.phone || '',
              'EMAIL ADDRESS': order.email || '',
              'QTY': 1,
              'REF NO': match.Template,
              'TRIM': trimColor,
              'Thread Colour': 'Matched',
              'Embroidery': embroideryText,
              'CARPET TYPE': matQuality,
              'CARPET COLOUR': matColor,
              'Width': '',
              'Make': match.COMPANY,
              'Model': match.MODEL,
              'YEAR': match.YEAR,
              'Pcs/Set': match.MATS,
              'HEEL PAD REQUIRED': heelPad ? 'Yes' : 'No',
              'Other Extra': '',
              'NO OF CLIPS': match['#Clips'],
              'CLIP TYPE': match.Type,
              'Courier': '',
              'Tracking No': '',
              'Bar Code Type': 'CODE93',
              'Bar Code': order.name,
              'AF': '',
              'Delivery Special Instruction': order.note || '',
              'Link to Template File': '',
              'Boot Mat 2nd SKU': '',
              'SKU': lineItem.sku || '',
              'Item Number': lineItem.id,
              'Transaction ID': order.id,
              'ORDER ID': order.id,
              _courierData: {
                customerFirstName: order.shipping_address?.first_name || '',
                customerLastName: order.shipping_address?.last_name || '',
                shippingAddress: order.shipping_address,
                lineItemProperties: properties,
              }
            };
            processedItems.push(processedItem);
          }
          this.addLog(`✅ Matched: ${lineItem.title} → ${match.Template}`, 'success');
        } else {
          unmatchedItems.push({ 
            'Order ID': order.id, 
            'Order Number': order.order_number, 
            'Product Title': lineItem.title, 
            'Error': 'No ktypemaster match' 
          });
          this.addLog(`❌ No match: ${carDetails.make} ${carDetails.model} (${carDetails.year})`, 'warning');
        }
      }

      // Yield control to prevent blocking
      await new Promise(resolve => requestAnimationFrame(() => setTimeout(resolve, 0)));
    }

    const summary = { 
      totalOrders: orders.length, 
      totalLineItems: processedLineItems, 
      matchedItems: processedItems.length, 
      unmatchedItems: unmatchedItems.length, 
      matchRate: processedLineItems > 0 ? ((processedItems.length / processedLineItems) * 100).toFixed(1) : '0' 
    };

    return { processedItems, unmatchedItems, summary };
  }
}