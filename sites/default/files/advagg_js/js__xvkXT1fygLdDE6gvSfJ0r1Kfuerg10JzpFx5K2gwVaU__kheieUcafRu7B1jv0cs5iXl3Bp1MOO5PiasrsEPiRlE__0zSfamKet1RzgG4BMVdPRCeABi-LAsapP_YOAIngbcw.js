/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/modules/contrib/jquery_update/replace/jquery-migrate/1/jquery-migrate.min.js. */
/*! jQuery Migrate v1.4.1 | (c) jQuery Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
    function(a, b, c) {
        function d(c) {
            var d = b.console;
            f[c] || (f[c] = !0, a.migrateWarnings.push(c), d && d.warn && !a.migrateMute && (d.warn("JQMIGRATE: " + c), a.migrateTrace && d.trace && d.trace()))
        }

        function e(b, c, e, f) {
            if (Object.defineProperty) try {
                return void Object.defineProperty(b, c, {
                    configurable: !0,
                    enumerable: !0,
                    get: function() {
                        return d(f), e
                    },
                    set: function(a) {
                        d(f), e = a
                    }
                })
            } catch (g) {}
            a._definePropertyBroken = !0, b[c] = e
        }
        a.migrateVersion = "1.4.1";
        var f = {};
        a.migrateWarnings = [], b.console && b.console.log && b.console.log("JQMIGRATE: Migrate is installed" + (a.migrateMute ? "" : " with logging active") + ", version " + a.migrateVersion), a.migrateTrace === c && (a.migrateTrace = !0), a.migrateReset = function() {
            f = {}, a.migrateWarnings.length = 0
        }, "BackCompat" === document.compatMode && d("jQuery is not compatible with Quirks Mode");
        var g = a("<input/>", {
                size: 1
            }).attr("size") && a.attrFn,
            h = a.attr,
            i = a.attrHooks.value && a.attrHooks.value.get || function() {
                return null
            },
            j = a.attrHooks.value && a.attrHooks.value.set || function() {
                return c
            },
            k = /^(?:input|button)$/i,
            l = /^[238]$/,
            m = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            n = /^(?:checked|selected)$/i;
        e(a, "attrFn", g || {}, "jQuery.attrFn is deprecated"), a.attr = function(b, e, f, i) {
            var j = e.toLowerCase(),
                o = b && b.nodeType;
            return i && (h.length < 4 && d("jQuery.fn.attr( props, pass ) is deprecated"), b && !l.test(o) && (g ? e in g : a.isFunction(a.fn[e]))) ? a(b)[e](f) : ("type" === e && f !== c && k.test(b.nodeName) && b.parentNode && d("Can't change the 'type' of an input or button in IE 6/7/8"), !a.attrHooks[j] && m.test(j) && (a.attrHooks[j] = {
                get: function(b, d) {
                    var e, f = a.prop(b, d);
                    return f === !0 || "boolean" != typeof f && (e = b.getAttributeNode(d)) && e.nodeValue !== !1 ? d.toLowerCase() : c
                },
                set: function(b, c, d) {
                    var e;
                    return c === !1 ? a.removeAttr(b, d) : (e = a.propFix[d] || d, e in b && (b[e] = !0), b.setAttribute(d, d.toLowerCase())), d
                }
            }, n.test(j) && d("jQuery.fn.attr('" + j + "') might use property instead of attribute")), h.call(a, b, e, f))
        }, a.attrHooks.value = {
            get: function(a, b) {
                var c = (a.nodeName || "").toLowerCase();
                return "button" === c ? i.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value') no longer gets properties"), b in a ? a.value : null)
            },
            set: function(a, b) {
                var c = (a.nodeName || "").toLowerCase();
                return "button" === c ? j.apply(this, arguments) : ("input" !== c && "option" !== c && d("jQuery.fn.attr('value', val) no longer sets properties"), void(a.value = b))
            }
        };
        var o, p, q = a.fn.init,
            r = a.find,
            s = a.parseJSON,
            t = /^\s*</,
            u = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
            v = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
            w = /^([^<]*)(<[\w\W]+>)([^>]*)$/;
        a.fn.init = function(b, e, f) {
            var g, h;
            return b && "string" == typeof b && !a.isPlainObject(e) && (g = w.exec(a.trim(b))) && g[0] && (t.test(b) || d("$(html) HTML strings must start with '<' character"), g[3] && d("$(html) HTML text after last tag is ignored"), "#" === g[0].charAt(0) && (d("HTML string cannot start with a '#' character"), a.error("JQMIGRATE: Invalid selector string (XSS)")), e && e.context && e.context.nodeType && (e = e.context), a.parseHTML) ? q.call(this, a.parseHTML(g[2], e && e.ownerDocument || e || document, !0), e, f) : (h = q.apply(this, arguments), b && b.selector !== c ? (h.selector = b.selector, h.context = b.context) : (h.selector = "string" == typeof b ? b : "", b && (h.context = b.nodeType ? b : e || document)), h)
        }, a.fn.init.prototype = a.fn, a.find = function(a) {
            var b = Array.prototype.slice.call(arguments);
            if ("string" == typeof a && u.test(a)) try {
                document.querySelector(a)
            } catch (c) {
                a = a.replace(v, function(a, b, c, d) {
                    return "[" + b + c + '"' + d + '"]'
                });
                try {
                    document.querySelector(a), d("Attribute selector with '#' must be quoted: " + b[0]), b[0] = a
                } catch (e) {
                    d("Attribute selector with '#' was not fixed: " + b[0])
                }
            }
            return r.apply(this, b)
        };
        var x;
        for (x in r) Object.prototype.hasOwnProperty.call(r, x) && (a.find[x] = r[x]);
        a.parseJSON = function(a) {
            return a ? s.apply(this, arguments) : (d("jQuery.parseJSON requires a valid JSON string"), null)
        }, a.uaMatch = function(a) {
            a = a.toLowerCase();
            var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || [];
            return {
                browser: b[1] || "",
                version: b[2] || "0"
            }
        }, a.browser || (o = a.uaMatch(navigator.userAgent), p = {}, o.browser && (p[o.browser] = !0, p.version = o.version), p.chrome ? p.webkit = !0 : p.webkit && (p.safari = !0), a.browser = p), e(a, "browser", a.browser, "jQuery.browser is deprecated"), a.boxModel = a.support.boxModel = "CSS1Compat" === document.compatMode, e(a, "boxModel", a.boxModel, "jQuery.boxModel is deprecated"), e(a.support, "boxModel", a.support.boxModel, "jQuery.support.boxModel is deprecated"), a.sub = function() {
            function b(a, c) {
                return new b.fn.init(a, c)
            }
            a.extend(!0, b, this), b.superclass = this, b.fn = b.prototype = this(), b.fn.constructor = b, b.sub = this.sub, b.fn.init = function(d, e) {
                var f = a.fn.init.call(this, d, e, c);
                return f instanceof b ? f : b(f)
            }, b.fn.init.prototype = b.fn;
            var c = b(document);
            return d("jQuery.sub() is deprecated"), b
        }, a.fn.size = function() {
            return d("jQuery.fn.size() is deprecated; use the .length property"), this.length
        };
        var y = !1;
        a.swap && a.each(["height", "width", "reliableMarginRight"], function(b, c) {
            var d = a.cssHooks[c] && a.cssHooks[c].get;
            d && (a.cssHooks[c].get = function() {
                var a;
                return y = !0, a = d.apply(this, arguments), y = !1, a
            })
        }), a.swap = function(a, b, c, e) {
            var f, g, h = {};
            y || d("jQuery.swap() is undocumented and deprecated");
            for (g in b) h[g] = a.style[g], a.style[g] = b[g];
            f = c.apply(a, e || []);
            for (g in b) a.style[g] = h[g];
            return f
        }, a.ajaxSetup({
            converters: {
                "text json": a.parseJSON
            }
        });
        var z = a.fn.data;
        a.fn.data = function(b) {
            var e, f, g = this[0];
            return !g || "events" !== b || 1 !== arguments.length || (e = a.data(g, b), f = a._data(g, b), e !== c && e !== f || f === c) ? z.apply(this, arguments) : (d("Use of jQuery.fn.data('events') is deprecated"), f)
        };
        var A = /\/(java|ecma)script/i;
        a.clean || (a.clean = function(b, c, e, f) {
            c = c || document, c = !c.nodeType && c[0] || c, c = c.ownerDocument || c, d("jQuery.clean() is deprecated");
            var g, h, i, j, k = [];
            if (a.merge(k, a.buildFragment(b, c).childNodes), e)
                for (i = function(a) {
                        return !a.type || A.test(a.type) ? f ? f.push(a.parentNode ? a.parentNode.removeChild(a) : a) : e.appendChild(a) : void 0
                    }, g = 0; null != (h = k[g]); g++) a.nodeName(h, "script") && i(h) || (e.appendChild(h), "undefined" != typeof h.getElementsByTagName && (j = a.grep(a.merge([], h.getElementsByTagName("script")), i), k.splice.apply(k, [g + 1, 0].concat(j)), g += j.length));
            return k
        });
        var B = a.event.add,
            C = a.event.remove,
            D = a.event.trigger,
            E = a.fn.toggle,
            F = a.fn.live,
            G = a.fn.die,
            H = a.fn.load,
            I = "ajaxStart|ajaxStop|ajaxSend|ajaxComplete|ajaxError|ajaxSuccess",
            J = new RegExp("\\b(?:" + I + ")\\b"),
            K = /(?:^|\s)hover(\.\S+|)\b/,
            L = function(b) {
                return "string" != typeof b || a.event.special.hover ? b : (K.test(b) && d("'hover' pseudo-event is deprecated, use 'mouseenter mouseleave'"), b && b.replace(K, "mouseenter$1 mouseleave$1"))
            };
        a.event.props && "attrChange" !== a.event.props[0] && a.event.props.unshift("attrChange", "attrName", "relatedNode", "srcElement"), a.event.dispatch && e(a.event, "handle", a.event.dispatch, "jQuery.event.handle is undocumented and deprecated"), a.event.add = function(a, b, c, e, f) {
            a !== document && J.test(b) && d("AJAX events should be attached to document: " + b), B.call(this, a, L(b || ""), c, e, f)
        }, a.event.remove = function(a, b, c, d, e) {
            C.call(this, a, L(b) || "", c, d, e)
        }, a.each(["load", "unload", "error"], function(b, c) {
            a.fn[c] = function() {
                var a = Array.prototype.slice.call(arguments, 0);
                return "load" === c && "string" == typeof a[0] ? H.apply(this, a) : (d("jQuery.fn." + c + "() is deprecated"), a.splice(0, 0, c), arguments.length ? this.bind.apply(this, a) : (this.triggerHandler.apply(this, a), this))
            }
        }), a.fn.toggle = function(b, c) {
            if (!a.isFunction(b) || !a.isFunction(c)) return E.apply(this, arguments);
            d("jQuery.fn.toggle(handler, handler...) is deprecated");
            var e = arguments,
                f = b.guid || a.guid++,
                g = 0,
                h = function(c) {
                    var d = (a._data(this, "lastToggle" + b.guid) || 0) % g;
                    return a._data(this, "lastToggle" + b.guid, d + 1), c.preventDefault(), e[d].apply(this, arguments) || !1
                };
            for (h.guid = f; g < e.length;) e[g++].guid = f;
            return this.click(h)
        }, a.fn.live = function(b, c, e) {
            return d("jQuery.fn.live() is deprecated"), F ? F.apply(this, arguments) : (a(this.context).on(b, this.selector, c, e), this)
        }, a.fn.die = function(b, c) {
            return d("jQuery.fn.die() is deprecated"), G ? G.apply(this, arguments) : (a(this.context).off(b, this.selector || "**", c), this)
        }, a.event.trigger = function(a, b, c, e) {
            return c || J.test(a) || d("Global events are undocumented and deprecated"), D.call(this, a, b, c || document, e)
        }, a.each(I.split("|"), function(b, c) {
            a.event.special[c] = {
                setup: function() {
                    var b = this;
                    return b !== document && (a.event.add(document, c + "." + a.guid, function() {
                        a.event.trigger(c, Array.prototype.slice.call(arguments, 1), b, !0)
                    }), a._data(this, c, a.guid++)), !1
                },
                teardown: function() {
                    return this !== document && a.event.remove(document, c + "." + a._data(this, c)), !1
                }
            }
        }), a.event.special.ready = {
            setup: function() {
                this === document && d("'ready' event is deprecated")
            }
        };
        var M = a.fn.andSelf || a.fn.addBack,
            N = a.fn.find;
        if (a.fn.andSelf = function() {
                return d("jQuery.fn.andSelf() replaced by jQuery.fn.addBack()"), M.apply(this, arguments)
            }, a.fn.find = function(a) {
                var b = N.apply(this, arguments);
                return b.context = this.context, b.selector = this.selector ? this.selector + " " + a : a, b
            }, a.Callbacks) {
            var O = a.Deferred,
                P = [
                    ["resolve", "done", a.Callbacks("once memory"), a.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", a.Callbacks("once memory"), a.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", a.Callbacks("memory"), a.Callbacks("memory")]
                ];
            a.Deferred = function(b) {
                var c = O(),
                    e = c.promise();
                return c.pipe = e.pipe = function() {
                    var b = arguments;
                    return d("deferred.pipe() is deprecated"), a.Deferred(function(d) {
                        a.each(P, function(f, g) {
                            var h = a.isFunction(b[f]) && b[f];
                            c[g[1]](function() {
                                var b = h && h.apply(this, arguments);
                                b && a.isFunction(b.promise) ? b.promise().done(d.resolve).fail(d.reject).progress(d.notify) : d[g[0] + "With"](this === e ? d.promise() : this, h ? [b] : arguments)
                            })
                        }), b = null
                    }).promise()
                }, c.isResolved = function() {
                    return d("deferred.isResolved is deprecated"), "resolved" === c.state()
                }, c.isRejected = function() {
                    return d("deferred.isRejected is deprecated"), "rejected" === c.state()
                }, b && b.call(c, c), c
            }
        }
    }(jQuery, window);

; /*})'"*/ ;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/modules/contrib/jquery_update/replace/jquery-migrate/1/jquery-migrate.min.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/misc/jquery-extend-3.4.0.js. */
(function(jQuery) {
    var versionParts = jQuery.fn.jquery.split('.'),
        majorVersion = parseInt(versionParts[0]),
        minorVersion = parseInt(versionParts[1]),
        patchVersion = parseInt(versionParts[2]),
        isPreReleaseVersion = (patchVersion.toString() !== versionParts[2]);
    if ((majorVersion > 3) || (majorVersion === 3 && minorVersion > 4) || (majorVersion === 3 && minorVersion === 4 && patchVersion > 0) || (majorVersion === 3 && minorVersion === 4 && patchVersion === 0 && !isPreReleaseVersion)) return;
    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++
        };
        if (typeof target !== "object" && !jQuery.isFunction(target)) target = {};
        if (i === length) {
            target = this;
            i--
        };
        for (; i < length; i++)
            if ((options = arguments[i]) != null)
                for (name in options) {
                    copy = options[name];
                    if (name === "__proto__" || target === copy) continue;
                    if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
                        src = target[name];
                        if (copyIsArray && !jQuery.isArray(src)) {
                            clone = []
                        } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                            clone = {}
                        } else clone = src;
                        copyIsArray = false;
                        target[name] = jQuery.extend(deep, clone, copy)
                    } else if (copy !== undefined) target[name] = copy
                };
        return target
    }
})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/misc/jquery-extend-3.4.0.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/misc/jquery-html-prefilter-3.5.0-backport.js. */
(function(jQuery) {
    var versionParts = jQuery.fn.jquery.split('.'),
        majorVersion = parseInt(versionParts[0]),
        minorVersion = parseInt(versionParts[1]);
    if ((majorVersion > 3) || (majorVersion === 3 && minorVersion >= 5)) return;
    var selfClosingTagsToReplace = ['a', 'abbr', 'address', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'blockquote', 'button', 'canvas', 'caption', 'cite', 'code', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'div', 'dl', 'dt', 'em', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'i', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'menu', 'meter', 'nav', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'small', 'source', 'span', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'time', 'tr', 'u', 'ul', 'var', 'video'],
        xhtmlRegExpGroup = '(' + selfClosingTagsToReplace.join('|') + ')',
        whitespace = '[\\x20\\t\\r\\n\\f]',
        rxhtmlTagWithoutSpaceOrAttributes = new RegExp('<' + xhtmlRegExpGroup + '\\/>', 'gi'),
        rxhtmlTagWithSpaceAndMaybeAttributes = new RegExp('<' + xhtmlRegExpGroup + '(' + whitespace + '[^>]*)\\/>', 'gi'),
        rtagName;
    if (majorVersion < 3) {
        rtagName = /<([\w:]+)/
    } else if (minorVersion < 4) {
        rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i
    } else rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
    var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi;
    jQuery.extend({
        htmlPrefilter: function(html) {
            var tag = (rtagName.exec(html) || ["", ""])[1].toLowerCase();
            if ((tag === 'option' || tag === 'optgroup') && html.match(/<\/?select/i)) html = '';
            html = html.replace(rxhtmlTagWithoutSpaceOrAttributes, "<$1></$1>");
            html = html.replace(rxhtmlTagWithSpaceAndMaybeAttributes, "<$1$2></$1>");
            if ((majorVersion === 1 && minorVersion < 12) || (majorVersion === 2 && minorVersion < 2)) {
                var htmlRisky = html.replace(rxhtmlTag, "<$1></$2>");
                if (htmlRisky !== html) {
                    var wrapMap = {
                        thead: [1, "<table>", "</table>"],
                        col: [2, "<table><colgroup>", "</colgroup></table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"]
                    };
                    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
                    wrapMap.th = wrapMap.td;
                    var getWrappedHtml = function(html) {
                            var wrap = wrapMap[tag];
                            if (wrap) html = wrap[1] + html + wrap[2];
                            return html
                        },
                        getParsedHtml = function(html) {
                            var doc = window.document.implementation.createHTMLDocument("");
                            doc.body.innerHTML = html;
                            return doc.body ? doc.body.innerHTML : ''
                        },
                        htmlParsed = getParsedHtml(getWrappedHtml(html)),
                        htmlRiskyParsed = getParsedHtml(getWrappedHtml(htmlRisky));
                    if (htmlRiskyParsed === '' || htmlParsed === '' || (htmlRiskyParsed !== htmlParsed)) html = ''
                }
            };
            return html
        }
    });
    if ((majorVersion === 1 && minorVersion < 12) || (majorVersion === 2 && minorVersion < 2)) {
        var fnOriginalHtml = jQuery.fn.html;
        jQuery.fn.extend({
            html: function(value) {
                if (typeof value === "string") value = jQuery.htmlPrefilter(value);
                return fnOriginalHtml.apply(this, arguments.length ? [value] : [])
            }
        });
        var rhtml = /<|&#?\w+;/;
        if (majorVersion === 1 && minorVersion < 9) {
            var originalClean = jQuery.clean;
            jQuery.extend({
                clean: function(elems, context, fragment, scripts) {
                    for (var i = 0, elem;
                        (elem = elems[i]) != null; i++)
                        if (typeof elem === "string" && rhtml.test(elem)) elems[i] = elem = jQuery.htmlPrefilter(elem);
                    return originalClean.call(this, elems, context, fragment, scripts)
                }
            })
        } else {
            var originalBuildFragment = jQuery.buildFragment;
            jQuery.extend({
                buildFragment: function(elems, context, scripts, selection) {
                    var l = elems.length;
                    for (var i = 0; i < l; i++) {
                        var elem = elems[i];
                        if (elem || elem === 0)
                            if (jQuery.type(elem) !== "object" && rhtml.test(elem)) elems[i] = elem = jQuery.htmlPrefilter(elem)
                    };
                    return originalBuildFragment.call(this, elems, context, scripts, selection)
                }
            })
        }
    }
})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/misc/jquery-html-prefilter-3.5.0-backport.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/misc/jquery.once.js. */
(function($) {
    var cache = {},
        uuid = 0;
    $.fn.once = function(id, fn) {
        if (typeof id != 'string') {
            if (!(id in cache)) cache[id] = ++uuid;
            if (!fn) fn = id;
            id = 'jquery-once-' + cache[id]
        };
        var name = id + '-processed',
            elements = this.not('.' + name).addClass(name);
        return $.isFunction(fn) ? elements.each(fn) : elements
    };
    $.fn.removeOnce = function(id, fn) {
        var name = id + '-processed',
            elements = this.filter('.' + name).removeClass(name);
        return $.isFunction(fn) ? elements.each(fn) : elements
    }
})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/misc/jquery.once.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/misc/drupal.js. */
var Drupal = Drupal || {
    settings: {},
    behaviors: {},
    locale: {}
};
jQuery.noConflict();
(function($) {
    var jquery_init = $.fn.init;
    $.fn.init = function(selector, context, rootjQuery) {
        if (selector && typeof selector === 'string') {
            var hash_position = selector.indexOf('#');
            if (hash_position >= 0) {
                var bracket_position = selector.indexOf('<');
                if (bracket_position > hash_position) throw 'Syntax error, unrecognized expression: ' + selector
            }
        };
        return jquery_init.call(this, selector, context, rootjQuery)
    };
    $.fn.init.prototype = jquery_init.prototype;
    if ($.ajaxPrefilter) {
        $.ajaxPrefilter(function(s) {
            if (s.crossDomain) s.contents.script = false
        })
    } else if ($.httpData) {
        var jquery_httpData = $.httpData;
        $.httpData = function(xhr, type, s) {
            if (!type && !Drupal.urlIsLocal(s.url)) {
                var content_type = xhr.getResponseHeader('content-type') || '';
                if (content_type.indexOf('javascript') >= 0) type = 'text'
            };
            return jquery_httpData.call(this, xhr, type, s)
        };
        $.httpData.prototype = jquery_httpData.prototype
    };
    Drupal.attachBehaviors = function(context, settings) {
        context = context || document;
        settings = settings || Drupal.settings;
        $.each(Drupal.behaviors, function() {
            if ($.isFunction(this.attach)) this.attach(context, settings)
        })
    };
    Drupal.detachBehaviors = function(context, settings, trigger) {
        context = context || document;
        settings = settings || Drupal.settings;
        trigger = trigger || 'unload';
        $.each(Drupal.behaviors, function() {
            if ($.isFunction(this.detach)) this.detach(context, settings, trigger)
        })
    };
    Drupal.checkPlain = function(str) {
        var character, regex, replace = {
            '&': '&amp;',
            "'": '&#39;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;'
        };
        str = String(str);
        for (character in replace)
            if (replace.hasOwnProperty(character)) {
                regex = new RegExp(character, 'g');
                str = str.replace(regex, replace[character])
            };
        return str
    };
    Drupal.formatString = function(str, args) {
        for (var key in args)
            if (args.hasOwnProperty(key)) switch (key.charAt(0)) {
                case '@':
                    args[key] = Drupal.checkPlain(args[key]);
                    break;
                case '!':
                    break;
                default:
                    args[key] = Drupal.theme('placeholder', args[key]);
                    break
            };
        return Drupal.stringReplace(str, args, null)
    };
    Drupal.stringReplace = function(str, args, keys) {
        if (str.length === 0) return str;
        if (!$.isArray(keys)) {
            keys = [];
            for (var k in args)
                if (args.hasOwnProperty(k)) keys.push(k);
            keys.sort(function(a, b) {
                return a.length - b.length
            })
        };
        if (keys.length === 0) return str;
        var key = keys.pop(),
            fragments = str.split(key);
        if (keys.length)
            for (var i = 0; i < fragments.length; i++) fragments[i] = Drupal.stringReplace(fragments[i], args, keys.slice(0));
        return fragments.join(args[key])
    };
    Drupal.t = function(str, args, options) {
        options = options || {};
        options.context = options.context || '';
        if (Drupal.locale.strings && Drupal.locale.strings[options.context] && Drupal.locale.strings[options.context][str]) str = Drupal.locale.strings[options.context][str];
        if (args) str = Drupal.formatString(str, args);
        return str
    };
    Drupal.formatPlural = function(count, singular, plural, args, options) {
        args = args || {};
        args['@count'] = count;
        var index = Drupal.locale.pluralFormula ? Drupal.locale.pluralFormula(args['@count']) : ((args['@count'] == 1) ? 0 : 1);
        if (index == 0) {
            return Drupal.t(singular, args, options)
        } else if (index == 1) {
            return Drupal.t(plural, args, options)
        } else {
            args['@count[' + index + ']'] = args['@count'];
            delete args['@count'];
            return Drupal.t(plural.replace('@count', '@count[' + index + ']'), args, options)
        }
    };
    Drupal.absoluteUrl = function(url) {
        var urlParsingNode = document.createElement('a');
        try {
            url = decodeURIComponent(url)
        } catch (e) {};
        urlParsingNode.setAttribute('href', url);
        return urlParsingNode.cloneNode(false).href
    };
    Drupal.urlIsLocal = function(url) {
        var absoluteUrl = Drupal.absoluteUrl(url),
            protocol = location.protocol;
        if (protocol === 'http:' && absoluteUrl.indexOf('https:') === 0) protocol = 'https:';
        var baseUrl = protocol + '//' + location.host + Drupal.settings.basePath.slice(0, -1);
        try {
            absoluteUrl = decodeURIComponent(absoluteUrl)
        } catch (e) {};
        try {
            baseUrl = decodeURIComponent(baseUrl)
        } catch (e) {};
        return absoluteUrl === baseUrl || absoluteUrl.indexOf(baseUrl + '/') === 0
    };
    Drupal.sanitizeAjaxUrl = function(url) {
        var regex = /\=\?(&|$)/;
        while (url.match(regex)) url = url.replace(regex, '');
        return url
    };
    Drupal.theme = function(func) {
        var args = Array.prototype.slice.apply(arguments, [1]);
        return (Drupal.theme[func] || Drupal.theme.prototype[func]).apply(this, args)
    };
    Drupal.freezeHeight = function() {
        Drupal.unfreezeHeight();
        $('<div id="freeze-height"></div>').css({
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '1px',
            height: $('body').css('height')
        }).appendTo('body')
    };
    Drupal.unfreezeHeight = function() {
        $('#freeze-height').remove()
    };
    Drupal.encodePath = function(item, uri) {
        uri = uri || location.href;
        return encodeURIComponent(item).replace(/%2F/g, '/')
    };
    Drupal.getSelection = function(element) {
        if (typeof element.selectionStart != 'number' && document.selection) {
            var range1 = document.selection.createRange(),
                range2 = range1.duplicate();
            range2.moveToElementText(element);
            range2.setEndPoint('EndToEnd', range1);
            var start = range2.text.length - range1.text.length,
                end = start + range1.text.length;
            return {
                start: start,
                end: end
            }
        };
        return {
            start: element.selectionStart,
            end: element.selectionEnd
        }
    };
    Drupal.beforeUnloadCalled = false;
    $(window).bind('beforeunload pagehide', function() {
        Drupal.beforeUnloadCalled = true
    });
    Drupal.displayAjaxError = function(message) {
        if (!Drupal.beforeUnloadCalled) alert(message)
    };
    Drupal.ajaxError = function(xmlhttp, uri, customMessage) {
        var statusCode, statusText, pathText, responseText, readyStateText, message;
        if (xmlhttp.status) {
            statusCode = "\n" + Drupal.t("An AJAX HTTP error occurred.") + "\n" + Drupal.t("HTTP Result Code: !status", {
                '!status': xmlhttp.status
            })
        } else statusCode = "\n" + Drupal.t("An AJAX HTTP request terminated abnormally.");
        statusCode += "\n" + Drupal.t("Debugging information follows.");
        pathText = "\n" + Drupal.t("Path: !uri", {
            '!uri': uri
        });
        statusText = '';
        try {
            statusText = "\n" + Drupal.t("StatusText: !statusText", {
                '!statusText': $.trim(xmlhttp.statusText)
            })
        } catch (e) {};
        responseText = '';
        try {
            responseText = "\n" + Drupal.t("ResponseText: !responseText", {
                '!responseText': $.trim(xmlhttp.responseText)
            })
        } catch (e) {};
        responseText = responseText.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, "");
        responseText = responseText.replace(/[\n]+\s+/g, "\n");
        readyStateText = xmlhttp.status == 0 ? ("\n" + Drupal.t("ReadyState: !readyState", {
            '!readyState': xmlhttp.readyState
        })) : "";
        customMessage = customMessage ? ("\n" + Drupal.t("CustomMessage: !customMessage", {
            '!customMessage': customMessage
        })) : "";
        message = statusCode + pathText + statusText + customMessage + responseText + readyStateText;
        return message
    };
    $('html').addClass('js');
    document.cookie = 'has_js=1; path=/';
    $(function() {
        if (jQuery.support.positionFixed === undefined) {
            var el = $('<div style="position:fixed; top:10px" />').appendTo(document.body);
            jQuery.support.positionFixed = el[0].offsetTop === 10;
            el.remove()
        }
    });
    $(function() {
        Drupal.attachBehaviors(document, Drupal.settings)
    });
    Drupal.theme.prototype = {
        placeholder: function(str) {
            return '<em class="placeholder">' + Drupal.checkPlain(str) + '</em>'
        }
    }
})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/misc/drupal.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/modules/custom/helpers/helpers.js. */
(function($, undefined) {
    $(function() {})
})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/modules/custom/helpers/helpers.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/modules/contrib/fancybox/fancybox.js. */
(function($) {
    Drupal.behaviors.fancyBox = {
        attach: function(context, settings) {
            var selectors = ['.fancybox'];
            if (typeof settings.fancybox === 'undefined') settings.fancybox = {};
            if (typeof settings.fancybox.options === 'undefined') settings.fancybox.options = {};
            if (typeof settings.fancybox.callbacks !== 'undefined') $.each(settings.fancybox.callbacks, function(i, cal) {
                settings.fancybox.options[i] = window[cal]
            });
            if (typeof settings.fancybox.helpers !== 'undefined') {
                settings.fancybox.options.helpers = settings.fancybox.helpers;
                delete settings.fancybox.helpers
            };
            if (typeof settings.fancybox.selectors !== 'undefined') selectors = selectors.concat(settings.fancybox.selectors);
            settings.fancybox.options.live = false;
            $(selectors.join(',')).fancybox(settings.fancybox.options)
        }
    }
})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/modules/contrib/fancybox/fancybox.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/libraries/fancybox/source/jquery.fancybox.pack.js. */
/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(s, H, f, w) {
    var K = f("html"),
        q = f(s),
        p = f(H),
        b = f.fancybox = function() {
            b.open.apply(this, arguments)
        },
        J = navigator.userAgent.match(/msie/i),
        C = null,
        t = H.createTouch !== w,
        u = function(a) {
            return a && a.hasOwnProperty && a instanceof f
        },
        r = function(a) {
            return a && "string" === f.type(a)
        },
        F = function(a) {
            return r(a) && 0 < a.indexOf("%")
        },
        m = function(a, d) {
            var e = parseInt(a, 10) || 0;
            d && F(a) && (e *= b.getViewport()[d] / 100);
            return Math.ceil(e)
        },
        x = function(a, b) {
            return m(a, b) + "px"
        };
    f.extend(b, {
        version: "2.1.5",
        defaults: {
            padding: 15,
            margin: 20,
            width: 800,
            height: 600,
            minWidth: 100,
            minHeight: 100,
            maxWidth: 9999,
            maxHeight: 9999,
            pixelRatio: 1,
            autoSize: !0,
            autoHeight: !1,
            autoWidth: !1,
            autoResize: !0,
            autoCenter: !t,
            fitToView: !0,
            aspectRatio: !1,
            topRatio: 0.5,
            leftRatio: 0.5,
            scrolling: "auto",
            wrapCSS: "",
            arrows: !0,
            closeBtn: !0,
            closeClick: !1,
            nextClick: !1,
            mouseWheel: !0,
            autoPlay: !1,
            playSpeed: 3E3,
            preload: 3,
            modal: !1,
            loop: !0,
            ajax: {
                dataType: "html",
                headers: {
                    "X-fancyBox": !0
                }
            },
            iframe: {
                scrolling: "auto",
                preload: !0
            },
            swf: {
                wmode: "transparent",
                allowfullscreen: "true",
                allowscriptaccess: "always"
            },
            keys: {
                next: {
                    13: "left",
                    34: "up",
                    39: "left",
                    40: "up"
                },
                prev: {
                    8: "right",
                    33: "down",
                    37: "right",
                    38: "down"
                },
                close: [27],
                play: [32],
                toggle: [70]
            },
            direction: {
                next: "left",
                prev: "right"
            },
            scrollOutside: !0,
            index: 0,
            type: null,
            href: null,
            content: null,
            title: null,
            tpl: {
                wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                image: '<img class="fancybox-image" src="{href}" alt="" />',
                iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' +
                    (J ? ' allowtransparency="true"' : "") + "></iframe>",
                error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
            },
            openEffect: "fade",
            openSpeed: 250,
            openEasing: "swing",
            openOpacity: !0,
            openMethod: "zoomIn",
            closeEffect: "fade",
            closeSpeed: 250,
            closeEasing: "swing",
            closeOpacity: !0,
            closeMethod: "zoomOut",
            nextEffect: "elastic",
            nextSpeed: 250,
            nextEasing: "swing",
            nextMethod: "changeIn",
            prevEffect: "elastic",
            prevSpeed: 250,
            prevEasing: "swing",
            prevMethod: "changeOut",
            helpers: {
                overlay: !0,
                title: !0
            },
            onCancel: f.noop,
            beforeLoad: f.noop,
            afterLoad: f.noop,
            beforeShow: f.noop,
            afterShow: f.noop,
            beforeChange: f.noop,
            beforeClose: f.noop,
            afterClose: f.noop
        },
        group: {},
        opts: {},
        previous: null,
        coming: null,
        current: null,
        isActive: !1,
        isOpen: !1,
        isOpened: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null,
        player: {
            timer: null,
            isActive: !1
        },
        ajaxLoad: null,
        imgPreload: null,
        transitions: {},
        helpers: {},
        open: function(a, d) {
            if (a && (f.isPlainObject(d) || (d = {}), !1 !== b.close(!0))) return f.isArray(a) || (a = u(a) ? f(a).get() : [a]), f.each(a, function(e, c) {
                var l = {},
                    g, h, k, n, m;
                "object" === f.type(c) && (c.nodeType && (c = f(c)), u(c) ? (l = {
                        href: c.data("fancybox-href") || c.attr("href"),
                        title: f("<div/>").text(c.data("fancybox-title") || c.attr("title")).html(),
                        isDom: !0,
                        element: c
                    },
                    f.metadata && f.extend(!0, l, c.metadata())) : l = c);
                g = d.href || l.href || (r(c) ? c : null);
                h = d.title !== w ? d.title : l.title || "";
                n = (k = d.content || l.content) ? "html" : d.type || l.type;
                !n && l.isDom && (n = c.data("fancybox-type"), n || (n = (n = c.prop("class").match(/fancybox\.(\w+)/)) ? n[1] : null));
                r(g) && (n || (b.isImage(g) ? n = "image" : b.isSWF(g) ? n = "swf" : "#" === g.charAt(0) ? n = "inline" : r(c) && (n = "html", k = c)), "ajax" === n && (m = g.split(/\s+/, 2), g = m.shift(), m = m.shift()));
                k || ("inline" === n ? g ? k = f(r(g) ? g.replace(/.*(?=#[^\s]+$)/, "") : g) : l.isDom && (k = c) :
                    "html" === n ? k = g : n || g || !l.isDom || (n = "inline", k = c));
                f.extend(l, {
                    href: g,
                    type: n,
                    content: k,
                    title: h,
                    selector: m
                });
                a[e] = l
            }), b.opts = f.extend(!0, {}, b.defaults, d), d.keys !== w && (b.opts.keys = d.keys ? f.extend({}, b.defaults.keys, d.keys) : !1), b.group = a, b._start(b.opts.index)
        },
        cancel: function() {
            var a = b.coming;
            a && !1 === b.trigger("onCancel") || (b.hideLoading(), a && (b.ajaxLoad && b.ajaxLoad.abort(), b.ajaxLoad = null, b.imgPreload && (b.imgPreload.onload = b.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(),
                b.coming = null, b.current || b._afterZoomOut(a)))
        },
        close: function(a) {
            b.cancel();
            !1 !== b.trigger("beforeClose") && (b.unbindEvents(), b.isActive && (b.isOpen && !0 !== a ? (b.isOpen = b.isOpened = !1, b.isClosing = !0, f(".fancybox-item, .fancybox-nav").remove(), b.wrap.stop(!0, !0).removeClass("fancybox-opened"), b.transitions[b.current.closeMethod]()) : (f(".fancybox-wrap").stop(!0).trigger("onReset").remove(), b._afterZoomOut())))
        },
        play: function(a) {
            var d = function() {
                    clearTimeout(b.player.timer)
                },
                e = function() {
                    d();
                    b.current && b.player.isActive &&
                        (b.player.timer = setTimeout(b.next, b.current.playSpeed))
                },
                c = function() {
                    d();
                    p.unbind(".player");
                    b.player.isActive = !1;
                    b.trigger("onPlayEnd")
                };
            !0 === a || !b.player.isActive && !1 !== a ? b.current && (b.current.loop || b.current.index < b.group.length - 1) && (b.player.isActive = !0, p.bind({
                "onCancel.player beforeClose.player": c,
                "onUpdate.player": e,
                "beforeLoad.player": d
            }), e(), b.trigger("onPlayStart")) : c()
        },
        next: function(a) {
            var d = b.current;
            d && (r(a) || (a = d.direction.next), b.jumpto(d.index + 1, a, "next"))
        },
        prev: function(a) {
            var d =
                b.current;
            d && (r(a) || (a = d.direction.prev), b.jumpto(d.index - 1, a, "prev"))
        },
        jumpto: function(a, d, e) {
            var c = b.current;
            c && (a = m(a), b.direction = d || c.direction[a >= c.index ? "next" : "prev"], b.router = e || "jumpto", c.loop && (0 > a && (a = c.group.length + a % c.group.length), a %= c.group.length), c.group[a] !== w && (b.cancel(), b._start(a)))
        },
        reposition: function(a, d) {
            var e = b.current,
                c = e ? e.wrap : null,
                l;
            c && (l = b._getPosition(d), a && "scroll" === a.type ? (delete l.position, c.stop(!0, !0).animate(l, 200)) : (c.css(l), e.pos = f.extend({}, e.dim, l)))
        },
        update: function(a) {
            var d = a && a.originalEvent && a.originalEvent.type,
                e = !d || "orientationchange" === d;
            e && (clearTimeout(C), C = null);
            b.isOpen && !C && (C = setTimeout(function() {
                var c = b.current;
                c && !b.isClosing && (b.wrap.removeClass("fancybox-tmp"), (e || "load" === d || "resize" === d && c.autoResize) && b._setDimension(), "scroll" === d && c.canShrink || b.reposition(a), b.trigger("onUpdate"), C = null)
            }, e && !t ? 0 : 300))
        },
        toggle: function(a) {
            b.isOpen && (b.current.fitToView = "boolean" === f.type(a) ? a : !b.current.fitToView, t && (b.wrap.removeAttr("style").addClass("fancybox-tmp"),
                b.trigger("onUpdate")), b.update())
        },
        hideLoading: function() {
            p.unbind(".loading");
            f("#fancybox-loading").remove()
        },
        showLoading: function() {
            var a, d;
            b.hideLoading();
            a = f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");
            p.bind("keydown.loading", function(a) {
                27 === (a.which || a.keyCode) && (a.preventDefault(), b.cancel())
            });
            b.defaults.fixed || (d = b.getViewport(), a.css({
                position: "absolute",
                top: 0.5 * d.h + d.y,
                left: 0.5 * d.w + d.x
            }));
            b.trigger("onLoading")
        },
        getViewport: function() {
            var a = b.current &&
                b.current.locked || !1,
                d = {
                    x: q.scrollLeft(),
                    y: q.scrollTop()
                };
            a && a.length ? (d.w = a[0].clientWidth, d.h = a[0].clientHeight) : (d.w = t && s.innerWidth ? s.innerWidth : q.width(), d.h = t && s.innerHeight ? s.innerHeight : q.height());
            return d
        },
        unbindEvents: function() {
            b.wrap && u(b.wrap) && b.wrap.unbind(".fb");
            p.unbind(".fb");
            q.unbind(".fb")
        },
        bindEvents: function() {
            var a = b.current,
                d;
            a && (q.bind("orientationchange.fb" + (t ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), b.update), (d = a.keys) && p.bind("keydown.fb", function(e) {
                var c =
                    e.which || e.keyCode,
                    l = e.target || e.srcElement;
                if (27 === c && b.coming) return !1;
                e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || l && (l.type || f(l).is("[contenteditable]")) || f.each(d, function(d, l) {
                    if (1 < a.group.length && l[c] !== w) return b[d](l[c]), e.preventDefault(), !1;
                    if (-1 < f.inArray(c, l)) return b[d](), e.preventDefault(), !1
                })
            }), f.fn.mousewheel && a.mouseWheel && b.wrap.bind("mousewheel.fb", function(d, c, l, g) {
                for (var h = f(d.target || null), k = !1; h.length && !(k || h.is(".fancybox-skin") || h.is(".fancybox-wrap"));) k = h[0] && !(h[0].style.overflow &&
                    "hidden" === h[0].style.overflow) && (h[0].clientWidth && h[0].scrollWidth > h[0].clientWidth || h[0].clientHeight && h[0].scrollHeight > h[0].clientHeight), h = f(h).parent();
                0 !== c && !k && 1 < b.group.length && !a.canShrink && (0 < g || 0 < l ? b.prev(0 < g ? "down" : "left") : (0 > g || 0 > l) && b.next(0 > g ? "up" : "right"), d.preventDefault())
            }))
        },
        trigger: function(a, d) {
            var e, c = d || b.coming || b.current;
            if (c) {
                f.isFunction(c[a]) && (e = c[a].apply(c, Array.prototype.slice.call(arguments, 1)));
                if (!1 === e) return !1;
                c.helpers && f.each(c.helpers, function(d, e) {
                    if (e &&
                        b.helpers[d] && f.isFunction(b.helpers[d][a])) b.helpers[d][a](f.extend(!0, {}, b.helpers[d].defaults, e), c)
                })
            }
            p.trigger(a)
        },
        isImage: function(a) {
            return r(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
        },
        isSWF: function(a) {
            return r(a) && a.match(/\.(swf)((\?|#).*)?$/i)
        },
        _start: function(a) {
            var d = {},
                e, c;
            a = m(a);
            e = b.group[a] || null;
            if (!e) return !1;
            d = f.extend(!0, {}, b.opts, e);
            e = d.margin;
            c = d.padding;
            "number" === f.type(e) && (d.margin = [e, e, e, e]);
            "number" === f.type(c) && (d.padding = [c, c,
                c, c
            ]);
            d.modal && f.extend(!0, d, {
                closeBtn: !1,
                closeClick: !1,
                nextClick: !1,
                arrows: !1,
                mouseWheel: !1,
                keys: null,
                helpers: {
                    overlay: {
                        closeClick: !1
                    }
                }
            });
            d.autoSize && (d.autoWidth = d.autoHeight = !0);
            "auto" === d.width && (d.autoWidth = !0);
            "auto" === d.height && (d.autoHeight = !0);
            d.group = b.group;
            d.index = a;
            b.coming = d;
            if (!1 === b.trigger("beforeLoad")) b.coming = null;
            else {
                c = d.type;
                e = d.href;
                if (!c) return b.coming = null, b.current && b.router && "jumpto" !== b.router ? (b.current.index = a, b[b.router](b.direction)) : !1;
                b.isActive = !0;
                if ("image" ===
                    c || "swf" === c) d.autoHeight = d.autoWidth = !1, d.scrolling = "visible";
                "image" === c && (d.aspectRatio = !0);
                "iframe" === c && t && (d.scrolling = "scroll");
                d.wrap = f(d.tpl.wrap).addClass("fancybox-" + (t ? "mobile" : "desktop") + " fancybox-type-" + c + " fancybox-tmp " + d.wrapCSS).appendTo(d.parent || "body");
                f.extend(d, {
                    skin: f(".fancybox-skin", d.wrap),
                    outer: f(".fancybox-outer", d.wrap),
                    inner: f(".fancybox-inner", d.wrap)
                });
                f.each(["Top", "Right", "Bottom", "Left"], function(a, b) {
                    d.skin.css("padding" + b, x(d.padding[a]))
                });
                b.trigger("onReady");
                if ("inline" === c || "html" === c) {
                    if (!d.content || !d.content.length) return b._error("content")
                } else if (!e) return b._error("href");
                "image" === c ? b._loadImage() : "ajax" === c ? b._loadAjax() : "iframe" === c ? b._loadIframe() : b._afterLoad()
            }
        },
        _error: function(a) {
            f.extend(b.coming, {
                type: "html",
                autoWidth: !0,
                autoHeight: !0,
                minWidth: 0,
                minHeight: 0,
                scrolling: "no",
                hasError: a,
                content: b.coming.tpl.error
            });
            b._afterLoad()
        },
        _loadImage: function() {
            var a = b.imgPreload = new Image;
            a.onload = function() {
                this.onload = this.onerror = null;
                b.coming.width =
                    this.width / b.opts.pixelRatio;
                b.coming.height = this.height / b.opts.pixelRatio;
                b._afterLoad()
            };
            a.onerror = function() {
                this.onload = this.onerror = null;
                b._error("image")
            };
            a.src = b.coming.href;
            !0 !== a.complete && b.showLoading()
        },
        _loadAjax: function() {
            var a = b.coming;
            b.showLoading();
            b.ajaxLoad = f.ajax(f.extend({}, a.ajax, {
                url: a.href,
                error: function(a, e) {
                    b.coming && "abort" !== e ? b._error("ajax", a) : b.hideLoading()
                },
                success: function(d, e) {
                    "success" === e && (a.content = d, b._afterLoad())
                }
            }))
        },
        _loadIframe: function() {
            var a = b.coming,
                d = f(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", t ? "auto" : a.iframe.scrolling).attr("src", a.href);
            f(a.wrap).bind("onReset", function() {
                try {
                    f(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                } catch (a) {}
            });
            a.iframe.preload && (b.showLoading(), d.one("load", function() {
                f(this).data("ready", 1);
                t || f(this).bind("load.fb", b.update);
                f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();
                b._afterLoad()
            }));
            a.content = d.appendTo(a.inner);
            a.iframe.preload ||
                b._afterLoad()
        },
        _preloadImages: function() {
            var a = b.group,
                d = b.current,
                e = a.length,
                c = d.preload ? Math.min(d.preload, e - 1) : 0,
                f, g;
            for (g = 1; g <= c; g += 1) f = a[(d.index + g) % e], "image" === f.type && f.href && ((new Image).src = f.href)
        },
        _afterLoad: function() {
            var a = b.coming,
                d = b.current,
                e, c, l, g, h;
            b.hideLoading();
            if (a && !1 !== b.isActive)
                if (!1 === b.trigger("afterLoad", a, d)) a.wrap.stop(!0).trigger("onReset").remove(), b.coming = null;
                else {
                    d && (b.trigger("beforeChange", d), d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());
                    b.unbindEvents();
                    e = a.content;
                    c = a.type;
                    l = a.scrolling;
                    f.extend(b, {
                        wrap: a.wrap,
                        skin: a.skin,
                        outer: a.outer,
                        inner: a.inner,
                        current: a,
                        previous: d
                    });
                    g = a.href;
                    switch (c) {
                        case "inline":
                        case "ajax":
                        case "html":
                            a.selector ? e = f("<div>").html(e).find(a.selector) : u(e) && (e.data("fancybox-placeholder") || e.data("fancybox-placeholder", f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()), e = e.show().detach(), a.wrap.bind("onReset", function() {
                                f(this).find(e).length && e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder", !1)
                            }));
                            break;
                        case "image":
                            e = a.tpl.image.replace(/\{href\}/g, g);
                            break;
                        case "swf":
                            e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + g + '"></param>', h = "", f.each(a.swf, function(a, b) {
                                e += '<param name="' + a + '" value="' + b + '"></param>';
                                h += " " + a + '="' + b + '"'
                            }), e += '<embed src="' + g + '" type="application/x-shockwave-flash" width="100%" height="100%"' + h + "></embed></object>"
                    }
                    u(e) && e.parent().is(a.inner) || a.inner.append(e);
                    b.trigger("beforeShow");
                    a.inner.css("overflow", "yes" === l ? "scroll" : "no" === l ? "hidden" : l);
                    b._setDimension();
                    b.reposition();
                    b.isOpen = !1;
                    b.coming = null;
                    b.bindEvents();
                    if (!b.isOpened) f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();
                    else if (d.prevMethod) b.transitions[d.prevMethod]();
                    b.transitions[b.isOpened ? a.nextMethod : a.openMethod]();
                    b._preloadImages()
                }
        },
        _setDimension: function() {
            var a = b.getViewport(),
                d = 0,
                e = !1,
                c = !1,
                e = b.wrap,
                l = b.skin,
                g = b.inner,
                h = b.current,
                c = h.width,
                k = h.height,
                n = h.minWidth,
                v = h.minHeight,
                p = h.maxWidth,
                q = h.maxHeight,
                t = h.scrolling,
                r = h.scrollOutside ? h.scrollbarWidth : 0,
                y = h.margin,
                z = m(y[1] + y[3]),
                s = m(y[0] + y[2]),
                w, A, u, D, B, G, C, E, I;
            e.add(l).add(g).width("auto").height("auto").removeClass("fancybox-tmp");
            y = m(l.outerWidth(!0) - l.width());
            w = m(l.outerHeight(!0) - l.height());
            A = z + y;
            u = s + w;
            D = F(c) ? (a.w - A) * m(c) / 100 : c;
            B = F(k) ? (a.h - u) * m(k) / 100 : k;
            if ("iframe" === h.type) {
                if (I = h.content, h.autoHeight && 1 === I.data("ready")) try {
                    I[0].contentWindow.document.location && (g.width(D).height(9999), G = I.contents().find("body"), r && G.css("overflow-x",
                        "hidden"), B = G.outerHeight(!0))
                } catch (H) {}
            } else if (h.autoWidth || h.autoHeight) g.addClass("fancybox-tmp"), h.autoWidth || g.width(D), h.autoHeight || g.height(B), h.autoWidth && (D = g.width()), h.autoHeight && (B = g.height()), g.removeClass("fancybox-tmp");
            c = m(D);
            k = m(B);
            E = D / B;
            n = m(F(n) ? m(n, "w") - A : n);
            p = m(F(p) ? m(p, "w") - A : p);
            v = m(F(v) ? m(v, "h") - u : v);
            q = m(F(q) ? m(q, "h") - u : q);
            G = p;
            C = q;
            h.fitToView && (p = Math.min(a.w - A, p), q = Math.min(a.h - u, q));
            A = a.w - z;
            s = a.h - s;
            h.aspectRatio ? (c > p && (c = p, k = m(c / E)), k > q && (k = q, c = m(k * E)), c < n && (c = n, k = m(c /
                E)), k < v && (k = v, c = m(k * E))) : (c = Math.max(n, Math.min(c, p)), h.autoHeight && "iframe" !== h.type && (g.width(c), k = g.height()), k = Math.max(v, Math.min(k, q)));
            if (h.fitToView)
                if (g.width(c).height(k), e.width(c + y), a = e.width(), z = e.height(), h.aspectRatio)
                    for (;
                        (a > A || z > s) && c > n && k > v && !(19 < d++);) k = Math.max(v, Math.min(q, k - 10)), c = m(k * E), c < n && (c = n, k = m(c / E)), c > p && (c = p, k = m(c / E)), g.width(c).height(k), e.width(c + y), a = e.width(), z = e.height();
                else c = Math.max(n, Math.min(c, c - (a - A))), k = Math.max(v, Math.min(k, k - (z - s)));
            r && "auto" === t && k < B &&
                c + y + r < A && (c += r);
            g.width(c).height(k);
            e.width(c + y);
            a = e.width();
            z = e.height();
            e = (a > A || z > s) && c > n && k > v;
            c = h.aspectRatio ? c < G && k < C && c < D && k < B : (c < G || k < C) && (c < D || k < B);
            f.extend(h, {
                dim: {
                    width: x(a),
                    height: x(z)
                },
                origWidth: D,
                origHeight: B,
                canShrink: e,
                canExpand: c,
                wPadding: y,
                hPadding: w,
                wrapSpace: z - l.outerHeight(!0),
                skinSpace: l.height() - k
            });
            !I && h.autoHeight && k > v && k < q && !c && g.height("auto")
        },
        _getPosition: function(a) {
            var d = b.current,
                e = b.getViewport(),
                c = d.margin,
                f = b.wrap.width() + c[1] + c[3],
                g = b.wrap.height() + c[0] + c[2],
                c = {
                    position: "absolute",
                    top: c[0],
                    left: c[3]
                };
            d.autoCenter && d.fixed && !a && g <= e.h && f <= e.w ? c.position = "fixed" : d.locked || (c.top += e.y, c.left += e.x);
            c.top = x(Math.max(c.top, c.top + (e.h - g) * d.topRatio));
            c.left = x(Math.max(c.left, c.left + (e.w - f) * d.leftRatio));
            return c
        },
        _afterZoomIn: function() {
            var a = b.current;
            a && ((b.isOpen = b.isOpened = !0, b.wrap.css("overflow", "visible").addClass("fancybox-opened"), b.update(), (a.closeClick || a.nextClick && 1 < b.group.length) && b.inner.css("cursor", "pointer").bind("click.fb", function(d) {
                f(d.target).is("a") || f(d.target).parent().is("a") ||
                    (d.preventDefault(), b[a.closeClick ? "close" : "next"]())
            }), a.closeBtn && f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb", function(a) {
                a.preventDefault();
                b.close()
            }), a.arrows && 1 < b.group.length && ((a.loop || 0 < a.index) && f(a.tpl.prev).appendTo(b.outer).bind("click.fb", b.prev), (a.loop || a.index < b.group.length - 1) && f(a.tpl.next).appendTo(b.outer).bind("click.fb", b.next)), b.trigger("afterShow"), a.loop || a.index !== a.group.length - 1) ? b.opts.autoPlay && !b.player.isActive && (b.opts.autoPlay = !1, b.play(!0)) : b.play(!1))
        },
        _afterZoomOut: function(a) {
            a = a || b.current;
            f(".fancybox-wrap").trigger("onReset").remove();
            f.extend(b, {
                group: {},
                opts: {},
                router: !1,
                current: null,
                isActive: !1,
                isOpened: !1,
                isOpen: !1,
                isClosing: !1,
                wrap: null,
                skin: null,
                outer: null,
                inner: null
            });
            b.trigger("afterClose", a)
        }
    });
    b.transitions = {
        getOrigPosition: function() {
            var a = b.current,
                d = a.element,
                e = a.orig,
                c = {},
                f = 50,
                g = 50,
                h = a.hPadding,
                k = a.wPadding,
                n = b.getViewport();
            !e && a.isDom && d.is(":visible") && (e = d.find("img:first"), e.length || (e = d));
            u(e) ? (c = e.offset(), e.is("img") &&
                (f = e.outerWidth(), g = e.outerHeight())) : (c.top = n.y + (n.h - g) * a.topRatio, c.left = n.x + (n.w - f) * a.leftRatio);
            if ("fixed" === b.wrap.css("position") || a.locked) c.top -= n.y, c.left -= n.x;
            return c = {
                top: x(c.top - h * a.topRatio),
                left: x(c.left - k * a.leftRatio),
                width: x(f + k),
                height: x(g + h)
            }
        },
        step: function(a, d) {
            var e, c, f = d.prop;
            c = b.current;
            var g = c.wrapSpace,
                h = c.skinSpace;
            if ("width" === f || "height" === f) e = d.end === d.start ? 1 : (a - d.start) / (d.end - d.start), b.isClosing && (e = 1 - e), c = "width" === f ? c.wPadding : c.hPadding, c = a - c, b.skin[f](m("width" ===
                f ? c : c - g * e)), b.inner[f](m("width" === f ? c : c - g * e - h * e))
        },
        zoomIn: function() {
            var a = b.current,
                d = a.pos,
                e = a.openEffect,
                c = "elastic" === e,
                l = f.extend({
                    opacity: 1
                }, d);
            delete l.position;
            c ? (d = this.getOrigPosition(), a.openOpacity && (d.opacity = 0.1)) : "fade" === e && (d.opacity = 0.1);
            b.wrap.css(d).animate(l, {
                duration: "none" === e ? 0 : a.openSpeed,
                easing: a.openEasing,
                step: c ? this.step : null,
                complete: b._afterZoomIn
            })
        },
        zoomOut: function() {
            var a = b.current,
                d = a.closeEffect,
                e = "elastic" === d,
                c = {
                    opacity: 0.1
                };
            e && (c = this.getOrigPosition(), a.closeOpacity &&
                (c.opacity = 0.1));
            b.wrap.animate(c, {
                duration: "none" === d ? 0 : a.closeSpeed,
                easing: a.closeEasing,
                step: e ? this.step : null,
                complete: b._afterZoomOut
            })
        },
        changeIn: function() {
            var a = b.current,
                d = a.nextEffect,
                e = a.pos,
                c = {
                    opacity: 1
                },
                f = b.direction,
                g;
            e.opacity = 0.1;
            "elastic" === d && (g = "down" === f || "up" === f ? "top" : "left", "down" === f || "right" === f ? (e[g] = x(m(e[g]) - 200), c[g] = "+=200px") : (e[g] = x(m(e[g]) + 200), c[g] = "-=200px"));
            "none" === d ? b._afterZoomIn() : b.wrap.css(e).animate(c, {
                duration: a.nextSpeed,
                easing: a.nextEasing,
                complete: b._afterZoomIn
            })
        },
        changeOut: function() {
            var a = b.previous,
                d = a.prevEffect,
                e = {
                    opacity: 0.1
                },
                c = b.direction;
            "elastic" === d && (e["down" === c || "up" === c ? "top" : "left"] = ("up" === c || "left" === c ? "-" : "+") + "=200px");
            a.wrap.animate(e, {
                duration: "none" === d ? 0 : a.prevSpeed,
                easing: a.prevEasing,
                complete: function() {
                    f(this).trigger("onReset").remove()
                }
            })
        }
    };
    b.helpers.overlay = {
        defaults: {
            closeClick: !0,
            speedOut: 200,
            showEarly: !0,
            css: {},
            locked: !t,
            fixed: !0
        },
        overlay: null,
        fixed: !1,
        el: f("html"),
        create: function(a) {
            var d;
            a = f.extend({}, this.defaults, a);
            this.overlay &&
                this.close();
            d = b.coming ? b.coming.parent : a.parent;
            this.overlay = f('<div class="fancybox-overlay"></div>').appendTo(d && d.lenth ? d : "body");
            this.fixed = !1;
            a.fixed && b.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
        },
        open: function(a) {
            var d = this;
            a = f.extend({}, this.defaults, a);
            this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a);
            this.fixed || (q.bind("resize.overlay", f.proxy(this.update, this)), this.update());
            a.closeClick && this.overlay.bind("click.overlay",
                function(a) {
                    if (f(a.target).hasClass("fancybox-overlay")) return b.isActive ? b.close() : d.close(), !1
                });
            this.overlay.css(a.css).show()
        },
        close: function() {
            q.unbind("resize.overlay");
            this.el.hasClass("fancybox-lock") && (f(".fancybox-margin").removeClass("fancybox-margin"), this.el.removeClass("fancybox-lock"), q.scrollTop(this.scrollV).scrollLeft(this.scrollH));
            f(".fancybox-overlay").remove().hide();
            f.extend(this, {
                overlay: null,
                fixed: !1
            })
        },
        update: function() {
            var a = "100%",
                b;
            this.overlay.width(a).height("100%");
            J ? (b = Math.max(H.documentElement.offsetWidth, H.body.offsetWidth), p.width() > b && (a = p.width())) : p.width() > q.width() && (a = p.width());
            this.overlay.width(a).height(p.height())
        },
        onReady: function(a, b) {
            var e = this.overlay;
            f(".fancybox-overlay").stop(!0, !0);
            e || this.create(a);
            a.locked && this.fixed && b.fixed && (b.locked = this.overlay.append(b.wrap), b.fixed = !1);
            !0 === a.showEarly && this.beforeShow.apply(this, arguments)
        },
        beforeShow: function(a, b) {
            b.locked && !this.el.hasClass("fancybox-lock") && (!1 !== this.fixPosition && f("*").filter(function() {
                return "fixed" ===
                    f(this).css("position") && !f(this).hasClass("fancybox-overlay") && !f(this).hasClass("fancybox-wrap")
            }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin"), this.scrollV = q.scrollTop(), this.scrollH = q.scrollLeft(), this.el.addClass("fancybox-lock"), q.scrollTop(this.scrollV).scrollLeft(this.scrollH));
            this.open(a)
        },
        onUpdate: function() {
            this.fixed || this.update()
        },
        afterClose: function(a) {
            this.overlay && !b.coming && this.overlay.fadeOut(a.speedOut, f.proxy(this.close, this))
        }
    };
    b.helpers.title = {
        defaults: {
            type: "float",
            position: "bottom"
        },
        beforeShow: function(a) {
            var d = b.current,
                e = d.title,
                c = a.type;
            f.isFunction(e) && (e = e.call(d.element, d));
            if (r(e) && "" !== f.trim(e)) {
                d = f('<div class="fancybox-title fancybox-title-' + c + '-wrap">' + e + "</div>");
                switch (c) {
                    case "inside":
                        c = b.skin;
                        break;
                    case "outside":
                        c = b.wrap;
                        break;
                    case "over":
                        c = b.inner;
                        break;
                    default:
                        c = b.skin, d.appendTo("body"), J && d.width(d.width()), d.wrapInner('<span class="child"></span>'), b.current.margin[2] += Math.abs(m(d.css("margin-bottom")))
                }
                d["top" === a.position ? "prependTo" :
                    "appendTo"](c)
            }
        }
    };
    f.fn.fancybox = function(a) {
        var d, e = f(this),
            c = this.selector || "",
            l = function(g) {
                var h = f(this).blur(),
                    k = d,
                    l, m;
                g.ctrlKey || g.altKey || g.shiftKey || g.metaKey || h.is(".fancybox-wrap") || (l = a.groupAttr || "data-fancybox-group", m = h.attr(l), m || (l = "rel", m = h.get(0)[l]), m && "" !== m && "nofollow" !== m && (h = c.length ? f(c) : e, h = h.filter("[" + l + '="' + m + '"]'), k = h.index(this)), a.index = k, !1 !== b.open(h, a) && g.preventDefault())
            };
        a = a || {};
        d = a.index || 0;
        c && !1 !== a.live ? p.undelegate(c, "click.fb-start").delegate(c + ":not('.fancybox-item, .fancybox-nav')",
            "click.fb-start", l) : e.unbind("click.fb-start").bind("click.fb-start", l);
        this.filter("[data-fancybox-start=1]").trigger("click");
        return this
    };
    p.ready(function() {
        var a, d;
        f.scrollbarWidth === w && (f.scrollbarWidth = function() {
            var a = f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                b = a.children(),
                b = b.innerWidth() - b.height(99).innerWidth();
            a.remove();
            return b
        });
        f.support.fixedPosition === w && (f.support.fixedPosition = function() {
            var a = f('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
            a.remove();
            return b
        }());
        f.extend(b.defaults, {
            scrollbarWidth: f.scrollbarWidth(),
            fixed: f.support.fixedPosition,
            parent: f("body")
        });
        a = f(s).width();
        K.addClass("fancybox-lock-test");
        d = f(s).width();
        K.removeClass("fancybox-lock-test");
        f("<style type='text/css'>.fancybox-margin{margin-right:" + (d - a) + "px;}</style>").appendTo("head")
    })
})(window, document, jQuery);; /*})'"*/ ;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/libraries/fancybox/source/jquery.fancybox.pack.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/libraries/fancybox/lib/jquery.mousewheel.pack.js. */
/*! Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.1.3
 *
 * Requires: 1.2.2+
 */
;
(function(c) {
    "function" === typeof define && define.amd ? define(["jquery"], c) : "object" === typeof exports ? module.exports = c : c(jQuery)
})(function(c) {
    function l(b) {
        var a = b || window.event,
            h = [].slice.call(arguments, 1),
            d = 0,
            e = 0,
            f = 0,
            g = 0,
            g = 0;
        b = c.event.fix(a);
        b.type = "mousewheel";
        a.wheelDelta && (d = a.wheelDelta);
        a.detail && (d = -1 * a.detail);
        a.deltaY && (d = f = -1 * a.deltaY);
        a.deltaX && (e = a.deltaX, d = -1 * e);
        void 0 !== a.wheelDeltaY && (f = a.wheelDeltaY);
        void 0 !== a.wheelDeltaX && (e = -1 * a.wheelDeltaX);
        g = Math.abs(d);
        if (!m || g < m) m = g;
        g = Math.max(Math.abs(f),
            Math.abs(e));
        if (!k || g < k) k = g;
        a = 0 < d ? "floor" : "ceil";
        d = Math[a](d / m);
        e = Math[a](e / k);
        f = Math[a](f / k);
        try {
            b.originalEvent.hasOwnProperty("wheelDelta")
        } catch (l) {
            f = d
        }
        h.unshift(b, d, e, f);
        return (c.event.dispatch || c.event.handle).apply(this, h)
    }
    var n = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || 9 <= document.documentMode ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        m, k;
    if (c.event.fixHooks)
        for (var p = n.length; p;) c.event.fixHooks[n[--p]] = c.event.mouseHooks;
    c.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var b = h.length; b;) this.addEventListener(h[--b], l, !1);
            else this.onmousewheel = l
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var b = h.length; b;) this.removeEventListener(h[--b], l, !1);
            else this.onmousewheel = null
        }
    };
    c.fn.extend({
        mousewheel: function(b) {
            return b ? this.bind("mousewheel", b) : this.trigger("mousewheel")
        },
        unmousewheel: function(b) {
            return this.unbind("mousewheel", b)
        }
    })
});; /*})'"*/ ;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/libraries/fancybox/lib/jquery.mousewheel.pack.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/modules/contrib/geo_filter/geo_filter.js. */
(function($) {
    Drupal.behaviors.geo_filter = Drupal.behaviors.geo_filter || {
        attach: function(context, settings) {
            $('a[href]').each(function(i) {
                var href = $(this).attr('href'),
                    address = href.replace(/.*contact\/([a-z0-9._%-]+)\/([a-z0-9._%-]+)\/([a-z.]+)/i, '$1@$2.$3');
                if (href != address) {
                    $(this).attr('processed', 'processed');
                    $(this).attr('href', 'mailto:' + address);
                    $(this).html($(this).html().replace(/([a-z0-9._%-]+)\[at\]([a-z0-9._%-]+)\[dot\]([a-z.]+)/i, '$1@$2.$3'))
                }
            });
            $("*:contains('[at]')").filter(function() {
                return $(this).find("*:contains('[at]')").length == 0
            }).each(function() {
                $this = $(this);
                $this.html($this.html().replace(/([a-z0-9._%-]+)\[at\]([a-z0-9._%-]+)\[dot\]([a-z.]+)/ig, '$1@$2.$3'))
            })
        }
    }
})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/modules/contrib/geo_filter/geo_filter.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/misc/collapse.js. */
(function($) {
    Drupal.toggleFieldset = function(fieldset) {
        var $fieldset = $(fieldset);
        if ($fieldset.is('.collapsed')) {
            var $content = $('> .fieldset-wrapper', fieldset).hide();
            $fieldset.removeClass('collapsed').trigger({
                type: 'collapsed',
                value: false
            }).find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
            $content.slideDown({
                duration: 'fast',
                easing: 'linear',
                complete: function() {
                    Drupal.collapseScrollIntoView(fieldset);
                    fieldset.animating = false
                },
                step: function() {
                    Drupal.collapseScrollIntoView(fieldset)
                }
            })
        } else {
            $fieldset.trigger({
                type: 'collapsed',
                value: true
            });
            $('> .fieldset-wrapper', fieldset).slideUp('fast', function() {
                $fieldset.addClass('collapsed').find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
                fieldset.animating = false
            })
        }
    };
    Drupal.collapseScrollIntoView = function(node) {
        var h = document.documentElement.clientHeight || document.body.clientHeight || 0,
            offset = document.documentElement.scrollTop || document.body.scrollTop || 0,
            posY = $(node).offset().top,
            fudge = 55;
        if (posY + node.offsetHeight + fudge > h + offset)
            if (node.offsetHeight > h) {
                window.scrollTo(0, posY)
            } else window.scrollTo(0, posY + node.offsetHeight - h + fudge)
    };
    Drupal.behaviors.collapse = {
        attach: function(context, settings) {
            $('fieldset.collapsible', context).once('collapse', function() {
                var $fieldset = $(this),
                    anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
                if ($fieldset.find('.error' + anchor).length) $fieldset.removeClass('collapsed');
                var summary = $('<span class="summary"></span>');
                $fieldset.bind('summaryUpdated', function() {
                    var text = $.trim($fieldset.drupalGetSummary());
                    summary.html(text ? ' (' + text + ')' : '')
                }).trigger('summaryUpdated');
                var $legend = $('> legend .fieldset-legend', this);
                $('<span class="fieldset-legend-prefix element-invisible"></span>').append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide')).prependTo($legend).after(' ');
                var $link = $('<a class="fieldset-title" href="#"></a>').prepend($legend.contents()).appendTo($legend).click(function() {
                    var fieldset = $fieldset.get(0);
                    if (!fieldset.animating) {
                        fieldset.animating = true;
                        Drupal.toggleFieldset(fieldset)
                    };
                    return false
                });
                $legend.append(summary)
            })
        }
    }
})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/misc/collapse.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/misc/form.js. */
(function($) {
    $.fn.drupalGetSummary = function() {
        var callback = this.data('summaryCallback');
        return (this[0] && callback) ? $.trim(callback(this[0])) : ''
    };
    $.fn.drupalSetSummary = function(callback) {
        var self = this;
        if (typeof callback != 'function') {
            var val = callback;
            callback = function() {
                return val
            }
        };
        return this.data('summaryCallback', callback).unbind('formUpdated.summary').bind('formUpdated.summary', function() {
            self.trigger('summaryUpdated')
        }).trigger('summaryUpdated')
    };
    Drupal.behaviors.formUpdated = {
        attach: function(context) {
            var events = 'change.formUpdated click.formUpdated blur.formUpdated keyup.formUpdated';
            $(context).find(':input').andSelf().filter(':input').unbind(events).bind(events, function() {
                $(this).trigger('formUpdated')
            })
        }
    };
    Drupal.behaviors.fillUserInfoFromCookie = {
        attach: function(context, settings) {
            $('form.user-info-from-cookie').once('user-info-from-cookie', function() {
                var formContext = this;
                $.each(['name', 'mail', 'homepage'], function() {
                    var $element = $('[name=' + this + ']', formContext),
                        cookie = $.cookie('Drupal.visitor.' + this);
                    if ($element.length && cookie) $element.val(cookie)
                })
            })
        }
    }
})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/misc/form.js. */
; /*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.bracu.ac.bd/sites/all/modules/contrib/google_analytics/googleanalytics.js. */
(function($) {
    Drupal.googleanalytics = {};
    $(document).ready(function() {
        $(document.body).bind("mousedown keyup touchstart", function(event) {
            $(event.target).closest("a,area").each(function() {
                if (Drupal.googleanalytics.isInternal(this.href)) {
                    if ($(this).is('.colorbox') && (Drupal.settings.googleanalytics.trackColorbox));
                    else if (Drupal.settings.googleanalytics.trackDownload && Drupal.googleanalytics.isDownload(this.href)) {
                        ga("send", {
                            hitType: "event",
                            eventCategory: "Downloads",
                            eventAction: Drupal.googleanalytics.getDownloadExtension(this.href).toUpperCase(),
                            eventLabel: Drupal.googleanalytics.getPageUrl(this.href),
                            transport: "beacon"
                        })
                    } else if (Drupal.googleanalytics.isInternalSpecial(this.href)) ga("send", {
                        hitType: "pageview",
                        page: Drupal.googleanalytics.getPageUrl(this.href),
                        transport: "beacon"
                    })
                } else if (Drupal.settings.googleanalytics.trackMailto && $(this).is("a[href^='mailto:'],area[href^='mailto:']")) {
                    ga("send", {
                        hitType: "event",
                        eventCategory: "Mails",
                        eventAction: "Click",
                        eventLabel: this.href.substring(7),
                        transport: "beacon"
                    })
                } else if (Drupal.settings.googleanalytics.trackOutbound && this.href.match(/^\w+:\/\//i))
                    if (Drupal.settings.googleanalytics.trackDomainMode !== 2 || (Drupal.settings.googleanalytics.trackDomainMode === 2 && !Drupal.googleanalytics.isCrossDomain(this.hostname, Drupal.settings.googleanalytics.trackCrossDomains))) ga("send", {
                        hitType: "event",
                        eventCategory: "Outbound links",
                        eventAction: "Click",
                        eventLabel: this.href,
                        transport: "beacon"
                    })
            })
        });
        if (Drupal.settings.googleanalytics.trackUrlFragments) window.onhashchange = function() {
            ga("send", {
                hitType: "pageview",
                page: location.pathname + location.search + location.hash
            })
        };
        if (Drupal.settings.googleanalytics.trackColorbox) $(document).bind("cbox_complete", function() {
            var href = $.colorbox.element().attr("href");
            if (href) ga("send", {
                hitType: "pageview",
                page: Drupal.googleanalytics.getPageUrl(href)
            })
        })
    });
    Drupal.googleanalytics.isCrossDomain = function(hostname, crossDomains) {
        if (!crossDomains) {
            return false
        } else return $.inArray(hostname, crossDomains) > -1 ? true : false
    };
    Drupal.googleanalytics.isDownload = function(url) {
        var isDownload = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i");
        return isDownload.test(url)
    };
    Drupal.googleanalytics.isInternal = function(url) {
        var isInternal = new RegExp("^(https?):\/\/" + window.location.host, "i");
        return isInternal.test(url)
    };
    Drupal.googleanalytics.isInternalSpecial = function(url) {
        var isInternalSpecial = new RegExp("(\/go\/.*)$", "i");
        return isInternalSpecial.test(url)
    };
    Drupal.googleanalytics.getPageUrl = function(url) {
        var extractInternalUrl = new RegExp("^(https?):\/\/" + window.location.host, "i");
        return url.replace(extractInternalUrl, '')
    };
    Drupal.googleanalytics.getDownloadExtension = function(url) {
        var extractDownloadextension = new RegExp("\\.(" + Drupal.settings.googleanalytics.trackDownloadExtensions + ")([\?#].*)?$", "i"),
            extension = extractDownloadextension.exec(url);
        return (extension === null) ? '' : extension[1]
    }
})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.bracu.ac.bd/sites/all/modules/contrib/google_analytics/googleanalytics.js. */
; /*})'"*/