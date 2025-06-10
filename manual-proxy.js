import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Get dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SHOPIFY_SHOP_URL = process.env.SHOPIFY_SHOP_URL;
const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
const API_VERSION = '2024-04';

console.log('🚀 Manual Proxy Starting...');
console.log('SHOP URL:', SHOPIFY_SHOP_URL || 'MISSING');
console.log('TOKEN:', SHOPIFY_ACCESS_TOKEN ? SHOPIFY_ACCESS_TOKEN.substring(0, 15) + '...' : 'MISSING');

// Warning if environment variables are missing
if (!SHOPIFY_SHOP_URL || !SHOPIFY_ACCESS_TOKEN) {
  console.warn('⚠️  Warning: Shopify credentials not configured. API proxy will not work.');
  console.warn('   Set SHOPIFY_SHOP_URL and SHOPIFY_ACCESS_TOKEN environment variables.');
}

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Manual proxy handler
app.use('/api/shopify', async (req, res) => {
  try {
    // Check if credentials are configured
    if (!SHOPIFY_SHOP_URL || !SHOPIFY_ACCESS_TOKEN) {
      return res.status(500).json({ 
        error: 'Shopify credentials not configured',
        message: 'Please set SHOPIFY_SHOP_URL and SHOPIFY_ACCESS_TOKEN environment variables'
      });
    }

    console.log(`\n📨 ${req.method} ${req.url}`);
    
    // Build Shopify API URL
    const shopifyPath = req.url.replace('/api/shopify', '');
    const shopifyUrl = `https://${SHOPIFY_SHOP_URL}/admin/api/${API_VERSION}${shopifyPath}`;
    
    console.log('🎯 Proxying to:', shopifyUrl);
    console.log('🔑 Using token:', SHOPIFY_ACCESS_TOKEN.substring(0, 15) + '...');
    
    // Make request to Shopify
    const response = await fetch(shopifyUrl, {
      method: req.method,
      headers: {
        'X-Shopify-Access-Token': SHOPIFY_ACCESS_TOKEN,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
    });
    
    console.log('📡 Shopify responded:', response.status, response.statusText);
    console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log('📄 Response preview:', responseText.substring(0, 200) + '...');
    
    // Forward response
    res.status(response.status);
    
    // Copy relevant headers
    response.headers.forEach((value, key) => {
      if (!['content-encoding', 'transfer-encoding'].includes(key.toLowerCase())) {
        res.set(key, value);
      }
    });
    
    res.send(responseText);
    
  } catch (error) {
    console.error('❌ Proxy error:', error.message);
    res.status(500).json({ error: 'Proxy error', details: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', proxy: 'Active' });
});

// Catch-all handler for React app (must be last)
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith('/api/')) {
    return next();
  }
  
  // Serve React app for all other routes
  const indexPath = path.join(__dirname, 'build', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving React app:', err);
      res.status(500).send('Error loading application');
    }
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🟢 Manual proxy running on port ${PORT}`);
}); 