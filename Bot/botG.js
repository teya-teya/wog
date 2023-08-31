// ==UserScript==
// @name         Bot for Google
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot for Google
// @author       Chizhikov Sergey
// @match        https://www.google.com/*
// @grant        none
// ==/UserScript==

let links = document.links;
let btnK = document.getElementsByName("btnK")[0];
let googleInput = document.getElementsByName("q")[0];
let keywords = ["10 самых популярных шрифтов от Google",
                "Отключение редакций и ревизий в WordPress",
                "Вывод произвольных типов записей и полей в WordPress"];
let keyword = keywords[getRandom(0, keywords.length)];

if (btnK != undefined) {
  googleInput.value = keyword;
  btnK.click();
} else {
  for (let i = 0; i < links.length; i++) {
    if(links[i].href.indexOf("napli.ru") != -1) {
      console.log("Нашел строку " + links[i]);
      links[i].click();
      break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
