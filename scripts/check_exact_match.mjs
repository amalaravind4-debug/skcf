import { chromium } from 'playwright';

async function checkExactMatch() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Check if traditional-flying-kick.jpg has a head or if it's already cropped
  await page.goto('http://localhost:5173/images/traditional-flying-kick.jpg');
  const tradInfo = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // inspect top 20 rows
    const top20 = ctx.getImageData(img.naturalWidth / 2, 0, 1, 20).data;
    return {
      w: img.naturalWidth,
      h: img.naturalHeight,
      sampleY0: [top20[0], top20[1], top20[2]],
      sampleY10: [top20[40], top20[41], top20[42]]
    };
  });

  console.log('traditional-flying-kick top:', tradInfo);
  await browser.close();
}

checkExactMatch();

