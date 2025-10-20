const express = require('express');
const QRCode = require('qrcode');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Murali Printers QR Generator',
    version: '2.0.0',
    timestamp: new Date().toISOString()
  });
});

// Generate QR Code - Returns base64 data URL
app.post('/api/generate', async (req, res) => {
  try {
    const { 
      text, 
      size = 300, 
      darkColor = '#000000', 
      lightColor = '#ffffff' 
    } = req.body;

    if (!text) {
      return res.status(400).json({ 
        error: 'Text is required',
        message: 'Please provide text or URL to generate QR code'
      });
    }

    const options = {
      width: parseInt(size),
      color: {
        dark: darkColor,
        light: lightColor
      },
      errorCorrectionLevel: 'M'
    };

    const qrCode = await QRCode.toDataURL(text, options);

    res.json({
      success: true,
      qrCode: qrCode,
      metadata: {
        text: text,
        size: size,
        darkColor: darkColor,
        lightColor: lightColor,
        format: 'base64',
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('QR Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate QR code',
      message: error.message
    });
  }
});

// Generate QR Code - Returns PNG buffer
app.post('/api/generate-png', async (req, res) => {
  try {
    const { 
      text, 
      size = 300, 
      darkColor = '#000000', 
      lightColor = '#ffffff' 
    } = req.body;

    if (!text) {
      return res.status(400).json({ 
        error: 'Text is required',
        message: 'Please provide text or URL to generate QR code'
      });
    }

    const options = {
      width: parseInt(size),
      color: {
        dark: darkColor,
        light: lightColor
      },
      errorCorrectionLevel: 'M'
    };

    const buffer = await QRCode.toBuffer(text, options);

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', 'inline; filename="qrcode.png"');
    res.send(buffer);

  } catch (error) {
    console.error('PNG Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate PNG',
      message: error.message
    });
  }
});

// Batch QR Code generation
app.post('/api/generate-batch', async (req, res) => {
  try {
    const { items, size = 300, darkColor = '#000000', lightColor = '#ffffff' } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        error: 'Items array is required',
        message: 'Please provide an array of items to generate QR codes'
      });
    }

    if (items.length > 50) {
      return res.status(400).json({ 
        error: 'Too many items',
        message: 'Maximum 50 QR codes can be generated at once'
      });
    }

    const options = {
      width: parseInt(size),
      color: {
        dark: darkColor,
        light: lightColor
      },
      errorCorrectionLevel: 'M'
    };

    const results = await Promise.all(
      items.map(async (item) => {
        try {
          const qrCode = await QRCode.toDataURL(item.text || item, options);
          return {
            success: true,
            text: item.text || item,
            label: item.label || null,
            qrCode: qrCode
          };
        } catch (error) {
          return {
            success: false,
            text: item.text || item,
            error: error.message
          };
        }
      })
    );

    res.json({
      success: true,
      total: results.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results: results,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('Batch Generation Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate batch QR codes',
      message: error.message
    });
  }
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested endpoint does not exist',
    availableEndpoints: [
      'GET  / - Frontend UI',
      'GET  /api/health - Health check',
      'POST /api/generate - Generate QR code (base64)',
      'POST /api/generate-png - Generate QR code (PNG)',
      'POST /api/generate-batch - Generate multiple QR codes'
    ]
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════╗
║                                                      ║
║   🖨️  Murali Printers - QR Code Generator API       ║
║                                                      ║
║   Status: ✅ Running                                 ║
║   Port: ${PORT}                                          ║
║   URL: http://localhost:${PORT}                          ║
║                                                      ║
║   Frontend: http://localhost:${PORT}/                    ║
║   API: http://localhost:${PORT}/api                      ║
║                                                      ║
║   Endpoints:                                         ║
║   • GET  /api/health                                 ║
║   • POST /api/generate                               ║
║   • POST /api/generate-png                           ║
║   • POST /api/generate-batch                         ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
  `);
});
