import { chromium } from 'playwright';

async function inspectTopSlices() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  const report = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Look at the top center of the image, between x=450 and 700, y=0 to y=100
    // Is there hair or face or collar or nothing?
    const rows = [];
    for (let y = 0; y < 100; y += 10) {
      const colors = [];
      for (let x = 500; x <= 650; x += 30) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        colors.push(`rgb(${d[0]},${d[1]},${d[2]})`);
      }
      rows.push({ y, colors });
    }
    return rows;
  });

  console.log('Top rows:', JSON.stringify(report, null, 2));
  await browser.close();
}

inspectTopSlices();

