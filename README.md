# 🎨 QR Code Generator - Murali Printers Edition

A beautiful, frontend-only QR code generator with Murali Printers theme. No backend server required!

## ✨ Features

- ✅ **100% Frontend** - No server needed, works offline
- 🎨 **Murali Printers Theme** - Matching brand colors and design
- �️ **Customizable** - Colors, size, and style options
- 📥 **Download & Copy** - Export as PNG or copy to clipboard
- ⚡ **Instant Generation** - Real-time QR code creation
- 💾 **Auto-Save** - Remembers your settings
- ⌨️ **Keyboard Shortcuts** - Quick access to features
- 📱 **Responsive** - Works on all devices
- 🔒 **Privacy First** - All processing happens in your browser

## 🚀 Quick Start

### Option 1: Simple Web Server (Recommended)

```bash
# Install dependencies
npm install

# Start server
npm start
```

Then open `http://localhost:3001` in your browser.

### Option 2: Direct File Open

Simply open `public/index.html` in your web browser. That's it!

### Option 3: Any Web Server

Serve the `public` folder with any web server:
```bash
# Python
python -m http.server 3001

# PHP
php -S localhost:3001

# Node http-server
npx http-server public -p 3001
```

## � Project Structure

```
QR_Code_Generator/
├── public/
│   ├── index.html      # Main page
│   ├── styles.css      # Murali Printers theme
│   └── script.js       # QR generation logic
├── package.json        # Dependencies
└── README.md          # This file
```

## 🎯 How to Use

1. **Enter Content**
   - Website URL: `https://muraliprinters.com`
   - Email: `mailto:info@muraliprinters.com`
   - Phone: `tel:+919876543210`
   - WhatsApp: `https://wa.me/919876543210`
   - WiFi: `WIFI:T:WPA;S:NetworkName;P:Password;;`
   - vCard: Contact information format
   - Any text!

2. **Customize Appearance**
   - **Size**: 100px - 1000px (default: 300px)
   - **Dark Color**: QR code color (default: black)
   - **Light Color**: Background color (default: white)

3. **Generate**
   - Click "Generate QR Code" button
   - Or press `Ctrl/Cmd + Enter`

4. **Save or Share**
   - **Download PNG**: Save to your computer
   - **Copy Image**: Copy to clipboard
   - **Generate New**: Start fresh

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + Enter` - Generate QR code
- `Escape` - Clear and start new

## 🎨 Quick Samples

Click any sample button to auto-fill:
- 🌐 **Website** - Company website URL
- 📧 **Email** - Contact email
- 📞 **Phone** - Contact number
- 💬 **WhatsApp** - WhatsApp chat link
- 📍 **Location** - Google Maps location
- � **WiFi** - WiFi credentials
- � **vCard** - Digital business card

## 🎨 Brand Colors

The generator uses Murali Printers' official colors:
- **Primary Red**: `#e74c3c`
- **Primary Orange**: `#f39c12`
- **Dark Blue**: `#2c3e50`
- **Success Green**: `#27ae60`
- **Info Blue**: `#3498db`

## 💡 Use Cases

### Business
- � Business cards
- 📄 Brochures and flyers
- �📦 Product packaging
- 🏷️ Price tags

### Marketing
- 🎉 Event invitations
- � Social media sharing
- 🎁 Promotional materials
- 📰 Print advertisements

### Technical
- 🔐 Authentication codes
- 📡 WiFi credentials
- 📍 Location sharing
- 💳 Payment links

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Structure
- **CSS3** - Murali Printers theme
- **JavaScript (Vanilla)** - Logic
- **QRCode.js** - QR generation library (CDN)
- **Font Awesome** - Icons (CDN)

### Browser Compatibility
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Features
- Canvas-based rendering
- LocalStorage for auto-save
- Clipboard API for copying
- Blob API for downloading
- No external dependencies (except CDN)

## 📱 Responsive Design

Works perfectly on:
- 💻 Desktop (1920px+)
- 💻 Laptop (1366px - 1920px)
- 📱 Tablet (768px - 1366px)
- 📱 Mobile (320px - 768px)

## � Privacy & Security

- ✅ **No data sent to server** - Everything runs in your browser
- ✅ **Works offline** - After initial page load
- ✅ **No tracking** - No analytics or cookies
- ✅ **No storage** - Only saves your preferences locally
- ✅ **Open source** - Inspect the code yourself

## 🚀 Deployment

### GitHub Pages
```bash
# Push public folder to gh-pages branch
git subtree push --prefix public origin gh-pages
```

### Netlify
Drag and drop the `public` folder to Netlify

### Vercel
```bash
vercel --prod public
```

### Any Static Host
Just upload the `public` folder!

## 🤝 Integration with Murali Printers Website

This can be easily integrated into the main Murali Printers React app:

```jsx
// In your React app
import QRGenerator from './pages/QRGenerator';

// Add route
<Route path="/qr-generator" element={<QRGenerator />} />
```

## 📝 License

ISC - Murali Printers © 2025

## 👨‍💻 Author

Murali Printers Development Team

---

## 🎉 Quick Tips

1. **For Print**: Use 500-800px for best quality
2. **For Web**: Use 200-400px for faster loading
3. **For Business Cards**: Use 200-300px
4. **For Posters**: Use 800-1000px

5. **Color Tips**:
   - High contrast = easier scanning
   - Dark colors work best for QR squares
   - Light colors work best for background
   - Match your brand colors when possible

6. **Content Tips**:
   - Keep URLs short for simpler codes
   - Use URL shorteners for long links
   - Test QR codes before printing
   - Include a clear call-to-action near the QR code

---

**Need help?** Open an issue or contact: info@muraliprinters.com

**Live Demo**: Open `public/index.html` in your browser! 🎨
