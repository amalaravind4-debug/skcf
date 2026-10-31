import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Let's check where the person is in traditional-flying-kick.jpg
  // Let's sample colors in traditional-flying-kick.jpg at:
  // (x=400, y=50), (x=400, y=100), (x=400, y=150), (x=400, y=200), (x=400, y=250), (x=400, y=300)...
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  const samples = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const s = [];
    for (let y = 0; y < canvas.height; y += 40) {
      const d = ctx.getImageData(canvas.width / 2, y, 1, 1).data;
      s.push({ y, rgb: [d[0], d[1], d[2]] });
    }
    return s;
  });

  console.log('Center line pixels from y=0 to y=1020:');
  console.log(samples);
  await browser.close();
}

main();

