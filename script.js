//A lot of necessary variables 

let img = document.getElementById('rndImg');
let infoText = document.getElementById('infoText');
let link = document.getElementById('link');
let affect = document.getElementById('affection');
let adapt = document.getElementById('adaptability');
let intelligent = document.getElementById('intelligence');
let cats = document.getElementById('cats');
let base_url = 'https://api.thecatapi.com/v1/images/search?';
let apiKey = 'live_0GNo1gdJyt1dzjLKoez5uyfuQcIjvPj1ZZD0JSCsUFdsPu5KUhE3NigjE66mGHIf';
let input = document.getElementById('input');
let searchResult = document.getElementById('searchResults');

//The onload event function which fetches the first image

async function getImg() {
  try {
  let response = await fetch("https://api.thecatapi.com/v1/breeds?limit=6", {
    method: 'GET',
    headers: {
      'x-api-key': apiKey
    }
  });
  let data = await response.json();
  //console.log(data);
  showImgAndText(data);
  } catch(err) {
    alert('Network problem(assuming). Try reloading');
  };
}

// A function to generate a random integer between 1-6

function getRnd() {
  return Math.floor(Math.random() * 7);
} 

//The function which displays the first fetched image and it's description 

function showImgAndText(intel) {
  let rd = getRnd();
  //console.log(intel);
  img.src = intel[rd].image.url;
  infoText.innerText = intel[rd].description;
  link.href = intel[rd].wikipedia_url;
  affect.value = intel[rd].affection_level;
  adapt.value = intel[rd].adaptability;
  intelligent.value = intel[rd].intelligence;
}

//This function fetches the searched breed and displays them

async function findCat() {
  if(searchResult.childNodes[0]) {
    searchResult.innerHTML = '';
  }
  let data;
    try{
      let res = await fetch(base_url + 'breed_ids=' + input.value.toLowerCase() + '&' + 'limit=1', {method: 'GET', headers: {'x-api-key': apiKey}});
      data = await res.json();
    } catch(err) {
      alert('Something unexpected happend. Try reloading/Make sure you have breed keywords as input')
    }
    //console.log(data);
    let len = 1;
  for(let i = 0; i < len; i++) {
    let te = document.createElement('div');
    te.classList.add('exImgCon');
    let tim = document.createElement('img');
    tim.src = data[i].url;
    tim.classList.add('exImg');
    let tetx = document.createElement('p');
    tetx.classList.add('exText');
    let text = document.createTextNode(`${data[i].breeds[0].description}`);
    let hlink = document.createElement('a');
    hlink.href = `${data[i].breeds[0].wikipedia_url}`;
    let htext = document.createTextNode('Wiki link')
    tetx.appendChild(text);
    te.appendChild(tim);
    hlink.appendChild(htext);
    searchResult.appendChild(te);
    searchResult.appendChild(tetx);
    searchResult.appendChild(hlink);
  }
}

//The code below will fetch some cats with information and display them if the user clicks the "click to explore" text

let call = 0;

async function loadCats() {
  call++;
  if (call === 1) {
  let data;
  try {
  let response = await fetch("https://api.thecatapi.com/v1/breeds?limit=8", {method: 'GET', headers: {'x-api-key': apiKey}});
  data = await response.json();
  } catch(err) {
    alert('Something unexpected happened. Try reloading');
  }
  //console.log(data);
  
  let len = 8;
  for(let i = 0; i < len; i++) {
    let te = document.createElement('div');
    te.classList.add('exImgCon');
    let tim = document.createElement('img');
    tim.src = data[i].image.url;
    tim.classList.add('exImg');
    let tetx = document.createElement('p');
    tetx.classList.add('exText');
    let text = document.createTextNode(`${data[i].description}`);
    let link = document.createElement('a');
    let linkText = document.createTextNode('Learn more' + `${i + 1}`);
    link.href = data[i].wikipedia_url;
    link.appendChild(linkText);
    cats.appendChild(link);
    tetx.appendChild(text);
    te.appendChild(tim);
    cats.appendChild(te);
    cats.appendChild(tetx);
  }
  }
}
