// this is a tampermonkey script

// ==UserScript==
// @name         Visual Memory
// @namespace    http://tampermonkey.net/
// @version      2025-06-02
// @description  defeats visual memory
// @author       You
// @match        https://humanbenchmark.com/tests/memory
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
            const clicks = document.querySelectorAll("div.active");
            console.log("getting clicks: " + clicks);
            await sleep(1000);
            clicks.forEach(c => {
                c.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
                c.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
                c.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            console.log("clicking " + i);
            await sleep(2000);
        }
    }
    document.addEventListener('keydown', async function (e) {
        if (e.key == 'Shift') {
            console.log("started");
            let start = document.querySelectorAll("button")[1];
            start.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            start.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
            start.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            await sleep(1000);
            await go(20);
        }
    }, true)
    console.log("loaded");
})();