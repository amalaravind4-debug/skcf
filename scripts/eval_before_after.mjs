import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/before_vs_after_card10.png');

  // Let's sample colors in the left (before) vs right (after) cards
  const res = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Left card top center: (x = 32 + 394/2 = 229, y = 70..130)
    // Right card top center: (x = 460 + 394/2 = 657, y = 70..130)
    function getColors(x, startY, endY) {
      const arr = [];
      for (let y = startY; y <= endY; y += 15) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        arr.push({ y, rgb: [d[0], d[1], d[2]] });
      }
      return arr;
    }

    return {
      beforeTopCenter: getColors(229, 80, 150),
      afterTopCenter: getColors(657, 80, 150),
    };
  });

  console.log('Before fix top center column (y=80..150):');
  console.log(res.beforeTopCenter);
  console.log('After fix top center column (y=80..150):');
  console.log(res.afterTopCenter);
  await browser.close();
}

main();

