/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */ ! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = [],
        d = c.slice,
        e = c.concat,
        f = c.push,
        g = c.indexOf,
        h = {},
        i = h.toString,
        j = h.hasOwnProperty,
        k = {},
        l = a.document,
        m = "2.1.4",
        n = function(a, b) {
            return new n.fn.init(a, b)
        },
        o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        p = /^-ms-/,
        q = /-([\da-z])/gi,
        r = function(a, b) {
            return b.toUpperCase()
        };
    n.fn = n.prototype = {
        jquery: m,
        constructor: n,
        selector: "",
        length: 0,
        toArray: function() {
            return d.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
        },
        pushStack: function(a) {
            var b = n.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a, b) {
            return n.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(n.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(d.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: c.sort,
        splice: c.splice
    }, n.extend = n.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null != (a = arguments[h]))
                for (b in a) c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }, n.extend({
        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === n.type(a)
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window
        },
        isNumeric: function(a) {
            return !n.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isPlainObject: function(a) {
            return "object" !== n.type(a) || a.nodeType || n.isWindow(a) ? !1 : a.constructor && !j.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
        },
        globalEval: function(a) {
            var b, c = eval;
            a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = l.createElement("script"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        },
        camelCase: function(a) {
            return a.replace(p, "ms-").replace(q, r)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, c) {
            var d, e = 0,
                f = a.length,
                g = s(a);
            if (c) {
                if (g) {
                    for (; f > e; e++)
                        if (d = b.apply(a[e], c), d === !1) break
                } else
                    for (e in a)
                        if (d = b.apply(a[e], c), d === !1) break
            } else if (g) {
                for (; f > e; e++)
                    if (d = b.call(a[e], e, a[e]), d === !1) break
            } else
                for (e in a)
                    if (d = b.call(a[e], e, a[e]), d === !1) break;
            return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(o, "")
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : g.call(b, a, c)
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, c) {
            var d, f = 0,
                g = a.length,
                h = s(a),
                i = [];
            if (h)
                for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);
            else
                for (f in a) d = b(a[f], f, c), null != d && i.push(d);
            return e.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, e, f;
            return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (e = d.call(arguments, 2), f = function() {
                return a.apply(b || this, e.concat(d.call(arguments)))
            }, f.guid = a.guid = a.guid || n.guid++, f) : void 0
        },
        now: Date.now,
        support: k
    }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        h["[object " + b + "]"] = b.toLowerCase()
    });

    function s(a) {
        var b = "length" in a && a.length,
            c = n.type(a);
        return "function" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    var t = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
            v = a.document,
            w = 0,
            x = 0,
            y = ha(),
            z = ha(),
            A = ha(),
            B = function(a, b) {
                return a === b && (l = !0), 0
            },
            C = 1 << 31,
            D = {}.hasOwnProperty,
            E = [],
            F = E.pop,
            G = E.push,
            H = E.push,
            I = E.slice,
            J = function(a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1
            },
            K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            L = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            N = M.replace("w", "w#"),
            O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
            P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
            Q = new RegExp(L + "+", "g"),
            R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
            S = new RegExp("^" + L + "*," + L + "*"),
            T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
            U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
            V = new RegExp(P),
            W = new RegExp("^" + N + "$"),
            X = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + O),
                PSEUDO: new RegExp("^" + P),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + K + ")$", "i"),
                needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            $ = /^[^{]+\{\s*\[native \w/,
            _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            aa = /[+~]/,
            ba = /'|\\/g,
            ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
            da = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            },
            ea = function() {
                m()
            };
        try {
            H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
        } catch (fa) {
            H = {
                apply: E.length ? function(a, b) {
                    G.apply(a, I.call(b))
                } : function(a, b) {
                    var c = a.length,
                        d = 0;
                    while (a[c++] = b[d++]);
                    a.length = c - 1
                }
            }
        }

        function ga(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w, x;
            if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k) return d;
            if (!e && p) {
                if (11 !== k && (f = _.exec(a)))
                    if (j = f[1]) {
                        if (9 === k) {
                            if (h = b.getElementById(j), !h || !h.parentNode) return d;
                            if (h.id === j) return d.push(h), d
                        } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d
                    } else {
                        if (f[2]) return H.apply(d, b.getElementsByTagName(a)), d;
                        if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)), d
                    }
                if (c.qsa && (!q || !q.test(a))) {
                    if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                        o = g(a), (r = b.getAttribute("id")) ? s = r.replace(ba, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                        while (l--) o[l] = s + ra(o[l]);
                        w = aa.test(a) && pa(b.parentNode) || b, x = o.join(",")
                    }
                    if (x) try {
                        return H.apply(d, w.querySelectorAll(x)), d
                    } catch (y) {} finally {
                        r || b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(R, "$1"), b, d, e)
        }

        function ha() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }
            return b
        }

        function ia(a) {
            return a[u] = !0, a
        }

        function ja(a) {
            var b = n.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function ka(a, b) {
            var c = a.split("|"),
                e = a.length;
            while (e--) d.attrHandle[c[e]] = b
        }

        function la(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d) return d;
            if (c)
                while (c = c.nextSibling)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function ma(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function na(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function oa(a) {
            return ia(function(b) {
                return b = +b, ia(function(c, d) {
                    var e, f = a([], c.length, b),
                        g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function pa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }
        c = ga.support = {}, f = ga.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, m = ga.setDocument = function(a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", ea, !1) : e.attachEvent && e.attachEvent("onunload", ea)), p = !f(g), c.attributes = ja(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = ja(function(a) {
                return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function(a) {
                return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length
            }), c.getById ? (d.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, d.filter.ID = function(a) {
                var b = a.replace(ca, da);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete d.find.ID, d.filter.ID = function(a) {
                var b = a.replace(ca, da);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
                return p ? b.getElementsByClassName(a) : void 0
            }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (ja(function(a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
            }), ja(function(a) {
                var b = g.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function(a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    while (b = b.parentNode)
                        if (b === a) return !0;
                return !1
            }, B = b ? function(a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
            } : function(a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0,
                    e = a.parentNode,
                    f = b.parentNode,
                    h = [a],
                    i = [b];
                if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                if (e === f) return la(a, b);
                c = a;
                while (c = c.parentNode) h.unshift(c);
                c = b;
                while (c = c.parentNode) i.unshift(c);
                while (h[d] === i[d]) d++;
                return d ? la(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
            }, g) : n
        }, ga.matches = function(a, b) {
            return ga(a, null, null, b)
        }, ga.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {}
            return ga(b, n, null, [a]).length > 0
        }, ga.contains = function(a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b)
        }, ga.attr = function(a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, ga.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, ga.uniqueSort = function(a) {
            var b, d = [],
                e = 0,
                f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return k = null, a
        }, e = ga.getText = function(a) {
            var b, c = "",
                d = 0,
                f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                } else if (3 === f || 4 === f) return a.nodeValue
            } else
                while (b = a[d++]) c += e(b);
            return c
        }, d = ga.selectors = {
            cacheLength: 50,
            createPseudo: ia,
            match: X,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ca, da), a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ca, da).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = ga.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p])
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [w, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];
                            else
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break;
                            return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function(a, c) {
                        var d, f = e(a, b),
                            g = f.length;
                        while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function(a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: ia(function(a) {
                    var b = [],
                        c = [],
                        d = h(a.replace(R, "$1"));
                    return d[u] ? ia(function(a, b, c, e) {
                        var f, g = d(a, null, e, []),
                            h = a.length;
                        while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                    }
                }),
                has: ia(function(a) {
                    return function(b) {
                        return ga(a, b).length > 0
                    }
                }),
                contains: ia(function(a) {
                    return a = a.replace(ca, da),
                        function(b) {
                            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                        }
                }),
                lang: ia(function(a) {
                    return W.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(ca, da).toLowerCase(),
                        function(b) {
                            var c;
                            do
                                if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === o
                },
                focus: function(a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !d.pseudos.empty(a)
                },
                header: function(a) {
                    return Z.test(a.nodeName)
                },
                input: function(a) {
                    return Y.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: oa(function() {
                    return [0]
                }),
                last: oa(function(a, b) {
                    return [b - 1]
                }),
                eq: oa(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: oa(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: oa(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: oa(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: oa(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) d.pseudos[b] = ma(b);
        for (b in {
                submit: !0,
                reset: !0
            }) d.pseudos[b] = na(b);

        function qa() {}
        qa.prototype = d.filters = d.pseudos, d.setFilters = new qa, g = ga.tokenize = function(a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(R, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? ga.error(a) : z(a, i).slice(0)
        };

        function ra(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function sa(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = x++;
            return b.first ? function(b, c, f) {
                while (b = b[d])
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j = [w, f];
                if (g) {
                    while (b = b[d])
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    while (b = b[d])
                        if (1 === b.nodeType || e) {
                            if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
                            if (i[d] = j, j[2] = a(b, c, g)) return !0
                        }
            }
        }

        function ta(a) {
            return a.length > 1 ? function(b, c, d) {
                var e = a.length;
                while (e--)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function ua(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) ga(a, b[d], c);
            return c
        }

        function va(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function wa(a, b, c, d, e, f) {
            return d && !d[u] && (d = wa(d)), e && !e[u] && (e = wa(e, f)), ia(function(f, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    p = f || ua(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : va(p, m, a, h, i),
                    r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = va(r, n), d(j, [], h, i), k = j.length;
                    while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--)(l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--)(l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = va(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
            })
        }

        function xa(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sa(function(a) {
                    return a === b
                }, h, !0), l = sa(function(a) {
                    return J(b, a) > -1
                }, h, !0), m = [function(a, c, d) {
                    var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                    return b = null, e
                }]; f > i; i++)
                if (c = d.relative[a[i].type]) m = [sa(ta(m), c)];
                else {
                    if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                        for (e = ++i; f > e; e++)
                            if (d.relative[a[e].type]) break;
                        return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({
                            value: " " === a[i - 2].type ? "*" : ""
                        })).replace(R, "$1"), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e && ra(a))
                    }
                    m.push(c)
                }
            return ta(m)
        }

        function ya(a, b) {
            var c = b.length > 0,
                e = a.length > 0,
                f = function(f, g, h, i, k) {
                    var l, m, o, p = 0,
                        q = "0",
                        r = f && [],
                        s = [],
                        t = j,
                        u = f || e && d.find.TAG("*", k),
                        v = w += null == t ? 1 : Math.random() || .1,
                        x = u.length;
                    for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                        if (e && l) {
                            m = 0;
                            while (o = a[m++])
                                if (o(l, g, h)) {
                                    i.push(l);
                                    break
                                }
                            k && (w = v)
                        }
                        c && ((l = !o && l) && p--, f && r.push(l))
                    }
                    if (p += q, c && q !== p) {
                        m = 0;
                        while (o = b[m++]) o(r, s, g, h);
                        if (f) {
                            if (p > 0)
                                while (q--) r[q] || s[q] || (s[q] = F.call(i));
                            s = va(s)
                        }
                        H.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i)
                    }
                    return k && (w = v, j = t), r
                };
            return c ? ia(f) : f
        }
        return h = ga.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--) f = xa(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, ya(e, d)), f.selector = a
            }
            return f
        }, i = ga.select = function(a, b, e, f) {
            var i, j, k, l, m, n = "function" == typeof a && a,
                o = !f && g(a = n.selector || a);
            if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0], !b) return e;
                    n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                }
                i = X.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i], d.relative[l = k.type]) break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && ra(j), !a) return H.apply(e, f), e;
                        break
                    }
                }
            }
            return (n || h(a, o))(f, b, !p, e, aa.test(a) && pa(b.parentNode) || b), e
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function(a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"))
        }), ja(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || ka("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && ja(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || ka("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), ja(function(a) {
            return null == a.getAttribute("disabled")
        }) || ka(K, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), ga
    }(a);
    n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
    var u = n.expr.match.needsContext,
        v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        w = /^.[^:#\[\.,]*$/;

    function x(a, b, c) {
        if (n.isFunction(b)) return n.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return n.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (w.test(b)) return n.filter(b, a, c);
            b = n.filter(b, a)
        }
        return n.grep(a, function(a) {
            return g.call(b, a) >= 0 !== c
        })
    }
    n.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }, n.fn.extend({
        find: function(a) {
            var b, c = this.length,
                d = [],
                e = this;
            if ("string" != typeof a) return this.pushStack(n(a).filter(function() {
                for (b = 0; c > b; b++)
                    if (n.contains(e[b], this)) return !0
            }));
            for (b = 0; c > b; b++) n.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
        },
        filter: function(a) {
            return this.pushStack(x(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(x(this, a || [], !0))
        },
        is: function(a) {
            return !!x(this, "string" == typeof a && u.test(a) ? n(a) : a || [], !1).length
        }
    });
    var y, z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        A = n.fn.init = function(a, b) {
            var c, d;
            if (!a) return this;
            if ("string" == typeof a) {
                if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : l, !0)), v.test(c[1]) && n.isPlainObject(b))
                        for (c in b) n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this
                }
                return d = l.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = l, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this))
        };
    A.prototype = n.fn, y = n(l);
    var B = /^(?:parents|prev(?:Until|All))/,
        C = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    n.extend({
        dir: function(a, b, c) {
            var d = [],
                e = void 0 !== c;
            while ((a = a[b]) && 9 !== a.nodeType)
                if (1 === a.nodeType) {
                    if (e && n(a).is(c)) break;
                    d.push(a)
                }
            return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), n.fn.extend({
        has: function(a) {
            var b = n(a, this),
                c = b.length;
            return this.filter(function() {
                for (var a = 0; c > a; a++)
                    if (n.contains(this, b[a])) return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = u.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? n.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? g.call(n(a), this[0]) : g.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(n.unique(n.merge(this.get(), n(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });

    function D(a, b) {
        while ((a = a[b]) && 1 !== a.nodeType);
        return a
    }
    n.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return n.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return n.dir(a, "parentNode", c)
        },
        next: function(a) {
            return D(a, "nextSibling")
        },
        prev: function(a) {
            return D(a, "previousSibling")
        },
        nextAll: function(a) {
            return n.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return n.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return n.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return n.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return n.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return n.sibling(a.firstChild)
        },
        contents: function(a) {
            return a.contentDocument || n.merge([], a.childNodes)
        }
    }, function(a, b) {
        n.fn[a] = function(c, d) {
            var e = n.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (C[a] || n.unique(e), B.test(a) && e.reverse()), this.pushStack(e)
        }
    });
    var E = /\S+/g,
        F = {};

    function G(a) {
        var b = F[a] = {};
        return n.each(a.match(E) || [], function(a, c) {
            b[c] = !0
        }), b
    }
    n.Callbacks = function(a) {
        a = "string" == typeof a ? F[a] || G(a) : n.extend({}, a);
        var b, c, d, e, f, g, h = [],
            i = !a.once && [],
            j = function(l) {
                for (b = a.memory && l, c = !0, g = e || 0, e = 0, f = h.length, d = !0; h && f > g; g++)
                    if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                        b = !1;
                        break
                    }
                d = !1, h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable())
            },
            k = {
                add: function() {
                    if (h) {
                        var c = h.length;
                        ! function g(b) {
                            n.each(b, function(b, c) {
                                var d = n.type(c);
                                "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && g(c)
                            })
                        }(arguments), d ? f = h.length : b && (e = c, j(b))
                    }
                    return this
                },
                remove: function() {
                    return h && n.each(arguments, function(a, b) {
                        var c;
                        while ((c = n.inArray(b, h, c)) > -1) h.splice(c, 1), d && (f >= c && f--, g >= c && g--)
                    }), this
                },
                has: function(a) {
                    return a ? n.inArray(a, h) > -1 : !(!h || !h.length)
                },
                empty: function() {
                    return h = [], f = 0, this
                },
                disable: function() {
                    return h = i = b = void 0, this
                },
                disabled: function() {
                    return !h
                },
                lock: function() {
                    return i = void 0, b || k.disable(), this
                },
                locked: function() {
                    return !i
                },
                fireWith: function(a, b) {
                    return !h || c && !i || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? i.push(b) : j(b)), this
                },
                fire: function() {
                    return k.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!c
                }
            };
        return k
    }, n.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", n.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", n.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", n.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return n.Deferred(function(c) {
                            n.each(b, function(b, f) {
                                var g = n.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = g && g.apply(this, arguments);
                                    a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? n.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, n.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b = 0,
                c = d.call(arguments),
                e = c.length,
                f = 1 !== e || a && n.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : n.Deferred(),
                h = function(a, b, c) {
                    return function(e) {
                        b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                },
                i, j, k;
            if (e > 1)
                for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
            return f || g.resolveWith(k, c), g.promise()
        }
    });
    var H;
    n.fn.ready = function(a) {
        return n.ready.promise().done(a), this
    }, n.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? n.readyWait++ : n.ready(!0)
        },
        ready: function(a) {
            (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (H.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler("ready"), n(l).off("ready"))))
        }
    });

    function I() {
        l.removeEventListener("DOMContentLoaded", I, !1), a.removeEventListener("load", I, !1), n.ready()
    }
    n.ready.promise = function(b) {
        return H || (H = n.Deferred(), "complete" === l.readyState ? setTimeout(n.ready) : (l.addEventListener("DOMContentLoaded", I, !1), a.addEventListener("load", I, !1))), H.promise(b)
    }, n.ready.promise();
    var J = n.access = function(a, b, c, d, e, f, g) {
        var h = 0,
            i = a.length,
            j = null == c;
        if ("object" === n.type(c)) {
            e = !0;
            for (h in c) n.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                return j.call(n(a), c)
            })), b))
            for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    };
    n.acceptData = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    };

    function K() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = n.expando + K.uid++
    }
    K.uid = 1, K.accepts = n.acceptData, K.prototype = {
        key: function(a) {
            if (!K.accepts(a)) return 0;
            var b = {},
                c = a[this.expando];
            if (!c) {
                c = K.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    }, Object.defineProperties(a, b)
                } catch (d) {
                    b[this.expando] = c, n.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}), c
        },
        set: function(a, b, c) {
            var d, e = this.key(a),
                f = this.cache[e];
            if ("string" == typeof b) f[b] = c;
            else if (n.isEmptyObject(f)) n.extend(this.cache[e], b);
            else
                for (d in b) f[d] = b[d];
            return f
        },
        get: function(a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b]
        },
        access: function(a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
        },
        remove: function(a, b) {
            var c, d, e, f = this.key(a),
                g = this.cache[f];
            if (void 0 === b) this.cache[f] = {};
            else {
                n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(E) || [])), c = d.length;
                while (c--) delete g[d[c]]
            }
        },
        hasData: function(a) {
            return !n.isEmptyObject(this.cache[a[this.expando]] || {})
        },
        discard: function(a) {
            a[this.expando] && delete this.cache[a[this.expando]]
        }
    };
    var L = new K,
        M = new K,
        N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        O = /([A-Z])/g;

    function P(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType)
            if (d = "data-" + b.replace(O, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c
                } catch (e) {}
                M.set(a, b, c)
            } else c = void 0;
        return c
    }
    n.extend({
        hasData: function(a) {
            return M.hasData(a) || L.hasData(a)
        },
        data: function(a, b, c) {
            return M.access(a, b, c)
        },
        removeData: function(a, b) {
            M.remove(a, b)
        },
        _data: function(a, b, c) {
            return L.access(a, b, c)
        },
        _removeData: function(a, b) {
            L.remove(a, b)
        }
    }), n.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0],
                g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = M.get(f), 1 === f.nodeType && !L.get(f, "hasDataAttrs"))) {
                    c = g.length;
                    while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));
                    L.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                M.set(this, a)
            }) : J(this, function(b) {
                var c, d = n.camelCase(a);
                if (f && void 0 === b) {
                    if (c = M.get(f, a), void 0 !== c) return c;
                    if (c = M.get(f, d), void 0 !== c) return c;
                    if (c = P(f, d, void 0), void 0 !== c) return c
                } else this.each(function() {
                    var c = M.get(this, d);
                    M.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && M.set(this, a, b)
                })
            }, null, b, arguments.length > 1, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                M.remove(this, a)
            })
        }
    }), n.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = L.get(a, b), c && (!d || n.isArray(c) ? d = L.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = n.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = n._queueHooks(a, b),
                g = function() {
                    n.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return L.get(a, c) || L.access(a, c, {
                empty: n.Callbacks("once memory").add(function() {
                    L.remove(a, [b + "queue", c])
                })
            })
        }
    }), n.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                n.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1,
                e = n.Deferred(),
                f = this,
                g = this.length,
                h = function() {
                    --d || e.resolveWith(f, [f])
                };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = L.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        R = ["Top", "Right", "Bottom", "Left"],
        S = function(a, b) {
            return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
        },
        T = /^(?:checkbox|radio)$/i;
    ! function() {
        var a = l.createDocumentFragment(),
            b = a.appendChild(l.createElement("div")),
            c = l.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var U = "undefined";
    k.focusinBubbles = "onfocusin" in a;
    var V = /^key/,
        W = /^(?:mouse|pointer|contextmenu)|click/,
        X = /^(?:focusinfocus|focusoutblur)$/,
        Y = /^([^.]*)(?:\.(.+)|)$/;

    function Z() {
        return !0
    }

    function $() {
        return !1
    }

    function _() {
        try {
            return l.activeElement
        } catch (a) {}
    }
    n.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = L.get(a);
            if (r) {
                c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function(b) {
                    return typeof n !== U && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0
                }), b = (b || "").match(E) || [""], j = b.length;
                while (j--) h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && n.expr.match.needsContext.test(e),
                    namespace: p.join(".")
                }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0)
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = L.hasData(a) && L.get(a);
            if (r && (i = r.events)) {
                b = (b || "").match(E) || [""], j = b.length;
                while (j--)
                    if (h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                        l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
                        while (f--) k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                        g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o])
                    } else
                        for (o in i) n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(i) && (delete r.handle, L.remove(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, k, m, o, p = [d || l],
                q = j.call(b, "type") ? b.type : b,
                r = j.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || l, 3 !== d.nodeType && 8 !== d.nodeType && !X.test(q + n.event.triggered) && (q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), k = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = r.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, e || !o.trigger || o.trigger.apply(d, c) !== !1)) {
                if (!e && !o.noBubble && !n.isWindow(d)) {
                    for (i = o.delegateType || q, X.test(i + q) || (g = g.parentNode); g; g = g.parentNode) p.push(g), h = g;
                    h === (d.ownerDocument || l) && p.push(h.defaultView || h.parentWindow || a)
                }
                f = 0;
                while ((g = p[f++]) && !b.isPropagationStopped()) b.type = f > 1 ? i : o.bindType || q, m = (L.get(g, "events") || {})[b.type] && L.get(g, "handle"), m && m.apply(g, c), m = k && g[k], m && m.apply && n.acceptData(g) && (b.result = m.apply(g, c), b.result === !1 && b.preventDefault());
                return b.type = q, e || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !n.acceptData(d) || k && n.isFunction(d[q]) && !n.isWindow(d) && (h = d[k], h && (d[k] = null), n.event.triggered = q, d[q](), n.event.triggered = void 0, h && (d[k] = h)), b.result
            }
        },
        dispatch: function(a) {
            a = n.event.fix(a);
            var b, c, e, f, g, h = [],
                i = d.call(arguments),
                j = (L.get(this, "events") || {})[a.type] || [],
                k = n.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, c = 0;
                    while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(g.namespace)) && (a.handleObj = g, a.data = g.data, e = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (a.result = e) === !1 && (a.preventDefault(), a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i !== this; i = i.parentNode || this)
                    if (i.disabled !== !0 || "click" !== a.type) {
                        for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) >= 0 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || l, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        fix: function(a) {
            if (a[n.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = W.test(e) ? this.mouseHooks : V.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;
            while (b--) c = d[b], a[c] = f[c];
            return a.target || (a.target = l), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== _() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === _() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(a) {
                    return n.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = n.extend(new n.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, n.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }, n.Event = function(a, b) {
        return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? Z : $) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void(this[n.expando] = !0)) : new n.Event(a, b)
    }, n.Event.prototype = {
        isDefaultPrevented: $,
        isPropagationStopped: $,
        isImmediatePropagationStopped: $,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = Z, a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = Z, a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = Z, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, n.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        n.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), k.focusinBubbles || n.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            n.event.simulate(b, a.target, n.event.fix(a), !0)
        };
        n.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                    e = L.access(d, b);
                e || d.addEventListener(a, c, !0), L.access(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                    e = L.access(d, b) - 1;
                e ? L.access(d, b, e) : (d.removeEventListener(a, c, !0), L.remove(d, b))
            }
        }
    }), n.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (g in a) this.on(g, b, c, a[g], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = $;
            else if (!d) return this;
            return 1 === e && (f = d, d = function(a) {
                return n().off(a), f.apply(this, arguments)
            }, d.guid = f.guid || (f.guid = n.guid++)), this.each(function() {
                n.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = $), this.each(function() {
                n.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                n.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? n.event.trigger(a, b, c, !0) : void 0
        }
    });
    var aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ba = /<([\w:]+)/,
        ca = /<|&#?\w+;/,
        da = /<(?:script|style|link)/i,
        ea = /checked\s*(?:[^=]|=\s*.checked.)/i,
        fa = /^$|\/(?:java|ecma)script/i,
        ga = /^true\/(.*)/,
        ha = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ia = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    ia.optgroup = ia.option, ia.tbody = ia.tfoot = ia.colgroup = ia.caption = ia.thead, ia.th = ia.td;

    function ja(a, b) {
        return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function ka(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function la(a) {
        var b = ga.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function ma(a, b) {
        for (var c = 0, d = a.length; d > c; c++) L.set(a[c], "globalEval", !b || L.get(b[c], "globalEval"))
    }

    function na(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (L.hasData(a) && (f = L.access(a), g = L.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j)
                    for (c = 0, d = j[e].length; d > c; c++) n.event.add(b, e, j[e][c])
            }
            M.hasData(a) && (h = M.access(a), i = n.extend({}, h), M.set(b, i))
        }
    }

    function oa(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c
    }

    function pa(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && T.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
    }
    n.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0),
                i = n.contains(a.ownerDocument, a);
            if (!(k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
                for (g = oa(h), f = oa(a), d = 0, e = f.length; e > d; d++) pa(f[d], g[d]);
            if (b)
                if (c)
                    for (f = f || oa(a), g = g || oa(h), d = 0, e = f.length; e > d; d++) na(f[d], g[d]);
                else na(a, h);
            return g = oa(h, "script"), g.length > 0 && ma(g, !i && oa(a, "script")), h
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, o = a.length; o > m; m++)
                if (e = a[m], e || 0 === e)
                    if ("object" === n.type(e)) n.merge(l, e.nodeType ? [e] : e);
                    else if (ca.test(e)) {
                f = f || k.appendChild(b.createElement("div")), g = (ba.exec(e) || ["", ""])[1].toLowerCase(), h = ia[g] || ia._default, f.innerHTML = h[1] + e.replace(aa, "<$1></$2>") + h[2], j = h[0];
                while (j--) f = f.lastChild;
                n.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
            } else l.push(b.createTextNode(e));
            k.textContent = "", m = 0;
            while (e = l[m++])
                if ((!d || -1 === n.inArray(e, d)) && (i = n.contains(e.ownerDocument, e), f = oa(k.appendChild(e), "script"), i && ma(f), c)) {
                    j = 0;
                    while (e = f[j++]) fa.test(e.type || "") && c.push(e)
                }
            return k
        },
        cleanData: function(a) {
            for (var b, c, d, e, f = n.event.special, g = 0; void 0 !== (c = a[g]); g++) {
                if (n.acceptData(c) && (e = c[L.expando], e && (b = L.cache[e]))) {
                    if (b.events)
                        for (d in b.events) f[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
                    L.cache[e] && delete L.cache[e]
                }
                delete M.cache[c[M.expando]]
            }
        }
    }), n.fn.extend({
        text: function(a) {
            return J(this, function(a) {
                return void 0 === a ? n.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
                })
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = ja(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = ja(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? n.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || n.cleanData(oa(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && ma(oa(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (n.cleanData(oa(a, !1)), a.textContent = "");
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return n.clone(this, a, b)
            })
        },
        html: function(a) {
            return J(this, function(a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !da.test(a) && !ia[(ba.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(aa, "<$1></$2>");
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(oa(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, n.cleanData(oa(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = e.apply([], a);
            var c, d, f, g, h, i, j = 0,
                l = this.length,
                m = this,
                o = l - 1,
                p = a[0],
                q = n.isFunction(p);
            if (q || l > 1 && "string" == typeof p && !k.checkClone && ea.test(p)) return this.each(function(c) {
                var d = m.eq(c);
                q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
            });
            if (l && (c = n.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
                for (f = n.map(oa(c, "script"), ka), g = f.length; l > j; j++) h = c, j !== o && (h = n.clone(h, !0, !0), g && n.merge(f, oa(h, "script"))), b.call(this[j], h, j);
                if (g)
                    for (i = f[f.length - 1].ownerDocument, n.map(f, la), j = 0; g > j; j++) h = f[j], fa.test(h.type || "") && !L.access(h, "globalEval") && n.contains(i, h) && (h.src ? n._evalUrl && n._evalUrl(h.src) : n.globalEval(h.textContent.replace(ha, "")))
            }
            return this
        }
    }), n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        n.fn[a] = function(a) {
            for (var c, d = [], e = n(a), g = e.length - 1, h = 0; g >= h; h++) c = h === g ? this : this.clone(!0), n(e[h])[b](c), f.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var qa, ra = {};

    function sa(b, c) {
        var d, e = n(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : n.css(e[0], "display");
        return e.detach(), f
    }

    function ta(a) {
        var b = l,
            c = ra[a];
        return c || (c = sa(a, b), "none" !== c && c || (qa = (qa || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = qa[0].contentDocument, b.write(), b.close(), c = sa(a, b), qa.detach()), ra[a] = c), c
    }
    var ua = /^margin/,
        va = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"),
        wa = function(b) {
            return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
        };

    function xa(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || wa(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), va.test(g) && ua.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function ya(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }! function() {
        var b, c, d = l.documentElement,
            e = l.createElement("div"),
            f = l.createElement("div");
        if (f.style) {
            f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === f.style.backgroundClip, e.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", e.appendChild(f);

            function g() {
                f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f.innerHTML = "", d.appendChild(e);
                var g = a.getComputedStyle(f, null);
                b = "1%" !== g.top, c = "4px" === g.width, d.removeChild(e)
            }
            a.getComputedStyle && n.extend(k, {
                pixelPosition: function() {
                    return g(), b
                },
                boxSizingReliable: function() {
                    return null == c && g(), c
                },
                reliableMarginRight: function() {
                    var b, c = f.appendChild(l.createElement("div"));
                    return c.style.cssText = f.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", f.style.width = "1px", d.appendChild(e), b = !parseFloat(a.getComputedStyle(c, null).marginRight), d.removeChild(e), f.removeChild(c), b
                }
            })
        }
    }(), n.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var za = /^(none|table(?!-c[ea]).+)/,
        Aa = new RegExp("^(" + Q + ")(.*)$", "i"),
        Ba = new RegExp("^([+-])=(" + Q + ")", "i"),
        Ca = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Da = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Ea = ["Webkit", "O", "Moz", "ms"];

    function Fa(a, b) {
        if (b in a) return b;
        var c = b[0].toUpperCase() + b.slice(1),
            d = b,
            e = Ea.length;
        while (e--)
            if (b = Ea[e] + c, b in a) return b;
        return d
    }

    function Ga(a, b, c) {
        var d = Aa.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function Ha(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + R[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + R[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + R[f] + "Width", !0, e))) : (g += n.css(a, "padding" + R[f], !0, e), "padding" !== c && (g += n.css(a, "border" + R[f] + "Width", !0, e)));
        return g
    }

    function Ia(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = wa(a),
            g = "border-box" === n.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = xa(a, b, f), (0 > e || null == e) && (e = a.style[b]), va.test(e)) return e;
            d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + Ha(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function Ja(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = L.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && S(d) && (f[g] = L.access(d, "olddisplay", ta(d.nodeName)))) : (e = S(d), "none" === c && e || L.set(d, "olddisplay", e ? c : n.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }
    n.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = xa(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = n.camelCase(b),
                    i = a.style;
                return b = n.cssProps[h] || (n.cssProps[h] = Fa(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ba.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || n.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = Fa(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = xa(a, b, d)), "normal" === e && b in Da && (e = Da[b]), "" === c || c ? (f = parseFloat(e), c === !0 || n.isNumeric(f) ? f || 0 : e) : e
        }
    }), n.each(["height", "width"], function(a, b) {
        n.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? za.test(n.css(a, "display")) && 0 === a.offsetWidth ? n.swap(a, Ca, function() {
                    return Ia(a, b, d)
                }) : Ia(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && wa(a);
                return Ga(a, c, d ? Ha(a, b, d, "border-box" === n.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), n.cssHooks.marginRight = ya(k.reliableMarginRight, function(a, b) {
        return b ? n.swap(a, {
            display: "inline-block"
        }, xa, [a, "marginRight"]) : void 0
    }), n.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        n.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + R[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, ua.test(a) || (n.cssHooks[a + b].set = Ga)
    }), n.fn.extend({
        css: function(a, b) {
            return J(this, function(a, b, c) {
                var d, e, f = {},
                    g = 0;
                if (n.isArray(b)) {
                    for (d = wa(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return Ja(this, !0)
        },
        hide: function() {
            return Ja(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                S(this) ? n(this).show() : n(this).hide()
            })
        }
    });

    function Ka(a, b, c, d, e) {
        return new Ka.prototype.init(a, b, c, d, e)
    }
    n.Tween = Ka, Ka.prototype = {
        constructor: Ka,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = Ka.propHooks[this.prop];
            return a && a.get ? a.get(this) : Ka.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = Ka.propHooks[this.prop];
            return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Ka.propHooks._default.set(this), this
        }
    }, Ka.prototype.init.prototype = Ka.prototype, Ka.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, Ka.propHooks.scrollTop = Ka.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, n.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, n.fx = Ka.prototype.init, n.fx.step = {};
    var La, Ma, Na = /^(?:toggle|show|hide)$/,
        Oa = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"),
        Pa = /queueHooks$/,
        Qa = [Va],
        Ra = {
            "*": [function(a, b) {
                var c = this.createTween(a, b),
                    d = c.cur(),
                    e = Oa.exec(b),
                    f = e && e[3] || (n.cssNumber[a] ? "" : "px"),
                    g = (n.cssNumber[a] || "px" !== f && +d) && Oa.exec(n.css(c.elem, a)),
                    h = 1,
                    i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do h = h || ".5", g /= h, n.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };

    function Sa() {
        return setTimeout(function() {
            La = void 0
        }), La = n.now()
    }

    function Ta(a, b) {
        var c, d = 0,
            e = {
                height: a
            };
        for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = R[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function Ua(a, b, c) {
        for (var d, e = (Ra[b] || []).concat(Ra["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function Va(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this,
            m = {},
            o = a.style,
            p = a.nodeType && S(a),
            q = L.get(a, "fxshow");
        c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, l.always(function() {
            l.always(function() {
                h.unqueued--, n.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? L.get(a, "olddisplay") || ta(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function() {
            o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], Na.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                    if ("show" !== e || !q || void 0 === q[d]) continue;
                    p = !0
                }
                m[d] = q && q[d] || n.style(a, d)
            } else j = void 0;
        if (n.isEmptyObject(m)) "inline" === ("none" === j ? ta(a.nodeName) : j) && (o.display = j);
        else {
            q ? "hidden" in q && (p = q.hidden) : q = L.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function() {
                n(a).hide()
            }), l.done(function() {
                var b;
                L.remove(a, "fxshow");
                for (b in m) n.style(a, b, m[b])
            });
            for (d in m) g = Ua(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function Wa(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function Xa(a, b, c) {
        var d, e, f = 0,
            g = Qa.length,
            h = n.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = La || Sa(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: n.extend({}, b),
                opts: n.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: La || Sa(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (Wa(k, j.opts.specialEasing); g > f; f++)
            if (d = Qa[f].call(j, a, k, j.opts)) return d;
        return n.map(k, Ua, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    n.Animation = n.extend(Xa, {
            tweener: function(a, b) {
                n.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; e > d; d++) c = a[d], Ra[c] = Ra[c] || [], Ra[c].unshift(b)
            },
            prefilter: function(a, b) {
                b ? Qa.unshift(a) : Qa.push(a)
            }
        }), n.speed = function(a, b, c) {
            var d = a && "object" == typeof a ? n.extend({}, a) : {
                complete: c || !c && b || n.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !n.isFunction(b) && b
            };
            return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue)
            }, d
        }, n.fn.extend({
            fadeTo: function(a, b, c, d) {
                return this.filter(S).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, d) {
                var e = n.isEmptyObject(a),
                    f = n.speed(b, c, d),
                    g = function() {
                        var b = Xa(this, n.extend({}, a), f);
                        (e || L.get(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function(a, b, c) {
                var d = function(a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = n.timers,
                        g = L.get(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else
                        for (e in g) g[e] && g[e].stop && Pa.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    (b || !c) && n.dequeue(this, a)
                })
            },
            finish: function(a) {
                return a !== !1 && (a = a || "fx"), this.each(function() {
                    var b, c = L.get(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = n.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), n.each(["toggle", "show", "hide"], function(a, b) {
            var c = n.fn[b];
            n.fn[b] = function(a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Ta(b, !0), a, d, e)
            }
        }), n.each({
            slideDown: Ta("show"),
            slideUp: Ta("hide"),
            slideToggle: Ta("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            n.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), n.timers = [], n.fx.tick = function() {
            var a, b = 0,
                c = n.timers;
            for (La = n.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
            c.length || n.fx.stop(), La = void 0
        }, n.fx.timer = function(a) {
            n.timers.push(a), a() ? n.fx.start() : n.timers.pop()
        }, n.fx.interval = 13, n.fx.start = function() {
            Ma || (Ma = setInterval(n.fx.tick, n.fx.interval))
        }, n.fx.stop = function() {
            clearInterval(Ma), Ma = null
        }, n.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, n.fn.delay = function(a, b) {
            return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        function() {
            var a = l.createElement("input"),
                b = l.createElement("select"),
                c = b.appendChild(l.createElement("option"));
            a.type = "checkbox", k.checkOn = "" !== a.value, k.optSelected = c.selected, b.disabled = !0, k.optDisabled = !c.disabled, a = l.createElement("input"), a.value = "t", a.type = "radio", k.radioValue = "t" === a.value
        }();
    var Ya, Za, $a = n.expr.attrHandle;
    n.fn.extend({
        attr: function(a, b) {
            return J(this, n.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                n.removeAttr(this, a)
            })
        }
    }), n.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === U ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? Za : Ya)),
                void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void n.removeAttr(a, b))
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
                f = b && b.match(E);
            if (f && 1 === a.nodeType)
                while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!k.radioValue && "radio" === b && n.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), Za = {
        set: function(a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    }, n.each(n.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = $a[b] || n.find.attr;
        $a[b] = function(a, b, d) {
            var e, f;
            return d || (f = $a[b], $a[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, $a[b] = f), e
        }
    });
    var _a = /^(?:input|select|textarea|button)$/i;
    n.fn.extend({
        prop: function(a, b) {
            return J(this, n.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[n.propFix[a] || a]
            })
        }
    }), n.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || _a.test(a.nodeName) || a.href ? a.tabIndex : -1
                }
            }
        }
    }), k.optSelected || (n.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        }
    }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        n.propFix[this.toLowerCase()] = this
    });
    var ab = /[\t\r\n\f]/g;
    n.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).addClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(E) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ab, " ") : " ")) {
                        f = 0;
                        while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = n.trim(d), c.className !== g && (c.className = g)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).removeClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(E) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ab, " ") : "")) {
                        f = 0;
                        while (e = b[f++])
                            while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                        g = a ? n.trim(d) : "", c.className !== g && (c.className = g)
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function(c) {
                n(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function() {
                if ("string" === c) {
                    var b, d = 0,
                        e = n(this),
                        f = a.match(E) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else(c === U || "boolean" === c) && (this.className && L.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : L.get(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ab, " ").indexOf(b) >= 0) return !0;
            return !1
        }
    });
    var bb = /\r/g;
    n.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0]; {
                if (arguments.length) return d = n.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
                        return null == a ? "" : a + ""
                    })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(bb, "") : null == c ? "" : c)
            }
        }
    }), n.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = n.find.attr(a, "value");
                    return null != b ? b : n.trim(n.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && n.nodeName(c.parentNode, "optgroup"))) {
                            if (b = n(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    var c, d, e = a.options,
                        f = n.makeArray(b),
                        g = e.length;
                    while (g--) d = e[g], (d.selected = n.inArray(d.value, f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        }
    }), n.each(["radio", "checkbox"], function() {
        n.valHooks[this] = {
            set: function(a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0
            }
        }, k.checkOn || (n.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        n.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), n.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var cb = n.now(),
        db = /\?/;
    n.parseJSON = function(a) {
        return JSON.parse(a + "")
    }, n.parseXML = function(a) {
        var b, c;
        if (!a || "string" != typeof a) return null;
        try {
            c = new DOMParser, b = c.parseFromString(a, "text/xml")
        } catch (d) {
            b = void 0
        }
        return (!b || b.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + a), b
    };
    var eb = /#.*$/,
        fb = /([?&])_=[^&]*/,
        gb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        hb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        ib = /^(?:GET|HEAD)$/,
        jb = /^\/\//,
        kb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        lb = {},
        mb = {},
        nb = "*/".concat("*"),
        ob = a.location.href,
        pb = kb.exec(ob.toLowerCase()) || [];

    function qb(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(E) || [];
            if (n.isFunction(c))
                while (d = f[e++]) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function rb(a, b, c, d) {
        var e = {},
            f = a === mb;

        function g(h) {
            var i;
            return e[h] = !0, n.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }
        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function sb(a, b) {
        var c, d, e = n.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && n.extend(!0, a, d), a
    }

    function tb(a, b, c) {
        var d, e, f, g, h = a.contents,
            i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d)
            for (e in h)
                if (h[e] && h[e].test(d)) {
                    i.unshift(e);
                    break
                }
        if (i[0] in c) f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function ub(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }
    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ob,
            type: "GET",
            isLocal: hb.test(pb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": nb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": n.parseJSON,
                "text xml": n.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? sb(sb(a, n.ajaxSettings), b) : sb(n.ajaxSettings, a)
        },
        ajaxPrefilter: qb(lb),
        ajaxTransport: qb(mb),
        ajax: function(a, b) {
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var c, d, e, f, g, h, i, j, k = n.ajaxSetup({}, b),
                l = k.context || k,
                m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event,
                o = n.Deferred(),
                p = n.Callbacks("once memory"),
                q = k.statusCode || {},
                r = {},
                s = {},
                t = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === t) {
                            if (!f) {
                                f = {};
                                while (b = gb.exec(e)) f[b[1].toLowerCase()] = b[2]
                            }
                            b = f[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === t ? e : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return t || (k.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (2 > t)
                                for (b in a) q[b] = [q[b], a[b]];
                            else v.always(a[v.status]);
                        return this
                    },
                    abort: function(a) {
                        var b = a || u;
                        return c && c.abort(b), x(0, b), this
                    }
                };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || ob) + "").replace(eb, "").replace(jb, pb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (h = kb.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] === pb[1] && h[2] === pb[2] && (h[3] || ("http:" === h[1] ? "80" : "443")) === (pb[3] || ("http:" === pb[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = n.param(k.data, k.traditional)), rb(lb, k, b, v), 2 === t) return v;
            i = n.event && k.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !ib.test(k.type), d = k.url, k.hasContent || (k.data && (d = k.url += (db.test(d) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = fb.test(d) ? d.replace(fb, "$1_=" + cb++) : d + (db.test(d) ? "&" : "?") + "_=" + cb++)), k.ifModified && (n.lastModified[d] && v.setRequestHeader("If-Modified-Since", n.lastModified[d]), n.etag[d] && v.setRequestHeader("If-None-Match", n.etag[d])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + nb + "; q=0.01" : "") : k.accepts["*"]);
            for (j in k.headers) v.setRequestHeader(j, k.headers[j]);
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (j in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[j](k[j]);
            if (c = rb(mb, k, b, v)) {
                v.readyState = 1, i && m.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                    v.abort("timeout")
                }, k.timeout));
                try {
                    t = 1, c.send(r, x)
                } catch (w) {
                    if (!(2 > t)) throw w;
                    x(-1, w)
                }
            } else x(-1, "No Transport");

            function x(a, b, f, h) {
                var j, r, s, u, w, x = b;
                2 !== t && (t = 2, g && clearTimeout(g), c = void 0, e = h || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, f && (u = tb(k, v, f)), u = ub(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (n.lastModified[d] = w), w = v.getResponseHeader("etag"), w && (n.etag[d] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, i && m.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), i && (m.trigger("ajaxComplete", [v, k]), --n.active || n.event.trigger("ajaxStop")))
            }
            return v
        },
        getJSON: function(a, b, c) {
            return n.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return n.get(a, void 0, b, "script")
        }
    }), n.each(["get", "post"], function(a, b) {
        n[b] = function(a, c, d, e) {
            return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), n._evalUrl = function(a) {
        return n.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, n.fn.extend({
        wrapAll: function(a) {
            var b;
            return n.isFunction(a) ? this.each(function(b) {
                n(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                var a = this;
                while (a.firstElementChild) a = a.firstElementChild;
                return a
            }).append(this)), this)
        },
        wrapInner: function(a) {
            return this.each(n.isFunction(a) ? function(b) {
                n(this).wrapInner(a.call(this, b))
            } : function() {
                var b = n(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = n.isFunction(a);
            return this.each(function(c) {
                n(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
            }).end()
        }
    }), n.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0
    }, n.expr.filters.visible = function(a) {
        return !n.expr.filters.hidden(a)
    };
    var vb = /%20/g,
        wb = /\[\]$/,
        xb = /\r?\n/g,
        yb = /^(?:submit|button|image|reset|file)$/i,
        zb = /^(?:input|select|textarea|keygen)/i;

    function Ab(a, b, c, d) {
        var e;
        if (n.isArray(b)) n.each(b, function(b, e) {
            c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== n.type(b)) d(a, b);
        else
            for (e in b) Ab(a + "[" + e + "]", b[e], c, d)
    }
    n.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function() {
            e(this.name, this.value)
        });
        else
            for (c in a) Ab(c, a[c], b, e);
        return d.join("&").replace(vb, "+")
    }, n.fn.extend({
        serialize: function() {
            return n.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = n.prop(this, "elements");
                return a ? n.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !n(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !T.test(a))
            }).map(function(a, b) {
                var c = n(this).val();
                return null == c ? null : n.isArray(c) ? n.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(xb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(xb, "\r\n")
                }
            }).get()
        }
    }), n.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (a) {}
    };
    var Bb = 0,
        Cb = {},
        Db = {
            0: 200,
            1223: 204
        },
        Eb = n.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in Cb) Cb[a]()
    }), k.cors = !!Eb && "withCredentials" in Eb, k.ajax = Eb = !!Eb, n.ajaxTransport(function(a) {
        var b;
        return k.cors || Eb && !a.crossDomain ? {
            send: function(c, d) {
                var e, f = a.xhr(),
                    g = ++Bb;
                if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                    for (e in a.xhrFields) f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c) f.setRequestHeader(e, c[e]);
                b = function(a) {
                    return function() {
                        b && (delete Cb[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Db[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                            text: f.responseText
                        } : void 0, f.getAllResponseHeaders()))
                    }
                }, f.onload = b(), f.onerror = b("error"), b = Cb[g] = b("abort");
                try {
                    f.send(a.hasContent && a.data || null)
                } catch (h) {
                    if (b) throw h
                }
            },
            abort: function() {
                b && b()
            }
        } : void 0
    }), n.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return n.globalEval(a), a
            }
        }
    }), n.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), n.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = n("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                    }), l.head.appendChild(b[0])
                },
                abort: function() {
                    c && c()
                }
            }
        }
    });
    var Fb = [],
        Gb = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Fb.pop() || n.expando + "_" + cb++;
            return this[a] = !0, a
        }
    }), n.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (Gb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Gb.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Gb, "$1" + e) : b.jsonp !== !1 && (b.url += (db.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || n.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Fb.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), n.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || l;
        var d = v.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes))
    };
    var Hb = n.fn.load;
    n.fn.load = function(a, b, c) {
        if ("string" != typeof a && Hb) return Hb.apply(this, arguments);
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h >= 0 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
        }).complete(c && function(a, b) {
            g.each(c, f || [a.responseText, b, a])
        }), this
    }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        n.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), n.expr.filters.animated = function(a) {
        return n.grep(n.timers, function(b) {
            return a === b.elem
        }).length
    };
    var Ib = a.document.documentElement;

    function Jb(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }
    n.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = n.css(a, "position"),
                l = n(a),
                m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, n.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                n.offset.setOffset(this, a, b)
            });
            var b, c, d = this[0],
                e = {
                    top: 0,
                    left: 0
                },
                f = d && d.ownerDocument;
            if (f) return b = f.documentElement, n.contains(b, d) ? (typeof d.getBoundingClientRect !== U && (e = d.getBoundingClientRect()), c = Jb(f), {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0],
                    d = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - d.top - n.css(c, "marginTop", !0),
                    left: b.left - d.left - n.css(c, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || Ib;
                while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) a = a.offsetParent;
                return a || Ib
            })
        }
    }), n.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, c) {
        var d = "pageYOffset" === c;
        n.fn[b] = function(e) {
            return J(this, function(b, e, f) {
                var g = Jb(b);
                return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
            }, b, e, arguments.length, null)
        }
    }), n.each(["top", "left"], function(a, b) {
        n.cssHooks[b] = ya(k.pixelPosition, function(a, c) {
            return c ? (c = xa(a, b), va.test(c) ? n(a).position()[b] + "px" : c) : void 0
        })
    }), n.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        n.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            n.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return J(this, function(b, c, d) {
                    var e;
                    return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), n.fn.size = function() {
        return this.length
    }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return n
    });
    var Kb = a.jQuery,
        Lb = a.$;
    return n.noConflict = function(b) {
        return a.$ === n && (a.$ = Lb), b && a.jQuery === n && (a.jQuery = Kb), n
    }, typeof b === U && (a.jQuery = a.$ = n), n
});

/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

;
(function(e, t, n, r) {
    e.fn.doubleTapToGo = function(r) {
        if (!("ontouchstart" in t) && !navigator.msMaxTouchPoints && !navigator.userAgent.toLowerCase().match(/windows phone os 7/i)) return false;
        this.each(function() {
            var t = false;
            e(this).on("click", function(n) {
                var r = e(this);
                if (r[0] != t[0]) {
                    n.preventDefault();
                    t = r
                }
            });
            e(n).on("click touchstart MSPointerDown", function(n) {
                var r = true,
                    i = e(n.target).parents();
                for (var s = 0; s < i.length; s++)
                    if (i[s] == t[0]) r = false;
                if (r) t = false
            })
        });
        return this
    }
})(jQuery, window, document);
$(document).ready(function() {

    // Detecting IOS Safari	devices
    var ua = window.navigator.userAgent;
    var iOSphone = !!ua.match(/iPhone/i);
    var webkit = !!ua.match(/WebKit/i);
    var iOSSafariPhone = iOSphone && webkit && !ua.match(/WebKit\/5/i) && !ua.match(/CriOS/i);
    var iOSSafariOldPhone = iOSphone && webkit && !!ua.match(/WebKit\/5/i) && !ua.match(/CriOS/i);
    if (iOSSafariPhone) {
        //updating padding for safari iphone users so menu in landscape isn't covered
        //$(".mobile-menu.overlay nav").css("padding-bottom","85px");
    }
    // open menu overlay on focus/click of menu link
    $('a.menu').on('click focus', function(e) {
        e.preventDefault();
        $('.mobile-menu.overlay').addClass('open');
        $('body').addClass('disabled');
        $('.search.overlay').removeClass('open');
        //alignPortalButtons();
        if (iOSSafariOldPhone) {
            $('.overlay.open').hide().show(0);
        }
    });

    // open search overlay on focus/click of mobile search link
    $('a.search').on('click focus', function(e) {
        e.preventDefault();
        $('.search.overlay').addClass('open');
        $('body').addClass('disabled');
        $('.mobile-menu.overlay').removeClass('open');
        setTimeout(function() {
            $('.search.overlay form input:first').focus();
        }, 200);
    });

    // open search overlay on focus/click of desktop search input
    $('.portals form.search-form').on('click focus', function(e) {
        e.preventDefault();
        e.stopPropagation();
        $('.search.overlay').addClass('open');
        $('body').addClass('disabled');
        setTimeout(function() {
            $('.search.overlay form input:first').focus();
        }, 200);
    });

    // Close overlay when focus shifts to logo - tabindex 21
    $('.logo h1 a').focus(function() {
        $('.overlay').removeClass('open');
        $('body').removeClass('disabled');
    });

    // Close overlay clicking close link
    $('a.close').on('click', function(e) {
        e.preventDefault();
        $('.overlay').removeClass('open');
        $('.mobile-menu.overlay nav div.open').removeClass('open');
        $('body').removeClass('disabled');
        $('.search.overlay form input:first').val('');
        $("*:focus").blur();
        storedInput = "";
    });

    // 	// Open search overlay on keydown
    // 	var storedInput = "";
    // 	$(document).on('keydown', function(e) {
    // 		if ($('*:focus').length > 0 || $('.portals .search-form').length < 1) {
    // 			return;
    // 		}
    // 		if(!e.metaKey && !e.ctrlKey && !e.altKey) {
    // 			if (e.keyCode >= 48 && e.keyCode <= 90 || e.keyCode >= 96 && e.keyCode <= 105) {
    // 				storedInput += String.fromCharCode(e.keyCode);
    // 				$('.search.overlay').addClass('open');
    // 				$('body').addClass('disabled');
    // 				$('.mobile-menu.overlay').removeClass('open');
    // 				$('.search.overlay form input:first').focus().val(storedInput.substring(0, storedInput.length -1).toLowerCase());
    //  				return;
    // 			}
    // 		}
    // 	});

    // 	// Close overlay with esc key
    // 	$(document).on('keydown', function(e) {
    // 		if (e.keyCode == 27) {
    // 			$('.overlay.open').removeClass('open');
    // 			$('body.disabled').removeClass('disabled');
    // 			$('a.close').focus();
    // 			$('.search.overlay form input:first').val('');
    // 			$("*:focus").blur();
    // 			storedInput = "";
    //  			return;
    // 		}
    // 	});


    // Mobile menu accordion - disabled as nolonger a megamenu
    // 	$('.mobile-menu.overlay nav div h3 a').click(function(e) {
    // 		var container = $(this).parents('.mobile-menu.overlay nav div');
    // 		if ($(container).hasClass('open')) {
    //  			return;
    // 		}
    // 		e.preventDefault();
    // 		$(this).parents('.mobile-menu.overlay nav div').addClass('open');
    // 		$('.mobile-menu.overlay nav > div.open').not(container).removeClass('open');
    // 	});

    // Align portal buttons to bottom of viewport
    $(".mobile-menu").on("scroll orientationchange", function() {
        //alignPortalButtons();
    });

    function alignPortalButtons() {
        var mobileMenuScroll = $(".mobile-menu").scrollTop();
        var mobilePortalBottom = mobileMenuScroll - (mobileMenuScroll * 2)
        if (iOSSafariPhone) {
            if ($(window).width() == 320) {
                //iphone5 is in portrait mode
                $(".mobile-menu").css("height", "460px");
            } else if ($(window).width() == 568) {
                //iphone5 is in landscape mode
                $(".mobile-menu").css("height", "231px");
            } else if ($(window).width() == 375) {
                //iphone6 is in portrait mode
                $(".mobile-menu").css("height", "559px");
            } else if ($(window).width() == 667) {
                //iphone6 is in landscape mode
                $(".mobile-menu").css("height", "330px");
            }
        }
        $(".mobile-menu .portals").css("bottom", mobilePortalBottom);
    }

    if (typeof $("header .inner > ul.portals li.contact-us").doubleTapToGo != "undefined") {
        $("header .inner > ul.portals li.contact-us").doubleTapToGo();
        $("header .desktop-nav nav.global > div").doubleTapToGo();
    }
});
var MTIProjectId = '43ce94c5-04dd-4bff-a9f0-49c8fd6e007c';

eval(function(p, a, c, k, e, r) {
    e = function(c) {
        return c.toString(a)
    };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) {
            return r[e]
        }];
        e = function() {
            return '\\w+'
        };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('4 7=g.b;4 2=3.p(\'r\');2.9=\'a/5\';2.c=\'d\';2.e=(\'6:\'==3.u.h?\'6:\':\'i:\')+\'//j.k.l/t/1.5?m=n&o=\'+7;(3.8(\'q\')[0]||3.8(\'s\')[0]).f(2);', 31, 31, '||mtiTracking|document|var|css|https|projectId|getElementsByTagName|type|text|MTIProjectId|rel|stylesheet|href|appendChild|window|protocol|http|fast|fonts|net|apiType|css|projectid|createElement|head|link|body||location'.split('|'), 0, {}))
/*
 countdown.js v2.6.0 http://countdownjs.org
 Copyright (c)2006-2014 Stephen M. McKamey.
 Licensed under The MIT License.
*/
var module, countdown = function(v) {
    function A(a, b) {
        var c = a.getTime();
        a.setMonth(a.getMonth() + b);
        return Math.round((a.getTime() - c) / 864E5)
    }

    function w(a) {
        var b = a.getTime(),
            c = new Date(b);
        c.setMonth(a.getMonth() + 1);
        return Math.round((c.getTime() - b) / 864E5)
    }

    function x(a, b) {
        b = b instanceof Date || null !== b && isFinite(b) ? new Date(+b) : new Date;
        if (!a) return b;
        var c = +a.value || 0;
        if (c) return b.setTime(b.getTime() + c), b;
        (c = +a.milliseconds || 0) && b.setMilliseconds(b.getMilliseconds() + c);
        (c = +a.seconds || 0) && b.setSeconds(b.getSeconds() +
            c);
        (c = +a.minutes || 0) && b.setMinutes(b.getMinutes() + c);
        (c = +a.hours || 0) && b.setHours(b.getHours() + c);
        (c = +a.weeks || 0) && (c *= 7);
        (c += +a.days || 0) && b.setDate(b.getDate() + c);
        (c = +a.months || 0) && b.setMonth(b.getMonth() + c);
        (c = +a.millennia || 0) && (c *= 10);
        (c += +a.centuries || 0) && (c *= 10);
        (c += +a.decades || 0) && (c *= 10);
        (c += +a.years || 0) && b.setFullYear(b.getFullYear() + c);
        return b
    }

    function D(a, b) {
        return y(a) + (1 === a ? p[b] : q[b])
    }

    function n() {}

    function k(a, b, c, e, l, d) {
        0 <= a[c] && (b += a[c], delete a[c]);
        b /= l;
        if (1 >= b + 1) return 0;
        if (0 <= a[e]) {
            a[e] = +(a[e] + b).toFixed(d);
            switch (e) {
                case "seconds":
                    if (60 !== a.seconds || isNaN(a.minutes)) break;
                    a.minutes++;
                    a.seconds = 0;
                case "minutes":
                    if (60 !== a.minutes || isNaN(a.hours)) break;
                    a.hours++;
                    a.minutes = 0;
                case "hours":
                    if (24 !== a.hours || isNaN(a.days)) break;
                    a.days++;
                    a.hours = 0;
                case "days":
                    if (7 !== a.days || isNaN(a.weeks)) break;
                    a.weeks++;
                    a.days = 0;
                case "weeks":
                    if (a.weeks !== w(a.refMonth) / 7 || isNaN(a.months)) break;
                    a.months++;
                    a.weeks = 0;
                case "months":
                    if (12 !== a.months || isNaN(a.years)) break;
                    a.years++;
                    a.months = 0;
                case "years":
                    if (10 !==
                        a.years || isNaN(a.decades)) break;
                    a.decades++;
                    a.years = 0;
                case "decades":
                    if (10 !== a.decades || isNaN(a.centuries)) break;
                    a.centuries++;
                    a.decades = 0;
                case "centuries":
                    if (10 !== a.centuries || isNaN(a.millennia)) break;
                    a.millennia++;
                    a.centuries = 0
            }
            return 0
        }
        return b
    }

    function B(a, b, c, e, l, d) {
        var f = new Date;
        a.start = b = b || f;
        a.end = c = c || f;
        a.units = e;
        a.value = c.getTime() - b.getTime();
        0 > a.value && (f = c, c = b, b = f);
        a.refMonth = new Date(b.getFullYear(), b.getMonth(), 15, 12, 0, 0);
        try {
            a.millennia = 0;
            a.centuries = 0;
            a.decades = 0;
            a.years = c.getFullYear() -
                b.getFullYear();
            a.months = c.getMonth() - b.getMonth();
            a.weeks = 0;
            a.days = c.getDate() - b.getDate();
            a.hours = c.getHours() - b.getHours();
            a.minutes = c.getMinutes() - b.getMinutes();
            a.seconds = c.getSeconds() - b.getSeconds();
            a.milliseconds = c.getMilliseconds() - b.getMilliseconds();
            var g;
            0 > a.milliseconds ? (g = s(-a.milliseconds / 1E3), a.seconds -= g, a.milliseconds += 1E3 * g) : 1E3 <= a.milliseconds && (a.seconds += m(a.milliseconds / 1E3), a.milliseconds %= 1E3);
            0 > a.seconds ? (g = s(-a.seconds / 60), a.minutes -= g, a.seconds += 60 * g) : 60 <= a.seconds && (a.minutes +=
                m(a.seconds / 60), a.seconds %= 60);
            0 > a.minutes ? (g = s(-a.minutes / 60), a.hours -= g, a.minutes += 60 * g) : 60 <= a.minutes && (a.hours += m(a.minutes / 60), a.minutes %= 60);
            0 > a.hours ? (g = s(-a.hours / 24), a.days -= g, a.hours += 24 * g) : 24 <= a.hours && (a.days += m(a.hours / 24), a.hours %= 24);
            for (; 0 > a.days;) a.months--, a.days += A(a.refMonth, 1);
            7 <= a.days && (a.weeks += m(a.days / 7), a.days %= 7);
            0 > a.months ? (g = s(-a.months / 12), a.years -= g, a.months += 12 * g) : 12 <= a.months && (a.years += m(a.months / 12), a.months %= 12);
            10 <= a.years && (a.decades += m(a.years / 10), a.years %=
                10, 10 <= a.decades && (a.centuries += m(a.decades / 10), a.decades %= 10, 10 <= a.centuries && (a.millennia += m(a.centuries / 10), a.centuries %= 10)));
            b = 0;
            !(e & 1024) || b >= l ? (a.centuries += 10 * a.millennia, delete a.millennia) : a.millennia && b++;
            !(e & 512) || b >= l ? (a.decades += 10 * a.centuries, delete a.centuries) : a.centuries && b++;
            !(e & 256) || b >= l ? (a.years += 10 * a.decades, delete a.decades) : a.decades && b++;
            !(e & 128) || b >= l ? (a.months += 12 * a.years, delete a.years) : a.years && b++;
            !(e & 64) || b >= l ? (a.months && (a.days += A(a.refMonth, a.months)), delete a.months,
                7 <= a.days && (a.weeks += m(a.days / 7), a.days %= 7)) : a.months && b++;
            !(e & 32) || b >= l ? (a.days += 7 * a.weeks, delete a.weeks) : a.weeks && b++;
            !(e & 16) || b >= l ? (a.hours += 24 * a.days, delete a.days) : a.days && b++;
            !(e & 8) || b >= l ? (a.minutes += 60 * a.hours, delete a.hours) : a.hours && b++;
            !(e & 4) || b >= l ? (a.seconds += 60 * a.minutes, delete a.minutes) : a.minutes && b++;
            !(e & 2) || b >= l ? (a.milliseconds += 1E3 * a.seconds, delete a.seconds) : a.seconds && b++;
            if (!(e & 1) || b >= l) {
                var h = k(a, 0, "milliseconds", "seconds", 1E3, d);
                if (h && (h = k(a, h, "seconds", "minutes", 60, d)) && (h =
                        k(a, h, "minutes", "hours", 60, d)) && (h = k(a, h, "hours", "days", 24, d)) && (h = k(a, h, "days", "weeks", 7, d)) && (h = k(a, h, "weeks", "months", w(a.refMonth) / 7, d))) {
                    e = h;
                    var n, p = a.refMonth,
                        q = p.getTime(),
                        r = new Date(q);
                    r.setFullYear(p.getFullYear() + 1);
                    n = Math.round((r.getTime() - q) / 864E5);
                    if (h = k(a, e, "months", "years", n / w(a.refMonth), d))
                        if (h = k(a, h, "years", "decades", 10, d))
                            if (h = k(a, h, "decades", "centuries", 10, d))
                                if (h = k(a, h, "centuries", "millennia", 10, d)) throw Error("Fractional unit overflow");
                }
            }
        } finally {
            delete a.refMonth
        }
        return a
    }

    function d(a, b, c, e, d) {
        var f;
        c = +c || 222;
        e = 0 < e ? e : NaN;
        d = 0 < d ? 20 > d ? Math.round(d) : 20 : 0;
        var k = null;
        "function" === typeof a ? (f = a, a = null) : a instanceof Date || (null !== a && isFinite(a) ? a = new Date(+a) : ("object" === typeof k && (k = a), a = null));
        var g = null;
        "function" === typeof b ? (f = b, b = null) : b instanceof Date || (null !== b && isFinite(b) ? b = new Date(+b) : ("object" === typeof b && (g = b), b = null));
        k && (a = x(k, b));
        g && (b = x(g, a));
        if (!a && !b) return new n;
        if (!f) return B(new n, a, b, c, e, d);
        var k = c & 1 ? 1E3 / 30 : c & 2 ? 1E3 : c & 4 ? 6E4 : c & 8 ? 36E5 : c & 16 ? 864E5 : 6048E5,
            h, g = function() {
                f(B(new n, a, b, c, e, d), h)
            };
        g();
        return h = setInterval(g, k)
    }
    var s = Math.ceil,
        m = Math.floor,
        p, q, r, t, u, f, y, z;
    n.prototype.toString = function(a) {
        var b = z(this),
            c = b.length;
        if (!c) return a ? "" + a : u;
        if (1 === c) return b[0];
        a = r + b.pop();
        return b.join(t) + a
    };
    n.prototype.toHTML = function(a, b) {
        a = a || "span";
        var c = z(this),
            e = c.length;
        if (!e) return (b = b || u) ? "\x3c" + a + "\x3e" + b + "\x3c/" + a + "\x3e" : b;
        for (var d = 0; d < e; d++) c[d] = "\x3c" + a + "\x3e" + c[d] + "\x3c/" + a + "\x3e";
        if (1 === e) return c[0];
        e = r + c.pop();
        return c.join(t) + e
    };
    n.prototype.addTo =
        function(a) {
            return x(this, a)
        };
    z = function(a) {
        var b = [],
            c = a.millennia;
        c && b.push(f(c, 10));
        (c = a.centuries) && b.push(f(c, 9));
        (c = a.decades) && b.push(f(c, 8));
        (c = a.years) && b.push(f(c, 7));
        (c = a.months) && b.push(f(c, 6));
        (c = a.weeks) && b.push(f(c, 5));
        (c = a.days) && b.push(f(c, 4));
        (c = a.hours) && b.push(f(c, 3));
        (c = a.minutes) && b.push(f(c, 2));
        (c = a.seconds) && b.push(f(c, 1));
        (c = a.milliseconds) && b.push(f(c, 0));
        return b
    };
    d.MILLISECONDS = 1;
    d.SECONDS = 2;
    d.MINUTES = 4;
    d.HOURS = 8;
    d.DAYS = 16;
    d.WEEKS = 32;
    d.MONTHS = 64;
    d.YEARS = 128;
    d.DECADES = 256;
    d.CENTURIES = 512;
    d.MILLENNIA = 1024;
    d.DEFAULTS = 222;
    d.ALL = 2047;
    var E = d.setFormat = function(a) {
            if (a) {
                if ("singular" in a || "plural" in a) {
                    var b = a.singular || [];
                    b.split && (b = b.split("|"));
                    var c = a.plural || [];
                    c.split && (c = c.split("|"));
                    for (var d = 0; 10 >= d; d++) p[d] = b[d] || p[d], q[d] = c[d] || q[d]
                }
                "string" === typeof a.last && (r = a.last);
                "string" === typeof a.delim && (t = a.delim);
                "string" === typeof a.empty && (u = a.empty);
                "function" === typeof a.formatNumber && (y = a.formatNumber);
                "function" === typeof a.formatter && (f = a.formatter)
            }
        },
        C = d.resetFormat =
        function() {
            p = " millisecond; second; minute; hour; day; week; month; year; decade; century; millennium".split(";");
            q = " milliseconds; seconds; minutes; hours; days; weeks; months; years; decades; centuries; millennia".split(";");
            r = " and ";
            t = ", ";
            u = "";
            y = function(a) {
                return a
            };
            f = D
        };
    d.setLabels = function(a, b, c, d, f, k, m) {
        E({
            singular: a,
            plural: b,
            last: c,
            delim: d,
            empty: f,
            formatNumber: k,
            formatter: m
        })
    };
    d.resetLabels = C;
    C();
    v && v.exports ? v.exports = d : "function" === typeof window.define && "undefined" !== typeof window.define.amd &&
        window.define("countdown", [], function() {
            return d
        });
    return d
}(module);



$(".countdown-timer").each(function() {
    var self = $(this);
    var endDate = $(this).data("end-date"),
        units = $(this).data("units"),
        last = $(this).data("last"),
        delim = $(this).data("delim"),
        finished = $(this).data("finished");
    if (!endDate) {
        endDate = new Date().toString();
        console.log(endDate);
    }
    if (!units) {
        units = "countdown.HOURS|countdown.MINUTES";
        units = eval(units)
    } else {
        units = eval(units)
    }
    if (!last) {
        last = null
    } else {
        last = " " + last + " "
    }
    if (!delim) {
        delim = null
    } else {
        delim = delim + " "
    }
    if (!finished) {
        finished = null
    }
    countdown.setLabels(null, null, last, delim, finished);

    var timer = countdown(new Date(endDate), function(ts) {
        $(self).html(ts.toHTML("span"));
    }, units);
});

/*! skrollr 0.6.29 (2014-11-17) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function(e, t, r) {
    "use strict";

    function n(r) {
        if (o = t.documentElement, a = t.body, Y(), lt = this, r = r || {}, mt = r.constants || {}, r.easing)
            for (var n in r.easing) X[n] = r.easing[n];
        Tt = r.edgeStrategy || "set", ft = {
            beforerender: r.beforerender,
            render: r.render,
            keyframe: r.keyframe
        }, ut = r.forceHeight !== !1, ut && (zt = r.scale || 1), pt = r.mobileDeceleration || x, gt = r.smoothScrolling !== !1, vt = r.smoothScrollingDuration || A, ht = {
            targetTop: lt.getScrollTop()
        }, Kt = (r.mobileCheck || function() {
            return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || e.opera)
        })(), Kt ? (ct = t.getElementById(r.skrollrBody || E), ct && it(), j(), Dt(o, [y, S], [T])) : Dt(o, [y, b], [T]), lt.refresh(), kt(e, "resize orientationchange", function() {
            var e = o.clientWidth,
                t = o.clientHeight;
            (t !== Bt || e !== $t) && (Bt = t, $t = e, _t = !0)
        });
        var i = R();
        return function l() {
            J(), St = i(l)
        }(), lt
    }
    var o, a, i = {
            get: function() {
                return lt
            },
            init: function(e) {
                return lt || new n(e)
            },
            VERSION: "0.6.29"
        },
        l = Object.prototype.hasOwnProperty,
        s = e.Math,
        c = e.getComputedStyle,
        f = "touchstart",
        u = "touchmove",
        m = "touchcancel",
        p = "touchend",
        d = "skrollable",
        g = d + "-before",
        v = d + "-between",
        h = d + "-after",
        y = "skrollr",
        T = "no-" + y,
        b = y + "-desktop",
        S = y + "-mobile",
        k = "linear",
        w = 1e3,
        x = .004,
        E = "skrollr-body",
        A = 200,
        F = "start",
        C = "end",
        H = "center",
        D = "bottom",
        I = "___skrollable_id",
        P = /^(?:input|textarea|button|select)$/i,
        N = /^\s+|\s+$/g,
        O = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
        V = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
        z = /^(@?[a-z\-]+)\[(\w+)\]$/,
        q = /-([a-z0-9_])/g,
        L = function(e, t) {
            return t.toUpperCase()
        },
        M = /[\-+]?[\d]*\.?[\d]+/g,
        $ = /\{\?\}/g,
        B = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
        _ = /[a-z\-]+-gradient/g,
        G = "",
        K = "",
        Y = function() {
            var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
            if (c) {
                var t = c(a, null);
                for (var n in t)
                    if (G = n.match(e) || +n == n && t[n].match(e)) break;
                if (!G) return G = K = "", r;
                G = G[0], "-" === G.slice(0, 1) ? (K = G, G = {
                    "-webkit-": "webkit",
                    "-moz-": "Moz",
                    "-ms-": "ms",
                    "-o-": "O"
                }[G]) : K = "-" + G.toLowerCase() + "-"
            }
        },
        R = function() {
            var t = e.requestAnimationFrame || e[G.toLowerCase() + "RequestAnimationFrame"],
                r = Nt();
            return (Kt || !t) && (t = function(t) {
                var n = Nt() - r,
                    o = s.max(0, 1e3 / 60 - n);
                return e.setTimeout(function() {
                    r = Nt(), t()
                }, o)
            }), t
        },
        U = function() {
            var t = e.cancelAnimationFrame || e[G.toLowerCase() + "CancelAnimationFrame"];
            return (Kt || !t) && (t = function(t) {
                return e.clearTimeout(t)
            }), t
        },
        X = {
            begin: function() {
                return 0
            },
            end: function() {
                return 1
            },
            linear: function(e) {
                return e
            },
            quadratic: function(e) {
                return e * e
            },
            cubic: function(e) {
                return e * e * e
            },
            swing: function(e) {
                return -s.cos(e * s.PI) / 2 + .5
            },
            sqrt: function(e) {
                return s.sqrt(e)
            },
            outCubic: function(e) {
                return s.pow(e - 1, 3) + 1
            },
            bounce: function(e) {
                var t;
                if (.5083 >= e) t = 3;
                else if (.8489 >= e) t = 9;
                else if (.96208 >= e) t = 27;
                else {
                    if (!(.99981 >= e)) return 1;
                    t = 91
                }
                return 1 - s.abs(3 * s.cos(1.028 * e * t) / t)
            }
        };
    n.prototype.refresh = function(e) {
        var n, o, a = !1;
        for (e === r ? (a = !0, st = [], Gt = 0, e = t.getElementsByTagName("*")) : e.length === r && (e = [e]), n = 0, o = e.length; o > n; n++) {
            var i = e[n],
                l = i,
                s = [],
                c = gt,
                f = Tt,
                u = !1;
            if (a && I in i && delete i[I], i.attributes) {
                for (var m = 0, p = i.attributes.length; p > m; m++) {
                    var g = i.attributes[m];
                    if ("data-anchor-target" !== g.name)
                        if ("data-smooth-scrolling" !== g.name)
                            if ("data-edge-strategy" !== g.name)
                                if ("data-emit-events" !== g.name) {
                                    var v = g.name.match(O);
                                    if (null !== v) {
                                        var h = {
                                            props: g.value,
                                            element: i,
                                            eventType: g.name.replace(q, L)
                                        };
                                        s.push(h);
                                        var y = v[1];
                                        y && (h.constant = y.substr(1));
                                        var T = v[2];
                                        /p$/.test(T) ? (h.isPercentage = !0, h.offset = (0 | T.slice(0, -1)) / 100) : h.offset = 0 | T;
                                        var b = v[3],
                                            S = v[4] || b;
                                        b && b !== F && b !== C ? (h.mode = "relative", h.anchors = [b, S]) : (h.mode = "absolute", b === C ? h.isEnd = !0 : h.isPercentage || (h.offset = h.offset * zt))
                                    }
                                } else u = !0;
                    else f = g.value;
                    else c = "off" !== g.value;
                    else if (l = t.querySelector(g.value), null === l) throw 'Unable to find anchor target "' + g.value + '"'
                }
                if (s.length) {
                    var k, w, x;
                    !a && I in i ? (x = i[I], k = st[x].styleAttr, w = st[x].classAttr) : (x = i[I] = Gt++, k = i.style.cssText, w = Ht(i)), st[x] = {
                        element: i,
                        styleAttr: k,
                        classAttr: w,
                        anchorTarget: l,
                        keyFrames: s,
                        smoothScrolling: c,
                        edgeStrategy: f,
                        emitEvents: u,
                        lastFrameIndex: -1
                    }, Dt(i, [d], [])
                }
            }
        }
        for (At(), n = 0, o = e.length; o > n; n++) {
            var E = st[e[n][I]];
            E !== r && (Q(E), tt(E))
        }
        return lt
    }, n.prototype.relativeToAbsolute = function(e, t, r) {
        var n = o.clientHeight,
            a = e.getBoundingClientRect(),
            i = a.top,
            l = a.bottom - a.top;
        return t === D ? i -= n : t === H && (i -= n / 2), r === D ? i += l : r === H && (i += l / 2), i += lt.getScrollTop(), 0 | i + .5
    }, n.prototype.animateTo = function(e, t) {
        t = t || {};
        var n = Nt(),
            o = lt.getScrollTop();
        return dt = {
            startTop: o,
            topDiff: e - o,
            targetTop: e,
            duration: t.duration || w,
            startTime: n,
            endTime: n + (t.duration || w),
            easing: X[t.easing || k],
            done: t.done
        }, dt.topDiff || (dt.done && dt.done.call(lt, !1), dt = r), lt
    }, n.prototype.stopAnimateTo = function() {
        dt && dt.done && dt.done.call(lt, !0), dt = r
    }, n.prototype.isAnimatingTo = function() {
        return !!dt
    }, n.prototype.isMobile = function() {
        return Kt
    }, n.prototype.setScrollTop = function(t, r) {
        return yt = r === !0, Kt ? Yt = s.min(s.max(t, 0), Vt) : e.scrollTo(0, t), lt
    }, n.prototype.getScrollTop = function() {
        return Kt ? Yt : e.pageYOffset || o.scrollTop || a.scrollTop || 0
    }, n.prototype.getMaxScrollTop = function() {
        return Vt
    }, n.prototype.on = function(e, t) {
        return ft[e] = t, lt
    }, n.prototype.off = function(e) {
        return delete ft[e], lt
    }, n.prototype.destroy = function() {
        var e = U();
        e(St), xt(), Dt(o, [T], [y, b, S]);
        for (var t = 0, n = st.length; n > t; t++) at(st[t].element);
        o.style.overflow = a.style.overflow = "", o.style.height = a.style.height = "", ct && i.setStyle(ct, "transform", "none"), lt = r, ct = r, ft = r, ut = r, Vt = 0, zt = 1, mt = r, pt = r, qt = "down", Lt = -1, $t = 0, Bt = 0, _t = !1, dt = r, gt = r, vt = r, ht = r, yt = r, Gt = 0, Tt = r, Kt = !1, Yt = 0, bt = r
    };
    var j = function() {
            var n, i, l, c, d, g, v, h, y, T, b, S;
            kt(o, [f, u, m, p].join(" "), function(e) {
                var o = e.changedTouches[0];
                for (c = e.target; 3 === c.nodeType;) c = c.parentNode;
                switch (d = o.clientY, g = o.clientX, T = e.timeStamp, P.test(c.tagName) || e.preventDefault(), e.type) {
                    case f:
                        n && n.blur(), lt.stopAnimateTo(), n = c, i = v = d, l = g, y = T;
                        break;
                    case u:
                        P.test(c.tagName) && t.activeElement !== c && e.preventDefault(), h = d - v, S = T - b, lt.setScrollTop(Yt - h, !0), v = d, b = T;
                        break;
                    default:
                    case m:
                    case p:
                        var a = i - d,
                            k = l - g,
                            w = k * k + a * a;
                        if (49 > w) {
                            if (!P.test(n.tagName)) {
                                n.focus();
                                var x = t.createEvent("MouseEvents");
                                x.initMouseEvent("click", !0, !0, e.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), n.dispatchEvent(x)
                            }
                            return
                        }
                        n = r;
                        var E = h / S;
                        E = s.max(s.min(E, 3), -3);
                        var A = s.abs(E / pt),
                            F = E * A + .5 * pt * A * A,
                            C = lt.getScrollTop() - F,
                            H = 0;
                        C > Vt ? (H = (Vt - C) / F, C = Vt) : 0 > C && (H = -C / F, C = 0), A *= 1 - H, lt.animateTo(0 | C + .5, {
                            easing: "outCubic",
                            duration: A
                        })
                }
            }), e.scrollTo(0, 0), o.style.overflow = a.style.overflow = "hidden"
        },
        W = function() {
            var e, t, r, n, a, i, l, c, f, u, m, p = o.clientHeight,
                d = Ft();
            for (c = 0, f = st.length; f > c; c++)
                for (e = st[c], t = e.element, r = e.anchorTarget, n = e.keyFrames, a = 0, i = n.length; i > a; a++) l = n[a], u = l.offset, m = d[l.constant] || 0, l.frame = u, l.isPercentage && (u *= p, l.frame = u), "relative" === l.mode && (at(t), l.frame = lt.relativeToAbsolute(r, l.anchors[0], l.anchors[1]) - u, at(t, !0)), l.frame += m, ut && !l.isEnd && l.frame > Vt && (Vt = l.frame);
            for (Vt = s.max(Vt, Ct()), c = 0, f = st.length; f > c; c++) {
                for (e = st[c], n = e.keyFrames, a = 0, i = n.length; i > a; a++) l = n[a], m = d[l.constant] || 0, l.isEnd && (l.frame = Vt - l.offset + m);
                e.keyFrames.sort(Ot)
            }
        },
        Z = function(e, t) {
            for (var r = 0, n = st.length; n > r; r++) {
                var o, a, s = st[r],
                    c = s.element,
                    f = s.smoothScrolling ? e : t,
                    u = s.keyFrames,
                    m = u.length,
                    p = u[0],
                    y = u[u.length - 1],
                    T = p.frame > f,
                    b = f > y.frame,
                    S = T ? p : y,
                    k = s.emitEvents,
                    w = s.lastFrameIndex;
                if (T || b) {
                    if (T && -1 === s.edge || b && 1 === s.edge) continue;
                    switch (T ? (Dt(c, [g], [h, v]), k && w > -1 && (Et(c, p.eventType, qt), s.lastFrameIndex = -1)) : (Dt(c, [h], [g, v]), k && m > w && (Et(c, y.eventType, qt), s.lastFrameIndex = m)), s.edge = T ? -1 : 1, s.edgeStrategy) {
                        case "reset":
                            at(c);
                            continue;
                        case "ease":
                            f = S.frame;
                            break;
                        default:
                        case "set":
                            var x = S.props;
                            for (o in x) l.call(x, o) && (a = ot(x[o].value), 0 === o.indexOf("@") ? c.setAttribute(o.substr(1), a) : i.setStyle(c, o, a));
                            continue
                    }
                } else 0 !== s.edge && (Dt(c, [d, v], [g, h]), s.edge = 0);
                for (var E = 0; m - 1 > E; E++)
                    if (f >= u[E].frame && u[E + 1].frame >= f) {
                        var A = u[E],
                            F = u[E + 1];
                        for (o in A.props)
                            if (l.call(A.props, o)) {
                                var C = (f - A.frame) / (F.frame - A.frame);
                                C = A.props[o].easing(C), a = nt(A.props[o].value, F.props[o].value, C), a = ot(a), 0 === o.indexOf("@") ? c.setAttribute(o.substr(1), a) : i.setStyle(c, o, a)
                            }
                        k && w !== E && ("down" === qt ? Et(c, A.eventType, qt) : Et(c, F.eventType, qt), s.lastFrameIndex = E);
                        break
                    }
            }
        },
        J = function() {
            _t && (_t = !1, At());
            var e, t, n = lt.getScrollTop(),
                o = Nt();
            if (dt) o >= dt.endTime ? (n = dt.targetTop, e = dt.done, dt = r) : (t = dt.easing((o - dt.startTime) / dt.duration), n = 0 | dt.startTop + t * dt.topDiff), lt.setScrollTop(n, !0);
            else if (!yt) {
                var a = ht.targetTop - n;
                a && (ht = {
                    startTop: Lt,
                    topDiff: n - Lt,
                    targetTop: n,
                    startTime: Mt,
                    endTime: Mt + vt
                }), ht.endTime >= o && (t = X.sqrt((o - ht.startTime) / vt), n = 0 | ht.startTop + t * ht.topDiff)
            }
            if (Kt && ct && i.setStyle(ct, "transform", "translate(0, " + -Yt + "px) " + bt), yt || Lt !== n) {
                qt = n > Lt ? "down" : Lt > n ? "up" : qt, yt = !1;
                var l = {
                        curTop: n,
                        lastTop: Lt,
                        maxTop: Vt,
                        direction: qt
                    },
                    s = ft.beforerender && ft.beforerender.call(lt, l);
                s !== !1 && (Z(n, lt.getScrollTop()), Lt = n, ft.render && ft.render.call(lt, l)), e && e.call(lt, !1)
            }
            Mt = o
        },
        Q = function(e) {
            for (var t = 0, r = e.keyFrames.length; r > t; t++) {
                for (var n, o, a, i, l = e.keyFrames[t], s = {}; null !== (i = V.exec(l.props));) a = i[1], o = i[2], n = a.match(z), null !== n ? (a = n[1], n = n[2]) : n = k, o = o.indexOf("!") ? et(o) : [o.slice(1)], s[a] = {
                    value: o,
                    easing: X[n]
                };
                l.props = s
            }
        },
        et = function(e) {
            var t = [];
            return B.lastIndex = 0, e = e.replace(B, function(e) {
                return e.replace(M, function(e) {
                    return 100 * (e / 255) + "%"
                })
            }), K && (_.lastIndex = 0, e = e.replace(_, function(e) {
                return K + e
            })), e = e.replace(M, function(e) {
                return t.push(+e), "{?}"
            }), t.unshift(e), t
        },
        tt = function(e) {
            var t, r, n = {};
            for (t = 0, r = e.keyFrames.length; r > t; t++) rt(e.keyFrames[t], n);
            for (n = {}, t = e.keyFrames.length - 1; t >= 0; t--) rt(e.keyFrames[t], n)
        },
        rt = function(e, t) {
            var r;
            for (r in t) l.call(e.props, r) || (e.props[r] = t[r]);
            for (r in e.props) t[r] = e.props[r]
        },
        nt = function(e, t, r) {
            var n, o = e.length;
            if (o !== t.length) throw "Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"';
            var a = [e[0]];
            for (n = 1; o > n; n++) a[n] = e[n] + (t[n] - e[n]) * r;
            return a
        },
        ot = function(e) {
            var t = 1;
            return $.lastIndex = 0, e[0].replace($, function() {
                return e[t++]
            })
        },
        at = function(e, t) {
            e = [].concat(e);
            for (var r, n, o = 0, a = e.length; a > o; o++) n = e[o], r = st[n[I]], r && (t ? (n.style.cssText = r.dirtyStyleAttr, Dt(n, r.dirtyClassAttr)) : (r.dirtyStyleAttr = n.style.cssText, r.dirtyClassAttr = Ht(n), n.style.cssText = r.styleAttr, Dt(n, r.classAttr)))
        },
        it = function() {
            bt = "translateZ(0)", i.setStyle(ct, "transform", bt);
            var e = c(ct),
                t = e.getPropertyValue("transform"),
                r = e.getPropertyValue(K + "transform"),
                n = t && "none" !== t || r && "none" !== r;
            n || (bt = "")
        };
    i.setStyle = function(e, t, r) {
        var n = e.style;
        if (t = t.replace(q, L).replace("-", ""), "zIndex" === t) n[t] = isNaN(r) ? r : "" + (0 | r);
        else if ("float" === t) n.styleFloat = n.cssFloat = r;
        else try {
            G && (n[G + t.slice(0, 1).toUpperCase() + t.slice(1)] = r), n[t] = r
        } catch (o) {}
    };
    var lt, st, ct, ft, ut, mt, pt, dt, gt, vt, ht, yt, Tt, bt, St, kt = i.addEvent = function(t, r, n) {
            var o = function(t) {
                return t = t || e.event, t.target || (t.target = t.srcElement), t.preventDefault || (t.preventDefault = function() {
                    t.returnValue = !1, t.defaultPrevented = !0
                }), n.call(this, t)
            };
            r = r.split(" ");
            for (var a, i = 0, l = r.length; l > i; i++) a = r[i], t.addEventListener ? t.addEventListener(a, n, !1) : t.attachEvent("on" + a, o), Rt.push({
                element: t,
                name: a,
                listener: n
            })
        },
        wt = i.removeEvent = function(e, t, r) {
            t = t.split(" ");
            for (var n = 0, o = t.length; o > n; n++) e.removeEventListener ? e.removeEventListener(t[n], r, !1) : e.detachEvent("on" + t[n], r)
        },
        xt = function() {
            for (var e, t = 0, r = Rt.length; r > t; t++) e = Rt[t], wt(e.element, e.name, e.listener);
            Rt = []
        },
        Et = function(e, t, r) {
            ft.keyframe && ft.keyframe.call(lt, e, t, r)
        },
        At = function() {
            var e = lt.getScrollTop();
            Vt = 0, ut && !Kt && (a.style.height = ""), W(), ut && !Kt && (a.style.height = Vt + o.clientHeight + "px"), Kt ? lt.setScrollTop(s.min(lt.getScrollTop(), Vt)) : lt.setScrollTop(e, !0), yt = !0
        },
        Ft = function() {
            var e, t, r = o.clientHeight,
                n = {};
            for (e in mt) t = mt[e], "function" == typeof t ? t = t.call(lt) : /p$/.test(t) && (t = t.slice(0, -1) / 100 * r), n[e] = t;
            return n
        },
        Ct = function() {
            var e, t = 0;
            return ct && (t = s.max(ct.offsetHeight, ct.scrollHeight)), e = s.max(t, a.scrollHeight, a.offsetHeight, o.scrollHeight, o.offsetHeight, o.clientHeight), e - o.clientHeight
        },
        Ht = function(t) {
            var r = "className";
            return e.SVGElement && t instanceof e.SVGElement && (t = t[r], r = "baseVal"), t[r]
        },
        Dt = function(t, n, o) {
            var a = "className";
            if (e.SVGElement && t instanceof e.SVGElement && (t = t[a], a = "baseVal"), o === r) return t[a] = n, r;
            for (var i = t[a], l = 0, s = o.length; s > l; l++) i = Pt(i).replace(Pt(o[l]), " ");
            i = It(i);
            for (var c = 0, f = n.length; f > c; c++) - 1 === Pt(i).indexOf(Pt(n[c])) && (i += " " + n[c]);
            t[a] = It(i)
        },
        It = function(e) {
            return e.replace(N, "")
        },
        Pt = function(e) {
            return " " + e + " "
        },
        Nt = Date.now || function() {
            return +new Date
        },
        Ot = function(e, t) {
            return e.frame - t.frame
        },
        Vt = 0,
        zt = 1,
        qt = "down",
        Lt = -1,
        Mt = Nt(),
        $t = 0,
        Bt = 0,
        _t = !1,
        Gt = 0,
        Kt = !1,
        Yt = 0,
        Rt = [];
    "function" == typeof define && define.amd ? define([], function() {
        return i
    }) : "undefined" != typeof module && module.exports ? module.exports = i : e.skrollr = i
})(window, document);

window.onload = function() {

    //$('body').wrap( "<div id='skrollr-body'></div>" );



    var s = skrollr.init({
        forceHeight: false,
        mobileCheck: function() {
            return false;
        }
    })

};
$(document).ready(function() {
    $('.smoothie').click(function() {
        var offset;
        try {
            if ($(this).data("offset")) {
                offset = $(this).data("offset");
            } else {
                offset = 120;
            }

        } catch (e) {
            offset = 120;
        }
        if (this.hash) {
            gu.fn.smoothieToTarget($(this.hash), false, offset);
        }
        return false;
    });
});
// Magnific Popup v1.0.1 by Dmitry Semenov
// http://bit.ly/magnific-popup#build=inline+image+ajax+iframe+gallery+retina+imagezoom+fastclick
(function(a) {
    typeof define == "function" && define.amd ? define(["jquery"], a) : typeof exports == "object" ? a(require("jquery")) : a(window.jQuery || window.Zepto)
})(function(a) {
    var b = "Close",
        c = "BeforeClose",
        d = "AfterClose",
        e = "BeforeAppend",
        f = "MarkupParse",
        g = "Open",
        h = "Change",
        i = "mfp",
        j = "." + i,
        k = "mfp-ready",
        l = "mfp-removing",
        m = "mfp-prevent-close",
        n, o = function() {},
        p = !!window.jQuery,
        q, r = a(window),
        s, t, u, v, w = function(a, b) {
            n.ev.on(i + a + j, b)
        },
        x = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        y = function(b, c) {
            n.ev.triggerHandler(i + b, c), n.st.callbacks && (b = b.charAt(0).toLowerCase() + b.slice(1), n.st.callbacks[b] && n.st.callbacks[b].apply(n, a.isArray(c) ? c : [c]))
        },
        z = function(b) {
            if (b !== v || !n.currTemplate.closeBtn) n.currTemplate.closeBtn = a(n.st.closeMarkup.replace("%title%", n.st.tClose)), v = b;
            return n.currTemplate.closeBtn
        },
        A = function() {
            a.magnificPopup.instance || (n = new o, n.init(), a.magnificPopup.instance = n)
        },
        B = function() {
            var a = document.createElement("p").style,
                b = ["ms", "O", "Moz", "Webkit"];
            if (a.transition !== undefined) return !0;
            while (b.length)
                if (b.pop() + "Transition" in a) return !0;
            return !1
        };
    o.prototype = {
        constructor: o,
        init: function() {
            var b = navigator.appVersion;
            n.isIE7 = b.indexOf("MSIE 7.") !== -1, n.isIE8 = b.indexOf("MSIE 8.") !== -1, n.isLowIE = n.isIE7 || n.isIE8, n.isAndroid = /android/gi.test(b), n.isIOS = /iphone|ipad|ipod/gi.test(b), n.supportsTransition = B(), n.probablyMobile = n.isAndroid || n.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), s = a(document), n.popupsCache = {}
        },
        open: function(b) {
            var c;
            if (b.isObj === !1) {
                n.items = b.items.toArray(), n.index = 0;
                var d = b.items,
                    e;
                for (c = 0; c < d.length; c++) {
                    e = d[c], e.parsed && (e = e.el[0]);
                    if (e === b.el[0]) {
                        n.index = c;
                        break
                    }
                }
            } else n.items = a.isArray(b.items) ? b.items : [b.items], n.index = b.index || 0;
            if (n.isOpen) {
                n.updateItemHTML();
                return
            }
            n.types = [], u = "", b.mainEl && b.mainEl.length ? n.ev = b.mainEl.eq(0) : n.ev = s, b.key ? (n.popupsCache[b.key] || (n.popupsCache[b.key] = {}), n.currTemplate = n.popupsCache[b.key]) : n.currTemplate = {}, n.st = a.extend(!0, {}, a.magnificPopup.defaults, b), n.fixedContentPos = n.st.fixedContentPos === "auto" ? !n.probablyMobile : n.st.fixedContentPos, n.st.modal && (n.st.closeOnContentClick = !1, n.st.closeOnBgClick = !1, n.st.showCloseBtn = !1, n.st.enableEscapeKey = !1), n.bgOverlay || (n.bgOverlay = x("bg").on("click" + j, function() {
                n.close()
            }), n.wrap = x("wrap").attr("tabindex", -1).on("click" + j, function(a) {
                n._checkIfClose(a.target) && n.close()
            }), n.container = x("container", n.wrap)), n.contentContainer = x("content"), n.st.preloader && (n.preloader = x("preloader", n.container, n.st.tLoading));
            var h = a.magnificPopup.modules;
            for (c = 0; c < h.length; c++) {
                var i = h[c];
                i = i.charAt(0).toUpperCase() + i.slice(1), n["init" + i].call(n)
            }
            y("BeforeOpen"), n.st.showCloseBtn && (n.st.closeBtnInside ? (w(f, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }), u += " mfp-close-btn-in") : n.wrap.append(z())), n.st.alignTop && (u += " mfp-align-top"), n.fixedContentPos ? n.wrap.css({
                overflow: n.st.overflowY,
                overflowX: "hidden",
                overflowY: n.st.overflowY
            }) : n.wrap.css({
                top: r.scrollTop(),
                position: "absolute"
            }), (n.st.fixedBgPos === !1 || n.st.fixedBgPos === "auto" && !n.fixedContentPos) && n.bgOverlay.css({
                height: s.height(),
                position: "absolute"
            }), n.st.enableEscapeKey && s.on("keyup" + j, function(a) {
                a.keyCode === 27 && n.close()
            }), r.on("resize" + j, function() {
                n.updateSize()
            }), n.st.closeOnContentClick || (u += " mfp-auto-cursor"), u && n.wrap.addClass(u);
            var l = n.wH = r.height(),
                m = {};
            if (n.fixedContentPos && n._hasScrollBar(l)) {
                var o = n._getScrollbarSize();
                o && (m.marginRight = o)
            }
            n.fixedContentPos && (n.isIE7 ? a("body, html").css("overflow", "hidden") : m.overflow = "hidden");
            var p = n.st.mainClass;
            return n.isIE7 && (p += " mfp-ie7"), p && n._addClassToMFP(p), n.updateItemHTML(), y("BuildControls"), a("html").css(m), n.bgOverlay.add(n.wrap).prependTo(n.st.prependTo || a(document.body)), n._lastFocusedEl = document.activeElement, setTimeout(function() {
                n.content ? (n._addClassToMFP(k), n._setFocus()) : n.bgOverlay.addClass(k), s.on("focusin" + j, n._onFocusIn)
            }, 16), n.isOpen = !0, n.updateSize(l), y(g), b
        },
        close: function() {
            if (!n.isOpen) return;
            y(c), n.isOpen = !1, n.st.removalDelay && !n.isLowIE && n.supportsTransition ? (n._addClassToMFP(l), setTimeout(function() {
                n._close()
            }, n.st.removalDelay)) : n._close()
        },
        _close: function() {
            y(b);
            var c = l + " " + k + " ";
            n.bgOverlay.detach(), n.wrap.detach(), n.container.empty(), n.st.mainClass && (c += n.st.mainClass + " "), n._removeClassFromMFP(c);
            if (n.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                n.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "", a("html").css(e)
            }
            s.off("keyup" + j + " focusin" + j), n.ev.off(j), n.wrap.attr("class", "mfp-wrap").removeAttr("style"), n.bgOverlay.attr("class", "mfp-bg"), n.container.attr("class", "mfp-container"), n.st.showCloseBtn && (!n.st.closeBtnInside || n.currTemplate[n.currItem.type] === !0) && n.currTemplate.closeBtn && n.currTemplate.closeBtn.detach(), n.st.autoFocusLast && n._lastFocusedEl && a(n._lastFocusedEl).focus(), n.currItem = null, n.content = null, n.currTemplate = null, n.prevHeight = 0, y(d)
        },
        updateSize: function(a) {
            if (n.isIOS) {
                var b = document.documentElement.clientWidth / window.innerWidth,
                    c = window.innerHeight * b;
                n.wrap.css("height", c), n.wH = c
            } else n.wH = a || r.height();
            n.fixedContentPos || n.wrap.css("height", n.wH), y("Resize")
        },
        updateItemHTML: function() {
            var b = n.items[n.index];
            n.contentContainer.detach(), n.content && n.content.detach(), b.parsed || (b = n.parseEl(n.index));
            var c = b.type;
            y("BeforeChange", [n.currItem ? n.currItem.type : "", c]), n.currItem = b;
            if (!n.currTemplate[c]) {
                var d = n.st[c] ? n.st[c].markup : !1;
                y("FirstMarkupParse", d), d ? n.currTemplate[c] = a(d) : n.currTemplate[c] = !0
            }
            t && t !== b.type && n.container.removeClass("mfp-" + t + "-holder");
            var e = n["get" + c.charAt(0).toUpperCase() + c.slice(1)](b, n.currTemplate[c]);
            n.appendContent(e, c), b.preloaded = !0, y(h, b), t = b.type, n.container.prepend(n.contentContainer), y("AfterChange")
        },
        appendContent: function(a, b) {
            n.content = a, a ? n.st.showCloseBtn && n.st.closeBtnInside && n.currTemplate[b] === !0 ? n.content.find(".mfp-close").length || n.content.append(z()) : n.content = a : n.content = "", y(e), n.container.addClass("mfp-" + b + "-holder"), n.contentContainer.append(n.content)
        },
        parseEl: function(b) {
            var c = n.items[b],
                d;
            c.tagName ? c = {
                el: a(c)
            } : (d = c.type, c = {
                data: c,
                src: c.src
            });
            if (c.el) {
                var e = n.types;
                for (var f = 0; f < e.length; f++)
                    if (c.el.hasClass("mfp-" + e[f])) {
                        d = e[f];
                        break
                    }
                c.src = c.el.attr("data-mfp-src"), c.src || (c.src = c.el.attr("href"))
            }
            return c.type = d || n.st.type || "inline", c.index = b, c.parsed = !0, n.items[b] = c, y("ElementParse", c), n.items[b]
        },
        addGroup: function(a, b) {
            var c = function(c) {
                c.mfpEl = this, n._openClick(c, a, b)
            };
            b || (b = {});
            var d = "click.magnificPopup";
            b.mainEl = a, b.items ? (b.isObj = !0, a.off(d).on(d, c)) : (b.isObj = !1, b.delegate ? a.off(d).on(d, b.delegate, c) : (b.items = a, a.off(d).on(d, c)))
        },
        _openClick: function(b, c, d) {
            var e = d.midClick !== undefined ? d.midClick : a.magnificPopup.defaults.midClick;
            if (!e && (b.which === 2 || b.ctrlKey || b.metaKey || b.altKey || b.shiftKey)) return;
            var f = d.disableOn !== undefined ? d.disableOn : a.magnificPopup.defaults.disableOn;
            if (f)
                if (a.isFunction(f)) {
                    if (!f.call(n)) return !0
                } else if (r.width() < f) return !0;
            b.type && (b.preventDefault(), n.isOpen && b.stopPropagation()), d.el = a(b.mfpEl), d.delegate && (d.items = c.find(d.delegate)), n.open(d)
        },
        updateStatus: function(a, b) {
            if (n.preloader) {
                q !== a && n.container.removeClass("mfp-s-" + q), !b && a === "loading" && (b = n.st.tLoading);
                var c = {
                    status: a,
                    text: b
                };
                y("UpdateStatus", c), a = c.status, b = c.text, n.preloader.html(b), n.preloader.find("a").on("click", function(a) {
                    a.stopImmediatePropagation()
                }), n.container.addClass("mfp-s-" + a), q = a
            }
        },
        _checkIfClose: function(b) {
            if (a(b).hasClass(m)) return;
            var c = n.st.closeOnContentClick,
                d = n.st.closeOnBgClick;
            if (c && d) return !0;
            if (!n.content || a(b).hasClass("mfp-close") || n.preloader && b === n.preloader[0]) return !0;
            if (b !== n.content[0] && !a.contains(n.content[0], b)) {
                if (d && a.contains(document, b)) return !0
            } else if (c) return !0;
            return !1
        },
        _addClassToMFP: function(a) {
            n.bgOverlay.addClass(a), n.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), n.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (n.isIE7 ? s.height() : document.body.scrollHeight) > (a || r.height())
        },
        _setFocus: function() {
            (n.st.focus ? n.content.find(n.st.focus).eq(0) : n.wrap).focus()
        },
        _onFocusIn: function(b) {
            if (b.target !== n.wrap[0] && !a.contains(n.wrap[0], b.target)) return n._setFocus(), !1
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(f, [b, c, d]), a.each(c, function(a, c) {
                if (c === undefined || c === !1) return !0;
                e = a.split("_");
                if (e.length > 1) {
                    var d = b.find(j + "-" + e[0]);
                    if (d.length > 0) {
                        var f = e[1];
                        f === "replaceWith" ? d[0] !== c[0] && d.replaceWith(c) : f === "img" ? d.is("img") ? d.attr("src", c) : d.replaceWith('<img src="' + c + '" class="' + d.attr("class") + '" />') : d.attr(e[1], c)
                    }
                } else b.find(j + "-" + a).html(c)
            })
        },
        _getScrollbarSize: function() {
            if (n.scrollbarSize === undefined) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), n.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return n.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: o.prototype,
        modules: [],
        open: function(b, c) {
            return A(), b ? b = a.extend(!0, {}, b) : b = {}, b.isObj = !0, b.index = c || 0, this.instance.open(b)
        },
        close: function() {
            return a.magnificPopup.instance && a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            showCloseBtn: !0,
            enableEscapeKey: !0,
            modal: !1,
            alignTop: !1,
            removalDelay: 0,
            prependTo: null,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading...",
            autoFocusLast: !0
        }
    }, a.fn.magnificPopup = function(b) {
        A();
        var c = a(this);
        if (typeof b == "string")
            if (b === "open") {
                var d, e = p ? c.data("magnificPopup") : c[0].magnificPopup,
                    f = parseInt(arguments[1], 10) || 0;
                e.items ? d = e.items[f] : (d = c, e.delegate && (d = d.find(e.delegate)), d = d.eq(f)), n._openClick({
                    mfpEl: d
                }, c, e)
            } else n.isOpen && n[b].apply(n, Array.prototype.slice.call(arguments, 1));
        else b = a.extend(!0, {}, b), p ? c.data("magnificPopup", b) : c[0].magnificPopup = b, n.addGroup(c, b);
        return c
    };
    var C = "inline",
        D, E, F, G = function() {
            F && (E.after(F.addClass(D)).detach(), F = null)
        };
    a.magnificPopup.registerModule(C, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                n.types.push(C), w(b + "." + C, function() {
                    G()
                })
            },
            getInline: function(b, c) {
                G();
                if (b.src) {
                    var d = n.st.inline,
                        e = a(b.src);
                    if (e.length) {
                        var f = e[0].parentNode;
                        f && f.tagName && (E || (D = d.hiddenClass, E = x(D), D = "mfp-" + D), F = e.after(E).detach().removeClass(D)), n.updateStatus("ready")
                    } else n.updateStatus("error", d.tNotFound), e = a("<div>");
                    return b.inlineElement = e, e
                }
                return n.updateStatus("ready"), n._parseMarkup(c, {}, b), c
            }
        }
    });
    var H = "ajax",
        I, J = function() {
            I && a(document.body).removeClass(I)
        },
        K = function() {
            J(), n.req && n.req.abort()
        };
    a.magnificPopup.registerModule(H, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                n.types.push(H), I = n.st.ajax.cursor, w(b + "." + H, K), w("BeforeChange." + H, K)
            },
            getAjax: function(b) {
                I && a(document.body).addClass(I), n.updateStatus("loading");
                var c = a.extend({
                    url: b.src,
                    success: function(c, d, e) {
                        var f = {
                            data: c,
                            xhr: e
                        };
                        y("ParseAjax", f), n.appendContent(a(f.data), H), b.finished = !0, J(), n._setFocus(), setTimeout(function() {
                            n.wrap.addClass(k)
                        }, 16), n.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        J(), b.finished = b.loadError = !0, n.updateStatus("error", n.st.ajax.tError.replace("%url%", b.src))
                    }
                }, n.st.ajax.settings);
                return n.req = a.ajax(c), ""
            }
        }
    });
    var L, M = function(b) {
        if (b.data && b.data.title !== undefined) return b.data.title;
        var c = n.st.image.titleSrc;
        if (c) {
            if (a.isFunction(c)) return c.call(n, b);
            if (b.el) return b.el.attr(c) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var c = n.st.image,
                    d = ".image";
                n.types.push("image"), w(g + d, function() {
                    n.currItem.type === "image" && c.cursor && a(document.body).addClass(c.cursor)
                }), w(b + d, function() {
                    c.cursor && a(document.body).removeClass(c.cursor), r.off("resize" + j)
                }), w("Resize" + d, n.resizeImage), n.isLowIE && w("AfterChange", n.resizeImage)
            },
            resizeImage: function() {
                var a = n.currItem;
                if (!a || !a.img) return;
                if (n.st.image.verticalFit) {
                    var b = 0;
                    n.isLowIE && (b = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", n.wH - b)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (n.content && n.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var b = 0,
                    c = a.img[0],
                    d = function(e) {
                        L && clearInterval(L), L = setInterval(function() {
                            if (c.naturalWidth > 0) {
                                n._onImageHasSize(a);
                                return
                            }
                            b > 200 && clearInterval(L), b++, b === 3 ? d(10) : b === 40 ? d(50) : b === 100 && d(500)
                        }, e)
                    };
                d(1)
            },
            getImage: function(b, c) {
                var d = 0,
                    e = function() {
                        b && (b.img[0].complete ? (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("ready")), b.hasSize = !0, b.loaded = !0, y("ImageLoadComplete")) : (d++, d < 200 ? setTimeout(e, 100) : f()))
                    },
                    f = function() {
                        b && (b.img.off(".mfploader"), b === n.currItem && (n._onImageHasSize(b), n.updateStatus("error", g.tError.replace("%url%", b.src))), b.hasSize = !0, b.loaded = !0, b.loadError = !0)
                    },
                    g = n.st.image,
                    h = c.find(".mfp-img");
                if (h.length) {
                    var i = document.createElement("img");
                    i.className = "mfp-img", b.el && b.el.find("img").length && (i.alt = b.el.find("img").attr("alt")), b.img = a(i).on("load.mfploader", e).on("error.mfploader", f), i.src = b.src, h.is("img") && (b.img = b.img.clone()), i = b.img[0], i.naturalWidth > 0 ? b.hasSize = !0 : i.width || (b.hasSize = !1)
                }
                return n._parseMarkup(c, {
                    title: M(b),
                    img_replaceWith: b.img
                }, b), n.resizeImage(), b.hasSize ? (L && clearInterval(L), b.loadError ? (c.addClass("mfp-loading"), n.updateStatus("error", g.tError.replace("%url%", b.src))) : (c.removeClass("mfp-loading"), n.updateStatus("ready")), c) : (n.updateStatus("loading"), b.loading = !0, b.hasSize || (b.imgHidden = !0, c.addClass("mfp-loading"), n.findImageSize(b)), c)
            }
        }
    });
    var N, O = function() {
        return N === undefined && (N = document.createElement("p").style.MozTransform !== undefined), N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a = n.st.zoom,
                    d = ".zoom",
                    e;
                if (!a.enabled || !n.supportsTransition) return;
                var f = a.duration,
                    g = function(b) {
                        var c = b.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image"),
                            d = "all " + a.duration / 1e3 + "s " + a.easing,
                            e = {
                                position: "fixed",
                                zIndex: 9999,
                                left: 0,
                                top: 0,
                                "-webkit-backface-visibility": "hidden"
                            },
                            f = "transition";
                        return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d, c.css(e), c
                    },
                    h = function() {
                        n.content.css("visibility", "visible")
                    },
                    i, j;
                w("BuildControls" + d, function() {
                    if (n._allowZoom()) {
                        clearTimeout(i), n.content.css("visibility", "hidden"), e = n._getItemToZoom();
                        if (!e) {
                            h();
                            return
                        }
                        j = g(e), j.css(n._getOffset()), n.wrap.append(j), i = setTimeout(function() {
                            j.css(n._getOffset(!0)), i = setTimeout(function() {
                                h(), setTimeout(function() {
                                    j.remove(), e = j = null, y("ZoomAnimationEnded")
                                }, 16)
                            }, f)
                        }, 16)
                    }
                }), w(c + d, function() {
                    if (n._allowZoom()) {
                        clearTimeout(i), n.st.removalDelay = f;
                        if (!e) {
                            e = n._getItemToZoom();
                            if (!e) return;
                            j = g(e)
                        }
                        j.css(n._getOffset(!0)), n.wrap.append(j), n.content.css("visibility", "hidden"), setTimeout(function() {
                            j.css(n._getOffset())
                        }, 16)
                    }
                }), w(b + d, function() {
                    n._allowZoom() && (h(), j && j.remove(), e = null)
                })
            },
            _allowZoom: function() {
                return n.currItem.type === "image"
            },
            _getItemToZoom: function() {
                return n.currItem.hasSize ? n.currItem.img : !1
            },
            _getOffset: function(b) {
                var c;
                b ? c = n.currItem.img : c = n.st.zoom.opener(n.currItem.el || n.currItem);
                var d = c.offset(),
                    e = parseInt(c.css("padding-top"), 10),
                    f = parseInt(c.css("padding-bottom"), 10);
                d.top -= a(window).scrollTop() - e;
                var g = {
                    width: c.width(),
                    height: (p ? c.innerHeight() : c[0].offsetHeight) - f - e
                };
                return O() ? g["-moz-transform"] = g.transform = "translate(" + d.left + "px," + d.top + "px)" : (g.left = d.left, g.top = d.top), g
            }
        }
    });
    var P = "iframe",
        Q = "//about:blank",
        R = function(a) {
            if (n.currTemplate[P]) {
                var b = n.currTemplate[P].find("iframe");
                b.length && (a || (b[0].src = Q), n.isIE8 && b.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                n.types.push(P), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === P ? R() : c === P && R(!0))
                }), w(b + "." + P, function() {
                    R()
                })
            },
            getIframe: function(b, c) {
                var d = b.src,
                    e = n.st.iframe;
                a.each(e.patterns, function() {
                    if (d.indexOf(this.index) > -1) return this.id && (typeof this.id == "string" ? d = d.substr(d.lastIndexOf(this.id) + this.id.length, d.length) : d = this.id.call(this, d)), d = this.src.replace("%id%", d), !1
                });
                var f = {};
                return e.srcAction && (f[e.srcAction] = d), n._parseMarkup(c, f, b), n.updateStatus("ready"), c
            }
        }
    });
    var S = function(a) {
            var b = n.items.length;
            return a > b - 1 ? a - b : a < 0 ? b + a : a
        },
        T = function(a, b, c) {
            return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = n.st.gallery,
                    d = ".mfp-gallery",
                    e = Boolean(a.fn.mfpFastClick);
                n.direction = !0;
                if (!c || !c.enabled) return !1;
                u += " mfp-gallery", w(g + d, function() {
                    c.navigateByImgClick && n.wrap.on("click" + d, ".mfp-img", function() {
                        if (n.items.length > 1) return n.next(), !1
                    }), s.on("keydown" + d, function(a) {
                        a.keyCode === 37 ? n.prev() : a.keyCode === 39 && n.next()
                    })
                }), w("UpdateStatus" + d, function(a, b) {
                    b.text && (b.text = T(b.text, n.currItem.index, n.items.length))
                }), w(f + d, function(a, b, d, e) {
                    var f = n.items.length;
                    d.counter = f > 1 ? T(c.tCounter, e.index, f) : ""
                }), w("BuildControls" + d, function() {
                    if (n.items.length > 1 && c.arrows && !n.arrowLeft) {
                        var b = c.arrowMarkup,
                            d = n.arrowLeft = a(b.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(m),
                            f = n.arrowRight = a(b.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(m),
                            g = e ? "mfpFastClick" : "click";
                        d[g](function() {
                            n.prev()
                        }), f[g](function() {
                            n.next()
                        }), n.isIE7 && (x("b", d[0], !1, !0), x("a", d[0], !1, !0), x("b", f[0], !1, !0), x("a", f[0], !1, !0)), n.container.append(d.add(f))
                    }
                }), w(h + d, function() {
                    n._preloadTimeout && clearTimeout(n._preloadTimeout), n._preloadTimeout = setTimeout(function() {
                        n.preloadNearbyImages(), n._preloadTimeout = null
                    }, 16)
                }), w(b + d, function() {
                    s.off(d), n.wrap.off("click" + d), n.arrowLeft && e && n.arrowLeft.add(n.arrowRight).destroyMfpFastClick(), n.arrowRight = n.arrowLeft = null
                })
            },
            next: function() {
                n.direction = !0, n.index = S(n.index + 1), n.updateItemHTML()
            },
            prev: function() {
                n.direction = !1, n.index = S(n.index - 1), n.updateItemHTML()
            },
            goTo: function(a) {
                n.direction = a >= n.index, n.index = a, n.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a = n.st.gallery.preload,
                    b = Math.min(a[0], n.items.length),
                    c = Math.min(a[1], n.items.length),
                    d;
                for (d = 1; d <= (n.direction ? c : b); d++) n._preloadItem(n.index + d);
                for (d = 1; d <= (n.direction ? b : c); d++) n._preloadItem(n.index - d)
            },
            _preloadItem: function(b) {
                b = S(b);
                if (n.items[b].preloaded) return;
                var c = n.items[b];
                c.parsed || (c = n.parseEl(b)), y("LazyLoad", c), c.type === "image" && (c.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                    c.hasSize = !0
                }).on("error.mfploader", function() {
                    c.hasSize = !0, c.loadError = !0, y("LazyLoadError", c)
                }).attr("src", c.src)), c.preloaded = !0
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
            options: {
                replaceSrc: function(a) {
                    return a.src.replace(/\.\w+$/, function(a) {
                        return "@2x" + a
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var a = n.st.retina,
                            b = a.ratio;
                        b = isNaN(b) ? b() : b, b > 1 && (w("ImageHasSize." + U, function(a, c) {
                            c.img.css({
                                "max-width": c.img[0].naturalWidth / b,
                                width: "100%"
                            })
                        }), w("ElementParse." + U, function(c, d) {
                            d.src = a.replaceSrc(d, b)
                        }))
                    }
                }
            }
        }),
        function() {
            var b = 1e3,
                c = "ontouchstart" in window,
                d = function() {
                    r.off("touchmove" + f + " touchend" + f)
                },
                e = "mfpFastClick",
                f = "." + e;
            a.fn.mfpFastClick = function(e) {
                return a(this).each(function() {
                    var g = a(this),
                        h;
                    if (c) {
                        var i, j, k, l, m, n;
                        g.on("touchstart" + f, function(a) {
                            l = !1, n = 1, m = a.originalEvent ? a.originalEvent.touches[0] : a.touches[0], j = m.clientX, k = m.clientY, r.on("touchmove" + f, function(a) {
                                m = a.originalEvent ? a.originalEvent.touches : a.touches, n = m.length, m = m[0];
                                if (Math.abs(m.clientX - j) > 10 || Math.abs(m.clientY - k) > 10) l = !0, d()
                            }).on("touchend" + f, function(a) {
                                d();
                                if (l || n > 1) return;
                                h = !0, a.preventDefault(), clearTimeout(i), i = setTimeout(function() {
                                    h = !1
                                }, b), e()
                            })
                        })
                    }
                    g.on("click" + f, function() {
                        h || e()
                    })
                })
            }, a.fn.destroyMfpFastClick = function() {
                a(this).off("touchstart" + f + " click" + f), c && r.off("touchmove" + f + " touchend" + f)
            }
        }(), A()
})



$.fn.ajaxForms = function(params) {
    //defaults 
    var options = {
        loader: true
    };
    //overwrite options
    $.extend(options, params);

    var $loaderImg = $('<div><style>@keyframes rotate {from {transform: rotate(0deg);}to {transform: rotate(360deg);}}</style><svg style="animation: rotate 1.5s linear infinite;position: absolute;left:50%;top:50%;margin-left:-40px;margin-top:-40px;" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="80px" height="80px" viewBox="0 0 516.727 516.727" style="enable-background:new 0 0 516.727 516.727;" xml:space="preserve"><g><path d="M516.727,266.696c-0.665-34.825-8.221-69.54-22.175-101.283c-13.908-31.771-34.094-60.551-58.876-84.333 c-24.767-23.8-54.139-42.615-85.929-55.027c-31.773-12.46-65.937-18.412-99.687-17.69c-33.755,0.668-67.36,8.007-98.091,21.539c-30.754,13.488-58.615,33.058-81.632,57.071c-23.033,24.001-41.229,52.452-53.222,83.229C5.077,200.962-0.66,234.013,0.06,266.696c0.67,32.688,7.793,65.182,20.903,94.899c13.067,29.738,32.019,56.681,55.266,78.931c23.234,22.268,50.766,39.846,80.528,51.417c29.749,11.616,61.69,17.136,93.303,16.419c31.62-0.671,63.001-7.58,91.707-20.268c28.724-12.646,54.747-30.979,76.231-53.461c21.503-22.469,38.461-49.08,49.611-77.827c6.79-17.427,11.396-35.624,13.824-54.062c0.649,0.037,1.302,0.063,1.96,0.063c18.409,0,33.333-14.923,33.333-33.333c0-0.936-0.049-1.861-0.124-2.777L516.727,266.696L516.727,266.696z M463.762,355.21c-12.226,27.71-29.94,52.812-51.655,73.532c-21.703,20.732-47.396,37.076-75.127,47.807c-27.724,10.77-57.443,15.859-86.919,15.146c-29.481-0.677-58.644-7.154-85.323-18.997c-26.692-11.806-50.877-28.901-70.83-49.849c-19.968-20.938-35.691-45.711-46.001-72.427c-10.349-26.712-15.223-55.321-14.512-83.728c0.678-28.413,6.941-56.465,18.361-82.131c11.384-25.677,27.863-48.943,48.045-68.13c20.172-19.202,44.026-34.307,69.726-44.195c25.697-9.928,53.195-14.587,80.534-13.877c27.343,0.68,54.286,6.728,78.939,17.726c24.662,10.963,47.008,26.824,65.429,46.241c18.436,19.405,32.922,42.341,42.391,67.025c9.504,24.684,13.948,51.072,13.241,77.342h0.125c-0.076,0.916-0.125,1.841-0.125,2.777c0,17.193,13.018,31.34,29.732,33.137C476.551,320.747,471.184,338.453,463.762,355.21z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>');

    var initForm = function(form) {
        var $form = $(form),
            $formParent = $form.parent(),
            parentSelector = '',
            formData = new FormData(),
            fieldsDone = [],
            mobileIti;


        if ($form.find('input.mobile-tel').length > 0) {
            $form.find('input.mobile-tel').val("")
            $.ajax({
                url: 'https://www.griffith.edu.au/__data/assets/js_file/0011/1001306/intlTelInput.min.js',
                dataType: 'script',
                async: true
            }).done(function() {
                mobileIti = window.intlTelInput($form.find('input.mobile-tel')[0], {
                    initialCountry: "AU",
                    geoIpLookup: function(callback) {
                        callback($("meta[name='country_code']").attr("content"));
                    },
                    utilsScript: "https://www.griffith.edu.au/__data/assets/js_file/0026/678212/utils.js",
                    preferredCountries: ["AU"],
                    separateDialCode: true,
                    autoPlaceholder: "aggressive",
                    customContainer: "gu12"
                });
                $form.find('input.mobile-tel')[0].iti = mobileIti;
            });

        }

        $form.off("submit"); // unhandle this form submit
        $form.submit(function(e) {
            e.preventDefault();
            //console.log('submitting');

            //buildParentSelector
            var parentId = $formParent.attr('id');
            var parentClasses = $formParent.attr('class').trim();
            //console.log(parentClasses);
            parentSelector = (parentId ? '#' + parentId : '') + (parentClasses ? '.' + parentClasses.replace(/\s/g, '.').replace(/.open/g, '') : '');

            if (!parentSelector) {
                console.log('Error: Parent of the form needs a class or ID.')
                return null;
            }



            $form.find('input,textarea,select').each(function() {
                var $input = $(this),
                    inputName = $input.attr('name');

                //check not already added
                if (fieldsDone.indexOf(inputName) == -1) {

                    if ($input.attr('type') === 'file' && $input.prop('files').length) {

                        var image = $input.prop('files')[0];
                        formData.append(inputName, image);
                        console.log('FILE ', inputName, image);

                    } else if ($input.attr('type') === 'radio') { // You have to manually add each Checkbox for a Radio field - https://jira.squiz.net/browse/SDQLD-569

                        var $selected = $('body').find('input[name="' + inputName + '"]:checked');
                        if ($selected.length) {
                            formData.append(inputName, $selected.val());
                            //console.log('RADIO', inputName, $selected.val());
                        }
                    } else if ($input.attr('type') === 'checkbox') { // You have to manually add each Checkbox for a Tickboxlist and Tickboxtable field - https://jira.squiz.net/browse/SDQLD-569

                        var $selected = $('body').find('input[name="' + inputName + '"]:checked'),
                            iTableItems = $input.parent('.sq-backend-table-cell').length;
                        if (iTableItems && $input.prop('checked')) {

                            formData.append(inputName, $(this).val());

                        } else if (!iTableItems && $selected.length) {
                            $selected.each(function(index) {
                                // workshops.push();
                                formData.append(inputName, $(this).val());
                            });
                            // console.log('Checkbox', inputName, workshops);
                        }
                    } else if ($input.is("select")) { // NJ - Manually send all select values of a multi select question or just send the single value if a single select field. 
                        if (Array.isArray($input.val())) {
                            $.each($input.val(), function(index, value) {
                                formData.append(inputName, value);
                            });
                        } else {
                            formData.append(inputName, $input.val());
                        }
                    } else {

                        formData.append(inputName, $input.val());
                        // console.log('ERR THING ELSE ', inputName, $input.val());

                    }

                    fieldsDone.push(inputName);

                }
            });


            $formParent.css({
                'position': 'relative'
            }); //for loader
            $loaderImg.hide().appendTo($formParent).fadeIn();
            $formParent.animate({
                opacity: 0.5
            }, function() {
                //console.log(formData);
                if ($form.find('input.mobile-tel').length > 0) {
                    formData.set($form.find('input.mobile-tel').attr("name"), getFormattedNumber($form.find('input.mobile-tel')));
                }
                $.ajax({
                    url: $form.attr('action') + '?SQ_ASSET_CONTENTS_RAW',
                    //url: $form.attr('action'),
                    method: $form.attr('method'),
                    data: formData,
                    processData: false,
                    contentType: false
                }).fail(function(jqxhr, textStatus, error) {
                    console.log('Trouble getting events');
                    console.log(jqxhr);
                    console.log(textStatus);
                    console.log(error);
                }).done(function(html) {
                    var resultHtml = $('<div>' + html + '</div>').find(parentSelector).html();
                    var resultHtml = html;
                    //console.log(resultHtml);

                    var h1 = $("h1")[0];
                    if (h1) {
                        var element_position = $(h1).offset().top;
                        var scroll_position = $(window).scrollTop();
                        var viewport_height = $(window).height();

                        if ((scroll_position + viewport_height) > element_position) {
                            //console.log("h1 is off screen");
                            $('html, body').animate({
                                scrollTop: $form.offset().top - 120
                            }, 500);
                        }
                    }
                    $loaderImg.fadeOut(function() {
                        $loaderImg.remove();
                    });
                    $formParent.fadeOut(function() {
                        $formParent.css({
                            'opacity': 1
                        });
                        $formParent.html(resultHtml);
                        $formParent.fadeIn();
                        $formParent.find('form').each(function() {
                            initForm(this);
                        });
                    });
                });
            })

        });

    };


    // iterate through inputs
    this.each(function() {
        initForm(this);
    });

    function getFormattedNumber(mobileField) {
        //Get selected dial code
        var extension = mobileField[0].iti.getSelectedCountryData().dialCode;
        //Format how salesforce expects
        var num = mobileField[0].iti.getNumber().replace(/\D/g, '').replace(extension, extension + "||");
        return num;
    }

}


// Template init Ajax forms
$('.fn-ajaxForm form').each(function(e) {
    $(this).ajaxForms();

    console.log('binding' + e.target);
});


//Custom form ajax init
$('form.ajax-form').each(function(e) {
    $(this).ajaxForms();
    //console.log("init ajax forms")
});
$(document).ready(function() {
    var vos = $('.vos');
    var vol = $('.vos.vol');

    var scrollPos = $(document).scrollTop();
    setTimeout(function() {

        if (vol.length > 0) {
            vol.scrollPos = vol.offset().top;
            vol.height = vol.outerHeight();
            checkVolScrollPosition();
        } else if (vos.length > 0) {
            checkVosScrollPosition();
        }
    }, 1000);



    $(window).scroll(function() {
        if (vol.length > 0) {
            checkVolScrollPosition();
        } else if (vos.length > 0) {
            checkVosScrollPosition();
        }
    });


    $('.vos a.close').click(function(e) {
        vos.canceled = true;
        vos.removeClass('visible');
    });

    $('.vos.vol a.close').click(function(e) {
        vol.canceled = true;
        vol.removeClass('visible');
        removeAddedHeight();
    });

    function checkVolScrollPosition() {
        scrollPos = $(document).scrollTop();
        if (scrollPos >= vol.scrollPos && !vol.hasClass('visible') && !vol.canceled) {
            vol.addClass('visible');
            replaceLostHeight();
        } else if (scrollPos < vol.scrollPos && vol.hasClass('visible')) {
            vol.removeClass('visible');
            removeAddedHeight();
        }
    }

    function checkVosScrollPosition() {
        scrollPos = $(document).scrollTop();
        if (scrollPos >= 700 && !vos.hasClass('visible') && !vos.canceled) {
            vos.addClass('visible');
        } else if (scrollPos < 700 && vos.hasClass('visible')) {
            vos.removeClass('visible');
        }
    }

    function replaceLostHeight() {
        vol.next().css("margin-top", "+=" + vol.height);

    }

    function removeAddedHeight() {
        vol.next().css("margin-top", "-=" + vol.height);

    }
});
/**
 * Created by s2893941 on 16/11/16.
 * Required Classes:
 *      .filter-list - Container element, This creates a container for the filter options and cards. Best added to the .slab *.
 *      .filter-cards - Filter card container, If .filter-list is not the direct parent for the filtered card elements add this class to the container. If this class has not been added it will default to the .filter-list as the direct parent. (Best use case is when you do not wish to include the filter options inside of your flex card container).
 *	.filter-options - Container for filter elements.
 * Optional Classes:
 *      .no-results - * inside of the filter container that will show when no results are available.
 *      .no-selection - * inside of filter container that will show when no filter selection has been made and data attribute "data-no-filter" is set to "hidden"
 *	.show-more - * if filter load count is added display the show more button
 * Data Attributes:
 *      data-filter-type - Optional, If this is set to "delete" the filter will alternatively remove the hidden elements so .col-xx.a-left/a-right can filter and keep .nth order padding.
 *              Default elements are hidden when filtered.
 *      data-no-filter - Optional, If this is set to "hidden" the filter will hide all cards when not filtered, This will show a .no-selection * if included in the DOM.
 *	data-prefiltered - if "true" will automatically initiate a filter update
 *              Default elements are shown when not filtered.
 *      data-filter-load-count - Max load count of filter results on load. This will be overridden if filter options are changed or user selects a button to show all filter options  ( Expecting a button containing '<div class="a-center flex"><p class="btn a-down show-more"><a href="">Show more</a></p></div>' )- Will not activate if not present.
 * URL filtering:
 *      filter-category - When filtering from url params, if your page contains more than one filter it will apply the url filters to each filter (This will become an issue if to filters have the same filter groups)
 */
$(document).ready(function() {
    guFilterlistInit();
});

function guFilterlistInit() {

    $(".filter-list").each(function() {
        var $filterList = $(this),
            noSelectionFilterState = $($filterList).data("no-filter"),
            filterType = $($filterList).data("filter-type"),
            filterLoadCount = $($filterList).data("filter-load-count"),
            prefiltered = $($filterList).data("prefiltered"),
            $showMoreButton = $($filterList).find(".show-more"),
            $filterCards = $($filterList).find(".filter-cards"),
            stopRefresh;

        if ($filterCards.length <= 0)
            $filterCards = $($filterList);

        if ($filterCards.children().is("tbody")) {
            $filterCards = $($filterCards.children("tbody"));
        }

        var $initialFilterList = $($filterCards).children().not(".filter-options").clone(true),
            $filterCheckboxes = $($filterList).find('.filter-options input[type="checkbox"]'),
            $filterRadio = $($filterList).find('.filter-options input[type="radio"]'),
            $filterSelect = $($filterList).find('.filter-options select[type="select"]');
        //console.log($initialFilterList);
        if (noSelectionFilterState == "hidden") {
            $($filterCards).children().not(".filter-options").addClass("hidden");
            $($filterCards).find('.no-selection').removeClass("hidden");
        } else {
            $($filterCards).find('.no-results').addClass("hidden");
            $($filterCards).find('.no-selection').addClass("hidden");
        }

        // If filterType == delete or prefiltered = true, Run update.
        if (filterType == "delete" || prefiltered == true) {
            updateFilter();
        }

        if (filterLoadCount && $showMoreButton.length > 0) {
            // reload the filter results with a max of filterLoadCount.
            if (filterType == "delete") {

                // Clear filter card container (exc .filter-options)
                $($filterCards).children().not(".filter-options").detach();
                var i = 0;
                $initialFilterList.each(function(index) {
                    if (i < filterLoadCount) {
                        $($filterCards).append(this);
                    } else {
                        return
                    }
                    if (!$(this).hasClass("no-results") && !$(this).hasClass("no-selection")) {
                        i++
                    }
                });
                $($filterCards).find("> *.hidden").detach();
            } else {
                $($filterCards).children().not(".filter-options").not(".head").addClass("hidden");
                $($filterCards).children().not(".no-results").not(".no-selection").slice(0, filterLoadCount).removeClass("hidden");
            }
            if ($showMoreButton.hasClass("hidden")) {
                $showMoreButton.removeClass("hidden");
                $showMoreButton.children("a:after").css("content", "\f078");
            }
        }
        // Events
        $filterCheckboxes.on('change', updateFilter);
        $filterRadio.on('change', updateFilter);
        $filterSelect.on('change', updateFilter);
        $showMoreButton.on('click', function(event) {
            event.preventDefault();
            updateFilter();
            $($filterCards).children()[filterLoadCount - 1].focus()
        });
        /**
         * Get the all URL Prams
         */
        $.urlParam = function(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results == null) {
                return null;
            } else {
                return results[1] || 0;
            }
        }
        /**
         * Decode "filter-category", filters separated by " " (space)
         * Update checkboxes and start filter.
         */
        var filterPerms = decodeURIComponent($.urlParam('filter-category')).split(" ");
        if (filterPerms.length != -1 && filterPerms != "null") {
            for (i = 0; i < filterPerms.length; i++) {
                $($filterList).find("input:checkbox[value='" + filterPerms[i] + "']").prop('checked', true);
                $($filterList).find("input:radio[value='" + filterPerms[i] + "']").prop('checked', true);
                $($filterList).find("option[value='" + filterPerms[i] + "']").prop('selected', true);
                updateFilter();
            }
        }
        /**
         * Update Filters
         */
        function updateFilter() {
            /**
             * If filter type is "delete" remove current filter cards and reattach the initial Copy
             */
            if (filterType == "delete") {
                // Clear filter card container (exc .filter-options)
                $($filterCards).children().not(".filter-options").detach();
                $initialFilterList.each(function(index) {
                    $($filterCards).append(this);
                });
            }

            if (!$showMoreButton.hasClass("hidden"))
                $showMoreButton.addClass("hidden");

            clearTimeout(stopRefresh);

            $filterCards.removeClass("anim-refresh");
            $filterCards.addClass("anim-refresh");

            stopRefresh = setTimeout(function() {
                $filterCards.removeClass("anim-refresh");
            }, 500);



            var selectedFilters = {};
            //Filter all checkboxes
            $filterCheckboxes.filter(':checked').each(function() {
                if (!selectedFilters.hasOwnProperty(this.name)) {
                    selectedFilters[this.name] = [];
                }
                selectedFilters[this.name].push(this.value);
            });
            // Filter all checked radio buttons
            $filterRadio.filter(':checked').each(function() {
                if (!selectedFilters.hasOwnProperty(this.name)) {
                    selectedFilters[this.name] = [];
                }
                selectedFilters[this.name].push(this.value);
            });
            //Filter all select drop downs
            $filterSelect.each(function() {
                if (this.options.length > 0) {
                    var selectName = this.name;
                    $(this).find("option:selected").each(function() {
                        if (this.value != "" && this.value != null && this.value != undefined) {
                            if (!selectedFilters.hasOwnProperty(selectName)) {
                                selectedFilters[selectName] = [];
                            }
                            selectedFilters[selectName].push(this.value);
                        }
                    });
                }
            });

            // create a collection containing all of the filterable elements
            var $filteredResults = $($filterCards).find('> *:not(.no-results):not(.no-selection):not(.filter-options):not(tr.head)');
            // loop over the selected filter name -> (array) values pairs
            $.each(selectedFilters, function(name, filterValues) {
                // filter each element
                $filteredResults = $filteredResults.filter(function() {
                    var matched = false,
                        currentFilterValues = $(this).data('category').split(' ');
                    // loop over each category value in the current data-category
                    $.each(currentFilterValues, function(_, currentFilterValue) {
                        // if the current category exists in the selected filters array
                        // set matched to true, and stop looping. as we're ORing in each
                        // set of filters, we only need to match once
                        if ($.inArray(currentFilterValue, filterValues) != -1) {
                            matched = true;
                            return false;
                        }
                    });
                    // if matched is true the current element is returned
                    return matched;
                });
            });
            /**
             * filter out and hide all the ones we do not need, Detach if filter type == "delete".
             */
            if (Object.keys(selectedFilters).length != 0 && $filteredResults.length > 0) {
                // If filter has been selected and filter results is gt 0
                // Results
                $($filterCards).find("> *:not(.hidden):not(.filter-options):not(tr.head)").addClass("hidden");
                $($filterCards).children().filter($filteredResults).removeClass("hidden");
                if (filterType == "delete") {
                    $($filterCards).find("> *.hidden").detach();
                }
            } else if ($filteredResults.length <= 0) {
                // If filter has been selected and filter results is lt= 0
                // No results
                $($filterCards).find("> *:not(.hidden):not(.filter-options):not(tr.head)").addClass("hidden");
                $($filterCards).find('*.no-results').removeClass("hidden");
                if (filterType == "delete") {
                    $($filterCards).find("> *.hidden").detach();
                }
            } else {
                // If filter has not been selected and filter results is lt 0
                // No selection
                if (noSelectionFilterState == "hidden") {
                    $($filterCards).find("> *:not(.hidden):not(.filter-options):not(tr.head)").addClass("hidden");
                    $($filterCards).find('*.no-selection').removeClass("hidden");
                    if (filterType == "delete") {
                        $($filterCards).find("> *.hidden").detach();
                    }
                } else {
                    $($filterCards).find("> *.hidden").removeClass("hidden");
                    $($filterCards).find('*.no-results').addClass("hidden");
                    $($filterCards).find('*.no-selection').addClass("hidden");
                    if (filterType == "delete") {
                        $($filterCards).find("> *.hidden").detach();
                    }
                }
            }
        }
    });

}

/**
 * Created by s2893941 on 27/4/17.
 * Last updated: 27/4/17 by s2893941.
 *
 * Component: Accordion Button Group
 * Version 1.0
 *
 * Requires: jQuery
 *
 * Usage:
 *
 * <div data-component="Accordion Button Group"> <!-- Required use of data-component declaration -->
 *     <div class="accordion-button"> <!-- Required button container class -->
 *         <p class="btn expand"><a href="">Button Title</a></p> <!-- Required classes "btn expand" -->
 *         <div class="card hidden"><p>Card Contents</p></div> <!-- Required classes "card hidden" -->
 *     </div>
 *     <div class="accordion-button"> <!-- Required button container class -->
 *         <p class="btn expand"><a href="">Button Title</a></p> <!-- Required classes "btn expand" -->
 *         <div class="card hidden"><p>Card Contents</p></div> <!-- Required classes "card hidden" -->
 *     </div>
 * </div>
 *
 */

$(document).ready(function() {

    /**
     * Create new accordion button group
     * @param newButtonGroup
     * @returns {{}}
     * @constructor
     */
    function AccordionBtnGroup(newButtonGroup) {
        var $accordionButtonGroup = $(newButtonGroup),
            $accordionButtonAnchors = $accordionButtonGroup.find(".accordion-button > .btn a");

        var accordionButtonAnchorClick = function(event, $buttonAnchorElement) {
            if (event) {
                event.preventDefault();
            }
            var button = getButtonElements($buttonAnchorElement);
            if (button.$buttonContainer.hasClass("active") && event) {
                // Clicked button is already open, so close it.
                closeButton(button);
            } else {
                // Close all buttons in button group
                closeAllButtons();
                // Clicked button is closed, So open clicked button.
                openButton(button);
            }
        };

        var openButton = function(button) {
            // add active class to accordion button container
            button.$buttonContainer.addClass("active");
            // change btn class from "expand" to "contract"
            button.$buttonElement.removeClass("expand").addClass("contract");
            // remove the card class "hidden"
            button.$buttonCard.removeClass("hidden");

        };
        var closeButton = function(button) {
            // remove active class from expanding button container
            button.$buttonContainer.removeClass("active");
            // change btn class from "contract" to "expand"
            button.$buttonElement.addClass("expand").removeClass("contract");
            // Add the card class "hidden"
            button.$buttonCard.addClass("hidden");
        };
        var closeAllButtons = function() {
            $accordionButtonGroup.find(".accordion-button").each(function() {
                var button = getButtonElements($(this));
                closeButton(button);
            });
        };

        var getButtonElements = function($button) {
            var button = {};
            button.$buttonContainer = (($button.hasClass("accordion-button")) ? $button : $button.closest(".accordion-button"));
            button.$buttonElement = button.$buttonContainer.find("> .btn");
            button.$buttonCard = button.$buttonContainer.find("> .card");
            return button;
        };

        /* Events */
        $accordionButtonAnchors.on("click", function(e) {
            accordionButtonAnchorClick(e, $(this));
        });

        //Register additional functionality to each accordion

        //Open corresponding accordion when it matches our anchor
        $accordionButtonAnchors.each(function() {
            if ("#" + $(this).data("id") == window.location.hash) {
                var accordion = $(this);
                gu.fn.smoothieToTarget(accordion, true, 120, function() {
                    accordionButtonAnchorClick(undefined, accordion);
                });
                return false;
            }
        });

        /*Custom smoothie for accordion buttons */
        $('.smoothie-accordion').off('click').on('click', function() {
            if (this.hash) {
                var accordion = $(".accordion-button a[data-id=" + this.hash.replace("#", "") + "]");
                gu.fn.smoothieToTarget(accordion, false, 120, function() {
                    accordionButtonAnchorClick(undefined, accordion);
                });
            }
            return true;
        });

        return {};
    }

    var accordionBtnGroupArray = [];

    /**
     * Init Component for each group instance
     */
    $("div[data-component='Accordion Button Group']").each(function(index) {
        accordionBtnGroupArray.push(new AccordionBtnGroup(this));
    });
});

/**
 * Created by s2893941 on 6/3/17.
 * 
 * Required Classes:
 *  .show-hide-module - Filter container element, this is where you specify all filter input options
 * 
 * Data Params:
 *  data-show-hide-container-group (Required) - Added to the show-hide-module element, lets you specify the class for the element that contains all filter options: 
 *      EXAMPLE: event-elements (When in use class="hidden-elements")
 *  data-show-hide-element-attribute (Optional) - Added to the show-hide-module element, lets you specify the class for each element that gets shown or hidden (within the container group)
 *      DEFAULT: show-hide-element (when in use: data-show-hide-element="")
 *      EXAMPLE: event (when in use: data-event="")
 *  data-no-result-hide-all (Optional) - Added to the show-hide-module element, if "true" the elements not matched will be temprarly removed from the DOM
 *      DEFAULT: null/False
 *      Example: True
 *  data-filter-separator (optional) - When added it alters what separator is used to filter the output. 
 *      DEFAULT: " " (Space)
 *      Example: "," (Comma)
 * 	
 *  Important note: You must include an inline style for displaying none when the hidden class is applied. (  <style>.hidden { display: none };</style>  )
 *	
 *  Example categories :
 *  	<ul class="show-hide-module" data-show-hide-container-group="event-dates">
 *		<li><input type="radio" name="studyarea" id="ael-field" value="arts-events"> <label for="ael-field">Arts, Education, Law or Business</label></li>
 *		<li><input type="radio" name="studyarea" id="hs-field" value="health-events"> <label for="hs-field">Health and Science</label></li>
 *	</ul>
 *
 *	<ul class="event-dates col-2 flex">
 *		<li data-show-hide-element="arts-events" class=""><input type="checkbox" name="Events" value="11/04/2017" id="Event_0"> <label for="Event_0">Tuesday, 11 April*</label></li>
 *		<li data-show-hide-element="health-events" class=""><input type="checkbox" name="Events" value="27/09/2017" id="Event_4"> <label for="Event_4">Wednesday, 27 July</label></li>
 *	</ul>
 *
 *
 *	<div class="show-hide-module" data-show-hide-container-group="event-elements" data-show-hide-element-attribute="event" data-no-result-hide-all="true">
 *		<input type="checkbox" name="group1" id="field1" value="selector1"> <label for="field1">Checkbox 1</label>
 *		<input type="checkbox" name="group1" id="field2" value="selector2"> <label for="field2">Checkbox 2</label>
 *		<input type="checkbox" name="group1" id="field3" value="selector3"> <label for="field3">Checkbox 3</label>
 *		<input type="checkbox" name="group1" id="field4" value="selector4"> <label for="field4">Checkbox 4</label>
 *		<input type="checkbox" name="group1" id="field5" value="selector5"> <label for="field5">Checkbox 4, 3 and 2</label>
 *	</div>
 *
 *	<div class="event-elements">
 *		<div data-event="selector1" class="">Hidden box 1</div>
 *		<div data-event="selector2 selector5" class="">Hidden box 2</div>
 *		<div data-event="selector3 selector5" class="">Hidden box 3</div>
 *		<div data-event="selector4 selector5" class="">hidden box 4</div>
 *	</div>
 *
 *
 *
 */
$(document).ready(function() {

    $(".show-hide-module").each(function() {
        //console.log("test")
        var $filterList = $(this),
            filterElementsContainerGroup = $($filterList).data("show-hide-container-group"),
            $filterElements = $("." + filterElementsContainerGroup),
            filterItemContainerDataClass = $($filterList).data("show-hide-element-attribute") || "show-hide-element",
            filterNoResultsHideAll = $($filterList).data("no-result-hide-all"),
            filterSeparator = $($filterList).data("filter-separator") || " ";

        var $form = $filterList.closest("form");
        var clientsideValidation = $form.find("input[type='submit']").attr("data-client-validation");

        if ($filterElements.length <= 0)
            console.log("Filter elements not found");


        var $filterCheckboxes = $($filterList).find('input[type="checkbox"]'),
            $filterRadio = $($filterList).find('input[type="radio"]'),
            $filterSelect = $($filterList).find('select');

        // Events
        $filterCheckboxes.on('change', updateFilter);
        $filterRadio.on('change', updateFilter);
        $filterSelect.on('change', updateFilter);


        updateFilter()
        /**
         * Update Filters
         */
        function updateFilter() {

            var selectedFilters = {};
            //Filter all checkboxes
            $filterCheckboxes.filter(':checked').each(function() {
                if (!selectedFilters.hasOwnProperty(this.name)) {
                    selectedFilters[this.name] = [];
                }
                selectedFilters[this.name].push(this.value);
            });
            // Filter all checked radio buttons
            $filterRadio.filter(':checked').each(function() {
                if (!selectedFilters.hasOwnProperty(this.name)) {
                    selectedFilters[this.name] = [];
                }
                selectedFilters[this.name].push(this.value);
            });
            //Filter all select drop downs
            $filterSelect.each(function() {
                if (this.selectedOptions.length > 0) {
                    var selectName = this.name;
                    $(this.selectedOptions).each(function() {
                        // if (this.value != "" && this.value != null && this.value != undefined){
                        if (!selectedFilters.hasOwnProperty(selectName)) {
                            selectedFilters[selectName] = [];
                        }
                        //}
                    });

                    $(this.selectedOptions).each(function() {
                        if (this.value != "") {
                            selectedFilters[selectName].push(this.value);
                        } else {
                            selectedFilters[selectName].push("NSP");

                        }
                        console.log(selectedFilters);
                    })
                }
            });

            // create a collection containing all of the filterable elements
            var $filteredResults = $($filterElements).children("[data-" + filterItemContainerDataClass + "]");

            // loop over the selected filter name -> (array) values pairs
            $.each(selectedFilters, function(name, filterValues) {
                // filter each element
                $filteredResults = $filteredResults.filter(function() {
                    var matched = false,
                        currentFilterValues = $(this).data(filterItemContainerDataClass).toString().split(filterSeparator);
                    // Simple check to make sure no numbers are passed to object iterator 
                    if (typeof currentFilterValues == "number") {
                        currentFilterValues = currentFilterValues.toString();
                    }

                    // loop over each category value in the current data-category, Expects array if items 
                    $.each(currentFilterValues, function(_, currentFilterValue) {
                        // if the current category exists in the selected filters array
                        // set matched to true, and stop looping. as we're ORing in each
                        // set of filters, we only need to match once
                        if ($.inArray(currentFilterValue, filterValues) != -1) {
                            matched = true;
                            return false;
                        }
                    });
                    // if matched is true the current element is returned
                    return matched;
                });
            });
            /**
             * filter out and hide all the ones we do not need, Detach if filter type == "delete".
             */


            if (Object.keys(selectedFilters).length != 0 && $filteredResults.length > 0) {
                // If filter has been selected and filter results is gt 0
                // Results
                $($filterElements).children("[data-" + filterItemContainerDataClass + "]").addClass("hidden").find("input[type='url']").attr("disabled", true);
                $($filterElements).children("[data-" + filterItemContainerDataClass + "]").filter($filteredResults).removeClass("hidden").find("input[type='url']").attr("disabled", false);

                if (clientsideValidation == "true") {
                    $form.find("label span.required").each(function() {
                        console.log($(this).parent().attr("for"));

                        if (!$form.find("#" + $(this).parent().attr("for")).parents('.hidden').length) {
                            $form.find("#" + $(this).parent().attr("for")).attr("required", true);
                        } else {
                            $form.find("#" + $(this).parent().attr("for")).attr("required", false);
                        }
                    });

                    //.attr("disabled", true);
                    //$($filterElements).children("[data-" + filterItemContainerDataClass + "]").filter($filteredResults).find("input[type='url']").attr("disabled", false);

                }

                // unselect and uncheck any child form elements
                $($filterElements).find("> *.hidden input:text").val("");
                $($filterElements).find("> *.hidden input:checkbox").attr("checked", false);
                $($filterElements).find("> *.hidden input:radio").attr("checked", false);
                $($filterElements).find("> *.hidden select").attr("selected", false);
                $($filterElements).find("> *.hidden select option").attr("selected", false);

                //reset all direct children
                $($filterElements).find("input:text.hidden").val("");
                $($filterElements).find("input:checkbox.hidden").attr("checked", false);
                $($filterElements).find("input:radio.hidden").attr("checked", false);
                $($filterElements).find("select.hidden").attr("selected", false);
                $($filterElements).find("select.hidden option").attr("selected", false);

            } else if ($filteredResults.length <= 0) {
                // If filter has been selected and filter results is lt= 0
                // No results - Show all fields
                if (filterNoResultsHideAll == true) {
                    $($filterElements).find("> *").addClass("hidden");
                } else {
                    $($filterElements).find("> *.hidden").removeClass("hidden");
                }


            } else {
                // If filter has not been selected and filter results is lt 0
                // No selection
                $($filterElements).children("[data-" + filterItemContainerDataClass + "]").addClass("hidden");
                if (clientsideValidation == "true") {
                    $form.find("label span.required").each(function() {
                        console.log($(this).parent().attr("for"));

                        if (!$form.find("#" + $(this).parent().attr("for")).parents('.hidden').length) {
                            $form.find("#" + $(this).parent().attr("for")).attr("required", true);
                        } else {
                            $form.find("#" + $(this).parent().attr("for")).attr("required", false);
                        }
                    });

                    //.attr("disabled", true);
                    //$($filterElements).children("[data-" + filterItemContainerDataClass + "]").filter($filteredResults).find("input[type='url']").attr("disabled", false);

                }

                // unselect and uncheck any child form elements
                $($filterElements).find("> *.hidden input:text").val("");
                $($filterElements).find("> *.hidden input:checkbox").attr("checked", false);
                $($filterElements).find("> *.hidden input:radio").attr("checked", false);
                $($filterElements).find("> *.hidden select").attr("selected", false);

                //reset all direct children
                $($filterElements).find("input:text.hidden").val("");
                $($filterElements).find("input:checkbox.hidden").attr("checked", false);
                $($filterElements).find("input:radio.hidden").attr("checked", false);
                $($filterElements).find("select.hidden").attr("selected", false);
            }
        }
    });
});


/*! choices.js v3.0.2 | (c) 2017 Josh Johnson | https://github.com/jshjohnson/Choices#readme */
! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.Choices = t() : e.Choices = t()
}(this, function() {
    return function(e) {
        function t(n) {
            if (i[n]) return i[n].exports;
            var s = i[n] = {
                exports: {},
                id: n,
                loaded: !1
            };
            return e[n].call(s.exports, s, s.exports, t), s.loaded = !0, s.exports
        }
        var i = {};
        return t.m = e, t.c = i, t.p = "/assets/scripts/dist/", t(0)
    }([function(e, t, i) {
        e.exports = i(1)
    }, function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function s(e, t, i) {
            return t in e ? Object.defineProperty(e, t, {
                value: i,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : e[t] = i, e
        }

        function r(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }

        function o(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        var a = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            c = i(2),
            l = n(c),
            h = i(3),
            u = n(h),
            d = i(4),
            f = n(d),
            p = i(30),
            v = i(31);
        i(32);
        var m = function() {
            function e() {
                var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "[data-choice]",
                    i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                if (o(this, e), (0, v.isType)("String", t)) {
                    var n = document.querySelectorAll(t);
                    if (n.length > 1)
                        for (var s = 1; s < n.length; s += 1) {
                            var r = n[s];
                            new e(r, i)
                        }
                }
                var a = {
                    silent: !1,
                    items: [],
                    choices: [],
                    renderChoiceLimit: -1,
                    maxItemCount: -1,
                    addItems: !0,
                    removeItems: !0,
                    removeItemButton: !1,
                    editItems: !1,
                    duplicateItems: !0,
                    delimiter: ",",
                    paste: !0,
                    searchEnabled: !0,
                    searchChoices: !0,
                    searchFloor: 1,
                    searchResultLimit: 4,
                    searchFields: ["label", "value"],
                    position: "auto",
                    resetScrollPosition: !0,
                    regexFilter: null,
                    shouldSort: !0,
                    shouldSortItems: !1,
                    sortFilter: v.sortByAlpha,
                    placeholder: !0,
                    placeholderValue: null,
                    searchPlaceholderValue: null,
                    prependValue: null,
                    appendValue: null,
                    renderSelectedChoices: "auto",
                    loadingText: "Loading...",
                    noResultsText: "No results found",
                    noChoicesText: "No choices to choose from",
                    itemSelectText: "Press to select",
                    addItemText: function(e) {
                        return 'Press Enter to add <b>"' + e + '"</b>'
                    },
                    maxItemText: function(e) {
                        return "Only " + e + " values can be added."
                    },
                    uniqueItemText: "Only unique values can be added.",
                    classNames: {
                        containerOuter: "choices",
                        containerInner: "choices__inner",
                        input: "choices__input",
                        inputCloned: "choices__input--cloned",
                        list: "choices__list",
                        listItems: "choices__list--multiple",
                        listSingle: "choices__list--single",
                        listDropdown: "choices__list--dropdown",
                        item: "choices__item",
                        itemSelectable: "choices__item--selectable",
                        itemDisabled: "choices__item--disabled",
                        itemChoice: "choices__item--choice",
                        placeholder: "choices__placeholder",
                        group: "choices__group",
                        groupHeading: "choices__heading",
                        button: "choices__button",
                        activeState: "is-active",
                        focusState: "is-focused",
                        openState: "is-open",
                        disabledState: "is-disabled",
                        highlightedState: "is-highlighted",
                        hiddenState: "is-hidden",
                        flippedState: "is-flipped",
                        loadingState: "is-loading",
                        noResults: "has-no-results",
                        noChoices: "has-no-choices"
                    },
                    fuseOptions: {
                        include: "score"
                    },
                    callbackOnInit: null,
                    callbackOnCreateTemplates: null
                };
                if (this.idNames = {
                        itemChoice: "item-choice"
                    }, this.config = (0, v.extend)(a, e.userDefaults, i), "auto" !== this.config.renderSelectedChoices && "always" !== this.config.renderSelectedChoices && (this.config.silent || console.warn("renderSelectedChoices: Possible values are 'auto' and 'always'. Falling back to 'auto'."), this.config.renderSelectedChoices = "auto"), this.store = new f.default(this.render), this.initialised = !1, this.currentState = {}, this.prevState = {}, this.currentValue = "", this.element = t, this.passedElement = (0, v.isType)("String", t) ? document.querySelector(t) : t, !this.passedElement) return this.config.silent || console.error("Passed element not found"), !1;
                this.isTextElement = "text" === this.passedElement.type, this.isSelectOneElement = "select-one" === this.passedElement.type, this.isSelectMultipleElement = "select-multiple" === this.passedElement.type, this.isSelectElement = this.isSelectOneElement || this.isSelectMultipleElement, this.isValidElementType = this.isTextElement || this.isSelectElement, this.isIe11 = !(!navigator.userAgent.match(/Trident/) || !navigator.userAgent.match(/rv[ :]11/)), this.isScrollingOnIe = !1, this.config.shouldSortItems === !0 && this.isSelectOneElement && (this.config.silent || console.warn("shouldSortElements: Type of passed element is 'select-one', falling back to false.")), this.highlightPosition = 0, this.canSearch = this.config.searchEnabled, this.placeholder = !1, this.isSelectOneElement || (this.placeholder = !!this.config.placeholder && (this.config.placeholderValue || this.passedElement.getAttribute("placeholder"))), this.presetChoices = this.config.choices, this.presetItems = this.config.items, this.passedElement.value && (this.presetItems = this.presetItems.concat(this.passedElement.value.split(this.config.delimiter))), this.baseId = (0, v.generateId)(this.passedElement, "choices-"), this.render = this.render.bind(this), this._onFocus = this._onFocus.bind(this), this._onBlur = this._onBlur.bind(this), this._onKeyUp = this._onKeyUp.bind(this), this._onKeyDown = this._onKeyDown.bind(this), this._onClick = this._onClick.bind(this), this._onTouchMove = this._onTouchMove.bind(this), this._onTouchEnd = this._onTouchEnd.bind(this), this._onMouseDown = this._onMouseDown.bind(this), this._onMouseOver = this._onMouseOver.bind(this), this._onPaste = this._onPaste.bind(this), this._onInput = this._onInput.bind(this), this.wasTap = !0;
                var c = "classList" in document.documentElement;
                c || this.config.silent || console.error("Choices: Your browser doesn't support Choices");
                var l = (0, v.isElement)(this.passedElement) && this.isValidElementType;
                if (l) {
                    if ("active" === this.passedElement.getAttribute("data-choice")) return !1;
                    this.init()
                } else this.config.silent || console.error("Incompatible input passed")
            }
            return a(e, [{
                key: "init",
                value: function() {
                    if (this.initialised !== !0) {
                        var e = this.config.callbackOnInit;
                        this.initialised = !0, this._createTemplates(), this._createInput(), this.store.subscribe(this.render), this.render(), this._addEventListeners(), e && (0, v.isType)("Function", e) && e.call(this)
                    }
                }
            }, {
                key: "destroy",
                value: function() {
                    if (this.initialised !== !1) {
                        this._removeEventListeners(), this.passedElement.classList.remove(this.config.classNames.input, this.config.classNames.hiddenState), this.passedElement.removeAttribute("tabindex");
                        var e = this.passedElement.getAttribute("data-choice-orig-style");
                        e ? (this.passedElement.removeAttribute("data-choice-orig-style"), this.passedElement.setAttribute("style", e)) : this.passedElement.removeAttribute("style"), this.passedElement.removeAttribute("aria-hidden"), this.passedElement.removeAttribute("data-choice"), this.passedElement.value = this.passedElement.value, this.containerOuter.parentNode.insertBefore(this.passedElement, this.containerOuter), this.containerOuter.parentNode.removeChild(this.containerOuter), this.clearStore(), this.config.templates = null, this.initialised = !1
                    }
                }
            }, {
                key: "renderGroups",
                value: function(e, t, i) {
                    var n = this,
                        s = i || document.createDocumentFragment(),
                        r = this.config.sortFilter;
                    return this.config.shouldSort && e.sort(r), e.forEach(function(e) {
                        var i = t.filter(function(t) {
                            return n.isSelectOneElement ? t.groupId === e.id : t.groupId === e.id && !t.selected
                        });
                        if (i.length >= 1) {
                            var r = n._getTemplate("choiceGroup", e);
                            s.appendChild(r), n.renderChoices(i, s, !0)
                        }
                    }), s
                }
            }, {
                key: "renderChoices",
                value: function(e, t) {
                    var i = this,
                        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        s = t || document.createDocumentFragment(),
                        o = this.config,
                        a = o.renderSelectedChoices,
                        c = o.searchResultLimit,
                        l = o.renderChoiceLimit,
                        h = this.isSearching ? v.sortByScore : this.config.sortFilter,
                        u = function(e) {
                            var t = "auto" !== a || (i.isSelectOneElement || !e.selected);
                            if (t) {
                                var n = i._getTemplate("choice", e);
                                s.appendChild(n)
                            }
                        },
                        d = e;
                    "auto" !== a || this.isSelectOneElement || (d = e.filter(function(e) {
                        return !e.selected
                    }));
                    var f = d.reduce(function(e, t) {
                            return t.placeholder ? e.placeholderChoices.push(t) : e.normalChoices.push(t), e
                        }, {
                            placeholderChoices: [],
                            normalChoices: []
                        }),
                        p = f.placeholderChoices,
                        m = f.normalChoices;
                    (this.config.shouldSort || this.isSearching) && m.sort(h);
                    var g = d.length,
                        y = [].concat(r(p), r(m));
                    this.isSearching ? g = c : l > 0 && !n && (g = l);
                    for (var b = 0; b < g; b += 1) y[b] && u(y[b]);
                    return s
                }
            }, {
                key: "renderItems",
                value: function(e) {
                    var t = this,
                        i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        n = i || document.createDocumentFragment();
                    if (this.config.shouldSortItems && !this.isSelectOneElement && e.sort(this.config.sortFilter), this.isTextElement) {
                        var s = this.store.getItemsReducedToValues(e),
                            r = s.join(this.config.delimiter);
                        this.passedElement.setAttribute("value", r), this.passedElement.value = r
                    } else {
                        var o = document.createDocumentFragment();
                        e.forEach(function(e) {
                            var i = t._getTemplate("option", e);
                            o.appendChild(i)
                        }), this.passedElement.innerHTML = "", this.passedElement.appendChild(o)
                    }
                    return e.forEach(function(e) {
                        var i = t._getTemplate("item", e);
                        n.appendChild(i)
                    }), n
                }
            }, {
                key: "render",
                value: function() {
                    if (this.currentState = this.store.getState(), this.currentState !== this.prevState) {
                        if ((this.currentState.choices !== this.prevState.choices || this.currentState.groups !== this.prevState.groups || this.currentState.items !== this.prevState.items) && this.isSelectElement) {
                            var e = this.store.getGroupsFilteredByActive(),
                                t = this.store.getChoicesFilteredByActive(),
                                i = document.createDocumentFragment();
                            this.choiceList.innerHTML = "", this.config.resetScrollPosition && (this.choiceList.scrollTop = 0), e.length >= 1 && this.isSearching !== !0 ? i = this.renderGroups(e, t, i) : t.length >= 1 && (i = this.renderChoices(t, i));
                            var n = this.store.getItemsFilteredByActive(),
                                s = this._canAddItem(n, this.input.value);
                            if (i.childNodes && i.childNodes.length > 0) s.response ? (this.choiceList.appendChild(i), this._highlightChoice()) : this.choiceList.appendChild(this._getTemplate("notice", s.notice));
                            else {
                                var r = void 0,
                                    o = void 0;
                                this.isSearching ? (o = (0, v.isType)("Function", this.config.noResultsText) ? this.config.noResultsText() : this.config.noResultsText, r = this._getTemplate("notice", o, "no-results")) : (o = (0, v.isType)("Function", this.config.noChoicesText) ? this.config.noChoicesText() : this.config.noChoicesText, r = this._getTemplate("notice", o, "no-choices")), this.choiceList.appendChild(r)
                            }
                        }
                        if (this.currentState.items !== this.prevState.items) {
                            var a = this.store.getItemsFilteredByActive();
                            if (this.itemList.innerHTML = "", a && a) {
                                var c = this.renderItems(a);
                                c.childNodes && this.itemList.appendChild(c)
                            }
                        }
                        this.prevState = this.currentState
                    }
                }
            }, {
                key: "highlightItem",
                value: function(e) {
                    var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    if (!e) return this;
                    var i = e.id,
                        n = e.groupId,
                        s = n >= 0 ? this.store.getGroupById(n) : null;
                    return this.store.dispatch((0, p.highlightItem)(i, !0)), t && (s && s.value ? (0, v.triggerEvent)(this.passedElement, "highlightItem", {
                        id: i,
                        value: e.value,
                        label: e.label,
                        groupValue: s.value
                    }) : (0, v.triggerEvent)(this.passedElement, "highlightItem", {
                        id: i,
                        value: e.value,
                        label: e.label
                    })), this
                }
            }, {
                key: "unhighlightItem",
                value: function(e) {
                    if (!e) return this;
                    var t = e.id,
                        i = e.groupId,
                        n = i >= 0 ? this.store.getGroupById(i) : null;
                    return this.store.dispatch((0, p.highlightItem)(t, !1)), n && n.value ? (0, v.triggerEvent)(this.passedElement, "unhighlightItem", {
                        id: t,
                        value: e.value,
                        label: e.label,
                        groupValue: n.value
                    }) : (0, v.triggerEvent)(this.passedElement, "unhighlightItem", {
                        id: t,
                        value: e.value,
                        label: e.label
                    }), this
                }
            }, {
                key: "highlightAll",
                value: function() {
                    var e = this,
                        t = this.store.getItems();
                    return t.forEach(function(t) {
                        return e.highlightItem(t)
                    }), this
                }
            }, {
                key: "unhighlightAll",
                value: function() {
                    var e = this,
                        t = this.store.getItems();
                    return t.forEach(function(t) {
                        return e.unhighlightItem(t)
                    }), this
                }
            }, {
                key: "removeItemsByValue",
                value: function(e) {
                    var t = this;
                    if (!e || !(0, v.isType)("String", e)) return this;
                    var i = this.store.getItemsFilteredByActive();
                    return i.forEach(function(i) {
                        i.value === e && t._removeItem(i)
                    }), this
                }
            }, {
                key: "removeActiveItems",
                value: function(e) {
                    var t = this,
                        i = this.store.getItemsFilteredByActive();
                    return i.forEach(function(i) {
                        i.active && e !== i.id && t._removeItem(i)
                    }), this
                }
            }, {
                key: "removeHighlightedItems",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        i = this.store.getItemsFilteredByActive();
                    return i.forEach(function(i) {
                        i.highlighted && i.active && (e._removeItem(i), t && e._triggerChange(i.value))
                    }), this
                }
            }, {
                key: "showDropdown",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = document.body,
                        i = document.documentElement,
                        n = Math.max(t.scrollHeight, t.offsetHeight, i.clientHeight, i.scrollHeight, i.offsetHeight);
                    this.containerOuter.classList.add(this.config.classNames.openState), this.containerOuter.setAttribute("aria-expanded", "true"), this.dropdown.classList.add(this.config.classNames.activeState), this.dropdown.setAttribute("aria-expanded", "true");
                    var s = this.dropdown.getBoundingClientRect(),
                        r = Math.ceil(s.top + window.pageYOffset + this.dropdown.offsetHeight),
                        o = !1;
                    return "auto" === this.config.position ? o = r >= n : "top" === this.config.position && (o = !0), o && this.containerOuter.classList.add(this.config.classNames.flippedState), e && this.canSearch && document.activeElement !== this.input && this.input.focus(), (0, v.triggerEvent)(this.passedElement, "showDropdown", {}), this
                }
            }, {
                key: "hideDropdown",
                value: function() {
                    var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        t = this.containerOuter.classList.contains(this.config.classNames.flippedState);
                    return this.containerOuter.classList.remove(this.config.classNames.openState), this.containerOuter.setAttribute("aria-expanded", "false"), this.dropdown.classList.remove(this.config.classNames.activeState), this.dropdown.setAttribute("aria-expanded", "false"), this.input.removeAttribute("aria-activedescendant"), this.containerOuter.removeAttribute("aria-activedescendant"), t && this.containerOuter.classList.remove(this.config.classNames.flippedState), e && this.canSearch && document.activeElement === this.input && this.input.blur(), (0, v.triggerEvent)(this.passedElement, "hideDropdown", {}), this
                }
            }, {
                key: "toggleDropdown",
                value: function() {
                    var e = this.dropdown.classList.contains(this.config.classNames.activeState);
                    return e ? this.hideDropdown() : this.showDropdown(!0), this
                }
            }, {
                key: "getValue",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                        i = this.store.getItemsFilteredByActive(),
                        n = [];
                    return i.forEach(function(i) {
                        e.isTextElement ? n.push(t ? i.value : i) : i.active && n.push(t ? i.value : i)
                    }), this.isSelectOneElement ? n[0] : n
                }
            }, {
                key: "setValue",
                value: function(e) {
                    var t = this;
                    if (!this.initialised) return this;
                    var i = [].concat(r(e)),
                        n = function(e) {
                            var i = (0, v.getType)(e);
                            if ("Object" === i) {
                                if (!e.value) return;
                                t.isTextElement ? t._addItem(e.value, e.label, e.id, void 0, e.customProperties, e.placeholder) : t._addChoice(e.value, e.label, !0, !1, -1, e.customProperties, e.placeholder)
                            } else "String" === i && (t.isTextElement ? t._addItem(e) : t._addChoice(e, e, !0, !1, -1, null))
                        };
                    return i.length > 1 ? i.forEach(function(e) {
                        return n(e)
                    }) : n(i[0]), this
                }
            }, {
                key: "setValueByChoice",
                value: function(e) {
                    var t = this;
                    if (this.isTextElement) return this;
                    var i = this.store.getChoices(),
                        n = (0, v.isType)("Array", e) ? e : [e];
                    return n.forEach(function(e) {
                        var n = i.find(function(t) {
                            return t.value === e
                        });
                        n ? n.selected ? t.config.silent || console.warn("Attempting to select choice already selected") : t._addItem(n.value, n.label, n.id, n.groupId, n.customProperties, n.placeholder, n.keyCode) : t.config.silent || console.warn("Attempting to select choice that does not exist")
                    }), this
                }
            }, {
                key: "setChoices",
                value: function(e, t, i) {
                    var n = this,
                        s = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
                    return this.initialised && this.isSelectElement && (0, v.isType)("Array", e) && t ? (s && this._clearChoices(), e && e.length && (this.containerOuter.classList.remove(this.config.classNames.loadingState), e.forEach(function(e) {
                        e.choices ? n._addGroup(e, e.id || null, t, i) : n._addChoice(e[t], e[i], e.selected, e.disabled, void 0, e.customProperties, e.placeholder)
                    })), this) : this
                }
            }, {
                key: "clearStore",
                value: function() {
                    return this.store.dispatch((0, p.clearAll)()), this
                }
            }, {
                key: "clearInput",
                value: function() {
                    return this.input.value && (this.input.value = ""), this.isSelectOneElement || this._setInputWidth(), !this.isTextElement && this.config.searchEnabled && (this.isSearching = !1, this.store.dispatch((0, p.activateChoices)(!0))), this
                }
            }, {
                key: "enable",
                value: function() {
                    if (!this.initialised) return this;
                    this.passedElement.disabled = !1;
                    var e = this.containerOuter.classList.contains(this.config.classNames.disabledState);
                    return e && (this._addEventListeners(), this.passedElement.removeAttribute("disabled"), this.input.removeAttribute("disabled"), this.containerOuter.classList.remove(this.config.classNames.disabledState), this.containerOuter.removeAttribute("aria-disabled"), this.isSelectOneElement && this.containerOuter.setAttribute("tabindex", "0")), this
                }
            }, {
                key: "disable",
                value: function() {
                    if (!this.initialised) return this;
                    this.passedElement.disabled = !0;
                    var e = !this.containerOuter.classList.contains(this.config.classNames.disabledState);
                    return e && (this._removeEventListeners(), this.passedElement.setAttribute("disabled", ""), this.input.setAttribute("disabled", ""), this.containerOuter.classList.add(this.config.classNames.disabledState), this.containerOuter.setAttribute("aria-disabled", "true"), this.isSelectOneElement && this.containerOuter.setAttribute("tabindex", "-1")), this
                }
            }, {
                key: "ajax",
                value: function(e) {
                    var t = this;
                    return this.initialised && this.isSelectElement ? (requestAnimationFrame(function() {
                        return t._handleLoadingState(!0)
                    }), e(this._ajaxCallback()), this) : this
                }
            }, {
                key: "_triggerChange",
                value: function(e) {
                    e && (0, v.triggerEvent)(this.passedElement, "change", {
                        value: e
                    })
                }
            }, {
                key: "_handleButtonAction",
                value: function(e, t) {
                    if (e && t && this.config.removeItems && this.config.removeItemButton) {
                        var i = t.parentNode.getAttribute("data-id"),
                            n = e.find(function(e) {
                                return e.id === parseInt(i, 10)
                            });
                        this._removeItem(n), this._triggerChange(n.value), this.isSelectOneElement && this._selectPlaceholderChoice()
                    }
                }
            }, {
                key: "_selectPlaceholderChoice",
                value: function() {
                    var e = this.store.getPlaceholderChoice();
                    e && (this._addItem(e.value, e.label, e.id, e.groupId, null, e.placeholder), this._triggerChange(e.value))
                }
            }, {
                key: "_handleItemAction",
                value: function(e, t) {
                    var i = this,
                        n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                    if (e && t && this.config.removeItems && !this.isSelectOneElement) {
                        var s = t.getAttribute("data-id");
                        e.forEach(function(e) {
                            e.id !== parseInt(s, 10) || e.highlighted ? n || e.highlighted && i.unhighlightItem(e) : i.highlightItem(e)
                        }), document.activeElement !== this.input && this.input.focus()
                    }
                }
            }, {
                key: "_handleChoiceAction",
                value: function(e, t) {
                    if (e && t) {
                        var i = t.getAttribute("data-id"),
                            n = this.store.getChoiceById(i),
                            s = e[0] && e[0].keyCode ? e[0].keyCode : null,
                            r = this.dropdown.classList.contains(this.config.classNames.activeState);
                        if (n.keyCode = s, (0, v.triggerEvent)(this.passedElement, "choice", {
                                choice: n
                            }), n && !n.selected && !n.disabled) {
                            var o = this._canAddItem(e, n.value);
                            o.response && (this._addItem(n.value, n.label, n.id, n.groupId, n.customProperties, n.placeholder, n.keyCode), this._triggerChange(n.value))
                        }
                        this.clearInput(), r && this.isSelectOneElement && (this.hideDropdown(), this.containerOuter.focus())
                    }
                }
            }, {
                key: "_handleBackspace",
                value: function(e) {
                    if (this.config.removeItems && e) {
                        var t = e[e.length - 1],
                            i = e.some(function(e) {
                                return e.highlighted
                            });
                        this.config.editItems && !i && t ? (this.input.value = t.value, this._setInputWidth(), this._removeItem(t), this._triggerChange(t.value)) : (i || this.highlightItem(t, !1), this.removeHighlightedItems(!0))
                    }
                }
            }, {
                key: "_canAddItem",
                value: function(e, t) {
                    var i = !0,
                        n = (0, v.isType)("Function", this.config.addItemText) ? this.config.addItemText(t) : this.config.addItemText;
                    (this.isSelectMultipleElement || this.isTextElement) && this.config.maxItemCount > 0 && this.config.maxItemCount <= e.length && (i = !1, n = (0, v.isType)("Function", this.config.maxItemText) ? this.config.maxItemText(this.config.maxItemCount) : this.config.maxItemText), this.isTextElement && this.config.addItems && i && this.config.regexFilter && (i = (0, v.regexFilter)(t, this.config.regexFilter));
                    var s = !e.some(function(e) {
                        return (0, v.isType)("String", t) ? e.value === t.trim() : e.value === t
                    });
                    return s || this.config.duplicateItems || this.isSelectOneElement || !i || (i = !1, n = (0, v.isType)("Function", this.config.uniqueItemText) ? this.config.uniqueItemText(t) : this.config.uniqueItemText), {
                        response: i,
                        notice: n
                    }
                }
            }, {
                key: "_handleLoadingState",
                value: function() {
                    var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
                        t = this.itemList.querySelector("." + this.config.classNames.placeholder);
                    e ? (this.containerOuter.classList.add(this.config.classNames.loadingState), this.containerOuter.setAttribute("aria-busy", "true"), this.isSelectOneElement ? t ? t.innerHTML = this.config.loadingText : (t = this._getTemplate("placeholder", this.config.loadingText), this.itemList.appendChild(t)) : this.input.placeholder = this.config.loadingText) : (this.containerOuter.classList.remove(this.config.classNames.loadingState), this.isSelectOneElement ? t.innerHTML = this.placeholder || "" : this.input.placeholder = this.placeholder || "")
                }
            }, {
                key: "_ajaxCallback",
                value: function() {
                    var e = this;
                    return function(t, i, n) {
                        if (t && i) {
                            var s = (0, v.isType)("Object", t) ? [t] : t;
                            s && (0, v.isType)("Array", s) && s.length ? (e._handleLoadingState(!1), s.forEach(function(t) {
                                if (t.choices) {
                                    var s = t.id || null;
                                    e._addGroup(t, s, i, n)
                                } else e._addChoice(t[i], t[n], t.selected, t.disabled, void 0, t.customProperties, t.placeholder)
                            }), e.isSelectOneElement && e._selectPlaceholderChoice()) : e._handleLoadingState(!1), e.containerOuter.removeAttribute("aria-busy")
                        }
                    }
                }
            }, {
                key: "_searchChoices",
                value: function(e) {
                    var t = (0, v.isType)("String", e) ? e.trim() : e,
                        i = (0, v.isType)("String", this.currentValue) ? this.currentValue.trim() : this.currentValue;
                    if (t.length >= 1 && t !== i + " ") {
                        var n = this.store.getSearchableChoices(),
                            s = t,
                            r = (0, v.isType)("Array", this.config.searchFields) ? this.config.searchFields : [this.config.searchFields],
                            o = Object.assign(this.config.fuseOptions, {
                                keys: r
                            }),
                            a = new l.default(n, o),
                            c = a.search(s);
                        return this.currentValue = t, this.highlightPosition = 0, this.isSearching = !0, this.store.dispatch((0, p.filterChoices)(c)), c.length
                    }
                    return 0
                }
            }, {
                key: "_handleSearch",
                value: function(e) {
                    if (e) {
                        var t = this.store.getChoices(),
                            i = t.some(function(e) {
                                return !e.active
                            });
                        if (this.input === document.activeElement)
                            if (e && e.length >= this.config.searchFloor) {
                                var n = 0;
                                this.config.searchChoices && (n = this._searchChoices(e)), (0, v.triggerEvent)(this.passedElement, "search", {
                                    value: e,
                                    resultCount: n
                                })
                            } else i && (this.isSearching = !1, this.store.dispatch((0, p.activateChoices)(!0)))
                    }
                }
            }, {
                key: "_addEventListeners",
                value: function() {
                    document.addEventListener("keyup", this._onKeyUp), document.addEventListener("keydown", this._onKeyDown), document.addEventListener("click", this._onClick), document.addEventListener("touchmove", this._onTouchMove), document.addEventListener("touchend", this._onTouchEnd), document.addEventListener("mousedown", this._onMouseDown), document.addEventListener("mouseover", this._onMouseOver), this.isSelectOneElement && (this.containerOuter.addEventListener("focus", this._onFocus), this.containerOuter.addEventListener("blur", this._onBlur)), this.input.addEventListener("input", this._onInput), this.input.addEventListener("paste", this._onPaste), this.input.addEventListener("focus", this._onFocus), this.input.addEventListener("blur", this._onBlur)
                }
            }, {
                key: "_removeEventListeners",
                value: function() {
                    document.removeEventListener("keyup", this._onKeyUp), document.removeEventListener("keydown", this._onKeyDown), document.removeEventListener("click", this._onClick), document.removeEventListener("touchmove", this._onTouchMove), document.removeEventListener("touchend", this._onTouchEnd), document.removeEventListener("mousedown", this._onMouseDown), document.removeEventListener("mouseover", this._onMouseOver), this.isSelectOneElement && (this.containerOuter.removeEventListener("focus", this._onFocus), this.containerOuter.removeEventListener("blur", this._onBlur)), this.input.removeEventListener("input", this._onInput), this.input.removeEventListener("paste", this._onPaste), this.input.removeEventListener("focus", this._onFocus), this.input.removeEventListener("blur", this._onBlur)
                }
            }, {
                key: "_setInputWidth",
                value: function() {
                    this.placeholder ? this.input.value && this.input.value.length >= this.placeholder.length / 1.25 && (this.input.style.width = (0, v.getWidthOfInput)(this.input)) : this.input.style.width = (0, v.getWidthOfInput)(this.input)
                }
            }, {
                key: "_onKeyDown",
                value: function(e) {
                    var t, i = this;
                    if (e.target === this.input || this.containerOuter.contains(e.target)) {
                        var n = e.target,
                            r = this.store.getItemsFilteredByActive(),
                            o = this.input === document.activeElement,
                            a = this.dropdown.classList.contains(this.config.classNames.activeState),
                            c = this.itemList && this.itemList.children,
                            l = String.fromCharCode(e.keyCode),
                            h = 46,
                            u = 8,
                            d = 13,
                            f = 65,
                            p = 27,
                            m = 38,
                            g = 40,
                            y = 33,
                            b = 34,
                            E = e.ctrlKey || e.metaKey;
                        this.isTextElement || !/[a-zA-Z0-9-_ ]/.test(l) || a || this.showDropdown(!0), this.canSearch = this.config.searchEnabled;
                        var _ = function() {
                                E && c && (i.canSearch = !1, i.config.removeItems && !i.input.value && i.input === document.activeElement && i.highlightAll())
                            },
                            S = function() {
                                if (i.isTextElement && n.value) {
                                    var t = i.input.value,
                                        s = i._canAddItem(r, t);
                                    s.response && (a && i.hideDropdown(), i._addItem(t), i._triggerChange(t), i.clearInput())
                                }
                                if (n.hasAttribute("data-button") && (i._handleButtonAction(r, n), e.preventDefault()), a) {
                                    e.preventDefault();
                                    var o = i.dropdown.querySelector("." + i.config.classNames.highlightedState);
                                    o && (r[0] && (r[0].keyCode = d), i._handleChoiceAction(r, o))
                                } else i.isSelectOneElement && !a && (i.showDropdown(!0), e.preventDefault())
                            },
                            I = function() {
                                a && (i.toggleDropdown(), i.containerOuter.focus())
                            },
                            w = function() {
                                if (a || i.isSelectOneElement) {
                                    a || i.showDropdown(!0), i.canSearch = !1;
                                    var t = e.keyCode === g || e.keyCode === b ? 1 : -1,
                                        n = e.metaKey || e.keyCode === b || e.keyCode === y,
                                        s = void 0;
                                    if (n) s = t > 0 ? Array.from(i.dropdown.querySelectorAll("[data-choice-selectable]")).pop() : i.dropdown.querySelector("[data-choice-selectable]");
                                    else {
                                        var r = i.dropdown.querySelector("." + i.config.classNames.highlightedState);
                                        s = r ? (0, v.getAdjacentEl)(r, "[data-choice-selectable]", t) : i.dropdown.querySelector("[data-choice-selectable]")
                                    }
                                    s && ((0, v.isScrolledIntoView)(s, i.choiceList, t) || i._scrollToChoice(s, t), i._highlightChoice(s)), e.preventDefault()
                                }
                            },
                            T = function() {
                                !o || e.target.value || i.isSelectOneElement || (i._handleBackspace(r), e.preventDefault())
                            },
                            C = (t = {}, s(t, f, _), s(t, d, S), s(t, p, I), s(t, m, w), s(t, y, w), s(t, g, w), s(t, b, w), s(t, u, T), s(t, h, T), t);
                        C[e.keyCode] && C[e.keyCode]()
                    }
                }
            }, {
                key: "_onKeyUp",
                value: function(e) {
                    if (e.target === this.input) {
                        var t = this.input.value,
                            i = this.store.getItemsFilteredByActive(),
                            n = this._canAddItem(i, t);
                        if (this.isTextElement) {
                            var s = this.dropdown.classList.contains(this.config.classNames.activeState);
                            if (t) {
                                if (n.notice) {
                                    var r = this._getTemplate("notice", n.notice);
                                    this.dropdown.innerHTML = r.outerHTML
                                }
                                n.response === !0 ? s || this.showDropdown() : !n.notice && s && this.hideDropdown()
                            } else s && this.hideDropdown()
                        } else {
                            var o = 46,
                                a = 8;
                            e.keyCode !== o && e.keyCode !== a || e.target.value ? this.canSearch && n.response && this._handleSearch(this.input.value) : !this.isTextElement && this.isSearching && (this.isSearching = !1, this.store.dispatch((0, p.activateChoices)(!0)))
                        }
                        this.canSearch = this.config.searchEnabled
                    }
                }
            }, {
                key: "_onInput",
                value: function() {
                    this.isSelectOneElement || this._setInputWidth()
                }
            }, {
                key: "_onTouchMove",
                value: function() {
                    this.wasTap === !0 && (this.wasTap = !1)
                }
            }, {
                key: "_onTouchEnd",
                value: function(e) {
                    var t = e.target || e.touches[0].target,
                        i = this.dropdown.classList.contains(this.config.classNames.activeState);
                    this.wasTap === !0 && this.containerOuter.contains(t) && (t !== this.containerOuter && t !== this.containerInner || this.isSelectOneElement || (this.isTextElement ? document.activeElement !== this.input && this.input.focus() : i || this.showDropdown(!0)), e.stopPropagation()), this.wasTap = !0
                }
            }, {
                key: "_onMouseDown",
                value: function(e) {
                    var t = e.target;
                    if (t === this.choiceList && this.isIe11 && (this.isScrollingOnIe = !0), this.containerOuter.contains(t) && t !== this.input) {
                        var i = this.store.getItemsFilteredByActive(),
                            n = e.shiftKey,
                            s = (0, v.findAncestorByAttrName)(t, "data-button"),
                            r = (0, v.findAncestorByAttrName)(t, "data-item"),
                            o = (0, v.findAncestorByAttrName)(t, "data-choice");
                        s ? this._handleButtonAction(i, s) : r ? this._handleItemAction(i, r, n) : o && this._handleChoiceAction(i, o), e.preventDefault()
                    }
                }
            }, {
                key: "_onClick",
                value: function(e) {
                    var t = e.target,
                        i = this.dropdown.classList.contains(this.config.classNames.activeState),
                        n = this.store.getItemsFilteredByActive();
                    if (this.containerOuter.contains(t)) t.hasAttribute("data-button") && this._handleButtonAction(n, t), i ? this.isSelectOneElement && t !== this.input && !this.dropdown.contains(t) && this.hideDropdown(!0) : this.isTextElement ? document.activeElement !== this.input && this.input.focus() : this.canSearch ? this.showDropdown(!0) : (this.showDropdown(), this.containerOuter.focus());
                    else {
                        var s = n.some(function(e) {
                            return e.highlighted
                        });
                        s && this.unhighlightAll(), this.containerOuter.classList.remove(this.config.classNames.focusState), i && this.hideDropdown()
                    }
                }
            }, {
                key: "_onMouseOver",
                value: function(e) {
                    (e.target === this.dropdown || this.dropdown.contains(e.target)) && e.target.hasAttribute("data-choice") && this._highlightChoice(e.target)
                }
            }, {
                key: "_onPaste",
                value: function(e) {
                    e.target !== this.input || this.config.paste || e.preventDefault()
                }
            }, {
                key: "_onFocus",
                value: function(e) {
                    var t = this,
                        i = e.target;
                    if (this.containerOuter.contains(i)) {
                        var n = this.dropdown.classList.contains(this.config.classNames.activeState),
                            s = {
                                text: function() {
                                    i === t.input && t.containerOuter.classList.add(t.config.classNames.focusState)
                                },
                                "select-one": function() {
                                    t.containerOuter.classList.add(t.config.classNames.focusState), i === t.input && (n || t.showDropdown())
                                },
                                "select-multiple": function() {
                                    i === t.input && (t.containerOuter.classList.add(t.config.classNames.focusState), n || t.showDropdown(!0))
                                }
                            };
                        s[this.passedElement.type]()
                    }
                }
            }, {
                key: "_onBlur",
                value: function(e) {
                    var t = this,
                        i = e.target;
                    if (this.containerOuter.contains(i) && !this.isScrollingOnIe) {
                        var n = this.store.getItemsFilteredByActive(),
                            s = this.dropdown.classList.contains(this.config.classNames.activeState),
                            r = n.some(function(e) {
                                return e.highlighted
                            }),
                            o = {
                                text: function() {
                                    i === t.input && (t.containerOuter.classList.remove(t.config.classNames.focusState), r && t.unhighlightAll(), s && t.hideDropdown())
                                },
                                "select-one": function() {
                                    t.containerOuter.classList.remove(t.config.classNames.focusState), i === t.containerOuter && s && !t.canSearch && t.hideDropdown(), i === t.input && s && t.hideDropdown()
                                },
                                "select-multiple": function() {
                                    i === t.input && (t.containerOuter.classList.remove(t.config.classNames.focusState), s && t.hideDropdown(), r && t.unhighlightAll())
                                }
                            };
                        o[this.passedElement.type]()
                    } else this.isScrollingOnIe = !1, this.input.focus()
                }
            }, {
                key: "_scrollToChoice",
                value: function(e, t) {
                    var i = this;
                    if (e) {
                        var n = this.choiceList.offsetHeight,
                            s = e.offsetHeight,
                            r = e.offsetTop + s,
                            o = this.choiceList.scrollTop + n,
                            a = t > 0 ? this.choiceList.scrollTop + r - o : e.offsetTop,
                            c = function e() {
                                var n = 4,
                                    s = i.choiceList.scrollTop,
                                    r = !1,
                                    o = void 0,
                                    c = void 0;
                                t > 0 ? (o = (a - s) / n, c = o > 1 ? o : 1, i.choiceList.scrollTop = s + c, s < a && (r = !0)) : (o = (s - a) / n, c = o > 1 ? o : 1, i.choiceList.scrollTop = s - c, s > a && (r = !0)), r && requestAnimationFrame(function(i) {
                                    e(i, a, t)
                                })
                            };
                        requestAnimationFrame(function(e) {
                            c(e, a, t)
                        })
                    }
                }
            }, {
                key: "_highlightChoice",
                value: function() {
                    var e = this,
                        t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
                        i = Array.from(this.dropdown.querySelectorAll("[data-choice-selectable]")),
                        n = t;
                    if (i && i.length) {
                        var s = Array.from(this.dropdown.querySelectorAll("." + this.config.classNames.highlightedState));
                        s.forEach(function(t) {
                            t.classList.remove(e.config.classNames.highlightedState), t.setAttribute("aria-selected", "false")
                        }), n ? this.highlightPosition = i.indexOf(n) : (n = i.length > this.highlightPosition ? i[this.highlightPosition] : i[i.length - 1], n || (n = i[0])), n.classList.add(this.config.classNames.highlightedState), n.setAttribute("aria-selected", "true");
                        var r = this.dropdown.classList.contains(this.config.classNames.activeState);
                        r && (this.input.setAttribute("aria-activedescendant", n.id), this.containerOuter.setAttribute("aria-activedescendant", n.id))
                    }
                }
            }, {
                key: "_addItem",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : -1,
                        n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : -1,
                        s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : null,
                        r = arguments.length > 5 && void 0 !== arguments[5] && arguments[5],
                        o = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : null,
                        a = (0, v.isType)("String", e) ? e.trim() : e,
                        c = o,
                        l = this.store.getItems(),
                        h = t || a,
                        u = parseInt(i, 10) || -1,
                        d = n >= 0 ? this.store.getGroupById(n) : null,
                        f = l ? l.length + 1 : 1;
                    return this.config.prependValue && (a = this.config.prependValue + a.toString()), this.config.appendValue && (a += this.config.appendValue.toString()),
                        this.store.dispatch((0, p.addItem)(a, h, f, u, n, s, r, c)), this.isSelectOneElement && this.removeActiveItems(f), d && d.value ? (0, v.triggerEvent)(this.passedElement, "addItem", {
                            id: f,
                            value: a,
                            label: h,
                            groupValue: d.value,
                            keyCode: c
                        }) : (0, v.triggerEvent)(this.passedElement, "addItem", {
                            id: f,
                            value: a,
                            label: h,
                            keyCode: c
                        }), this
                }
            }, {
                key: "_removeItem",
                value: function(e) {
                    if (!e || !(0, v.isType)("Object", e)) return this;
                    var t = e.id,
                        i = e.value,
                        n = e.label,
                        s = e.choiceId,
                        r = e.groupId,
                        o = r >= 0 ? this.store.getGroupById(r) : null;
                    return this.store.dispatch((0, p.removeItem)(t, s)), o && o.value ? (0, v.triggerEvent)(this.passedElement, "removeItem", {
                        id: t,
                        value: i,
                        label: n,
                        groupValue: o.value
                    }) : (0, v.triggerEvent)(this.passedElement, "removeItem", {
                        id: t,
                        value: i,
                        label: n
                    }), this
                }
            }, {
                key: "_addChoice",
                value: function(e) {
                    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
                        i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
                        n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3],
                        s = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : -1,
                        r = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : null,
                        o = arguments.length > 6 && void 0 !== arguments[6] && arguments[6],
                        a = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : null;
                    if ("undefined" != typeof e && null !== e) {
                        var c = this.store.getChoices(),
                            l = t || e,
                            h = c ? c.length + 1 : 1,
                            u = this.baseId + "-" + this.idNames.itemChoice + "-" + h;
                        this.store.dispatch((0, p.addChoice)(e, l, h, s, n, u, r, o, a)), i && this._addItem(e, l, h, void 0, r, o, a)
                    }
                }
            }, {
                key: "_clearChoices",
                value: function() {
                    this.store.dispatch((0, p.clearChoices)())
                }
            }, {
                key: "_addGroup",
                value: function(e, t) {
                    var i = this,
                        n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "value",
                        s = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "label",
                        r = (0, v.isType)("Object", e) ? e.choices : Array.from(e.getElementsByTagName("OPTION")),
                        o = t || Math.floor((new Date).valueOf() * Math.random()),
                        a = !!e.disabled && e.disabled;
                    r ? (this.store.dispatch((0, p.addGroup)(e.label, o, !0, a)), r.forEach(function(e) {
                        var t = e.disabled || e.parentNode && e.parentNode.disabled;
                        i._addChoice(e[n], (0, v.isType)("Object", e) ? e[s] : e.innerHTML, e.selected, t, o, e.customProperties, e.placeholder)
                    })) : this.store.dispatch((0, p.addGroup)(e.label, e.id, !1, e.disabled))
                }
            }, {
                key: "_getTemplate",
                value: function(e) {
                    if (!e) return null;
                    for (var t = this.config.templates, i = arguments.length, n = Array(i > 1 ? i - 1 : 0), s = 1; s < i; s++) n[s - 1] = arguments[s];
                    return t[e].apply(t, n)
                }
            }, {
                key: "_createTemplates",
                value: function() {
                    var e = this,
                        t = this.config.classNames,
                        i = {
                            containerOuter: function(i) {
                                var n = e.isSelectOneElement ? 'tabindex="0"' : "",
                                    s = e.isSelectElement ? 'role="listbox"' : "",
                                    r = "";
                                return e.isSelectElement && e.config.searchEnabled && (s = 'role="combobox"', r = 'aria-autocomplete="list"'), (0, v.strToEl)('\n          <div\n            class="' + t.containerOuter + '"\n            data-type="' + e.passedElement.type + '"\n            ' + s + "\n            " + n + "\n            " + r + '\n            aria-haspopup="true"\n            aria-expanded="false"\n            dir="' + i + '"\n            >\n          </div>\n        ')
                            },
                            containerInner: function() {
                                return (0, v.strToEl)('\n        <div class="' + t.containerInner + '"></div>\n      ')
                            },
                            itemList: function() {
                                var i, n = (0, u.default)(t.list, (i = {}, s(i, t.listSingle, e.isSelectOneElement), s(i, t.listItems, !e.isSelectOneElement), i));
                                return (0, v.strToEl)('\n          <div class="' + n + '"></div>\n        ')
                            },
                            placeholder: function(e) {
                                return (0, v.strToEl)('\n        <div class="' + t.placeholder + '">\n          ' + e + "\n        </div>\n      ")
                            },
                            item: function(i) {
                                var n, r = i.active ? 'aria-selected="true"' : "",
                                    o = i.disabled ? 'aria-disabled="true"' : "",
                                    a = (0, u.default)(t.item, (n = {}, s(n, t.highlightedState, i.highlighted), s(n, t.itemSelectable, !i.highlighted), s(n, t.placeholder, i.placeholder), n));
                                if (e.config.removeItemButton) {
                                    var c;
                                    return a = (0, u.default)(t.item, (c = {}, s(c, t.highlightedState, i.highlighted), s(c, t.itemSelectable, !i.disabled), s(c, t.placeholder, i.placeholder), c)), (0, v.strToEl)('\n            <div\n              class="' + a + '"\n              data-item\n              data-id="' + i.id + '"\n              data-value="' + i.value + '"\n              data-deletable\n              ' + r + "\n              " + o + "\n              >\n              " + i.label + '<!--\n           --><button\n                type="button"\n                class="' + t.button + '"\n                data-button\n                aria-label="Remove item: \'' + i.value + "'\"\n                >\n                Remove item\n              </button>\n            </div>\n          ")
                                }
                                return (0, v.strToEl)('\n          <div\n            class="' + a + '"\n            data-item\n            data-id="' + i.id + '"\n            data-value="' + i.value + '"\n            ' + r + "\n            " + o + "\n            >\n            " + i.label + "\n          </div>\n        ")
                            },
                            choiceList: function() {
                                var i = e.isSelectOneElement ? "" : 'aria-multiselectable="true"';
                                return (0, v.strToEl)('\n          <div\n            class="' + t.list + '"\n            dir="ltr"\n            role="listbox"\n            ' + i + "\n            >\n          </div>\n        ")
                            },
                            choiceGroup: function(e) {
                                var i = e.disabled ? 'aria-disabled="true"' : "",
                                    n = (0, u.default)(t.group, s({}, t.itemDisabled, e.disabled));
                                return (0, v.strToEl)('\n          <div\n            class="' + n + '"\n            data-group\n            data-id="' + e.id + '"\n            data-value="' + e.value + '"\n            role="group"\n            ' + i + '\n            >\n            <div class="' + t.groupHeading + '">' + e.value + "</div>\n          </div>\n        ")
                            },
                            choice: function(i) {
                                var n, r = i.groupId > 0 ? 'role="treeitem"' : 'role="option"',
                                    o = (0, u.default)(t.item, t.itemChoice, (n = {}, s(n, t.itemDisabled, i.disabled), s(n, t.itemSelectable, !i.disabled), s(n, t.placeholder, i.placeholder), n));
                                return (0, v.strToEl)('\n          <div\n            class="' + o + '"\n            data-select-text="' + e.config.itemSelectText + '"\n            data-choice\n            data-id="' + i.id + '"\n            data-value="' + i.value + '"\n            ' + (i.disabled ? 'data-choice-disabled aria-disabled="true"' : "data-choice-selectable") + '\n            id="' + i.elementId + '"\n            ' + r + "\n            >\n            " + i.label + "\n          </div>\n        ")
                            },
                            input: function() {
                                var e = (0, u.default)(t.input, t.inputCloned);
                                return (0, v.strToEl)('\n          <input\n            type="text"\n            class="' + e + '"\n            autocomplete="off"\n            autocapitalize="off"\n            spellcheck="false"\n            role="textbox"\n            aria-autocomplete="list"\n            >\n        ')
                            },
                            dropdown: function() {
                                var e = (0, u.default)(t.list, t.listDropdown);
                                return (0, v.strToEl)('\n          <div\n            class="' + e + '"\n            aria-expanded="false"\n            >\n          </div>\n        ')
                            },
                            notice: function(e) {
                                var i, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
                                    r = (0, u.default)(t.item, t.itemChoice, (i = {}, s(i, t.noResults, "no-results" === n), s(i, t.noChoices, "no-choices" === n), i));
                                return (0, v.strToEl)('\n          <div class="' + r + '">\n            ' + e + "\n          </div>\n        ")
                            },
                            option: function(e) {
                                return (0, v.strToEl)('\n        <option value="' + e.value + '" selected>' + e.label + "</option>\n      ")
                            }
                        },
                        n = this.config.callbackOnCreateTemplates,
                        r = {};
                    n && (0, v.isType)("Function", n) && (r = n.call(this, v.strToEl)), this.config.templates = (0, v.extend)(i, r)
                }
            }, {
                key: "_createInput",
                value: function() {
                    var e = this,
                        t = this.passedElement.getAttribute("dir") || "ltr",
                        i = this._getTemplate("containerOuter", t),
                        n = this._getTemplate("containerInner"),
                        s = this._getTemplate("itemList"),
                        r = this._getTemplate("choiceList"),
                        o = this._getTemplate("input"),
                        a = this._getTemplate("dropdown");
                    this.containerOuter = i, this.containerInner = n, this.input = o, this.choiceList = r, this.itemList = s, this.dropdown = a, this.passedElement.classList.add(this.config.classNames.input, this.config.classNames.hiddenState), this.passedElement.tabIndex = "-1";
                    var c = this.passedElement.getAttribute("style");
                    if (c && this.passedElement.setAttribute("data-choice-orig-style", c), this.passedElement.setAttribute("style", "display:none;"), this.passedElement.setAttribute("aria-hidden", "true"), this.passedElement.setAttribute("data-choice", "active"), (0, v.wrap)(this.passedElement, n), (0, v.wrap)(n, i), this.isSelectOneElement ? o.placeholder = this.config.searchPlaceholderValue || "" : this.placeholder && (o.placeholder = this.placeholder, o.style.width = (0, v.getWidthOfInput)(o)), this.config.addItems || this.disable(), i.appendChild(n), i.appendChild(a), n.appendChild(s), this.isTextElement || a.appendChild(r), this.isSelectMultipleElement || this.isTextElement ? n.appendChild(o) : this.canSearch && a.insertBefore(o, a.firstChild), this.isSelectElement) {
                        var l = Array.from(this.passedElement.getElementsByTagName("OPTGROUP"));
                        if (this.highlightPosition = 0, this.isSearching = !1, l && l.length) l.forEach(function(t) {
                            e._addGroup(t, t.id || null)
                        });
                        else {
                            var h = Array.from(this.passedElement.options),
                                u = this.config.sortFilter,
                                d = this.presetChoices;
                            h.forEach(function(e) {
                                d.push({
                                    value: e.value,
                                    label: e.innerHTML,
                                    selected: e.selected,
                                    disabled: e.disabled || e.parentNode.disabled,
                                    placeholder: e.hasAttribute("placeholder")
                                })
                            }), this.config.shouldSort && d.sort(u);
                            var f = d.some(function(e) {
                                return e.selected
                            });
                            d.forEach(function(t, i) {
                                if (e.isSelectOneElement) {
                                    var n = !f || f && 0 === i,
                                        s = !!n || t.selected,
                                        r = !n && t.disabled;
                                    e._addChoice(t.value, t.label, s, r, void 0, t.customProperties, t.placeholder)
                                } else e._addChoice(t.value, t.label, t.selected, t.disabled, void 0, t.customProperties, t.placeholder)
                            })
                        }
                    } else this.isTextElement && this.presetItems.forEach(function(t) {
                        var i = (0, v.getType)(t);
                        if ("Object" === i) {
                            if (!t.value) return;
                            e._addItem(t.value, t.label, t.id, void 0, t.customProperties, t.placeholder)
                        } else "String" === i && e._addItem(t)
                    })
                }
            }]), e
        }();
        m.userDefaults = {}, e.exports = m
    }, function(e, t, i) {
        ! function(t) {
            "use strict";

            function i() {
                console.log.apply(console, arguments)
            }

            function n(e, t) {
                var i;
                this.list = e, this.options = t = t || {};
                for (i in a) a.hasOwnProperty(i) && ("boolean" == typeof a[i] ? this.options[i] = i in t ? t[i] : a[i] : this.options[i] = t[i] || a[i])
            }

            function s(e, t, i) {
                var n, o, a, c, l, h;
                if (t) {
                    if (a = t.indexOf("."), a !== -1 ? (n = t.slice(0, a), o = t.slice(a + 1)) : n = t, c = e[n], null !== c && void 0 !== c)
                        if (o || "string" != typeof c && "number" != typeof c)
                            if (r(c))
                                for (l = 0, h = c.length; l < h; l++) s(c[l], o, i);
                            else o && s(c, o, i);
                    else i.push(c)
                } else i.push(e);
                return i
            }

            function r(e) {
                return "[object Array]" === Object.prototype.toString.call(e)
            }

            function o(e, t) {
                t = t || {}, this.options = t, this.options.location = t.location || o.defaultOptions.location, this.options.distance = "distance" in t ? t.distance : o.defaultOptions.distance, this.options.threshold = "threshold" in t ? t.threshold : o.defaultOptions.threshold, this.options.maxPatternLength = t.maxPatternLength || o.defaultOptions.maxPatternLength, this.pattern = t.caseSensitive ? e : e.toLowerCase(), this.patternLen = e.length, this.patternLen <= this.options.maxPatternLength && (this.matchmask = 1 << this.patternLen - 1, this.patternAlphabet = this._calculatePatternAlphabet())
            }
            var a = {
                id: null,
                caseSensitive: !1,
                include: [],
                shouldSort: !0,
                searchFn: o,
                sortFn: function(e, t) {
                    return e.score - t.score
                },
                getFn: s,
                keys: [],
                verbose: !1,
                tokenize: !1,
                matchAllTokens: !1,
                tokenSeparator: / +/g,
                minMatchCharLength: 1,
                findAllMatches: !1
            };
            n.VERSION = "2.7.3", n.prototype.set = function(e) {
                return this.list = e, e
            }, n.prototype.search = function(e) {
                this.options.verbose && i("\nSearch term:", e, "\n"), this.pattern = e, this.results = [], this.resultMap = {}, this._keyMap = null, this._prepareSearchers(), this._startSearch(), this._computeScore(), this._sort();
                var t = this._format();
                return t
            }, n.prototype._prepareSearchers = function() {
                var e = this.options,
                    t = this.pattern,
                    i = e.searchFn,
                    n = t.split(e.tokenSeparator),
                    s = 0,
                    r = n.length;
                if (this.options.tokenize)
                    for (this.tokenSearchers = []; s < r; s++) this.tokenSearchers.push(new i(n[s], e));
                this.fullSeacher = new i(t, e)
            }, n.prototype._startSearch = function() {
                var e, t, i, n, s = this.options,
                    r = s.getFn,
                    o = this.list,
                    a = o.length,
                    c = this.options.keys,
                    l = c.length,
                    h = null;
                if ("string" == typeof o[0])
                    for (i = 0; i < a; i++) this._analyze("", o[i], i, i);
                else
                    for (this._keyMap = {}, i = 0; i < a; i++)
                        for (h = o[i], n = 0; n < l; n++) {
                            if (e = c[n], "string" != typeof e) {
                                if (t = 1 - e.weight || 1, this._keyMap[e.name] = {
                                        weight: t
                                    }, e.weight <= 0 || e.weight > 1) throw new Error("Key weight has to be > 0 and <= 1");
                                e = e.name
                            } else this._keyMap[e] = {
                                weight: 1
                            };
                            this._analyze(e, r(h, e, []), h, i)
                        }
            }, n.prototype._analyze = function(e, t, n, s) {
                var o, a, c, l, h, u, d, f, p, v, m, g, y, b, E, _ = this.options,
                    S = !1;
                if (void 0 !== t && null !== t) {
                    a = [];
                    var I = 0;
                    if ("string" == typeof t) {
                        if (o = t.split(_.tokenSeparator), _.verbose && i("---------\nKey:", e), this.options.tokenize) {
                            for (b = 0; b < this.tokenSearchers.length; b++) {
                                for (f = this.tokenSearchers[b], _.verbose && i("Pattern:", f.pattern), p = [], g = !1, E = 0; E < o.length; E++) {
                                    v = o[E], m = f.search(v);
                                    var w = {};
                                    m.isMatch ? (w[v] = m.score, S = !0, g = !0, a.push(m.score)) : (w[v] = 1, this.options.matchAllTokens || a.push(1)), p.push(w)
                                }
                                g && I++, _.verbose && i("Token scores:", p)
                            }
                            for (l = a[0], u = a.length, b = 1; b < u; b++) l += a[b];
                            l /= u, _.verbose && i("Token score average:", l)
                        }
                        d = this.fullSeacher.search(t), _.verbose && i("Full text score:", d.score), h = d.score, void 0 !== l && (h = (h + l) / 2), _.verbose && i("Score average:", h), y = !this.options.tokenize || !this.options.matchAllTokens || I >= this.tokenSearchers.length, _.verbose && i("Check Matches", y), (S || d.isMatch) && y && (c = this.resultMap[s], c ? c.output.push({
                            key: e,
                            score: h,
                            matchedIndices: d.matchedIndices
                        }) : (this.resultMap[s] = {
                            item: n,
                            output: [{
                                key: e,
                                score: h,
                                matchedIndices: d.matchedIndices
                            }]
                        }, this.results.push(this.resultMap[s])))
                    } else if (r(t))
                        for (b = 0; b < t.length; b++) this._analyze(e, t[b], n, s)
                }
            }, n.prototype._computeScore = function() {
                var e, t, n, s, r, o, a, c, l, h = this._keyMap,
                    u = this.results;
                for (this.options.verbose && i("\n\nComputing score:\n"), e = 0; e < u.length; e++) {
                    for (n = 0, s = u[e].output, r = s.length, c = 1, t = 0; t < r; t++) o = s[t].score, a = h ? h[s[t].key].weight : 1, l = o * a, 1 !== a ? c = Math.min(c, l) : (n += l, s[t].nScore = l);
                    1 === c ? u[e].score = n / r : u[e].score = c, this.options.verbose && i(u[e])
                }
            }, n.prototype._sort = function() {
                var e = this.options;
                e.shouldSort && (e.verbose && i("\n\nSorting...."), this.results.sort(e.sortFn))
            }, n.prototype._format = function() {
                var e, t, n, s, r = this.options,
                    o = r.getFn,
                    a = [],
                    c = this.results,
                    l = r.include;
                for (r.verbose && i("\n\nOutput:\n\n", c), n = r.id ? function(e) {
                        c[e].item = o(c[e].item, r.id, [])[0]
                    } : function() {}, s = function(e) {
                        var t, i, n, s, r, o = c[e];
                        if (l.length > 0) {
                            if (t = {
                                    item: o.item
                                }, l.indexOf("matches") !== -1)
                                for (n = o.output, t.matches = [], i = 0; i < n.length; i++) s = n[i], r = {
                                    indices: s.matchedIndices
                                }, s.key && (r.key = s.key), t.matches.push(r);
                            l.indexOf("score") !== -1 && (t.score = c[e].score)
                        } else t = o.item;
                        return t
                    }, e = 0, t = c.length; e < t; e++) n(e), a.push(s(e));
                return a
            }, o.defaultOptions = {
                location: 0,
                distance: 100,
                threshold: .6,
                maxPatternLength: 32
            }, o.prototype._calculatePatternAlphabet = function() {
                var e = {},
                    t = 0;
                for (t = 0; t < this.patternLen; t++) e[this.pattern.charAt(t)] = 0;
                for (t = 0; t < this.patternLen; t++) e[this.pattern.charAt(t)] |= 1 << this.pattern.length - t - 1;
                return e
            }, o.prototype._bitapScore = function(e, t) {
                var i = e / this.patternLen,
                    n = Math.abs(this.options.location - t);
                return this.options.distance ? i + n / this.options.distance : n ? 1 : i
            }, o.prototype.search = function(e) {
                var t, i, n, s, r, o, a, c, l, h, u, d, f, p, v, m, g, y, b, E, _, S, I, w = this.options;
                if (e = w.caseSensitive ? e : e.toLowerCase(), this.pattern === e) return {
                    isMatch: !0,
                    score: 0,
                    matchedIndices: [
                        [0, e.length - 1]
                    ]
                };
                if (this.patternLen > w.maxPatternLength) {
                    if (y = e.match(new RegExp(this.pattern.replace(w.tokenSeparator, "|"))), b = !!y)
                        for (_ = [], t = 0, S = y.length; t < S; t++) I = y[t], _.push([e.indexOf(I), I.length - 1]);
                    return {
                        isMatch: b,
                        score: b ? .5 : 1,
                        matchedIndices: _
                    }
                }
                for (s = w.findAllMatches, r = w.location, n = e.length, o = w.threshold, a = e.indexOf(this.pattern, r), E = [], t = 0; t < n; t++) E[t] = 0;
                for (a != -1 && (o = Math.min(this._bitapScore(0, a), o), a = e.lastIndexOf(this.pattern, r + this.patternLen), a != -1 && (o = Math.min(this._bitapScore(0, a), o))), a = -1, m = 1, g = [], h = this.patternLen + n, t = 0; t < this.patternLen; t++) {
                    for (c = 0, l = h; c < l;) this._bitapScore(t, r + l) <= o ? c = l : h = l, l = Math.floor((h - c) / 2 + c);
                    for (h = l, u = Math.max(1, r - l + 1), d = s ? n : Math.min(r + l, n) + this.patternLen, f = Array(d + 2), f[d + 1] = (1 << t) - 1, i = d; i >= u; i--)
                        if (v = this.patternAlphabet[e.charAt(i - 1)], v && (E[i - 1] = 1), f[i] = (f[i + 1] << 1 | 1) & v, 0 !== t && (f[i] |= (p[i + 1] | p[i]) << 1 | 1 | p[i + 1]), f[i] & this.matchmask && (m = this._bitapScore(t, i - 1), m <= o)) {
                            if (o = m, a = i - 1, g.push(a), a <= r) break;
                            u = Math.max(1, 2 * r - a)
                        }
                    if (this._bitapScore(t + 1, r) > o) break;
                    p = f
                }
                return _ = this._getMatchedIndices(E), {
                    isMatch: a >= 0,
                    score: 0 === m ? .001 : m,
                    matchedIndices: _
                }
            }, o.prototype._getMatchedIndices = function(e) {
                for (var t, i = [], n = -1, s = -1, r = 0, o = e.length; r < o; r++) t = e[r], t && n === -1 ? n = r : t || n === -1 || (s = r - 1, s - n + 1 >= this.options.minMatchCharLength && i.push([n, s]), n = -1);
                return e[r - 1] && r - 1 - n + 1 >= this.options.minMatchCharLength && i.push([n, r - 1]), i
            }, e.exports = n
        }(this)
    }, function(e, t, i) {
        var n, s;
        ! function() {
            "use strict";

            function i() {
                for (var e = [], t = 0; t < arguments.length; t++) {
                    var n = arguments[t];
                    if (n) {
                        var s = typeof n;
                        if ("string" === s || "number" === s) e.push(n);
                        else if (Array.isArray(n)) e.push(i.apply(null, n));
                        else if ("object" === s)
                            for (var o in n) r.call(n, o) && n[o] && e.push(o)
                    }
                }
                return e.join(" ")
            }
            var r = {}.hasOwnProperty;
            "undefined" != typeof e && e.exports ? e.exports = i : (n = [], s = function() {
                return i
            }.apply(t, n), !(void 0 !== s && (e.exports = s)))
        }()
    }, function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function s(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }

        function r(e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var o = function() {
                function e(e, t) {
                    for (var i = 0; i < t.length; i++) {
                        var n = t[i];
                        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
                    }
                }
                return function(t, i, n) {
                    return i && e(t.prototype, i), n && e(t, n), t
                }
            }(),
            a = i(5),
            c = i(26),
            l = n(c),
            h = function() {
                function e() {
                    r(this, e), this.store = (0, a.createStore)(l.default, window.devToolsExtension ? window.devToolsExtension() : void 0)
                }
                return o(e, [{
                    key: "getState",
                    value: function() {
                        return this.store.getState()
                    }
                }, {
                    key: "dispatch",
                    value: function(e) {
                        this.store.dispatch(e)
                    }
                }, {
                    key: "subscribe",
                    value: function(e) {
                        this.store.subscribe(e)
                    }
                }, {
                    key: "getItems",
                    value: function() {
                        var e = this.store.getState();
                        return e.items
                    }
                }, {
                    key: "getItemsFilteredByActive",
                    value: function() {
                        var e = this.getItems(),
                            t = e.filter(function(e) {
                                return e.active === !0
                            }, []);
                        return t
                    }
                }, {
                    key: "getItemsReducedToValues",
                    value: function() {
                        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.getItems(),
                            t = e.reduce(function(e, t) {
                                return e.push(t.value), e
                            }, []);
                        return t
                    }
                }, {
                    key: "getChoices",
                    value: function() {
                        var e = this.store.getState();
                        return e.choices
                    }
                }, {
                    key: "getChoicesFilteredByActive",
                    value: function() {
                        var e = this.getChoices(),
                            t = e.filter(function(e) {
                                return e.active === !0
                            });
                        return t
                    }
                }, {
                    key: "getChoicesFilteredBySelectable",
                    value: function() {
                        var e = this.getChoices(),
                            t = e.filter(function(e) {
                                return e.disabled !== !0
                            });
                        return t
                    }
                }, {
                    key: "getSearchableChoices",
                    value: function() {
                        var e = this.getChoicesFilteredBySelectable();
                        return e.filter(function(e) {
                            return e.placeholder !== !0
                        })
                    }
                }, {
                    key: "getChoiceById",
                    value: function(e) {
                        if (e) {
                            var t = this.getChoicesFilteredByActive(),
                                i = t.find(function(t) {
                                    return t.id === parseInt(e, 10)
                                });
                            return i
                        }
                        return !1
                    }
                }, {
                    key: "getGroups",
                    value: function() {
                        var e = this.store.getState();
                        return e.groups
                    }
                }, {
                    key: "getGroupsFilteredByActive",
                    value: function() {
                        var e = this.getGroups(),
                            t = this.getChoices(),
                            i = e.filter(function(e) {
                                var i = e.active === !0 && e.disabled === !1,
                                    n = t.some(function(e) {
                                        return e.active === !0 && e.disabled === !1
                                    });
                                return i && n
                            }, []);
                        return i
                    }
                }, {
                    key: "getGroupById",
                    value: function(e) {
                        var t = this.getGroups(),
                            i = t.find(function(t) {
                                return t.id === e
                            });
                        return i
                    }
                }, {
                    key: "getPlaceholderChoice",
                    value: function() {
                        var e = this.getChoices(),
                            t = [].concat(s(e)).reverse().find(function(e) {
                                return e.placeholder === !0
                            });
                        return t
                    }
                }]), e
            }();
        t.default = h, e.exports = h
    }, function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        t.__esModule = !0, t.compose = t.applyMiddleware = t.bindActionCreators = t.combineReducers = t.createStore = void 0;
        var s = i(6),
            r = n(s),
            o = i(21),
            a = n(o),
            c = i(23),
            l = n(c),
            h = i(24),
            u = n(h),
            d = i(25),
            f = n(d),
            p = i(22);
        n(p);
        t.createStore = r.default, t.combineReducers = a.default, t.bindActionCreators = l.default, t.applyMiddleware = u.default, t.compose = f.default
    }, function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function s(e, t, i) {
            function n() {
                g === m && (g = m.slice())
            }

            function r() {
                return v
            }

            function a(e) {
                if ("function" != typeof e) throw new Error("Expected listener to be a function.");
                var t = !0;
                return n(), g.push(e),
                    function() {
                        if (t) {
                            t = !1, n();
                            var i = g.indexOf(e);
                            g.splice(i, 1)
                        }
                    }
            }

            function h(e) {
                if (!(0, o.default)(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
                if ("undefined" == typeof e.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
                if (y) throw new Error("Reducers may not dispatch actions.");
                try {
                    y = !0, v = p(v, e)
                } finally {
                    y = !1
                }
                for (var t = m = g, i = 0; i < t.length; i++) {
                    var n = t[i];
                    n()
                }
                return e
            }

            function u(e) {
                if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
                p = e, h({
                    type: l.INIT
                })
            }

            function d() {
                var e, t = a;
                return e = {
                    subscribe: function(e) {
                        function i() {
                            e.next && e.next(r())
                        }
                        if ("object" != typeof e) throw new TypeError("Expected the observer to be an object.");
                        i();
                        var n = t(i);
                        return {
                            unsubscribe: n
                        }
                    }
                }, e[c.default] = function() {
                    return this
                }, e
            }
            var f;
            if ("function" == typeof t && "undefined" == typeof i && (i = t, t = void 0), "undefined" != typeof i) {
                if ("function" != typeof i) throw new Error("Expected the enhancer to be a function.");
                return i(s)(e, t)
            }
            if ("function" != typeof e) throw new Error("Expected the reducer to be a function.");
            var p = e,
                v = t,
                m = [],
                g = m,
                y = !1;
            return h({
                type: l.INIT
            }), f = {
                dispatch: h,
                subscribe: a,
                getState: r,
                replaceReducer: u
            }, f[c.default] = d, f
        }
        t.__esModule = !0, t.ActionTypes = void 0, t.default = s;
        var r = i(7),
            o = n(r),
            a = i(17),
            c = n(a),
            l = t.ActionTypes = {
                INIT: "@@redux/INIT"
            }
    }, function(e, t, i) {
        function n(e) {
            if (!o(e) || s(e) != a) return !1;
            var t = r(e);
            if (null === t) return !0;
            var i = u.call(t, "constructor") && t.constructor;
            return "function" == typeof i && i instanceof i && h.call(i) == d
        }
        var s = i(8),
            r = i(14),
            o = i(16),
            a = "[object Object]",
            c = Function.prototype,
            l = Object.prototype,
            h = c.toString,
            u = l.hasOwnProperty,
            d = h.call(Object);
        e.exports = n
    }, function(e, t, i) {
        function n(e) {
            return null == e ? void 0 === e ? c : a : l && l in Object(e) ? r(e) : o(e)
        }
        var s = i(9),
            r = i(12),
            o = i(13),
            a = "[object Null]",
            c = "[object Undefined]",
            l = s ? s.toStringTag : void 0;
        e.exports = n
    }, function(e, t, i) {
        var n = i(10),
            s = n.Symbol;
        e.exports = s
    }, function(e, t, i) {
        var n = i(11),
            s = "object" == typeof self && self && self.Object === Object && self,
            r = n || s || Function("return this")();
        e.exports = r
    }, function(e, t) {
        (function(t) {
            var i = "object" == typeof t && t && t.Object === Object && t;
            e.exports = i
        }).call(t, function() {
            return this
        }())
    }, function(e, t, i) {
        function n(e) {
            var t = o.call(e, c),
                i = e[c];
            try {
                e[c] = void 0;
                var n = !0
            } catch (e) {}
            var s = a.call(e);
            return n && (t ? e[c] = i : delete e[c]), s
        }
        var s = i(9),
            r = Object.prototype,
            o = r.hasOwnProperty,
            a = r.toString,
            c = s ? s.toStringTag : void 0;
        e.exports = n
    }, function(e, t) {
        function i(e) {
            return s.call(e)
        }
        var n = Object.prototype,
            s = n.toString;
        e.exports = i
    }, function(e, t, i) {
        var n = i(15),
            s = n(Object.getPrototypeOf, Object);
        e.exports = s
    }, function(e, t) {
        function i(e, t) {
            return function(i) {
                return e(t(i))
            }
        }
        e.exports = i
    }, function(e, t) {
        function i(e) {
            return null != e && "object" == typeof e
        }
        e.exports = i
    }, function(e, t, i) {
        e.exports = i(18)
    }, function(e, t, i) {
        (function(e, n) {
            "use strict";

            function s(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            });
            var r, o = i(20),
                a = s(o);
            r = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof e ? e : n;
            var c = (0, a.default)(r);
            t.default = c
        }).call(t, function() {
            return this
        }(), i(19)(e))
    }, function(e, t) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
        }
    }, function(e, t) {
        "use strict";

        function i(e) {
            var t, i = e.Symbol;
            return "function" == typeof i ? i.observable ? t = i.observable : (t = i("observable"), i.observable = t) : t = "@@observable", t
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.default = i
    }, function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function s(e, t) {
            var i = t && t.type,
                n = i && '"' + i.toString() + '"' || "an action";
            return "Given action " + n + ', reducer "' + e + '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
        }

        function r(e) {
            Object.keys(e).forEach(function(t) {
                var i = e[t],
                    n = i(void 0, {
                        type: a.ActionTypes.INIT
                    });
                if ("undefined" == typeof n) throw new Error('Reducer "' + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
                var s = "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".");
                if ("undefined" == typeof i(void 0, {
                        type: s
                    })) throw new Error('Reducer "' + t + '" returned undefined when probed with a random type. ' + ("Don't try to handle " + a.ActionTypes.INIT + ' or other actions in "redux/*" ') + "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.")
            })
        }

        function o(e) {
            for (var t = Object.keys(e), i = {}, n = 0; n < t.length; n++) {
                var o = t[n];
                "function" == typeof e[o] && (i[o] = e[o])
            }
            var a = Object.keys(i),
                c = void 0;
            try {
                r(i)
            } catch (e) {
                c = e
            }
            return function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                    t = arguments[1];
                if (c) throw c;
                for (var n = !1, r = {}, o = 0; o < a.length; o++) {
                    var l = a[o],
                        h = i[l],
                        u = e[l],
                        d = h(u, t);
                    if ("undefined" == typeof d) {
                        var f = s(l, t);
                        throw new Error(f)
                    }
                    r[l] = d, n = n || d !== u
                }
                return n ? r : e
            }
        }
        t.__esModule = !0, t.default = o;
        var a = i(6),
            c = i(7),
            l = (n(c), i(22));
        n(l)
    }, function(e, t) {
        "use strict";

        function i(e) {
            "undefined" != typeof console && "function" == typeof console.error && console.error(e);
            try {
                throw new Error(e)
            } catch (e) {}
        }
        t.__esModule = !0, t.default = i
    }, function(e, t) {
        "use strict";

        function i(e, t) {
            return function() {
                return t(e.apply(void 0, arguments))
            }
        }

        function n(e, t) {
            if ("function" == typeof e) return i(e, t);
            if ("object" != typeof e || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
            for (var n = Object.keys(e), s = {}, r = 0; r < n.length; r++) {
                var o = n[r],
                    a = e[o];
                "function" == typeof a && (s[o] = i(a, t))
            }
            return s
        }
        t.__esModule = !0, t.default = n
    }, function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }

        function s() {
            for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return function(e) {
                return function(i, n, s) {
                    var o = e(i, n, s),
                        c = o.dispatch,
                        l = [],
                        h = {
                            getState: o.getState,
                            dispatch: function(e) {
                                return c(e)
                            }
                        };
                    return l = t.map(function(e) {
                        return e(h)
                    }), c = a.default.apply(void 0, l)(o.dispatch), r({}, o, {
                        dispatch: c
                    })
                }
            }
        }
        t.__esModule = !0;
        var r = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var i = arguments[t];
                for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n])
            }
            return e
        };
        t.default = s;
        var o = i(25),
            a = n(o)
    }, function(e, t) {
        "use strict";

        function i() {
            for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
            return 0 === t.length ? function(e) {
                return e
            } : 1 === t.length ? t[0] : t.reduce(function(e, t) {
                return function() {
                    return e(t.apply(void 0, arguments))
                }
            })
        }
        t.__esModule = !0, t.default = i
    }, function(e, t, i) {
        "use strict";

        function n(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = i(5),
            r = i(27),
            o = n(r),
            a = i(28),
            c = n(a),
            l = i(29),
            h = n(l),
            u = (0, s.combineReducers)({
                items: o.default,
                groups: c.default,
                choices: h.default
            }),
            d = function(e, t) {
                var i = e;
                return "CLEAR_ALL" === t.type && (i = void 0), u(i, t)
            };
        t.default = d
    }, function(e, t) {
        "use strict";

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                t = arguments[1];
            switch (t.type) {
                case "ADD_ITEM":
                    var n = [].concat(i(e), [{
                        id: t.id,
                        choiceId: t.choiceId,
                        groupId: t.groupId,
                        value: t.value,
                        label: t.label,
                        active: !0,
                        highlighted: !1,
                        customProperties: t.customProperties,
                        placeholder: t.placeholder || !1,
                        keyCode: null
                    }]);
                    return n.map(function(e) {
                        var t = e;
                        return t.highlighted && (t.highlighted = !1), t
                    });
                case "REMOVE_ITEM":
                    return e.map(function(e) {
                        var i = e;
                        return i.id === t.id && (i.active = !1), i
                    });
                case "HIGHLIGHT_ITEM":
                    return e.map(function(e) {
                        var i = e;
                        return i.id === t.id && (i.highlighted = t.highlighted), i
                    });
                default:
                    return e
            }
        };
        t.default = n
    }, function(e, t) {
        "use strict";

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                t = arguments[1];
            switch (t.type) {
                case "ADD_GROUP":
                    return [].concat(i(e), [{
                        id: t.id,
                        value: t.value,
                        active: t.active,
                        disabled: t.disabled
                    }]);
                case "CLEAR_CHOICES":
                    return [];
                default:
                    return e
            }
        };
        t.default = n
    }, function(e, t) {
        "use strict";

        function i(e) {
            if (Array.isArray(e)) {
                for (var t = 0, i = Array(e.length); t < e.length; t++) i[t] = e[t];
                return i
            }
            return Array.from(e)
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var n = function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
                t = arguments[1];
            switch (t.type) {
                case "ADD_CHOICE":
                    return [].concat(i(e), [{
                        id: t.id,
                        elementId: t.elementId,
                        groupId: t.groupId,
                        value: t.value,
                        label: t.label || t.value,
                        disabled: t.disabled || !1,
                        selected: !1,
                        active: !0,
                        score: 9999,
                        customProperties: t.customProperties,
                        placeholder: t.placeholder || !1,
                        keyCode: null
                    }]);
                case "ADD_ITEM":
                    var n = e;
                    return t.activateOptions && (n = e.map(function(e) {
                        var i = e;
                        return i.active = t.active, i
                    })), t.choiceId > -1 && (n = e.map(function(e) {
                        var i = e;
                        return i.id === parseInt(t.choiceId, 10) && (i.selected = !0), i
                    })), n;
                case "REMOVE_ITEM":
                    return t.choiceId > -1 ? e.map(function(e) {
                        var i = e;
                        return i.id === parseInt(t.choiceId, 10) && (i.selected = !1), i
                    }) : e;
                case "FILTER_CHOICES":
                    var s = t.results,
                        r = e.map(function(e) {
                            var t = e;
                            return t.active = s.some(function(e) {
                                return e.item.id === t.id && (t.score = e.score, !0)
                            }), t
                        });
                    return r;
                case "ACTIVATE_CHOICES":
                    return e.map(function(e) {
                        var i = e;
                        return i.active = t.active, i
                    });
                case "CLEAR_CHOICES":
                    return [];
                default:
                    return e
            }
        };
        t.default = n
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        t.addItem = function(e, t, i, n, s, r, o, a) {
            return {
                type: "ADD_ITEM",
                value: e,
                label: t,
                id: i,
                choiceId: n,
                groupId: s,
                customProperties: r,
                placeholder: o,
                keyCode: a
            }
        }, t.removeItem = function(e, t) {
            return {
                type: "REMOVE_ITEM",
                id: e,
                choiceId: t
            }
        }, t.highlightItem = function(e, t) {
            return {
                type: "HIGHLIGHT_ITEM",
                id: e,
                highlighted: t
            }
        }, t.addChoice = function(e, t, i, n, s, r, o, a, c) {
            return {
                type: "ADD_CHOICE",
                value: e,
                label: t,
                id: i,
                groupId: n,
                disabled: s,
                elementId: r,
                customProperties: o,
                placeholder: a,
                keyCode: c
            }
        }, t.filterChoices = function(e) {
            return {
                type: "FILTER_CHOICES",
                results: e
            }
        }, t.activateChoices = function() {
            var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0];
            return {
                type: "ACTIVATE_CHOICES",
                active: e
            }
        }, t.clearChoices = function() {
            return {
                type: "CLEAR_CHOICES"
            }
        }, t.addGroup = function(e, t, i, n) {
            return {
                type: "ADD_GROUP",
                value: e,
                id: t,
                active: i,
                disabled: n
            }
        }, t.clearAll = function() {
            return {
                type: "CLEAR_ALL"
            }
        }
    }, function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            } : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            },
            n = (t.capitalise = function(e) {
                return e.replace(/\w\S*/g, function(e) {
                    return e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()
                })
            }, t.generateChars = function(e) {
                for (var t = "", i = 0; i < e; i++) {
                    var n = a(0, 36);
                    t += n.toString(36)
                }
                return t
            }),
            s = (t.generateId = function(e, t) {
                var i = e.id || e.name && e.name + "-" + n(2) || n(4);
                return i = i.replace(/(:|\.|\[|\]|,)/g, ""), i = t + i
            }, t.getType = function(e) {
                return Object.prototype.toString.call(e).slice(8, -1)
            }),
            r = t.isType = function(e, t) {
                var i = s(t);
                return void 0 !== t && null !== t && i === e
            },
            o = (t.isNode = function(e) {
                return "object" === ("undefined" == typeof Node ? "undefined" : i(Node)) ? e instanceof Node : e && "object" === ("undefined" == typeof e ? "undefined" : i(e)) && "number" == typeof e.nodeType && "string" == typeof e.nodeName
            }, t.isElement = function(e) {
                return "object" === ("undefined" == typeof HTMLElement ? "undefined" : i(HTMLElement)) ? e instanceof HTMLElement : e && "object" === ("undefined" == typeof e ? "undefined" : i(e)) && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName;
            }, t.extend = function e() {
                for (var t = {}, i = arguments.length, n = function(i) {
                        for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (r("Object", i[n]) ? t[n] = e(!0, t[n], i[n]) : t[n] = i[n])
                    }, s = 0; s < i; s++) {
                    var o = arguments[s];
                    r("Object", o) && n(o)
                }
                return t
            }, t.whichTransitionEvent = function() {
                var e = void 0,
                    t = document.createElement("fakeelement"),
                    i = {
                        transition: "transitionend",
                        OTransition: "oTransitionEnd",
                        MozTransition: "transitionend",
                        WebkitTransition: "webkitTransitionEnd"
                    };
                for (e in i)
                    if (void 0 !== t.style[e]) return i[e]
            }, t.whichAnimationEvent = function() {
                var e = void 0,
                    t = document.createElement("fakeelement"),
                    i = {
                        animation: "animationend",
                        OAnimation: "oAnimationEnd",
                        MozAnimation: "animationend",
                        WebkitAnimation: "webkitAnimationEnd"
                    };
                for (e in i)
                    if (void 0 !== t.style[e]) return i[e]
            }),
            a = (t.getParentsUntil = function(e, t, i) {
                for (var n = []; e && e !== document; e = e.parentNode) {
                    if (t) {
                        var s = t.charAt(0);
                        if ("." === s && e.classList.contains(t.substr(1))) break;
                        if ("#" === s && e.id === t.substr(1)) break;
                        if ("[" === s && e.hasAttribute(t.substr(1, t.length - 1))) break;
                        if (e.tagName.toLowerCase() === t) break
                    }
                    if (i) {
                        var r = i.charAt(0);
                        "." === r && e.classList.contains(i.substr(1)) && n.push(e), "#" === r && e.id === i.substr(1) && n.push(e), "[" === r && e.hasAttribute(i.substr(1, i.length - 1)) && n.push(e), e.tagName.toLowerCase() === i && n.push(e)
                    } else n.push(e)
                }
                return 0 === n.length ? null : n
            }, t.wrap = function(e, t) {
                return t = t || document.createElement("div"), e.nextSibling ? e.parentNode.insertBefore(t, e.nextSibling) : e.parentNode.appendChild(t), t.appendChild(e)
            }, t.getSiblings = function(e) {
                for (var t = [], i = e.parentNode.firstChild; i; i = i.nextSibling) 1 === i.nodeType && i !== e && t.push(i);
                return t
            }, t.findAncestor = function(e, t) {
                for (;
                    (e = e.parentElement) && !e.classList.contains(t););
                return e
            }, t.findAncestorByAttrName = function(e, t) {
                for (var i = e; i;) {
                    if (i.hasAttribute(t)) return i;
                    i = i.parentElement
                }
                return null
            }, t.debounce = function(e, t, i) {
                var n = void 0;
                return function() {
                    var s = this,
                        r = arguments,
                        o = function() {
                            n = null, i || e.apply(s, r)
                        },
                        a = i && !n;
                    clearTimeout(n), n = setTimeout(o, t), a && e.apply(s, r)
                }
            }, t.getElemDistance = function(e) {
                var t = 0;
                if (e.offsetParent)
                    do t += e.offsetTop, e = e.offsetParent; while (e);
                return t >= 0 ? t : 0
            }, t.getElementOffset = function(e, t) {
                var i = t;
                return i > 1 && (i = 1), i > 0 && (i = 0), Math.max(e.offsetHeight * i)
            }, t.getAdjacentEl = function(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                if (e && t) {
                    var n = e.parentNode.parentNode,
                        s = Array.from(n.querySelectorAll(t)),
                        r = s.indexOf(e),
                        o = i > 0 ? 1 : -1;
                    return s[r + o]
                }
            }, t.getScrollPosition = function(e) {
                return "bottom" === e ? Math.max((window.scrollY || window.pageYOffset) + (window.innerHeight || document.documentElement.clientHeight)) : window.scrollY || window.pageYOffset
            }, t.isInView = function(e, t, i) {
                return this.getScrollPosition(t) > this.getElemDistance(e) + this.getElementOffset(e, i)
            }, t.isScrolledIntoView = function(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
                if (e) {
                    var n = void 0;
                    return n = i > 0 ? t.scrollTop + t.offsetHeight >= e.offsetTop + e.offsetHeight : e.offsetTop >= t.scrollTop
                }
            }, t.stripHTML = function(e) {
                var t = document.createElement("DIV");
                return t.innerHTML = e, t.textContent || t.innerText || ""
            }, t.addAnimation = function(e, t) {
                var i = o(),
                    n = function n() {
                        e.classList.remove(t), e.removeEventListener(i, n, !1)
                    };
                e.classList.add(t), e.addEventListener(i, n, !1)
            }, t.getRandomNumber = function(e, t) {
                return Math.floor(Math.random() * (t - e) + e)
            }),
            c = t.strToEl = function() {
                var e = document.createElement("div");
                return function(t) {
                    var i = t.trim(),
                        n = void 0;
                    for (e.innerHTML = i, n = e.children[0]; e.firstChild;) e.removeChild(e.firstChild);
                    return n
                }
            }();
        t.getWidthOfInput = function(e) {
            var t = e.value || e.placeholder,
                i = e.offsetWidth;
            if (t) {
                var n = c("<span>" + t + "</span>");
                if (n.style.position = "absolute", n.style.padding = "0", n.style.top = "-9999px", n.style.left = "-9999px", n.style.width = "auto", n.style.whiteSpace = "pre", document.body.contains(e) && window.getComputedStyle) {
                    var s = window.getComputedStyle(e);
                    s && (n.style.fontSize = s.fontSize, n.style.fontFamily = s.fontFamily, n.style.fontWeight = s.fontWeight, n.style.fontStyle = s.fontStyle, n.style.letterSpacing = s.letterSpacing, n.style.textTransform = s.textTransform, n.style.padding = s.padding)
                }
                document.body.appendChild(n), t && n.offsetWidth !== e.offsetWidth && (i = n.offsetWidth + 4), document.body.removeChild(n)
            }
            return i + "px"
        }, t.sortByAlpha = function(e, t) {
            var i = (e.label || e.value).toLowerCase(),
                n = (t.label || t.value).toLowerCase();
            return i < n ? -1 : i > n ? 1 : 0
        }, t.sortByScore = function(e, t) {
            return e.score - t.score
        }, t.triggerEvent = function(e, t) {
            var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
                n = new CustomEvent(t, {
                    detail: i,
                    bubbles: !0,
                    cancelable: !0
                });
            return e.dispatchEvent(n)
        }, t.regexFilter = function(e, t) {
            if (!e || !t) return !1;
            var i = new RegExp(t.source, "i");
            return i.test(e)
        }
    }, function(e, t) {
        "use strict";
        ! function() {
            function e(e, t) {
                t = t || {
                    bubbles: !1,
                    cancelable: !1,
                    detail: void 0
                };
                var i = document.createEvent("CustomEvent");
                return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
            }
            Array.from || (Array.from = function() {
                var e = Object.prototype.toString,
                    t = function(t) {
                        return "function" == typeof t || "[object Function]" === e.call(t)
                    },
                    i = function(e) {
                        var t = Number(e);
                        return isNaN(t) ? 0 : 0 !== t && isFinite(t) ? (t > 0 ? 1 : -1) * Math.floor(Math.abs(t)) : t
                    },
                    n = Math.pow(2, 53) - 1,
                    s = function(e) {
                        var t = i(e);
                        return Math.min(Math.max(t, 0), n)
                    };
                return function(e) {
                    var i = this,
                        n = Object(e);
                    if (null == e) throw new TypeError("Array.from requires an array-like object - not null or undefined");
                    var r = arguments.length > 1 ? arguments[1] : void 0,
                        o = void 0;
                    if ("undefined" != typeof r) {
                        if (!t(r)) throw new TypeError("Array.from: when provided, the second argument must be a function");
                        arguments.length > 2 && (o = arguments[2])
                    }
                    for (var a = s(n.length), c = t(i) ? Object(new i(a)) : new Array(a), l = 0, h = void 0; l < a;) h = n[l], r ? c[l] = "undefined" == typeof o ? r(h, l) : r.call(o, h, l) : c[l] = h, l += 1;
                    return c.length = a, c
                }
            }()), Array.prototype.find || (Array.prototype.find = function(e) {
                if (null == this) throw new TypeError("Array.prototype.find called on null or undefined");
                if ("function" != typeof e) throw new TypeError("predicate must be a function");
                for (var t = Object(this), i = t.length >>> 0, n = arguments[1], s = void 0, r = 0; r < i; r++)
                    if (s = t[r], e.call(n, s, r, t)) return s
            }), e.prototype = window.Event.prototype, window.CustomEvent = e
        }()
    }])
});
$(".multipleSelect").each(function() {
    var multipleCancelButton = new Choices(this, {
        removeItemButton: true,
        shouldSort: false
    });
});
$(".singleSelect").each(function() {
    var singlesSelect = new Choices(this, {
        placeholder: true,
        shouldSort: false
    });
});
var placesAutocompleteArray = [];

function initAutocomplete() {
    // Create the autocomplete object, restricting the search to geographical
    // location types.
    if ($(".places-autocomplete").length) {

        // Initialise autocompleteObjects
        $(".places-autocomplete").each(function(index) {
            placesAutocompleteArray.push(new google.maps.places.Autocomplete(this, {
                types: ['geocode']
            }));
        });


        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var geolocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: position.coords.accuracy
                });
                // add geo location to all map autocomplete objects
                for (i = 0; i < placesAutocompleteArray.length; i++) {
                    placesAutocompleteArray[i].setBounds(circle.getBounds());
                }

            });
        }
    }
}
/* 
	AddEvent; Add to Calendar, v1.6.1 <http://addevent.com>
	Copyright (C) 2012-2018 AddEvent(R), Inc.
	@author Michael Nilsson
*/
function $d(e) {
    return document.getElementById(e)
}
var addeventatc = function() {
    var e, t, a, n, o, d = !1,
        c = 1,
        i = !1,
        l = !0,
        r = !1,
        s = !1,
        p = !1,
        u = 1,
        v = "",
        m = !0,
        g = !0,
        h = !0,
        f = !0,
        b = !0,
        w = !0,
        x = "Apple Calendar",
        k = "Google <em>(online)</em>",
        y = "Outlook",
        _ = "Outlook.com <em>(online)</em>",
        T = "Yahoo <em>(online)</em>",
        z = "Facebook Event",
        E = null,
        N = null,
        C = null,
        I = null,
        $ = null,
        A = null,
        L = !1;
    return {
        initialize: function() {
            if (!d) {
                d = !0;
                try {
                    addeventasync()
                } catch (e) {}
                "https:", "addevent.com", "https://addevent.com", e = "undefined" != typeof SVGRect ? "https://www.addevent.com/gfx/icon-calendar-t1.svg" : "https://www.addevent.com/gfx/icon-calendar-t5.png", addeventatc.trycss(), addeventatc.generate()
            }
        },
        generate: function() {
            for (var e = document.getElementsByTagName("*"), t = 0; t < e.length; t += 1) addeventatc.hasclass(e[t], "addeventatc") && function() {
                var a = "addeventatc" + c;
                e[t].id = a, e[t].title = "", e[t].style.visibility = "visible", e[t].setAttribute("aria-haspopup", "true"), e[t].setAttribute("aria-expanded", "false"), e[t].setAttribute("tabindex", "0"), i ? (e[t].onclick = function() {
                    return !1
                }, e[t].onmouseover = function() {
                    clearTimeout(n), addeventatc.toogle(this, {
                        type: "mouseenter",
                        id: a
                    })
                }, e[t].onmouseout = function() {
                    n = setTimeout(function() {
                        addeventatc.mouseout(this, {
                            type: "mouseout",
                            id: a
                        })
                    }, 100)
                }) : (e[t].onclick = function() {
                    return addeventatc.toogle(this, {
                        type: "click",
                        id: a
                    }), !1
                }, e[t].onmouseover = function() {}, e[t].onmouseout = function() {}), e[t].onkeydown = function(e) {
                    var t = e.which || e.keyCode;
                    "13" != t && "32" != t && "27" != t && "38" != t && "40" != t || e.preventDefault(), "13" != t && "32" != t || (addeventatc.keyboardclick(this, {
                        type: "click",
                        id: a
                    }), addeventatc.toogle(this, {
                        type: "click",
                        id: a,
                        keynav: !0
                    })), "27" == t && addeventatc.hideandreset(), "38" == t && addeventatc.keyboard(this, {
                        type: "keyboard",
                        id: a,
                        key: "up"
                    }), "40" == t && addeventatc.keyboard(this, {
                        type: "keyboard",
                        id: a,
                        key: "down"
                    }), L = !0
                }, e[t].onblur = function() {
                    L && setTimeout(function() {
                        addeventatc.hideandreset()
                    }, 300)
                };
                var o = e[t];
                if ("none" != e[t].getAttribute("data-styling") && "inline-buttons" != e[t].getAttribute("data-render") || (l = !1), l) {
                    var d = document.createElement("span");
                    d.className = "addeventatc_icon", o.appendChild(d)
                } else {
                    addeventatc.hideandreset()
                }
                c++, r = !0;
                for (var s = e[t].getElementsByTagName("*"), p = 0; p < s.length; p += 1) addeventatc.hasclass(s[p], "atc_node") || ("" != s[p].className ? s[p].className += " atc_node" : s[p].className += "atc_node");

                if ("inline-buttons" === e[t].getAttribute("data-render")) {
                    console.log(e[t])
                    e[t].onclick = function() {}, addeventatc.toogle(e[t], {
                        type: "render",
                        id: a
                    }), e[t].setAttribute("aria-expanded", "true"), e[t].removeAttribute("tabindex"), e[t].onkeydown = function() {}, e[t].blur = function() {};
                    var u = document.getElementById(a + "-drop");
                    if (u) {
                        u.setAttribute("aria-hidden", "false");
                        for (s = u.getElementsByTagName("SPAN"), p = 0; p < s.length; p += 1) {
                            s[p];
                            s[p].tabIndex = "0", s[p].onkeydown = function(e) {
                                var t = e.which || e.keyCode;
                                "13" != t && "32" != t || e.target.click()
                            }
                        }
                    }
                }
            }();
            u = addeventatc.topzindex(), l ? addeventatc.applycss() : (addeventatc.removeelement($d("ate_css")), addeventatc.removeelement($d("ate_tmp_css")), addeventatc.helpercss()), r && !s && (s = !0, addeventatc.track({
                typ: "exposure",
                cal: ""
            }))
        },
        toogle: function(e, n) {
            var o, d, c, i = !1,
                l = "";
            if (d = $d(o = e.id)) {
                c = d.getAttribute("data-direct");
                var r = d.getAttribute("data-intel"),
                    s = d.getAttribute("data-intel-apple");
                if ("ios" == addeventatc.agent() && "click" == n.type && "true" !== s && "false" !== r && (c = "appleical", d.setAttribute("data-intel-apple", "true")), "outlook" == c || "google" == c || "yahoo" == c || "hotmail" == c || "outlookcom" == c || "appleical" == c || "apple" == c || "facebook" == c) "click" == n.type && (addeventatc.click({
                    button: o,
                    service: c,
                    id: n.id
                }), null != E && addeventatc.trigger("button_click", {
                    id: o
                }));
                else if ("mouseover" == n.type && a != d && (p = !1), "click" == n.type || "render" == n.type || "mouseover" == n.type && !p) {
                    "mouseover" == n.type && (p = !0, null != N && addeventatc.trigger("button_mouseover", {
                        id: o
                    })), i = addeventatc.getburl({
                        id: o,
                        facebook: !0
                    }), "" == v && (v = "appleical,google,outlook,outlookcom,yahoo,facebook");
                    for (var u = (v = (v += ",").replace(/ /gi, "")).split(","), C = 0; C < u.length; C += 1)(m && "ical" == u[C] || m && "appleical" == u[C]) && (l += '<span class="ateappleical" id="' + o + '-appleical" role="menuitem">' + x + "</span>"), g && "google" == u[C] && (l += '<span class="ategoogle" id="' + o + '-google" role="menuitem">' + k + "</span>"), h && "outlook" == u[C] && (l += '<span class="ateoutlook" id="' + o + '-outlook" role="menuitem">' + y + "</span>"), (f && "hotmail" == u[C] || f && "outlookcom" == u[C]) && (l += '<span class="ateoutlookcom" id="' + o + '-outlookcom" role="menuitem">' + _ + "</span>"), b && "yahoo" == u[C] && (l += '<span class="ateyahoo" id="' + o + '-yahoo" role="menuitem">' + T + "</span>"), i && "facebook" == u[C] && w && "facebook" == u[C] && (l += '<span class="atefacebook" id="' + o + '-facebook" role="menuitem">' + z + "</span>");
                    if (addeventatc.getlicense(t) || (l += '<em class="copyx"><em class="brx"></em><em class="frs"><a href="https://www.addevent.com" title="" tabindex="-1" id="' + o + '-home">AddEvent.com</a></em></em>'), !$d(o + "-drop")) {
                        var I = document.createElement("span");
                        I.id = o + "-drop", I.className = "addeventatc_dropdown", I.setAttribute("aria-hidden", "true"), I.setAttribute("aria-labelledby", o), I.innerHTML = l, d.appendChild(I)
                    }
                    $d(o + "-appleical") && ($d(o + "-appleical").onclick = function() {
                        addeventatc.click({
                            button: o,
                            service: "appleical",
                            id: n.id
                        })
                    }), $d(o + "-google") && ($d(o + "-google").onclick = function() {
                        addeventatc.click({
                            button: o,
                            service: "google",
                            id: n.id
                        })
                    }), $d(o + "-outlook") && ($d(o + "-outlook").onclick = function() {
                        addeventatc.click({
                            button: o,
                            service: "outlook",
                            id: n.id
                        })
                    }), $d(o + "-outlookcom") && ($d(o + "-outlookcom").onclick = function() {
                        addeventatc.click({
                            button: o,
                            service: "outlookcom",
                            id: n.id
                        })
                    }), $d(o + "-yahoo") && ($d(o + "-yahoo").onclick = function() {
                        addeventatc.click({
                            button: o,
                            service: "yahoo",
                            id: n.id
                        })
                    }), $d(o + "-facebook") && ($d(o + "-facebook").onclick = function() {
                        addeventatc.click({
                            button: o,
                            service: "facebook",
                            id: n.id
                        })
                    }), $d(o + "-home") && ($d(o + "-home").onclick = function() {
                        addeventatc.click({
                            button: o,
                            service: "home",
                            id: n.id
                        })
                    }), addeventatc.show(o, n)
                }
                return a = d, !1
            }
        },
        click: function(e) {
            var t, a, n, o = location.origin,
                d = !0;
            if (void 0 === location.origin && (o = location.protocol + "//" + location.host), t = $d(e.button)) {
                if ("home" == e.service) n = "https://www.addevent.com";
                else {
                    a = addeventatc.getburl({
                        id: e.button,
                        facebook: !1
                    }), n = "https://www.addevent.com/create/?service=" + e.service + a + "&reference=" + o, "outlook" != e.service && "appleical" != e.service || (d = !1, addeventatc.usewebcal() && (n = "webcal://www.addevent.com/create/?uwc=on&service=" + e.service + a + "&reference=" + o));
                    var c = t.getAttribute("data-id");
                    null !== c && (n = "https://www.addevent.com/event/" + c + "+" + e.service)
                }
                if (!$d("atecllink")) {
                    var i = document.createElement("a");
                    i.id = "atecllink", i.rel = "external", i.setAttribute("data-role", "none"), i.innerHTML = "{addeventatc-ghost-link}", i.style.display = "none", document.body.appendChild(i)
                }
                var l = $d("atecllink");
                if (l.target = d ? "_blank" : "_self", l.href = n, addeventatc.eclick("atecllink"), addeventatc.track({
                        typ: "click",
                        cal: e.service
                    }), null != A) {
                    addeventatc.trigger("button_dropdown_click", {
                        id: e.button,
                        service: e.service
                    });
                    try {
                        (event || window.event).stopPropagation()
                    } catch (e) {}
                }
            }
        },
        mouseout: function(e, t) {
            p = !1, addeventatc.hideandreset(), null != C && addeventatc.trigger("button_mouseout", {
                id: t.id
            })
        },
        show: function(e, t) {
            var a = $d(e),
                n = $d(e + "-drop");
            if (a && n)
                if ("block" == addeventatc.getstyle(n, "display")) addeventatc.hideandreset();
                else {
                    addeventatc.hideandreset(!0), n.style.display = "block", a.style.outline = "0", a.style.zIndex = u + 1, a.className = a.className + " addeventatc-selected", a.className = a.className.replace(/\s+/g, " "), a.setAttribute("aria-expanded", "true"), n.setAttribute("aria-hidden", "false"), t.keynav && addeventatc.keyboard(this, {
                        type: "keyboard",
                        id: e,
                        key: "down"
                    });
                    var o = a.getAttribute("data-dropdown-x"),
                        d = a.getAttribute("data-dropdown-y"),
                        c = "auto",
                        i = "auto";
                    null != o && (i = o), null != d && (c = d), n.style.left = "0px", n.style.top = "0px", n.style.display = "block";
                    var l = parseInt(a.offsetHeight),
                        r = parseInt(a.offsetWidth),
                        s = parseInt(n.offsetHeight),
                        p = parseInt(n.offsetWidth),
                        v = addeventatc.viewport(),
                        m = parseInt(v.w),
                        g = parseInt(v.h),
                        h = parseInt(v.x),
                        f = parseInt(v.y),
                        b = addeventatc.elementposition(n),
                        w = parseInt(b.x),
                        x = parseInt(b.y) + s,
                        k = g + f,
                        y = 0,
                        _ = 0;
                    "down" == c && "left" == i ? (y = "0px", _ = l + "px") : "up" == c && "left" == i ? (y = "0px", _ = -s + "px") : "down" == c && "right" == i ? (y = -(p - r) + "px", _ = l + "px") : "up" == c && "right" == i ? (y = -(p - r) + "px", _ = -s + "px") : "auto" == c && "left" == i ? (y = "0px", _ = x > k ? -s + "px" : l + "px") : "auto" == c && "right" == i ? (y = -(p - r) + "px", _ = x > k ? -s + "px" : l + "px") : (_ = x > k ? -s + "px" : l + "px", y = w + p > m + h ? -(p - r) + "px" : "0px"), n.style.left = y, n.style.top = _, "click" == t.type && null != E && addeventatc.trigger("button_click", {
                        id: e
                    }), null != I && addeventatc.trigger("button_dropdown_show", {
                        id: e
                    })
                }
        },
        hide: function(e) {
            var t = !1;
            ("string" == typeof e && "" !== e || e instanceof String && "" !== e) && (e.indexOf("addeventatc") > -1 || e.indexOf("atc_node") > -1) && (t = !0), t || addeventatc.hideandreset()
        },
        hideandreset: function(e) {
            for (var t = "", a = document.getElementsByTagName("*"), n = 0; n < a.length; n += 1)
                if (addeventatc.hasclass(a[n], "addeventatc")) {
                    a[n].className = a[n].className.replace(/addeventatc-selected/gi, ""), a[n].className = a[n].className.replace(/\s+$/, ""), a[n].style.zIndex = "auto", a[n].style.outline = "";
                    var o = $d(a[n].id + "-drop");
                    if (o) {
                        var d = addeventatc.getstyle(o, "display");
                        "block" == d && (t = a[n].id), o.style.display = "none", "block" !== (d = addeventatc.getstyle(o, "display")) && (a[n].setAttribute("aria-expanded", "false"), o.setAttribute("aria-hidden", "true"));
                        for (var c = o.getElementsByTagName("SPAN"), i = 0; i < c.length; i += 1) {
                            var l = new RegExp("(\\s|^)drop_markup(\\s|$)");
                            c[i].className = c[i].className.replace(l, " "), c[i].className = c[i].className.replace(/\s+$/, "")
                        }
                    }
                }
            e || null != $ && addeventatc.trigger("button_dropdown_hide", {
                id: t
            })
        },
        getburl: function(e) {
            var t = $d(e.id),
                a = "",
                n = !1;
            if (t) {
                for (var o = t.getElementsByTagName("*"), d = 0; d < o.length; d += 1)(addeventatc.hasclass(o[d], "_start") || addeventatc.hasclass(o[d], "start")) && (a += "&dstart=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_end") || addeventatc.hasclass(o[d], "end")) && (a += "&dend=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_zonecode") || addeventatc.hasclass(o[d], "zonecode")) && (a += "&dzone=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_timezone") || addeventatc.hasclass(o[d], "timezone")) && (a += "&dtime=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_summary") || addeventatc.hasclass(o[d], "summary") || addeventatc.hasclass(o[d], "title")) && (a += "&dsum=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_description") || addeventatc.hasclass(o[d], "description")) && (a += "&ddesc=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_location") || addeventatc.hasclass(o[d], "location")) && (a += "&dloca=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_organizer") || addeventatc.hasclass(o[d], "organizer")) && (a += "&dorga=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_organizer_email") || addeventatc.hasclass(o[d], "organizer_email")) && (a += "&dorgaem=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_attendees") || addeventatc.hasclass(o[d], "attendees")) && (a += "&datte=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_all_day_event") || addeventatc.hasclass(o[d], "all_day_event")) && (a += "&dallday=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_date_format") || addeventatc.hasclass(o[d], "date_format")) && (a += "&dateformat=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_alarm_reminder") || addeventatc.hasclass(o[d], "alarm_reminder")) && (a += "&alarm=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_recurring") || addeventatc.hasclass(o[d], "recurring")) && (a += "&drule=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_facebook_event") || addeventatc.hasclass(o[d], "facebook_event")) && (a += "&fbevent=" + encodeURIComponent(o[d].innerHTML), n = !0), (addeventatc.hasclass(o[d], "_client") || addeventatc.hasclass(o[d], "client")) && (a += "&client=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_calname") || addeventatc.hasclass(o[d], "calname")) && (a += "&calname=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_uid") || addeventatc.hasclass(o[d], "uid")) && (a += "&uid=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_status") || addeventatc.hasclass(o[d], "status")) && (a += "&status=" + encodeURIComponent(o[d].innerHTML)), (addeventatc.hasclass(o[d], "_method") || addeventatc.hasclass(o[d], "method")) && (a += "&method=" + encodeURIComponent(o[d].innerHTML));
                "false" == t.getAttribute("data-google-api") && (a += "&gapi=false")
            }
            return e.facebook && (a = n), a
        },
        trycss: function() {
            if (!$d("ate_tmp_css")) {
                try {
                    var e = "";
                    e = ".addeventatc {visibility:hidden;}", e += ".addeventatc .data {display:none!important;}", e += ".addeventatc .start, .addeventatc .end, .addeventatc .timezone, .addeventatc .title, .addeventatc .description, .addeventatc .location, .addeventatc .organizer, .addeventatc .organizer_email, .addeventatc .facebook_event, .addeventatc .all_day_event, .addeventatc .date_format, .addeventatc .alarm_reminder, .addeventatc .recurring, .addeventatc .attendees, .addeventatc .client, .addeventatc .calname, .addeventatc .uid, .addeventatc .status, .addeventatc .method {display:none!important;}", l && (e += ".addeventatc {background-image:url(https://www.addevent.com/gfx/icon-calendar-t5.png), url(https://www.addevent.com/gfx/icon-calendar-t1.svg), url(https://www.addevent.com/gfx/icon-apple-t1.svg), url(https://www.addevent.com/gfx/icon-facebook-t1.svg), url(https://www.addevent.com/gfx/icon-google-t1.svg), url(https://www.addevent.com/gfx/icon-outlook-t1.svg), url(https://www.addevent.com/gfx/icon-yahoo-t1.svg);background-position:-9999px -9999px;background-repeat:no-repeat;}");
                    var t = document.createElement("style");
                    t.type = "text/css", t.id = "ate_tmp_css", t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e)), document.getElementsByTagName("head")[0].appendChild(t)
                } catch (e) {}
                addeventatc.track({
                    typ: "jsinit",
                    cal: ""
                })
            }
        },
        applycss: function() {
            if (!$d("ate_css")) {
                var a = "";
                a += '.addeventatc {display:inline-block;*display:inline;zoom:1;position:relative;z-index:1;font-family:Roboto,"Helvetica Neue",Helvetica,Optima,Segoe,"Segoe UI",Candara,Calibri,Arial,sans-serif;color:#000!important;font-weight:300;line-height:100%!important;background-color:#fff;border:1px solid;border-color:#e5e6e9 #dfe0e4 #d0d1d5;font-size:15px;text-decoration:none;padding:13px 12px 12px 43px;-webkit-border-radius:3px;border-radius:3px;cursor:pointer;-webkit-font-smoothing:antialiased!important;text-shadow:1px 1px 1px rgba(0,0,0,0.004);-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);background-image:url(https://www.addevent.com/gfx/icon-calendar-t5.png), url(https://www.addevent.com/gfx/icon-calendar-t1.svg), url(https://www.addevent.com/gfx/icon-apple-t1.svg), url(https://www.addevent.com/gfx/icon-facebook-t1.svg), url(https://www.addevent.com/gfx/icon-google-t1.svg), url(https://www.addevent.com/gfx/icon-outlook-t1.svg), url(https://www.addevent.com/gfx/icon-yahoo-t1.svg);background-position:-9999px -9999px;background-repeat:no-repeat;}', a += ".addeventatc:hover {border:1px solid #aab9d4;color:#000;font-size:15px;text-decoration:none;}", a += ".addeventatc:focus {outline:none;border:1px solid #aab9d4;}", a += ".addeventatc:active {top:1px;}", a += ".addeventatc-selected {background-color:#f9f9f9;}", a += ".addeventatc .addeventatc_icon {width:18px;height:18px;position:absolute;z-index:1;left:12px;top:10px;background:url(" + e + ") no-repeat;background-size:18px 18px;}", a += ".addeventatc .start, .addeventatc .end, .addeventatc .timezone, .addeventatc .title, .addeventatc .description, .addeventatc .location, .addeventatc .organizer, .addeventatc .organizer_email, .addeventatc .facebook_event, .addeventatc .all_day_event, .addeventatc .date_format, .addeventatc .alarm_reminder, .addeventatc .recurring, .addeventatc .attendees, .addeventatc .client, .addeventatc .calname, .addeventatc .uid, .addeventatc .status, .addeventatc .method {display:none!important;}", a += ".addeventatc .data {display:none!important;}", a += ".addeventatc br {display:none;}", addeventatc.getlicense(t) ? a += ".addeventatc_dropdown {width:200px;position:absolute;z-index:99999;padding:6px 0px 6px 0px;background:#fff;text-align:left;display:none;margin-top:-2px;margin-left:-1px;border-top:1px solid #c8c8c8;border-right:1px solid #bebebe;border-bottom:1px solid #a8a8a8;border-left:1px solid #bebebe;-moz-border-radius:2px;-webkit-border-radius:2px;-webkit-box-shadow:1px 3px 6px rgba(0,0,0,0.15);-moz-box-shadow:1px 3px 6px rgba(0,0,0,0.15);box-shadow:1px 3px 6px rgba(0,0,0,0.15);}" : a += ".addeventatc_dropdown {width:200px;position:absolute;z-index:99999;padding:6px 0px 0px 0px;background:#fff;text-align:left;display:none;margin-top:-2px;margin-left:-1px;border-top:1px solid #c8c8c8;border-right:1px solid #bebebe;border-bottom:1px solid #a8a8a8;border-left:1px solid #bebebe;-moz-border-radius:2px;-webkit-border-radius:2px;-webkit-box-shadow:1px 3px 6px rgba(0,0,0,0.15);-moz-box-shadow:1px 3px 6px rgba(0,0,0,0.15);box-shadow:1px 3px 6px rgba(0,0,0,0.15);}", a += ".addeventatc_dropdown span {display:block;line-height:100%;background:#fff;text-decoration:none;font-size:14px;color:#333;padding:9px 10px 9px 40px;}", a += ".addeventatc_dropdown span:hover {background-color:#f4f4f4;color:#000;text-decoration:none;font-size:14px;}", a += ".addeventatc_dropdown .drop_markup {background-color:#f4f4f4;color:#000;text-decoration:none;font-size:14px;}", a += ".addeventatc_dropdown .copyx {height:21px;display:block;position:relative;cursor:default;}", a += ".addeventatc_dropdown .brx {height:1px;overflow:hidden;background:#e0e0e0;position:absolute;z-index:100;left:10px;right:10px;top:9px;}", a += ".addeventatc_dropdown .frs {position:absolute;top:5px;cursor:pointer;right:10px;font-style:normal!important;font-weight:normal!important;text-align:right;z-index:101;line-height:9px!important;background:#fff;text-decoration:none;font-size:9px!important;color:#cacaca!important;}", a += ".addeventatc_dropdown .frs a {margin:0!important;padding:0!important;font-style:normal!important;font-weight:normal!important;line-height:9px!important;background-color:#fff!important;text-decoration:none;font-size:9px!important;color:#cacaca!important;padding-left:10px!important;display:inline-block;}", a += ".addeventatc_dropdown .frs a:hover {color:#999!important;}", a += ".addeventatc_dropdown .ateappleical {background-image:url(https://www.addevent.com/gfx/icon-apple-t1.svg);background-repeat:no-repeat;background-position:13px 50%;background-size:14px auto;}", a += ".addeventatc_dropdown .ateoutlook {background-image:url(https://www.addevent.com/gfx/icon-outlook-t1.svg);background-repeat:no-repeat;background-position:12px 50%;background-size:16px auto;}", a += ".addeventatc_dropdown .ateoutlookcom {background-image:url(https://www.addevent.com/gfx/icon-outlook-t1.svg);background-repeat:no-repeat;background-position:12px 50%;background-size:16px auto;}", a += ".addeventatc_dropdown .ategoogle {background-image:url(https://www.addevent.com/gfx/icon-google-t1.svg);background-repeat:no-repeat;background-position:12px 50%;background-size:16px auto;}", a += ".addeventatc_dropdown .ateyahoo {background-image:url(https://www.addevent.com/gfx/icon-yahoo-t1.svg);background-repeat:no-repeat;background-position:12px 50%;background-size:16px auto;}", a += ".addeventatc_dropdown .atefacebook {background-image:url(https://www.addevent.com/gfx/icon-facebook-t1.svg);background-repeat:no-repeat;background-position:12px 50%;background-size:16px auto;}", a += ".addeventatc_dropdown em {font-size:12px!important;color:#999!important;}";
                var n = document.createElement("style");
                n.type = "text/css", n.id = "ate_css", n.styleSheet ? n.styleSheet.cssText = a : n.appendChild(document.createTextNode(a)), document.getElementsByTagName("head")[0].appendChild(n), addeventatc.removeelement($d("ate_tmp_css"))
            }
        },
        helpercss: function() {
            if (!$d("ate_helper_css")) {
                var e = "";
                e += ".addeventatc_dropdown .drop_markup {background-color:#f4f4f4;}", e += ".addeventatc_dropdown .frs a {margin:0!important;padding:0!important;font-style:normal!important;font-weight:normal!important;line-height:110%!important;background-color:#fff!important;text-decoration:none;font-size:9px!important;color:#cacaca!important;display:inline-block;}", e += ".addeventatc_dropdown .frs a:hover {color:#999!important;}", e += ".addeventatc .start, .addeventatc .end, .addeventatc .timezone, .addeventatc .title, .addeventatc .description, .addeventatc .location, .addeventatc .organizer, .addeventatc .organizer_email, .addeventatc .facebook_event, .addeventatc .all_day_event, .addeventatc .date_format, .addeventatc .alarm_reminder, .addeventatc .recurring, .addeventatc .attendees, .addeventatc .client, .addeventatc .calname, .addeventatc .uid, .addeventatc .status, .addeventatc .method {display:none!important;}";
                var t = document.createElement("style");
                t.type = "text/css", t.id = "ate_helper_css", t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(document.createTextNode(e)), document.getElementsByTagName("head")[0].appendChild(t)
            }
        },
        removeelement: function(e) {
            try {
                return !!(hdx = e) && hdx.parentNode.removeChild(hdx)
            } catch (e) {}
        },
        topzindex: function() {
            for (var e = 1, t = document.getElementsByTagName("*"), a = 0; a < t.length; a += 1)
                if (addeventatc.hasclass(t[a], "addeventatc") || addeventatc.hasclass(t[a], "addeventstc")) {
                    var n = addeventatc.getstyle(t[a], "z-index");
                    !isNaN(parseFloat(n)) && isFinite(n) && (n = parseInt(n)) > e && (e = n)
                }
            return e
        },
        viewport: function() {
            var e = 0,
                t = 0,
                a = 0,
                n = 0;
            return "number" == typeof window.innerWidth ? (e = window.innerWidth, t = window.innerHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (e = document.documentElement.clientWidth, t = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) && (e = document.body.clientWidth, t = document.body.clientHeight), document.all ? (n = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft, a = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) : (n = window.pageXOffset, a = window.pageYOffset), {
                w: e,
                h: t,
                x: n,
                y: a
            }
        },
        elementposition: function(e) {
            var t = 0,
                a = 0;
            if (e.offsetParent)
                for (t = e.offsetLeft, a = e.offsetTop; e = e.offsetParent;) t += e.offsetLeft, a += e.offsetTop;
            return {
                x: t,
                y: a
            }
        },
        getstyle: function(e, t) {
            var a, n = e;
            return n.currentStyle ? a = n.currentStyle[t] : window.getComputedStyle && (a = document.defaultView.getComputedStyle(n, null).getPropertyValue(t)), a
        },
        getlicense: function(e) {
            var t = location.origin,
                a = !1;
            if (void 0 === location.origin && (t = location.protocol + "//" + location.host), e) {
                var n = e.substring(0, 1),
                    o = e.substring(9, 10),
                    d = e.substring(17, 18);
                "a" == n && "z" == o && "m" == d && (a = !0)
            }
            return (-1 == t.indexOf("addevent.com") && "aao8iuet5zp9iqw5sm9z" == e || -1 == t.indexOf("addevent.to") && "aao8iuet5zp9iqw5sm9z" == e || -1 == t.indexOf("addevent.com") && "aao8iuet5zp9iqw5sm9z" == e) && (a = !0), a
        },
        refresh: function() {
            for (var e = document.getElementsByTagName("*"), t = [], a = 0; a < e.length; a += 1)
                if (addeventatc.hasclass(e[a], "addeventatc")) {
                    e[a].className = e[a].className.replace(/addeventatc-selected/gi, ""), e[a].id = "";
                    for (var n = e[a].getElementsByTagName("*"), o = 0; o < n.length; o += 1)(addeventatc.hasclass(n[o], "addeventatc_icon") || addeventatc.hasclass(n[o], "addeventatc_dropdown")) && t.push(n[o])
                }
            for (var d = 0; d < t.length; d += 1) addeventatc.removeelement(t[d]);
            addeventatc.removeelement($d("ate_css")), c = 1, s = !1, addeventatc.generate()
        },
        hasclass: function(e, t) {
            return new RegExp("(\\s|^)" + t + "(\\s|$)").test(e.className)
        },
        eclick: function(e) {
            var t = document.getElementById(e);
            if (t.click) t.click();
            else if (document.createEvent) {
                var a = document.createEvent("MouseEvents");
                a.initEvent("click", !0, !0), t.dispatchEvent(a)
            }
        },
        track: function(e) {
            new Image, (new Date).getTime(), encodeURIComponent(window.location.origin)
        },
        getguid: function() {
            for (var e = "addevent_track_cookie=", t = "", a = document.cookie.split(";"), n = 0; n < a.length; n++) {
                for (var o = a[n];
                    " " == o.charAt(0);) o = o.substring(1, o.length);
                0 == o.indexOf(e) && (t = o.substring(e.length, o.length))
            }
            if ("" == t) {
                var d = (addeventatc.s4() + addeventatc.s4() + "-" + addeventatc.s4() + "-4" + addeventatc.s4().substr(0, 3) + "-" + addeventatc.s4() + "-" + addeventatc.s4() + addeventatc.s4() + addeventatc.s4()).toLowerCase(),
                    c = new Date;
                c.setTime(c.getTime() + 31536e6);
                var i = "expires=" + c.toUTCString();
                document.cookie = "addevent_track_cookie=" + d + "; " + i, t = d
            }
            return t
        },
        s4: function() {
            return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
        },
        documentclick: function(e) {
            e = (e = e || window.event).target || e.srcElement, ate_touch_capable ? (clearTimeout(o), o = setTimeout(function() {
                addeventatc.hide(e.className)
            }, 500)) : addeventatc.hide(e.className)
        },
        trigger: function(e, t) {
            if ("button_click" == e) console.log("Hello3");
            try {
                E(t)
            } catch (e) {}
            if ("button_mouseover" == e) try {
                N(t)
            } catch (e) {}
            if ("button_mouseout" == e) try {
                C(t)
            } catch (e) {}
            if ("button_dropdown_show" == e) try {
                I(t)
            } catch (e) {}
            if ("button_dropdown_hide" == e) try {
                $(t)
            } catch (e) {}
            if ("button_dropdown_click" == e) try {
                A(t)
            } catch (e) {}
        },
        register: function(e, t) {
            "button-click" == e && (E = t), "button-mouseover" == e && (N = t), "button-mouseout" == e && (C = t), "button-dropdown-show" == e && (I = t), "button-dropdown-hide" == e && ($ = t), "button-dropdown-click" == e && (A = t)
        },
        settings: function(e) {
            null != e.license && (t = e.license), null != e.css && (e.css ? l = !0 : (l = !1, addeventatc.removeelement($d("ate_css")))), null != e.mouse && (i = e.mouse), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (i = !1), null != e.outlook && null != e.outlook.show && (h = e.outlook.show), null != e.google && null != e.google.show && (g = e.google.show), null != e.yahoo && null != e.yahoo.show && (b = e.yahoo.show), null != e.hotmail && null != e.hotmail.show && (f = e.hotmail.show), null != e.outlookcom && null != e.outlookcom.show && (f = e.outlookcom.show), null != e.ical && null != e.ical.show && (m = e.ical.show), null != e.appleical && null != e.appleical.show && (m = e.appleical.show), null != e.facebook && null != e.facebook.show && (w = e.facebook.show), null != e.outlook && null != e.outlook.text && (y = e.outlook.text), null != e.google && null != e.google.text && (k = e.google.text), null != e.yahoo && null != e.yahoo.text && (T = e.yahoo.text), null != e.hotmail && null != e.hotmail.text && (_ = e.hotmail.text), null != e.outlookcom && null != e.outlookcom.text && (_ = e.outlookcom.text), null != e.ical && null != e.ical.text && (x = e.ical.text), null != e.appleical && null != e.appleical.text && (x = e.appleical.text), null != e.facebook && null != e.facebook.text && (z = e.facebook.text), null != e.dropdown && null != e.dropdown.order && (v = e.dropdown.order)
        },
        keyboard: function(e, t) {
            var a = document.getElementById(t.id + "-drop");
            if (a && "block" == addeventatc.getstyle(a, "display")) {
                for (var n = a.getElementsByTagName("SPAN"), o = null, d = 0, c = 0, i = 0; i < n.length; i += 1) d++, addeventatc.hasclass(n[i], "drop_markup") && (o = n[i], c = d);
                null === o ? c = 1 : "down" == t.key ? c >= d ? c = 1 : c++ : 1 == c ? c = d : c--, d = 0;
                for (i = 0; i < n.length; i += 1)
                    if (++d == c) n[i].className += " drop_markup";
                    else {
                        var l = new RegExp("(\\s|^)drop_markup(\\s|$)");
                        n[i].className = n[i].className.replace(l, " "), n[i].className = n[i].className.replace(/\s+$/, "")
                    }
            }
        },
        keyboardclick: function(e, t) {
            var a = document.getElementById(t.id + "-drop");
            if (a) {
                for (var n = a.getElementsByTagName("SPAN"), o = null, d = 0; d < n.length; d += 1) addeventatc.hasclass(n[d], "drop_markup") && (o = n[d]);
                if (null !== o) {
                    o.click();
                    for (d = 0; d < n.length; d += 1) {
                        var c = new RegExp("(\\s|^)drop_markup(\\s|$)");
                        n[d].className = n[d].className.replace(c, " "), n[d].className = n[d].className.replace(/\s+$/, "")
                    }
                }
            }
        },
        usewebcal: function() {
            var e = !1,
                t = window.navigator.userAgent.toLowerCase(),
                a = /CriOS/i.test(navigator.userAgent),
                n = /iphone|ipod|ipad/.test(t),
                o = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
            return (n && o || n && a) && (e = !0), e
        },
        agent: function() {
            var e = navigator.userAgent || navigator.vendor || window.opera;
            return /windows phone/i.test(e) ? "windows_phone" : /android/i.test(e) ? "android" : /iPad|iPhone|iPod/.test(e) && !window.MSStream ? "ios" : "unknown"
        }
    }
}();
! function(e, t) {
    "use strict";
    e = e || "docReady", t = t || window;
    var a = [],
        n = !1,
        o = !1;

    function d() {
        if (!n) {
            n = !0;
            for (var e = 0; e < a.length; e++) a[e].fn.call(window, a[e].ctx);
            a = []
        }
    }

    function c() {
        "complete" === document.readyState && d()
    }
    t[e] = function(e, t) {
        if ("function" != typeof e) throw new TypeError("callback for docReady(fn) must be a function");
        n ? setTimeout(function() {
            e(t)
        }, 1) : (a.push({
            fn: e,
            ctx: t
        }), "complete" === document.readyState || !document.attachEvent && "interactive" === document.readyState ? setTimeout(d, 1) : o || (document.addEventListener ? (document.addEventListener("DOMContentLoaded", d, !1), window.addEventListener("load", d, !1)) : (document.attachEvent("onreadystatechange", c), window.attachEvent("onload", d)), o = !0))
    }
}("addeventReady", window);
var ate_touch_capable = "ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;
window.addEventListener ? (document.addEventListener("click", addeventatc.documentclick, !1), ate_touch_capable && document.addEventListener("touchend", addeventatc.documentclick, !1)) : window.attachEvent ? (document.attachEvent("onclick", addeventatc.documentclick), ate_touch_capable && document.attachEvent("ontouchend", addeventatc.documentclick)) : document.onclick = function() {
    addeventatc.documentclick(event)
}, addeventReady(function() {
    addeventatc.initialize(), setTimeout("addeventatc.initialize();", 200)
});
/*!
Chosen, a Select Box Enhancer for jQuery and Prototype
by Patrick Filler for Harvest, http://getharvest.com

Version 1.8.7
Full source at https://github.com/harvesthq/chosen
Copyright (c) 2011-2018 Harvest http://getharvest.com

MIT License, https://github.com/harvesthq/chosen/blob/master/LICENSE.md
This file is generated by `grunt build`, do not edit it by hand.
*/

(function() {
    var $, AbstractChosen, Chosen, SelectParser,
        bind = function(fn, me) {
            return function() {
                return fn.apply(me, arguments);
            };
        },
        extend = function(child, parent) {
            for (var key in parent) {
                if (hasProp.call(parent, key)) child[key] = parent[key];
            }

            function ctor() {
                this.constructor = child;
            }
            ctor.prototype = parent.prototype;
            child.prototype = new ctor();
            child.__super__ = parent.prototype;
            return child;
        },
        hasProp = {}.hasOwnProperty;

    SelectParser = (function() {
        function SelectParser() {
            this.options_index = 0;
            this.parsed = [];
        }

        SelectParser.prototype.add_node = function(child) {
            if (child.nodeName.toUpperCase() === "OPTGROUP") {
                return this.add_group(child);
            } else {
                return this.add_option(child);
            }
        };

        SelectParser.prototype.add_group = function(group) {
            var group_position, i, len, option, ref, results1;
            group_position = this.parsed.length;
            this.parsed.push({
                array_index: group_position,
                group: true,
                label: group.label,
                title: group.title ? group.title : void 0,
                children: 0,
                disabled: group.disabled,
                classes: group.className
            });
            ref = group.childNodes;
            results1 = [];
            for (i = 0, len = ref.length; i < len; i++) {
                option = ref[i];
                results1.push(this.add_option(option, group_position, group.disabled));
            }
            return results1;
        };

        SelectParser.prototype.add_option = function(option, group_position, group_disabled) {
            if (option.nodeName.toUpperCase() === "OPTION") {
                if (option.text !== "") {
                    if (group_position != null) {
                        this.parsed[group_position].children += 1;
                    }
                    this.parsed.push({
                        array_index: this.parsed.length,
                        options_index: this.options_index,
                        value: option.value,
                        text: option.text,
                        html: option.innerHTML,
                        title: option.title ? option.title : void 0,
                        selected: option.selected,
                        disabled: group_disabled === true ? group_disabled : option.disabled,
                        group_array_index: group_position,
                        group_label: group_position != null ? this.parsed[group_position].label : null,
                        classes: option.className,
                        style: option.style.cssText
                    });
                } else {
                    this.parsed.push({
                        array_index: this.parsed.length,
                        options_index: this.options_index,
                        empty: true
                    });
                }
                return this.options_index += 1;
            }
        };

        return SelectParser;

    })();

    SelectParser.select_to_array = function(select) {
        var child, i, len, parser, ref;
        parser = new SelectParser();
        ref = select.childNodes;
        for (i = 0, len = ref.length; i < len; i++) {
            child = ref[i];
            parser.add_node(child);
        }
        return parser.parsed;
    };

    AbstractChosen = (function() {
        function AbstractChosen(form_field, options1) {
            this.form_field = form_field;
            this.options = options1 != null ? options1 : {};
            this.label_click_handler = bind(this.label_click_handler, this);
            if (!AbstractChosen.browser_is_supported()) {
                return;
            }
            this.is_multiple = this.form_field.multiple;
            this.set_default_text();
            this.set_default_values();
            this.setup();
            this.set_up_html();
            this.register_observers();
            this.on_ready();
        }

        AbstractChosen.prototype.set_default_values = function() {
            this.click_test_action = (function(_this) {
                return function(evt) {
                    return _this.test_active_click(evt);
                };
            })(this);
            this.activate_action = (function(_this) {
                return function(evt) {
                    return _this.activate_field(evt);
                };
            })(this);
            this.active_field = false;
            this.mouse_on_container = false;
            this.results_showing = false;
            this.result_highlighted = null;
            this.is_rtl = this.options.rtl || /\bchosen-rtl\b/.test(this.form_field.className);
            this.allow_single_deselect = (this.options.allow_single_deselect != null) && (this.form_field.options[0] != null) && this.form_field.options[0].text === "" ? this.options.allow_single_deselect : false;
            this.disable_search_threshold = this.options.disable_search_threshold || 0;
            this.disable_search = this.options.disable_search || false;
            this.enable_split_word_search = this.options.enable_split_word_search != null ? this.options.enable_split_word_search : true;
            this.group_search = this.options.group_search != null ? this.options.group_search : true;
            this.search_contains = this.options.search_contains || false;
            this.single_backstroke_delete = this.options.single_backstroke_delete != null ? this.options.single_backstroke_delete : true;
            this.max_selected_options = this.options.max_selected_options || Infinity;
            this.inherit_select_classes = this.options.inherit_select_classes || false;
            this.display_selected_options = this.options.display_selected_options != null ? this.options.display_selected_options : true;
            this.display_disabled_options = this.options.display_disabled_options != null ? this.options.display_disabled_options : true;
            this.include_group_label_in_selected = this.options.include_group_label_in_selected || false;
            this.max_shown_results = this.options.max_shown_results || Number.POSITIVE_INFINITY;
            this.case_sensitive_search = this.options.case_sensitive_search || false;
            return this.hide_results_on_select = this.options.hide_results_on_select != null ? this.options.hide_results_on_select : true;
        };

        AbstractChosen.prototype.set_default_text = function() {
            if (this.form_field.getAttribute("data-placeholder")) {
                this.default_text = this.form_field.getAttribute("data-placeholder");
            } else if (this.is_multiple) {
                this.default_text = this.options.placeholder_text_multiple || this.options.placeholder_text || AbstractChosen.default_multiple_text;
            } else {
                this.default_text = this.options.placeholder_text_single || this.options.placeholder_text || AbstractChosen.default_single_text;
            }
            this.default_text = this.escape_html(this.default_text);
            return this.results_none_found = this.form_field.getAttribute("data-no_results_text") || this.options.no_results_text || AbstractChosen.default_no_result_text;
        };

        AbstractChosen.prototype.choice_label = function(item) {
            if (this.include_group_label_in_selected && (item.group_label != null)) {
                return "<b class='group-name'>" + (this.escape_html(item.group_label)) + "</b>" + item.html;
            } else {
                return item.html;
            }
        };

        AbstractChosen.prototype.mouse_enter = function() {
            return this.mouse_on_container = true;
        };

        AbstractChosen.prototype.mouse_leave = function() {
            return this.mouse_on_container = false;
        };

        AbstractChosen.prototype.input_focus = function(evt) {
            if (this.is_multiple) {
                if (!this.active_field) {
                    return setTimeout(((function(_this) {
                        return function() {
                            return _this.container_mousedown();
                        };
                    })(this)), 50);
                }
            } else {
                if (!this.active_field) {
                    return this.activate_field();
                }
            }
        };

        AbstractChosen.prototype.input_blur = function(evt) {
            if (!this.mouse_on_container) {
                this.active_field = false;
                return setTimeout(((function(_this) {
                    return function() {
                        return _this.blur_test();
                    };
                })(this)), 100);
            }
        };

        AbstractChosen.prototype.label_click_handler = function(evt) {
            if (this.is_multiple) {
                return this.container_mousedown(evt);
            } else {
                return this.activate_field();
            }
        };

        AbstractChosen.prototype.results_option_build = function(options) {
            var content, data, data_content, i, len, ref, shown_results;
            content = '';
            shown_results = 0;
            ref = this.results_data;
            for (i = 0, len = ref.length; i < len; i++) {
                data = ref[i];
                data_content = '';
                if (data.group) {
                    data_content = this.result_add_group(data);
                } else {
                    data_content = this.result_add_option(data);
                }
                if (data_content !== '') {
                    shown_results++;
                    content += data_content;
                }
                if (options != null ? options.first : void 0) {
                    if (data.selected && this.is_multiple) {
                        this.choice_build(data);
                    } else if (data.selected && !this.is_multiple) {
                        this.single_set_selected_text(this.choice_label(data));
                    }
                }
                if (shown_results >= this.max_shown_results) {
                    break;
                }
            }
            return content;
        };

        AbstractChosen.prototype.result_add_option = function(option) {
            var classes, option_el;
            if (!option.search_match) {
                return '';
            }
            if (!this.include_option_in_results(option)) {
                return '';
            }
            classes = [];
            if (!option.disabled && !(option.selected && this.is_multiple)) {
                classes.push("active-result");
            }
            if (option.disabled && !(option.selected && this.is_multiple)) {
                classes.push("disabled-result");
            }
            if (option.selected) {
                classes.push("result-selected");
            }
            if (option.group_array_index != null) {
                classes.push("group-option");
            }
            if (option.classes !== "") {
                classes.push(option.classes);
            }
            option_el = document.createElement("li");
            option_el.className = classes.join(" ");
            if (option.style) {
                option_el.style.cssText = option.style;
            }
            option_el.setAttribute("data-option-array-index", option.array_index);
            option_el.innerHTML = option.highlighted_html || option.html;
            if (option.title) {
                option_el.title = option.title;
            }
            return this.outerHTML(option_el);
        };

        AbstractChosen.prototype.result_add_group = function(group) {
            var classes, group_el;
            if (!(group.search_match || group.group_match)) {
                return '';
            }
            if (!(group.active_options > 0)) {
                return '';
            }
            classes = [];
            classes.push("group-result");
            if (group.classes) {
                classes.push(group.classes);
            }
            group_el = document.createElement("li");
            group_el.className = classes.join(" ");
            group_el.innerHTML = group.highlighted_html || this.escape_html(group.label);
            if (group.title) {
                group_el.title = group.title;
            }
            return this.outerHTML(group_el);
        };

        AbstractChosen.prototype.results_update_field = function() {
            this.set_default_text();
            if (!this.is_multiple) {
                this.results_reset_cleanup();
            }
            this.result_clear_highlight();
            this.results_build();
            if (this.results_showing) {
                return this.winnow_results();
            }
        };

        AbstractChosen.prototype.reset_single_select_options = function() {
            var i, len, ref, result, results1;
            ref = this.results_data;
            results1 = [];
            for (i = 0, len = ref.length; i < len; i++) {
                result = ref[i];
                if (result.selected) {
                    results1.push(result.selected = false);
                } else {
                    results1.push(void 0);
                }
            }
            return results1;
        };

        AbstractChosen.prototype.results_toggle = function() {
            if (this.results_showing) {
                return this.results_hide();
            } else {
                return this.results_show();
            }
        };

        AbstractChosen.prototype.results_search = function(evt) {
            if (this.results_showing) {
                return this.winnow_results();
            } else {
                return this.results_show();
            }
        };

        AbstractChosen.prototype.winnow_results = function(options) {
            var escapedQuery, fix, i, len, option, prefix, query, ref, regex, results, results_group, search_match, startpos, suffix, text;
            this.no_results_clear();
            results = 0;
            query = this.get_search_text();
            escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
            regex = this.get_search_regex(escapedQuery);
            ref = this.results_data;
            for (i = 0, len = ref.length; i < len; i++) {
                option = ref[i];
                option.search_match = false;
                results_group = null;
                search_match = null;
                option.highlighted_html = '';
                if (this.include_option_in_results(option)) {
                    if (option.group) {
                        option.group_match = false;
                        option.active_options = 0;
                    }
                    if ((option.group_array_index != null) && this.results_data[option.group_array_index]) {
                        results_group = this.results_data[option.group_array_index];
                        if (results_group.active_options === 0 && results_group.search_match) {
                            results += 1;
                        }
                        results_group.active_options += 1;
                    }
                    text = option.group ? option.label : option.text;
                    if (!(option.group && !this.group_search)) {
                        search_match = this.search_string_match(text, regex);
                        option.search_match = search_match != null;
                        if (option.search_match && !option.group) {
                            results += 1;
                        }
                        if (option.search_match) {
                            if (query.length) {
                                startpos = search_match.index;
                                prefix = text.slice(0, startpos);
                                fix = text.slice(startpos, startpos + query.length);
                                suffix = text.slice(startpos + query.length);
                                option.highlighted_html = (this.escape_html(prefix)) + "<em>" + (this.escape_html(fix)) + "</em>" + (this.escape_html(suffix));
                            }
                            if (results_group != null) {
                                results_group.group_match = true;
                            }
                        } else if ((option.group_array_index != null) && this.results_data[option.group_array_index].search_match) {
                            option.search_match = true;
                        }
                    }
                }
            }
            this.result_clear_highlight();
            if (results < 1 && query.length) {
                this.update_results_content("");
                return this.no_results(query);
            } else {
                this.update_results_content(this.results_option_build());
                if (!(options != null ? options.skip_highlight : void 0)) {
                    return this.winnow_results_set_highlight();
                }
            }
        };

        AbstractChosen.prototype.get_search_regex = function(escaped_search_string) {
            var regex_flag, regex_string;
            regex_string = this.search_contains ? escaped_search_string : "(^|\\s|\\b)" + escaped_search_string + "[^\\s]*";
            if (!(this.enable_split_word_search || this.search_contains)) {
                regex_string = "^" + regex_string;
            }
            regex_flag = this.case_sensitive_search ? "" : "i";
            return new RegExp(regex_string, regex_flag);
        };

        AbstractChosen.prototype.search_string_match = function(search_string, regex) {
            var match;
            match = regex.exec(search_string);
            if (!this.search_contains && (match != null ? match[1] : void 0)) {
                match.index += 1;
            }
            return match;
        };

        AbstractChosen.prototype.choices_count = function() {
            var i, len, option, ref;
            if (this.selected_option_count != null) {
                return this.selected_option_count;
            }
            this.selected_option_count = 0;
            ref = this.form_field.options;
            for (i = 0, len = ref.length; i < len; i++) {
                option = ref[i];
                if (option.selected) {
                    this.selected_option_count += 1;
                }
            }
            return this.selected_option_count;
        };

        AbstractChosen.prototype.choices_click = function(evt) {
            evt.preventDefault();
            this.activate_field();
            if (!(this.results_showing || this.is_disabled)) {
                return this.results_show();
            }
        };

        AbstractChosen.prototype.keydown_checker = function(evt) {
            var ref, stroke;
            stroke = (ref = evt.which) != null ? ref : evt.keyCode;
            this.search_field_scale();
            if (stroke !== 8 && this.pending_backstroke) {
                this.clear_backstroke();
            }
            switch (stroke) {
                case 8:
                    this.backstroke_length = this.get_search_field_value().length;
                    break;
                case 9:
                    if (this.results_showing && !this.is_multiple) {
                        this.result_select(evt);
                    }
                    this.mouse_on_container = false;
                    break;
                case 13:
                    if (this.results_showing) {
                        evt.preventDefault();
                    }
                    break;
                case 27:
                    if (this.results_showing) {
                        evt.preventDefault();
                    }
                    break;
                case 32:
                    if (this.disable_search) {
                        evt.preventDefault();
                    }
                    break;
                case 38:
                    evt.preventDefault();
                    this.keyup_arrow();
                    break;
                case 40:
                    evt.preventDefault();
                    this.keydown_arrow();
                    break;
            }
        };

        AbstractChosen.prototype.keyup_checker = function(evt) {
            var ref, stroke;
            stroke = (ref = evt.which) != null ? ref : evt.keyCode;
            this.search_field_scale();
            switch (stroke) {
                case 8:
                    if (this.is_multiple && this.backstroke_length < 1 && this.choices_count() > 0) {
                        this.keydown_backstroke();
                    } else if (!this.pending_backstroke) {
                        this.result_clear_highlight();
                        this.results_search();
                    }
                    break;
                case 13:
                    evt.preventDefault();
                    if (this.results_showing) {
                        this.result_select(evt);
                    }
                    break;
                case 27:
                    if (this.results_showing) {
                        this.results_hide();
                    }
                    break;
                case 9:
                case 16:
                case 17:
                case 18:
                case 38:
                case 40:
                case 91:
                    break;
                default:
                    this.results_search();
                    break;
            }
        };

        AbstractChosen.prototype.clipboard_event_checker = function(evt) {
            if (this.is_disabled) {
                return;
            }
            return setTimeout(((function(_this) {
                return function() {
                    return _this.results_search();
                };
            })(this)), 50);
        };

        AbstractChosen.prototype.container_width = function() {
            if (this.options.width != null) {
                return this.options.width;
            } else {
                return this.form_field.offsetWidth + "px";
            }
        };

        AbstractChosen.prototype.include_option_in_results = function(option) {
            if (this.is_multiple && (!this.display_selected_options && option.selected)) {
                return false;
            }
            if (!this.display_disabled_options && option.disabled) {
                return false;
            }
            if (option.empty) {
                return false;
            }
            return true;
        };

        AbstractChosen.prototype.search_results_touchstart = function(evt) {
            this.touch_started = true;
            return this.search_results_mouseover(evt);
        };

        AbstractChosen.prototype.search_results_touchmove = function(evt) {
            this.touch_started = false;
            return this.search_results_mouseout(evt);
        };

        AbstractChosen.prototype.search_results_touchend = function(evt) {
            if (this.touch_started) {
                return this.search_results_mouseup(evt);
            }
        };

        AbstractChosen.prototype.outerHTML = function(element) {
            var tmp;
            if (element.outerHTML) {
                return element.outerHTML;
            }
            tmp = document.createElement("div");
            tmp.appendChild(element);
            return tmp.innerHTML;
        };

        AbstractChosen.prototype.get_single_html = function() {
            return "<a class=\"chosen-single chosen-default\">\n  <span>" + this.default_text + "</span>\n  <div><b></b></div>\n</a>\n<div class=\"chosen-drop\">\n  <div class=\"chosen-search\">\n    <input class=\"chosen-search-input\" type=\"text\" autocomplete=\"off\" />\n  </div>\n  <ul class=\"chosen-results\"></ul>\n</div>";
        };

        AbstractChosen.prototype.get_multi_html = function() {
            return "<ul class=\"chosen-choices\">\n  <li class=\"search-field\">\n    <input class=\"chosen-search-input\" type=\"text\" autocomplete=\"off\" value=\"" + this.default_text + "\" />\n  </li>\n</ul>\n<div class=\"chosen-drop\">\n  <ul class=\"chosen-results\"></ul>\n</div>";
        };

        AbstractChosen.prototype.get_no_results_html = function(terms) {
            return "<li class=\"no-results\">\n  " + this.results_none_found + " <span>" + (this.escape_html(terms)) + "</span>\n</li>";
        };

        AbstractChosen.browser_is_supported = function() {
            if ("Microsoft Internet Explorer" === window.navigator.appName) {
                return document.documentMode >= 8;
            }
            /*
            if (/iP(od|hone)/i.test(window.navigator.userAgent) || /IEMobile/i.test(window.navigator.userAgent) || /Windows Phone/i.test(window.navigator.userAgent) || /BlackBerry/i.test(window.navigator.userAgent) || /BB10/i.test(window.navigator.userAgent) || /Android.*Mobile/i.test(window.navigator.userAgent)) {
              return false;
            }
            */
            return true;
        };

        AbstractChosen.default_multiple_text = "Select Some Options";

        AbstractChosen.default_single_text = "Select an Option";

        AbstractChosen.default_no_result_text = "No results match";

        return AbstractChosen;

    })();

    $ = jQuery;

    $.fn.extend({
        chosen: function(options) {
            if (!AbstractChosen.browser_is_supported()) {
                return this;
            }
            return this.each(function(input_field) {
                var $this, chosen;
                $this = $(this);
                chosen = $this.data('chosen');
                if (options === 'destroy') {
                    if (chosen instanceof Chosen) {
                        chosen.destroy();
                    }
                    return;
                }
                if (!(chosen instanceof Chosen)) {
                    $this.data('chosen', new Chosen(this, options));
                }
            });
        }
    });

    Chosen = (function(superClass) {
        extend(Chosen, superClass);

        function Chosen() {
            return Chosen.__super__.constructor.apply(this, arguments);
        }

        Chosen.prototype.setup = function() {
            this.form_field_jq = $(this.form_field);
            return this.current_selectedIndex = this.form_field.selectedIndex;
        };

        Chosen.prototype.set_up_html = function() {
            var container_classes, container_props;
            container_classes = ["chosen-container"];
            container_classes.push("chosen-container-" + (this.is_multiple ? "multi" : "single"));
            if (this.inherit_select_classes && this.form_field.className) {
                container_classes.push(this.form_field.className);
            }
            if (this.is_rtl) {
                container_classes.push("chosen-rtl");
            }
            container_props = {
                'class': container_classes.join(' '),
                'title': this.form_field.title
            };
            if (this.form_field.id.length) {
                container_props.id = this.form_field.id.replace(/[^\w]/g, '_') + "_chosen";
            }
            this.container = $("<div />", container_props);
            this.container.width(this.container_width());
            if (this.is_multiple) {
                this.container.html(this.get_multi_html());
            } else {
                this.container.html(this.get_single_html());
            }
            this.form_field_jq.hide().after(this.container);
            this.dropdown = this.container.find('div.chosen-drop').first();
            this.search_field = this.container.find('input').first();
            this.search_results = this.container.find('ul.chosen-results').first();
            this.search_field_scale();
            this.search_no_results = this.container.find('li.no-results').first();
            if (this.is_multiple) {
                this.search_choices = this.container.find('ul.chosen-choices').first();
                this.search_container = this.container.find('li.search-field').first();
            } else {
                this.search_container = this.container.find('div.chosen-search').first();
                this.selected_item = this.container.find('.chosen-single').first();
            }
            this.results_build();
            this.set_tab_index();
            return this.set_label_behavior();
        };

        Chosen.prototype.on_ready = function() {
            return this.form_field_jq.trigger("chosen:ready", {
                chosen: this
            });
        };

        Chosen.prototype.register_observers = function() {
            this.container.on('touchstart.chosen', (function(_this) {
                return function(evt) {
                    _this.container_mousedown(evt);
                };
            })(this));
            this.container.on('touchend.chosen', (function(_this) {
                return function(evt) {
                    _this.container_mouseup(evt);
                };
            })(this));
            this.container.on('mousedown.chosen', (function(_this) {
                return function(evt) {
                    _this.container_mousedown(evt);
                };
            })(this));
            this.container.on('mouseup.chosen', (function(_this) {
                return function(evt) {
                    _this.container_mouseup(evt);
                };
            })(this));
            this.container.on('mouseenter.chosen', (function(_this) {
                return function(evt) {
                    _this.mouse_enter(evt);
                };
            })(this));
            this.container.on('mouseleave.chosen', (function(_this) {
                return function(evt) {
                    _this.mouse_leave(evt);
                };
            })(this));
            this.search_results.on('mouseup.chosen', (function(_this) {
                return function(evt) {
                    _this.search_results_mouseup(evt);
                };
            })(this));
            this.search_results.on('mouseover.chosen', (function(_this) {
                return function(evt) {
                    _this.search_results_mouseover(evt);
                };
            })(this));
            this.search_results.on('mouseout.chosen', (function(_this) {
                return function(evt) {
                    _this.search_results_mouseout(evt);
                };
            })(this));
            this.search_results.on('mousewheel.chosen DOMMouseScroll.chosen', (function(_this) {
                return function(evt) {
                    _this.search_results_mousewheel(evt);
                };
            })(this));
            this.search_results.on('touchstart.chosen', (function(_this) {
                return function(evt) {
                    _this.search_results_touchstart(evt);
                };
            })(this));
            this.search_results.on('touchmove.chosen', (function(_this) {
                return function(evt) {
                    _this.search_results_touchmove(evt);
                };
            })(this));
            this.search_results.on('touchend.chosen', (function(_this) {
                return function(evt) {
                    _this.search_results_touchend(evt);
                };
            })(this));
            this.form_field_jq.on("chosen:updated.chosen", (function(_this) {
                return function(evt) {
                    _this.results_update_field(evt);
                };
            })(this));
            this.form_field_jq.on("chosen:activate.chosen", (function(_this) {
                return function(evt) {
                    _this.activate_field(evt);
                };
            })(this));
            this.form_field_jq.on("chosen:open.chosen", (function(_this) {
                return function(evt) {
                    _this.container_mousedown(evt);
                };
            })(this));
            this.form_field_jq.on("chosen:close.chosen", (function(_this) {
                return function(evt) {
                    _this.close_field(evt);
                };
            })(this));
            this.search_field.on('blur.chosen', (function(_this) {
                return function(evt) {
                    _this.input_blur(evt);
                };
            })(this));
            this.search_field.on('keyup.chosen', (function(_this) {
                return function(evt) {
                    _this.keyup_checker(evt);
                };
            })(this));
            this.search_field.on('keydown.chosen', (function(_this) {
                return function(evt) {
                    _this.keydown_checker(evt);
                };
            })(this));
            this.search_field.on('focus.chosen', (function(_this) {
                return function(evt) {
                    _this.input_focus(evt);
                };
            })(this));
            this.search_field.on('cut.chosen', (function(_this) {
                return function(evt) {
                    _this.clipboard_event_checker(evt);
                };
            })(this));
            this.search_field.on('paste.chosen', (function(_this) {
                return function(evt) {
                    _this.clipboard_event_checker(evt);
                };
            })(this));
            if (this.is_multiple) {
                return this.search_choices.on('click.chosen', (function(_this) {
                    return function(evt) {
                        _this.choices_click(evt);
                    };
                })(this));
            } else {
                return this.container.on('click.chosen', function(evt) {
                    evt.preventDefault();
                });
            }
        };

        Chosen.prototype.destroy = function() {
            $(this.container[0].ownerDocument).off('click.chosen', this.click_test_action);
            if (this.form_field_label.length > 0) {
                this.form_field_label.off('click.chosen');
            }
            if (this.search_field[0].tabIndex) {
                this.form_field_jq[0].tabIndex = this.search_field[0].tabIndex;
            }
            this.container.remove();
            this.form_field_jq.removeData('chosen');
            return this.form_field_jq.show();
        };

        Chosen.prototype.search_field_disabled = function() {
            this.is_disabled = this.form_field.disabled || this.form_field_jq.parents('fieldset').is(':disabled');
            this.container.toggleClass('chosen-disabled', this.is_disabled);
            this.search_field[0].disabled = this.is_disabled;
            if (!this.is_multiple) {
                this.selected_item.off('focus.chosen', this.activate_field);
            }
            if (this.is_disabled) {
                return this.close_field();
            } else if (!this.is_multiple) {
                return this.selected_item.on('focus.chosen', this.activate_field);
            }
        };

        Chosen.prototype.container_mousedown = function(evt) {
            var ref;
            if (this.is_disabled) {
                return;
            }
            if (evt && ((ref = evt.type) === 'mousedown' || ref === 'touchstart') && !this.results_showing) {
                evt.preventDefault();
            }
            if (!((evt != null) && ($(evt.target)).hasClass("search-choice-close"))) {
                if (!this.active_field) {
                    if (this.is_multiple) {
                        this.search_field.val("");
                    }
                    $(this.container[0].ownerDocument).on('click.chosen', this.click_test_action);
                    this.results_show();
                } else if (!this.is_multiple && evt && (($(evt.target)[0] === this.selected_item[0]) || $(evt.target).parents("a.chosen-single").length)) {
                    evt.preventDefault();
                    this.results_toggle();
                }
                return this.activate_field();
            }
        };

        Chosen.prototype.container_mouseup = function(evt) {
            if (evt.target.nodeName === "ABBR" && !this.is_disabled) {
                return this.results_reset(evt);
            }
        };

        Chosen.prototype.search_results_mousewheel = function(evt) {
            var delta;
            if (evt.originalEvent) {
                delta = evt.originalEvent.deltaY || -evt.originalEvent.wheelDelta || evt.originalEvent.detail;
            }
            if (delta != null) {
                evt.preventDefault();
                if (evt.type === 'DOMMouseScroll') {
                    delta = delta * 40;
                }
                return this.search_results.scrollTop(delta + this.search_results.scrollTop());
            }
        };

        Chosen.prototype.blur_test = function(evt) {
            if (!this.active_field && this.container.hasClass("chosen-container-active")) {
                return this.close_field();
            }
        };

        Chosen.prototype.close_field = function() {
            $(this.container[0].ownerDocument).off("click.chosen", this.click_test_action);
            this.active_field = false;
            this.results_hide();
            this.container.removeClass("chosen-container-active");
            this.clear_backstroke();
            this.show_search_field_default();
            this.search_field_scale();
            return this.search_field.blur();
        };

        Chosen.prototype.activate_field = function() {
            if (this.is_disabled) {
                return;
            }
            this.container.addClass("chosen-container-active");
            this.active_field = true;
            this.search_field.val(this.search_field.val());
            return this.search_field.focus();
        };

        Chosen.prototype.test_active_click = function(evt) {
            var active_container;
            active_container = $(evt.target).closest('.chosen-container');
            if (active_container.length && this.container[0] === active_container[0]) {
                return this.active_field = true;
            } else {
                return this.close_field();
            }
        };

        Chosen.prototype.results_build = function() {
            this.parsing = true;
            this.selected_option_count = null;
            this.results_data = SelectParser.select_to_array(this.form_field);
            if (this.is_multiple) {
                this.search_choices.find("li.search-choice").remove();
            } else {
                this.single_set_selected_text();
                if (this.disable_search || this.form_field.options.length <= this.disable_search_threshold) {
                    this.search_field[0].readOnly = true;
                    this.container.addClass("chosen-container-single-nosearch");
                } else {
                    this.search_field[0].readOnly = false;
                    this.container.removeClass("chosen-container-single-nosearch");
                }
            }
            this.update_results_content(this.results_option_build({
                first: true
            }));
            this.search_field_disabled();
            this.show_search_field_default();
            this.search_field_scale();
            return this.parsing = false;
        };

        Chosen.prototype.result_do_highlight = function(el) {
            var high_bottom, high_top, maxHeight, visible_bottom, visible_top;
            if (el.length) {
                this.result_clear_highlight();
                this.result_highlight = el;
                this.result_highlight.addClass("highlighted");
                maxHeight = parseInt(this.search_results.css("maxHeight"), 10);
                visible_top = this.search_results.scrollTop();
                visible_bottom = maxHeight + visible_top;
                high_top = this.result_highlight.position().top + this.search_results.scrollTop();
                high_bottom = high_top + this.result_highlight.outerHeight();
                if (high_bottom >= visible_bottom) {
                    return this.search_results.scrollTop((high_bottom - maxHeight) > 0 ? high_bottom - maxHeight : 0);
                } else if (high_top < visible_top) {
                    return this.search_results.scrollTop(high_top);
                }
            }
        };

        Chosen.prototype.result_clear_highlight = function() {
            if (this.result_highlight) {
                this.result_highlight.removeClass("highlighted");
            }
            return this.result_highlight = null;
        };

        Chosen.prototype.results_show = function() {
            if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
                this.form_field_jq.trigger("chosen:maxselected", {
                    chosen: this
                });
                return false;
            }
            this.container.addClass("chosen-with-drop");
            this.results_showing = true;
            this.search_field.focus();
            this.search_field.val(this.get_search_field_value());
            this.winnow_results();
            return this.form_field_jq.trigger("chosen:showing_dropdown", {
                chosen: this
            });
        };

        Chosen.prototype.update_results_content = function(content) {
            return this.search_results.html(content);
        };

        Chosen.prototype.results_hide = function() {
            if (this.results_showing) {
                this.result_clear_highlight();
                this.container.removeClass("chosen-with-drop");
                this.form_field_jq.trigger("chosen:hiding_dropdown", {
                    chosen: this
                });
            }
            return this.results_showing = false;
        };

        Chosen.prototype.set_tab_index = function(el) {
            var ti;
            if (this.form_field.tabIndex) {
                ti = this.form_field.tabIndex;
                this.form_field.tabIndex = -1;
                return this.search_field[0].tabIndex = ti;
            }
        };

        Chosen.prototype.set_label_behavior = function() {
            this.form_field_label = this.form_field_jq.parents("label");
            if (!this.form_field_label.length && this.form_field.id.length) {
                this.form_field_label = $("label[for='" + this.form_field.id + "']");
            }
            if (this.form_field_label.length > 0) {
                return this.form_field_label.on('click.chosen', this.label_click_handler);
            }
        };

        Chosen.prototype.show_search_field_default = function() {
            if (this.is_multiple && this.choices_count() < 1 && !this.active_field) {
                this.search_field.val(this.default_text);
                return this.search_field.addClass("default");
            } else {
                this.search_field.val("");
                return this.search_field.removeClass("default");
            }
        };

        Chosen.prototype.search_results_mouseup = function(evt) {
            var target;
            target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
            if (target.length) {
                this.result_highlight = target;
                this.result_select(evt);
                return this.search_field.focus();
            }
        };

        Chosen.prototype.search_results_mouseover = function(evt) {
            var target;
            target = $(evt.target).hasClass("active-result") ? $(evt.target) : $(evt.target).parents(".active-result").first();
            if (target) {
                return this.result_do_highlight(target);
            }
        };

        Chosen.prototype.search_results_mouseout = function(evt) {
            if ($(evt.target).hasClass("active-result") || $(evt.target).parents('.active-result').first()) {
                return this.result_clear_highlight();
            }
        };

        Chosen.prototype.choice_build = function(item) {
            var choice, close_link;
            choice = $('<li />', {
                "class": "search-choice"
            }).html("<span>" + (this.choice_label(item)) + "</span>");
            if (item.disabled) {
                choice.addClass('search-choice-disabled');
            } else {
                close_link = $('<a />', {
                    "class": 'search-choice-close',
                    'data-option-array-index': item.array_index
                });
                close_link.on('click.chosen', (function(_this) {
                    return function(evt) {
                        return _this.choice_destroy_link_click(evt);
                    };
                })(this));
                choice.append(close_link);
            }
            return this.search_container.before(choice);
        };

        Chosen.prototype.choice_destroy_link_click = function(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (!this.is_disabled) {
                return this.choice_destroy($(evt.target));
            }
        };

        Chosen.prototype.choice_destroy = function(link) {
            if (this.result_deselect(link[0].getAttribute("data-option-array-index"))) {
                if (this.active_field) {
                    this.search_field.focus();
                } else {
                    this.show_search_field_default();
                }
                if (this.is_multiple && this.choices_count() > 0 && this.get_search_field_value().length < 1) {
                    this.results_hide();
                }
                link.parents('li').first().remove();
                return this.search_field_scale();
            }
        };

        Chosen.prototype.results_reset = function() {
            this.reset_single_select_options();
            this.form_field.options[0].selected = true;
            this.single_set_selected_text();
            this.show_search_field_default();
            this.results_reset_cleanup();
            this.trigger_form_field_change();
            if (this.active_field) {
                return this.results_hide();
            }
        };

        Chosen.prototype.results_reset_cleanup = function() {
            this.current_selectedIndex = this.form_field.selectedIndex;
            return this.selected_item.find("abbr").remove();
        };

        Chosen.prototype.result_select = function(evt) {
            var high, item;
            if (this.result_highlight) {
                high = this.result_highlight;
                this.result_clear_highlight();
                if (this.is_multiple && this.max_selected_options <= this.choices_count()) {
                    this.form_field_jq.trigger("chosen:maxselected", {
                        chosen: this
                    });
                    return false;
                }
                if (this.is_multiple) {
                    high.removeClass("active-result");
                } else {
                    this.reset_single_select_options();
                }
                high.addClass("result-selected");
                item = this.results_data[high[0].getAttribute("data-option-array-index")];
                item.selected = true;
                this.form_field.options[item.options_index].selected = true;
                this.selected_option_count = null;
                if (this.is_multiple) {
                    this.choice_build(item);
                } else {
                    this.single_set_selected_text(this.choice_label(item));
                }
                if (this.is_multiple && (!this.hide_results_on_select || (evt.metaKey || evt.ctrlKey))) {
                    if (evt.metaKey || evt.ctrlKey) {
                        this.winnow_results({
                            skip_highlight: true
                        });
                    } else {
                        this.search_field.val("");
                        this.winnow_results();
                    }
                } else {
                    this.results_hide();
                    this.show_search_field_default();
                }
                if (this.is_multiple || this.form_field.selectedIndex !== this.current_selectedIndex) {
                    this.trigger_form_field_change({
                        selected: this.form_field.options[item.options_index].value
                    });
                }
                this.current_selectedIndex = this.form_field.selectedIndex;
                evt.preventDefault();
                return this.search_field_scale();
            }
        };

        Chosen.prototype.single_set_selected_text = function(text) {
            if (text == null) {
                text = this.default_text;
            }
            if (text === this.default_text) {
                this.selected_item.addClass("chosen-default");
            } else {
                this.single_deselect_control_build();
                this.selected_item.removeClass("chosen-default");
            }
            return this.selected_item.find("span").html(text);
        };

        Chosen.prototype.result_deselect = function(pos) {
            var result_data;
            result_data = this.results_data[pos];
            if (!this.form_field.options[result_data.options_index].disabled) {
                result_data.selected = false;
                this.form_field.options[result_data.options_index].selected = false;
                this.selected_option_count = null;
                this.result_clear_highlight();
                if (this.results_showing) {
                    this.winnow_results();
                }
                this.trigger_form_field_change({
                    deselected: this.form_field.options[result_data.options_index].value
                });
                this.search_field_scale();
                return true;
            } else {
                return false;
            }
        };

        Chosen.prototype.single_deselect_control_build = function() {
            if (!this.allow_single_deselect) {
                return;
            }
            if (!this.selected_item.find("abbr").length) {
                this.selected_item.find("span").first().after("<abbr class=\"search-choice-close\"></abbr>");
            }
            return this.selected_item.addClass("chosen-single-with-deselect");
        };

        Chosen.prototype.get_search_field_value = function() {
            return this.search_field.val();
        };

        Chosen.prototype.get_search_text = function() {
            return $.trim(this.get_search_field_value());
        };

        Chosen.prototype.escape_html = function(text) {
            return $('<div/>').text(text).html();
        };

        Chosen.prototype.winnow_results_set_highlight = function() {
            var do_high, selected_results;
            selected_results = !this.is_multiple ? this.search_results.find(".result-selected.active-result") : [];
            do_high = selected_results.length ? selected_results.first() : this.search_results.find(".active-result").first();
            if (do_high != null) {
                return this.result_do_highlight(do_high);
            }
        };

        Chosen.prototype.no_results = function(terms) {
            var no_results_html;
            no_results_html = this.get_no_results_html(terms);
            this.search_results.append(no_results_html);
            return this.form_field_jq.trigger("chosen:no_results", {
                chosen: this
            });
        };

        Chosen.prototype.no_results_clear = function() {
            return this.search_results.find(".no-results").remove();
        };

        Chosen.prototype.keydown_arrow = function() {
            var next_sib;
            if (this.results_showing && this.result_highlight) {
                next_sib = this.result_highlight.nextAll("li.active-result").first();
                if (next_sib) {
                    return this.result_do_highlight(next_sib);
                }
            } else {
                return this.results_show();
            }
        };

        Chosen.prototype.keyup_arrow = function() {
            var prev_sibs;
            if (!this.results_showing && !this.is_multiple) {
                return this.results_show();
            } else if (this.result_highlight) {
                prev_sibs = this.result_highlight.prevAll("li.active-result");
                if (prev_sibs.length) {
                    return this.result_do_highlight(prev_sibs.first());
                } else {
                    if (this.choices_count() > 0) {
                        this.results_hide();
                    }
                    return this.result_clear_highlight();
                }
            }
        };

        Chosen.prototype.keydown_backstroke = function() {
            var next_available_destroy;
            if (this.pending_backstroke) {
                this.choice_destroy(this.pending_backstroke.find("a").first());
                return this.clear_backstroke();
            } else {
                next_available_destroy = this.search_container.siblings("li.search-choice").last();
                if (next_available_destroy.length && !next_available_destroy.hasClass("search-choice-disabled")) {
                    this.pending_backstroke = next_available_destroy;
                    if (this.single_backstroke_delete) {
                        return this.keydown_backstroke();
                    } else {
                        return this.pending_backstroke.addClass("search-choice-focus");
                    }
                }
            }
        };

        Chosen.prototype.clear_backstroke = function() {
            if (this.pending_backstroke) {
                this.pending_backstroke.removeClass("search-choice-focus");
            }
            return this.pending_backstroke = null;
        };

        Chosen.prototype.search_field_scale = function() {
            var div, i, len, style, style_block, styles, width;
            if (!this.is_multiple) {
                return;
            }
            style_block = {
                position: 'absolute',
                left: '-1000px',
                top: '-1000px',
                display: 'none',
                whiteSpace: 'pre'
            };
            styles = ['fontSize', 'fontStyle', 'fontWeight', 'fontFamily', 'lineHeight', 'textTransform', 'letterSpacing'];
            for (i = 0, len = styles.length; i < len; i++) {
                style = styles[i];
                style_block[style] = this.search_field.css(style);
            }
            div = $('<div />').css(style_block);
            div.text(this.get_search_field_value());
            $('body').append(div);
            width = div.width() + 25;
            div.remove();
            if (this.container.is(':visible')) {
                width = Math.min(this.container.outerWidth() - 10, width);
            }
            return this.search_field.width(width);
        };

        Chosen.prototype.trigger_form_field_change = function(extra) {
            this.form_field_jq.trigger("input", extra);
            return this.form_field_jq.trigger("change", extra);
        };

        return Chosen;

    })(AbstractChosen);

}).call(this);

$(".popup-gallery a").hover(function() {
        $(this).parent().addClass("hovered");
    },
    function() {
        $(this).parent().removeClass("hovered");
    });
$(".copy-link[data-hash]").click(function() {
    copyStringToClipboard(window.location.href.split('#')[0] + "#" + $(this).attr("data-hash"));
});

function copyStringToClipboard(str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {
        position: 'absolute',
        left: '-9999px'
    };
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
}
/*! lazysizes - v5.2.0 */
! function(a, b) {
    var c = b(a, a.document, Date);
    a.lazySizes = c, "object" == typeof module && module.exports && (module.exports = c)
}("undefined" != typeof window ? window : {}, function(a, b, c) {
    "use strict";
    var d, e;
    if (function() {
            var b, c = {
                lazyClass: "lazyload",
                loadedClass: "lazyloaded",
                loadingClass: "lazyloading",
                preloadClass: "lazypreload",
                errorClass: "lazyerror",
                autosizesClass: "lazyautosizes",
                srcAttr: "data-src",
                srcsetAttr: "data-srcset",
                sizesAttr: "data-sizes",
                minSize: 40,
                customMedia: {},
                init: !0,
                expFactor: 1.5,
                hFac: .8,
                loadMode: 2,
                loadHidden: !0,
                ricTimeout: 0,
                throttleDelay: 125
            };
            e = a.lazySizesConfig || a.lazysizesConfig || {};
            for (b in c) b in e || (e[b] = c[b])
        }(), !b || !b.getElementsByClassName) return {
        init: function() {},
        cfg: e,
        noSupport: !0
    };
    var f = b.documentElement,
        g = a.HTMLPictureElement,
        h = "addEventListener",
        i = "getAttribute",
        j = a[h].bind(a),
        k = a.setTimeout,
        l = a.requestAnimationFrame || k,
        m = a.requestIdleCallback,
        n = /^picture$/i,
        o = ["load", "error", "lazyincluded", "_lazyloaded"],
        p = {},
        q = Array.prototype.forEach,
        r = function(a, b) {
            return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")), p[b].test(a[i]("class") || "") && p[b]
        },
        s = function(a, b) {
            r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b)
        },
        t = function(a, b) {
            var c;
            (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "))
        },
        u = function(a, b, c) {
            var d = c ? h : "removeEventListener";
            c && u(a, b), o.forEach(function(c) {
                a[d](c, b)
            })
        },
        v = function(a, c, e, f, g) {
            var h = b.createEvent("Event");
            return e || (e = {}), e.instance = d, h.initEvent(c, !f, !g), h.detail = e, a.dispatchEvent(h), h
        },
        w = function(b, c) {
            var d;
            !g && (d = a.picturefill || e.pf) ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src), d({
                reevaluate: !0,
                elements: [b]
            })) : c && c.src && (b.src = c.src)
        },
        x = function(a, b) {
            return (getComputedStyle(a, null) || {})[b]
        },
        y = function(a, b, c) {
            for (c = c || a.offsetWidth; c < e.minSize && b && !a._lazysizesWidth;) c = b.offsetWidth, b = b.parentNode;
            return c
        },
        z = function() {
            var a, c, d = [],
                e = [],
                f = d,
                g = function() {
                    var b = f;
                    for (f = d.length ? e : d, a = !0, c = !1; b.length;) b.shift()();
                    a = !1
                },
                h = function(d, e) {
                    a && !e ? d.apply(this, arguments) : (f.push(d), c || (c = !0, (b.hidden ? k : l)(g)))
                };
            return h._lsFlush = g, h
        }(),
        A = function(a, b) {
            return b ? function() {
                z(a)
            } : function() {
                var b = this,
                    c = arguments;
                z(function() {
                    a.apply(b, c)
                })
            }
        },
        B = function(a) {
            var b, d = 0,
                f = e.throttleDelay,
                g = e.ricTimeout,
                h = function() {
                    b = !1, d = c.now(), a()
                },
                i = m && g > 49 ? function() {
                    m(h, {
                        timeout: g
                    }), g !== e.ricTimeout && (g = e.ricTimeout)
                } : A(function() {
                    k(h)
                }, !0);
            return function(a) {
                var e;
                (a = !0 === a) && (g = 33), b || (b = !0, e = f - (c.now() - d), e < 0 && (e = 0), a || e < 9 ? i() : k(i, e))
            }
        },
        C = function(a) {
            var b, d, e = 99,
                f = function() {
                    b = null, a()
                },
                g = function() {
                    var a = c.now() - d;
                    a < e ? k(g, e - a) : (m || f)(f)
                };
            return function() {
                d = c.now(), b || (b = k(g, e))
            }
        },
        D = function() {
            var g, m, o, p, y, D, F, G, H, I, J, K, L = /^img$/i,
                M = /^iframe$/i,
                N = "onscroll" in a && !/(gle|ing)bot/.test(navigator.userAgent),
                O = 0,
                P = 0,
                Q = 0,
                R = -1,
                S = function(a) {
                    Q--, (!a || Q < 0 || !a.target) && (Q = 0)
                },
                T = function(a) {
                    return null == K && (K = "hidden" == x(b.body, "visibility")), K || !("hidden" == x(a.parentNode, "visibility") && "hidden" == x(a, "visibility"))
                },
                U = function(a, c) {
                    var d, e = a,
                        g = T(a);
                    for (G -= c, J += c, H -= c, I += c; g && (e = e.offsetParent) && e != b.body && e != f;)(g = (x(e, "opacity") || 1) > 0) && "visible" != x(e, "overflow") && (d = e.getBoundingClientRect(), g = I > d.left && H < d.right && J > d.top - 1 && G < d.bottom + 1);
                    return g
                },
                V = function() {
                    var a, c, h, j, k, l, n, o, q, r, s, t, u = d.elements;
                    if ((p = e.loadMode) && Q < 8 && (a = u.length)) {
                        for (c = 0, R++; c < a; c++)
                            if (u[c] && !u[c]._lazyRace)
                                if (!N || d.prematureUnveil && d.prematureUnveil(u[c])) ba(u[c]);
                                else if ((o = u[c][i]("data-expand")) && (l = 1 * o) || (l = P), r || (r = !e.expand || e.expand < 1 ? f.clientHeight > 500 && f.clientWidth > 500 ? 500 : 370 : e.expand, d._defEx = r, s = r * e.expFactor, t = e.hFac, K = null, P < s && Q < 1 && R > 2 && p > 2 && !b.hidden ? (P = s, R = 0) : P = p > 1 && R > 1 && Q < 6 ? r : O), q !== l && (D = innerWidth + l * t, F = innerHeight + l, n = -1 * l, q = l), h = u[c].getBoundingClientRect(), (J = h.bottom) >= n && (G = h.top) <= F && (I = h.right) >= n * t && (H = h.left) <= D && (J || I || H || G) && (e.loadHidden || T(u[c])) && (m && Q < 3 && !o && (p < 3 || R < 4) || U(u[c], l))) {
                            if (ba(u[c]), k = !0, Q > 9) break
                        } else !k && m && !j && Q < 4 && R < 4 && p > 2 && (g[0] || e.preloadAfterLoad) && (g[0] || !o && (J || I || H || G || "auto" != u[c][i](e.sizesAttr))) && (j = g[0] || u[c]);
                        j && !k && ba(j)
                    }
                },
                W = B(V),
                X = function(a) {
                    var b = a.target;
                    if (b._lazyCache) return void delete b._lazyCache;
                    S(a), s(b, e.loadedClass), t(b, e.loadingClass), u(b, Z), v(b, "lazyloaded")
                },
                Y = A(X),
                Z = function(a) {
                    Y({
                        target: a.target
                    })
                },
                $ = function(a, b) {
                    try {
                        a.contentWindow.location.replace(b)
                    } catch (c) {
                        a.src = b
                    }
                },
                _ = function(a) {
                    var b, c = a[i](e.srcsetAttr);
                    (b = e.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b), c && a.setAttribute("srcset", c)
                },
                aa = A(function(a, b, c, d, f) {
                    var g, h, j, l, m, p;
                    (m = v(a, "lazybeforeunveil", b)).defaultPrevented || (d && (c ? s(a, e.autosizesClass) : a.setAttribute("sizes", d)), h = a[i](e.srcsetAttr), g = a[i](e.srcAttr), f && (j = a.parentNode, l = j && n.test(j.nodeName || "")), p = b.firesLoad || "src" in a && (h || g || l), m = {
                        target: a
                    }, s(a, e.loadingClass), p && (clearTimeout(o), o = k(S, 2500), u(a, Z, !0)), l && q.call(j.getElementsByTagName("source"), _), h ? a.setAttribute("srcset", h) : g && !l && (M.test(a.nodeName) ? $(a, g) : a.src = g), f && (h || l) && w(a, {
                        src: g
                    })), a._lazyRace && delete a._lazyRace, t(a, e.lazyClass), z(function() {
                        var b = a.complete && a.naturalWidth > 1;
                        p && !b || (b && s(a, "ls-is-cached"), X(m), a._lazyCache = !0, k(function() {
                            "_lazyCache" in a && delete a._lazyCache
                        }, 9)), "lazy" == a.loading && Q--
                    }, !0)
                }),
                ba = function(a) {
                    if (!a._lazyRace) {
                        var b, c = L.test(a.nodeName),
                            d = c && (a[i](e.sizesAttr) || a[i]("sizes")),
                            f = "auto" == d;
                        (!f && m || !c || !a[i]("src") && !a.srcset || a.complete || r(a, e.errorClass) || !r(a, e.lazyClass)) && (b = v(a, "lazyunveilread").detail, f && E.updateElem(a, !0, a.offsetWidth), a._lazyRace = !0, Q++, aa(a, b, f, d, c))
                    }
                },
                ca = C(function() {
                    e.loadMode = 3, W()
                }),
                da = function() {
                    3 == e.loadMode && (e.loadMode = 2), ca()
                },
                ea = function() {
                    if (!m) {
                        if (c.now() - y < 999) return void k(ea, 999);
                        m = !0, e.loadMode = 3, W(), j("scroll", da, !0)
                    }
                };
            return {
                _: function() {
                    y = c.now(), d.elements = b.getElementsByClassName(e.lazyClass), g = b.getElementsByClassName(e.lazyClass + " " + e.preloadClass), j("scroll", W, !0), j("resize", W, !0), j("pageshow", function(a) {
                        if (a.persisted) {
                            var c = b.querySelectorAll("." + e.loadingClass);
                            c.length && c.forEach && l(function() {
                                c.forEach(function(a) {
                                    a.complete && ba(a)
                                })
                            })
                        }
                    }), a.MutationObserver ? new MutationObserver(W).observe(f, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }) : (f[h]("DOMNodeInserted", W, !0), f[h]("DOMAttrModified", W, !0), setInterval(W, 999)), j("hashchange", W, !0), ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(a) {
                        b[h](a, W, !0)
                    }), /d$|^c/.test(b.readyState) ? ea() : (j("load", ea), b[h]("DOMContentLoaded", W), k(ea, 2e4)), d.elements.length ? (V(), z._lsFlush()) : W()
                },
                checkElems: W,
                unveil: ba,
                _aLSL: da
            }
        }(),
        E = function() {
            var a, c = A(function(a, b, c, d) {
                    var e, f, g;
                    if (a._lazysizesWidth = d, d += "px", a.setAttribute("sizes", d), n.test(b.nodeName || ""))
                        for (e = b.getElementsByTagName("source"), f = 0, g = e.length; f < g; f++) e[f].setAttribute("sizes", d);
                    c.detail.dataAttr || w(a, c.detail)
                }),
                d = function(a, b, d) {
                    var e, f = a.parentNode;
                    f && (d = y(a, f, d), e = v(a, "lazybeforesizes", {
                        width: d,
                        dataAttr: !!b
                    }), e.defaultPrevented || (d = e.detail.width) && d !== a._lazysizesWidth && c(a, f, e, d))
                },
                f = function() {
                    var b, c = a.length;
                    if (c)
                        for (b = 0; b < c; b++) d(a[b])
                },
                g = C(f);
            return {
                _: function() {
                    a = b.getElementsByClassName(e.autosizesClass), j("resize", g)
                },
                checkElems: g,
                updateElem: d
            }
        }(),
        F = function() {
            !F.i && b.getElementsByClassName && (F.i = !0, E._(), D._())
        };
    return k(function() {
        e.init && F()
    }), d = {
        cfg: e,
        autoSizer: E,
        loader: D,
        init: F,
        uP: w,
        aC: s,
        rC: t,
        hC: r,
        fire: v,
        gW: y,
        rAF: z
    }
});

function initCollapsibleElement($element) {
    var clickElement
    if ($element) {
        clickElement = $($element).find(".toggleElement a")
    } else {
        clickElement = $(".toggleElement a")
    }
    $(clickElement).off("click keydown")
    $(clickElement).on("click keydown", function() {
        var elementTarget = $(this).parent().data("target");
        $(elementTarget).toggle(500);
        if ($(this).parent().hasClass("expand")) {
            $(this).parent().removeClass("expand");
            $(this).parent().addClass("contract");
        } else {
            $(this).parent().addClass("expand");
            $(this).parent().removeClass("contract");
        }
        if (this.hash) {
            gu.fn.smoothieToTarget($(this.hash), false, 120);
        }
    });
};

initCollapsibleElement();