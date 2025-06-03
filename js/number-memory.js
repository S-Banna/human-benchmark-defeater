// this is a tampermonkey script

// ==UserScript==
// @name         Number Memory
// @namespace    http://tampermonkey.net/
// @version      2025-05-31
// @description  human benchmark number memory script
// @author       You
// @match        https://humanbenchmark.com/tests/number-memory
// @icon         https://www.google.com/s2/favicons?sz=64&domain=humanbenchmark.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async function waitFor(selector, timeout = 20000) {
        let el = null;
        for (let i = 0; i < timeout / 100; i++) {
            el = document.querySelector(selector);
            if (el) break;
            await sleep(100);
        }
        return el;
    }
    async function goX(x) {
        for (let i = 1; i <= x; i++) {
            console.log("going " + i);
            await goRound();
        }
        await instaFail();
        console.log("done");
    }
    async function goRound() {
        const numberEl = await waitFor(".big-number");
        console.log("number: " + numberEl);
        const number = numberEl.textContent;

        const inputEl = await waitFor("input");
        console.log("input: " + inputEl);
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(inputEl, number);
        inputEl.dispatchEvent(new Event("input", { bubbles: true }));

        const submEl = await waitFor("button.css-de05nr");
        console.log("submit: " + submEl);
        submEl.click();

        const contEl = await waitFor("button.css-de05nr");
        console.log("cont: " + contEl);
        contEl.click();
    }
    async function instaFail() {
        console.log("loops done, triggering fail");

        const numberEl = await waitFor(".big-number");
        const number = numberEl.textContent + "1";

        const inputEl = await waitFor("input");
        console.log("input: " + inputEl);
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
        nativeInputValueSetter.call(inputEl, number);
        inputEl.dispatchEvent(new Event("input", { bubbles: true }));

        const submEl = await waitFor("button.css-de05nr");
        submEl.click();
    }
    document.addEventListener('keydown', async function (e) {
        if (e.key == 'Shift') {
            console.log("started");
            let startKey = document.querySelector("button.css-de05nr");
            startKey.click();
            goX(10);
        }
    }, true)
    console.log("loaded");
})();