// File: __tests__/orderProcessor.test.ts
import { OrderProcessor } from '../services/orderProcessor';
import { Order, KtypeMasterRecord } from '../types';

const mockKtypeMasterData: KtypeMasterRecord[] = [
  {
    COMPANY: 'BMW',
    MODEL: '3 Series',
    YEAR: '2019-2023',
    Template: 'BMW_3_SERIES_2019',
    MATS: '4',
    '#Clips': '8',
    Type: 'Twist'
  }
];

const mockOrder: Order = {
  id: '123',
  order_number: 'ORD001',
  email: 'test@example.com',
  name: '#ORD001',
  line_items: [
    {
      id: '456',
      title: 'BMW 3 Series (2019-2023) Car Mats',
      sku: 'BMW-3-SERIES',
      quantity: 1,
      product_handle: 'bmw-3-series-2019-2023-car-mats',
      properties: [
        { name: 'SELECT MAT QUALITY', value: 'Premium' },
        { name: 'SELECT MAT COLOUR', value: 'Black' }
      ]
    }
  ],
  shipping_address: {
    first_name: 'John',
    last_name: 'Doe',
    address1: '123 Main St',
    address2: 'Apt 4B',
    city: 'London',
    country: 'United Kingdom',
    country_code: 'GB',
    zip: 'SW1A 1AA',
    phone: '1234567890'
  }
};

describe('OrderProcessor', () => {
  let orderProcessor: OrderProcessor;
  let mockAddLog: jest.Mock;

  beforeEach(() => {
    mockAddLog = jest.fn();
    orderProcessor = new OrderProcessor(mockKtypeMasterData, mockAddLog);
  });

  describe('processOrders', () => {
    it('should process orders successfully', async () => {
      const mockOnProgress = jest.fn();
      
      const result = await orderProcessor.processOrders([mockOrder], mockOnProgress);

      expect(result.processedItems).toHaveLength(1);
      expect(result.unmatchedItems).toHaveLength(0);
      expect(result.summary.totalOrders).toBe(1);
      expect(result.summary.matchedItems).toBe(1);
      expect(result.summary.unmatchedItems).toBe(0);
      expect(mockOnProgress).toHaveBeenCalled();
    });

    it('should handle unmatched items', async () => {
      const unmatchableOrder: Order = {
        ...mockOrder,
        line_items: [
          {
            ...mockOrder.line_items[0],
            title: 'Unknown Product Title',
            product_handle: 'unknown-product'
          }
        ]
      };

      const mockOnProgress = jest.fn();
      const result = await orderProcessor.processOrders([unmatchableOrder], mockOnProgress);

      expect(result.processedItems).toHaveLength(0);
      expect(result.unmatchedItems).toHaveLength(1);
      expect(result.unmatchedItems[0]['Error']).toBe('Could not parse details');
    });

    it('should call progress callback correctly', async () => {
      const mockOnProgress = jest.fn();
      
      await orderProcessor.processOrders([mockOrder], mockOnProgress);

      expect(mockOnProgress).toHaveBeenCalledWith(
        expect.any(Number),
        expect.stringContaining('Processing item')
      );
    });
  });
});