// ==UserScript==
// @name         Bot of Yandex
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Bot of Yandex
// @author       Panferova Anastasiya
// @match        https://ya.ru/*
// @match        https://*.stihi.ru/*
// @match        https://*.proza.ru/*
// @grant        none
// ==/UserScript==

let links = document.links;
let btnY = document.querySelectorAll(".search3__button")[0];
let yaInput = document.getElementById("text");
let sites = {
  "stihi.ru":["Алый вечер над синей рекою", "Секреты облаков", "Август - не лето", "Загадочные рассветы", "Дожди вернулись... ", "Пёс Сумкин"],
  "o.stihi.ru":["Премия «Русь моя»", "Подбор рифмы к различным словам"],
  "shop.stihi.ru":["«По поводу и без…2»", "Алтарник Альтаира"],
  "proza.ru":["Собачье мыло", "А снег продолжал тихо падать", "Дружба двух гениев", "Дорога к пруду"],
  "o.proza.ru":["под руководством Российского союза писателей", "российский литературный портал"],
  "shop.proza.ru":["Книги лауреатов премии «Русь моя»", "Антология русской прозы 2021"],
}
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];



function getText() {
  yaInput.value = keyword;
}
if (btnY != undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "ya.ru") {
  site = getCookie("site");
} else {
  site = location.hostname;
}


//Работаем на главной странице поисковика
if (btnY != undefined) {
  let i = 0;
  let timerId = setInterval(function() {
    yaInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btnY.click();
    }
  }, 700)

  } else if (location.hostname == site) {
    console.log("Мы на целевом сайте");
    setInterval(() => {
      let index = getRandom(0, links.length);
      if (getRandom(0, 101) >= 75) {
        location.href = "https://ya.ru/";
      }
      if (links.length == 0) {
        location.href = site;
      }
      if(links[index].href.includes(site)) {
        links[index].click();
      }
    }, getRandom(3000, 5000))
  } else {
    // Работаем на страницах поисковой выдачи
    let nextYaPage = true;
    for (let i = 0; i < links.length; i++) {
      if(links[i].href.indexOf(site) != -1) {
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

function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
