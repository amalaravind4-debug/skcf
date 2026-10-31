import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/verified_desktop_kick_card_3.png');

  const data = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's sample down the vertical column at x = 200 (around middle of the person)
    const samples = [];
    for (let y = 0; y < canvas.height; y += 20) {
      const d = ctx.getImageData(canvas.width / 2, y, 1, 1).data;
      samples.push({ y, rgb: [d[0], d[1], d[2]] });
    }

    // Let's also sample at x = 280 (where the head is in traditional-flying-kick)
    const headCol = [];
    for (let y = 0; y < 100; y += 10) {
      const d = ctx.getImageData(Math.round(canvas.width * 0.65), y, 1, 1).data;
      headCol.push({ y, rgb: [d[0], d[1], d[2]] });
    }

    return {
      w: canvas.width,
      h: canvas.height,
      centerCol: samples,
      headCol: headCol
    };
  });

  console.log('verified_desktop_kick_card_3 data:');
  console.log(JSON.stringify(data, null, 2));
  await browser.close();
}

main();
