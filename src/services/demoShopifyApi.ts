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

    // For demo purposes, always return demo orders regardless of date range
    // In a real demo, we want to show functionality even with arbitrary dates
    console.log(`Demo API: Fetching orders for date range ${startDate} to ${endDate}`);
    console.log(`Demo API: Returning ${DEMO_ORDERS.length} demo orders (ignoring date range for demo purposes)`);
    
    return DEMO_ORDERS;
  }
} 