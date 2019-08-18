// can use this cdn -> 
// https://cdnjs.cloudflare.com/ajax/libs/three.js/102/three.js

// const {camera, renderer, scene} = setThreeJS();
function setThreeJS({
    color = '#e5e5e5',
    camZ = 10,
    parent = document.body,
    lightPositions = [{
        x: 0,
        y: 5,
        z: -1
    }, {
        x: 0,
        y: 0,
        z: 25
    }, {
        x: -10,
        y: 10,
        z: 10
    }, {
        x: 10,
        y: 10,
        z: -10
    }]
}) {

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    camera.position.z = camZ;

    renderer.setClearColor(color);
    renderer.setSize(window.innerWidth, window.innerHeight);

    parent.appendChild(renderer.domElement);

    lightPositions.forEach(({
        x,
        y,
        z
    }) => {
        const light = new THREE.PointLight(0xFFFFFF, 1.5, 100);
        light.position.set(x, y, z);
        scene.add(light);
    });

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerWidth;
        camera.updateProjectionMatrix();
    });

    return {
        scene,
        camera,
        renderer
    }
}

function insertMesh(array, obj) {
    const shapes = {
        box() {
            return new THREE.BoxGeometry(obj.w, obj.h, obj.depth);
        },
        sphere() {
            return new THREE.SphereGeometry(obj.r, obj.w, obj.h);
        }
    }
    const meshMaterial = new THREE.MeshLambertMaterial({
        color: obj.c
    });
    let mesh = new THREE.Mesh(shapes[obj.shape](), meshMaterial);

    mesh.position.set(obj.x, obj.y, obj.z);
    mesh = Object.assign(mesh, {
        x: obj.x,
        y: obj.y,
        z: obj.z
    }); // just add origin vertex to instance object
    array.push(mesh);
}

function r(min, max) {
    return +(Math.random() * ((max + 1) - min) + min).toFixed(3);
}

function calculateDistance(obj1, obj2) {
    const x = obj2.x - obj1.x;
    const y = obj2.y - obj1.y;
    const z = obj2.z - obj1.z;
    const distance = Math.sqrt(x ** 2 + y ** 2 + z ** 2);
    return distance;
}

// variable = analyseAudio(audio) --> after user triggering (click or alike)
// variable.getFrequency().array --> inside a framelooper function
function analyseAudio(audio) {
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

function getColorUmbral(red, green, blue) {
    return (765 - (red + green + blue)) / 3;
}

// can use it like this

// const {
//     camera,
//     renderer,
//     scene
// } = setThreeJS({camZ: 2});
// const blocks = [];

// insertMesh(blocks, {
//     c: '#888',
//     x: 1,
//     y: 0,
//     z: 0,
//     w: 1,
//     h: 2,
//     depth: 1,
//     shape: 'box'
// });

// insertMesh(blocks, {
//     c: '#888',
//     x: -0.5,
//     y: 0,
//     z: 1,
//     w: 20,
//     h: 20,
//     r: 0.1,
//     shape: 'sphere'
// });

// blocks.forEach(b => {
//     scene.add(b);
// });

// renderer.render(scene, camera);

function setCenteredGroup({
    amount,
    gap,
    additional = {}
}) {
    const group = [];
    for (let i = 0; i < amount * gap; i += gap) {
        for (let j = 0; j < amount * gap; j += gap) {
            group.push(Object.assign({
                // to be replaced for whatever the object has
                y: typeof additional.y === 'function' ? additional.y() : 0,
                x: typeof additional.x === 'function' ? additional.x() : i - amount * gap / 2,
                z: typeof additional.z === 'function' ? additional.z() : j - amount * gap / 2
            }, additional));
        }
    }
    if (additional.shape) return group.map(o => {
        const array = [];
        insertMesh(array, o);
        scene.add(array[0]);
        return array[0];
    });
    return group;
}