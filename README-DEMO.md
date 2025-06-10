# Shopify Order Processor - Demo Version

🚀 **Live Demo Available** - Perfect for recruiters and stakeholders to explore the application features without requiring Shopify credentials.

## 🎯 Demo Features

This demo version showcases a complete e-commerce order processing system with:

- **Interactive Demo Mode**: Toggle between demo data and live API
- **Sample Order Data**: Realistic BMW, Mercedes, Ford, Vauxhall, and Tesla orders
- **Full Processing Pipeline**: Car detail extraction, database matching, and fulfillment
- **Real-time Progress**: Animated progress bars and detailed logging
- **Export Functionality**: Download CSV files with processed results
- **Edge Case Handling**: Demonstrates both successful matches and error scenarios

## 🖥️ Quick Start (Demo Mode)

1. **Clone and install:**
```bash
git clone <your-repo>
cd shopify-product-processor
npm install
```

2. **Start the demo:**
```bash
npm start
```

3. **Open your browser:**
Navigate to `http://localhost:3000`

4. **Try the demo:**
   - Demo mode is enabled by default
   - Use date range: `2024-01-15` to `2024-01-17` for sample data
   - Click "Test Demo Connection" to verify setup
   - Click "Process Demo Orders" to see the full workflow

## 🌐 Deployment Options

### Option 1: Netlify (Recommended)

1. **Build the project:**
```bash
npm run build
```

2. **Deploy to Netlify:**
   - Drag and drop the `build` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or connect your GitHub repo for automatic deployments

### Option 2: Vercel

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
npm run build
vercel --prod
```

### Option 3: GitHub Pages

1. **Install gh-pages:**
```bash
npm install --save-dev gh-pages
```

2. **Add to package.json:**
```json
{
  "homepage": "https://yourusername.github.io/shopify-product-processor",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

3. **Deploy:**
```bash
npm run deploy
```

## 🎮 How to Use the Demo

### 1. Demo Mode (Default)
- **Sample Data**: 6 realistic car mat orders from UK customers
- **Processing**: Simulated API delays and realistic progress updates
- **Results**: 5 successful matches + 1 unmatched order (edge case)
- **Downloads**: Fully functional CSV exports with demo data

### 2. Live Mode
- Toggle "Demo Mode" off to connect to real Shopify API
- Requires environment variables for Shopify credentials
- All original functionality intact

### 3. Key Demo Flows

**Connection Test:**
1. Click "Test Demo Connection"
2. See realistic API response simulation
3. View shop information in logs

**Order Processing:**
1. Set date range to `2024-01-15` to `2024-01-17`
2. Click "Process Demo Orders"
3. Watch real-time progress with detailed steps
4. See processing logs with emojis and color coding

**Results & Downloads:**
1. View processing summary with match rates
2. Download matched orders CSV
3. Download courier fulfillment file
4. Download unmatched orders (error cases)

## 📊 Demo Data Overview

| Order | Customer | Car | Status | Scenario |
|-------|----------|-----|--------|----------|
| #1001 | John Smith | BMW 3 Series (2019-2023) | ✅ Matched | Standard success case |
| #1002 | Sarah Johnson | Mercedes C-Class (2014-2021) | ✅ Matched | Premium product |
| #1003 | Michael Brown | Ford Focus Mk4 (2018-2022) | ✅ Matched | Popular model |
| #1004 | Emma Wilson | Vauxhall Corsa (2019-2023) | ✅ Matched | Budget option |
| #1005 | David Taylor | Tesla Model 3 (2017-2023) | ✅ Matched | Electric vehicle |
| #1006 | Lisa Anderson | Unknown Model XYZ-2024 | ❌ Unmatched | Error handling |

## 🛠️ Technical Highlights

### Architecture Features
- **TypeScript**: Full type safety throughout
- **React Hooks**: Custom hooks for state management
- **Service Layer**: Clean separation of concerns
- **Error Handling**: Comprehensive error scenarios
- **CSV Processing**: Efficient data export utilities

### Demo-Specific Features
- **Mock Services**: Realistic API simulation without dependencies
- **Configurable Delays**: Adjustable for presentation timing
- **Toggle Architecture**: Seamless switching between demo/live modes
- **Sample Data**: Comprehensive test cases covering edge scenarios

## 🎯 Perfect for Showcasing

### To Recruiters
- Demonstrates full-stack React/TypeScript skills
- Shows API integration and data processing capabilities
- Highlights UI/UX design with modern components
- Proves ability to handle complex business logic

### To Stakeholders
- Interactive demo requiring no setup or credentials
- Realistic data and scenarios
- Professional UI with clear value proposition
- Complete end-to-end workflow demonstration

### To Technical Teams
- Clean, maintainable code architecture
- Comprehensive error handling
- Type-safe implementation
- Modern React patterns and hooks

## 🚀 Production Ready

The demo includes all production features:
- Environment variable support
- Build optimization
- Error boundaries
- Performance monitoring hooks
- Memory-efficient CSV processing
- Responsive design

## 📝 Customization

To customize the demo data:

1. **Edit sample orders:** `src/services/demoMockData.ts`
2. **Modify processing steps:** `src/hooks/useDemoOrderProcessor.ts`
3. **Update branding:** `src/components/DemoShopifyOrderProcessor.tsx`

## 📁 Files Created for Demo

- `src/services/demoMockData.ts` - Sample orders and shop data
- `src/services/demoShopifyApi.ts` - Mock API service with realistic delays
- `src/hooks/useDemoOrderProcessor.ts` - Demo-specific processing logic
- `src/components/DemoShopifyOrderProcessor.tsx` - Enhanced main component with demo toggle
- `README-DEMO.md` - This deployment guide
- `deploy-demo.sh` - Automated deployment script

## 🔗 Links

- **Live Demo**: [Your deployed URL here]
- **Repository**: [Your GitHub repo]
- **Portfolio**: [Your portfolio link]

---

*Built with React, TypeScript, and Tailwind CSS. Demo mode enables full exploration without requiring API credentials.* 