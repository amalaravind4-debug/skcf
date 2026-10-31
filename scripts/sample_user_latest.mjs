import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/.gemini/antigravity/brain/fa468976-b1c3-4c62-b1fa-2178140d2808/.user_uploaded/media_1793460587653_a92a3be6.jpg');

  // In media_1793460587653_a92a3be6.jpg (size 1024x576 or similar)
  // Find the exact box of the center card and sample it
  const info = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Center card is around x=370..635, y=350..530
    const sampleTopCenter = Array.from(ctx.getImageData(500, 370, 1, 1).data).slice(0, 3);
    const samplePerson = Array.from(ctx.getImageData(500, 420, 1, 1).data).slice(0, 3);
    const sampleBottom = Array.from(ctx.getImageData(500, 500, 1, 1).data).slice(0, 3);

    return {
      w: canvas.width,
      h: canvas.height,
      sampleTopCenter,
      samplePerson,
      sampleBottom
    };
  });

  console.log('User screenshot sampled:', info);
  await browser.close();
}

main();

