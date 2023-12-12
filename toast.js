import {
    $ as l
} from "./toast2.js";





const u = function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) s(o);
    new MutationObserver(o => {
        for (const n of o)
            if (n.type === "childList")
                for (const a of n.addedNodes) a.tagName === "LINK" && a.rel === "modulepreload" && s(a)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function i(o) {
        const n = {};
        return o.integrity && (n.integrity = o.integrity), o.referrerpolicy && (n.referrerPolicy = o.referrerpolicy), o.crossorigin === "use-credentials" ? n.credentials = "include" : o.crossorigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n
    }

    function s(o) {
        if (o.ep) return;
        o.ep = !0;
        const n = i(o);
        fetch(o.href, n)
    }
};
u();
const f = () => {
        const e = document.createElement("section");
        return e.classList.add("gui-toast-group"), document.firstElementChild.insertBefore(e, document.body), e
    },
    m = e => {
        const t = document.createElement("output");
        return t.innerText = e, t.classList.add("gui-toast"), t.setAttribute("role", "status"), t.setAttribute("aria-live", "polite"), t
    },
    p = e => {
        const {
            matches: t
        } = window.matchMedia("(prefers-reduced-motion: no-preference)");
        r.children.length && t ? h(e) : r.appendChild(e)
    },
    showAlertMessage = e => {
        let t = m(e);
        return p(t), new Promise(async (i, s) => {
            await Promise.allSettled(t.getAnimations().map(o => o.finished)), r.removeChild(t), i()
        })
    },
    h = e => {
        const t = r.offsetHeight;
        r.appendChild(e);
        const s = r.offsetHeight - t,
            o = r.animate([{
                transform: `translateY(${s}px)`
            }, {
                transform: "translateY(0)"
            }], {
                duration: 150,
                easing: "ease-out"
            });
        o.startTime = document.timeline.currentTime
    },
    r = f();
l("#spells").on("click", async () => {
    await showAlertMessage('aaaaaaaaaaaaaaa'), console.log("poof")
});


// l("#spells").on("click", async () => {
//     await d(g()), console.log("poof")
// });
// l("#actions").on("click", () => {
//     d(y())
// });


// const g = () => {
//         const e = ["Fire", "Ice", "Lit", "Dark", "Toast"],
//             t = ["I", "II", "III", "IV", "V"];
//         return `${e[c(0, e.length - 1)]} ${t[c(0, t.length - 1)]}`
//     },
//     y = () => {
//         const e = ["Saved", "Added to cart", "In cart", "User removed", "Timer set", "Added to Favorites", `Multi-Line 
//  Support \u{1F44D}`, "This is just really long and completely unnecessary"];
//         return `${e[c(0, e.length - 1)]}`
//     },
//     c = (e, t) => (e = Math.ceil(e), t = Math.floor(t), Math.floor(Math.random() * (t - e + 1)) + e);