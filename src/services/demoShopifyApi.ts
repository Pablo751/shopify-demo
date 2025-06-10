import { Order } from '../types';
import { DEMO_ORDERS, DEMO_SHOP_INFO } from './demoMockData';

export class DemoShopifyApiService {
  private readonly simulateDelay: boolean;

  constructor(simulateDelay: boolean = true) {
    this.simulateDelay = simulateDelay;
  }

  private async delay(ms: number = 1000): Promise<void> {
    if (this.simulateDelay) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  }

  async testConnection(): Promise<{ success: boolean; message: string; shopInfo?: { name: string; domain: string } }> {
    await this.delay(1500);
    
    return {
      success: true,
      message: `Connected to ${DEMO_SHOP_INFO.name}`,
      shopInfo: {
        name: DEMO_SHOP_INFO.name,
        domain: DEMO_SHOP_INFO.domain
      }
    };
  }

  async fetchOrders(startDate: string, endDate: string): Promise<Order[]> {
    await this.delay(2500);

    // For demo purposes, return all orders if the date range includes our demo dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    const demoStart = new Date('2024-01-15');
    const demoEnd = new Date('2024-01-17');

    // Check if the requested date range overlaps with our demo date range
    if (start <= demoEnd && end >= demoStart) {
      return DEMO_ORDERS;
    }

    return [];
  }
} 