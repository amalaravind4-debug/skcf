import { chromium } from 'playwright';

async function checkHeadInPhoto() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/images/hero-flying-kick.jpg');
  // inspect if there is a head in the photo
  const info = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    const img = document.querySelector('img');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // Find what is at the top of the purple robe
    // Purple robe is roughly rgb(150..190, 140..180, 180..220)
    // Head skin tone is roughly rgb(200..250, 160..210, 130..180)
    let skinPixels = 0;
    for (let y = 0; y < 150; y++) {
      for (let x = 400; x < 700; x++) {
        const d = ctx.getImageData(x, y, 1, 1).data;
        const r = d[0], g = d[1], b = d[2];
        if (r > 180 && g > 140 && b > 110 && r > g && g > b) skinPixels++;
      }
    }
    return { skinPixels };
  });

  console.log('Skin tone pixels near top:', info);
  await browser.close();
}

checkHeadInPhoto();

