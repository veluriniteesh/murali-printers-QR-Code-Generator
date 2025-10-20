# 📡 API Documentation - QR Code Generator

**Murali Printers Backend API v2.0**

Complete REST API documentation for programmatic QR code generation.

---

## 🚀 Base URL

```
http://localhost:3001/api
```

---

## 🔌 Endpoints

### 1. Health Check

Check if the API server is running and get service information.

**Endpoint:**
```http
GET /api/health
```

**Response (200 OK):**
```json
{
  "status": "ok",
  "service": "Murali Printers QR Generator",
  "version": "2.0.0",
  "timestamp": "2025-10-20T09:53:12.000Z"
}
```

**Example:**
```bash
curl http://localhost:3001/api/health
```

---

### 2. Generate QR Code (Base64)

Generate a QR code and receive it as a base64-encoded data URL.

**Endpoint:**
```http
POST /api/generate
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "https://muraliprinters.com",
  "size": 300,
  "darkColor": "#e74c3c",
  "lightColor": "#ffffff"
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `text` | string | ✅ Yes | - | Text or URL to encode in QR code |
| `size` | number | ❌ No | 300 | Width and height in pixels (100-1000) |
| `darkColor` | string | ❌ No | #000000 | Color of QR code squares (hex) |
| `lightColor` | string | ❌ No | #ffffff | Background color (hex) |

**Response (200 OK):**
```json
{
  "success": true,
  "qrCode": "data:image/png;base64,iVBORw0KGgo...",
  "metadata": {
    "text": "https://muraliprinters.com",
    "size": 300,
    "darkColor": "#e74c3c",
    "lightColor": "#ffffff",
    "format": "base64",
    "generatedAt": "2025-10-20T09:53:12.000Z"
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Text is required",
  "message": "Please provide text or URL to generate QR code"
}
```

**Examples:**

```bash
# Basic generation
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"text":"https://muraliprinters.com"}'

# With custom colors and size
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"text":"tel:+919876543210","size":500,"darkColor":"#e74c3c","lightColor":"#ffffff"}'
```

```javascript
// JavaScript
const response = await fetch('http://localhost:3001/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'https://muraliprinters.com',
    size: 300,
    darkColor: '#e74c3c',
    lightColor: '#ffffff'
  })
});

const data = await response.json();
document.getElementById('qr-img').src = data.qrCode;
```

```python
# Python
import requests

response = requests.post('http://localhost:3001/api/generate', json={
    'text': 'https://muraliprinters.com',
    'size': 300,
    'darkColor': '#e74c3c',
    'lightColor': '#ffffff'
})

data = response.json()
print(data['qrCode'])  # Base64 data URL
```

---

### 3. Generate QR Code (PNG Image)

Generate a QR code and receive it as a PNG image buffer.

**Endpoint:**
```http
POST /api/generate-png
Content-Type: application/json
```

**Request Body:**
```json
{
  "text": "tel:+919876543210",
  "size": 500,
  "darkColor": "#000000",
  "lightColor": "#ffffff"
}
```

**Parameters:** Same as `/api/generate`

**Response:**
- Content-Type: `image/png`
- Returns PNG image buffer directly
- Can be saved as file or displayed directly

**Examples:**

```bash
# Download as file
curl -X POST http://localhost:3001/api/generate-png \
  -H "Content-Type: application/json" \
  -d '{"text":"https://muraliprinters.com","size":500}' \
  --output qrcode.png
```

```javascript
// JavaScript - Download
const response = await fetch('http://localhost:3001/api/generate-png', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    text: 'https://muraliprinters.com',
    size: 500
  })
});

const blob = await response.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'qrcode.png';
a.click();
```

```python
# Python - Save file
import requests

response = requests.post('http://localhost:3001/api/generate-png', json={
    'text': 'https://muraliprinters.com',
    'size': 500
})

with open('qrcode.png', 'wb') as f:
    f.write(response.content)
```

---

### 4. Batch Generate QR Codes

Generate multiple QR codes in a single request.

**Endpoint:**
```http
POST /api/generate-batch
Content-Type: application/json
```

**Request Body:**
```json
{
  "items": [
    { "text": "https://muraliprinters.com", "label": "Website" },
    { "text": "mailto:info@muraliprinters.com", "label": "Email" },
    { "text": "tel:+919876543210", "label": "Phone" }
  ],
  "size": 300,
  "darkColor": "#e74c3c",
  "lightColor": "#ffffff"
}
```

**Parameters:**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `items` | array | ✅ Yes | - | Array of items to generate (max 50) |
| `items[].text` | string | ✅ Yes | - | Text or URL to encode |
| `items[].label` | string | ❌ No | null | Optional label for identification |
| `size` | number | ❌ No | 300 | Width and height for all QR codes |
| `darkColor` | string | ❌ No | #000000 | Color for all QR codes |
| `lightColor` | string | ❌ No | #ffffff | Background for all QR codes |

**Response (200 OK):**
```json
{
  "success": true,
  "total": 3,
  "successful": 3,
  "failed": 0,
  "results": [
    {
      "success": true,
      "text": "https://muraliprinters.com",
      "label": "Website",
      "qrCode": "data:image/png;base64,..."
    },
    {
      "success": true,
      "text": "mailto:info@muraliprinters.com",
      "label": "Email",
      "qrCode": "data:image/png;base64,..."
    },
    {
      "success": true,
      "text": "tel:+919876543210",
      "label": "Phone",
      "qrCode": "data:image/png;base64,..."
    }
  ],
  "generatedAt": "2025-10-20T09:53:12.000Z"
}
```

**Limits:**
- Maximum 50 QR codes per request
- Each QR code has same size and colors
- Individual items can succeed/fail independently

**Examples:**

```bash
# Batch generation
curl -X POST http://localhost:3001/api/generate-batch \
  -H "Content-Type: application/json" \
  -d '{"items":["https://example.com","mailto:test@example.com","tel:+911234567890"]}'
```

```javascript
// JavaScript
const response = await fetch('http://localhost:3001/api/generate-batch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    items: [
      { text: 'https://muraliprinters.com', label: 'Website' },
      { text: 'mailto:info@muraliprinters.com', label: 'Email' },
      { text: 'tel:+919876543210', label: 'Phone' }
    ],
    size: 300,
    darkColor: '#e74c3c'
  })
});

const data = await response.json();
console.log(`Generated ${data.successful} of ${data.total} QR codes`);

// Display all QR codes
data.results.forEach((result, index) => {
  if (result.success) {
    const img = document.createElement('img');
    img.src = result.qrCode;
    img.alt = result.label || `QR Code ${index + 1}`;
    document.body.appendChild(img);
  }
});
```

---

## 🎨 QR Code Content Examples

### Website URL
```json
{"text": "https://muraliprinters.com"}
```

### Email Address
```json
{"text": "mailto:info@muraliprinters.com?subject=Inquiry&body=Hello"}
```

### Phone Number
```json
{"text": "tel:+919876543210"}
```

### WhatsApp
```json
{"text": "https://wa.me/919876543210?text=Hello%20Murali%20Printers"}
```

### SMS
```json
{"text": "sms:+919876543210?body=Hello"}
```

### Google Maps Location
```json
{"text": "https://maps.google.com/?q=12.9716,77.5946"}
```

### WiFi Network
```json
{"text": "WIFI:T:WPA;S:NetworkName;P:Password;;"}
```

### vCard (Digital Business Card)
```json
{
  "text": "BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Murali Printers\nTEL:+919876543210\nEMAIL:john@muraliprinters.com\nURL:https://muraliprinters.com\nEND:VCARD"
}
```

### Calendar Event
```json
{
  "text": "BEGIN:VEVENT\nSUMMARY:Meeting\nDTSTART:20251020T100000\nDTEND:20251020T110000\nLOCATION:Office\nEND:VEVENT"
}
```

---

## 🔧 Integration Examples

### React Component

```jsx
import { useState } from 'react';

function QRGenerator() {
  const [qrCode, setQRCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const generateQR = async (text) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          size: 300,
          darkColor: '#e74c3c',
          lightColor: '#ffffff'
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate QR code');
      }
      
      const data = await response.json();
      setQRCode(data.qrCode);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <input 
        type="text"
        onChange={(e) => generateQR(e.target.value)}
        placeholder="Enter URL or text"
      />
      {loading && <p>Generating...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      {qrCode && <img src={qrCode} alt="QR Code" />}
    </div>
  );
}
```

### Node.js Script

```javascript
const axios = require('axios');
const fs = require('fs');

async function generateMultipleQR() {
  try {
    const items = [
      'https://muraliprinters.com',
      'mailto:info@muraliprinters.com',
      'tel:+919876543210'
    ];
    
    const response = await axios.post('http://localhost:3001/api/generate-batch', {
      items,
      size: 500,
      darkColor: '#e74c3c',
      lightColor: '#ffffff'
    });
    
    console.log(`Generated ${response.data.successful} QR codes`);
    
    // Save each QR code
    response.data.results.forEach((result, index) => {
      if (result.success) {
        const base64Data = result.qrCode.replace(/^data:image\/png;base64,/, '');
        fs.writeFileSync(`qrcode-${index + 1}.png`, base64Data, 'base64');
      }
    });
    
    console.log('All QR codes saved!');
  } catch (error) {
    console.error('Error:', error.message);
  }
}

generateMultipleQR();
```

### Python Script

```python
import requests
import base64
import json

def generate_batch_qr():
    items = [
        {'text': 'https://muraliprinters.com', 'label': 'Website'},
        {'text': 'mailto:info@muraliprinters.com', 'label': 'Email'},
        {'text': 'tel:+919876543210', 'label': 'Phone'}
    ]
    
    response = requests.post('http://localhost:3001/api/generate-batch', json={
        'items': items,
        'size': 500,
        'darkColor': '#e74c3c',
        'lightColor': '#ffffff'
    })
    
    data = response.json()
    print(f"Generated {data['successful']} of {data['total']} QR codes")
    
    # Save each QR code
    for i, result in enumerate(data['results']):
        if result['success']:
            qr_base64 = result['qrCode'].split(',')[1]
            with open(f"qrcode-{result.get('label', i+1)}.png", 'wb') as f:
                f.write(base64.b64decode(qr_base64))
    
    print('All QR codes saved!')

generate_batch_qr()
```

---

## ⚡ Performance

- **Single QR**: < 50ms
- **Batch (10 items)**: < 200ms
- **Batch (50 items)**: < 500ms
- **Maximum QR size**: 1000x1000px
- **No rate limits** (for local use)

---

## 🐛 Error Responses

### 400 Bad Request
```json
{
  "error": "Text is required",
  "message": "Please provide text or URL to generate QR code"
}
```

### 404 Not Found
```json
{
  "error": "Not Found",
  "message": "The requested endpoint does not exist",
  "availableEndpoints": [...]
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to generate QR code",
  "message": "Error details here"
}
```

---

## 🔒 Security

- ✅ No data persistence
- ✅ No logging of user data
- ✅ CORS enabled
- ✅ Input validation
- ✅ Error sanitization

---

## 📝 Notes

- All responses include `generatedAt` timestamp
- Base64 responses include full data URL (ready for img src)
- PNG responses are direct image buffers
- Error correction level: M (15% recovery)
- All QR codes use UTF-8 encoding

---

**API Version**: 2.0.0  
**Last Updated**: October 20, 2025  
**Status**: Production Ready ✅
