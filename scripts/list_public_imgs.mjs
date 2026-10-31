import fs from 'fs';
import path from 'path';

const files = fs.readdirSync('public/images');
console.log('Files in public/images:', files);

