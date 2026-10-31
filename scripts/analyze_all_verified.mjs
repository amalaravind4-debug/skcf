import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const cards = [
    'verified_desktop_hero_card.png',
    'verified_desktop_kick_card_0.png',
    'verified_desktop_kick_card_1.png',
    'verified_desktop_kick_card_2.png',
    'verified_desktop_kick_card_3.png',
    'verified_mobile_hero_card.png',
    'verified_mobile_kick_card_0.png',
    'verified_mobile_kick_card_1.png',
    'verified_mobile_kick_card_2.png',
    'verified_mobile_kick_card_3.png',
  ];

  for (const c of cards) {
    await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/' + c);
    const analysis = await page.evaluate(() => {
      const img = document.querySelector('img');
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

      // Check hair (dark) in top 40% of the image
      let darkHairTop = 0;
      let topHairY = -1;
      let lowestElementY = -1;

      for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          const r = d[i], g = d[i+1], b = d[i+2];
          if (r < 70 && g < 70 && b < 70) {
            if (y < canvas.height * 0.45) {
              darkHairTop++;
              if (topHairY === -1) topHairY = y;
            }
            lowestElementY = y;
          }
        }
      }

      return {
        w: canvas.width,
        h: canvas.height,
        darkHairTop,
        topHairY,
        clearanceAboveHead: topHairY,
        lowestElementY,
        marginAtBottom: canvas.height - lowestElementY
      };
    });

    console.log(`${c}:`, analysis);
  }

  await browser.close();
}

main();

