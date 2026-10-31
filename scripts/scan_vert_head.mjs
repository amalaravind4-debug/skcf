import { chromium } from 'playwright';

async function scanVerticalHead() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  const hits = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const detected = [];
    for (let y = 0; y < canvas.height; y += 5) {
      for (let x = 0; x < canvas.width; x += 5) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        // if purple robe or skin tone or black belt
        // purple robe has r < 190, b > 160, g < 180
        const isPurple = d[0] > 110 && d[0] < 170 && d[1] > 95 && d[1] < 160 && d[2] > 140 && d[2] < 210;
        const isSkin = d[0] > 180 && d[1] > 120 && d[2] < 160;
        const isBlack = d[0] < 70 && d[1] < 70 && d[2] < 70;
        if (isPurple || isSkin || isBlack) {
          detected.push({ y, x, isPurple, isSkin, isBlack, rgb: [d[0], d[1], d[2]] });
          break;
        }
      }
    }
    return {
      firstHit: detected[0],
      firstTen: detected.slice(0, 10),
      totalDetected: detected.length
    };
  });

  console.log('Vertical scan result:', JSON.stringify(hits, null, 2));
  await browser.close();
}

scanVerticalHead();

