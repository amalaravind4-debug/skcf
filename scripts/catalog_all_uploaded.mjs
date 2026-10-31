import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
  
  const dir = 'C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded';
  const files = fs.readdirSync(dir);

  let html = '<html><body style="background:#1a1a1a; color:#eee; font-family:sans-serif; padding:20px;"><h1>All User Uploaded Images</h1><div style="display:flex; flex-wrap:wrap; gap:16px;">';
  
  for (const f of files) {
    if (f.endsWith('.jpg') || f.endsWith('.png')) {
      const stats = fs.statSync(path.join(dir, f));
      html += `<div style="border:1px solid #444; padding:8px; width:220px; background:#222; text-align:center;">
        <div style="font-size:10px; word-break:break-all; margin-bottom:4px;">${f} (${stats.size}b)</div>
        <img src="file:///${dir}/${f}" style="max-width:200px; max-height:160px; object-fit:contain; border:1px solid #666;" />
      </div>`;
    }
  }
  html += '</div></body></html>';

  await page.setContent(html);
  await page.screenshot({ path: 'screenshots/all_uploaded_gallery.png', fullPage: true });
  console.log('Saved screenshots/all_uploaded_gallery.png');
  await browser.close();
}

main();

