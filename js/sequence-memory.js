// this is a tampermonkey script

// ==UserScript==
// @name         Sequence Memory
// @namespace    http://tampermonkey.net/
// @version      2025-06-03
// @description  defeats sequence memory
// @author       You
// @match        https://humanbenchmark.com/tests/sequence
// @icon         https://www.google.com/s2/favicons?sz=64&domain=humanbenchmark.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function go(x) {
        for (let i = 1; i <= x; i++) {
            console.log("going " + i);
            let squares = [];
            await sleep(30);
            for (let j = 1; j <= i; j++) {
                squares.push(document.querySelector("div.active"));
                console.log("grab");
                await sleep(510);
            }
            squares.forEach(c => {
                console.log("click");
                c.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
                c.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
                c.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            })
            await sleep(1000);
        }
        console.log("done, triggering fail");
        await sleep(520 * x + 1000);
        let failer = document.querySelector("div.square-row>div");
        for (let f = 0; f < 2; f++) {
            failer.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            failer.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
            failer.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }
        console.log("finished");
    }
    document.addEventListener('keydown', async function (e) {
        if (e.key == 'Shift') {
            console.log("started");
            let start = document.querySelectorAll("button")[1];
            start.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            start.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
            start.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            await sleep(1200);
            await go(20);
        }
    }, true)
    console.log("loaded");
})();