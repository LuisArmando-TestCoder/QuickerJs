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

  const fetchJSON = async (url, func) => {
    const r = await fetch(url)
      .then(res => res.json())
      .then(json => json);
    func(r);
  };

  function getUrlVariableValueByName(variableKey = new RegExp('\\??&?(\\w{0,})=(\\w{0,})', 'g').exec(window.location.href)[1]) {
    return new RegExp(`\\??&?(${variableKey})=(\\w{0,})`, 'g').exec(window.location.href)[2];
  }

  // My The 'Cold Water'
  function sortFromHighestToLowest(unsortedArray) {
    let unsorted = [].concat(unsortedArray);
    let sorted = [];
    while (unsorted.length > 0) {
      let hn = unsorted[0]; // hn stands for highest number
      for (let i of unsorted) {
        if (i > hn) hn = i;
      }
      sorted.push(parseInt(unsorted.splice(unsorted.indexOf(hn), 1), 10));
    }

    return sorted;
  }

  function sortFromLowestToHighest(unsortedArray) {
    const unsorted = [].concat(unsortedArray);
    const sorted = [];
    while (unsorted.length > 0) {
      let ln = unsorted[0]; // ln stands for lowest number
      for (let i of unsorted) {
        if (i < ln) ln = i;
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

    function drawGraphicXY(scaleX = 1, scaleY = 1, bool = true, cWidth = 400, cHeight = 400) {
      const c = document.querySelector('canvas');
      const ctx = c.getContext('2d');
      const manageCanvasSize = (function () {
        c.width = cWidth;
        c.height = cHeight;
        window.addEventListener('resize', () => {
          c.width = cWidth;
          c.height = cHeight;
        });
      })();
      let lineToDraw = [];
      for (let i = 0; i < c.width / scaleX; i++) {
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
        for (let i of lineToDraw) {
          ctx.fillRect(i.x, c.height - i.y, 5, 5);
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
        if (bool) drawLine();
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
    return getFactorial(n) / (getFactorial(r) * getFactorial(n - r));
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
    for (let i of _array) {
      let currentElement = document.createElement(i.name);
      _parent.appendChild(currentElement);
      if (i.inner) currentElement.innerHTML += i.inner;
      if (i.attr) {
        for (let a in i.attr) {
          currentElement.setAttribute(a, i.attr[a]);
        }
      }
      if (i.children) {
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

  // showHide({selector: '<anyTypeOfSelector>', showState: '<anyNewAttributeName>'});
  function setClassShowHide(elemsObj, windowHeightFraction = 7.5) {
    const elems = document.querySelectorAll(elemsObj.selector);

    function controlView() {
      elems.forEach((elem) => {
        elem.setAttribute(elemsObj.showState, 'hide');
        const pos = elem.getBoundingClientRect().toJSON();
        const h = window.innerHeight;
        if (pos.bottom > 0 && pos.top < h - h / windowHeightFraction) {
          elem.setAttribute(elemsObj.showState, 'show');
        } else {
          elem.setAttribute(elemsObj.showState, 'hide');
        }
      });
    }

    controlView();
    ['resize', 'scroll'].forEach((eventName) => {
      window.addEventListener(eventName, () => {
        controlView();
      });
    });
  }

  function showFrameRate() {
    const parent = document.createElement('p');
    const frameRateElem = document.createElement('span');
    const averageFrameRateElem = document.createElement('span');

    let frameRate = 0;
    let averageFrameRate = 0;
    let frameRatesAmount = 0;
    let frameRatesSummation = 0;

    function requestFrame() {
      frameRate += 1;
      requestAnimationFrame(requestFrame);
    }
    requestFrame();

    setInterval(() => {
      frameRatesSummation += frameRate;
      frameRatesAmount += 1;
      averageFrameRate = frameRatesSummation / frameRatesAmount;

      frameRateElem.innerText = `Frame rate: ${frameRate}`;
      averageFrameRateElem.innerText = `Average frame rate: ${averageFrameRate.toFixed(2)}`;
      frameRate = 0;
    }, 1000);

    styleElems([parent], {
      background: '#000',
      color: '#ff0',
      position: 'fixed',
      top: '0',
      right: '0',
      margin: '0',
    });

    styleElems([frameRateElem, averageFrameRateElem], {
      display: 'block',
      'text-align': 'left',
      margin: '5px'
    });

    appendChildren(parent, [frameRateElem, averageFrameRateElem]);
    document.body.appendChild(parent);
  }

  function appendChildren(parent, array) {
    array.forEach(elem => {
      parent.appendChild(elem);
    });
  }

  function animationSet(startPoint, endPoint) {
    const start = performance.now();
    const startP = startPoint,
      endP = endPoint - startPoint;

    function getTimeFraction(start, duration) {
      let timeFraction = (performance.now() - start) / duration;
      if (timeFraction > 1) timeFraction = 1;
      return timeFraction;
    }

    function getNPosition(timeFraction, progress) {
      return timeFraction < 1 ? progress * endP + startP : endP + startP;
    }

    function getPair(n) {
      return n % 2 === 0 ? n : n + 1;
    }
    // above utilitarian functions

    function powerOfN(duration, curve) {
      const timeFraction = getTimeFraction(start, duration);
      const progress = Math.pow(timeFraction, curve);
      return getNPosition(timeFraction, progress);
    }

    function back(duration, curve) {
      const timeFraction = getTimeFraction(start, duration);
      const progress = Math.pow(timeFraction, 2) * ((curve + 1) * timeFraction - curve);
      return getNPosition(timeFraction, progress);
    }

    function arc(duration) {
      const timeFraction = getTimeFraction(start, duration);
      const progress = 1 - Math.sin(Math.acos(timeFraction));
      return getNPosition(timeFraction, progress);
    }

    function linear(duration) {
      const timeFraction = getTimeFraction(start, duration);
      const progress = timeFraction;
      return getNPosition(timeFraction, progress);
    }

    function elastic(duration, curve, curvesAmount, longitude) {
      const timeFraction = getTimeFraction(start, duration);
      const progress = Math.pow(2, longitude * (timeFraction - 1)) *
        Math.cos(getPair(curvesAmount) * Math.PI * curve / 3 * timeFraction);
      return getNPosition(timeFraction, progress);
    }

    return {
      powerOfN: powerOfN,
      back: back,
      arc: arc,
      linear: linear,
      elastic: elastic,
    }
  }

  function calculateDistance(obj1, obj2) {
    const x = obj2.x - obj1.x;
    const y = obj2.y - obj1.y;
    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    return distance;
  }

  function getAlphabet() {
    return {
      english: 'abcdefghijklmnopqrstuvwxyz'.split(''),
      spanish: 'abcdefghijklmnñopqrstuvwxyz'.split(''),
    };
  }

  function styleElems(elems, rule) {
    elems.forEach((elem) => {
      for (let property in rule) {
        elem.style.setProperty(property, rule[property]);
      }
    });
  }

  function numberToTime(num) {
    let hours = Math.floor(num / 3600);
    let minutes = Math.floor((num - (hours * 3600)) / 60);
    let seconds = num - (hours * 3600) - (minutes * 60);

    if (hours < 10) hours = `0${hours}`;
    if (minutes < 10) minutes = `0${minutes}`;
    if (seconds < 10) seconds = `0${seconds}`;

    return `${parseInt(hours, 10) ? `${hours}:` : ''}${minutes}:${seconds}`;
  }

  // in HTML just create ---> a href="#s" class="slideShow" id="s"
  function createSlidesManager(selector, isVertical) {
    let index = 0;
    const slideAnchors = document.querySelectorAll(selector);
    const attr = ['id', 'href'];
    const res = [/soy/gi, /Am I/gi, /cool/gi, /!/gi, /I am/gi]
    for (let i of slideAnchors) {
      attr.forEach((a) => {
        if (index + attr.indexOf(a) > slideAnchors.length - 1) index = -1;
        i.setAttribute(a, `${i.getAttribute(a)}${index + attr.indexOf(a)}`);
        res.forEach(x => {
          if (x.test(i.innerText)) i.className += ' soy';
        });
      });
      index += 1;
    }
    if (isVertical) {
      slideAnchors[0].parentElement.style.setProperty('grid-template-columns',
        `repeat(${slideAnchors.length}, 100vw)`);
    }
  }

  function toCSV(arrayWithObjects) {
    let firstLine = arrayWithObjects[0];
    let lines;
    firstLine = Object.keys(firstLine).join(',');
    lines = firstLine;
    arrayWithObjects.forEach((obj) => {
      lines += `\r\n${Object.keys(obj).map((key) => obj[key])}`;
    });
    return lines;
  }

  function encrypt(inputString, pickedChars = 'abcdefghijklmnopqrstuvwxyz_.#`´=') {
    // you can use 
    // variable.toStringFromBinary(
    // variable.decoded(
    // variable.key, variable.output))
    // to get the original input
    const chars = pickedChars;
    const input = inputString;
    let encryptedData;
    let output; // binary
    let encrypted;
    let decoded;
    let key;

    const U = (function () {
      function repeat(times, func, index = 0) {
        if (times) {
          func(index);
          repeat(times - 1, func, index + 1);
        }
      }

      function r(min, max) {
        return parseInt(Math.random() * (max + 1 - min) + min, 10);
      } // never repeat randomness watch out

      function setNeverRepeatRandomString(string) {
        const arrayCopy = [].concat(string.split(''));
        let text = '';
        while (arrayCopy.length) {
          const randomIndex = r(0, arrayCopy.length - 1);
          const randomItem = arrayCopy[randomIndex];
          const index = arrayCopy.indexOf(randomItem);
          const item = arrayCopy.splice(index, 1);
          const itemToStr = `${item}`;
          text += itemToStr;
        }
        return text;
      }

      function toStringFromBinary(binaryString) {
        let string = '';
        const binaryArray = binaryString.split(' ');
        binaryArray.forEach(binary => {
          string += String.fromCharCode(parseInt(binary, 2).toString(10));
        });
        return string;
      }

      return {
        toStringFromBinary,
        toBinary(string) {
          return string
            .split('')
            .map(c => c.charCodeAt(0).toString(2))
            .join(' ');
        },
        // 'choosedChars' is all the possible characters available
        // to choose among
        setTuple(choosedChars) {
          const tuple = [];
          const charsPerValue = 3;
          let takenChars = '';
          repeat(charsPerValue, () => {
            takenChars += choosedChars[r(0, choosedChars.length - 1)];
          });

          repeat(3, () => {
            let lastValue = tuple[tuple.length - 1];
            let newStr = lastValue;

            while (newStr === lastValue) {
              // in the tuple, some values were being repeated, this is to avoid that
              newStr = setNeverRepeatRandomString(takenChars);
              if (newStr === tuple[tuple.length - 2]) {
                newStr = lastValue;
              }
            }
            tuple.push(newStr);
          });
          return tuple;
        },
        // has to return an object
        // with the new str
        // and the newTuple

        // each tuple has to wrap only three string values

        // getTuple, all the different the values (just 3 cuz of binary) that the input has
        // setTuple, all the new string values that are going to replace this getTuple values
        // and normally it will work like U.setTuple(myAvailableNeverRepeatPlsCharsString)
        encryptStr({
          getTuple,
          setTuple,
          str
        }) {
          getTuple.forEach((value, i) => {
            const reg = new RegExp(value, 'gi');
            str = str.replace(reg, setTuple[i]);
          });

          return {
            str,
            oldTuple: getTuple,
            newTuple: setTuple
          };
        },

        decode(keyTuple, str) {
          let regexp0 = new RegExp(keyTuple[0], 'gi');
          let regexp1 = new RegExp(keyTuple[1], 'gi');
          let regexp2 = new RegExp(keyTuple[2], 'gi');
          return str
            .replace(regexp0, '1')
            .replace(regexp1, '0')
            .replace(regexp2, ' ');
        }
      };
    })(); // revealing module, U stands for Utilitary

    output = U.toBinary(input);

    do {
      encryptedData = U.encryptStr({
        getTuple: ['1', '0', ' '],
        setTuple: U.setTuple(chars),
        str: output
      });

      encrypted = encryptedData.str;

      decoded = U.decode(encryptedData.newTuple, encryptedData.str);

      key = encryptedData.newTuple;
    } while (output != decoded);

    return {
      output: encrypted,
      key,
      decoded: U.decode,
      toBinary: U.toBinary,
      toStringFromBinary: U.toStringFromBinary,
      encryptStr: U.encryptStr
    };
  }

  function latLonToPX(latLon) {
    return {
      x: latLon.maxLon + latLon.lon,
      y: (latLon.minLat + latLon.lat) * -1,
    }
  }

  function toBinary(string) {
    return string.split('').map((c) => c.charCodeAt(0).toString(2)).join(' ');
  }

  function matrix(c, r, fill = null) {
    const arr = [];
    for (let i = 0; i < c; i++) {
      arr.push([]);
      for (let j = 0; j < r; j++) {
        arr[i].push(fill);
      }
    }
    return arr;
  }
  return {
    matrix,
    encrypt,
    toBinary,
    latLonToPX,
    encrypt,
    toCSV,
    createSlidesManager,
    numberToTime,
    styleElems,
    getAlphabet,
    calculateDistance,
    animationSet,
    appendChildren,
    showFrameRate,
    setClassShowHide,
    analyseAudio,
    createElementsFromArray,
    getPermutation,
    getCombination,
    getFactorial,
    linearRegression,
    canvasManageSize,
    sortFromLowestToHighest,
    sortFromHighestToLowest,
    getUrlVariableValueByName,
    fetchJSON,
    createElementWithNS,
    makeIntegerRandom,
    makeFloatingRandom,
  }
}