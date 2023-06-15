import MainHeader from './components/MainHeader.svelte'
import MainFooter from './components/MainFooter.svelte'
import AlertMessage from './components/AlertMessage.svelte'

export const categories = ['tents', 'sleeping-bags', 'backpacks', 'hammocks'];

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
export function getbyid (id) {
  return document.getElementById(id);
}
// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function formDataToJSON(formEle) {
  const formData = new FormData(formEle);
  const json = {};
  formData.forEach((value, key) => {
    json[key] = value;
  });
  return json;
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
export async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: 'servicesError', message: data };
  }
}

export function alertMessage(message, scroll = true, duration = 3000) {
  const alert = new AlertMessage({
    target: document.querySelector('body'),
    anchor: document.querySelector('main'),
    props: {
      message,
    },
  });
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) window.scrollTo(0, 0);
  
  // left this here to show how you could remove the alert automatically after a certain amount of time.
  // setTimeout(function () {
  //   alert.$destroy ();
  // }, duration);
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
export function getDiscountPercent(originalPrice, discountPrice) {
  // Check to make sure we're not dividing by 0
  if (originalPrice !== 0 && discountPrice !== 0) {
    return 100 - Math.ceil((discountPrice / originalPrice) * 100);
  } else {
    return 100;
  }
}

export function renderHeaderFooter() {
  new MainHeader({ target: getbyid('main-header') });
  new MainFooter({ target: getbyid('main-footer') });
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}