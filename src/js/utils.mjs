// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(ele, callback) {
  ele.addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  ele.addEventListener('click', callback);
} 
// get URL parameters
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param)
}
// get JSON after a fetch
export function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

// any animation, on any element, on any page 
// just make sure to tie it to the element!
export function startAnimation(animEle, animation) {
  animEle.dataset.animation = '';

  const attrAdd = () => {animEle.dataset.animation = animation};
  setTimeout(attrAdd, 10);
}

// Takes in a original price like 100 and a discount price like 50 
// returns the percent discount, in this case, 50
export function getDicountPercent(originalPrice, discountPrice) {
  // Check to make sure we're not dividing by 0
  if (originalPrice !== 0 && discountPrice !== 0) {
    return 100 - Math.ceil((discountPrice / originalPrice) * 100);
  } else {
    return 100;
  }
}