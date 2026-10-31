import { chromium } from 'playwright';

async function checkHeadContent() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  
  const headData = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's sample colors in a box around x=400..600, y=100..350
    // Is there hair, eyes/face, collar?
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    // find bounding box of the whole person
    let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        // studio wall is rgb(200..230, 215..240, 225..250)
        const diff = Math.abs(r - 215) + Math.abs(g - 225) + Math.abs(b - 238);
        if (diff > 40) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    return {
      w: canvas.width,
      h: canvas.height,
      minX, maxX, minY, maxY,
      topMargin: minY,
      bottomMargin: canvas.height - maxY
    };
  });

  console.log('traditional-flying-kick full person bounds:', headData);
  await browser.close();
}

checkHeadContent();

