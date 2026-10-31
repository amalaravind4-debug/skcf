import { chromium } from 'playwright';

async function checkDetails() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  for (const imgName of ['google-maps-2.jpg', 'google-maps-3.jpg', 'traditional-flying-kick.jpg']) {
    await page.goto(`http://localhost:5173/images/${imgName}`);
    const info = await page.evaluate(() => {
      const img = document.querySelector('img');
      return { w: img.naturalWidth, h: img.naturalHeight };
    });
    console.log(`${imgName} dimensions:`, info);
  }
  await browser.close();
}

checkDetails();

