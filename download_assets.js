import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const photos = [
  { name: 'swiss_alps.jpg', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80' },
  { name: 'kyoto_garden.jpg', url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200&q=80' },
  { name: 'hallstatt_lake.jpg', url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=1200&q=80' },
  { name: 'golden_retriever.jpg', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=1200&q=80' },
  { name: 'cute_cat_real.jpg', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=80' },
  { name: 'aurora_borealis.jpg', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80' },
  { name: 'lavender_field.jpg', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80' },
  { name: 'starry_night.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg' }
];

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const get = (targetUrl) => {
      https.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          get(response.headers.location);
          return;
        }
        if (response.statusCode !== 200) {
          reject(new Error(`Failed with status ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    };
    get(url);
  });
};

async function run() {
  for (const p of photos) {
    const dest = path.join(__dirname, 'assets', p.name);
    try {
      console.log(`Downloading ${p.name}...`);
      await download(p.url, dest);
      console.log(`Success: ${p.name}`);
    } catch (e) {
      console.error(`Error downloading ${p.name}:`, e.message);
    }
  }
  console.log('All downloads completed!');
}

run();
