import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/google_original_flying_kick.jpg');
  const samples = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, 300, 400);

    const rows = [];
    for (let y = 0; y < 400; y += 20) {
      const d = ctx.getImageData(150, y, 1, 1).data;
      rows.push(`y=${y}: rgb(${d[0]}, ${d[1]}, ${d[2]})`);
    }
    return rows;
  });
  console.log(samples.join('\n'));
  await browser.close();
}

main();

