const c = {
    on: function(t, e) {
        return t.split(" ").forEach(r => this.addEventListener(r, e)), this
    },
    off: function(t, e) {
        return t.split(" ").forEach(r => this.removeEventListener(r, e)), this
    },
    attr: function(t, e) {
        return e === void 0 ? this.getAttribute(t) : (e == null ? this.removeAttribute(t) : this.setAttribute(t, e || ""), this)
    }
};

function h(t, e = document) {
    let r = t instanceof NodeList || Array.isArray(t) ? t : t instanceof HTMLElement || t instanceof SVGElement ? [t] : e.querySelectorAll(t);
    return r.length || (r = []), Object.assign(Array.from(r).map(n => Object.assign(n, c)), {
        on: function(n, i) {
            return this.forEach(o => o.on(n, i)), this
        },
        off: function(n, i) {
            return this.forEach(o => o.off(n, i)), this
        },
        attr: function(n, i) {
            return typeof n == "string" && i === void 0 ? this[0].attr(n) : (typeof n == "object" ? this.forEach(o => Object.entries(n).forEach(([f, s]) => o.attr(f, s))) : typeof n == "string" && (i || i == null || i == "") && this.forEach(o => o.attr(n, i)), this)
        }
    })
}
export {
    h as $
};