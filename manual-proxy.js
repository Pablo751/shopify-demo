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
console.log('SHOP URL:', SHOPIFY_SHOP_URL);
console.log('TOKEN:', SHOPIFY_ACCESS_TOKEN ? SHOPIFY_ACCESS_TOKEN.substring(0, 15) + '...' : 'MISSING');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from React build
app.use(express.static(path.join(__dirname, 'build')));

// Manual proxy handler
app.use('/api/shopify', async (req, res) => {
  try {
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

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🟢 Manual proxy running on port ${PORT}`);
}); 