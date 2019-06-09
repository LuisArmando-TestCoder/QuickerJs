const c = document.querySelector('canvas');
const ctx = c.getContext('2d');

const size = function (w, h) {
    c.width = w;
    c.height = h;
    if (c.width === window.innerWidth) {
        window.addEventListener('resize', () => {
            c.width = window.innerWidth;
        });
    }
    if (c.height === window.innerHeight) {
        window.addEventListener('resize', () => {
            c.height = window.innerHeight;
        });
    }
}

const clear = function (f) {
    if (!f) {
        ctx.clearRect(0, 0, c.width, c.height);
    } else if (typeof f === 'function') {
        f();
    }
}

const draw = function (f) {
    if (typeof f === 'function') f();
    requestAnimationFrame(() => draw(f));
}

const render = function (vertex) {
    return {
        rect() {
            ctx.beginPath();
            ctx.save();
            ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
            ctx.rotate(vertex.rot);
            ctx.fillStyle = vertex.c;
            ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
            ctx.restore();
        },
        arc() {
            ctx.beginPath();
            ctx.arc(vertex.x, vertex.y, vertex.r, 0, Math.PI * 2);
            ctx.fillStyle = vertex.c;
        },
        img() {
            ctx.save();
            ctx.translate(vertex.x + vertex.w / 2, vertex.y + vertex.h / 2);
            ctx.rotate(vertex.rot);
            if (vertex.img.complete) {
                ctx.drawImage(vertex.img, -vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h)
            } else {
                ctx.fillRect(-vertex.w / 2, -vertex.h / 2, vertex.w, vertex.h);
            }
            ctx.fillStyle = vertex.c;
            ctx.restore();
        },
        txt() {
            ctx.beginPath();
            ctx.fillText(vertex.txt, vertex.x, vertex.y);
            ctx.fillStyle = vertex.c;
        }
    }
}

const renderGroup = function (type, array) {
    array.forEach((obj) => {
        render(obj)[type]();
    });
}

const r = function (min, max, fix = 0) {
    return (Math.random() * ((max + 1) - min) + min).toFixed(fix);
}

const fetchJSON = async (url, func) => {
    const r = await fetch(url)
        .then(res => res.json())
        .then(json => json);
    func(r);
};

const calculateDistance = function (obj1, obj2) {
    const x = obj2.x - obj1.x;
    const y = obj2.y - obj1.y;
    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return distance;
}

// variable = analyseAudio(audio) --> after user triggering (click or alike)
// variable.getFrequency().array --> inside a framelooper function
const analyseAudio = function (audio) {
    let source,
        context,
        analyser,
        audio_array;
    context = new AudioContext();
    analyser = context.createAnalyser();
    source = context.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(context.destination);

    function getAverage(array) {
        return array.reduce((a, b) => a + b) / array.length;
    }

    function getFrequency() {
        audio_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(audio_array);
        return {
            array: audio_array,
            average: getAverage(audio_array),
        }
    }

    function getAmplitude() {
        audio_array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteTimeDomainData(audio_array);
        return {
            array: audio_array,
            average: getAverage(audio_array),
        }
    }
    return {
        getFrequency: getFrequency,
        getAmplitude: getAmplitude,
    }
}