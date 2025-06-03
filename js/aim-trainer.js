// this is a tampermonkey script

// ==UserScript==
// @name         Aim Trainer
// @namespace    http://tampermonkey.net/
// @version      2025-06-01
// @description  defeats aim trainer
// @author       You
// @match        https://humanbenchmark.com/tests/aim
// @icon         https://www.google.com/s2/favicons?sz=64&domain=humanbenchmark.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function click(x) {
        for (let i = 0; i <= x; i++) { // one more so auto-starts
            let target = document.querySelector('div[data-aim-target="true"]').parentElement;
            console.log("going " + i);
            target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            target.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
            target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            // await sleep(1); // can add this to see it in action, keep it off for insta-win
        }
        console.log("finished");
    }
    document.addEventListener('keydown', async function (e) {
        if (e.key == 'Shift') {
            console.log("started");
            await click(30);
        }
    }, true)
    console.log("loaded");
})();