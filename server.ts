import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse large JSON bodies (for Base64 images and videos)
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // Ensure public/uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Helper to save base64 string as a physical file and return its static path URL
  function saveBase64File(base64DataUri: string): string {
    if (!base64DataUri || typeof base64DataUri !== 'string' || !base64DataUri.startsWith('data:')) {
      return base64DataUri;
    }

    try {
      const matches = base64DataUri.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return base64DataUri;
      }

      const mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');

      let ext = 'bin';
      if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
        ext = 'jpg';
      } else if (mimeType.includes('png')) {
        ext = 'png';
      } else if (mimeType.includes('gif')) {
        ext = 'gif';
      } else if (mimeType.includes('webp')) {
        ext = 'webp';
      } else if (mimeType.includes('mp4')) {
        ext = 'mp4';
      } else if (mimeType.includes('webm')) {
        ext = 'webm';
      } else if (mimeType.includes('ogg')) {
        ext = 'ogg';
      } else if (mimeType.includes('quicktime')) {
        ext = 'mov';
      } else {
        const parts = mimeType.split('/');
        if (parts.length > 1) {
          ext = parts[1];
        }
      }

      const filename = `upload_${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${ext}`;
      const filePath = path.join(uploadsDir, filename);

      fs.writeFileSync(filePath, buffer);
      console.log(`Saved newly uploaded base64 file to ${filePath}`);

      return `/uploads/${filename}`;
    } catch (error) {
      console.error('Error saving base64 file:', error);
      return base64DataUri;
    }
  }

  // Recursively process any structure and replace base64 strings with public URLs
  function processBase64InObject(obj: any): any {
    if (!obj) return obj;

    if (typeof obj === 'string') {
      if (obj.startsWith('data:')) {
        return saveBase64File(obj);
      }
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => processBase64InObject(item));
    }

    if (typeof obj === 'object') {
      const newObj: any = {};
      for (const key of Object.keys(obj)) {
        newObj[key] = processBase64InObject(obj[key]);
      }
      return newObj;
    }

    return obj;
  }

  // API to save custom data directly into the filesystem
  app.post('/api/save-data', (req, res) => {
    try {
      const { portfolios, reelsVideos, siteSettings, faqs, reviews, clients } = req.body;
      const timestamp = Date.now();
      
      const customDataRaw = {
        hasCustomData: true,
        updatedAt: timestamp,
        portfolios: portfolios || [],
        reelsVideos: reelsVideos || [],
        siteSettings: siteSettings || null,
        faqs: faqs || [],
        reviews: reviews || [],
        clients: clients || []
      };

      // Process any base64 content in customData raw body
      const customData = processBase64InObject(customDataRaw);

      const filePath = path.join(process.cwd(), 'src', 'data_custom.json');
      fs.writeFileSync(filePath, JSON.stringify(customData, null, 2), 'utf8');

      console.log('Successfully saved custom data and processed base64 attachments!');
      res.json({ 
        success: true, 
        message: '설정이 소스코드에 영구적으로 기록되었습니다. 이제 다시 배포하시면 변경한 내용이 배포 버전에도 그대로 적용됩니다!',
        updatedAt: timestamp
      });
    } catch (error) {
      console.error('Error saving custom data:', error);
      res.status(500).json({ success: false, error: error instanceof Error ? error.message : String(error) });
    }
  });

  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
