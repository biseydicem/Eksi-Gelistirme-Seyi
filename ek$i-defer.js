(function(n, t, i) {
    function h(n) {
        b && console.log(n)
    }

    function k(t) {
        n.getCachedScript(t)
    }

    function d() {
        n("#return-to-innocence").click(function() {
            n.cookie("notheme", 1);
            i.reload()
        })
    }

    function u(i) {
        if (i.IsFallbackAd) return !1;
        if (o >= w) return h("AdSense display limit exceeded"), !1;
        var r = n(t).width();
        return typeof i.Size == "undefined" || r >= i.Size[0] ? !0 : (h(i.Name + " won't be displayed due to screen width. " + JSON.stringify({
            screenWidth: r,
            adWidth: i.Size[0],
            adLength: i.Size[1]
        })), !1)
    }

    function c() {
        s || (s = !0, k("https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"))
    }

    function l(i, r) {
        if (!t.adsbygoogle) {
            t.setTimeout(function() {
                l(i, r)
            }, 50);
            return
        }
        var u = n("<ins>", {
            "class": "adsbygoogle",
            css: {
                display: "inline-block",
                width: i.Size[0],
                height: i.Size[1]
            },
            "data-ad-client": i.Client,
            "data-ad-slot": i.Slot
        });
        r.append(u).show();
        o++;
        (t.adsbygoogle = t.adsbygoogle || []).push({})
    }

    function f(i, r) {
        var u = n("<div>", {
            id: i.Slot
        });
        r.append(u).show();
        googletag.cmd.push(function() {
            googletag.display(i.Slot)
        });
        i.Name === "DoubleClickMobileInterstital" && t.setTimeout(function() {
            g(r)
        }, 3e3)
    }

    function g(n) {
        function r(n) {
            var t = document.getElementById(n),
                i;
            return t.contentDocument && (i = t.contentDocument.getElementsByTagName("body")[0]), t.contentWindow && (i = t.contentWindow.document.getElementsByTagName("body")[0]), i.outerHTML === '<body style="background:transparent"><\/body>' || i.outerHTML === '<body style="background:transparent" marginwidth="0" marginheight="0"><\/body>'
        }
        var i = "google_ads_iframe_/7436646/EksiSozluk_MobileSite_Interstitial_0";
        r(i) || (n.css({
            position: "fixed",
            zIndex: "99999",
            display: "block"
        }), document.getElementById(i).width = document.body.clientWidth, document.getElementById(i).height = document.body.clientHeight, t.setTimeout(function() {
            n.fadeOut(2e3)
        }, 15e3))
    }

    function nt() {
        var t = n(y);
        tt(t);
        t.each(function(t, i) {
            var r = n(i),
                e = r.data("info");
            if (!u(e)) {
                r.hide();
                return
            }
            e.IsLazyLoad || f(e, r)
        })
    }

    function tt(t) {
        function u(t) {
            if (typeof t != "undefined") {
                var i = t.slot.getName();
                if (i === "/1024435/EksiSozluk_Web_Tema_Banner_970x250" && !t.isEmpty) {
                    n(".ad-doubleclickwebthemebanner").removeClass("web-top-ad-not-loaded");
                    return
                }
                if (i === "/138586269/mobile_web_top" && !t.isEmpty) {
                    n(".ad-dobuleclickmobile320x100topziyaretci").removeClass("mobile-top-ad-not-loaded");
                    return
                }
                if (i === "/138586269/EksiSozluk_Web_Yazar_728x90_Top" && !t.isEmpty) {
                    if (t.size[0] === 728) {
                        n(".ad-doubleclickwebmasthead").removeClass("web-top-ad-not-loaded");
                        n(".ad-doubleclickwebmasthead").addClass("web-top-ad-728-loaded");
                        return
                    }
                    n(".ad-doubleclickwebmasthead").removeClass("web-top-ad-not-loaded");
                    return
                }
                if (i === "/1024435/EksiSozluk_Web_Tema_Sponsored_Title") {
                    n("#sponsored-index-item-first").show();
                    return
                }
                if (i === "/1024435/EksiSozluk_Web_Tema_Sponsored_Title_2") {
                    n("#sponsored-index-item-second").show();
                    return
                }
                if (i === "/1024435/EksiSozluk_Web_Tema_Sponsored_Title_3") {
                    n("#sponsored-index-item-third").show();
                    return
                }
                if (i === "/1024435/mobile_sponsored_title") {
                    n("#sponsored-index-item-mobile").show();
                    return
                }
                if (i === "/1024435/EksiSozluk_Web_Sponsored_Entry") {
                    n("#sponsored-entry").show();
                    return
                }
            }
        }
        var f = ek$i.topic.id,
            e = n("#hidden-channels").text().trim().split(","),
            o = n('meta[name="homepage"]').attr("content"),
            s = n("meta[name='sensitivecontent']").length > 0 ? "true" : "false",
            i;
        n("#title").length > 0 && (i = n("#title").data("title").split(" "));
        t.each(function(t, i) {
            var e = n(i),
                r = e.data("info"),
                o = r.Size[0],
                s = r.Size[1],
                u = r.NetworkIdentifier,
                f = r.Slot;
            r.IsLazyLoad || (r.Name === "DoubleClickWebMasthead" ? googletag.cmd.push(function() {
                googletag.defineSlot(u, [
                    [970, 250],
                    [728, 90],
                    [970, 90]
                ], f).addService(googletag.pubads()).setCollapseEmptyDiv(!0)
            }) : r.Name === "DoubleClickWeb728x90BottomZiyaretci" ? googletag.cmd.push(function() {
                googletag.defineSlot(u, [
                    [970, 250],
                    [728, 90],
                    [970, 90]
                ], f).addService(googletag.pubads()).setCollapseEmptyDiv(!0)
            }) : r.Name === "DobuleClickMobile320x100TopZiyaretci" ? googletag.cmd.push(function() {
                googletag.defineSlot(u, [
                    [320, 100],
                    [320, 50],
                    [320, 142]
                ], f).addService(googletag.pubads()).setCollapseEmptyDiv(!0)
            }) : r.Name === "DoubleClickMobileThemeBanner" ? googletag.cmd.push(function() {
                googletag.defineSlot(u, [
                    [320, 100],
                    [320, 50],
                    [320, 142]
                ], f).addService(googletag.pubads()).setCollapseEmptyDiv(!0)
            }) : r.Name === "DoubleClickWeb300x250SideZiyaretci" ? googletag.cmd.push(function() {
                googletag.defineSlot(u, [
                    [300, 250],
                    [300, 600]
                ], f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : r.Name === "DoubleClickWebInterstital" ? googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot(u, f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : r.Name === "DoubleClickWebPrestital" ? googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot(u, f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : r.Name === "DoubleClickWebSponsoredIndexItemFirst" ? googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot(u, f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : r.Name === "DoubleClickWebSponsoredIndexItemSecond" ? googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot(u, f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : r.Name === "DoubleClickWebSponsoredIndexItemThird" ? googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot(u, f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : r.Name === "DoubleClickMobileSponsoredIndexItem" ? googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot(u, f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : r.Name === "DoubleClickWebSponsoredEntry" ? googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot(u, f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : r.Name === "DoubleClickWebHomePageSponsoredEntry" ? googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot(u, f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : r.Name === "DoubleClickEksiseylerWebSideSeeding300x110" ? googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot(u, f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : r.Name === "MobileWebInterstitial" ? googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot(u, f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }) : googletag.cmd.push(function() {
                googletag.defineSlot(u, [o, s], f).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }))
        });
        var h = r(n("#hidden-body-text-color").css("background-color")),
            c = r(n("#hidden-box-color").css("background-color")),
            l = r(n("#hidden-muted-color").css("background-color")),
            a = r(n("#hidden-text-color").css("background-color")),
            v = r(n("#hidden-intopic-link-color").css("background-color")),
            y = r(n("#hidden-link-color").css("background-color")),
            p = r(n("#hidden-entry-footer-info-color").css("background-color")),
            w = n("#hidden-eksiseyler-embed-style").data("style");
        googletag.cmd.push(function() {
            googletag.pubads().addEventListener("slotRenderEnded", u);
            googletag.pubads().setTargeting("bodytextcolor", h);
            googletag.pubads().setTargeting("boxcolor", c);
            googletag.pubads().setTargeting("mutedcolor", l);
            googletag.pubads().setTargeting("Eksisozluk_Baslik", [f]);
            googletag.pubads().setTargeting("Eksisozluk_Kanal", e);
            googletag.pubads().setTargeting("intopiclinkcolor", v);
            googletag.pubads().setTargeting("textcolor", a);
            googletag.pubads().setTargeting("linkcolor", y);
            googletag.pubads().setTargeting("entryfooterinfocolor", p);
            googletag.pubads().setTargeting("Eksisozluk_Anasayfa", o);
            googletag.pubads().setTargeting("seylerembedstyle", w);
            googletag.pubads().setTargeting("isAdultContent", s);
            googletag.pubads().setTargeting("titlekeywords", i);
            et();
            googletag.enableServices()
        })
    }

    function e(n) {
        return ("0" + parseInt(n, 10).toString(16)).slice(-2)
    }

    function r(n) {
        return (n = n.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i), !n || n.length !== 4) ? "" : e(n[1]) + e(n[2]) + e(n[3])
    }

    function it() {
        var t = n(v);
        t.each(function(t, i) {
            var r = n(i),
                f = r.data("info");
            if (!u(f)) {
                r.hide();
                return
            }
            c();
            l(f, r)
        })
    }

    function a() {
        var r = n(p),
            i;
        if (r.length > 0) {
            if (c(), i = t.adsbygoogle, !i) {
                t.setTimeout(function() {
                    a()
                }, 50);
                return
            }
            i.push({
                google_ad_client: "ca-pub-9569912916382218",
                enable_page_level_ads: !0
            })
        }
    }

    function rt() {
        var i = n(".ad-doubleclickweb300x250sidesticky"),
            t = i.data("info"),
            r = t.Size[0],
            e = t.Size[1],
            o = t.NetworkIdentifier,
            s = t.Slot;
        if (t.IsLazyLoad) {
            if (!u(t)) {
                i.hide();
                return
            }
            i.hasClass("loaded") || (googletag.cmd.push(function() {
                googletag.defineSlot(o, [r, e], s).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
            }), f(t, i), i.addClass("loaded"))
        }
    }

    function ut() {
        var f = n(t).scrollTop(),
            r = n("#sticky-anchor"),
            i = n("#sticky-ad"),
            u = n(".ad-doubleclickweb728x90bottomziyaretci"),
            e = r.offset().top - 120;
        u.length < 1 || (f > e ? (i.addClass("stick-ad"), r.height(i.outerHeight()), u.offset().top - i.offset().top - 300 >= 325 && rt()) : (i.removeClass("stick-ad"), r.height(0)))
    }

    function ft() {
        n(t).scroll(ut)
    }

    function et() {
        for (var i = (t.crtg_content || "").split(";"), r = googletag.pubads(), n = 1; n < i.length; n++) r.setTargeting("" + i[n - 1].split("=")[0] + "", "" + i[n - 1].split("=")[1] + "")
    }
    var v = ".ad-adsense",
        y = ".ad-double-click",
        p = ".ad-adsensepageleveladindexpages",
        w = 4,
        o = 0,
        s = !1,
        b = i.search.indexOf("adlog") > -1;
    n.fn.loadAdsLazily = function() {
        function c(t) {
            var r = n(t),
                i = r.data("info"),
                s = i.Size[0],
                h = i.Size[1],
                e = i.NetworkIdentifier,
                o = i.Slot;
            if (i.IsLazyLoad) {
                if (!u(i)) {
                    r.hide();
                    return
                }
                r.hasClass("loaded") || (i.Name === "DoubleClickWeb728x90BottomZiyaretci" ? googletag.cmd.push(function() {
                    googletag.defineSlot(e, [
                        [970, 250],
                        [728, 90],
                        [970, 90]
                    ], o).addService(googletag.pubads()).setCollapseEmptyDiv(!0)
                }) : googletag.cmd.push(function() {
                    googletag.defineSlot(e, [s, h], o).addService(googletag.pubads()).setCollapseEmptyDiv(!0, !0)
                }), f(i, r), r.addClass("loaded"))
            }
        }

        function h() {
            var u = e.filter(function() {
                var u = n(this),
                    o = typeof t.innerHeight != "undefined" ? t.innerHeight : i.height(),
                    f = i.scrollTop(),
                    s = f + o,
                    e = u.offset().top,
                    h = e + u.height();
                return h >= f - r.threshold && e <= s + r.threshold
            });
            s = u.trigger("lazyload");
            e = e.not(s)
        }

        function l(n) {
            n.one("lazyload", function() {
                c(this)
            });
            h()
        }
        var i = n(t),
            e = this,
            s, o, r = n.extend({
                throttle: 300,
                threshold: 600
            }, r);
        i.on("scroll resize lookup", function() {
            o && clearTimeout(o);
            o = setTimeout(function() {
                i.trigger("lazyupdate")
            }, r.throttle)
        });
        i.on("lazyupdate", function() {
            h()
        });
        return l(this), this
    };
    n(document).ready(function() {
        ft();
        d();
        a();
        it();
        nt()
    })
})(jQuery, window, location),
function(n) {
    function t(n) {
        return n.match(/[@#a-zA-ZşığüöçŞİĞÜÖÇ0-9]/)
    }
    n(document).ready(function() {
        n(document).on("keypress", function(n) {
            var i = ek$i.getSearchBox(),
                r = String.fromCharCode(n.which),
                u = document.activeElement,
                f = !u || u !== document.body;
            return n.metaKey || n.ctrlKey || !t(r) || f || i.val().length > 0 ? !0 : (i.val(r).focus().setCaretPos(1), !1)
        })
    })
}(jQuery),
function(n, t) {
    function r(t) {
        t.bind("input.autocomplete propertychange.autocomplete", function() {
            n(this).trigger("keydown.autocomplete", {
                keycode: 0
            })
        })
    }

    function u(t) {
        t.element.on("focus", function() {
            if (!t.element.prop("ignoreFocus")) {
                var i = n(this).val();
                i.length > 0 && t.search(i)
            }
        })
    }

    function f(n) {
        r(n.element);
        u(n)
    }

    function i(t, i, r, u) {
        var f = n.trim(t.term);
        if (f === "") {
            i();
            return
        }
        if (f in r) {
            i(r[f]);
            return
        }
        n.getJSON(u, t, function(n) {
            r[f] = n;
            i(n)
        })
    }(function() {
        n.widget("ek$i.baseAutoComplete", n.ui.autocomplete, {
            _init: function() {
                f(this)
            },
            options: {
                messages: {
                    noResults: "",
                    results: function() {}
                }
            }
        })
    })(),
    function() {
        var r = {},
            i;
        n.widget("ek$i.queryAutoComplete", n.ek$i.baseAutoComplete, {
            _renderMenu: function(t, i) {
                var r = this;
                if (i = i[0], i.Titles.length === 0 && i.Nicks.length === 0) {
                    r._renderItemData(t, {
                        label: "(buna yakın bir şey yok)",
                        value: r.term
                    });
                    return
                }
                n.each(i.Titles, function(n, i) {
                    r._renderItemData(t, {
                        label: i,
                        value: i,
                        category: "titles"
                    })
                });
                n.each(i.Nicks, function(n, i) {
                    r._renderItemData(t, {
                        label: "@" + i,
                        value: "@" + i,
                        category: "nicks"
                    })
                })
            },
            options: {
                source: function(u, f) {
                    function o(n, i) {
                        i !== t && (i.abort(), n.pending--)
                    }
                    var e = n.trim(u.term),
                        s;
                    if (e === "") {
                        i = o(this, i);
                        f();
                        return
                    }
                    if (e in r) {
                        f([r[e]]);
                        return
                    }
                    s = ek$i.baseUrl + "autocomplete/query?q=" + encodeURIComponent(e);
                    o(this, i);
                    i = n.getJSON(s, function(n, u, o) {
                        r[e] = n;
                        o === i && (f([n]), i = t)
                    })
                },
                select: function(t, i) {
                    i.item && n(t.target).val(i.item.value);
                    n(t.target.form).submit()
                },
                delay: 200,
                minLength: 0
            }
        })
    }(),
    function() {
        var r = {};
        n.widget("ek$i.nickAutoComplete", n.ek$i.baseAutoComplete, {
            options: {
                applyNickPrefix: !1,
                source: function(n, u) {
                    this.options.title !== t && (n.title = this.options.title);
                    i(n, u, r, ek$i.baseUrl + "autocomplete/nick")
                },
                title: t
            },
            _renderItem: function(t, i) {
                var r = this;
                return r.options.applyNickPrefix && (i.label = "@" + i.label, i.value = "@" + i.value), n.ui.autocomplete.prototype._renderItem.apply(this, [t, i])
            }
        })
    }(),
    function() {
        var t = {};
        n.widget("ek$i.titleAutoComplete", n.ek$i.baseAutoComplete, {
            options: {
                source: function(n, r) {
                    i(n, r, t, ek$i.baseUrl + "autocomplete/title")
                }
            }
        })
    }(),
    function() {
        var t = {};
        n.widget("ek$i.videoAutoComplete", n.ek$i.baseAutoComplete, {
            options: {
                source: function(n, r) {
                    i(n, r, t, ek$i.baseUrl + "video/matchvideosbytitle")
                }
            },
            _renderItem: function(t, i) {
                i.value = i.Title;
                i.label = i.Title;
                var r = n("<img/>").attr("src", i.ThumbUri),
                    u = n("<a>").append(r).append(i.Title),
                    f = n("<li>").addClass("video-item").append(u);
                return f.appendTo(t)
            }
        })
    }();
    n(document).ready(function() {
        n(".nickpicker").each(function() {
            var t = n(this),
                i = {};
            t.parents("#advanced-search-form").length > 0 && n.extend(i, {
                appendTo: "#advanced-search-form"
            });
            t.nickAutoComplete(i)
        });
        n(".title-autocomplete").titleAutoComplete({
            browseOnSelection: !1
        })
    })
}(jQuery),
function(n, t) {
    var r = "beforeunload",
        i = "drwatson_data";
    n.fn.trackChanges = function() {
        return this.each(function() {
            var u = n(this),
                f = u.val();
            u.data(i, f).closest("form").submit(function() {
                n(t).unbind(r)
            });
            n(t).bind(r, function() {
                var t = u.val(),
                    r;
                if (n.trim(u.data(i)) !== n.trim(t) && t.length !== 0)
                    if (u.focus(), r = "dr. watson: aman yazdıkların boşa gitmesin!\n\n" + t.substr(0, 30) + (t.length < 30 ? "..." : "") + "\n", document.all && event) event.returnValue = r;
                    else return r
            })
        })
    };
    n.fn.resetDrWatson = function() {
        return this.each(function() {
            var t = n(this);
            t.data(i, t.val())
        })
    };
    n(document).ready(function() {
        n(".track-changes").trackChanges()
    })
}(jQuery, window),
function(n) {
    var i = ".dropdown-toggle",
        t = ".dropdown-menu";
    n.fn.dropdown = function() {
        return this.each(function() {
            var r = n(this),
                u = r.find(i),
                f = r.find(t);
            if (u.length !== 0) {
                u.toggles(f, {
                    keepInViewPort: !0
                });
                f.find("li > a").on("click", function() {
                    ek$i.toggles.toggle(n(this).closest(t))
                })
            }
        })
    };
    n(document).ready(function() {
        n(".dropdown:not(:has(>a.toggles))").dropdown()
    })
}(jQuery),
function(n) {
    var t = {
        onFileDropped: function() {}
    };
    n.fn.dropZone = function(i) {
        return i = n.extend({}, t, i), this.each(function() {
            var t = n(this),
                r = n.proxy(i.onFileDropped, t);
            t.addClass("dropzone");
            t.on("dragover", function(n) {
                n.preventDefault();
                n.stopPropagation()
            });
            t.on("dragenter", function(n) {
                t.addClass("drag-enter");
                n.preventDefault();
                n.stopPropagation()
            });
            t.on("dragleave", function() {
                t.removeClass("drag-enter")
            });
            t.on("drop", function(n) {
                t.removeClass("drag-enter");
                n.preventDefault();
                r(n)
            })
        })
    }
}(jQuery),
function(n) {
    n(function() {
        n("section.dynamic > h2 > a").click(function(t) {
            var r = n(t.target),
                u = r.parent(),
                f = u.parent(),
                e = f.children().not(u),
                i = f.find(".dynamic-content"),
                o;
            return i.length === 0 || i.data("loaded") ? (e.toggle("fast"), !1) : (o = r.attr("href"), i.html(ek$i.tickHtml), e.show("fast"), n.get(o).done(function(n) {
                i.html(n || "(yok bişii pek)").data("loaded", !0)
            }).fail(function() {
                i.empty().hide()
            }), !1)
        })
    })
}(jQuery),
function(n) {
    n(document).on("submit", ".disable-on-submit", function() {
        n(this).find("input[type=submit], input[type=button], button").prop("disabled", !0)
    })
}(jQuery),
function(n) {
    function t(n) {
        var f = n.find(".fromDateSelector").val(),
            e = n.find(".fromTimeSelector").val(),
            o = n.find(".toDateSelector").val(),
            s = n.find(".toTimeSelector").val(),
            t = e.match(/(\d{2}):(\d{2})/),
            i = s.match(/(\d{2}):(\d{2})/),
            r = new Date(f),
            u = new Date(o);
        r.setHours(t[1], t[2]);
        u.setHours(i[1], i[2]);
        n.find("input[name=fromDate]").val(r.toISOString());
        n.find("input[name=toDate]").val(u.toISOString())
    }
    n.fn.setCaretPos = function(t) {
        return n.each(this, function(n, i) {
            if (i.setSelectionRange) i.setSelectionRange(t, t);
            else if (i.createTextRange) {
                var r = i.createTextRange();
                r.collapse(!0);
                r.moveEnd("character", t);
                r.moveStart("character", t);
                r.select()
            }
        })
    };
    n.fn.setupScheduleSelectors = function() {
        return this.each(function() {
            var i = n(this);
            if (i.prop("tagName") === "FORM") i.on("submit", function() {
                t(n(this))
            })
        })
    };
    n(document).ready(function() {
        n("input[type=text]").attr({
            autocapitalize: "off",
            autocorrect: "off"
        })
    })
}(jQuery),
function(n) {
    function t() {
        var t = n('meta[name="viewport"]');
        if (t !== null) {
            t.attr("content", "width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0");
            n(document).on("gesturestart", function() {
                t.attr("content", "width=device-width, minimum-scale=0.25, maximum-scale=1.6")
            })
        }
    }
    ek$i.isIos && n(t)
}(jQuery),
function(n, t) {
    function u(n, t) {
        return n < t
    }

    function f() {
        var f = n("#entry-list .content");
        if (window.location.pathname.indexOf("/entry/") !== -1 && f.length === 1) {
            n(f[0]).addClass(i);
            return
        }
        n.each(f, function(f, e) {
            var o = n(e),
                h = o.innerHeight(),
                c = e.scrollHeight,
                s, v;
            if (u(h, c)) {
                if (h / c >= .666) {
                    o.addClass(i);
                    return
                }
                var l = t.createElement("span"),
                    a = t.createElement("a"),
                    y = t.createTextNode("devamını okuyayım...");
                l.className = "read-more-link-wrapper";
                a.appendChild(y);
                s = n(l);
                v = n(a).on("click", function() {
                    o.addClass(i).removeClass(r);
                    n(this).remove()
                });
                s.append(v);
                o.after(s)
            }
        })
    }
    var i = "content-expanded",
        r = "content-faded";
    n(t).ready(function() {
        f()
    })
}(jQuery, document),
function(n) {
    n(document).ready(function() {
        function r() {
            e.blur();
            t.removeClass("open")
        }

        function u() {
            var i = t.hasClass("open"),
                n;
            return i ? (r(), !1) : (ek$i.getSearchBox().queryAutoComplete("close"), t.addClass("open"), n = ek$i.getSearchBox().val(), f.val(n).focus(), n.length > 0 && ek$i.quickIndexAvailable && t.submit(), !1)
        }

        function s(u) {
            if (t.hasClass("open")) {
                var f = n(u.target);
                f.is(t) || f.is(i) || f.closest(t).length > 0 || f.is("a.ui-corner-all") || r()
            }
        }
        var t = n("#advanced-search-form"),
            i = n("#a3-toggle"),
            f = n("input[type=text]:first", t),
            e = n("input", t),
            o = n("a.close", t);
        i.on("click", u).on("keypress", function(n) {
            if (n.which === ek$i.KEY.RETURN) return u(), !1
        });
        o.on("click", function() {
            t.removeClass("open")
        });
        n(document).on(ek$i.documentClickEvent, s)
    })
}(jQuery),
function(n) {
    ek$i.getSummary = function(t, i) {
        i = i || 100;
        var r;
        if (t instanceof n) {
            if (t.length === 0) return "";
            r = t.text()
        } else if (typeof t == "string") r = t;
        else return "";
        return r.length > i && (r = n.trim(r.substring(0, i)), r = r.replace(/\s{2,}/g, " ").replace(/[^a-z0-9]+$/i, "") + "…"), r
    }
}(jQuery),
function(n) {
    n(document).ready(function() {
        function i(n) {
            return n ? r : u
        }
        var t = "toggle-enabled",
            r = "disable-",
            u = "enable-";
        n(".toggle-link").click(function() {
            var r = n(this),
                u = r.hasClass(t),
                f = i(u),
                o = r.data(f + "url"),
                s = r.data(f + "post-data"),
                e = r.data(f + "success-text");
            return n.post(o, s).done(function() {
                e && ek$i.success(e);
                u = !u;
                var n = i(u),
                    f = r.data(n + "caption");
                r.text(f);
                r.toggleClass(t, u)
            }), !1
        })
    })
}(jQuery),
function(n) {
    function t() {
        n("#top-navigation .more a").toggles(n("#sub-navigation"), {
            keepInViewPort: !0
        })
    }

    function i() {
        n("#top-login-link").on("click", function() {
            var t = n(this),
                i = t.attr("href");
            i.indexOf("?returnUrl") > -1 || location.href.indexOf("giris?returnUrl") > -1 || t.attr("href", i + "?returnUrl=" + encodeURIComponent(location.href))
        })
    }

    function r() {
        n(".display-preference").click(function(t) {
            t.preventDefault();
            n.ajax({
                url: n(this).attr("href"),
                type: "POST",
                success: function() {
                    location.reload()
                },
                error: function() {
                    ek$i.error("bir takım hatalar oldu.")
                }
            })
        })
    }
    n.extend(ek$i, {
        getSearchBox: function() {
            return n("#search-textbox")
        }
    });
    n(document).ready(function() {
        ek$i.getSearchBox().queryAutoComplete({
            appendTo: "body",
            position: {
                my: "left top+3%"
            }
        });
        t();
        i();
        r()
    })
}(jQuery),
function(n) {
    function t() {
        var t = n("#topic-channel-suggestions-toggle");
        t.click(function() {
            var i = n("#topic-channel-suggestions-container");
            if (i.is(":visible")) {
                i.hide();
                return
            }
            i.show().html(ek$i.tickHtml).load(t.data("url"))
        })
    }

    function i() {
        function e() {
            var t = n("#topic-channels");
            n.get(t.data("url"), function(r) {
                t.html(r);
                t = n("#topic-channels");
                n.each(i.find("li"), function(i, r) {
                    var u = t.find("li.channel-" + n(r).data("channel-name")).length === 0 ? "passive" : "active",
                        f = n(r).find("span.name");
                    f.attr("class", "name " + u)
                });
                u()
            })
        }

        function r(t, i) {
            var r = t.parents("li").data("channel-name");
            n.post(f, {
                id: ek$i.topic.id,
                channelName: r,
                suggestion: i
            }, function(n) {
                var t = n.success ? "success" : "error";
                n.success && e();
                ek$i.addResponse(n.message, t)
            })
        }

        function u() {
            var t = 1,
                u = -1,
                f = i.find("span.name.active"),
                e = i.find("span.name.passive");
            f.off("click").click(function() {
                r(n(this), u)
            });
            e.off("click").click(function() {
                r(n(this), t)
            })
        }
        var i = n("#topic-channel-suggestion-menu"),
            f = i.data("post-url");
        t();
        u()
    }

    function r() {
        var t = n("#open-suggest-ui-link");
        t.click(function() {
            var r = n("#channel-suggest-panel");
            if (t.data("loaded")) {
                r.toggle();
                return
            }
            r.html(ek$i.tickHtml).load(t.data("url"), function() {
                i();
                t.data("loaded", !0)
            })
        })
    }
    n(r)
}(jQuery),
function(n, t) {
    function i() {
        n("#videos .popped-player").remove()
    }

    function u(t) {
        t.find("li a, .big-thumb a").on("click", function() {
            i();
            var r = n(this),
                t = n("<div>", {
                    "class": "popped-player"
                }),
                u = n("<a>", {
                    "class": "close",
                    text: "×",
                    title: "kapat"
                }),
                f = ek$i.getBlockLoadingElement("yükleniyor"),
                e = r.data("href");
            u.on("click", i);
            return t.append(u).append(f), r.closest("div").append(t), n.get(e, function(n, r) {
                if (ek$i.trackInteractionEvent("video", "play", e), r !== "success") {
                    i();
                    ek$i.error("videoya bir şeyler olmuş. yükleyemiyoruz.");
                    return
                }
                f.remove();
                t.append(n)
            }), !1
        })
    }

    function r(t) {
        n("#schedule-video").videoAutoComplete({
            select: function(n, i) {
                t.find("input[name=videoId]").val(i.item.Id)
            }
        })
    }

    function f(n) {
        if (n.length !== 0) {
            u(n);
            n.find(".show-others").on("click", function() {
                n.find("#other-videos").toggle()
            })
        }
    }

    function e(i) {
        i.length !== 0 && n.each(i, function(i, r) {
            var u = n(r);
            u.on("click.clickToPlay", function() {
                u.parent().addClass("click-to-play-clicked");
                var n = u.data("videouri"),
                    i = u.data("playerid");
                n !== t && u.replaceWith('<iframe id="' + i + '" src="' + n + '" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true""><\/iframe>')
            })
        })
    }
    ek$i.video = {
        setupNewTopicVideoForm: function() {
            var t = n("#new-topic-video-form");
            r(t);
            t.setupScheduleSelectors()
        },
        setupNewSplashVideoForm: function() {
            var t = n("#new-splash-video-form");
            r(t);
            t.setupScheduleSelectors()
        },
        setupEditTopicVideoForm: function() {
            n("#edit-topic-video-form").setupScheduleSelectors()
        },
        setupEditSplashVideoForm: function() {
            n("#edit-splash-video-form").setupScheduleSelectors()
        }
    };
    n(document).ready(function() {
        f(n("#videos"));
        e(n(".click-to-play"))
    })
}(jQuery),
function(n) {
    n(function() {
        n(".nick-list form").submit(function() {
            var t = n(this),
                i = t.find("button");
            return i.prop("disabled", !0), n.post(t.prop("action"), t.serialize()).done(function() {
                ek$i.success("başarıyla oldu!");
                t.parents("li").slideUp(function() {
                    n(this).remove()
                })
            }).always(function() {
                i.prop("disabled", !1)
            }), !1
        })
    })
}(jQuery)