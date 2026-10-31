import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793457804199_44a9fc5f.jpg');
  
  const colors = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 100, 100);
    // sample center
    const c = ctx.getImageData(50, 50, 1, 1).data;
    // sample top
    const t = ctx.getImageData(50, 10, 1, 1).data;
    // sample bottom
    const b = ctx.getImageData(50, 90, 1, 1).data;
    return {
      top: [t[0], t[1], t[2]],
      center: [c[0], c[1], c[2]],
      bottom: [b[0], b[1], b[2]],
    };
  });
  console.log('44a9fc5f colors:', colors);
  await browser.close();
}

main();

