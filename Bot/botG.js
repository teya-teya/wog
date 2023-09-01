// ==UserScript==
// @name         Bot for Google
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Bot for Google
// @author       Panferova Anastasiya
// @match        https://www.google.com/*
// @match        https://napli.ru/*
// @match        https://kiteuniverse.ru/*
// @match        https://motoreforma.com/*
// @grant        none
// ==/UserScript==

let links = document.links;
let btnK = document.getElementsByName("btnK")[0];
let googleInput = document.getElementsByName("q")[0];
let sites = {
  "napli.ru":["10 популярных шрифтов Google", "Отключение редакций и ревизий", "Вывод произвольных типов записей и полей wp",
              "Конвертация Notion в Obsidian", "FFmpeg", "VSCode плагины"],
  "kiteuniverse.ru":["Kite Universe Россия", "Красота. Грация. Интеллект", "Фестиваль воздушных змеев"],
  "motoreforma.com":["прошивки для CAN-AM", "тюнинг Maverik X3", "тюнинг для квадроциклов CAN-AM"]
}
let site = Object.keys(sites)[getRandom(0, Object.keys(sites).length)];
let keywords = sites[site];
let keyword = keywords[getRandom(0, keywords.length)];

if (btnK != undefined) {
document.cookie = `site=${site}`;
} else if (location.hostname == "www.google.com") {
  site = getCookie("site");
} else {
  site = location.hostname;
}

// Работаем на главной странице поисковика
if (btnK != undefined) {
  let i = 0;
  let timerId = setInterval(function() {
    googleInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      btnK.click();
    }
  }, 700)

  } else if (location.hostname == site) {
    console.log("Мы на целевом сайте");
    setInterval(() => {
      let index = getRandom(0, links.length);
      if (getRandom(0, 101) >= 75) {
        location.href = "https://www.google.com/";
      }
      if (links.length == 0) {
        location.href = site;
      }
      if(links[index].href.includes(site)) {
        links[index].click()
      }
    }, getRandom(3000, 5000))
  } else {
    // Работаем на страницах поисковой выдачи
    let nextGooglePage = true;
    for (let i = 0; i < links.length; i++) {
      if(links[i].href.indexOf(site) != -1) {
        console.log("Нашел строку " + links[i]);
        let link = links[i];
        nextGooglePage = false;
        setTimeout(() => {link.click();}, getRandom(2000, 4000));
        break;
      }
    }
    let elementExist = setInterval(() => {
      let elm = document.querySelector(".YyVfkd");
      if (elm != null) {
        if (elm.innerText == "4") {
          nextGooglePage = false;
          location.href = "https://www.google.com/";
        }
        clearInterval(elementExist);
      }
    }, 100)

    // Если не нашли на первой странице выдачи, то листаем дальше
    if (nextGooglePage) {
      setTimeout(() => {
        pnnext.click();
      }, getRandom(3500, 5500))

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

