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

  // API to save custom data directly into the filesystem
  app.post('/api/save-data', (req, res) => {
    try {
      const { portfolios, reelsVideos, siteSettings, faqs, reviews, clients } = req.body;
      
      const customData = {
        hasCustomData: true,
        portfolios: portfolios || [],
        reelsVideos: reelsVideos || [],
        siteSettings: siteSettings || null,
        faqs: faqs || [],
        reviews: reviews || [],
        clients: clients || []
      };

      const filePath = path.join(process.cwd(), 'src', 'data_custom.json');
      fs.writeFileSync(filePath, JSON.stringify(customData, null, 2), 'utf8');

      console.log('Successfully saved custom data to source code for deployment!');
      res.json({ success: true, message: '설정이 소스코드에 영구적으로 기록되었습니다. 이제 다시 배포하시면 변경한 내용이 배포 버전에도 그대로 적용됩니다!' });
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
