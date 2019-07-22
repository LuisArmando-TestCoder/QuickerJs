// can use this cdn -> 
// https://cdnjs.cloudflare.com/ajax/libs/three.js/102/three.js

// const {camera, renderer, scene} = setThreeJS();
function setThreeJS({
    color = '#e5e5e5',
    camZ = 10,
    parent = document.body,
    lightPositions = [{
        x: 0,
        y: 0,
        z: 0
    }, {
        x: 0,
        y: 0,
        z: 25
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
        const light = new THREE.PointLight(0xFFFFFF, 1, 500);
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

function pushShape(array, {
    x,
    y,
    z,
    material = {
        color: '#f0f0f0'
    },
    shape = 'box'
}) {
    const meshMaterial = new THREE.MeshLambertMaterial(material);
    const shapes = {
        box() {
            return new THREE.BoxGeometry(x, y, z);
        },
        sphere() {
            return new THREE.SphereGeometry(x, y, z);
        }
    };
    array.push(new THREE.Mesh(shapes[shape], meshMaterial));
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