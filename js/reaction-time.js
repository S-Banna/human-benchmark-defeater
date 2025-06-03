// this is a tampermonkey script

// ==UserScript==
// @name         Reaction Time
// @namespace    http://tampermonkey.net/
// @version      2025-06-01
// @description  defeats reaction time
// @author       You
// @match        https://humanbenchmark.com/tests/reactiontime
// @icon         https://www.google.com/s2/favicons?sz=64&domain=humanbenchmark.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    async function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function cycle() {
        let target = null;
        while (!target) {
            await sleep(1);
            target = document.querySelector("div.view-go");
        }
        target.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        target.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
        target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        console.log("done");
    }
    document.addEventListener('keydown', async function (e) {
        if (e.key == 'Shift') {
            console.log("started");
            let start = document.querySelector("div.view-splash");
            start.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
            start.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
            start.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            await cycle();
        }
    }, true)
    console.log("loaded");
})();