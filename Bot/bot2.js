// ==UserScript==
// @name         Bot of Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot of Yandex
// @author       Panferova Anastasiya
// @match        https://ya.ru/*
// @grant        none
// ==/UserScript==

let links = document.links;
let btnY = document.querySelectorAll(".search3__button")[0];
let yaInput = document.getElementById("text");
let keywords = ["10 самых популярных шрифтов от Google",
                "Отключение редакций и ревизий в WordPress",
                "Вывод произвольных типов записей и полей в WordPress"]
let keyword = keywords[getRandom(0, keywords.length)];

function getText() {
yaInput.value = keyword;
}
if (btnY != undefined) {
  yaInput.value = keyword;
btnY.click();
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
