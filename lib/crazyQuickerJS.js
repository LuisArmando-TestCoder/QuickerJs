function quicker() {
  function makeFloatingRandom(min, max) {
    return Math.random() * ((max + 1) - min) + min;
  }
  function makeIntegerRandom(min, max) {
    return parseInt(Math.random() * ((max + 1) - min) + min, 10);
  }

  function createElementWithNS(elem) {
    const theElem = document.createElementNS('http://www.w3.org/2000/svg', elem);
    if (elem.toLowerCase() === 'svg') {
      theElem.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }
    return theElem;
  }

  const fetchJSON = async(url, func) => {
    const r = await fetch(url)
        .then(res => res.json())
        .then(json => json);
    func(r);
  };

  function getUrlVariableValueByName(variableKey = new RegExp('\\??&?(\\w{0,})=(\\w{0,})', 'g').exec(window.location.href)[1]) {
    return new RegExp(`\\??&?(${variableKey})=(\\w{0,})`, 'g').exec(window.location.href)[2];
  }

  // My sorting algorithms, the 'Cold Water Sorting'
  function sortFromHighestToLowest(unsortedArray) {
    let unsorted = [].concat(unsortedArray);
    let sorted = [];
    while(unsorted.length > 0) {
      let hn = unsorted[0]; // hn stands for highest number
      for(let i of unsorted) {
        if(i > hn) hn = i;
      }
      sorted.push(parseInt(unsorted.splice(unsorted.indexOf(hn), 1), 10));
    }

    return sorted;
  }

  function sortFromLowestToHighest(unsortedArray) {
    const unsorted = [].concat(unsortedArray);
    const sorted = [];
    while(unsorted.length > 0) {
      let ln = unsorted[0]; // ln stands for lowest number
      for(let i of unsorted) {
        if(i < ln) ln = i;
      }
      sorted.push(parseInt(unsorted.splice(unsorted.indexOf(ln), 1)));
    }
    return sorted;
  }

  function canvasManageSize(canvas) {
    const c = canvas;
    function setSize() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
    setSize();
    window.addEventListener('resize', setSize);
  }

  function linearRegression(obj) {
    /*
      Example
      let xyObj = {
        x: [1,6,4,11,16,18,2,2,5,7], // x
        y: [27,66,55,90,100,97,24,34,60,70] // y
        // xy
        // x*x
      }
      let studentsGrade = linearRegression(xyObj);
      console.log(studentsGrade.slr(10.2));
      // give the x var to the <y = mx + b> equation
      studentsGrade.dxy(18, 3.75); // draw in canvas
    */
    function simpleLinearRegression(x) {
      obj['xy'] = [];
      obj['xx'] = [];
      // summation
      obj['_x'] = 0;
      obj['_y'] = 0;
      obj['_xy'] = 0;
      obj['_xx'] = 0;
      for (let i = 0; i < obj.x.length; i++) {
        obj.xy.push(obj.x[i] * obj.y[i]);
        obj.xx.push(obj.x[i] * obj.x[i]);
      }
      for (let i = 0; i < obj.x.length; i++) {
        obj._x += obj.x[i];
        obj._y += obj.y[i];
        obj._xy += obj.xy[i];
        obj._xx += obj.xx[i];
      }
      let m, b, y;
      const n = obj.x.length;
      m = (n * obj._xy - obj._x * obj._y) / (n * obj._xx - Math.pow(obj._x, 2));
      b = (obj._y * obj._xx - obj._x * obj._xy) / (n * obj._xx - Math.pow(obj._x, 2));

      y = m * x + b;
      return y;
    }
    function drawGraphicXY(scaleX = 1,scaleY = 1, bool = true, cWidth = 400, cHeight = 400) {
      const c = document.querySelector('canvas');
      const ctx = c.getContext('2d');
      const manageCanvasSize = (function() {
        c.width = cWidth;
        c.height = cHeight;
        window.addEventListener('resize', ()=> {
          c.width = cWidth;
          c.height = cHeight;
        });
      })();
      let lineToDraw = [];
      for(let i = 0; i < c.width / scaleX; i++) {
        let yResult = simpleLinearRegression(i);
        lineToDraw.push({
          y: yResult * scaleY,
          x: i * scaleX, // use to draw in canvas
          realX: i,
          realY: yResult
        });
        // console.log(i, '-', yResult);
      }
      // console.log(lineToDraw);
      function drawLine() {
        ctx.beginPath();
        ctx.fillStyle = '#FF0000';
        for(let i of lineToDraw) {
          ctx.fillRect(i.x,c.height - i.y,5,5);
        }
      }
      function drawXYDots() {
        ctx.fillStyle = '#210CE8';
        ctx.beginPath();
        for (let i = 0; i < obj.x.length; i++) {
          //ctx.fillRect(obj.x[i] * scaleX - scaleDotX / 2,
          //             c.height - obj.y[i] * scaleY - scaleDotY / 2,
          //             scaleDotX, scaleDotY);
          ctx.fillText(`${i+1}°(${obj.x[i]},${obj.y[i]})`, obj.x[i] * scaleX,
                       c.height - obj.y[i] * scaleY);
          ctx.font = '12px sans-serif';
        }
      }
      function animate() {
        ctx.clearRect(0, 0, c.width, c.height);
        drawXYDots(obj, ctx);
        if(bool) drawLine();
        window.requestAnimationFrame(animate);
      };
      animate();
    }
    // simpleLinearRegression(obj, 10);
    return {
      slr: simpleLinearRegression,
      dxy: drawGraphicXY
    }
  }
  /**
    * * #! > is factorial
  */
  function getFactorial(n) {
    let nFactorial = 1;
    for (let i = 1; i < n + 1; i += 1) {
      nFactorial *= i;
    }
    return nFactorial;
  }

  /** Combinations
    * (n)
    *     = n! / r! * (n - r)!
    * (r)
    *
  */
  function getCombination(n, r) {
    return getFactorial(n) / (getFactorial(r) * getFactorial(n -r));
  }

  /** Permutations
    * P(n, k) = n! / (n - k)!
    *
  */
  function getPermutation(n, k) {
    return getFactorial(n) / getFactorial(n - k);
  }

  function createElementsFromArray(_parent = document.querySelector('body'), _array) {
    // createElementsFromArray stands for putArrayInElement
    for(let i of _array) {
      let currentElement = document.createElement(i.name);
      _parent.appendChild(currentElement);
      if(i.inner) currentElement.innerHTML += i.inner;
      if(i.attr) {
        for(let a in i.attr) {
          currentElement.setAttribute(a, i.attr[a]);
        }
      }
      if(i.children) {
        createElementsFromArray(currentElement, i.children)
      }
    }
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
  return {
    analyseAudio: analyseAudio,
    createElementsFromArray: createElementsFromArray,
    getPermutation: getPermutation,
    getCombination: getCombination,
    getFactorial: getFactorial,
    linearRegression: linearRegression,
    canvasManageSize: canvasManageSize,
    sortFromLowestToHighest: sortFromLowestToHighest, // with own sorting algorithm
    sortFromHighestToLowest: sortFromHighestToLowest, // the same
    getUrlVariableValueByName: getUrlVariableValueByName,
    fetchJSON: fetchJSON,
    createElementWithNS: createElementWithNS,
    makeIntegerRandom: makeIntegerRandom,
    makeFloatingRandom: makeFloatingRandom,
  }
}
