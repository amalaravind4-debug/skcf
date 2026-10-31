import https from 'https';
import fs from 'fs';

const url = 'https://lh3.googleusercontent.com/grass-cs/AABkmLcp8s9T47S9vL0_07DaRj6i-w7v2ZVOthk9Xk-bWdYBLU5TqvutVy1OETuNW8OvD1d5sVIX0rAN2xQBHa7Vpk9yZsy2OXdPDctQp1jK0OQY4i8mWhrXhIeseU1gW-vuTmfdEqCKjdcdWIz8=s0';

const file = fs.createWriteStream('screenshots/google_original_flying_kick.jpg');
https.get(url, (response) => {
  response.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Downloaded Google original image. Size:', fs.statSync('screenshots/google_original_flying_kick.jpg').size);
  });
}).on('error', (err) => {
  console.error('Download error:', err);
});

