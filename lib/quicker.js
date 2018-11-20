function qs(param){
  return document.querySelector(param);
}
function qsa(param) {
  return document.querySelectorAll(param);
}
function gc(param) {
  return document.getElementsByClassName(param);
}
function gi(param) {
  return document.getElementById(param);
}
function r(min, max){
  return parseInt(Math.random()*((max+1)-min)+min);
}
function wi(func, time){
  return window.setInterval(func, time);
}
function wt(func, time){ 
  return window.setTimeout(func, time); 
}
function ce(elem){
  return document.createElement(elem);
}
function ceNS(elem){
  let theElem = document.createElementNS('http://www.w3.org/2000/svg', elem);
  if(elem.toLowerCase() === 'svg'){ 
     theElem.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  }
  return theElem;
}
function sa(elem, attr, value){
  return elem.setAttribute(attr, value);
}
function ac(parent, child){
  return parent.appendChild(child);
}
function ih(elem, input, bool = true){
  if(bool){
    return elem.innerHTML += input;
  }else{
    return elem.innerHTML = input;
  }
}
function it(elem, input, bool = true){
  if(bool){
    return elem.innerText += input;
  }else{
    return elem.innerText = input;
  }
}
