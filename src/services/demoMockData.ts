import { Order } from '../types';

export const DEMO_ORDERS: Order[] = [
  {
    id: "5001",
    order_number: "1001",
    name: "#1001",
    email: "john.smith@example.com",
    line_items: [
      {
        id: "101",
        title: "BMW 3 Series (2019-2023) Tailored Car Mats - Premium Set",
        sku: "BMW-3SERIES-2019-PREMIUM",
        quantity: 1,
        product_handle: "bmw-3-series-2019-2023-tailored-car-mats",
        properties: [
          { name: "SELECT MAT QUALITY", value: "Premium" },
          { name: "SELECT MAT COLOUR", value: "Black" },
          { name: "SELECT TRIM COLOUR", value: "Black" }
        ]
      }
    ],
    shipping_address: {
      first_name: "John",
      last_name: "Smith",
      address1: "123 High Street",
      address2: "Flat 2B",
      city: "London",
      country: "United Kingdom",
      country_code: "GB",
      zip: "SW1A 1AA",
      phone: "+44 20 7946 0958"
    },
    note: "Next Day Delivery requested"
  },
  {
    id: "5002",
    order_number: "1002",
    name: "#1002",
    email: "sarah.johnson@example.com",
    line_items: [
      {
        id: "102",
        title: "Mercedes C-Class W205 (2014-2021) Premium Car Mats with Boot Mat",
        sku: "MERC-CCLASS-2014-PREMIUM",
        quantity: 1,
        product_handle: "mercedes-c-class-w205-2014-2021-premium-car-mats",
        properties: [
          { name: "SELECT MAT QUALITY", value: "Premium" },
          { name: "SELECT MAT COLOUR", value: "Grey" },
          { name: "SELECT TRIM COLOUR", value: "Grey" }
        ]
      }
    ],
    shipping_address: {
      first_name: "Sarah",
      last_name: "Johnson",
      address1: "456 Oak Avenue",
      city: "Manchester",
      country: "United Kingdom",
      country_code: "GB",
      zip: "M1 1AA",
      phone: "+44 161 496 0000"
    }
  },
  {
    id: "5003",
    order_number: "1003",
    name: "#1003",
    email: "michael.brown@example.com",
    line_items: [
      {
        id: "103",
        title: "Ford Focus Mk4 (2018-2022) Tailored Car Mats - Standard Set",
        sku: "FORD-FOCUS-2018-STANDARD",
        quantity: 1,
        product_handle: "ford-focus-mk4-2018-2022-tailored-car-mats",
        properties: [
          { name: "SELECT MAT QUALITY", value: "Standard" },
          { name: "SELECT MAT COLOUR", value: "Black" },
          { name: "SELECT TRIM COLOUR", value: "Black" }
        ]
      }
    ],
    shipping_address: {
      first_name: "Michael",
      last_name: "Brown",
      address1: "789 Church Lane",
      address2: "Unit 5",
      city: "Birmingham",
      country: "United Kingdom",
      country_code: "GB",
      zip: "B1 1AA",
      phone: "+44 121 496 0000"
    },
    note: "Next Day Delivery requested"
  },
  {
    id: "5004",
    order_number: "1004",
    name: "#1004",
    email: "emma.wilson@example.com",
    line_items: [
      {
        id: "104",
        title: "Vauxhall Corsa Mk5 (2019-2023) Basic Car Mats Set",
        sku: "VAUXHALL-CORSA-2019-BASIC",
        quantity: 1,
        product_handle: "vauxhall-corsa-mk5-2019-2023-basic-car-mats",
        properties: [
          { name: "SELECT MAT QUALITY", value: "ESSENTIAL" },
          { name: "SELECT MAT COLOUR", value: "BLACK" },
          { name: "SELECT TRIM COLOUR", value: "Beige" }
        ]
      }
    ],
    shipping_address: {
      first_name: "Emma",
      last_name: "Wilson",
      address1: "321 Victoria Road",
      city: "Liverpool",
      country: "United Kingdom",
      country_code: "GB",
      zip: "L1 1AA",
      phone: "+44 151 496 0000"
    }
  },
  {
    id: "5005",
    order_number: "1005",
    name: "#1005",
    email: "david.taylor@example.com",
    line_items: [
      {
        id: "105",
        title: "Tesla Model 3 (2017-2023) Premium Electric Car Mats - Full Set",
        sku: "TESLA-MODEL3-2017-PREMIUM",
        quantity: 1,
        product_handle: "tesla-model-3-2017-2023-premium-electric-car-mats",
        properties: [
          { name: "SELECT MAT QUALITY", value: "Premium" },
          { name: "SELECT MAT COLOUR", value: "Black" },
          { name: "SELECT TRIM COLOUR", value: "Black" }
        ]
      }
    ],
    shipping_address: {
      first_name: "David",
      last_name: "Taylor",
      address1: "654 Park Street",
      address2: "Apartment 12",
      city: "Edinburgh",
      country: "United Kingdom",
      country_code: "GB",
      zip: "EH1 1AA",
      phone: "+44 131 496 0000"
    },
    note: "Next Day Delivery requested"
  },
  {
    id: "5006",
    order_number: "1006",
    name: "#1006",
    email: "lisa.anderson@example.com",
    line_items: [
      {
        id: "106",
        title: "Unknown Car Model XYZ-2024 Special Edition Mats",
        sku: "UNKNOWN-XYZ-2024",
        quantity: 1,
        product_handle: "unknown-car-model-xyz-2024-special-edition-mats",
        properties: []
      }
    ],
    shipping_address: {
      first_name: "Lisa",
      last_name: "Anderson",
      address1: "987 Queen Street",
      city: "Cardiff",
      country: "United Kingdom",
      country_code: "GB",
      zip: "CF1 1AA",
      phone: "+44 29 2496 0000"
    }
  }
];



export const DEMO_SHOP_INFO = {
  name: "CarMats Direct Demo Store",
  domain: "carmats-demo.myshopify.com",
  email: "demo@carmatsdirect.com",
  phone: "+44 800 123 4567"
}; 