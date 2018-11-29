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
function sp(elem, prop, value){
  return elem.style.setProperty(prop, value);
}
function fj(url, func){
  fetch(url)
  .then(response => {
    return response.json();
  }).then(json => {
    // console.log(json);
    let obj = {
      myFunc: func,
      jsn: json
    }
    obj.myFunc();
  }).catch( () => {
    console.log('There is an ERROR!! related to the call');
  });
} // in func, this.json = response
/*
  Example, in this case, this.jsn = json content
  function theFunc(){
    let content = this.jsn;
    console.log(content);
  }
*/

// Not Mine
/* Get parameter by name function */
function getParameterByName(name) {
    var res = new RegExp(
        // Parameter names always start after a ? or &.
        '[\?&]' +
  
        // Make sure any [ or ] are escaped in the name.
        name.replace(/\[/g, '\\\[').replace(/\]/g, '\\\]') +
  
        // Either match a =... or match an empty value.
        // Values can be terminated by an & a # or the end of the string ($).
        '(?:=([^&#]*))?(?:[&#]|$)'
    ).exec(window.location.search);
  
    return res ?
      (res[1] ? // res[1] will be undefined for a parameter without value.
        decodeURIComponent(res[1].replace(/\+/g, ' ')) : ''
      ) : null;
}
