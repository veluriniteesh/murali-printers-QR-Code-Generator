// ========================================
// QR CODE GENERATOR - FRONTEND ONLY
// Murali Printers Theme
// ========================================

// DOM Elements
const qrForm = document.getElementById('qrForm');
const textInput = document.getElementById('text');
const sizeInput = document.getElementById('size');
const darkColorInput = document.getElementById('darkColor');
const lightColorInput = document.getElementById('lightColor');
const darkColorText = document.getElementById('darkColorText');
const lightColorText = document.getElementById('lightColorText');
const resultCard = document.getElementById('resultCard');
const qrCanvas = document.getElementById('qrCanvas');
const qrContent = document.getElementById('qrContent');
const qrSize = document.getElementById('qrSize');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const newBtn = document.getElementById('newBtn');
const loadingOverlay = document.getElementById('loadingOverlay');
const toast = document.getElementById('toast');

// ========================================
// COLOR SYNC (Color picker <-> Text input)
// ========================================
darkColorInput.addEventListener('input', (e) => {
  darkColorText.value = e.target.value.toUpperCase();
});

darkColorText.addEventListener('input', (e) => {
  const color = e.target.value;
  if (/^#[0-9A-F]{6}$/i.test(color)) {
    darkColorInput.value = color;
  }
});

lightColorInput.addEventListener('input', (e) => {
  lightColorText.value = e.target.value.toUpperCase();
});

lightColorText.addEventListener('input', (e) => {
  const color = e.target.value;
  if (/^#[0-9A-F]{6}$/i.test(color)) {
    lightColorInput.value = color;
  }
});

// ========================================
// GENERATE QR CODE (Using Backend API)
// ========================================
qrForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const text = textInput.value.trim();
  const size = parseInt(sizeInput.value);
  const darkColor = darkColorInput.value;
  const lightColor = lightColorInput.value;

  if (!text) {
    showToast('Please enter text or URL', 'error');
    return;
  }

  try {
    // Show loading
    loadingOverlay.classList.add('active');

    // Call backend API to generate QR code
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: text,
        size: size,
        darkColor: darkColor,
        lightColor: lightColor
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate QR code');
    }

    const data = await response.json();

    // Create image from base64 data
    const img = new Image();
    img.onload = () => {
      // Draw to canvas
      qrCanvas.width = size;
      qrCanvas.height = size;
      const ctx = qrCanvas.getContext('2d');
      ctx.drawImage(img, 0, 0, size, size);

      // Display result
      qrContent.textContent = text;
      qrSize.textContent = `${size}x${size}px`;
      resultCard.style.display = 'block';
      resultCard.classList.add('active');
      
      // Smooth scroll to result
      resultCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      showToast('QR Code generated successfully!', 'success');
      
      // Hide loading
      loadingOverlay.classList.remove('active');
    };

    img.onerror = () => {
      throw new Error('Failed to load QR code image');
    };

    img.src = data.qrCode;

  } catch (error) {
    console.error('Error:', error);
    showToast('Error generating QR code: ' + error.message, 'error');
    loadingOverlay.classList.remove('active');
  }
});

// ========================================
// DOWNLOAD QR CODE
// ========================================
downloadBtn.addEventListener('click', () => {
  try {
    // Convert canvas to blob and download
    qrCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `qr-code-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      showToast('QR Code downloaded!', 'success');
    });
  } catch (error) {
    console.error('Download error:', error);
    showToast('Failed to download QR code', 'error');
  }
});

// ========================================
// COPY QR CODE TO CLIPBOARD
// ========================================
copyBtn.addEventListener('click', async () => {
  try {
    // Convert canvas to blob
    qrCanvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        showToast('QR Code copied to clipboard!', 'success');
      } catch (error) {
        console.error('Copy error:', error);
        showToast('Failed to copy. Try downloading instead.', 'error');
      }
    });
  } catch (error) {
    console.error('Copy error:', error);
    showToast('Failed to copy image', 'error');
  }
});

// ========================================
// GENERATE NEW QR CODE
// ========================================
newBtn.addEventListener('click', () => {
  resultCard.style.display = 'none';
  resultCard.classList.remove('active');
  textInput.value = '';
  textInput.focus();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========================================
// SAMPLE BUTTONS
// ========================================
const samples = [
  { 
    icon: 'fas fa-globe', 
    label: 'Website', 
    text: 'https://muraliprinters.com' 
  },
  { 
    icon: 'fas fa-envelope', 
    label: 'Email', 
    text: 'mailto:info@muraliprinters.com' 
  },
  { 
    icon: 'fas fa-phone', 
    label: 'Phone', 
    text: 'tel:+919876543210' 
  },
  { 
    icon: 'fab fa-whatsapp', 
    label: 'WhatsApp', 
    text: 'https://wa.me/919876543210' 
  },
  { 
    icon: 'fas fa-map-marker-alt', 
    label: 'Location', 
    text: 'https://maps.google.com/?q=Murali+Printers+Bangalore' 
  },
  { 
    icon: 'fas fa-wifi', 
    label: 'WiFi', 
    text: 'WIFI:T:WPA;S:MuraliPrinters;P:Password123;;' 
  },
  {
    icon: 'fas fa-address-card',
    label: 'vCard',
    text: `BEGIN:VCARD
VERSION:3.0
FN:Murali Printers
TEL:+919876543210
EMAIL:info@muraliprinters.com
URL:https://muraliprinters.com
END:VCARD`
  }
];

// Create sample buttons
const sampleButtonsContainer = document.getElementById('sampleButtons');
samples.forEach(sample => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'sample-btn';
  btn.innerHTML = `<i class="${sample.icon}"></i> ${sample.label}`;
  btn.addEventListener('click', () => {
    textInput.value = sample.text;
    textInput.focus();
    showToast(`${sample.label} template loaded`, 'info');
  });
  sampleButtonsContainer.appendChild(btn);
});

// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message, type = 'success') {
  const icons = {
    success: 'fas fa-check-circle',
    error: 'fas fa-exclamation-circle',
    info: 'fas fa-info-circle'
  };
  
  const colors = {
    success: 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)',
    error: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
    info: 'linear-gradient(135deg, #3498db 0%, #5dade2 100%)'
  };
  
  toast.innerHTML = `<i class="${icons[type]}"></i> ${message}`;
  toast.style.background = colors[type];
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to generate
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    qrForm.dispatchEvent(new Event('submit'));
  }
  
  // Escape to clear
  if (e.key === 'Escape' && resultCard.classList.contains('active')) {
    newBtn.click();
  }
});

// ========================================
// INITIALIZE
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  textInput.focus();
  
  // Add helpful placeholder animation
  const placeholders = [
    'https://muraliprinters.com',
    'mailto:info@muraliprinters.com',
    'tel:+919876543210',
    'Your text here...'
  ];
  
  let placeholderIndex = 0;
  setInterval(() => {
    textInput.placeholder = placeholders[placeholderIndex];
    placeholderIndex = (placeholderIndex + 1) % placeholders.length;
  }, 3000);
  
  console.log('%c🎨 QR Code Generator - Murali Printers', 'color: #e74c3c; font-size: 16px; font-weight: bold;');
  console.log('%c✨ Frontend-only, No server required!', 'color: #27ae60; font-size: 14px;');
  console.log('%c💡 Keyboard Shortcuts:', 'color: #3498db; font-size: 14px;');
  console.log('%c   • Ctrl/Cmd + Enter: Generate QR Code', 'color: #95a5a6; font-size: 12px;');
  console.log('%c   • Escape: Clear and start new', 'color: #95a5a6; font-size: 12px;');
});

// ========================================
// AUTO-SAVE TO LOCAL STORAGE
// ========================================
// Save form values to localStorage
const saveFormState = () => {
  const formState = {
    text: textInput.value,
    size: sizeInput.value,
    darkColor: darkColorInput.value,
    lightColor: lightColorInput.value
  };
  localStorage.setItem('qr_form_state', JSON.stringify(formState));
};

// Restore form values from localStorage
const restoreFormState = () => {
  const savedState = localStorage.getItem('qr_form_state');
  if (savedState) {
    try {
      const formState = JSON.parse(savedState);
      if (formState.text) textInput.value = formState.text;
      if (formState.size) sizeInput.value = formState.size;
      if (formState.darkColor) {
        darkColorInput.value = formState.darkColor;
        darkColorText.value = formState.darkColor;
      }
      if (formState.lightColor) {
        lightColorInput.value = formState.lightColor;
        lightColorText.value = formState.lightColor;
      }
    } catch (error) {
      console.error('Error restoring form state:', error);
    }
  }
};

// Auto-save on input
[textInput, sizeInput, darkColorInput, lightColorInput].forEach(input => {
  input.addEventListener('input', saveFormState);
});

// Restore on load
restoreFormState();
