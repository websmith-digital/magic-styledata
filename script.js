/*
 Satisfy - made to satisfy CSS selectors
 Copyright (c) 2009 James Padolsey
 -------------------------------------------------------
 Dual licensed under the MIT and GPL licenses.
    - http://www.opensource.org/licenses/mit-license.php
    - http://www.gnu.org/copyleft/gpl.html
 -------------------------------------------------------
 Version: 0.3
 -------------------------------------------------------
 (most) Regular Expressions are Copyright (c) John Resig,
 from the Sizzle Selector Engine.
*/
(function (f) {
    var l = f();
    "object" === typeof exports
        ? (module.exports = l)
        : "function" === typeof define && define.amd
        ? define(f)
        : (window.satisfy = l);
    void 0 !== window.jQuery &&
        jQuery.fn &&
        (jQuery.satisfy = function (k) {
            return jQuery(l(k));
        });
})(function () {
    function f(b) {
        if (b in p) return p[b].cloneNode(!0).childNodes;
        for (
            var d = [],
                e = q.createDocumentFragment(),
                c,
                f,
                a,
                h = 1,
                t = 0,
                u = !1,
                n;
            null !== (m = l.exec(b));

        )
            ++t, d.push(m[1]);
        for (; t--; )
            if (((a = d[t]), k.COMBINATOR.test(a))) u = "~" === a || "+" === a;
            else {
                h = (n = a.match(k.CLONE)) ? ~~n[1] : 1;
                f = c;
                c = a;
                a = k.TAG.exec(c);
                a = q.createElement(a && "*" !== a[1] ? a[1] : "div");
                for (
                    var g = q.createDocumentFragment(),
                        w = v.length,
                        r = void 0,
                        s = void 0,
                        x = void 0;
                    w--;

                )
                    if (((s = k[v[w]]), (x = y[v[w]]), s.global))
                        for (; null !== (r = s.exec(c)); ) x(r, a);
                    else (r = s.exec(c)) && x(r, a);
                for (; h--; ) g.appendChild(a.cloneNode(!0));
                c = g;
                if (f)
                    if (u) c.appendChild(f), (u = !1);
                    else {
                        h = c;
                        h = h.childNodes;
                        a = h.length;
                        for (g = void 0; a--; )
                            (g = h[a]),
                                "table" === g.nodeName.toLowerCase() &&
                                    g.appendChild(
                                        (g = q.createElement("tbody"))
                                    ),
                                g.appendChild(f.cloneNode(!0));
                    }
            }
        e.appendChild(c);
        p[b] = e.cloneNode(!0);
        return e.childNodes;
    }
    var l =
            /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,
        k = {
            ID: /#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,
            CLASS: /\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?![^[\]]+])/g,
            NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,
            ATTR: /\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/g,
            TAG: /^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,
            CLONE: /\:(\d+)(?=$|[:[])/,
            COMBINATOR: /^[>~+]$/,
        },
        q = document,
        p = {},
        n = { for: "htmlFor", class: "className", html: "innerHTML" },
        v = ["ID", "CLASS", "NAME", "ATTR"],
        y = {
            ID: function (b, d) {
                d.id = b[1];
            },
            CLASS: function (b, d) {
                var e = d.className.replace(/^\s+$/, "");
                d.className = e ? e + " " + b[1] : b[1];
            },
            NAME: function (b, d) {
                d.name = b[1];
            },
            ATTR: function (b, d) {
                var e = b[1],
                    c = b[4] || !0;
                !0 === c || "innerHTML" === e || n.hasOwnProperty(e)
                    ? (d[n[e] || e] = c)
                    : d.setAttribute(e, c);
            },
        };
    f.cache = p;
    return f;
});

//
//
//
//
//

$(".ws-styleguide_swatch_value").each((i, obj) => {
    const value = $(obj);
    const swatch = value
        .closest(".ws-styleguide_swatch")
        .find(".ws-styleguide_swatch_color")[0];

    const computedStyle = window.getComputedStyle(swatch, null);
    const bgColorRGB = computedStyle.getPropertyValue("background-color");
    const bgColorHex = rgba2hex(bgColorRGB);

    value.text(bgColorHex);
});

$("[ws-styledata-selector]").each((i, parent) => {
    const selector = $(parent).attr("ws-styledata-selector");
    const temporary = $.satisfy(selector).hide().prependTo("body");

    $(parent)
        .find("[ws-styledata-property]")
        .each((j, child) => {
            const datum = $(child);
            const propName = datum.attr("ws-styledata-property");
            const propValue = temporary.css(propName.split("_")[0]);
            const fontSizePx = temporary.css("font-size");
            datum.text(formatPropertyValue(propValue, propName, fontSizePx));
        });

    temporary.remove();
});

function formatPropertyValue(propValue, propName, fontSizePx) {
    const fontSizePxValue = parseInt(fontSizePx.split("px")[0], 10);
    const fontSizeRem = round(fontSizePxValue / 16, 3) + "rem";

    let lineHeightPx;
    let lineHeightPxValue;
    let lineHeightPxRounded;
    let lineHeightEm;
    let lineHeight;

    let letterSpacingPx;
    let letterSpacingPxValue;
    let letterSpacingPercent;

    switch (propName) {
        case "font-family":
            const fontFamily = propValue.split(",")[0];
            return fontFamily;

        case "font-weight":
            const fontWeight = propValue;
            return fontWeight;

        case "font-size":
            return fontSizeRem + " / " + fontSizePx;

        case "font-size_rem-px":
            return fontSizeRem + " / " + fontSizePx;

        case "font-size_px":
            return fontSizePx;

        case "font-size_rem":
            return fontSizeRem;

        case "font-size_px-rem":
            return fontSizePx + " / " + fontSizeRem;

        case "line-height":
            lineHeightPx = propValue;
            lineHeightPxValue = lineHeightPx.split("px")[0];
            lineHeightPxRounded = round(parseInt(lineHeightPxValue, 10)) + "px";
            lineHeightEm = round(lineHeightPxValue / fontSizePxValue, 3) + "em";
            return lineHeightEm + " / " + lineHeightPxRounded;

        case "line-height_em-px":
            lineHeightPx = propValue;
            lineHeightPxValue = lineHeightPx.split("px")[0];
            lineHeightPxRounded = round(parseInt(lineHeightPxValue, 10)) + "px";
            lineHeightEm = round(lineHeightPxValue / fontSizePxValue, 3) + "em";
            return lineHeightEm + " / " + lineHeightPxRounded;

        case "line-height_px":
            lineHeightPx = propValue;
            return lineHeight;

        case "line-height_em":
            lineHeightPx = propValue;
            lineHeightPxValue = lineHeightPx.split("px")[0];
            lineHeightEm = round(lineHeightPxValue / fontSizePxValue, 3) + "em";
            return lineHeightEm;

        case "line-height_px-em":
            lineHeightPx = propValue;
            lineHeightPxValue = lineHeightPx.split("px")[0];
            lineHeightPxRounded = round(parseInt(lineHeightPxValue, 10)) + "px";
            lineHeightEm = round(lineHeightPxValue / fontSizePxValue, 3) + "em";
            return lineHeightPxRounded + " / " + lineHeightEm;

        case "letter-spacing":
            letterSpacingPx = propValue;
            letterSpacingPxValue = letterSpacingPx.split("px")[0];
            letterSpacingPercent = letterSpacingPxValue / fontSizePxValue + "%";
            return letterSpacingPercent;
        case "letter-spacing_px":
            letterSpacingPx = propValue;
            return letterSpacingPx;
        case "letter-spacing_%":
            letterSpacingPx = propValue;
            letterSpacingPxValue = letterSpacingPx.split("px")[0];
            letterSpacingPercent = letterSpacingPxValue / fontSizePxValue + "%";
            return letterSpacingPercent;
        case "letter-spacing_px-%":
            letterSpacingPx = propValue;
            letterSpacingPxValue = letterSpacingPx.split("px")[0];
            letterSpacingPercent = letterSpacingPxValue / fontSizePxValue + "%";
            return letterSpacingPx + " / " + letterSpacingPercent;
        case "letter-spacing_%-px":
            letterSpacingPx = propValue;
            letterSpacingPxValue = letterSpacingPx.split("px")[0];
            letterSpacingPercent = letterSpacingPxValue / fontSizePxValue + "%";
            return letterSpacingPercent + " / " + letterSpacingPx;
        case "box-shadow":
            return propValue;

        default:
            console.error(
                `
        Error: Invalid property name. Options currently include:
          - font-family (returns font family)
          - font-weight (returns font-weight as integer value)
          - font-size (returns 'font-size-in-rem' / 'font-size-in-px' )
          - font-size_px (returns font-size in px)
          - font-size_rem (returns font-size in rem)
          - font-size_rem-px (returns 'font-size-in-rem' / 'font-size-in-px' )
          - font-size_px-rem (returns 'font-size-in-px' / 'font-size-in-rem' )
          - line-height (returns 'line-height-in-rem' / 'line-height-in-px' )
          - line-height_px (returns line-height in px)
          - line-height_em (returns line-height in rem)
          - line-height_em-px (returns 'line-height-in-rem' / 'line-height-in-px' )
          - line-height_px-em (returns 'line-height-in-px' / 'line-height-in-rem' )
          - letter-spacing (returns letter spacing in % of font size)
          - letter-spacing_px (returns letter spacing in px)
          - letter-spacing_% (returns letter spacing in % of font size)
          - letter-spacing_px-% (returns 'letter spacing in px' / 'letter spacing in %')
          - letter-spacing_%-px (returns 'letter spacing in %' / 'letter spacing in px')
          - box-shadow (returns box shadow properties)
        `
            );
            return "ERROR";
    }
}

function rgba2hex(rgba) {
    return `#${rgba
        .match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.{0,1}\d*))?\)$/)
        .slice(1)
        .map((n, i) =>
            (i === 3 ? Math.round(parseFloat(n) * 255) : parseFloat(n))
                .toString(16)
                .padStart(2, "0")
                .replace("NaN", "")
        )
        .join("")}`;
}

function round(num, decimalPlaces = 0) {
    return (
        Math.round((num + Number.EPSILON) * 10 ** decimalPlaces) /
        10 ** decimalPlaces
    );
}
