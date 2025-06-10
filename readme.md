# Shopify Order Processor

A professional React TypeScript application for processing Shopify orders, extracting car details, and matching against ktypemaster data for automated car mat fulfillment.

## Features

- **Shopify Integration**: Fetch orders via secure proxy server
- **Intelligent Parsing**: Extract car make, model, and year from product titles
- **Smart Matching**: Advanced algorithm to match products against ktypemaster database
- **Bulk Processing**: Handle large order volumes with progress tracking
- **Export Capabilities**: Generate CSV files for fulfillment and courier services
- **Real-time Logging**: Comprehensive processing logs with error tracking
- **TypeScript**: Full type safety and excellent developer experience

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Shopify store with API access
- ktypemaster3.csv file (car database)

## Installation

1. **Clone and install dependencies:**
```bash
git clone <your-repo>
cd shopify-product-processor
npm install
```

2. **Set up environment variables:**
```bash
# Create .env file
cp .env.example .env

# Add your Shopify credentials
SHOPIFY_SHOP_URL=your-shop.myshopify.com
SHOPIFY_ACCESS_TOKEN=your-access-token
REACT_APP_PROXY_BASE=http://localhost:3001/api/shopify
```

3. **Add your ktypemaster database:**
Place your `ktypemaster3.csv` file in the `public/` folder.

## Running the Application

### Development Mode

1. **Start the proxy server:**
```bash
npm run start:proxy
```

2. **Start the React app:**
```bash
npm start
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

### Production Build

```bash
npm run build
npm run serve
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ShopifyOrderProcessor.tsx
│   ├── DateRangeSelector.tsx
│   ├── KtypeMasterManager.tsx
│   ├── ProcessingProgress.tsx
│   ├── ResultsSummary.tsx
│   └── ProcessingLogs.tsx
├── hooks/              # Custom React hooks
│   ├── useLogger.ts
│   ├── useOrderProcessor.ts
│   └── useKtypeMaster.ts
├── services/           # Business logic & API calls
│   ├── shopifyApi.ts
│   ├── orderProcessor.ts
│   ├── ktypeMasterMatcher.ts
│   └── courierFileGenerator.ts
├── utils/              # Pure utility functions
│   ├── carDetailsParser.ts
│   ├── csvParser.ts
│   ├── addressUtils.ts
│   ├── propertyExtractor.ts
│   └── yearUtils.ts
├── types/              # TypeScript interfaces
│   └── index.ts
├── config/             # Configuration constants
│   └── constants.ts
└── __tests__/          # Unit tests
    ├── carDetailsParser.test.ts
    ├── csvParser.test.ts
    └── orderProcessor.test.ts
```

## 🔧 Configuration

### Shopify Setup

1. Create a private app in your Shopify admin
2. Grant the following permissions:
   - `read_orders`
   - `read_products`
   - `read_customers`
3. Copy the access token to your `.env` file

### Ktypemaster Database

The application expects a CSV file with the following columns:
- `COMPANY` - Car manufacturer
- `MODEL` - Car model
- `YEAR` - Year range (e.g., "2019-2023")
- `Template` - Template reference
- `MATS` - Number of mats
- `#Clips` - Number of clips
- `Type` - Clip type

## Usage

1. **Load Ktypemaster Data**: Upload your CSV file or use the default
2. **Set Date Range**: Choose the order date range to process
3. **Test Connection**: Verify Shopify API connectivity
4. **Process Orders**: Run the order processing pipeline
5. **Download Results**: Export matched orders and courier files

## How It Works

### Order Processing Pipeline

1. **Fetch Orders**: Retrieve orders from Shopify API within date range
2. **Parse Products**: Extract car details from product titles/handles
3. **Match Database**: Find corresponding entries in ktypemaster
4. **Generate Output**: Create fulfillment and courier CSV files

### Car Detail Extraction

The parser handles various title formats:
- `BMW 3 Series (2019-2023) Car Mats`
- `Ford Focus Mk4 (2018-2022) Manual Car Mats`
- `Mercedes C-Class W205 (2014-2021) Automatic Car Mats`

### Matching Algorithm

1. **Make Filtering**: Filter by car manufacturer
2. **Model Matching**: Flexible model name matching
3. **Year Validation**: Ensure year ranges overlap
4. **Best Match Selection**: Score-based selection for ambiguous cases

## Output Files

### Processed Orders CSV
Contains all successfully matched orders with:
- Customer information
- Product details
- Template references
- Fulfillment data

### Courier Master CSV
Optimized for shipping labels with:
- Customer addresses
- Service type (Next Day/Standard)
- Package weights
- Tracking information

### Unmatched Orders CSV
Orders that couldn't be processed with error details.

## Troubleshooting

### Common Issues

**Connection Errors:**
- Ensure proxy server is running on port 3001
- Check Shopify credentials in .env file
- Verify API permissions

**Parsing Failures:**
- Check product title formats
- Update car make list in constants
- Review ktypemaster data quality

**Performance Issues:**
- Process smaller date ranges
- Optimize ktypemaster CSV size
- Close unnecessary browser tabs

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with tests
4. Run the test suite: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


---

## Performance & Scale

- ✅ Handles 1000+ orders efficiently
- ✅ Non-blocking UI with progress tracking
- ✅ Memory-optimized CSV processing
- ✅ Paginated API requests
- ✅ Error recovery and logging

## Security

- ✅ Environment variable protection
- ✅ Input validation and sanitization
- ✅ CORS configuration
- ✅ No sensitive data in logs
- ✅ Secure API proxy implementation

---

*Built with ❤️ for efficient e-commerce order processing*