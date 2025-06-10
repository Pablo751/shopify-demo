// File: src/types/index.ts
export interface Order {
    id: string;
    order_number: string;
    email: string;
    line_items: LineItem[];
    shipping_address: ShippingAddress;
    note?: string;
    name: string;
  }
  
  export interface LineItem {
    id: string;
    title: string;
    sku: string;
    quantity: number;
    product_handle?: string;
    properties: Property[];
  }
  
  export interface ShippingAddress {
    first_name: string;
    last_name: string;
    address1: string;
    address2?: string;
    city: string;
    country: string;
    country_code: string;
    zip: string;
    phone?: string;
  }
  
  export interface Property {
    name: string;
    value: string;
  }
  
  export interface KtypeMasterRecord {
    COMPANY: string;
    MODEL: string;
    YEAR: string;
    Template: string;
    MATS: string;
    '#Clips': string;
    Type: string;
  }
  
  export interface CarDetails {
    make: string;
    model: string;
    year: string;
    source: string;
  }
  
  export interface ProcessedItem {
    'FILE NAME': string;
    'Process DATE': string;
    'ORIGIN OF ORDER': string;
    'FIRST NAME': string;
    'LAST NAME': string;
    'ADD1': string;
    'ADD2': string;
    'ADD3': string;
    'ADD4': string;
    'POSTCODE': string;
    'TEL NO': string;
    'EMAIL ADDRESS': string;
    'QTY': number;
    'REF NO': string;
    'TRIM': string;
    'Thread Colour': string;
    'Embroidery': string;
    'CARPET TYPE': string;
    'CARPET COLOUR': string;
    'Width': string;
    'Make': string;
    'Model': string;
    'YEAR': string;
    'Pcs/Set': string;
    'HEEL PAD REQUIRED': string;
    'Other Extra': string;
    'NO OF CLIPS': string;
    'CLIP TYPE': string;
    'Courier': string;
    'Tracking No': string;
    'Bar Code Type': string;
    'Bar Code': string;
    'AF': string;
    'Delivery Special Instruction': string;
    'Link to Template File': string;
    'Boot Mat 2nd SKU': string;
    'SKU': string;
    'Item Number': string;
    'Transaction ID': string;
    'ORDER ID': string;
    _courierData?: CourierData;
  }
  
  export interface CourierData {
    customerFirstName: string;
    customerLastName: string;
    shippingAddress: ShippingAddress;
    lineItemProperties: Property[];
  }
  
  export interface ProcessingResults {
    processedItems: ProcessedItem[];
    unmatchedItems: UnmatchedItem[];
    summary: ProcessingSummary;
  }
  
  export interface UnmatchedItem {
    'Order ID': string;
    'Order Number': string;
    'Product Title': string;
    'Error': string;
    [key: string]: string;
  }
  
  export interface ProcessingSummary {
    totalOrders: number;
    totalLineItems: number;
    matchedItems: number;
    unmatchedItems: number;
    matchRate: string;
  }
  
  export interface DateRange {
    startDate: string;
    endDate: string;
  }
  
  export interface LogEntry {
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
  }