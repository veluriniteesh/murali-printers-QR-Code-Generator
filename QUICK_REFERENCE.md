# ⚡ Quick Reference - QR Code Generator

## 🚀 Server Status

✅ **Backend + Frontend Running**  
📍 **URL**: http://localhost:3001  
🔌 **API**: http://localhost:3001/api  
🎨 **Theme**: Murali Printers (Red/Orange)

---

## 🎯 Quick Actions

### View Web Interface:
```
http://localhost:3001
```

### Test API Health:
```bash
curl http://localhost:3001/api/health
```

### Generate QR Code (Quick):
```bash
curl -X POST http://localhost:3001/api/generate \
  -H "Content-Type: application/json" \
  -d '{"text":"https://muraliprinters.com"}'
```

---

## 📡 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/health` | GET | Check server status |
| `/api/generate` | POST | Generate QR (Base64) |
| `/api/generate-png` | POST | Generate QR (PNG) |
| `/api/generate-batch` | POST | Generate multiple QRs |

---

## 💻 Frontend Features

✅ **Quick Samples**: 7 templates (Website, Email, Phone, WhatsApp, Location, WiFi, vCard)  
✅ **Color Customization**: Picker + text input (bidirectional sync)  
✅ **Size Adjustment**: 100-1000px  
✅ **Download PNG**: Save as image file  
✅ **Copy to Clipboard**: Quick sharing  
✅ **Toast Notifications**: Success/error feedback  
✅ **Keyboard Shortcuts**: Ctrl+Enter (generate), Escape (clear)  
✅ **Auto-save**: Settings persist in localStorage  
✅ **Responsive**: Works on desktop/tablet/mobile  

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + Enter` | Generate QR code |
| `Escape` | Clear form / Start new |

---

## 🎨 Brand Colors

```css
Primary Red:    #e74c3c
Primary Orange: #f39c12
Dark Blue:      #2c3e50
Light Gray:     #ecf0f1
```

---

## 🛠️ Commands

### Start Server (Current):
```bash
cd D:\Murali_Printers\QR_Code_Generator
npm start
```

### Development Mode (Auto-restart):
```bash
npm run dev
```

### Frontend Only (No API):
```bash
npm run frontend-only
```

### Stop Server:
```
Press Ctrl+C in terminal
```

---

## 📖 Documentation

- **README.md** - Complete documentation
- **API_DOCUMENTATION.md** - Full API guide
- **QUICK_START.md** - Getting started guide

---

## 🔧 Integration Examples

### JavaScript (Browser):
```javascript
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

### cURL (Terminal):
```bash
# Generate and save as PNG
curl -X POST http://localhost:3001/api/generate-png \
  -H "Content-Type: application/json" \
  -d '{"text":"https://muraliprinters.com","size":500}' \
  --output qrcode.png
```

### Python:
```python
import requests

response = requests.post('http://localhost:3001/api/generate', json={
    'text': 'https://muraliprinters.com',
    'size': 300
})

data = response.json()
print(data['qrCode'])  # Base64 image
```

---

## 📝 Common QR Formats

| Type | Format |
|------|--------|
| Website | `https://muraliprinters.com` |
| Email | `mailto:info@muraliprinters.com` |
| Phone | `tel:+919876543210` |
| WhatsApp | `https://wa.me/919876543210?text=Hello` |
| SMS | `sms:+919876543210?body=Hello` |
| Location | `https://maps.google.com/?q=12.9716,77.5946` |
| WiFi | `WIFI:T:WPA;S:NetworkName;P:Password;;` |

---

## ⚡ Performance

- **Single QR**: < 50ms
- **Batch (10)**: < 200ms
- **Batch (50)**: < 500ms
- **Max Size**: 1000x1000px

---

## 🎯 Use Cases

✅ Product packaging  
✅ Business cards  
✅ Brochures & flyers  
✅ Menu cards  
✅ Event invitations  
✅ Certificates  
✅ Promotional materials  
✅ API integration  

---

## 🔒 Privacy & Security

✅ No data persistence  
✅ No logging  
✅ CORS enabled  
✅ Client-side option available  
✅ No tracking  

---

**Version**: 2.0.0  
**Mode**: Full Stack (Frontend + Backend)  
**Status**: ✅ Running  
**Last Updated**: October 20, 2025
