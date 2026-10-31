import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');

  const bounds = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let minX = canvas.width, maxX = 0, minY = canvas.height, maxY = 0;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        // non-background (studio is ~210..245)
        const diff = Math.abs(r - 230) + Math.abs(g - 225) + Math.abs(b - 230);
        if (diff > 45) {
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
      personBounds: { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY },
      aspect: (maxX - minX) / (maxY - minY)
    };
  });

  console.log('Person exact bounds in traditional-flying-kick.jpg:');
  console.log(bounds);
  await browser.close();
}

main();

