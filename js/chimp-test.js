// this is a tampermonkey script

// ==UserScript==
// @name         Chimp Test
// @namespace    http://tampermonkey.net/
// @version      2025-06-03
// @description  defeats chimp test
// @author       You
// @match        https://humanbenchmark.com/tests/chimp
// @icon         https://www.google.com/s2/favicons?sz=64&domain=humanbenchmark.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function go(x) {
        for (let i = 4; i <= x + 4; i++) {
            let clicks = [];
            for (let j = 1; j <= i; j++) {
                clicks.push(document.querySelector(`div[data-cellnumber="${j}"]`));
            }
            clicks.forEach(c => {
                c.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
                c.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
                c.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            })
            let cont = document.querySelectorAll("button")[1];
            cont.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            cont.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
            cont.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            // await sleep(50); // can add this to see it in action, keep it off for insta-win
        }
        console.log("done");
    }
    document.addEventListener('keydown', async function (e) {
        if (e.key == 'Shift') {
            console.log("started");
            let start = document.querySelectorAll("button")[1];
            start.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            start.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
            start.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            await go(20);
        }
    }, true)
    console.log("loaded");
})();