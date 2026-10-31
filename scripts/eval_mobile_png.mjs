import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/mobile_options_detail.png');

  // Let's sample the top of card 1 (around x=190, y=55..110)
  // Let's sample the top of card 2 (around x=190, y=305..360)
  // Let's sample the top of card 3 (around x=190, y=555..610)
  const samples = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    function scanCard(topY, h) {
      let darkHair = 0;
      let skin = 0;
      let topHairY = -1;
      for (let y = topY; y < topY + h; y++) {
        for (let x = 20; x < canvas.width - 20; x++) {
          const d = ctx.getImageData(x, y, 1, 1).data;
          const r = d[0], g = d[i=1, d[1]], b = d[2];
          if (r < 70 && g < 70 && b < 70) {
            darkHair++;
            if (topHairY === -1) topHairY = y - topY;
          }
          if (r > 120 && g > 70 && b > 50 && r > g && r > b) {
            skin++;
          }
        }
      }
      return { darkHair, skin, topHairY };
    }

    return {
      w: canvas.width,
      h: canvas.height,
      opt1_object_top: scanCard(50, 220),
      opt2_object_center_5: scanCard(300, 220),
      opt3_object_contain: scanCard(550, 220),
    };
  });

  console.log('Mobile framing samples:', samples);
  await browser.close();
}

main();

