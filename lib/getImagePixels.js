function getImageData(img) {
    let assistantImage = img;

    if (typeof img === 'string') {
        assistantImage = new Image();
        assistantImage.crossOrigin = 'anonymous';
        assistantImage.src = img;
    }

    return new Promise((resolve, reject) => {
        const c = document.createElement('canvas');
        const ctx = c.getContext('2d');
        assistantImage.addEventListener('load', () => {
            c.width = assistantImage.width;
            c.height = assistantImage.height;
            ctx.drawImage(assistantImage, 0, 0, c.width, c.height);
            resolve(ctx.getImageData(0, 0, c.width, c.height));
        });
        assistantImage.addEventListener('error', reject);
    });
}

function getPixel(data) {
    const [red, green, blue, alpha, x, y] = data;
    const pixel = {
        red,
        green,
        blue,
        alpha, x, y,
        c: `rgba(${red},${green},${blue},${alpha})`,
        leg1: 0,
        leg2: 0,
        w: this.pixelSize,
        h: this.pixelSize,
        r: this.pixelSize / 2,
        drive: 0
    };
    return pixel;
}

function hasPixelRemainder(coord) {
    return coord % (this.pixelSize + this.separation) === 0;
}

function getImageParticles(imageData, config) {
    const canvasPixels = [];
    for (let i = 0; i < imageData.data.length; i += 4) {
        const scaledI = i / 4;
        const pixel = getPixel.call(
            config,
            [
                imageData.data[i],
                imageData.data[i + 1],
                imageData.data[i + 2],
                imageData.data[i + 3],
                scaledI % imageData.width,
                Math.floor(scaledI / imageData.width)
            ]
        );
        const remain = hasPixelRemainder.bind(config);
        const canGetPixel = remain(pixel.x) &&
                            remain(pixel.y) &&
                            config.passesUmbral(pixel);
        pixel.x += (
            config.slope && config.slope.x ? config.slope.x(imageData.width) : 0
        );
        pixel.y += (
            config.slope && config.slope.y ? config.slope.y(imageData.height) : 0
        );

        pixel.original = {
            x: pixel.x,
            y: pixel.y
        };

        if (canGetPixel) {
            canvasPixels.push(pixel);
        }
    }
    return canvasPixels;
}

async function getImagePixels(imagePath, config) {
    return new Promise((resolve, reject) => {
        getImageData(imagePath)
        .then(imageData => {
            const particles = getImageParticles(imageData, config);
            resolve(particles);
        })
        .catch(reject);
    });
}

let particles = [];
const setParticles = () => getImagePixels(
    "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=690",
    config
)
.then(pixels => {
    console.log(pixels.length);
    particles = pixels;
}).catch(console.error);
setParticles();
