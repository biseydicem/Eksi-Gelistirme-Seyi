window.ek$i = window.ek$i || {},
    function(n, t) {
        function u(t, i, r) {
            n.validator.addMethod(t, function(n, t) {
                return this.optional(t) || i.test(n)
            }, n.validator.format(r))
        }
        var i = t.ek$i,
            o = t.navigator,
            r = o.platform,
            f = r === "iPhone" || r === "iPad" || r === "iPod",
            e;
        n.extend(i, {
            baseUrl: "/",
            rank: 0,
            isTouchDevice: !!("ontouchstart" in t),
            documentClickEvent: f ? "touchstart" : "click",
            ios: f,
            go: function(n) {
                t.location.href = n
            },
            passwordValidationRegexps: {
                containLowercase: /^(?=.*[a-zçıöşü]).{1,}$/,
                containUppercase: /^(?=.*[A-ZÇĞİÖŞÜ]).{1,}$/,
                containDigit: /^(?=.*\d).{1,}$/
            }
        });
        n.extend(i, n("#eksi").data());
        i.isTouchDevice || (e = document.documentElement.getAttribute("class") || "", document.documentElement.setAttribute("class", e + " no-touch"));
        n(document).ready(function() {
            u("shouldContainLowercase", i.passwordValidationRegexps.containLowercase, "en az bir küçük harf içermeli");
            u("shouldContainUppercase", i.passwordValidationRegexps.containUppercase, "en az bir büyük harf içermeli");
            u("shouldContainDigit", i.passwordValidationRegexps.containDigit, "en az bir rakam karakter içermeli");
            n(".lazy").recliner({
                attrib: "data-src",
                throttle: 100,
                threshold: 350,
                live: !1
            });
            var r = ".single-select-toggle",
                t = "active";
            n("body").on("click", ".btn-group .btn", function(i) {
                i.preventDefault();
                var u = n(i.target),
                    f = u.closest(r),
                    e = f.find("input[type='hidden']"),
                    o = u.data("value");
                e.val(o);
                f.find("button").removeClass(t);
                u.addClass(t)
            });
            n("#sub-navigation > ul > li > a:not(.dropdown-toggle)").on("click", function(t) {
                t.preventDefault();
                var i = n(t.target),
                    r = i.closest("li");
                n("#sub-navigation li").removeClass("active");
                r.addClass("active")
            })
        })
    }(jQuery, window),
    function(n) {
        function t(n) {
            switch (n) {
                case ek$i.HttpStatus.Forbidden:
                    return "yetkiniz olmayan bir iş peşindesiniz";
                case ek$i.HttpStatus.Unauthorized:
                    return "olmadı. giriş yapıp tekrar denemenizde fayda var";
                case ek$i.TooManyRequests:
                    return "arka arkaya çok sayıda talepte bulundunuz. bir süre bekleyin"
            }
            return null
        }
        n.ajaxSetup({
            cache: !1,
            complete: function() {
                ek$i.hideLoaderTick()
            }
        });
        n.getCachedScript = function(t, i) {
            return i = n.extend(i || {}, {
                dataType: "script",
                cache: !0,
                url: t
            }), jQuery.ajax(i)
        };
        n(document).ajaxError(function(n, i, r, u) {
            var f = t(i.status, u);
            f && ek$i.error(f)
        });
        n.extend(ek$i, {
            tickHtml: '<span class="loader-tick spin"><\/span>',
            getBlockLoadingElement: function(t) {
                return t = t || "geliyor...", n('<p class="muted">' + t + ' <span class="loader-tick spin"><\/span><\/p>')
            },
            hideLoaderTick: function() {
                n(".loader-tick").remove()
            }
        })
    }(jQuery),
    function(n) {
        function f() {
            return n("<a/>").text("×").addClass("close")
        }

        function r(n) {
            n.closest("html").length !== 0 && n.slideUp("fast", function() {
                n.remove()
            })
        }

        function e(t) {
            if (!t || n.cookie) return !1;
            var r = n.cookie(i);
            return r && t <= r
        }

        function o(t) {
            t && n.cookie && n.cookie(i, t)
        }
        var t, i = "alertsnap",
            u = 5e3;
        n(document).ready(function() {
            t = n("#user-notifications").on("click", ".close", function() {
                r(n(this).parent())
            })
        });
        n.extend(ek$i, {
            addResponse: function(i, s, h) {
                if (i && i.length !== 0 && !e(h)) {
                    s = s || "info";
                    var c = n("ul", t),
                        l = n("<li>").hide().addClass(s).text(i).append(f()).appendTo(c).slideDown("fast");
                    setTimeout(function() {
                        o(h);
                        r(l)
                    }, u)
                }
            },
            success: function(n) {
                this.addResponse(n, "success")
            },
            error: function(n) {
                this.addResponse(n, "error")
            },
            info: function(n) {
                this.addResponse(n, "info")
            }
        })
    }(jQuery),
    function(n) {
        n.extend(ek$i, {
            trackUrl: function(n) {
                ga && ga("send", "pageview", n)
            },
            trackEvent: function(n, t, i, r) {
                ga && ga("send", "event", n, t, {
                    eventLabel: i,
                    eventValue: r,
                    nonInteraction: 1
                })
            },
            trackInteractionEvent: function(n, t, i, r) {
                ga && ga("send", "event", n, t, i, r)
            }
        })
    }(jQuery),
    function() {
        ek$i.HttpStatus = {
            Ok: 200,
            Unauthorized: 401,
            Forbidden: 403,
            NotFound: 404,
            TooManyRequests: 429
        }
    }(),
    function() {
        ek$i.KEY = {
            UP: 38,
            LEFT: 37,
            RIGHT: 39,
            DOWN: 40,
            DEL: 46,
            TAB: 9,
            RETURN: 13,
            ESC: 27,
            COMMA: 188,
            PAGEUP: 33,
            PAGEDOWN: 34,
            BACKSPACE: 8
        }
    }(),
    function(n, t, i) {
        function e(n, t) {
            return n ? JSON.parse(n.getItem(t)) : i
        }

        function r(n, t, i) {
            if (!i) return e(n, t);
            n.setItem(t, JSON.stringify(i))
        }
        var u = t.localStorage,
            f = t.sessionStorage;
        $.extend(n, {
            jsonStore: function(n, t) {
                return r(u, n, t)
            },
            jsonSessionStore: function(n, t) {
                return r(f, n, t)
            }
        })
    }(ek$i, window),
    function(n, t) {
        var i = ".confirmbox",
            r = "p",
            u = "#confirmyes",
            f = "#confirmno";
        n.fn.confirmAction = function(e, o, s, h, c, l) {
            function y(n) {
                return function() {
                    return n(), a.hide(), !1
                }
            }
            o = o || "evet";
            h = h || "hayır";
            s = s || function() {};
            c = c || function() {};
            var a = n('<div class="confirmbox"><p><\/p><div class="actions"><button id="confirmyes" class="primary close"><\/button><button id="confirmno" class="close"><\/button><\/div><\/div>'),
                v = this;
            if (v.length === 0) {
                t.error("confirmAction() called on non-existent %o", v);
                return
            }
            n(i).remove();
            a.find(r).text(e);
            a.find(u).text(o).click(y(s));
            a.find(f).text(h).click(y(c));
            a.appendTo(v.parent()).popup(v, l)
        }
    }(jQuery, console),
    function(n, t, i) {
        function f() {
            var t = n(r),
                f = t.find(".send-button"),
                o = t.find(".cancel-button"),
                e = n(u);
            if (t.length !== 0) {
                t.submit(function(r) {
                    var s, u, o;
                    return (r.stopPropagation(), s = n.trim(t.find("input").val()), u = n.trim(t.find("textarea").val()), e.hide(), s === "" || u === "") ? !1 : (o = ek$i.validateMessage(u), o !== i) ? (e.text(o).show(), !1) : (f.attr("disabled", !0), n.ajax({
                        type: "POST",
                        url: t.attr("action"),
                        data: t.serialize(),
                        dataType: "text",
                        success: function() {
                            ek$i.modal.hide();
                            ek$i.success("mesajınız çok güzel yollandı")
                        },
                        error: function() {
                            ek$i.error("mesaj yollanamadı - sorunlar oldu")
                        },
                        complete: function() {
                            f.attr("disabled", !1)
                        },
                        global: !1
                    }), !1)
                });
                o.on("click", function() {
                    ek$i.modal.hide()
                })
            }
        }

        function e() {
            var i = n(r),
                t;
            i.length !== 0 && (t = i.find(".edittextbox"), ek$i.editing.attachEditTools(t, t.next(".edittools")))
        }
        var r = "#message-send-form:not(.server-side-form)",
            u = "#message-validation-result";
        n.extend(ek$i, {
            validateMessage: function(n) {
                var t = 8e3;
                if (n.length > t) return "mesaj çok uzun. " + (n.length - t) + " karakter fazlası var."
            },
            showMessageForm: function(t, f) {
                function h() {
                    var u = n.trim(e.val()),
                        r = n("#nick-validation-result"),
                        t = n("#latest-entry-date-info");
                    if (u === "") {
                        r.hide();
                        t.hide();
                        return
                    }
                    n.get(ek$i.baseUrl + "message/recipientinfo", {
                        recipient: u
                    }, function(n) {
                        if (n === i) {
                            t.hide();
                            return
                        }
                        if (o.find("button:first").attr("disabled", !n.CanSend), n.LatestEntryDate !== null ? t.text("en son " + n.LatestEntryTurkishDateDiff + " entry girmiş").show() : t.hide(), n.CanSend) {
                            r.hide();
                            return
                        }
                        r.text(n.Message).show()
                    })
                }
                var o = n(r),
                    s = o.find("textarea"),
                    e = o.find("input[type=text]"),
                    c = n(u);
                t && e.val(t);
                f && s.val(f);
                c.hide();
                ek$i.modal.show(o);
                e.on("autocompleteselect blur", h);
                e.val() !== "" ? (h(), s.select()) : e.focus()
            }
        });
        n(document).ready(function() {
            f();
            e()
        })
    }(jQuery, window),
    function(n, t) {
        function e() {
            return n("<div/>").addClass("modal-overlay")
        }

        function o() {
            return n("<a/>", {
                text: "×",
                "class": "modal-close",
                title: "kapat"
            }).on("click", function() {
                ek$i.modal.hide()
            })
        }
        var r, i, u, f = {
            escClose: !0,
            block: !0,
            onHide: function() {},
            attachCloseLink: !0
        };
        ek$i.modal = {
            visible: !1,
            show: function(s, h) {
                var l = this,
                    c = n(s),
                    a;
                if (l.visible) throw "modal.show is called when there's already a modal on the document.";
                if (c.length === 0) throw "item not found";
                if (c.length !== 1) throw "modal.show can only be called on 1 item.";
                if (a = e(), h = n.extend({}, f, h), u = h, c.find(".close,.cancel,.cancel-button").click(function() {
                        l.hide()
                    }), !h.block) {
                    a.on("click", function() {
                        l.hide()
                    });
                    if (h.escClose) n(document.body).on("keyup.modal", function(n) {
                        n.keyCode === ek$i.KEY.ESC && l.hide()
                    })
                }
                a.appendTo(document.body);
                a.show();
                c.addClass("modal").show().position({
                    my: "center",
                    at: "center",
                    of: t
                });
                h.attachCloseLink && c.append(o());
                r = a;
                i = c;
                l.visible = !0
            },
            hide: function() {
                var t = this;
                if (t.visible) {
                    n(document.body).off("keyup.modal");
                    i.find(".modal-close").remove();
                    i.hide();
                    r.remove();
                    u.onHide(i);
                    t.visible = !1
                }
            }
        }
    }(jQuery, window),
    function(n, t) {
        function r(t) {
            return t = n.trim(t), t = decodeURIComponent(t), n.each(u, function(n, i) {
                t = ek$i.removeQueryStringParameter(t, i)
            }), t
        }
        var i, u = ["ref", "focusto", "rf", "nr", "utm_source", "utm_medium", "utm_term", "utm_content", "utm_campaign"],
            f = "select.pager";
        n.fn.pager = function() {
            var t = "processed";
            return this.each(function() {
                function c(t, i) {
                    var r = n.Event(f, {
                        pageIndex: t,
                        url: i
                    });
                    return u.trigger(r), !r.isDefaultPrevented()
                }

                function l(n) {
                    return u.data("page" + n + "url") || s.replace("{0}", n)
                }
                var u = n(this),
                    o = parseInt(u.data("pagecount"), 10),
                    e = parseInt(u.data("currentpage"), 10),
                    s = u.data("urltemplate"),
                    a, v, y, h, p, w, d, b, k;
                if (!u.data(t) && (u.data(t, !0), !(o < 2))) {
                    if (ek$i.isAndroid && u.addClass("android"), s = s !== undefined && typeof s == "string" ? r(s) : i, e > 1) {
                        a = l(e - 1);
                        v = n("<a/>", {
                            text: "«",
                            href: a,
                            rel: "prev",
                            title: "önceki sayfa",
                            "class": "prev"
                        });
                        v.on("click", function() {
                            return c(e - 1, a)
                        });
                        v.appendTo(u)
                    }
                    for (y = n("<select />").on("change", function() {
                            var t = n(this).val(),
                                i = l(t);
                            c(t, i) && ek$i.go(i)
                        }), h = 1; h <= o; h++) p = n("<option/>").text(h), h === e && p.attr("selected", "selected"), p.appendTo(y);
                    if (y.appendTo(u), u.append("/"), w = l(o), d = n("<a/>", {
                            text: o,
                            href: w,
                            title: "son sayfa",
                            "class": "last"
                        }).on("click", function() {
                            return c(o, w)
                        }), d.appendTo(u), e < o) {
                        b = l(e + 1);
                        k = n("<a/>", {
                            text: "»",
                            href: b,
                            rel: "next",
                            title: "sonraki sayfa",
                            "class": "next"
                        });
                        k.on("click", function() {
                            return c(e + 1, b)
                        });
                        k.appendTo(u)
                    }
                    u.show()
                }
            })
        };
        n(document).ready(function() {
            i = ek$i.mergeQueryStrings(t.location.search, "p={0}");
            i = r(i);
            n(".pager").pager()
        })
    }(jQuery, window),
    function(n, t, i) {
        var r = "data_popup",
            s = "close",
            u = "activepopup",
            h = "." + u,
            f = "click.popup",
            e = "resize.popup",
            o = {
                my: "left top",
                at: "left bottom",
                collision: "flipfit"
            },
            c = {
                animateOpen: !1,
                animateClose: !1,
                closeOtherPopups: !0,
                stickOptions: o,
                focusTo: "self"
            };
        n.fn.clickPopup = function(n, t, r) {
            var u = this;
            if (u.length !== 0) {
                (t === i || t === null) && (t = u);
                u.on("click", function() {
                    if (n.length === 0) throw "$.clickPopup called with non-existent popup";
                    return n.popup(t, r), !1
                });
                return this
            }
        };
        n.fn.popup = function(o, l) {
            function k(n) {
                t.log("$.popup(): " + n)
            }

            function v(n) {
                n.stop();
                (l.animateClose ? n.slideUp() : n.hide()).removeClass(u);
                var t = n.data(r);
                t === i && k("DATA_POPUP is missing while ACTIVE_POPUP is set");
                n.removeData(r)
            }

            function y() {
                return v(a), n(document).unbind(f).unbind(e), a
            }

            function p() {
                l.afterShow !== i && l.afterShow(a);
                l.focusTo && (l.focusTo === b ? a : l.focusTo).focus()
            }

            function d(t) {
                var i = n(t.target),
                    u = !i.hasClass(s) && (i.data(r) || i.parents().filter(function() {
                        return n(this).data(r)
                    }).length > 0);
                u || y()
            }

            function g() {
                return a.data(r) !== i
            }

            function w() {
                return a.stickTo(o, l.stickOptions)
            }

            function nt() {
                return a.offset({
                    top: 1,
                    left: 1
                }).data(r, o), o.data(r, a), l.closeOtherPopups && n.each(n(h), function() {
                    v(n(this))
                }), a.addClass(u), l.beforeShow !== i && l.beforeShow(a), l.animateOpen ? a.slideDown(p) : (a.show(), p()), n(document).unbind(f).unbind(e).bind(e, w).bind(f, d), w()
            }
            var b = "self",
                a = this;
            if (l = n.extend({}, c, l), a.length !== 1) throw "$.popup(): invalid popup object passed (length === " + a.length + ")";
            return g() ? y() : nt()
        };
        n.fn.closePopup = function() {
            return this.each(function() {
                var t = n(this);
                t.data(r) && t.popup()
            })
        };
        n.fn.stickTo = function(i, r) {
            return this.length !== 1 && t.log("$.stickTo(): called for " + this.length + " elements"), this.position(n.extend({}, o, r, {
                of: i
            }))
        }
    }(jQuery, window.console),
    function(n) {
        var t = "select.today.in.past.year.changed";
        n.fn.todayInPastSelector = function() {
            return this.each(function() {
                function u(r) {
                    var u = n.Event(t, {
                        url: r
                    });
                    return i.trigger(u), !u.isDefaultPrevented()
                }

                function f(n) {
                    return r + "?year=" + n
                }
                var i = n(this),
                    r = i.data("todayinpasturl");
                i.on("change", function() {
                    var i = n(this).val(),
                        t = f(i);
                    u(t) && ek$i.go(t)
                })
            })
        };
        n(document).ready(function() {
            n(".today-in-past-selector").todayInPastSelector()
        })
    }(jQuery, window),
    function(n) {
        function o(t, i, r) {
            var e = t.offset(),
                h = i + n(document).scrollLeft(),
                c = r + n(document).scrollTop(),
                o = e.left,
                s = e.top,
                u = o + t.outerWidth() - h,
                f = s + t.outerHeight() - c;
            u > 0 && o - u > 0 && t.css("left", t.position().left - u);
            f > 0 && s - f > 0 && t.css("top", t.position().top - f)
        }

        function f(r) {
            if (r && r.target) {
                var f = n(r.target);
                if (f.hasClass(i) || f.parents(u).length > 0 || f.is("a.ui-corner-all")) return
            }
            n(u).removeClass(t)
        }
        var t = "open",
            i = "toggles",
            r = "toggles-menu",
            u = "." + r,
            e = {
                keepInViewPort: !1,
                open: function() {}
            };
        n.fn.toggles = function(u, s) {
            return this.each(function() {
                var h = n(this);
                s = n.extend({}, e, s);
                h.hasClass(i) && console.error("toggles called multiple times for: %o", h);
                u.addClass(r);
                h.addClass(i).on("click", function() {
                    var i = u.hasClass(t),
                        r = n(window).width(),
                        e = n(window).height();
                    return f(), i || (u.toggleClass(t), s.keepInViewPort && o(u, r, e), s.open(h, u)), !1
                })
            })
        };
        ek$i.toggles = {
            toggle: function(n) {
                n.toggleClass(t)
            },
            close: function(n) {
                n.removeClass(t)
            }
        };
        n(document).on(ek$i.documentClickEvent, f)
    }(jQuery),
    function(n) {
        function u(n) {
            t.text(r[n].caption).data(i, n)
        }

        function s() {
            var f = t.data(i),
                e = r[f],
                o = t.data(e.link + "url");
            n.post(o, null, function() {
                u((f + 1) % 2)
            })
        }

        function h(r) {
            if (t = n(r), t.length > 0) {
                var f = t.click(s).data(i);
                u(f)
            }
        }

        function f() {
            n("#editbox").focus()
        }

        function c(t) {
            n(t).on("click", function() {
                return f(), !1
            })
        }

        function l() {
            function r(n) {
                t.prop("readonly", n)
            }
            var t = n("#topic-move-form"),
                i = t.find("input[name=To]"),
                o = t.find(".destination-span"),
                u = t.find(".reason-row"),
                f = t.find(".validation"),
                e = n("#RequestMove");
            i.titleAutoComplete({
                appendTo: t
            });
            n("#move-topic-link").click(function() {
                return i.val(ek$i.topic.title).show(), o.text("").hide(), u.hide(), e.val(""), ek$i.modal.show(t, {
                    block: !1
                }), i.focus(), !1
            });
            t.on("submit", function() {
                if (i.val(n.trim(i.val())), i.val() === "") return f.text("ne olacak başlığın yeni hali?").show(), !1;
                var o = t.serialize();
                return r(!0), n.post(t.attr("action"), o, function(n) {
                    if (n.Success) {
                        ek$i.go(n.NewUrl);
                        return
                    }
                    if (f.text(n.Message), n.RequestRequired) {
                        e.val("true");
                        u.show().find("textarea").focus();
                        r(!1);
                        return
                    }
                }), r(!1), !1
            })
        }

        function a(n, t) {
            n.click(function() {
                return ek$i.modal.show(t), !1
            })
        }

        function v(t) {
            var f = n(o),
                u = n("#in-topic-search-options"),
                r = u.find("form"),
                i = r.find("input[type=text]");
            f.toggles(u, {
                keepInViewPort: !0
            });
            f.on("click", function() {
                u.hasClass("open") && i.focus()
            });
            i.nickAutoComplete({
                appendTo: "#in-topic-search-options",
                applyNickPrefix: !0,
                select: function(n, t) {
                    i.val(t.item.value);
                    r.submit()
                },
                title: t
            });
            r.on("submit", function() {
                var t = n.trim(i.val()),
                    f, u;
                return t.length === 0 ? (i.focus(), !1) : (f = r.data("filternameparameter"), u = r.find("input[name=" + f + "]"), t.substring(0, 1) === "@" ? (u.val(r.data("authorsearchaction")), i.attr("name", "author"), i.val(t.slice(1))) : (u.val(r.data("keywordsearchaction")), i.attr("name", "keywords")), !0)
            })
        }

        function y() {
            var t = n("#topic-share-menu");
            if (t.length !== 0) {
                var r = n("<a>", {
                        text: "paylaş"
                    }),
                    u = ek$i.getAbsoluteUrl(ek$i.topic.slugPair()),
                    i = ek$i.sharing.getLinks(u, ek$i.topic.title, ek$i.topic.description);
                r.toggles(i, {
                    open: function(n, t) {
                        t.find("input[type=text]").select()
                    }
                });
                t.append(i)
            }
        }

        function p(n) {
            n.one("click", function() {
                return n.attr("type", "submit").parents("form").find("textarea").show().focus(), !1
            })
        }

        function e(n, t) {
            n.click(function() {
                return ek$i.modal.show(t), !1
            })
        }

        function w(t) {
            t.length !== 0 && (e(n("#topic-ban-link"), n("#topic-ban-form")), e(n("#topic-unban-link"), n("#topic-unban-form")), a(n("#move-topic-new-url-link"), n("#move-topic-to-new-url-form")))
        }

        function b() {
            var r = n("#topic-move-history-container"),
                t, i;
            if (r.length !== 0) {
                t = n("#topic-history");
                i = n("#toggle-topic-history");
                i.on("click", function() {
                    return t.is(":visible") ? (t.hide(), !1) : (t.html(ek$i.getBlockLoadingElement()).show(), n.get(i.attr("href")).done(function(n) {
                        t.html(n)
                    }), !1)
                })
            }
        }

        function k() {
            n(".sub-title-menu a").on("click", function(t) {
                var r = n(t.target),
                    i = r.data("caption");
                return i || (i = n.trim(r.text())), ek$i.trackInteractionEvent("topic", "title sub menu", i), !0
            })
        }

        function d() {
            function i(n) {
                if (n.length > 0) return window.location.href = n.prop("href"), !1
            }
            var t = [{
                selector: ".next-link",
                keyCode: ek$i.KEY.RIGHT
            }, {
                selector: ".prev-link",
                keyCode: ek$i.KEY.LEFT
            }];
            n(document).on("keydown", function(r) {
                document.activeElement === document.body && n.each(t, function(t, u) {
                    if (u.keyCode === r.keyCode) return i(n(u.selector), u.animation)
                })
            })
        }

        function g() {
            var t = 110,
                i = "20em";
            n("textarea.edittextbox").focus(function() {
                var r = n(this);
                r.height() <= t && r.animate({
                    height: i
                }, "fast")
            })
        }
        var i = "tracked",
            t, r = [{
                caption: "takip et",
                link: "track"
            }, {
                caption: "takip etme",
                link: "untrack"
            }],
            o = "#in-topic-search-toggle";
        n.extend(ek$i, {
            topic: {
                title: "",
                slug: "",
                id: 0,
                preserved: !1,
                slugPair: function() {
                    return this.slug + "--" + this.id
                },
                description: "",
                getTitleData: function(n) {
                    return {
                        id: n.attr("data-id"),
                        slug: n.attr("data-slug"),
                        title: n.attr("data-title"),
                        preserved: n.attr("data-preserved")
                    }
                },
                setup: function() {
                    var t = this,
                        r = t.getTitleData(n("#title")),
                        u = n("#entry-list li:first"),
                        i;
                    n.extend(t, r);
                    n("#topic").data("not-found") && (i = ek$i.getSearchBox(), i.prop("ignoreFocus", !0).val(t.title).focus());
                    t.description = ek$i.getSummary(u.find(".content"), 255);
                    y();
                    h("#track-topic-link");
                    c("#entry-add-link");
                    l();
                    v(t.title);
                    w(n("#topic-mod-tools"));
                    ek$i.entryMenu.attach(n("#entry-list > li:not([data-menu-attached])"), t.title);
                    p(n("#request-fill"));
                    ek$i.editing.setupDraftButtons(t.title);
                    b();
                    k();
                    d();
                    g()
                }
            }
        });
        n(document).ready(function() {
            n("#topic").length !== 0 && (ek$i.topic.setup(), ek$i.topic.preserved && f())
        })
    }(jQuery),
    function(n, t) {
        function r(n, t, i) {
            var f = t + "=" + i,
                r = new RegExp("([\\?&])(" + t + "=[^&]*)"),
                u = r.test(n),
                e;
            return u && !i && u ? n.replace(r, "$1").replace(new RegExp("([&]{2,50})"), "&") : u ? n.replace(r, "$1" + f) : (e = n.indexOf("?"), e < 0 ? n += "?" : n.charAt(n.length - 1) !== "?" && (n += "&"), n + f)
        }

        function i(n) {
            var t = n.indexOf("?");
            return t < 0 ? n : n.substr(t + 1)
        }
        n.extend(ek$i, {
            getLoginUrl: function() {
                return this.baseUrl + "giris"
            },
            getAbsoluteUrl: function(n) {
                return t.location.protocol + "//eksisozluk.com/" + n
            },
            removeQueryStringParameter: function(n, t) {
                var r = "(\\?|&)" + t + "=[^&=]*&?",
                    u = new RegExp(r, "gi"),
                    i = n.replace(u, "$1");
                return i[i.length - 1] === "&" || i[i.length - 1] === "?" ? i.substring(0, i.length - 1) : i
            },
            mergeQueryStrings: function(n, t) {
                var f, e, u;
                for (e = "?" + i(n), t = i(t).split("&"), f = 0; f < t.length; f += 1) u = t[f], u = u.split("="), e = r(e, u[0], u[1]);
                return e
            }
        })
    }(jQuery, window),
    function(n, t, i) {
        function f(t) {
            var u = n("<div>", {
                    "class": "other dropdown"
                }),
                f = n("<a>", {
                    "class": "dropdown-toggle",
                    title: "diğer"
                }),
                e;
            return r === i && (r = n("#svg-dots")), f.append(r.clone()), u.append(f), e = n("<ul>").addClass("dropdown-menu right").appendTo(u), t.append(u).dropdown(), {
                menuContainer: e,
                otherContainer: u
            }
        }

        function u(n) {
            return n.menuContainers === i && (n.menuContainers = f(n.infoContainer)), n.menuContainers
        }

        function e(t, i) {
            n("<li>").append(i).appendTo(u(t).menuContainer)
        }

        function o(n, t) {
            u(n).otherContainer.append(t)
        }
        var r;
        ek$i.entryMenu = {
            menuItems: [],
            getSummary: function(t, i) {
                i = i || 100;
                var r = n.trim(n("#li" + t).find(".content").text());
                return r.length > i && (r = n.trim(r.substring(0, i)), r = n.trim(r.replace(/[^a-z0-9]+$/i, "")) + "…"), r
            },
            attach: function(t, i, r) {
                var u = this;
                u.menuItems.sort(function(n, t) {
                    return n.order > t.order ? 1 : n.order < t.order ? -1 : 0
                });
                t.each(function(t, f) {
                    function c(n) {
                        return h.flags.indexOf(n) >= 0
                    }
                    var s = n(f),
                        h = s.data();
                    n.extend(h, {
                        container: s,
                        infoContainer: s.find("> footer > .info").first(),
                        feedbackContainer: s.find("> footer > .feedback").first(),
                        entryId: h.id,
                        flags: h.flags.split(/[\s+]/),
                        summary: ek$i.getSummary(s.find(".content"), 255),
                        commentSummary: ek$i.getSummary(s.find(".comment-content"), 255),
                        title: i,
                        addMenuItem: function(n) {
                            e(this, n)
                        },
                        addOtherItem: function(n) {
                            o(this, n)
                        }
                    });
                    n.extend(h, r);
                    n.each(u.menuItems, function(n, t) {
                        c(t.requiredFlag) && t.setup && t.setup(h)
                    })
                })
            }
        }
    }(jQuery, window),
    function(n) {
        var t = "Blocked";
        ek$i.entryMenu.menuItems.push({
            order: 100,
            requiredFlag: "msg",
            setup: function(i) {
                var r = n("<a>", {
                    href: "#",
                    text: "engelle"
                }).on("click", function(r) {
                    var u = n(r.target);
                    return u.confirmAction(i.author + " nickli kullanıcıyı engelleyeceksiniz?", "aynen", function() {
                        var r = n("#title").data("add-relation-url");
                        n.post(r, {
                            id: i.authorId,
                            r: t
                        }).done(function() {
                            var n = u.parents("li:last");
                            n.slideUp(function() {
                                n.remove()
                            })
                        })
                    }, "yoo"), !1
                });
                i.addMenuItem(r)
            }
        })
    }(jQuery),
    function(n, t) {
        function o(n) {
            return n.feedbackContainer.find("a > span.comment-count")
        }

        function s(t) {
            var i = n("> ul > li:not([data-menu-attached])", t.$commentPages);
            ek$i.entryMenu.attach(i, t.entryId, {
                parentMenuData: t
            })
        }

        function h(t, i) {
            t.$commentPages.html(i);
            var r = n(".comment-pager", t.$commentPages);
            n("> a", r).off("click.cp").on("click.cp", function() {
                var i = n(this).attr("href");
                return u(o(t), t, i), !1
            });
            t.$commentCount.text(r.data("row-count"));
            s(t)
        }

        function u(t, i, r) {
            if (!r) {
                var u = n(".comment-pager > .comment-refresh", i.$commentPages),
                    f = u.attr("href"),
                    o = ek$i.baseUrl + "yorum/liste/" + i.entryId;
                r = f || o
            }
            t.after(e);
            n.ajax(r, {
                type: "GET",
                cache: !1,
                success: function(n) {
                    h(i, n)
                }
            }).complete(function() {
                t.next().remove()
            })
        }

        function a(t, i) {
            var u = t.find("button[type='submit']");
            u.attr("disabled", "disabled").after(e);
            n.ajax(t.attr("action"), {
                type: "POST",
                data: t.serialize(),
                success: function(n) {
                    h(i, n);
                    r.val("")
                }
            }).complete(function() {
                u.removeAttr("disabled").next().remove()
            })
        }

        function c(u, e) {
            var o = n(".comment-summary:visible").not(".pre-rendered-comment"),
                s = e.data("comment-text");
            if ((e.show(), i === t || i.length === 0) || u.hasRenderedComment) return !0;
            o.length > 0 && l(o);
            r.val(s);
            f.val(u.entryId);
            i.appendTo(e);
            i.show();
            i.off("submit.comment").on("submit.comment", function() {
                return a(n(this), u), !1
            });
            return u.$commentPages.find("> ul > li").length === 0 && r.focus(), !0
        }

        function l(n) {
            return n.is(":visible") ? (n.hide(), i === t) ? !1 : (n.data("comment-text", r.val()), i.hide(), !1) : !1
        }

        function v(n) {
            var t = n.$commentSummary.is(":visible");
            if (t && !n.hasRenderedComment) {
                l(n.$commentSummary);
                return
            }
            n.hasRenderedComment = !1;
            c(n, n.$commentSummary);
            n.$commentSummary.removeClass("pre-rendered-comment");
            u(n.feedbackContainer.find("a > span.comment-count"), n)
        }

        function y(t, i) {
            if (i || t.commentCount !== 0) {
                var r = n("<a>", {
                    href: "#",
                    title: "yorum ekle"
                }).append(n("<span>", {
                    "class": "icon " + (t.commentCount > 0 ? "icon-comment" : "icon-comment-empty")
                })).append(n("<span>", {
                    "class": "comment-count",
                    text: t.commentCount > 0 ? t.commentCount : ""
                }));
                t.$commentCount = n(".comment-count", r);
                r.on("click", function() {
                    return v(t), !1
                });
                t.feedbackContainer.append(r)
            }
        }

        function p(r) {
            i !== t && n.ajax(ek$i.baseUrl + "yorum/duzelt/" + r.commentId, {
                type: "GET",
                success: function(t) {
                    var i = n(t),
                        f = n("<div>"),
                        e = i.find("textarea");
                    i.css("margin-top", "1em");
                    f.append(i).appendTo(n("body"));
                    i.on("submit", function() {
                        return n.ajax(ek$i.baseUrl + "yorum/duzelt/" + r.commentId, {
                            type: "POST",
                            data: i.serialize(),
                            success: function() {
                                u(o(r), r.parentMenuData)
                            },
                            complete: function() {
                                ek$i.modal.hide()
                            }
                        }), !1
                    });
                    ek$i.modal.show(f);
                    e.focus()
                },
                error: function() {},
                complete: function() {}
            })
        }
        var i, r, f, e = n("<span>", {
            "class": "progress spin",
            text: "↻"
        });
        ek$i.entryMenu.menuItems.push({
            order: 35,
            requiredFlag: "comment",
            setup: function(n) {
                n.$commentSummary = n.container.find(".comment-summary");
                n.$commentPages = n.$commentSummary.find(".comment-pages");
                n.hasRenderedComment = n.$commentPages.find(" > ul > li").length > 0;
                n.hasRenderedComment && (c(n, n.$commentSummary), n.$commentSummary.addClass("pre-rendered-comment"), s(n));
                y(n, i === t || i.length > 0)
            }
        });
        n.extend(ek$i, {
            commenting: {
                editCommentHandler: function(n) {
                    p(n)
                }
            }
        });
        n(document).ready(function() {
            (i = n("#comment-entry-form"), i.length !== 0) && (r = n("textarea", i), f = n("input[name='Id']", i))
        })
    }(jQuery),
    function(n, t) {
        function o(n) {
            n.addClass("hidden")
        }

        function f(i, r, u, f, s) {
            var c = n(".summary", i),
                h = n(".field-validation-error", i),
                l = n("input[name='id']", i);
            c.text(f);
            h.empty();
            l.val(u);
            ek$i.modal.show(i);
            n(".cancel-button", i).off("click").on("click", function() {
                ek$i.modal.hide()
            });
            i.off("submit").on("submit", function() {
                if (h.empty(), s) {
                    var u = i.find("select[name=reasonCode]").val();
                    if (u === t || u === "") return h.text("ne diye siliyoruz bunu?"), !1
                }
                return n.ajax(i.attr("action"), {
                    type: "POST",
                    data: i.serialize(),
                    success: function() {
                        ek$i.modal.hide();
                        ek$i.success(e);
                        o(r)
                    },
                    error: function() {
                        h.text("bir takım hatalar oldu.")
                    }
                }), !1
            })
        }
        var e = "başarılı bir şekilde silindi",
            r, i, u;
        ek$i.entryMenu.menuItems.push({
            order: 90,
            requiredFlag: "deleteself",
            setup: function(t) {
                var i = n("<a>").text("sil");
                i.on("click", function() {
                    var n = t.commentId || t.entryId,
                        i = t.commentSummary || t.summary,
                        e = t.commentId ? u : r;
                    return f(e, t.container, n, i), !1
                });
                t.addMenuItem(i)
            }
        }, {
            order: 90,
            requiredFlag: "deleteother",
            setup: function(t) {
                var r = n("<a>").text("sil");
                r.on("click", function() {
                    var n = t.commentId || t.entryId,
                        r = t.commentSummary || t.summary,
                        u = t.commentId ? i.data("comment-url") : i.data("entry-url");
                    return i.attr("action", u), f(i, t.container, n, r), !1
                });
                t.addMenuItem(r)
            }
        });
        n(document).ready(function() {
            r = n("#delete-self-form");
            u = n("#comment-delete-self-form");
            i = n("#delete-reasons-form")
        })
    }(jQuery),
    function(n, t, i) {
        function r(r, u) {
            function e(i, u, f) {
                var e, s, h, o;
                if (r.focus(), e = r.getSelection().text, s = n.trim(e), e.length === 0 && (h = t.prompt(f, ""), e = n.trim(h), e === null || e.length === 0)) return !1;
                o = s || e;
                e = e.replace(o, i + o + u);
                r.replaceSelection(e);
                r.scrollTop()
            }

            function f(t, r, f, o, s) {
                var h = n("<button>").attr({
                    type: "button",
                    title: r,
                    tabindex: -1
                }).text(t).on("click", function() {
                    var t = n.isFunction(f) ? f() : f;
                    return t !== i && setTimeout(function() {
                        e(t, o, s)
                    }, 10), !1
                });
                u.append(h)
            }
            f("(bkz: hede)", "bkz", "(bkz: ", ")", "hangi başlığa bkz verilecek?");
            f("hede", "başlık ya da entry'ye link", "`", "`", "hangi başlık için link oluşturulacak?");
            f("*", "akıllı bkz", "`:", "`", "yıldız içinde ne görünecek?");
            f("- spoiler -", "şpoyler ibaresi", "--- `spoiler` ---\r\n\r\n", "\r\n--- `spoiler` ---", "şpoyler şeysi arasına ne yazılacak?");
            f("http://", "web linki", function() {
                var i = n.trim(t.prompt("hangi adrese gidecek?", "http://"));
                if (i !== "" && i !== "http://") return "[" + i + " "
            }, "]", "verilecek linkin adı ne olacak?")
        }
        ek$i.editing = {
            setupDraftButtons: function(r) {
                function c() {
                    v.html(ek$i.tickHtml)
                }

                function y() {
                    if (ek$i.isLocalStorageSupported) n(t).on("storage", function(t) {
                        var s, c;
                        t.originalEvent.key === o && (s = ek$i.jsonStore(o), s !== i && s.title !== i && s.content !== i && s.title === r) && (c = n.trim(s.content).length > 0, u.val(s.content), h.html(s.renderedContent), e.toggle(c), f.toggle(c), u.resetDrWatson())
                    })
                }

                function l(n, t) {
                    ek$i.jsonStore(o, {
                        title: r,
                        content: n,
                        renderedContent: t
                    })
                }

                function a() {
                    var t = n.trim(u.val());
                    return t.length === 0 ? !1 : (c(), n.post(s.data("href"), {
                        title: r,
                        content: t
                    }, function(n) {
                        ek$i.addResponse(n.Message, n.Success ? "success" : "error");
                        n.Success && (e.show(), h.html(n.SavedDraftContent), f.show(), l(t, n.SavedDraftContent))
                    }), u.resetDrWatson(), !1)
                }
                var u = n("#editbox"),
                    e = n("#preview-area"),
                    s = n("#save-draft-button"),
                    f = n("#delete-draft-button"),
                    v = n("#draft-progress-area"),
                    h = n("#draft-content"),
                    o = "lastSavedDraft";
                s.on("click", function() {
                    return a()
                });
                u.on("keydown", function(n) {
                    var t = String.fromCharCode(n.which).toLowerCase();
                    return t !== "s" || !n.ctrlKey ? !0 : a()
                });
                f.on("click", function() {
                    return n(this).confirmAction("gidecek ama emin misiniz?", "gitsin yeaa", function() {
                        c();
                        n.post(f.data("href"), {
                            title: r
                        }).done(function() {
                            u.val("");
                            e.hide();
                            f.hide();
                            l("", "")
                        })
                    }, "yoo yoo"), !1
                });
                y()
            },
            attachEditTools: function(n, t) {
                r(n, t)
            },
            setupPictureDrop: function(n, t, i, r) {
                n.dropZone({
                    onFileDropped: function(u) {
                        var o = u.originalEvent.dataTransfer.files,
                            f, e;
                        if (o.length !== 0) {
                            if (f = o[0], f.type.substring(0, 6) !== "image/") {
                                ek$i.error("yüklemek istediğiniz dosya resim dosyası olmalı");
                                return
                            }
                            if (f.size > 4194304) {
                                ek$i.error("4MB'tan büyük dosyaları yükleyemiyoruz maalesef");
                                return
                            }
                            e = new FileReader;
                            e.readAsDataURL(f);
                            e.onload = function() {
                                i.attr("src", e.result).data({
                                    file: f
                                }).show();
                                r.addClass("picture");
                                t.show();
                                n.focus()
                            }
                        }
                    }
                })
            }
        };
        ek$i.entryMenu.menuItems.push({
            order: 60,
            requiredFlag: "edit",
            setup: function(t) {
                var u = t.commentId,
                    f = u !== i,
                    r = n("<a>", {
                        href: ek$i.baseUrl + "entry/duzelt/" + t.entryId,
                        text: "düzelt"
                    });
                if (f) {
                    r.attr("href", "#");
                    r.on("click", function() {
                        return ek$i.commenting.editCommentHandler(t), !1
                    })
                }
                t.addMenuItem(r)
            }
        });
        n(document).ready(function() {
            var t = n("#editbox"),
                i = t.parent();
            t.length > 0 && ek$i.editing.attachEditTools(t, i.find(".edittools"));
            n("textarea").keydown("ctrl+return", function() {
                n(this).closest("form").submit()
            })
        })
    }(jQuery, window),
    function(n) {
        function l(t) {
            if (t >= 1) {
                n(u).text(t).show();
                return
            }
            n(u).text(t).hide()
        }

        function a() {
            return t.length === 0 ? (ek$i.error("hiç dışa aktarılacak entry seçmediniz."), !1) : (y(), !1)
        }

        function v(t) {
            return n.extend({}, t)
        }

        function y() {
            var i = {
                    ids: v(t)
                },
                u = n(f).data("action");
            return n.ajax(u, {
                type: "POST",
                data: i,
                success: function(i) {
                    i.Success || ek$i.error(i.Message);
                    l(i.ItemCount);
                    t = [];
                    n(r).hide();
                    ek$i.success(i.Message)
                }
            }), !1
        }

        function p() {
            ek$i.info("dışa aktarılacak entry'leri kutucuklara tıklayıp seçip en aşağıdaki \"" + n(f).text() + '" linkine basınca olur bu iş.')
        }

        function h(u) {
            var o = u.is(":checked"),
                f = u.data("entryId"),
                e;
            o ? t.push(f) : (e = t.indexOf(f), t.splice(e, 1));
            n(i + "," + r).show()
        }

        function w(n) {
            var t = n.closest("article").find(i);
            t.prop("checked", !0);
            h(t)
        }

        function b() {
            return n("<a>", {
                "class": c,
                text: o
            }).on("click", function() {
                return p(), w(n(this)), !1
            })
        }

        function k(t, i) {
            if (i.addMenuItem(b(i.entryId)), i.addOtherItem(g(i.entryId)), !e) {
                e = !0;
                o = t;
                n(f).on("click", a);
                n(u).on("click", function() {
                    n(this).hide()
                })
            }
        }

        function d() {
            t = [];
            n(i).each(function() {
                n(this).prop("checked", !0);
                var i = n(this).data("entryId");
                t.push(i)
            })
        }

        function g(t) {
            return n("<input>", {
                type: "checkbox",
                "class": s,
                data: {
                    entryId: t
                }
            }).on("click", function() {
                h(n(this))
            }).on("dblclick", function() {
                d()
            })
        }
        var o, t = [],
            c = "export-link",
            s = "to-be-exported-checkbox",
            i = "." + s,
            r = "#export-entries-button-container",
            u = "#entry-export-link",
            f = r + " button",
            e;
        ek$i.entryMenu = ek$i.entryMenu || {};
        e = !1;
        ek$i.entryMenu.menuItems.push({
            order: 60,
            requiredFlag: "entryexport",
            setup: function(n) {
                k("dışa aktar", n)
            }
        })
    }(jQuery),
    function(n) {
        function o() {
            if (!i) {
                var t = n(r);
                t.length === 0 && console.error(r + " not found");
                i = t.clone().removeAttr("id")
            }
            return i
        }

        function s(t, i, r) {
            function l() {
                return s.find(".favorite-count")
            }

            function a() {
                return s.find(".favorite-link")
            }

            function v() {
                return s.find(".favorite-list-popup")
            }

            function y() {
                return v().find("div")
            }

            function p() {
                var n = l();
                if (r > 0) {
                    n.text(r).show();
                    return
                }
                n.hide()
            }

            function w() {
                var n = i ? "favorilerden çıkar" : "favorilere ekle";
                a().attr({
                    title: n,
                    "aria-label": n
                }).toggleClass("favorited", i)
            }

            function b() {
                y().empty()
            }

            function h() {
                p();
                w();
                b()
            }

            function c() {
                i = !i;
                r = r + (i ? 1 : -1);
                h()
            }

            function k() {
                var i = v(),
                    r = i.find("div");
                l().toggles(i, {
                    keepInViewPort: !0,
                    open: function() {
                        var u = i.find("div:empty").length === 1;
                        u && (r.html(ek$i.tickHtml), n.get(e, {
                            entryId: t
                        }).done(function(n) {
                            r.html(n)
                        }))
                    }
                })
            }

            function d() {
                var e;
                a().click(function() {
                    return e && e.readyState < 4 && e.abort(), c(), e = n.post(i ? u : f, {
                        entryId: t
                    }).done(function(n) {
                        if (n.Success) {
                            r = n.Count;
                            h();
                            return
                        }
                        c();
                        ek$i.error(n.ErrorMessage || "anlaşılmaz hatalar oldu")
                    }).fail(function() {
                        c()
                    }), !1
                })
            }
            var s;
            this.attach = function(n) {
                n.append(s)
            };
            s = o().clone().show();
            k();
            d();
            h()
        }
        var t = ek$i.baseUrl + "entry/",
            u = t + "favla",
            f = t + "favlama",
            e = t + "favorileyenler",
            i, r = "#favorite-link-template";
        ek$i.entryMenu.menuItems.push({
            order: 30,
            requiredFlag: "favorite",
            setup: function(n) {
                var t = new s(n.entryId, n.isfavorite, n.favoriteCount);
                t.attach(n.feedbackContainer)
            }
        });
        n(document).on("click", "#show-caylak-favs-link", function(t) {
            var i = n(t.target),
                r = i.attr("href"),
                u = i.parent();
            return i.replaceWith(ek$i.tickHtml), n.get(r).done(function(n) {
                u.replaceWith(n)
            }), !1
        })
    }(jQuery),
    function(n) {
        function t(t) {
            return n("<a>", {
                text: "tarihçe",
                "class": "history-link",
                title: "entry tarihçesi",
                href: ek$i.baseUrl + "entry/tarihce/" + t
            })
        }
        ek$i.entryMenu.menuItems.push({
            order: 75,
            requiredFlag: "entryhistory",
            setup: function(n) {
                n.addMenuItem(t(n.entryId))
            }
        })
    }(window.jQuery),
    function(n) {
        function t(t, i) {
            var r = n("<a>", {
                title: "mesaj at",
                "aria-label": "mesaj at",
                text: t
            }).on("click", function() {
                ek$i.showMessageForm(i.author, "(#" + i.entryId + ") ")
            });
            i.addMenuItem(r)
        }
        ek$i.entryMenu.menuItems.push({
            order: 40,
            requiredFlag: "msg",
            setup: function(n) {
                t("mesaj at", n)
            }
        })
    }(window.jQuery),
    function(n) {
        ek$i.entryMenu.menuItems.push({
            order: 80,
            requiredFlag: "entrymodlog",
            setup: function(t) {
                var i = n("<a>", {
                    href: ek$i.baseUrl + "modlog?q=" + encodeURIComponent("#") + t.entryId,
                    text: "modlog"
                });
                t.addMenuItem(i)
            }
        })
    }(window.jQuery),
    function(n) {
        function y() {
            var i = "#li" + t.join(", #li");
            n(i).find("article").addClass("hidden")
        }

        function p() {
            for (var u, i = "", r = 0; r < t.length; r++) u = n("<a>", {
                target: "_blank",
                rel: "noopener",
                href: ek$i.baseUrl + "entry/" + t[r]
            }).text("#" + t[r]), i += u.wrap("<p>").parent().html() + ", ";
            return i = i.slice(0, i.length - 2), i += t.length === 1 ? " entry'sini" : " entry'lerini", e.replace("{0}", i)
        }

        function w() {
            if (t.length === 0) return ek$i.error("hiç taşınacak entry seçmediniz. ayıp ediyorsunuz"), !1;
            var r = n(u);
            return r.find("#entries-destination-label").html(p()), r.find(c).text(""), ek$i.modal.show(r), r.find(i).focus(), !1
        }

        function b(t) {
            return n.extend({}, t)
        }

        function k() {
            var f = n(u),
                e = f.find(c),
                o = n.trim(f.find(i).val()),
                s;
            return o.length === 0 ? (e.text("başlık belirtmeniz gerekli"), f.find(i).focus(), !1) : (s = {
                ids: b(t),
                destination: o,
                createBkz: f.find("input[type=checkbox]").is(":checked")
            }, e.text(""), n.ajax(f.attr("action"), {
                type: "POST",
                data: s,
                success: function(i) {
                    if (!i.Success) {
                        e.text(i.Message);
                        return
                    }
                    y();
                    t = [];
                    n(r).hide();
                    ek$i.modal.hide();
                    ek$i.success(i.Message)
                },
                error: function() {
                    e.text("bir takım hatalar oldu.")
                }
            }), !1)
        }

        function d() {
            ek$i.info("taşınacak entry'leri kutucuklara tıklayıp seçip en aşağıdaki \"" + n(h).text() + '" linkine basınca olur bu iş.')
        }

        function l(i) {
            var e = i.is(":checked"),
                u = i.data("entryId"),
                f;
            e ? t.push(u) : (f = t.indexOf(u), t.splice(f, 1));
            n(s + "," + r).show()
        }

        function g(n) {
            var t = n.closest("article").find(s);
            t.prop("checked", !0);
            l(t)
        }

        function nt(t) {
            return n("<a>", {
                "class": "move-link"
            }).text(t).on("click", function() {
                return d(), g(n(this)), !1
            })
        }

        function a(t, r, o) {
            if (o.addMenuItem(nt(t)), o.addOtherItem(tt(o.entryId)), !f) {
                f = !0;
                v = t;
                e = r;
                n(h).on("click", w);
                var s = n(u);
                s.find(".cancel-button").on("click", function() {
                    ek$i.modal.hide()
                });
                s.on("submit", k);
                s.find(i).titleAutoComplete({
                    appendTo: s
                })
            }
        }

        function tt(t) {
            return n("<input>", {
                type: "checkbox",
                "class": o,
                data: {
                    entryId: t
                }
            }).on("click", function() {
                l(n(this))
            })
        }
        var v, e, t = [],
            o = "to-be-moved-checkbox",
            s = "." + o,
            r = "#move-entries-button-container",
            h = r + " button",
            u = "#move-entries-form",
            c = ".field-validation-error",
            i = "#entries-destination",
            f;
        ek$i.entryMenu = ek$i.entryMenu || {};
        f = !1;
        ek$i.entryMenu.menuItems.push({
            order: 50,
            requiredFlag: "entrymove",
            setup: function(n) {
                a("taşı", "{0} taşımak istediğiniz başlık?", n)
            }
        }, {
            order: 50,
            requiredFlag: "entryrequestmove",
            setup: function(n) {
                a("taşıt", "{0} taşıtmak istediğiniz başlık?", n)
            }
        })
    }(jQuery),
    function(n, t) {
        function v() {
            if (i.length === 0) return ek$i.error("hiç entry seçmediniz."), !1;
            var t = n(f);
            return t.find(".summary").html(y()), ek$i.modal.show(t), !1
        }

        function y() {
            for (var u, t = "", r = 0; r < i.length; r++) u = n("<a>", {
                target: "_blank",
                rel: "noopener",
                href: ek$i.baseUrl + "entry/" + i[r]
            }).text("#" + i[r]), t += u.wrap("<p>").parent().html() + ", ";
            return t = t.slice(0, t.length - 2), s.replace("{0}", t)
        }

        function p(t) {
            return n.extend({}, t)
        }

        function w() {
            var r = n(f),
                h = n(".field-validation-error", r),
                e = r.find("select[name=reasonCode]").val(),
                l = r.find("#reason-notes").val(),
                o, s;
            return e === t || e === "" ? (h.text("ne diye siliyoruz bunu?"), !1) : (o = {
                ids: p(i),
                reasonCode: e,
                reasonNotes: l
            }, s = n(c).data("action"), n.ajax(s, {
                type: "POST",
                data: o,
                success: function(t) {
                    ek$i.modal.hide();
                    t.Success || ek$i.error(t.Message);
                    i = [];
                    n(u).hide();
                    window.location.reload();
                    ek$i.success(t.Message)
                }
            }), !1)
        }

        function l(t) {
            var o = t.is(":checked"),
                f = t.data("entryId"),
                e;
            o ? i.push(f) : (e = i.indexOf(f), i.splice(e, 1));
            n(r + "," + u).show()
        }

        function b(n) {
            var t = n.closest("article").find(r);
            t.prop("checked", !0);
            l(t)
        }

        function k() {
            return n("<a>", {
                "class": a,
                text: o
            }).on("click", function() {
                return b(n(this)), !1
            })
        }

        function d(t, i, r) {
            if (r.addMenuItem(k(r.entryId)), r.addOtherItem(nt(r.entryId)), !e) {
                e = !0;
                o = t;
                s = i;
                n(c).on("click", v);
                var u = n(f);
                u.find(".cancel-button").on("click", function() {
                    ek$i.modal.hide()
                });
                u.on("submit", w)
            }
        }

        function g() {
            i = [];
            n(r).each(function() {
                n(this).prop("checked", !0);
                var t = n(this).data("entryId");
                i.push(t)
            })
        }

        function nt(t) {
            return n("<input>", {
                type: "checkbox",
                "class": h,
                data: {
                    entryId: t
                }
            }).on("click", function() {
                l(n(this))
            }).on("dblclick", function() {
                g()
            })
        }
        var o, s, i = [],
            a = "delete-multiple-entries-link",
            h = "to-be-deleted-checkbox",
            r = "." + h,
            u = "#delete-entries-button-container",
            c = u + " button",
            f = "#delete-reasons-form",
            e;
        ek$i.entryMenu = ek$i.entryMenu || {};
        e = !1;
        ek$i.entryMenu.menuItems.push({
            order: 130,
            requiredFlag: "deletemultiple",
            setup: function(n) {
                d("çoklu silme", "{0} tüm bu entryler silinecek emin misiniz ?", n)
            }
        })
    }(jQuery),
    function(n) {
        function i(i) {
            return n(document.createElement("span")).addClass("see-rates").append(function() {
                var r = n(document.createElement("a")).attr({
                        title: "entry oyları"
                    }),
                    u;
                return u = n("#svg-star").clone(), r.append(u.attr("class", "eksico")), r.click(function() {
                    r.html(ek$i.tickHtml);
                    n.get(t, {
                        entryId: i.entryId
                    }).done(function(n) {
                        r[0].outerHTML = n + " "
                    })
                }), r
            })
        }
        var t = ek$i.baseUrl + "entry/oylar";
        ek$i.entryMenu.menuItems.push({
            order: 40,
            requiredFlag: "rates",
            setup: function(n) {
                var t = i(n);
                n.infoContainer.append(t)
            }
        });
        ek$i.entryMenu.menuItems.push({
            order: 200,
            requiredFlag: "rates",
            setup: function(t) {
                var i = n("<a>").text("yıldız");
                i.on("click", function() {
                    var t = n(".see-rates");
                    return t.each(function(n, t) {
                        t.style.display = "inline"
                    }), !1
                });
                t.addMenuItem(i)
            }
        })
    }(jQuery),
    function(n, t) {
        function i(i, r) {
            var f = r !== t,
                e = "iletisim?RefEntryId=" + i + "&Category=Content&Subject=",
                u = "'" + ek$i.topic.title + "' başlığındaki #" + i;
            return u = u + (f ? " no'lu entry'deki #" + r + " no'lu yorum" : " no'lu entry"), n("<a>", {
                text: "şikayet",
                "class": "report-link",
                title: "aynen öyle",
                href: ek$i.baseUrl + e + encodeURIComponent(u)
            })
        }
        ek$i.entryMenu.menuItems.push({
            order: 70,
            requiredFlag: "report",
            setup: function(n) {
                n.addMenuItem(i(n.entryId, n.commentId))
            }
        })
    }(window.jQuery),
    function(n) {
        ek$i.entryMenu.menuItems.push({
            order: 100,
            requiredFlag: "resurrect",
            setup: function(t) {
                function f() {
                    return u.val(t.entryId), ek$i.modal.show(i), !1
                }
                var i = n("#resurrect-form"),
                    u = i.find("input[name=id]"),
                    r = n("<a>").text("canlandır");
                i.on("submit", function() {
                    return n.ajax(i.attr("action"), {
                        type: "POST",
                        data: i.serialize(),
                        success: function(n) {
                            ek$i.addResponse(n.Message, n.AlertCateogry);
                            n.Success && (t.container.removeClass("hidden"), ek$i.modal.hide())
                        },
                        error: function() {
                            ek$i.error("canlandırayım derken hatalar oldu.")
                        }
                    }), !1
                });
                n(".cancel-button", i).on("click", function() {
                    ek$i.modal.hide()
                });
                r.on("click", f);
                t.addMenuItem(r)
            }
        })
    }(window.jQuery),
    function(n) {
        var t = [{
            name: "facebook",
            medium: "wall",
            action: "share",
            url: function(n, t, i) {
                return "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(n) + "&p[title]=" + encodeURIComponent(t) + "&p[summary]=" + encodeURIComponent(i) + "&p[images][0]=https://eksisozluk.com/content/img/ilogo_fbv2.png&v=1"
            }
        }, {
            name: "twitter",
            medium: "tweet",
            action: "tweet",
            url: function(n, t, i, r, u) {
                if (r) {
                    var f = ek$i.baseUrl + "entry/tweet/" + r;
                    return u && (f += "?commentId=" + encodeURIComponent(u)), f
                }
                return "https://twitter.com/intent/tweet?text=" + encodeURIComponent(t + ": " + n + " @sozluk") + "&related=sozluk,eksiseyler"
            }
        }];
        n.extend(ek$i, {
            sharing: {
                getLinks: function(i, r, u, f, e) {
                    var o = n("<span>").addClass("share-links");
                    return n.each(t, function(t, s) {
                        var c = s.caption || s.name,
                            h = n("<a>").attr({
                                target: "_blank",
                                rel: "nofollow noopener",
                                href: s.url(i, r, u, f, e),
                                "aria-label": c,
                                title: c
                            }).on("click", function() {
                                ga && ga("send", "social", s.name, s.action, {
                                    page: i
                                })
                            }),
                            l = n("#svg-icon-" + s.name);
                        h.append(l.clone());
                        h.addClass("svgico svgico-" + s.name);
                        h.appendTo(o)
                    }), o
                }
            }
        });
        ek$i.entryMenu.menuItems.push({
            order: 10,
            requiredFlag: "share",
            setup: function(n) {
                var t = ek$i.getAbsoluteUrl("entry/" + n.entryId),
                    i;
                n.commentId && (t += "/" + n.commentId);
                i = ek$i.sharing.getLinks(t, n.title, n.summary, n.entryId, n.commentId);
                n.feedbackContainer.append(i)
            }
        })
    }(jQuery),
    function(n, t) {
        function c(t) {
            var i = n("<div>").addClass("vote-modal"),
                r = n("<button>").addClass("primary").text("kayıt ol");
            i.append(n("<p>").text(t.Message));
            r.on("click", function() {
                ek$i.go(ek$i.baseUrl + "kayit")
            });
            i.append(r);
            n("body").append(i);
            ek$i.modal.show(i)
        }

        function l(n) {
            return n ? r.data("comment-vote-url") : r.data("vote-url")
        }

        function a(n) {
            return n ? r.data("comment-unvote-url") : r.data("unvote-url")
        }

        function u(n, t) {
            ek$i.error(t);
            n.toggleClass(i)
        }

        function v(t, i, r) {
            return n.ajax({
                type: "POST",
                url: t,
                data: r,
                global: !1
            }).fail(function() {
                return u(i, "olmadı... hatalar hatalar")
            }), !1
        }

        function f(n, t) {
            if (n.length !== 0) {
                var r = n.find(">span"),
                    i = r.text();
                t > 0 ? i++ : i--;
                r.text(i ? i : "")
            }
        }

        function y(t, r, e, o, s) {
            var l = e.hasClass(i);
            return (e.toggleClass(i), l) ? (o && f(e, -1), v(r, e, s)) : (o && f(e, 1), n.ajax({
                type: "POST",
                url: t,
                data: s,
                global: !1,
                success: function(n) {
                    if (!n.Success) return u(e, n.Message);
                    if (n.AlreadyVotedAnonymously) return c(n);
                    o && f(e.siblings(h), -1);
                    e.siblings("").removeClass(i)
                }
            }).fail(function() {
                return u(e, "aşırı hatalı oldu. oyu kaydedemedik")
            }), !1)
        }

        function s(i, r, u, f, s) {
            var h = n("<a/>").attr({
                    "class": r,
                    title: u
                }),
                c = i.commentId !== t,
                p = l(c),
                w = a(c),
                v;
            e === t && (e = n("#svg-chevron-up"));
            o === t && (o = n("#svg-chevron-down"));
            v = r === "like" ? e : o;
            h.append(n("<span>").text(s ? s.toString() : ""));
            h.append(v.clone());
            h.on("click", function() {
                var n = i.commentId !== t;
                return i.flags.indexOf("owncomment") >= 0 ? (ek$i.info("kendi yorumunuza verdiğiniz oylar hesaba katılmamaktadır."), !1) : y(p, w, h, n, {
                    id: i.commentId || i.entryId,
                    rate: f,
                    owner: i.authorId
                })
            });
            return h
        }

        function p(t) {
            return n("<span>").addClass("rate-options").append(s(t, "like", "şükela!", 1, t.upVoteCount)).append(s(t, "dislike", "çok kötü", -1, t.downVoteCount))
        }
        var i = "voted",
            h = "." + i,
            r, e, o;
        ek$i.entryMenu.menuItems.push({
            order: 20,
            requiredFlag: "vote",
            setup: function(t) {
                r = n("#title");
                var i = p(t);
                t.feedbackContainer.append(i)
            }
        });
        ek$i.entryMenu.menuItems.push({
            order: 200,
            requiredFlag: "hede",
            setup: function(t) {
                var i = n(document.createElement("a")).text("hede");
                i.on("click", function() {
                    var i = n("#hede-icon"),
                        r = n("input[name='hede-id']", i),
                        u = n(".summary", i);
                    return u.text(t.summary), r.val(t.entryId), ek$i.modal.show(i), !1
                });
                t.addMenuItem(i)
            }
        })
    }(jQuery),
    function(n, t) {
        function i() {
            return n("#partial-index")
        }

        function p() {
            return i().is(":visible")
        }

        function h() {
            return n("#quick-index-nav")
        }

        function w() {
            return h().is(":visible")
        }

        function c() {
            r !== t && r.abort()
        }

        function u() {
            l();
            var n = i();
            n.find("h2:first").append(ek$i.tickHtml);
            n.find(".quick-index-continue-link-container").prepend(ek$i.tickHtml)
        }

        function l() {
            i().find(".loader-tick").remove()
        }

        function a(n) {
            u();
            var t = n.data("href") || n.attr("href");
            f(t)
        }

        function v(n) {
            i().html(n);
            tt();
            o();
            g();
            nt()
        }

        function f(t) {
            c();
            d();
            r = n.ajax({
                url: t,
                crossDomain: !1,
                complete: function(n, r) {
                    if (r !== "success") {
                        n.status === ek$i.HttpStatus.Unauthorized && i().html('<p><a href="' + ek$i.getLoginUrl() + '">giriş yapmak lazım<\/a><\/p>');
                        l();
                        return
                    }
                    v(n.responseText);
                    i().scrollTop(0);
                    y();
                    ek$i.trackEvent("index", t)
                }
            })
        }

        function b() {
            var t = !1,
                u = "#feed-refresh-link";
            n(document).on("click", u, function() {
                if (t) return !1;
                t = !0;
                var f = n(this),
                    e = f.find(".rotator").addClass("spin");
                return c(), r = n.ajax({
                    type: "GET",
                    url: f.parent().data("href"),
                    success: function(t) {
                        i().html(t);
                        o();
                        n(u).hide().fadeIn("fast")
                    },
                    error: function() {
                        ek$i.error("yenileyemedik maalesef")
                    },
                    complete: function() {
                        e.removeClass("spin");
                        t = !1
                    }
                }), !1
            })
        }

        function k() {
            var n, r;
            ek$i.isTouchDevice || (n = ek$i.jsonSessionStore(e), n !== t && n !== null && n.scrollTop !== t) && (r = parseInt(n.scrollTop, 10), i().scrollTop(r))
        }

        function y() {
            ek$i.isTouchDevice || ek$i.jsonSessionStore(e, {
                scrollTop: i !== t ? i().scrollTop() : 0
            })
        }

        function d() {
            ek$i.isTouchDevice || ek$i.jsonSessionStore(e, {
                scrollTop: 0
            })
        }

        function o() {
            n("#partial-index > ul > li > a").attr("draggable", "true").on("dragstart", function(t) {
                var i = n.trim(n(this).contents().first().text());
                t.originalEvent.dataTransfer.setData("text", i)
            });
            n("textarea").off("dragover").on("dragover", function() {
                return !1
            }).off("drop").on("drop", function(t) {
                var u = t.originalEvent.dataTransfer.getData("text"),
                    r = n(this),
                    i = r.val();
                return i.length > 0 && i.charAt(i.length - 1) !== " " && (i += " "), i += u, r.val(i).focus().setCaretPos(i.length), !1
            })
        }

        function g() {
            n(".pager", i()).pager()
        }

        function nt() {
            n(".today-in-past-selector", i()).todayInPastSelector()
        }

        function tt() {
            var t = n(".topic-list", i()).data("timestamp");
            ek$i.jsonStore(s, {
                timestamp: t,
                content: i().html()
            })
        }

        function it() {
            var r = ek$i.jsonStore(s),
                u;
            r !== t && r !== null && r.timestamp !== t && r.content !== t && (u = n(".topic-list", i()).data("timestamp"), u) && u < r.timestamp && v(r.content)
        }

        function rt() {
            return ut().length < 1 ? !1 : !0
        }

        function ut() {
            return n("#today-index-section-container")
        }

        function ft() {
            rt() && n("#index-section").children().appendTo("#today-index-section-container")
        }
        var r, s = "indexStateV2",
            e = "indexScrollState";
        n(window).on("unload", y);
        n(document).on("click", ".index-link", function() {
            if (p()) return a(n(this)), !1
        });
        n(document).ready(function() {
            ek$i.quickIndexAvailable = w();
            it();
            o();
            b();
            ft();
            n(document).on("select.pager", "#partial-index .pager", function(n) {
                return u(), f(n.url), !1
            });
            n(document).on("select.today.in.past.year.changed", "#partial-index .today-in-past-selector", function(n) {
                return u(), f(n.url), !1
            });
            if (ek$i.quickIndexAvailable) {
                k();
                h().find("a:not(.dropdown-toggle):not(.ads)").on("click", function() {
                    return a(n(this)), !1
                });
                n("#top-bar > #advanced-search-form").on("submit", function() {
                    var t = n(this),
                        i = t.serialize();
                    return u(), f(t.attr("action") + "?" + i), !1
                })
            }
        })
    }(jQuery)