// this is a tampermonkey script

// ==UserScript==
// @name         Verbal Memory
// @namespace    http://tampermonkey.net/
// @version      2025-06-01
// @description  defeats verbal memory
// @author       You
// @match        https://humanbenchmark.com/tests/verbal-memory
// @icon         https://www.google.com/s2/favicons?sz=64&domain=humanbenchmark.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function word(x) {
        let seen = [];
        let buttons = document.querySelectorAll("button");
        let seenBut = buttons[1], newBut = buttons[2];
        for (let i = 1; i <= x; i++) {
            let word = document.querySelector("div.word").innerText;
            if (seen.includes(word)) seenBut.click();
            else newBut.click();
            seen.push(word);
            // await sleep(5); // can add this to see it in action, keep it off for insta-win
        }
        console.log("done");
    }
    document.addEventListener('keydown', async function (e) {
        if (e.key == 'Shift') {
            console.log("started");
            let start = document.querySelectorAll("button")[1];
            start.click();
            await word(100);
        }
    }, true)
    console.log("loaded");
})();