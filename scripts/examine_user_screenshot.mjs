import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793458887140_cee265b6.jpg');

  const meta = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's check corner pixels
    const topLeft = Array.from(ctx.getImageData(5, 5, 1, 1).data).slice(0, 3);
    const center = Array.from(ctx.getImageData(img.naturalWidth / 2, img.naturalHeight / 2, 1, 1).data).slice(0, 3);
    const topCenter = Array.from(ctx.getImageData(img.naturalWidth / 2, 5, 1, 1).data).slice(0, 3);
    const bottomCenter = Array.from(ctx.getImageData(img.naturalWidth / 2, img.naturalHeight - 5, 1, 1).data).slice(0, 3);

    return {
      w: img.naturalWidth,
      h: img.naturalHeight,
      topLeft, center, topCenter, bottomCenter
    };
  });

  console.log('User screenshot meta:', meta);
  await browser.close();
}

main();

