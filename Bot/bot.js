// ==UserScript==
// @name         Bot for Bing
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot for Bing
// @author       Panferova Anastasiya
// @match        https://www.bing.com/*
// @grant        none
// ==/UserScript==

let links = document.links;
let btnS = document.querySelectorAll(".search")[0];
let bingInput = document.getElementsByName("q")[0];
let keywords = ["Алый вечер над синей рекою",
                "Секреты облаков",
                "Август - не лето"]
let keyword = keywords[getRandom(0, keywords.length)];

if (btnS != undefined) {
  bingInput.value = keyword;
btnS.click();
} else {
for (let i = 0; i < links.length; i++) {
    if(links[i].href.indexOf("stihi.ru") != -1) {
        console.log("Нашел строку " + links[i]);
        links[i].click();
        break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
