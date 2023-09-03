// ==UserScript==
// @name         Bot for Bing
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Bot for Bing
// @author       Panferova Anastasiya
// @match        https://www.bing.com/*
// @match        https://*.stihi.ru/*
// @match        https://*.proza.ru/*
// @grant        none
// ==/UserScript==

let links = document.links;
let btnS = document.querySelectorAll(".search")[0];
let bingInput = document.getElementsByName("q")[0];
let sites = {
  "stihi.ru":["Алый вечер над синей рекою", "Секреты облаков", "Август - не лето", "Загадочные рассветы", "Дожди вернулись... ", "Пёс Сумкин"],
  "o.stihi.ru":["Премия «Русь моя»", "Подбор рифмы к различным словам"],
  "shop.stihi.ru":["«По поводу и без…2»", "Алтарник Альтаира"],
  "proza.ru":["Собачье мыло", "А снег продолжал тихо падать", "Дружба двух гениев", "Дорога к пруду"],
  "o.proza.ru":["под руководством Российского союза писателей", "российский литературный портал"],
  "shop.proza.ru":["Книги лауреатов премии «Русь моя»", "Антология русской прозы 2021"]
}
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];

if (btnS != undefined) {
  document.cookie = `site=${site}`;
} else if (location.hostname == "www.bing.com") {
  site = getCookie("site");
} else {
  site = location.hostname;
}

//Работаем на главной странице поисковика
if (btnS != undefined) {
  let i = 0;
  let timerId = setInterval(function() {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btnS.click();
    }
  }, 700);
  } else if (location.hostname == site) {
    console.log("Мы на целевом сайте");
    setInterval(() => {
      let index = getRandom(0, links.length);
      if (getRandom(0, 101) >= 75) {
        location.href = "https://bing.com/";
      }
      if (links.length == 0) {
        location.href = site;
      }
      if (links[index].href.includes(site)) {
        links[index].click();
      }
    }, getRandom(3000, 5000));
  } else {
    // Работаем на страницах поисковой выдачи
    let nextBingPage = true;
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.indexOf(site) != -1) {
        console.log("Нашел строку " + links[i]);
        let link = links[i];
        nextBingPage = false;
        setTimeout(() => {link.click();}, getRandom(2000, 4000));
        break;
      }
    }
    let elementExist = setInterval(() => {
      let elem = document.querySelector(".sb_pagS");
      if (elem != null) {
        if (elem.innerText == "5") {
          nextBingPage = false;
          location.href = "https://bing.com/";
        }
        clearInterval(elementExist);
      }
    }, 100)

    // Если не нашли на первой странице выдачи, то листаем дальше
    if (nextBingPage) {
      let nextPage = document.querySelector(".sb_pagN");
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
