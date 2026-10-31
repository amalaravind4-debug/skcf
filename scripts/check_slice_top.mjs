import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('file:///C:/Users/Amal Aravind/Desktop/skcf/thrithala-branch/screenshots/trad_slice_top.png');

  const info = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const d = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    // Find non-white/non-grey pixels
    let objects = [];
    for (let y = 10; y < canvas.height - 10; y += 10) {
      let rowNonBg = 0;
      for (let x = 10; x < canvas.width - 10; x += 10) {
        const i = (y * canvas.width + x) * 4;
        const r = d[i], g = d[i+1], b = d[i+2];
        // studio wall is ~210..240
        if (Math.abs(r - 225) + Math.abs(g - 225) + Math.abs(b - 235) > 40) {
          rowNonBg++;
        }
      }
      objects.push({ y, nonBgCount: rowNonBg });
    }
    return objects;
  });

  console.log('trad_slice_top row non-bg counts:');
  console.log(info.filter(o => o.nonBgCount > 0));
  await browser.close();
}

main();

