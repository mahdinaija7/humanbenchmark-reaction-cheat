// ==UserScript==
// @name         Human Benchmark
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Automate human reaction
// @author       You
// @match        https://humanbenchmark.com/tests/reactiontime
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function triggerMouseEvent (node, eventType) {
        const clickEvent = document.createEvent ('MouseEvents');
        clickEvent.initEvent (eventType, true, true);
        node.dispatchEvent (clickEvent);
    }
    const attrObserver = new MutationObserver((mutations) => {
        mutations.forEach(mu => {
            if (mu.type !== "attributes" && mu.attributeName !== "class") return;
            if (mu.target.classList.contains("view-go")){
                console.log(mu.target)
                triggerMouseEvent (mu.target, "mousedown");
            }
        });
    });


    const button = document.createElement("Button");
    button.innerHTML = "Start";
    button.style = "top:0;right:0;  font-size: 36px;;position:absolute;z-index: 9999";
    document.body.appendChild(button);
    let started = false;
    button.onclick = ()=>{
        const not_started = document.querySelector(".view-splash");
        if (!not_started){
            alert("Please refresh page");
            return;
        }
        started = true;
        triggerMouseEvent (not_started, "mousedown");

        button.innerHTML="Stop";
       attrObserver.observe( not_started, {attributes: true});
    };


})();
