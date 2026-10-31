import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  for (const name of ['fixed_object_top_card.png', 'fixed_object_contain_card.png']) {
    await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/' + name);
    const data = await page.evaluate(() => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      // Card bounding box:
      // Inside card (ignore title text at top, title is y < 40)
      let headY = -1;
      let feetY = -1;

      for (let y = 45; y < canvas.height - 15; y++) {
        for (let x = 15; x < canvas.width - 15; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = d[i], g = d[i+1], b = d[i+2];
          // hair: dark
          if (r < 70 && g < 70 && b < 70) {
            if (headY === -1) headY = y;
          }
          // feet / shoe / robe near bottom
          if (r < 80 && g < 80 && b < 80) {
            feetY = y;
          }
        }
      }

      return {
        cardHeight: canvas.height,
        headFirstSeenY: headY,
        clearanceAboveHead: headY - 45,
        lowestElementY: feetY,
        bottomPadding: (canvas.height - 15) - feetY
      };
    });
    console.log(name, data);
  }
  await browser.close();
}

main();

