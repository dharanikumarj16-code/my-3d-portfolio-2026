const path = require('path');
const sharp = require(path.resolve('./node_modules/sharp'));

const inputPath = 'C:/Users/dhara/.gemini/antigravity-ide/brain/7a2f2892-f723-4044-aab3-19cc7581ea74/dharani_3d_portrait_1793517777363.jpg';
const outputPath = 'public/assets/dharani-3d-avatar.png';

async function processImage() {
  const image = sharp(inputPath);
  const { data, info } = await image.raw().ensureAlpha().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  const isBackground = new Uint8Array(width * height);
  const visited = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let head = 0;
  let tail = 0;

  const addSeed = (x, y) => {
    const idx = y * width + x;
    if (x >= 0 && x < width && y >= 0 && y < height && !visited[idx]) {
      visited[idx] = 1;
      queue[tail++] = idx;
    }
  };

  // Top border
  for (let x = 0; x < width; x++) addSeed(x, 0);

  // Left & Right borders down to y = height - 120
  for (let y = 0; y < height - 120; y++) {
    addSeed(0, y);
    addSeed(width - 1, y);
  }

  // BFS flood fill
  // The outer rim light around Dharani is bright cyan/purple (maxVal > 45)
  // Background pixels have maxVal < 32
  while (head < tail) {
    const curr = queue[head++];
    const cx = curr % width;
    const cy = Math.floor(curr / width);
    const pixelIdx = curr * channels;

    const r = data[pixelIdx];
    const g = data[pixelIdx + 1];
    const b = data[pixelIdx + 2];
    const maxVal = Math.max(r, g, b);

    if (maxVal < 33) {
      isBackground[curr] = 1;

      const neighbors = [
        cx > 0 ? curr - 1 : -1,
        cx < width - 1 ? curr + 1 : -1,
        cy > 0 ? curr - width : -1,
        cy < height - 1 ? curr + width : -1,
      ];

      for (const n of neighbors) {
        if (n !== -1 && !visited[n]) {
          visited[n] = 1;
          queue[tail++] = n;
        }
      }
    }
  }

  const outputData = Buffer.from(data);

  for (let i = 0; i < width * height; i++) {
    const pIdx = i * channels;
    if (isBackground[i]) {
      outputData[pIdx + 3] = 0;
    } else {
      outputData[pIdx + 3] = 255;
    }
  }

  await sharp(outputData, { raw: { width, height, channels } })
    .png()
    .toFile(outputPath);

  console.log('Crystal clean transparent avatar generated!');
}

processImage().catch(console.error);
