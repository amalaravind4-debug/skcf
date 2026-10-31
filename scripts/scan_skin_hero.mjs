import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  const scan = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    // Detect skin tones: R > 95, G > 40, B > 20, max-min > 15, |R-G| > 15, R > G, R > B
    // Detect hair: dark pixels near skin
    let skinPixels = [];
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        const isSkin = (r > 95 && g > 40 && b > 20 &&
                        (Math.max(r, g, b) - Math.min(r, g, b) > 15) &&
                        Math.abs(r - g) > 15 && r > g && r > b);
        if (isSkin) {
          skinPixels.push({ x, y, r, g, b });
        }
      }
    }
    
    // Group skin pixels by regions
    // Top-most skin pixels:
    skinPixels.sort((a, b) => a.y - b.y);
    return {
      totalSkin: skinPixels.length,
      topSkin: skinPixels.slice(0, 20),
      bottomSkin: skinPixels.slice(-10)
    };
  });

  console.log('Total skin pixels found:', scan.totalSkin);
  console.log('Topmost skin pixels:');
  console.log(scan.topSkin);
  await browser.close();
}

main();

