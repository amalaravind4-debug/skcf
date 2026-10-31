import { chromium } from 'playwright';

async function checkOptions() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  // Check pixel color at top center
  const headVisible = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    
    // Sample along the head at y=40, x=530..570
    const pixels = [];
    for (let x = 500; x <= 600; x += 10) {
      const d = ctx.getImageData(x, 40, 1, 1).data;
      pixels.push([d[0], d[1], d[2]]);
    }
    return pixels;
  });
  console.log('Pixels around y=40 in hero-flying-kick:', headVisible);
  await browser.close();
}

checkOptions();

