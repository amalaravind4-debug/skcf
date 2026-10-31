import { chromium } from 'playwright';

async function checkHeroContent() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  
  // What is shown in hero-flying-kick.jpg?
  const isPurpleFlyingKick = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Look at center x=512, y=384
    const d = ctx.getImageData(512, 384, 1, 1).data;
    return {
      w: img.naturalWidth,
      h: img.naturalHeight,
      centerRgb: [d[0], d[1], d[2]]
    };
  });

  console.log('hero-flying-kick info:', isPurpleFlyingKick);
  await browser.close();
}

checkHeroContent();

