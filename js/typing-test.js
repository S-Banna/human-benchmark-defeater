// this is a tampermonkey script

// ==UserScript==
// @name         Typing Test
// @namespace    http://tampermonkey.net/
// @version      2025-05-30
// @description  type fast
// @author       You
// @match        https://humanbenchmark.com/tests/typing
// @icon         https://www.google.com/s2/favicons?sz=64&domain=humanbenchmark.com
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function typeWords(chars) {
        const element = document.querySelector("div.letters");
        element.focus();
         for (let char of chars) {
             const event = {
                key: char,
                code: `Key${char.toUpperCase()}`,
                keyCode: char.charCodeAt(0),
                which: char.charCodeAt(0),
                bubbles: true
            };
            console.log("typing " + char);
            element.dispatchEvent(new KeyboardEvent("keydown", event));
            element.dispatchEvent(new KeyboardEvent("keypress", event));
            element.dispatchEvent(new KeyboardEvent("keyup", event));
            // sleep(1); can add this to see it in action, keep it off for insta-win
        }
        console.log("finished");
    }
    document.addEventListener('keydown', async function (e) {
        if (e.key == 'Shift') {
            console.log("started");
            const spans = document.querySelectorAll("span.incomplete");
            const chars = Array.from(spans).map(span => span.innerText);
            await typeWords(chars);
        }
    }, true)
    console.log("loaded");
})();

