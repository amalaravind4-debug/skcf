import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/hero_kick_contain.png');
  
  // Let's inspect the entire image of hero_kick_contain.png
  // How does it look? What are the bounds of the person?
  const analysis = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    
    // Find where the white card/background starts
    let minCardX = canvas.width, maxCardX = 0, minCardY = canvas.height, maxCardY = 0;
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        if (d[i] > 180 && d[i+1] > 180 && d[i+2] > 180) {
          if (x < minCardX) minCardX = x;
          if (x > maxCardX) maxCardX = x;
          if (y < minCardY) minCardY = y;
          if (y > maxCardY) maxCardY = y;
        }
      }
    }
    return {
      w: canvas.width,
      h: canvas.height,
      whiteBgBounds: { minCardX, maxCardX, minCardY, maxCardY }
    };
  });
  console.log('Analysis of hero_kick_contain:', analysis);
  await browser.close();
}

main();

