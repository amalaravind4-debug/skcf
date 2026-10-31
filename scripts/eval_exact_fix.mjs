import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/side_by_side_fix.png');

  // Measure head in current (x=32..426, y=50..310) vs fixed (x=460..854, y=50..310)
  const analysis = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    function countHead(startX, startY, w, h) {
      let hair = 0;
      let skin = 0;
      for (let y = startY; y < startY + h; y++) {
        for (let x = startX; x < startX + w; x++) {
          const d = ctx.getImageData(x, y, 1, 1).data;
          const r = d[0], g = d[1], b = d[2];
          // hair: dark
          if (r < 70 && g < 70 && b < 70) hair++;
          // skin
          if (r > 120 && g > 70 && b > 50 && r > g && r > b) skin++;
        }
      }
      return { hair, skin };
    }

    // Top 30% of each card
    const current = countHead(32, 50, 394, 90);
    const fixedTop = countHead(460, 50, 394, 90);
    const fixedContain = countHead(890, 50, 394, 90);

    return { current, fixedTop, fixedContain };
  });

  console.log('Head visibility in top 30% of card:');
  console.log('Current (cut off):', analysis.current);
  console.log('Fixed (object-top):', analysis.fixedTop);
  console.log('Fixed (contain):', analysis.fixedContain);
  await browser.close();
}

main();

