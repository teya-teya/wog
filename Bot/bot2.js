// ==UserScript==
// @name         Bot of Yandex
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Bot of Yandex
// @author       Panferova Anastasiya
// @match        https://ya.ru/*
// @match        https://yandex.ru/*
// @match        https://*.stihi.ru/*
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
  } else if (location.hostname == "stihi.ru" || location.hostname == "o.stihi.ru" || location.hostname == "shop.stihi.ru") {
    console.log("Мы на целовом сайте");
    setInterval(() => {
      let index = getRandom(0, links.length);
      if (getRandom(0, 101) >= 75) {
      location.href = "https://ya.ru/";
          }
      if (links.length == 0) {
        location.href = "https://stihi.ru/";
      }
      if (links[index].href.indexOf("stihi.ru", "o.stihi.ru", "shop.stihi.ru")) {
        links[index].click()
      }
    }, getRandom(3000, 5000))
  } else {
    // Работаем на странице поисковой выдачи
    let nextYaPage = true;
    for (let i = 0; i < links.length; i++) {
      if(links[i].href.indexOf("stihi.ru", "o.stihi.ru", "shop.stihi.ru") != -1) {
        console.log("Нашел строку " + links[i]);
        let link = links[i];
        nextYaPage = false;
        setTimeout(() => {link.click();}, getRandom(2000, 4000));
        break;
      }
    }
    let elementExist = setInterval(() => {
      let elem = document.querySelector(".Pager-Item_current");
      if (elem != null) {
        if (elem.innerText == "5") {
          nextYaPage = false;
          location.href = "https://ya.ru/";
        }
        clearInterval(elementExist);
      }
    }, 100)
    
    // Если не нашли на первой странице выдачи, то листаем дальше
    if (nextYaPage) {
      let nextPage = document.querySelector(".VanillaReact.Pager-Item.Pager-Item_type_next");
      setTimeout(() => {nextPage.click();}, getRandom(3500, 5500));
    }
  }


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
