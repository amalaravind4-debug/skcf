import { chromium } from 'playwright';

async function main() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 600 } });
  
  await page.setContent(`
    <div style="display:flex; gap:20px; background:#222; padding:20px;">
      <div>
        <h4 style="color:white">google-maps-1.jpg</h4>
        <img src="http://localhost:5173/images/google-maps-1.jpg" style="height:350px" />
      </div>
      <div>
        <h4 style="color:white">google-maps-2.jpg</h4>
        <img src="http://localhost:5173/images/google-maps-2.jpg" style="height:350px" />
      </div>
      <div>
        <h4 style="color:white">google-maps-3.jpg</h4>
        <img src="http://localhost:5173/images/google-maps-3.jpg" style="height:350px" />
      </div>
    </div>
  `);
  
  await page.screenshot({ path: 'screenshots/google_maps_imgs.png' });
  console.log('Saved screenshots/google_maps_imgs.png');
  await browser.close();
}

main();

