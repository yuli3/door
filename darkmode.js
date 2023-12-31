// @license © 2019 Google LLC. Licensed under the Apache License, Version 2.0.
const e = document;
let t = {};
try {
    t = localStorage
} catch (e) {}
const i = "prefers-color-scheme";
const a = "media";
const s = "light";
const r = "dark";
const o = `(${i}:${r})`;
const n = `(${i}:${s})`;
const l = "link[rel=stylesheet]";
const h = "remember";
const c = "legend";
const d = "toggle";
const b = "switch";
const p = "appearance";
const g = "permanent";
const m = "mode";
const u = "colorschemechange";
const f = "permanentcolorscheme";
const k = "all";
const v = "not all";
const $ = "dark-mode-toggle";
const L = "https://googlechromelabs.github.io/dark-mode-toggle/demo/";
const y = (e, t, i = t) => {
    Object.defineProperty(e, i, {
        enumerable: true,
        get() {
            const e = this.getAttribute(t);
            return e === null ? "" : e
        },
        set(e) {
            this.setAttribute(t, e)
        }
    })
};
const x = (e, t, i = t) => {
    Object.defineProperty(e, i, {
        enumerable: true,
        get() {
            return this.hasAttribute(t)
        },
        set(e) {
            if (e) {
                this.setAttribute(t, "")
            } else {
                this.removeAttribute(t)
            }
        }
    })
};
const w = e.createElement("template");
w.innerHTML = `<style>*,::after,::before{box-sizing:border-box}:host{contain:content;display:block}:host([hidden]){display:none}form{background-color:var(--${$}-background-color,transparent);color:var(--${$}-color,inherit);padding:0}fieldset{border:none;margin:0;padding-block:.25rem;padding-inline:.25rem}legend{font:var(--${$}-legend-font,inherit);padding:0}input,label{cursor:pointer}label{white-space:nowrap}input{opacity:0;position:absolute;pointer-events:none}input:focus-visible+label{outline:#e59700 auto 2px;outline:-webkit-focus-ring-color auto 5px}label:not(:empty)::before{margin-inline-end:.5rem;}label::before{content:"";display:inline-block;background-size:var(--${$}-icon-size,1rem);background-repeat:no-repeat;height:var(--${$}-icon-size,1rem);width:var(--${$}-icon-size,1rem);vertical-align:middle;}[part=lightLabel]::before{background-image:var(--${$}-light-icon, url("${L}sun.png"))}[part=darkLabel]::before{filter:var(--${$}-icon-filter, none);background-image:var(--${$}-dark-icon, url("${L}moon.png"))}[part=toggleLabel]::before{background-image:var(--${$}-checkbox-icon,none)}[part=permanentLabel]::before{background-image:var(--${$}-remember-icon-unchecked, url("${L}unchecked.svg"))}[part=darkLabel],[part=lightLabel],[part=toggleLabel]{font:var(--${$}-label-font,inherit)}[part=darkLabel]:empty,[part=lightLabel]:empty,[part=toggleLabel]:empty{font-size:0;padding:0}[part=permanentLabel]{font:var(--${$}-remember-font,inherit)}input:checked+[part=permanentLabel]::before{background-image:var(--${$}-remember-icon-checked, url("${L}checked.svg"))}input:checked+[part=darkLabel],input:checked+[part=lightLabel]{background-color:var(--${$}-active-mode-background-color,transparent)}input:checked+[part=darkLabel]::before,input:checked+[part=lightLabel]::before{background-color:var(--${$}-active-mode-background-color,transparent)}input:checked+[part=toggleLabel]::before{filter:var(--${$}-icon-filter, none)}input:checked+[part=toggleLabel]+aside [part=permanentLabel]::before{filter:var(--${$}-remember-filter, invert(100%))}aside{visibility:hidden;margin-block-start:.15rem}[part=darkLabel]:focus-visible~aside,[part=lightLabel]:focus-visible~aside,[part=toggleLabel]:focus-visible~aside{visibility:visible;transition:visibility 0s}aside [part=permanentLabel]:empty{display:none}@media (hover:hover){aside{transition:visibility 3s}aside:hover{visibility:visible}[part=darkLabel]:hover~aside,[part=lightLabel]:hover~aside,[part=toggleLabel]:hover~aside{visibility:visible;transition:visibility 0s}}</style><form part=form><fieldset part=fieldset><legend part=legend></legend><input part=lightRadio id=l name=mode type=radio><label part=lightLabel for=l></label><input part=darkRadio id=d name=mode type=radio><label part=darkLabel for=d></label><input part=toggleCheckbox id=t type=checkbox><label part=toggleLabel for=t></label><aside part=aside><input part=permanentCheckbox id=p type=checkbox><label part=permanentLabel for=p></label></aside></fieldset></form>`;
export class DarkModeToggle extends HTMLElement {
    static get observedAttributes() {
        return [m, p, g, c, s, r, h]
    }
    constructor() {
        super();
        y(this, m);
        y(this, p);
        y(this, c);
        y(this, s);
        y(this, r);
        y(this, h);
        x(this, g);
        this.t = null;
        this.i = null;
        e.addEventListener(u, (e => {
            this.mode = e.detail.colorScheme;
            this.o();
            this.l()
        }));
        e.addEventListener(f, (e => {
            this.permanent = e.detail.permanent;
            this.h.checked = this.permanent
        }));
        this.p()
    }
    p() {
        const t = this.attachShadow({
            mode: "open"
        });
        t.append(w.content.cloneNode(true));
        this.t = e.querySelectorAll(`${l}[${a}*=${i}][${a}*="${r}"]`);
        this.i = e.querySelectorAll(`${l}[${a}*=${i}][${a}*="${s}"]`);
        this.g = t.querySelector("[part=lightRadio]");
        this.m = t.querySelector("[part=lightLabel]");
        this.u = t.querySelector("[part=darkRadio]");
        this.k = t.querySelector("[part=darkLabel]");
        this.v = t.querySelector("[part=toggleCheckbox]");
        this.$ = t.querySelector("[part=toggleLabel]");
        this.L = t.querySelector("legend");
        this.C = t.querySelector("aside");
        this.h = t.querySelector("[part=permanentCheckbox]");
        this.M = t.querySelector("[part=permanentLabel]")
    }
    connectedCallback() {
        const e = matchMedia(o).media !== v;
        if (e) {
            matchMedia(o).addListener((({
                matches: e
            }) => {
                if (this.permanent) {
                    return
                }
                this.mode = e ? r : s;
                this.R(u, {
                    colorScheme: this.mode
                })
            }))
        }
        let i = false;
        try {
            i = t.getItem($)
        } catch (e) {}
        if (i && [r, s].includes(i)) {
            this.mode = i;
            this.h.checked = true;
            this.permanent = true
        } else if (e) {
            this.mode = matchMedia(n).matches ? s : r
        }
        if (!this.mode) {
            this.mode = s
        }
        if (this.permanent && !i) {
            try {
                t.setItem($, this.mode)
            } catch (e) {}
        }
        if (!this.appearance) {
            this.appearance = d
        }
        this._();
        this.o();
        this.l();
        [this.g, this.u].forEach((e => {
            e.addEventListener("change", (() => {
                this.mode = this.g.checked ? s : r;
                this.l();
                this.R(u, {
                    colorScheme: this.mode
                })
            }))
        }));
        this.v.addEventListener("change", (() => {
            this.mode = this.v.checked ? r : s;
            this.o();
            this.R(u, {
                colorScheme: this.mode
            })
        }));
        this.h.addEventListener("change", (() => {
            this.permanent = this.h.checked;
            this.R(f, {
                permanent: this.permanent
            })
        }));
        this.A();
        this.R(u, {
            colorScheme: this.mode
        });
        this.R(f, {
            permanent: this.permanent
        })
    }
    attributeChangedCallback(e, i, a) {
        if (e === m) {
            if (![s, r].includes(a)) {
                throw new RangeError(`Allowed values: "${s}" and "${r}".`)
            }
            if (matchMedia("(hover:none)").matches && this.remember) {
                this.S()
            }
            if (this.permanent) {
                try {
                    t.setItem($, this.mode)
                } catch (e) {}
            }
            this.o();
            this.l();
            this.A()
        } else if (e === p) {
            if (![d, b].includes(a)) {
                throw new RangeError(`Allowed values: "${d}" and "${b}".`)
            }
            this._()
        } else if (e === g) {
            if (this.permanent) {
                if (this.mode) {
                    try {
                        t.setItem($, this.mode)
                    } catch (e) {}
                }
            } else {
                try {
                    t.removeItem($)
                } catch (e) {}
            }
            this.h.checked = this.permanent
        } else if (e === c) {
            this.L.textContent = a
        } else if (e === h) {
            this.M.textContent = a
        } else if (e === s) {
            this.m.textContent = a;
            if (this.mode === s) {
                this.$.textContent = a
            }
        } else if (e === r) {
            this.k.textContent = a;
            if (this.mode === r) {
                this.$.textContent = a
            }
        }
    }
    R(e, t) {
        this.dispatchEvent(new CustomEvent(e, {
            bubbles: true,
            composed: true,
            detail: t
        }))
    }
    _() {
        const e = this.appearance === d;
        this.g.hidden = e;
        this.m.hidden = e;
        this.u.hidden = e;
        this.k.hidden = e;
        this.v.hidden = !e;
        this.$.hidden = !e
    }
    o() {
        if (this.mode === s) {
            this.g.checked = true
        } else {
            this.u.checked = true
        }
    }
    l() {
        if (this.mode === s) {
            this.$.style.setProperty(`--${$}-checkbox-icon`, `var(--${$}-light-icon,url("${L}moon.png"))`);
            this.$.textContent = this.light;
            if (!this.light) {
                this.$.ariaLabel = r
            }
            this.v.checked = false
        } else {
            this.$.style.setProperty(`--${$}-checkbox-icon`, `var(--${$}-dark-icon,url("${L}sun.png"))`);
            this.$.textContent = this.dark;
            if (!this.dark) {
                this.$.ariaLabel = s
            }
            this.v.checked = true
        }
    }
    A() {
        if (this.mode === s) {
            this.i.forEach((e => {
                e.media = k;
                e.disabled = false
            }));
            this.t.forEach((e => {
                e.media = v;
                e.disabled = true
            }))
        } else {
            this.t.forEach((e => {
                e.media = k;
                e.disabled = false
            }));
            this.i.forEach((e => {
                e.media = v;
                e.disabled = true
            }))
        }
    }
    S() {
        this.C.style.visibility = "visible";
        setTimeout((() => {
            this.C.style.visibility = "hidden"
        }), 3e3)
    }
}
customElements.define($, DarkModeToggle);