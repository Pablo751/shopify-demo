// File: src/services/shopifyApi.ts
import { Order } from '../types';

export class ShopifyApiService {
  private readonly proxyBase: string;

  constructor(proxyBase: string = 'http://localhost:3001/api/shopify') {
    this.proxyBase = proxyBase;
  }

  async testConnection(): Promise<{ success: boolean; message: string; shopInfo?: { name: string; domain: string } }> {
    try {
      const response = await fetch(`${this.proxyBase}/shop.json`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const responseText = await response.text();
      
      if (response.ok) {
        const data = JSON.parse(responseText);
        return {
          success: true,
          message: `Connected to ${data.shop?.name || 'Shopify'}`,
          shopInfo: data.shop
        };
      } else {
        return {
          success: false,
          message: `Connection failed: ${response.status} ${response.statusText}`
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Connection error: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }

  async fetchOrders(startDate: string, endDate: string): Promise<Order[]> {
    const start = new Date(startDate + 'T00:00:00Z').toISOString();
    const end = new Date(endDate + 'T23:59:59Z').toISOString();

    const orders: Order[] = [];
    let nextPageInfo: string | null = null;
    let hasNextPage = true;
    while (hasNextPage) {
      let url = `${this.proxyBase}/orders.json?status=any&limit=250&created_at_min=${start}&created_at_max=${end}`;
      
      if (nextPageInfo) {
        url += `&page_info=${nextPageInfo}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Shopify API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.orders) {
        orders.push(...data.orders);
      }

      // Handle pagination
      const linkHeader = response.headers.get('Link');
      hasNextPage = false;

      if (linkHeader) {
        const nextMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        if (nextMatch) {
          const nextUrl = new URL(nextMatch[1]);
          nextPageInfo = nextUrl.searchParams.get('page_info');
          hasNextPage = true;
        }
      }
    }

    return orders;
  }
}