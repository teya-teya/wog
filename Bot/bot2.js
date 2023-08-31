// ==UserScript==
// @name         Bot of Yandex
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Bot of Yandex
// @author       Panferova Anastasiya
// @match        https://ya.ru/*
// @match        https://yandex.ru/*
// @grant        none
// ==/UserScript==

let links = document.links;
let btnY = document.querySelectorAll(".search3__button")[0];
let yaInput = document.getElementById("text");
let keywords = ["Алый вечер над синей рекою",
                "Секреты облаков",
                "Август - не лето",
                "Загадочные рассветы",
                "Дожди вернулись... ",
                "Пёс Сумкин"]
let keyword = keywords[getRandom(0, keywords.length)];

//let keyword = "Потоп";

//Работаем на главной странице
function getText() {
  yaInput.value = keyword;
}
if (btnY != undefined) {
  let i = 0;
  let timerId = setInterval(function() {
    yaInput.value += keyword[i];
    i++;
    if ( i == keyword.length) {
      clearInterval(timerId);
      btnY.click();
    }
  }, 700)
  } else {
    // Работаем на странице поисковой выдачи
    let nextYaPage = true;
    for (let i = 0; i < links.length; i++) {
      if(links[i].href.indexOf("stihi.ru") != -1) {
        console.log("Нашел строку " + links[i]);
        let link = links[i];
        nextYaPage = false;
        setTimeout(() => {link.click();}, getRandom(2000, 4000));
        break;
      }
    }
    if (nextYaPage) {
      let nextPage = document.querySelector(".VanillaReact.Pager-Item.Pager-Item_type_next");
      setTimeout(() => {nextPage.click();}, getRandom(3500, 5500));
    }
  }


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
