var xxx;
NProgress.start(),
    jQuery(window).resize(function () {
        768 > roar.getWidthBrowser() && $("#popup-mailchimp.hidden-xs").find(".mfp-close").trigger("click")
    }),
    jQuery(document).ready(function () {
        try {
            roar.init(),
                roarLookbook.init()
        } finally {
            NProgress.done()
        }
    });
var roar = {
    init: function () {
        this.initChangeInputNameCartPage(),
            this.handleOrder(),
            this.currenciesCallback(),
            this.initCountdown(),
            this.addToCart(),
            this.addToWishlist(),
            this.handleCompare(),
            this.removeToWishlist(),
            this.handlePopups(),
            this.handleSearch(),
            this.handleGMap(),
            this.handleScrollToTop(),
            this.handleSmoothScroll(),
            this.mapFilters(),
            this.handleQuickshop(),
            this.handleBlog(),
            this.handleCookie(),
            this.fixedHeaderMenu(),
            this.searchAutoComplete(),
            this.handleDropdown(),
            this.toggleFilter()
    },
    changeInputNameCartPage: function () {
        var y = "updates[]";
        767 < $(window).width() ? ($(".input-mobile").attr("name", ""),
            $(".input-desktop").attr("name", y)) : ($(".input-mobile").attr("name", y),
                $(".input-desktop").attr("name", ""))
    },
    initChangeInputNameCartPage: function () {
        $(".input-mobile").length && $(".input-desktop").length && (roar.changeInputNameCartPage(),
            $(window).resize(function () {
                roar.changeInputNameCartPage()
            }))
    },
    fixedHeaderMenu: function () {
        if (0 < $(".section-megamenu-content").length && $(".section-megamenu-content").each(function () {
            var C = $(this).data("menu_width_class");
            0 < $(this).closest(".shopify-section").length && ($(this).closest(".shopify-section").hasClass(C) || $(this).closest(".shopify-section").addClass(C))
        }),
            "menu" == window.fixed_header) {
            var y = $("<div id=\"header-phantom\" class=\"fixed-header-1 sticky-header\"></div>");
            y.insertAfter(".megamenu-background"),
                $(".megamenu-background").clone().appendTo("#header-phantom"),
                roar.fixedMenu(),
                $(window).resize(function () {
                    roar.fixedMenu()
                }),
                $(window).scroll(function () {
                    roar.fixedMenu()
                })
        } else if ("header" == window.fixed_header) {
            var y = $("<div id=\"header-phantom\" class=\"fixed-header-1 sticky-header\"></div>");
            y.insertAfter("#top"),
                $("#top").clone().appendTo("#header-phantom"),
                roar.fixedHeader(),
                $(window).resize(function () {
                    roar.fixedHeader()
                }),
                $(window).scroll(function () {
                    roar.fixedHeader()
                })
        }
        0 < $("#header-phantom .shopify-section").length && $("#header-phantom .shopify-section").each(function () {
            $(this).removeClass("shopify-section")
        })
    },
    fixedHeader: function () {
        var y = $("header #top").first().width();
        $("header #top .background").first().width() != $("header").first().width() && $(".sticky-header").css("background", "none"),
            $(".sticky-header").css("width", y).css("left", "50%").css("right", "auto").css("margin-left", "-" + Math.ceil(y / 2) + "px").css("margin-right", "-" + Math.ceil(y / 2) + "px"),
            1160 <= roar.getWidthBrowser() && 280 < $(window).scrollTop() ? $(".sticky-header").addClass("fixed-header") : $(".sticky-header").removeClass("fixed-header")
    },
    fixedMenu: function () {
        var y = $("header .megamenu-background").first().width();
        $("header #top .background").first().width() != $("header").first().width() && $(".sticky-header").css("background", "none"),
            $(".sticky-header").css("width", y).css("left", "50%").css("right", "auto").css("margin-left", "-" + Math.ceil(y / 2) + "px").css("margin-right", "-" + Math.ceil(y / 2) + "px"),
            1160 <= roar.getWidthBrowser() && 280 < $(window).scrollTop() ? $(".sticky-header").addClass("fixed-header") : $(".sticky-header").removeClass("fixed-header")
    },
    toggleFilter: function () {
        $("#filter-sidebar").on("click", function () {
            $("body").toggleClass("open_filter")
        }),
            $(document).on("click", ".open_filter .spinner", function () {
                $("body").removeClass("open_filter")
            }),
            $("#filter-addtocart").on("click", function () {
                $("#product .add-to-cart").trigger("click")
            })
    },
    searchAutoComplete: function () {
        var y = null;
        $("form[action=\"/search\"]").each(function () {
            var C = "product"
                , S = $(this).find("select[name=\"category_id\"]")
                , I = $(this).find("input[name=\"type\"]");
            0 < S.length && 0 < I.length && $(S).bind("change", function () {
                $(I).val($(this).val()),
                    C = $(this).val()
            });
            var T = $(this).find("input[name=\"q\"]");
            $("<ul class=\"ui-autocomplete ui-front\"></ul>").appendTo($(this).find(".autocomplete-results")).hide(),
                T.attr("autocomplete", "off").bind("keyup change", function () {
                    var P = $(this).val()
                        , z = $(this).closest("form")
                        , A = "/search?type=" + C + "&q=*" + P + "*"
                        , q = z.find(".ui-autocomplete");
                    3 <= P.length && P != $(this).attr("data-old-term") && (T.addClass("ui-autocomplete-loading"),
                        $(this).attr("data-old-term", P),
                        null != y && y.abort(),
                        y = $.getJSON(A + "&view=json", function (M) {
                            T.removeClass("ui-autocomplete-loading"),
                                q.empty(),
                                0 == M.results_count ? q.hide() : ($.each(M.results, function (O, N) {
                                    var E = $("<a></a>").attr("href", N.url);
                                    E.append("<span class=\"thumbnail\"><img src=\"" + N.thumbnail + "\" /></span>"),
                                        E.append("<span class=\"title\">" + N.title + "</span>"),
                                        E.wrap("<li></li>"),
                                        q.append(E.parent())
                                }),
                                    1 < M.results_count && q.append("<li><span class=\"title\"><a href=\"" + A + "\">" + window.all_results_text + " (" + M.results_count + ")</a></span></li>"),
                                    q.fadeIn(200))
                        }))
                })
        }),
            $("body").bind("click", function () {
                $(".ui-autocomplete").hide()
            })
    },
    currenciesCallback: function () {
        try {
            window.show_multiple_currencies && (Currency.format = window.formatCurrency,
                Currency.money_with_currency_format[window.shopCurrency] = window.jsonCurrency,
                Currency.money_format[window.shopCurrency] = window.jsonMoney,
                window.defaultCurrency = window.defaultCurrency || window.shopCurrency,
                window.cookieCurrency = Currency.cookie.read(),
                $("span.money span.money").each(function () {
                    $(this).parents("span.money").removeClass("money")
                }),
                $("span.money").each(function () {
                    $(this).attr("data-currency-" + window.shopCurrency, $(this).html())
                }),
                null == window.cookieCurrency ? (window.shopCurrency === window.defaultCurrency ? Currency.currentCurrency = window.defaultCurrency : Currency.convertAll(window.shopCurrency, window.defaultCurrency),
                    Currency.cookie.write(window.defaultCurrency)) : $(".currencies_src").size() && 0 === $(".currencies_src a[data-value=" + cookieCurrency + "]").size() ? (Currency.currentCurrency = window.shopCurrency,
                        Currency.cookie.write(window.shopCurrency)) : window.cookieCurrency === window.shopCurrency ? Currency.currentCurrency = window.shopCurrency : (Currency.convertAll(window.shopCurrency, window.cookieCurrency),
                            $(".currency_code").html(window.cookieCurrency)),
                $(".currencies_src a").click(function () {
                    var y = $(this).attr("data-value");
                    Currency.convertAll(Currency.currentCurrency, y),
                        $(".currency_code").html(Currency.currentCurrency)
                }))
        } catch (y) {
            console.log(y.message)
        }
    },
    currenciesCallbackSpecial: function (y) {
        try {
            window.show_multiple_currencies && (Currency.format = window.formatCurrency,
                $(y).each(function () {
                    $(this).attr("data-currency-" + window.shopCurrency, $(this).html())
                }),
                Currency.convertAll(window.shopCurrency, Currency.cookie.read(), y, Currency.format))
        } catch (C) {
            console.log(C.message)
        }
    },
    destroyCountdown: function () {
        $.fn.countdown && $(".is-countdown").countdown("destroy")
    },
    initCountdown: function () {
        $.fn.countdown && $(".countdown:not(.is-countdown)").each(function () {
            var y = $(this)
                , C = new Date
                , S = new Date(parseInt(y.data("year")), parseInt(y.data("month")) - 1, y.data("day"));
            S > C ? y.countdown({
                until: S
            }) : y.parent().hide()
        })
    },
    handleCookie: function () {
        function C() {
            try {
                var I = "domain=." + document.domain
                    , z = new Date;
                z.setTime(z.getTime() + 31536e6);
                var A = "; expires=" + z.toGMTString();
                document.cookie = "popup-module-cookie" + "=" + "true" + A + "; path=/; " + I
            } catch (q) {
                console.log(q.message)
            }
        }
        !function () {
            try {
                var I = "popup-module-cookie";
                if (0 < document.cookie.length) {
                    var T = document.cookie.indexOf(I + "=");
                    if (-1 != T) {
                        T = T + I.length + 1;
                        var P = document.cookie.indexOf(";", T);
                        return -1 == P && (P = document.cookie.length),
                            unescape(document.cookie.substring(T, P))
                    }
                }
            } catch (z) {
                console.log(z.message)
            }
        }() && $("#cookie").length && (function () {
            $("#cookie.cookie").length ? $("#cookie").fadeIn("slow") : $("#cookie.popup").length && $.magnificPopup.open({
                items: {
                    src: "#cookie",
                    type: "inline"
                },
                tLoading: "",
                mainClass: "popup-module mfp-with-zoom popup-type-2",
                removalDelay: 200,
                modal: !0
            })
        }(),
            $("#cookie .accept").click(function () {
                C(),
                    $("#cookie.cookie").length ? $("#cookie").fadeOut("slow") : $("#cookie.popup").length && $.magnificPopup.close()
            }))
    },
    handleBlog: function () {
        function y(I) {
            $.ajax({
                url: location.href,
                type: "get",
                dataType: "html",
                data: {
                    page: I
                },
                success: function (T) {
                    "" != $(T).find(".blog-page .empty").html() && $(".pagination-ajax").hide()
                },
                error: function () {
                    $(".pagination-ajax").hide()
                }
            })
        }
        function C() {
            S = $(".posts").masonry({
                itemSelector: ".post"
            }),
                S.imagesLoaded().progress(function () {
                    S.masonry("layout")
                })
        }
        if ($("body").hasClass("templateBlog")) {
            var S = {};
            $(".posts").hasClass("posts-grid") && C(),
                $("#load-more").click(function () {
                    var I = $(this).attr("data-page");
                    $.ajax({
                        url: location.href,
                        type: "get",
                        dataType: "html",
                        data: {
                            page: I
                        },
                        beforeSend: function () {
                            $("#load-more").button("loading")
                        },
                        complete: function () {
                            $("#load-more").button("reset")
                        },
                        success: function (T) {
                            return "" == T ? void $(".pagination-ajax").fadeOut() : ($(".posts").hasClass("posts-grid") ? ($(".posts").append($(T).find(".posts").html()),
                                $(".posts").masonry("reloadItems").masonry({
                                    sortBy: "original-order"
                                }),
                                setTimeout(function () {
                                    $(".posts").masonry("reloadItems").masonry({
                                        sortBy: "original-order"
                                    })
                                }, 500)) : $(".posts").append($(T).find(".posts").html()),
                                $("#load-more").attr("data-page", parseInt(++I)),
                                void y(I))
                        }
                    })
                })
        }
    },
    handleCompare: function () {
        "1" == window.compare && (roar.handleCompareEvent(),
            roar.autoloadCompare(),
            roar.handleCompareScroll())
    },
    handleCompareEvent: function () {
        var y = $("body")
            , C = $("a.add_to_compare");
        y.on("click", "a.add_to_compare", function () {
            var I = $(this)
                , T = I.data("pid")
                , P = ""
                , z = Currency.cookie.rtread("rt-compare");
            if (z = null != z && "" != z ? z.split(",") : [],
                0 > z.indexOf(T) && !1 === $(this).hasClass("added")) {
                z.push(T);
                var A = z.join(",");
                "," == A.substring(0, 1) && (A = A.substring(1)),
                    Currency.cookie.rtwrite("rt-compare", A)
            }
            !1 === $(this).hasClass("added") || "" == P ? (P = "",
                $.ajax({
                    url: "/pages/compare/" + z,
                    dataType: "html",
                    type: "GET",
                    success: function (q) {
                        P = q
                    },
                    error: function () {
                        console.log("ajax error")
                    },
                    complete: function () {
                        $.magnificPopup.open({
                            items: {
                                src: P,
                                type: "inline"
                            },
                            preloader: !0,
                            tLoading: "",
                            mainClass: "quickview compareview",
                            removalDelay: 200,
                            gallery: {
                                enabled: !0
                            },
                            callbacks: {
                                open: function () {
                                    $("[data-pid=\"" + T + "\"]").addClass("added").attr("title", $("[data-pid=\"" + T + "\"]").attr("data-added")),
                                        $("[data-pid=\"" + T + "\"]").find("span").html($("[data-pid=\"" + T + "\"]").attr("data-add")),
                                        window.show_multiple_currencies && roar.currenciesCallbackSpecial(".compare-content span.money"),
                                        roar.handleReviews(),
                                        roar.handleCompareScroll()
                                }
                            }
                        })
                    }
                })) : $.ajax({
                    url: "/pages/compare/" + z,
                    dataType: "html",
                    type: "GET",
                    success: function (q) {
                        P = q
                    },
                    error: function () {
                        console.log("ajax error")
                    },
                    complete: function () {
                        $.magnificPopup.open({
                            items: {
                                src: P,
                                type: "inline"
                            },
                            preloader: !0,
                            tLoading: "",
                            mainClass: "quickview compareview",
                            removalDelay: 200,
                            gallery: {
                                enabled: !0
                            },
                            callbacks: {
                                open: function () {
                                    window.show_multiple_currencies && roar.currenciesCallbackSpecial(".compare-content span.money"),
                                        roar.handleReviews(),
                                        roar.handleCompareScroll()
                                }
                            }
                        })
                    }
                })
        }),
            y.on("click", ".remove_from_compare", function (I) {
                I.preventDefault();
                var T = $(this)
                    , P = T.attr("data-rev")
                    , z = $(".compare-content");
                $("[data-pid=\"" + P + "\"]").removeClass("added").attr("title", $("[data-pid=\"" + P + "\"]").attr("data-add")),
                    $("[data-pid=\"" + P + "\"]").find("span").html($("[data-pid=\"" + P + "\"]").attr("data-add"));
                var A = decodeURI(Currency.cookie.rtread("rt-compare"));
                null != A && (A = A.split(",")),
                    A = jQuery.grep(A, function (q) {
                        return q != P
                    }),
                    A = $.trim(A),
                    Currency.cookie.rtwrite("rt-compare", A),
                    $(".fastor_" + P).remove(),
                    0 >= A.length && $(".mfp-close").trigger("click")
            })
    },
    autoloadCompare: function () {
        if (0 != parseInt(theme.compare)) {
            var y = Currency.cookie.rtread("rt-compare");
            null == y ? y = [] : (y = y.split(","),
                y.map(function (C) {
                    $("[data-pid=\"" + C + "\"]").addClass("added").attr("title", $("[data-pid=\"" + C + "\"]").attr("data-added")),
                        $("[data-pid=\"" + C + "\"]").find("span").html($("[data-pid=\"" + C + "\"]").attr("data-added"))
                }))
        }
    },
    handleCompareScroll: function () {
        jQuery("#be_compare_features_table").on("scroll", function () {
            var y = jQuery(this).parent();
            jQuery(this).scrollLeft() + jQuery(this).innerWidth() >= jQuery(this)[0].scrollWidth ? y.hasClass("scroll-right") && y.removeClass("scroll-right") : 0 === jQuery(this).scrollLeft() ? y.hasClass("scroll-left") && y.removeClass("scroll-left") : (!y.hasClass("scroll-right") && y.addClass("scroll-right"),
                !y.hasClass("scroll-left") && y.addClass("scroll-left"))
        }),
            be_compare_container = document.getElementById("be_compare_features_table"),
            null !== be_compare_container && be_compare_container.offsetWidth < be_compare_container.scrollWidth && !jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").addClass("scroll-right"),
            jQuery(window).on("resize", function () {
                roar.be_compare_products_table_shadows()
            }),
            jQuery("#be_compare_features_table_inner").hasClass("scroll-left") || jQuery("#be_compare_features_table_inner").hasClass("scroll-right") ? $(".compareview").addClass("no-flex") : $(".compareview").removeClass("no-flex")
    },
    be_compare_products_table_shadows: function () {
        be_compare_container = document.getElementById("be_compare_features_table");
        null === be_compare_container || (be_compare_container.offsetWidth < be_compare_container.scrollWidth ? !jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").addClass("scroll-right") : (jQuery("#be_compare_features_table_inner").hasClass("scroll-right") && jQuery("#be_compare_features_table_inner").removeClass("scroll-right"),
            jQuery("#be_compare_features_table_inner").hasClass("scroll-left") && jQuery("#be_compare_features_table_inner").removeClass("scroll-left")),
            jQuery("#be_compare_features_table_inner").hasClass("scroll-left") || jQuery("#be_compare_features_table_inner").hasClass("scroll-right") ? $(".compareview").addClass("no-flex") : $(".compareview").removeClass("no-flex"))
    },
    removeToWishlist: function () {
        $(document).on("click", ".remove-wishlist", function (y) {
            y.preventDefault();
            var C = $(this)
                , S = C.closest("form")
                , I = {
                    action: "remove_wishlist"
                };
            return I = S.serialize() + "&" + $.param(I),
                $.ajax({
                    type: "POST",
                    url: "/a/wishlist",
                    async: !0,
                    cache: !1,
                    data: I,
                    dataType: "json",
                    beforeSend: function () {
                        $(".page-wishlist").addClass("is_loading")
                    },
                    error: function (T) {
                        console.log(T),
                            $(".page-wishlist").removeClass("is_loading")
                    },
                    success: function (T) {
                        1 == T.code ? C.closest(".item").slideUp("fast", function () {
                            C.closest(".item").remove(),
                                $(".page-wishlist .infos").removeClass("hide"),
                                $(".wishlist_items_number").text(T.json),
                                0 == T.json && $(".wishlist-empty").removeClass("hide")
                        }) : (alert(T.json),
                            console.log(T.json)),
                            $(".page-wishlist").removeClass("is_loading")
                    }
                }),
                !1
        })
    },
    addToWishlist: function () {
        $(document).on("click", ".add-to-wishlist:not(.added)", function () {
            if ($(this).hasClass("need-login")) {
                var C = $("#wishlist_error").html();
                return $.notify({
                    message: C,
                    target: "_blank"
                }, {
                        type: "info",
                        showProgressbar: !0,
                        z_index: 2031,
                        mouse_over: "pause",
                        placement: {
                            from: "top",
                            align: window.rtl ? "left" : "right"
                        }
                    }),
                    !1
            }
            var S = $(this)
                , I = S.closest("form")
                , T = {
                    action: "add_wishlist"
                };
            return T = I.serialize() + "&" + $.param(T),
                $.ajax({
                    type: "POST",
                    url: "/a/wishlist",
                    async: !0,
                    cache: !1,
                    data: T,
                    dataType: "json",
                    beforeSend: function () {
                        S.hasClass("btooltip") ? S.addClass("loading") : S.attr("title", S.attr("data-loading-text")).find("span").text(S.attr("data-loading-text"))
                    },
                    complete: function () {
                        S.hasClass("btooltip") && S.removeClass("loading"),
                            $(".wishlist" + S.prev().val()).attr("title", S.attr("data-added")).addClass("added").find("span").text(S.attr("data-added"))
                    },
                    error: function (P) {
                        var z = i = $.parseJSON(P.responseText)
                            , A = z.message + ": " + z.description;
                        $.notify({
                            message: A,
                            target: "_blank"
                        }, {
                                type: "info",
                                showProgressbar: !0,
                                z_index: 2031,
                                mouse_over: "pause",
                                placement: {
                                    from: "top",
                                    align: window.rtl ? "left" : "right"
                                }
                            })
                    },
                    success: function () {
                        var P = S.closest(".product")
                            , z = [{
                                product_url: P.find(".name a").attr("href"),
                                product_name: P.find(".name a").text()
                            }];
                        $.notify({
                            message: $("<div>").append($("#wishlist_success").tmpl(z).clone()).html(),
                            target: "_blank"
                        }, {
                                type: "success",
                                showProgressbar: !0,
                                z_index: 2031,
                                mouse_over: "pause",
                                placement: {
                                    from: "top",
                                    align: window.rtl ? "left" : "right"
                                }
                            })
                    }
                }),
                !1
        })
    },
    addToCart: function () {
        window.shopping_cart_ajax && $(document).on("click", ".add-to-cart", function () {
            var y = $(this)
                , C = y.closest("form");
            return $.ajax({
                type: "POST",
                url: "/cart/add.js",
                async: !0,
                cache: !1,
                data: C.serialize(),
                dataType: "json",
                beforeSend: function () {
                    y.hasClass("btooltip") ? y.addClass("loading") : y.button("loading") && $("#filter-addtocart span").text(y.attr("data-loading-text")) && $("#filter-addtocart").addClass("active")
                },
                complete: function () {
                    y.hasClass("btooltip") ? y.removeClass("loading") : y.button("reset") && $("#filter-addtocart").removeClass("active")
                },
                error: function (S) {
                    var I = i = $.parseJSON(S.responseText)
                        , T = I.message + ": " + I.description;
                    $.notify({
                        message: T,
                        target: "_blank"
                    }, {
                            type: "info",
                            showProgressbar: !0,
                            z_index: 2031,
                            mouse_over: "pause",
                            placement: {
                                from: "top",
                                align: window.rtl ? "left" : "right"
                            }
                        })
                },
                success: function (S) {
                    var I = [{
                        product_url: S.url,
                        product_name: S.title
                    }];
                    $.notify({
                        message: $("<div>").append($("#cart_success").tmpl(I).clone()).html(),
                        target: "_blank"
                    }, {
                            type: "success",
                            showProgressbar: !0,
                            z_index: 2031,
                            mouse_over: "pause",
                            placement: {
                                from: "top",
                                align: window.rtl ? "left" : "right"
                            }
                        }),
                        Shopify.getCart(function (T) {
                            Shopify.updateCartInfo(T, ".cart_content_ajax")
                        })
                }
            }),
                !1
        })
    },
    handlePopups: function () {
        function y() {
            if (0 == window.popup_mailchimp_expire ? $("#popup-mailchimp .dont-show-me").change(function () {
                $(this).is(":checked") ? C() : S()
            }) : 1 == window.popup_mailchimp_expire && S(),
                !I()) {
                var T = parseInt(window.popup_mailchimp_delay, 20)
                    , P = parseInt(window.popup_mailchimp_close, 20);
                setTimeout(function () {
                    $.magnificPopup.open({
                        items: {
                            src: "#popup-mailchimp",
                            type: "inline"
                        },
                        tLoading: "",
                        mainClass: "popup-module mfp-with-zoom popup-type-1",
                        removalDelay: 200
                    }),
                        0 < P && setTimeout(function () {
                            $.magnificPopup.close()
                        }, P)
                }, T),
                    2 == window.popup_mailchimp_expire && C()
            }
            var z = $("#mc-form")
                , A = z.attr("action");
            z.ajaxChimp({
                url: A,
                callback: function () { }
            })
        }
        function C() {
            try {
                var T = parseInt(window.popup_mailchimp_period);
                0 >= T && (T = 1);
                var P = "domain=." + document.domain
                    , q = new Date;
                q.setTime(q.getTime() + 1e3 * (60 * (60 * (24 * T))));
                var M = "; expires=" + q.toGMTString();
                document.cookie = "popup-module-mailchimp" + "=" + "true" + M + "; path=/; " + P
            } catch (O) {
                console.log(O.message)
            }
        }
        function S() {
            try {
                var T = "domain=." + document.domain;
                document.cookie = "popup-module-mailchimp=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; " + T
            } catch (P) {
                console.log(P.message)
            }
        }
        function I() {
            try {
                var T = "popup-module-mailchimp";
                if (0 < document.cookie.length) {
                    var P = document.cookie.indexOf(T + "=");
                    if (-1 != P) {
                        P = P + T.length + 1;
                        var z = document.cookie.indexOf(";", P);
                        return -1 == z && (z = document.cookie.length),
                            unescape(document.cookie.substring(P, z))
                    }
                }
            } catch (A) {
                console.log(A.message)
            }
        }
        $("#popup-mailchimp").length && ($("#popup-mailchimp").hasClass("hidden-xs") ? 768 <= roar.getWidthBrowser() && y() : y())
    },
    handleVerticalMenu: function () {
        $(".category_trigger").click(function () {
            (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) && ($(".shop_category").hasClass("is_open") ? ($(".shop_category").removeClass("is_open"),
                $(".shop_category .submenu-group").slideUp()) : ($(".shop_category").addClass("is_open"),
                    $(".shop_category .submenu-group").slideDown()))
        }),
            $(".shop_category .has-children>span>.fa").click(function () {
                var y = $(this).closest(".menu-item")
                    , C = y.find(".submenu");
                (768 > roar.getWidthBrowser() || $("html").hasClass("touch")) && (y.hasClass("is_open") ? (y.removeClass("is_open"),
                    C.slideUp()) : (y.addClass("is_open"),
                        C.slideDown()))
            })
    },
    handleQuickshop: function () {
        var y = "";
        return $(".quickview .quick_view").magnificPopup({
            type: "ajax",
            preloader: !0,
            tLoading: "",
            mainClass: "quickview",
            removalDelay: 200,
            gallery: {
                enabled: !1
            },
            callbacks: {
                open: function () {
                    0 < $("#main").next(".product-360-view-wrapper").length && $("#main").next(".product-360-view-wrapper").remove()
                },
                ajaxContentAdded: function () {
                    roar.handleReviews();
                    var C = new theme.Sections;
                    C.register("product-quickview-template", theme.Product),
                        roar.initCountdown(),
                        window.show_multiple_currencies && roar.currenciesCallback("#ProductSection-product-quickview-template .money");
                    var S = $(".quickview").find(".add-to-wishlist");
                    S.attr("title", S.attr("data-added")).addClass("added").find("span").text(S.attr("data-added"))
                },
                beforeClose: function () {
                    0 < $(".quickview._reopen").length && "" != $(".quickview._reopen").data("_qid") && (y = $(".quickview._reopen").data("_qid"))
                },
                afterClose: function () {
                    console.log(y),
                        "" != y && ($(y).trigger("click"),
                            y = "")
                }
            }
        }),
            !1
    },
    mapClearFilter: function () {
        $(".mfilter-box .column").each(function () {
            var y = $(this);
            0 < y.find("input:checked").length && y.find(".clear").on("click", function (C) {
                var S = [];
                Shopify.queryParams.constraint && (S = Shopify.queryParams.constraint.split("+")),
                    y.find("input:checked").each(function () {
                        var I = $(this)
                            , T = I.val();
                        if (T) {
                            var P = S.indexOf(T);
                            0 <= P && S.splice(P, 1)
                        }
                    }),
                    S.length ? Shopify.queryParams.constraint = S.join("+") : delete Shopify.queryParams.constraint,
                    roar.filterAjaxClick(),
                    C.preventDefault()
            })
        })
    },
    mapSingleFilter: function () {
        $("body").on("change", ".advanced-filter .field:not(.disable) input", function () {
            var y = $(this).parent()
                , C = $(this).val()
                , S = [];
            if (Shopify.queryParams.constraint && (S = Shopify.queryParams.constraint.split("+")),
                !window.enable_filter_multiple_choice && !y.hasClass("active")) {
                var I = y.parents(".advanced-filter").find(".active");
                0 < I.length && I.each(function () {
                    var P = $(this).data("handle");
                    if ($(this).removeClass("active"),
                        P) {
                        var z = S.indexOf(P);
                        0 <= z && S.splice(z, 1)
                    }
                })
            }
            if (C) {
                var T = S.indexOf(C);
                0 > T ? (S.push(C),
                    y.addClass("active")) : (S.splice(T, 1),
                        y.removeClass("active"))
            }
            S.length ? Shopify.queryParams.constraint = S.join("+") : delete Shopify.queryParams.constraint,
                roar.filterAjaxClick()
        })
    },
    mapSingleCollection: function () {
        $("body").on("click", ".advanced-collection .field", function (y) {
            var C = $(this)
                , S = C.attr("href");
            C.hasClass("active") || (roar.filterAjaxClick(S),
                $(".advanced-collection .field").removeClass("active"),
                C.addClass("active"),
                y.preventDefault())
        })
    },
    mapSingleSort: function () {
        $("body").on("change", ".advanced-sortby .field", function (y) {
            var C = $(this)
                , S = C.val();
            Shopify.queryParams.sort_by = S,
                roar.filterAjaxClick(),
                y.preventDefault()
        })
    },
    mapSingleLimit: function () {
        $("body").on("change", ".advanced-limit .field", function (y) {
            var C = $(this)
                , S = C.val();
            Shopify.queryParams.view = S,
                roar.filterAjaxClick(),
                y.preventDefault()
        })
    },
    mapSinglePagination: function () {
        $("body").on("click", "#mfilter-content-container .advanced-pagination a", function (y) {
            var C = $(this);
            delete Shopify.queryParams.page,
                delete Shopify.queryParams.constraint,
                delete Shopify.queryParams.q,
                delete Shopify.queryParams.sort_by,
                roar.filterAjaxClickPaging(C.attr("href")),
                y.preventDefault()
        })
    },
    mapFilters: function () {
        roar.handleGridList(),
            roar.mapSingleFilter(),
            roar.mapSingleCollection(),
            roar.mapSingleSort(),
            roar.mapSingleLimit(),
            roar.mapSinglePagination(),
            roar.mapClearFilter()
    },
    filterCreateUrl: function (y) {
        var C = $.param(Shopify.queryParams).replace(/%2B/g, "+");
        return y ? "" == C ? y : y + "?" + C : location.pathname + "?" + C
    },
    updateQueryStringParameter: function (y, C, S) {
        var I = new RegExp("([?&])" + C + "=.*?(&|$)", "i")
            , T = -1 === y.indexOf("?") ? "?" : "&";
        return y.match(I) ? y.replace(I, "$1" + C + "=" + S + "$2") : y + T + C + "=" + S
    },
    filterCreateUrlPaging: function (y) {
        var C = 1
            , S = y.split("page=");
        return 1 < S.length && (C = parseInt(S[1])),
            roar.updateQueryStringParameter(window.location.href, "page", C)
    },
    filterAjaxClick: function (y) {
        delete Shopify.queryParams.page;
        var C = roar.filterCreateUrl(y);
        roar.filterGetContent(C)
    },
    filterAjaxClickPaging: function (y) {
        delete Shopify.queryParams.page;
        var C = roar.filterCreateUrlPaging(y);
        roar.filterGetContent(C)
    },
    filterGetContent: function (y) {
        $.ajax({
            type: "get",
            url: y,
            beforeSend: function () {
                roar.destroyCountdown(),
                    $("body").addClass("is_loading").removeClass("open_filter")
            },
            success: function (C) {
                var S = C.match("<title>(.*?)</title>")[1];
                $(C).find(".breadcrumb-content").length && $(".breadcrumb-content").html($(C).find(".breadcrumb-content").html()),
                    $(".category-info").remove(),
                    $(C).find(".category-info").length && $("#mfilter-content-container").prepend($(C).find(".category-info")),
                    $(".advanced-collection").empty().html($(C).find(".advanced-collection").html()),
                    $("#sandbox").empty().html($(C).find("#sandbox").html()),
                    $(".mfilter-box .mfilter-content").empty().html($(C).find(".mfilter-box .mfilter-content").html()),
                    $("#mfilter-content-container .advanced-pagination").empty().html($(C).find("#mfilter-content-container .advanced-pagination").html()),
                    $(".page-top").empty().html($(C).find(".page-top").html()),
                    $(".infinite_scoll").length && $(C).find(".infinite_scoll").length && $(".infinite_scoll").removeClass("invisible").empty().html($(C).find(".infinite_scoll").html()),
                    History.pushState({
                        param: Shopify.queryParams
                    }, S, y),
                    setTimeout(function () {
                        $("html,body").animate({
                            scrollTop: $("body #sandbox").offset().top
                        }, 500, "swing")
                    }, 100),
                    $("body").removeClass("is_loading"),
                    roar.mapClearFilter(),
                    roar.handleReviews(),
                    roar.initCountdown(),
                    window.show_multiple_currencies && roar.currenciesCallback("#sandbox span.money")
            },
            error: function () {
                $("body").removeClass("is_loading")
            }
        })
    },
    handleReviews: function () {
        "undefined" != typeof SPR && (SPR.registerCallbacks(),
            SPR.initRatingHandler(),
            SPR.initDomEls(),
            SPR.loadProducts(),
            SPR.loadBadges())
    },
    htmlEntities: function (y) {
        return (y + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    },
    createVariantsSwatch: function (y, C) {
        var S = [];
        if (window.swatch_size && S.push("Size"),
            window.swatch_color && (S.push("Color"),
                S.push("Colour")),
            0 < S.length) {
            var I = !1
                , T = !1
                , P = 0
                , z = window.asset_url.substring(0, window.asset_url.lastIndexOf("?"))
                , A = window.asset_url.substring(window.asset_url.lastIndexOf("?"), window.asset_url.length);
            for (i = 0; i < y.options.length; i++) {
                var q = "";
                if (q = "object" == typeof y.options[i] ? y.options[i].name : y.options[i],
                    I = !1,
                    T = !1,
                    -1 < S.indexOf(q)) {
                    I = !0,
                        P = i;
                    var M = q.toLowerCase();
                    if (/color|colour/i.test(M) && (T = !0),
                        I) {
                        var O = ""
                            , N = "";
                        /size/i.test(q.toLowerCase()) && window.size_chart && (N = "<a id=\"size_chart_trigger\" href=\"#\" class=\"sizechart-ctl\" data-ctl-toggle=\"#sizechart-ctl\">" + window.size_chart_txt + "</a>"),
                            O += "<div class=\"swatch " + M + " clearfix\" data-option-index=\"" + P + "\">",
                            O += "<div class=\"header\"><span>" + q + "</span>" + N + "</div><div>";
                        var E = [];
                        for (j = 0; j < y.variants.length; j++) {
                            var B = y.variants[j]
                                , U = roar.htmlEntities(B.options[P])
                                , W = roar.convertToSlug(U)
                                , D = "swatch-" + P + "-" + W;
                            0 > E.indexOf(U) && (O += "<div data-value=\"" + U + "\" class=\"swatch-element " + (T ? "color" : "") + W + (B.available ? " available " : " soldout ") + "\">",
                                T && (O += "<div class=\"tooltip\">" + U + "</div>"),
                                O += "<input id=\"" + D + "\" type=\"radio\" name=\"option-" + P + "\" value=\"" + U + "\"" + (0 == j ? " checked " : "") + (B.available ? "" : " disabled") + "/>",
                                T ? (O += "<label for=\"" + D + "\" class=\"img btooltip\" title=\"" + U + "\"><i style=\"background-color:" + W + "; background-image: url(" + z + W + ".png" + A + ")\">",
                                    O += "<img class=\"crossed-out\" src=\"" + z + "soldout.png\" />",
                                    O += "</i></label>") : (O += "<label for=\"" + D + "\">" + U,
                                        O += "<img class=\"crossed-out\" src=\"" + z + "soldout.png\" />",
                                        O += "</label>"),
                                O += "</div>",
                                E.push(U))
                        }
                        O += "</div></div>",
                            C.find("#product-variants > select").after(O),
                            C.find(".swatch :radio").change(function () {
                                var F = $(this).closest(".swatch").attr("data-option-index")
                                    , H = $(this).val();
                                $(this).closest("form").find(".single-option-selector").eq(F).val(H).trigger("change")
                            })
                    }
                }
            }
        }
    },
    convertToSlug: function (y) {
        return y.toLowerCase().replace(/[^\w\u00C0-\u024f]+/g, "-").replace(/^-+|-+$/g, "")
    },
    getWidthBrowser: function () {
        var y;
        return "number" == typeof window.innerWidth ? y = window.innerWidth : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? y = document.documentElement.clientWidth : document.body && (document.body.clientWidth || document.body.clientHeight) && (y = document.body.clientWidth),
            y
    },
    handleScrollToTop: function () {
        function y(C) {
            var S = $("#scroll-top");
            S.removeClass("off on"),
                S.addClass("on" == C ? "on" : "off")
        }
        $(window).scroll(function () {
            var C = $(this).scrollTop()
                , S = $(this).height();
            if (0 < C)
                var I = C + S / 2;
            else
                var I = 1;
            y(1e3 > I ? "off" : "on")
        }),
            $("#scroll-top").click(function (C) {
                C.preventDefault(),
                    $("html,body").animate({
                        scrollTop: 0
                    }, 800, "swing")
            })
    },
    handleGMap: function () {
        $("#contact_map").length && $().gMap && $("#contact_map").gMap({
            zoom: 17,
            scrollwheel: !1,
            maptype: "ROADMAP",
            markers: [{
                address: window.contact_map_address,
                html: "_address",
                icon: {
                    iconsize: [188, 68],
                    iconanchor: [0, 68]
                }
            }]
        })
    },
    handleGridList: function () {
        function y(I) {
            try {
                if ("list" == I) {
                    var T = $("#mfilter-content-container");
                    T.hasClass(I) || (T.removeClass("grid"),
                        T.addClass(I),
                        localStorage.setItem("display", I))
                } else {
                    var T = $("#mfilter-content-container");
                    T.hasClass(I) || (T.removeClass("list"),
                        T.addClass(I),
                        localStorage.setItem("display", I))
                }
            } catch (P) {
                console.log(P.message)
            }
        }
        $(document).on("click", "#grid", function () {
            y("grid")
        }),
            $(document).on("click", "#list", function () {
                y("list")
            });
        try {
            var C = localStorage.getItem("display");
            if (null != C)
                y("list" == C ? "list" : "grid");
            else {
                var S = "";
                $("#mfilter-content-container").hasClass("list") ? S = "list" : $("#mfilter-content-container").hasClass("grid") && (S = "grid"),
                    y("list" == S ? "list" : "grid")
            }
        } catch (I) {
            console.log(I.message)
        }
    },
    handleSearch: function () {
        $(".button-search, .header-type-3 #top .search_form, .header-type-8 .search_form").bind("click", function () {
            $(this).closest("form").submit()
        })
    },
    handleSmoothScroll: function () {
        $(document).on("click", ".smoothscroll", function (y) {
            y.preventDefault();
            var C = $(this).attr("href");
            $(C).trigger("click"),
                setTimeout(function () {
                    $("html,body").animate({
                        scrollTop: $(C).offset().top - 100
                    }, 800, "swing")
                }, 300)
        })
    },
    handleOrder: function () {
        $(".orderable").each(function (y, C) {
            var S = $(C).children("div[data-order]");
            S.sort(function (I, T) {
                return +$(I).data("order") - +$(T).data("order")
            }),
                S.appendTo(C)
        })
    },
    handleDropdown: function () {
        $("[data-toggle='dropdown']").on("click", function () {
            $(this).parent().toggleClass("open")
        })
    }
}
    , roarLookbook = {
        getSizedImageUrl: function (y, C) {
            var S = document.createElement("a");
            if (S.href = y,
                "cdn.shopify.com" != S.hostname)
                return y;
            if (null == C)
                return y;
            if ("master" == C)
                return roarLookbook.removeProtocol(y);
            var I = y.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
            if (null != I) {
                var S = y.split(I[0])
                    , T = I[0];
                return roarLookbook.removeProtocol(S[0] + "_" + C + T)
            }
            return null
        },
        removeProtocol: function (y) {
            return y.replace(/http(s)?:/, "")
        },
        isProductUrl: function (y) {
            var C = window.location.hostname
                , S = document.createElement("a");
            return S.href = y,
                console.log(C),
                console.log(S.hostname),
                S.hostname == C
        },
        buildLookbook: function () {
            $(".roarlookbook").each(function (y) {
                var C = $(this);
                if (!C.hasClass("roarlookbook_init")) {
                    var S = C.attr("data-lookbook")
                        , I = {
                            lookbook: S,
                            action: "lookbook_get"
                        };
                    I = $.param(I),
                        $.ajax({
                            type: "POST",
                            url: "/apps/roarlookbook",
                            async: !0,
                            cache: !1,
                            data: I,
                            dataType: "json",
                            beforeSend: function () { },
                            error: function () { },
                            success: function (T) {
                                C.append(T);
                                var P = C.find(".media__blank-preview");
                                P.imagesLoaded(function () {
                                    C.addClass("roarlookbook_init").attr("data-lookbook", S + y),
                                        P.addClass("sfx-fadeIn")
                                })
                            }
                        })
                }
            })
        },
        resetHotspots: function (y) {
            var C = $(".hotspot", y)
                , S = y.attr("data-lookbook");
            C.each(function () {
                var I = $(this)
                    , T = I.attr("data-id")
                    , P = $("#" + S + "-" + T, y);
                P.fadeOut("fast", function () {
                    P.remove(),
                        I.removeClass("hotspot_init")
                })
            })
        },
        hotspotPopup: function () {
            $(".roarlookbook").on("click", ".hotspot", function () {
                var C = $(this);
                if (!C.hasClass("hotspot_init")) {
                    var S = C.closest(".roarlookbook")
                        , I = C.attr("data-id")
                        , T = C.closest(".roarlookbook").attr("data-lookbook") + "-" + I
                        , P = "#" + C.closest(".roarlookbook").attr("data-lookbook") + "-" + I
                        , z = C.attr("data-title")
                        , A = C.attr("data-image")
                        , q = C.attr("data-price")
                        , M = C.attr("data-url")
                        , O = "";
                    if ("" == z && "" == M)
                        return !1;
                    if (roarLookbook.resetHotspots(S),
                        O += "<div id=\"" + T + "\" class=\"hotspot-widget hotspot-loading\">",
                        O += "<div class=\"hotspot-content\">",
                        O += "<span class=\"hotspot-close\">\xD7</span>",
                        O += "<div class=\"hotspot-inner\">",
                        "" != A) {
                        var N = "<img src=\"" + roarLookbook.getSizedImageUrl(A, "80x") + "\" src=\"" + roarLookbook.getSizedImageUrl(A, "300x") + "\" data-srcset=\"" + roarLookbook.getSizedImageUrl(A, "300x") + " 1x, " + roarLookbook.getSizedImageUrl(A, "600x") + " 2x\" alt=\"\" />";
                        O += "" == M ? N : "<a href=\"" + M + "\">" + N + "</a>"
                    }
                    if ("" != z && (O += "<h3>",
                        O += "" == M ? z : "<a href=\"" + M + "\">" + z + "</a>",
                        O += "</h3>"),
                        "" != q && (O += "<div class=\"price\"><span class=\"money\">" + q + "</span></div>",
                            roarLookbook.isProductUrl(M) && (O += "<div class=\"hotspot-btns\">",
                                O += "<div class=\"hotspot-btn\"><a href=\"" + M + "\">" + theme.apps.details + "</a></div>",
                                O += "<div class=\"hotspot-btn\"><a class=\"roar_add_to_cart\" href=\"" + M + "?add-to-cart=true\">" + theme.apps.buyNow + "</a></div>",
                                O += "</div>")),
                        O += "</div>",
                        O += "</div>",
                        O += "</div>",
                        $(P).length || S.append(O),
                        $(P).imagesLoaded(function () {
                            var B = $(P)
                                , U = C.offset().left
                                , W = C.offset().top
                                , D = B.outerWidth()
                                , F = B.outerHeight()
                                , H = S.offset().left
                                , L = S.offset().top
                                , V = S.outerWidth() - (U + D)
                                , G = "hotspot-right";
                            50 > V ? (U = U - D - 5,
                                G = "hotspot-left") : U = U + C.outerWidth() + 5,
                                W = W + C.outerHeight() / 2 - F / 2,
                                B.css({
                                    left: U - H,
                                    top: W - L
                                }).removeClass("hotspot-left").removeClass("hotspot-right").addClass(G),
                                C.addClass("hotspot_init"),
                                B.removeClass("hotspot-loading").fadeIn("fast")
                        }),
                        $(P).find("img").length) {
                        var E = $(P).find("img");
                        E.attr("src", E.attr("data-src")).removeAttr("data-src").attr("srcset", E.attr("data-srcset")).removeAttr("data-srcset")
                    }
                } else {
                    var S = C.closest(".roarlookbook");
                    roarLookbook.resetHotspots(S)
                }
            }),
                $(document).on("click", ".hotspot-close", function () {
                    var C = $(this)
                        , S = C.closest(".hotspot-widget")
                        , I = S.attr("id")
                        , T = I.split("-")
                        , P = T[1];
                    $(".roarlookbook .hotspot[data-id=\"" + P + "\"]").removeClass("hotspot_init"),
                        S.fadeOut("fast", function () {
                            S.remove()
                        })
                }),
                $(".roarlookbook").on("click", ".image-preview", function () {
                    var C = $(this).closest(".roarlookbook");
                    roarLookbook.resetHotspots(C)
                }),
                $(window).resize(function () {
                    $(".roarlookbook .hotspot_init").length && $(".roarlookbook .hotspot_init").each(function () {
                        var C = $(this);
                        C.removeClass("hotspot_init").trigger("click")
                    })
                })
        },
        addToCart: function () {
            $(document).on("click", ".roar_add_to_cart", function (y) {
                y.preventDefault();
                var C = $(this)
                    , S = C.closest(".roarlookbook")
                    , I = C.attr("href");
                $.ajax({
                    type: "GET",
                    url: I,
                    beforeSend: function () { },
                    success: function (T) {
                        var P = $(T).find("form[action=\"/cart/add\"]");
                        P.appendTo(S).submit().remove()
                    },
                    dataType: "html"
                })
            })
        },
        init: function () {
            $(".roarlookbook").length && (roarLookbook.buildLookbook(),
                roarLookbook.hotspotPopup(),
                roarLookbook.addToCart())
        }
    };
window.theme = window.theme || {},
    theme.Sections = function () {
        this.constructors = {},
            this.instances = [],
            $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
    }
    ,
    theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
        _createInstance: function (y, C) {
            var S = $(y)
                , I = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            if (C = C || this.constructors[T],
                !_.isUndefined(C)) {
                var P = _.assignIn(new C(y), {
                    id: I,
                    type: T,
                    container: y
                });
                this.instances.push(P)
            }
        },
        _onSectionLoad: function (y) {
            var C = $("[data-section-id]", y.target)[0];
            C && this._createInstance(C)
        },
        _onSectionUnload: function (y) {
            this.instances = _.filter(this.instances, function (C) {
                var S = C.id === y.originalEvent.detail.sectionId;
                return S && _.isFunction(C.onUnload) && C.onUnload(y),
                    !S
            })
        },
        _onSelect: function (y) {
            var C = _.find(this.instances, function (S) {
                return S.id === y.originalEvent.detail.sectionId
            });
            !_.isUndefined(C) && _.isFunction(C.onSelect) && C.onSelect(y)
        },
        _onDeselect: function (y) {
            var C = _.find(this.instances, function (S) {
                return S.id === y.originalEvent.detail.sectionId
            });
            !_.isUndefined(C) && _.isFunction(C.onDeselect) && C.onDeselect(y)
        },
        _onBlockSelect: function (y) {
            var C = _.find(this.instances, function (S) {
                return S.id === y.originalEvent.detail.sectionId
            });
            !_.isUndefined(C) && _.isFunction(C.onBlockSelect) && C.onBlockSelect(y)
        },
        _onBlockDeselect: function (y) {
            var C = _.find(this.instances, function (S) {
                return S.id === y.originalEvent.detail.sectionId
            });
            !_.isUndefined(C) && _.isFunction(C.onBlockDeselect) && C.onBlockDeselect(y)
        },
        register: function (y, C) {
            this.constructors[y] = C,
                $("[data-section-type=" + y + "]").each(function (S, I) {
                    this._createInstance(I, C)
                }
                    .bind(this))
        }
    }),
    window.slate = window.slate || {},
    theme.Images = function () {
        return {
            preload: function (z, A) {
                "string" == typeof z && (z = [z]);
                for (var M, q = 0; q < z.length; q++)
                    M = z[q],
                        this.loadImage(this.getSizedImageUrl(M, A))
            },
            loadImage: function (z) {
                new Image().src = z
            },
            switchImage: function (z, A, q) {
                var M = this.imageSize(A.src)
                    , O = this.getSizedImageUrl(z.src, M);
                q ? q(O, z, A) : A.src = O
            },
            imageSize: function (z) {
                var A = z.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
                return null === A ? null : A[1]
            },
            getSizedImageUrl: function (z, A) {
                if (null == A)
                    return z;
                if ("master" === A)
                    return this.removeProtocol(z);
                var q = z.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
                if (null != q) {
                    var M = z.split(q[0])
                        , O = q[0];
                    return this.removeProtocol(M[0] + "_" + A + O)
                }
                return null
            },
            removeProtocol: function (z) {
                return z.replace(/http(s)?:/, "")
            }
        }
    }(),
    slate.Variants = function () {
        function y(C) {
            this.$container = C.$container,
                this.product = C.product,
                this.singleOptionSelector = C.singleOptionSelector,
                this.originalSelectorId = C.originalSelectorId,
                this.enableHistoryState = C.enableHistoryState,
                this.currentVariant = this._getVariantFromOptions(),
                $(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this))
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _getCurrentOptions: function () {
                var C = _.map($(this.singleOptionSelector, this.$container), function (S) {
                    var I = $(S)
                        , T = I.attr("type")
                        , P = {};
                    return "radio" === T || "checkbox" === T ? !!I[0].checked && (P.value = I.val(),
                        P.index = I.data("index"),
                        P) : (P.value = I.val(),
                            P.index = I.data("index"),
                            P)
                });
                return C = _.compact(C),
                    C
            },
            _getVariantFromOptions: function () {
                var C = this._getCurrentOptions()
                    , S = this.product.variants
                    , I = _.find(S, function (T) {
                        return C.every(function (P) {
                            return _.isEqual(T[P.index], P.value)
                        })
                    });
                return I
            },
            _onSelectChange: function () {
                var C = this._getVariantFromOptions();
                this.$container.trigger({
                    type: "variantChange",
                    variant: C
                }),
                    C && (this._updateMasterSelect(C),
                        this._updateImages(C),
                        this._updatePrice(C),
                        this._updateSKU(C),
                        this.currentVariant = C,
                        this.enableHistoryState && this._updateHistoryState(C))
            },
            _updateImages: function (C) {
                var S = C.featured_image || {}
                    , I = this.currentVariant.featured_image || {};
                C.featured_image && S.src !== I.src && this.$container.trigger({
                    type: "variantImageChange",
                    variant: C
                })
            },
            _updatePrice: function (C) {
                C.price === this.currentVariant.price && C.compare_at_price === this.currentVariant.compare_at_price || this.$container.trigger({
                    type: "variantPriceChange",
                    variant: C
                })
            },
            _updateSKU: function (C) {
                C.sku === this.currentVariant.sku || this.$container.trigger({
                    type: "variantSKUChange",
                    variant: C
                })
            },
            _updateHistoryState: function (C) {
                if (history.replaceState && C) {
                    var S = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + C.id;
                    window.history.replaceState({
                        path: S
                    }, "", S)
                }
            },
            _updateMasterSelect: function (C) {
                $(this.originalSelectorId, this.$container).val(C.id)
            }
        }),
            y
    }(),
    window.theme = window.theme || {},
    theme.Product = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.settings = {
                imageSize: null,
                namespace: ".product-page-section",
                sectionId: I,
                sliderActive: !1,
                swatch_color: S.attr("data-product_swatch_color"),
                swatch_size: S.attr("data-product_swatch_size"),
                product_design: S.attr("data-product_design")
            },
                this.selectors = {
                    product: "#ProductSection-" + I,
                    addToCart: "#AddToCart-" + I,
                    addToCartText: "#AddToCartText-" + I,
                    stockText: ".stock-" + I,
                    comparePrice: "#ComparePrice-" + I,
                    originalPrice: "#ProductPrice-" + I,
                    SKU: ".variant-sku",
                    originalPriceWrapper: ".product-price__price-" + I,
                    originalSelectorId: "#ProductSelect-" + I,
                    productFeaturedImage: ".FeaturedImage-" + I,
                    productImageWrap: "#FeaturedImageZoom-" + I,
                    productPrices: ".product-single__price-" + I,
                    productThumbImages: "#product-thumbnails-" + I,
                    productMainImages: "#product-images-" + I,
                    productPreviewMainImages: ".product-preview-images-" + I,
                    saleLabel: ".product-price__sale-label-" + I,
                    singleOptionSelector: ".single-option-selector-" + I,
                    singleOptionSelectorId: "#single-option-selector-" + I,
                    singleOptionSwatches: "wrapper-swatches-" + I,
                    instagramProduct: "#product-instagram-" + I,
                    instagramProductNameSpace: "product-instagram-" + I,
                    variationsSelector: "#variations-" + I,
                    variationSelector: ".variation-select-" + I,
                    qtyVariant: ".qty-variant-" + I,
                    threedId: ".threed-id-" + I,
                    countDownId: ".countdown-" + I,
                    couponCode: "#coupon-code-" + I,
                    couponBtn: "#coupon-btn-" + I,
                    sidebarSlide: ".sidebar-slick-vertical-" + I
                },
                $("#ProductJson-" + I).html() && (this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + I).innerHTML),
                    this._stringOverrides(),
                    this._initVariants(),
                    this._initSwatches(),
                    this._initFeature(),
                    this._initCompact(),
                    this._initStickyImages(),
                    this._initThumbnailsGallery(),
                    this._initImages(),
                    this._initSidebar(),
                    this._initZoom(),
                    this._initGallery(),
                    this._instagramProducts(),
                    this._initQuantity(),
                    this._initTabs(),
                    this._initHandleProduct())
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _stringOverrides: function () {
                theme.productStrings = theme.productStrings || {},
                    $.extend(theme.strings, theme.productStrings)
            },
            _initTabs: function () {
                $("#tabs a").tabs()
            },
            _initHandleProduct: function () {
                0 == $("#main").next("#popup-product-sizechart").length && $("#main").after($("#popup-product-sizechart")),
                    0 == $("#main").next("#popup-product-question").length && $("#main").after($("#popup-product-question")),
                    $(".button-product-question").click(function () {
                        var S = $(this).data("question")
                            , I = $(this).data("_qid");
                        return $.magnificPopup.open({
                            items: {
                                src: "#popup-product-question",
                                type: "inline"
                            },
                            tLoading: "",
                            mainClass: "popup-module mfp-with-zoom",
                            removalDelay: 200
                        }),
                            !1,
                            void ((0 < $(".quickview .mfp-content").find("#popup-product-question").length || 0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                                $(".quickview.mfp-wrap").data("_qid", I)))
                    }),
                    $(".button-product-sizechart").click(function () {
                        var S = $(this).data("sizechart")
                            , I = $(this).data("_qid");
                        return $.magnificPopup.open({
                            items: {
                                src: S,
                                type: "inline"
                            },
                            tLoading: "",
                            mainClass: "popup-module mfp-with-zoom",
                            removalDelay: 200
                        }),
                            !1,
                            void ((0 < $(".quickview .mfp-content").find("#popup-product-sizechart").length || 0 < $(".quickview .mfp-content").find("#popup-product-question").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                                $(".quickview.mfp-wrap").data("_qid", I)))
                    }),
                    $("#popup-product-question #contact_form").submit(function () {
                        var S = $(this)
                            , I = S.find(".btn");
                        return $.ajax({
                            type: "POST",
                            url: "/contact",
                            async: !0,
                            cache: !1,
                            data: S.serialize(),
                            beforeSend: function () {
                                I.button("loading")
                            },
                            complete: function () {
                                I.button("reset")
                            },
                            error: function () {
                                $.magnificPopup.close()
                            },
                            success: function () {
                                $.magnificPopup.close()
                            }
                        }),
                            !1
                    }),
                    $(document).on("click", "#tabProduct a", function (C) {
                        C.preventDefault(),
                            $(this).tab("show")
                    }),
                    0 < $("#myCarouselRelated.carousel").length && $("#myCarouselRelated_next").click(function () {
                        return $("#myCarouselRelated .carousel-inner").trigger("next.owl.carousel"),
                            !1
                    }),
                    $("#myCarouselRelated_prev").click(function () {
                        return $("#myCarouselRelated .carousel-inner").trigger("prev.owl.carousel"),
                            !1
                    }),
                    $("#myCarouselRelated .carousel-inner").owlCarousel({
                        rtl: window.rtl,
                        margin: 0,
                        nav: !1,
                        dots: !1,
                        mouseDrag: !0,
                        autoplay: !1,
                        responsive: {
                            0: {
                                items: 2
                            },
                            450: {
                                items: 2
                            },
                            550: {
                                items: 2
                            },
                            768: {
                                items: 4
                            },
                            1200: {
                                items: 4
                            }
                        }
                    }),
                    $("#myCarouselViewed.carousel").length && Shopify.Products.showRecentlyViewed({
                        howManyToShow: window.viewed_limit,
                        onComplete: function () {
                            window.show_multiple_currencies && roar.currenciesCallbackSpecial("#recently-viewed-products span.money");
                            var C = $("#myCarouselViewed .carousel-inner");
                            $("#myCarouselViewed_next").click(function () {
                                return C.trigger("next.owl.carousel"),
                                    !1
                            }),
                                $("#myCarouselViewed_prev").click(function () {
                                    return C.trigger("prev.owl.carousel"),
                                        !1
                                }),
                                C.owlCarousel({
                                    rtl: window.rtl,
                                    margin: 0,
                                    nav: !1,
                                    dots: !1,
                                    mouseDrag: !0,
                                    autoplay: !1,
                                    responsive: {
                                        0: {
                                            items: 2
                                        },
                                        450: {
                                            items: 2
                                        },
                                        550: {
                                            items: 2
                                        },
                                        768: {
                                            items: 4
                                        },
                                        1200: {
                                            items: 4
                                        }
                                    }
                                })
                        }
                    })
            },
            _initImages: function () {
                var C = this
                    , S = $(C.selectors.productMainImages);
                if ("left" == this.settings.product_design || "bottom" == this.settings.product_design || "sidebar" == this.settings.product_design || "full-screen" == this.settings.product_design) {
                    if (0 < $(C.selectors.productThumbImages).length) {
                        var I = $(C.selectors.productThumbImages).find(".thumbnails");
                        S.not(".slick-initialized").slick({
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            infinite: !1,
                            asNavFor: I,
                            prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                            nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                        });
                        var T = "0" != $(C.selectors.productThumbImages).data("vertical")
                            , P = 6;
                        $(".product-page-section").hasClass("product-has-sidebar") && (P = 3),
                            $(C.selectors.productThumbImages).closest("#shopify-section-product-quickview-template").length && (P = 4),
                            I.not(".slick-initialized").slick({
                                slidesToShow: P,
                                slidesToScroll: 1,
                                asNavFor: S,
                                focusOnSelect: !0,
                                vertical: T,
                                infinite: !1,
                                prevArrow: "<span class=\"fa fa-angle-up slick-prev-arrow\"></span>",
                                nextArrow: "<span class=\"fa fa-angle-down slick-next-arrow\"></span>",
                                responsive: [{
                                    breakpoint: 1024,
                                    settings: {
                                        slidesToShow: 3
                                    }
                                }, {
                                    breakpoint: 992,
                                    settings: {
                                        slidesToShow: 3
                                    }
                                }, {
                                    breakpoint: 768,
                                    settings: {
                                        slidesToShow: 3
                                    }
                                }]
                            })
                    }
                } else if ("carousel" == this.settings.product_design) {
                    var z = S.width() / 4;
                    S.not(".slick-initialized").slick({
                        centerMode: !0,
                        centerPadding: z + "px",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                        nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>",
                        responsive: [{
                            breakpoint: 1680,
                            settings: {
                                centerMode: !0,
                                centerPadding: "400px",
                                slidesToShow: 1
                            }
                        }, {
                            breakpoint: 1440,
                            settings: {
                                centerMode: !0,
                                centerPadding: "350px",
                                slidesToShow: 1
                            }
                        }, {
                            breakpoint: 1200,
                            settings: {
                                centerMode: !0,
                                centerPadding: "300px",
                                slidesToShow: 1
                            }
                        }, {
                            breakpoint: 1024,
                            settings: {
                                arrows: !1,
                                centerMode: !0,
                                centerPadding: "250px",
                                slidesToShow: 1
                            }
                        }, {
                            breakpoint: 992,
                            settings: {
                                centerMode: !0,
                                centerPadding: "200px",
                                slidesToShow: 1
                            }
                        }, {
                            breakpoint: 768,
                            settings: {
                                arrows: !1,
                                centerMode: !0,
                                centerPadding: "125px",
                                slidesToShow: 1
                            }
                        }, {
                            breakpoint: 480,
                            settings: {
                                arrows: !1,
                                centerMode: !0,
                                centerPadding: "50px",
                                slidesToShow: 1
                            }
                        }]
                    })
                } else
                    S.not(".slick-initialized").slick({
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: !1,
                        asNavFor: I,
                        prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                        nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                    });
                S.imagesLoaded(function () {
                    S.addClass("loaded")
                })
            },
            _initThumbnailsGallery: function () {
                var C = $(this.selectors.productMainImages);
                "gallery" == this.settings.product_design && $(".thumbnail-gallery-item").on("click", function () {
                    var S = $(this);
                    S.hasClass("active") || ($(".thumbnail-gallery-item").removeClass("active"),
                        S.addClass("active"),
                        $(".thumbnail-gallery-item").each(function (I) {
                            if ($(this).attr("id") == S.attr("id"))
                                return void C.slick("slickGoTo", I, !0)
                        }))
                })
            },
            _initQuantity: function () {
                $(".q_up").unbind("click"),
                    $(".q_up").on("click", function () {
                        var C = $(this).data("product_id")
                            , S = parseInt($(".quantity-cart-" + C).val()) + 1;
                        $(".quantity-cart-" + C).val(S)
                    }),
                    $(".q_down").unbind("click"),
                    $(".q_down").on("click", function () {
                        var C = $(this).data("product_id")
                            , S = parseInt($(".quantity-cart-" + C).val());
                        1 < S && $(".quantity-cart-" + C).val(S - 1)
                    })
            },
            _initPopup: function () {
                $(".sizechart-btn").magnificPopup({
                    type: "image",
                    midClick: !0
                }),
                    $(".return-btn").click(function () {
                        return $.magnificPopup.open({
                            items: {
                                src: "#delivery-return",
                                type: "inline"
                            },
                            tLoading: "",
                            mainClass: "popup-wrapper mfp-with-zoom",
                            removalDelay: 200
                        }),
                            !1
                    })
            },
            _initFeature: function () {
                if (0 < $(this.selectors.product + " .product-video-button a").length && $(this.selectors.product + " .product-video-button a").unbind("click") && $(this.selectors.product + " .product-video-button a").click(function (O) {
                    O.stopPropagation();
                    var N = $(this).data("video")
                        , E = $(this).data("_qid");
                    $.magnificPopup.open({
                        items: {
                            src: N,
                            type: "iframe"
                        },
                        type: "iframe",
                        mainClass: "mfp-fade",
                        removalDelay: 160,
                        preloader: !1,
                        disableOn: !1,
                        fixedContentPos: !1,
                        callbacks: {
                            beforeClose: function () {
                                console.log("Popup close has been initiated")
                            }
                        }
                    }),
                        (0 < $(".quickview .mfp-content").find(".product-360-view-wrapper").length || 0 < $(".quickview .mfp-content").find(".mfp-iframe-scaler").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                            $(".quickview.mfp-wrap").data("_qid", E))
                }),
                    0 < $(this.selectors.product + " .product-360-button a").length) {
                    for (var q, S = $(this.selectors.product + " .product-360-button a").data("id"), I = $(this.selectors.product + " .product-360-button a").data("_qid"), T = $(this.selectors.product + " .product-360-button a"), P = [], z = JSON.parse(document.getElementById("threed-id-" + this.sectionId).innerHTML), A = 1; 72 >= A; A++)
                        q = "f" + A,
                            z[q] && P.push(z[q]);
                    if (0 < P.length) {
                        var M = P.length;
                        xxx = $(this.selectors.threedId).ThreeSixty({
                            totalFrames: M,
                            endFrame: M,
                            currentFrame: 1,
                            imgList: ".threed-view-images",
                            progress: ".spinner",
                            imgArray: P,
                            height: null,
                            width: null,
                            responsive: !0,
                            navigation: !0,
                            onReady: function () {
                                0 == $("#main").next(".product-360-view-wrapper").length && $("#main").after($(S)),
                                    T.unbind("click") && T.click(function () {
                                        $.magnificPopup.open({
                                            items: {
                                                src: S,
                                                type: "inline"
                                            },
                                            type: "inline",
                                            mainClass: "mfp-fade",
                                            removalDelay: 160,
                                            disableOn: !1,
                                            preloader: !1,
                                            fixedContentPos: !1,
                                            callbacks: {
                                                open: function () {
                                                    console.log("xx11"),
                                                        $(window).resize()
                                                }
                                            }
                                        }),
                                            $(window).resize(),
                                            (0 < $(".quickview .mfp-content").find(".product-360-view-wrapper").length || 0 < $(".quickview .mfp-content").find(".mfp-iframe-scaler").length) && ($(".quickview.mfp-wrap").addClass("_reopen"),
                                                $(".quickview.mfp-wrap").data("_qid", I))
                                    })
                            }
                        })
                    }
                }
            },
            _initCompact: function () {
                if (0 < $(".product-accordion").length) {
                    var C = $(".product-accordion")
                        , S = $(".accordion-item");
                    S.each(function () {
                        var I = $(this)
                            , T = I.find(".title")
                            , P = T.innerHeight()
                            , z = I.find(".content").outerHeight()
                            , A = T.parent(".accordion-item");
                        T.data("height", P),
                            I.data("height", P + z)
                    }),
                        S.each(function () {
                            var I = $(this)
                                , T = I.find(".title")
                                , P = T.innerHeight()
                                , z = I.find(".content").outerHeight()
                                , A = T.parent(".accordion-item");
                            T.data("height", P),
                                I.data("height", P + z),
                                A.hasClass("active") && A.height(A.data("height"))
                        }),
                        C.on("click", ".accordion-item > .title", function () {
                            var I = $(this)
                                , T = I.parent(".accordion-item");
                            T.hasClass("active") || S.closest(".active").removeClass("active").height(I.data("height")),
                                T.toggleClass("active"),
                                T.hasClass("active") ? T.height(T.data("height")) : T.height(I.data("height"))
                        })
                }
            },
            _initStickyImages: function () {
                function C() {
                    O = $(window).height(),
                        q.each(function () {
                            M = $(this).offset().top,
                                D > M - O + 20 && $(this).addClass("animate-images")
                        })
                }
                function S() {
                    D = $(window).scrollTop(),
                        V = D + E + W,
                        z = T.width(),
                        H = T.offset().left + 15,
                        F = A.offset().top,
                        L = F + N,
                        z > B && (U = (z - B) / 2,
                            H += U),
                        D + E >= F ? (T.addClass("block-sticked"),
                            P.css({
                                top: E,
                                left: H,
                                width: z,
                                position: "fixed",
                                transform: "translateY(-20px)"
                            })) : (T.removeClass("block-sticked"),
                                P.css({
                                    top: "auto",
                                    left: "auto",
                                    width: "auto",
                                    position: "relative",
                                    transform: "translateY(0px)"
                                })),
                        V > L + 50 ? T.addClass("hide-temporary") : T.removeClass("hide-temporary")
                }
                function I() {
                    O = $(window).height(),
                        W = T.outerHeight(),
                        N = A.outerHeight(),
                        W < O - E ? T.addClass("in-viewport").removeClass("not-in-viewport") : T.removeClass("in-viewport").addClass("not-in-viewport"),
                        S(),
                        C()
                }
                if ($("body").hasClass("fastor-product-design-sticky")) {
                    var M, U, T = $(".product-summary"), P = T.find(".entry-summary"), z = T.width(), A = $(".fastor-images"), q = A.find(".shopify-product-gallery__wrapper a"), O = $(window).height(), N = A.outerHeight(), E = 130, B = 600, W = T.outerHeight(), D = $(window).scrollTop(), F = A.offset().top, H = T.offset().left + 15, L = F + N, V = D + E + W;
                    T.css({
                        height: W
                    }),
                        $(window).resize(function () {
                            I()
                        }),
                        $(window).scroll(function () {
                            S(),
                                C()
                        }),
                        A.imagesLoaded(function () {
                            I()
                        })
                }
            },
            _instagramProducts: function () {
                if (0 < $("#instagram_product").length) {
                    var S = $("#instagram_product").data("instagram_token")
                        , I = $("#instagram_product").data("user_id")
                        , T = $("#instagram_product").data("instagram_limit")
                        , P = new Instafeed({
                            get: "user",
                            target: "instagram_product",
                            accessToken: S,
                            userId: I,
                            limit: T,
                            resolution: "thumbnail",
                            resolution2: "standard_resolution",
                            template: '<div class="wrap animated"><a target="_blank" href="\{\{link\}\}"><img src="\{\{image\}\}" alt="\{\{caption\}\}" width="150" height="150" /><span class="hover_border"></span></a></div>'
                        });
                    P.run()
                }
            },
            _initGallery: function () {
                (function (S) {
                    function I(B, U) {
                        return -1 < (" " + B.className + " ").indexOf(" " + U + " ")
                    }
                    for (var T = function (B) {
                        for (var F, H, L, V, U = $(B).find(".photoswipe-item").get(), W = U.length, D = [], G = 0; G < W; G++)
                            if (F = U[G],
                                1 === F.nodeType)
                                if (H = F.children[0],
                                    L = H.getAttribute("data-size").split("x"),
                                    "video" == $(H).data("type")) {
                                    var R = $($(H).data("id")).html();
                                    D.push({
                                        html: R
                                    })
                                } else
                                    V = {
                                        src: H.getAttribute("href"),
                                        w: parseInt(L[0], 10),
                                        h: parseInt(L[1], 10)
                                    },
                                        1 < F.children.length && (V.title = $(F).find(".caption").html()),
                                        0 < H.children.length && (V.msrc = H.children[0].getAttribute("src")),
                                        V.el = F,
                                        D.push(V);
                        return D
                    }, P = function B(U, W) {
                        return U && (W(U) ? U : B(U.parentNode, W))
                    }, z = function (B) {
                        B = B || window.event,
                            B.preventDefault ? B.preventDefault() : B.returnValue = !1;
                        var U = B.target || B.srcElement
                            , W = P(U, function (R) {
                                return I(R, "photoswipe-item")
                            });
                        if (W) {
                            for (var V, D = W.closest(".photoswipe-wrapper"), F = $(W.closest(".photoswipe-wrapper")).find(".photoswipe-item").get(), H = F.length, L = 0, G = 0; G < H; G++)
                                if (1 === F[G].nodeType) {
                                    if (F[G] === W) {
                                        V = L;
                                        break
                                    }
                                    L++
                                }
                            return 0 <= V && q(V, D),
                                !1
                        }
                    }, A = function () {
                        var B = window.location.hash.substring(1)
                            , U = {};
                        if (5 > B.length)
                            return U;
                        for (var W = B.split("&"), D = 0; D < W.length; D++)
                            if (W[D]) {
                                var F = W[D].split("=");
                                2 > F.length || (U[F[0]] = F[1])
                            }
                        return U.gid && (U.gid = parseInt(U.gid, 10)),
                            U
                    }, q = function (B, U, W, D) {
                        var H, L, V, F = document.querySelectorAll(".pswp")[0];
                        if (V = T(U),
                            L = {
                                closeOnScroll: !1,
                                galleryUID: U.getAttribute("data-pswp-uid")
                            },
                            !D)
                            L.index = parseInt(B, 10);
                        else if (L.galleryPIDs) {
                            for (var G = 0; G < V.length; G++)
                                if (V[G].pid == B) {
                                    L.index = G;
                                    break
                                }
                        } else
                            L.index = parseInt(B, 10) - 1;
                        isNaN(L.index) || (W && (L.showAnimationDuration = 0),
                            H = new PhotoSwipe(F, PhotoSwipeUI_Default, V, L),
                            H.init(),
                            H.listen("beforeChange", function () {
                                var R = $(H.currItem.container);
                                $(".pswp__video").removeClass("active");
                                R.find(".pswp__video").addClass("active");
                                $(".pswp__video").each(function () {
                                    $(this).hasClass("active") || $(this).attr("src", $(this).attr("src"))
                                })
                            }),
                            H.listen("close", function () {
                                $(".pswp__video").each(function () {
                                    $(this).attr("src", $(this).attr("src"))
                                })
                            }))
                    }, M = document.querySelectorAll(S), O = 0, N = M.length; O < N; O++)
                        M[O].setAttribute("data-pswp-uid", O + 1),
                            M[O].onclick = z;
                    var E = A();
                    E.pid && E.gid && q(E.pid, M[E.gid - 1], !0, !0)
                }
                )(this.selectors.product + " .photoswipe-wrapper")
            },
            _initZoom: function () {
                if ($(".easyzoom").length)
                    if (1024 < $(window).width())
                        var C = $(".easyzoom:not(.feature-video)").easyZoom({
                            loadingNotice: "",
                            errorNotice: "",
                            preventClicks: !1
                        })
                            , S = C.data("easyZoom");
                    else
                        $(".easyzoom a").click(function (I) {
                            I.preventDefault()
                        })
            },
            _initSidebar: function () {
                var C = this;
                $sidebarSlide = $(C.selectors.sidebarSlide),
                    0 < $sidebarSlide.length && $sidebarSlide.each(function () {
                        var S = $(this)
                            , I = $(this).data("per_view");
                        $(this).not(".slick-initialized").slick({
                            slidesToShow: I,
                            slidesToScroll: 1,
                            vertical: !0,
                            focusOnSelect: !0,
                            infinite: !1,
                            prevArrow: "<span class=\"fa fa-angle-up slick-prev-arrow\"></span>",
                            nextArrow: "<span class=\"fa fa-angle-down slick-next-arrow\"></span>"
                        }),
                            S.imagesLoaded(function () {
                                S.addClass("loaded")
                            })
                    })
            },
            _initForceHeight: function () {
                0 < $(this.selectors.productPreviewMainImages).length && $(this.selectors.productPreviewMainImages).not(".slick-initialized").slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: !1,
                    prevArrow: "<span class=\"fa fa-angle-left slick-prev-arrow\"></span>",
                    nextArrow: "<span class=\"fa fa-angle-right slick-next-arrow\"></span>"
                })
            },
            _initSwatches: function () {
                var C = this.productSingleObject
                    , S = [];
                if ("1" == this.settings.swatch_size && S.push("Size"),
                    S.push("size"),
                    "1" == this.settings.swatch_color && (S.push("Color"),
                        S.push("Colour"),
                        S.push("color"),
                        S.push("colour")),
                    0 < S.length) {
                    var I = !1
                        , T = !1
                        , P = 0
                        , z = theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?"))
                        , A = theme.asset_url.substring(theme.asset_url.lastIndexOf("?"), theme.asset_url.length);
                    for (i = 0; i < C.options.length; i++) {
                        var q = ""
                            , M = ""
                            , O = ""
                            , N = ""
                            , E = ""
                            , B = ""
                            , U = ""
                            , W = "img btooltip";
                        if (q = "object" == typeof C.options[i] ? C.options[i].name : C.options[i],
                            I = !1,
                            T = !1,
                            -1 < S.indexOf(q)) {
                            I = !0,
                                P = i;
                            var D = q.toLowerCase();
                            if (/color|colour/i.test(D) && (T = !0),
                                I) {
                                var H = [];
                                for (j = 0; j < C.variants.length; j++) {
                                    var L = C.variants[j]
                                        , V = this.htmlEntities(L.options[P])
                                        , G = this.convertToSlug(V);
                                    0 > H.indexOf(V) && ("color" != D && "colour" != D ? (U = V,
                                        W = "btooltip") : U = "<i style=\"background-color:" + V + "; background-image: url(" + z + G + ".png" + A + ")\"></i>",
                                        B = $(this.selectors.singleOptionSelectorId + "-" + P).val() == V ? "selected " : "",
                                        O = O + "<div class=\"swatch-element " + D + G + " available\"><input data-id=\"" + this.selectors.singleOptionSelectorId + "-" + P + "\" data-value=\"" + V + "\"  class=\"swatch-radio " + B + "\" id=\"swatch-" + P + "-" + G + "\" type=\"radio\" name=\"option-" + P + "\" value=\"" + V + "\"><label for=\"swatch-" + P + "-" + G + "\" class=\"" + W + "\" title=\"" + V + "\">" + U + "</label></div>",
                                        H.push(V))
                                }
                                M = "<div class=\"" + this.selectors.singleOptionSwatches + " wrapper-swatches swatch " + D + "\" data-attribute_name=\"attribute_pa_" + D + "\"><div>" + O + "</div></div>",
                                    N = $(this.selectors.singleOptionSelectorId + "-" + P),
                                    E = $(this.selectors.variationSelector + "-" + P),
                                    "" != M && (N.after(M),
                                        N.hide(),
                                        E.addClass("hide-choose-option"))
                            }
                        }
                    }
                }
                var K = ""
                    , J = "." + this.selectors.singleOptionSwatches + " .swatch-radio";
                0 < $("." + this.selectors.singleOptionSwatches).length && (K = $(J),
                    K.unbind("click"),
                    K.on("click", function () {
                        var Q = $(this).data("id");
                        console.log($(this).data("value") + " - " + $(Q).val()),
                            $(this).data("value") != $(Q).val() && ($(Q).val($(this).data("value")).trigger("change"),
                                $(Q).closest(".selector-wrapper").find(".swatch-radio").removeClass("selected"),
                                $(this).addClass("selected"))
                    }))
            },
            htmlEntities: function (C) {
                return (C + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
            },
            convertToSlug: function (C) {
                return C.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
            },
            _initVariants: function () {
                var C = {
                    $container: this.$container,
                    enableHistoryState: this.$container.data("enable-history-state") || !1,
                    singleOptionSelector: this.selectors.singleOptionSelector,
                    originalSelectorId: this.selectors.originalSelectorId,
                    product: this.productSingleObject
                };
                this.variants = new slate.Variants(C),
                    this.$container.on("variantChange" + this.settings.namespace, this._updateAddToCart.bind(this)),
                    this.$container.on("variantImageChange" + this.settings.namespace, this._updateImages.bind(this)),
                    this.$container.on("variantPriceChange" + this.settings.namespace, this._updatePrice.bind(this)),
                    this.$container.on("variantSKUChange" + this.settings.namespace, this._updateSKU.bind(this))
            },
            _updateAddToCart: function (C) {
                var S = C.variant;
                S ? ($(this.selectors.productPrices).removeClass("invisible").attr("aria-hidden", "true"),
                    $(".variations_button").removeClass("hide"),
                    S.available ? ($(this.selectors.addToCart).prop("disabled", !1).toggleClass("hide", !1),
                        $(this.selectors.addToCart).val(theme.strings.addToCart),
                        $(this.selectors.stockText).html(theme.strings.inStock).removeClass("out-of-stock unavailable").addClass("in-stock"),
                        "shopify" == S.inventory_management && "continue" != S.inventory_policy && (0 < S.inventory_quantity && 1 == parseInt(theme.inventory) ? $(this.selectors.stockText).html(S.inventory_quantity + " " + theme.strings.inStock) : $(this.selectors.stockText).html(theme.strings.inStock))) : ($(this.selectors.addToCart).prop("disabled", !0).toggleClass("hide", !1),
                            $(this.selectors.addToCart).val(theme.strings.soldOut),
                            $(this.selectors.stockText).html(theme.strings.outStock).removeClass("in-stock unavailable").addClass("out-of-stock"))) : ($(".variations_button").addClass("hide"),
                                $(this.selectors.addToCart).prop("disabled", !0).toggleClass("hide", !0),
                                $(this.selectors.addToCart).val(theme.strings.unavailable),
                                $(this.selectors.stockText).html(theme.strings.unavailable).removeClass("in-stock").addClass("out-of-stock unavailable"),
                                $(this.selectors.productPrices).addClass("invisible").attr("aria-hidden", "false"))
            },
            _updateImages: function (C) {
                var S = C.variant
                    , I = this
                    , T = this.settings.product_design
                    , P = S.featured_image.src.replace("https:", "").replace("http:", "").split("?v=")[0];
                $(this.selectors.productFeaturedImage).each(function () {
                    var A = $(this)
                        , q = A.attr("href");
                    if (0 <= q.indexOf(P) && !A.closest(".slick-slide").hasClass("slick-cloned")) {
                        var M = $(I.selectors.productMainImages)
                            , O = A.closest(".slick-slide").attr("data-slick-index");
                        if ("carousel" == T ? M.slick("slickGoTo", O) : M.slick("slickGoTo", O, !0),
                            "scroll" == T) {
                            var N = parseInt(A.closest(".shopify-product-gallery__image").offset().top) - 50;
                            $("html,body").animate({
                                scrollTop: N
                            }, "slow")
                        }
                        return void ("gallery" == T && 0 < $(".thumbnails .thumbnail-gallery-item").length && $(".thumbnails .thumbnail-gallery-item").each(function () {
                            var E = $(this).data("href");
                            0 <= E.indexOf(P) && $(this).trigger("click")
                        }))
                    }
                })
            },
            _updatePrice: function (C) {
                var S = C.variant;
                if ($(this.selectors.originalPrice).html("<span class=\"money\">" + Shopify.formatMoney(S.price, window.money_format) + "</span>"),
                    S.compare_at_price > S.price) {
                    if ($(this.selectors.productPrices).addClass("has-sale"),
                        $(this.selectors.productPrices).removeClass("not-sale"),
                        $(this.selectors.comparePrice).html("<span class=\"money\">" + Shopify.formatMoney(S.compare_at_price, window.money_format) + "</span>").removeClass("hide"),
                        $(this.selectors.saleLabel).find("span").text(theme.strings.sale),
                        "" != theme.sale_percentages) {
                        var I = Math.round(100 * (S.compare_at_price - S.price) / S.compare_at_price);
                        $(this.selectors.saleLabel).find("span").text("-" + I + "%")
                    }
                    $(this.selectors.saleLabel).addClass("hide")
                } else
                    $(this.selectors.productPrices).removeClass("has-sale"),
                        $(this.selectors.productPrices).addClass("not-sale"),
                        $(this.selectors.comparePrice).addClass("hide"),
                        $(this.selectors.saleLabel).addClass("hide");
                roar.currenciesCallbackSpecial(this.selectors.product + " .money")
            },
            _updateSKU: function (C) {
                var S = C.variant;
                "" == S.sku ? $(this.selectors.SKU).addClass("hide") : $(this.selectors.SKU).removeClass("hide").find(".sku").text(S.sku)
            },
            onUnload: function () {
                this.$container.off(this.settings.namespace)
            }
        }),
            y
    }(),
    theme.MegaMenuSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.MegaMenu = $("#megamenu-" + I),
                this.megaMenuNamspace = "#megamenu-" + I,
                this.megaMenuId = $("#shopify-section-" + I),
                0 < $(".section-megamenu-content").length && $(".section-megamenu-content").each(function () {
                    var P = $(this).data("menu_width_class");
                    0 < $(this).closest(".shopify-section").length && (!$(this).closest(".shopify-section").hasClass(P) && $(this).closest(".shopify-section").addClass(P),
                        $(this).closest(".shopify-section").removeClass("hidden"))
                }),
                0 < $("#header-phantom .shopify-section").length && $("#header-phantom .shopify-section").each(function () {
                    $(this).removeClass("shopify-section")
                }),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                this._products(),
                    this._handleMegaMenu(),
                    this._handleVermenuCategory()
            },
            _products: function () {
                0 < $(".products-carousel-megamenu").length && $(".products-carousel-megamenu").each(function () {
                    var A, C = $(this).data("_id"), S = $(this).data("_one"), I = $(this).data("_two"), T = $(this).data("_three"), P = $(this).data("_four"), z = $(".productsCarousel" + C);
                    $(".productsCarousel" + C + "_next").click(function () {
                        return z.trigger("next.owl.carousel"),
                            !1
                    }),
                        $(".productsCarousel" + C + "_prev").click(function () {
                            return z.trigger("prev.owl.carousel"),
                                !1
                        }),
                        A = z.owlCarousel({
                            responsive: {
                                0: {
                                    items: S
                                },
                                479: {
                                    items: I
                                },
                                767: {
                                    items: T
                                },
                                992: {
                                    items: P
                                }
                            },
                            rtl: window.rtl
                        }),
                        $(window).resize(function () {
                            A.trigger("destroy.owl.carousel").removeClass("owl-carousel owl-loaded"),
                                A.find(".owl-stage-outer").children().unwrap(),
                                A = z.owlCarousel({
                                    responsive: {
                                        0: {
                                            items: S
                                        },
                                        479: {
                                            items: I
                                        },
                                        767: {
                                            items: T
                                        },
                                        992: {
                                            items: P
                                        }
                                    },
                                    rtl: window.rtl
                                })
                        })
                })
            },
            _handleVermenuCategory: function () {
                if ($("#vermenu_cat_gap").length && 992 <= roar.getWidthBrowser() && 0 < $(".container-megamenu.vertical .megamenu-wrapper").length) {
                    var C = $(".container-megamenu.vertical .megamenu-wrapper").outerHeight()
                        , S = $(".container-megamenu.vertical .megamenu-wrapper").offset().top
                        , I = $("#sidebar").offset().top;
                    $("#vermenu_cat_gap").css("height", C - (I - S))
                }
            },
            _handleMegaMenu: function () {
                var C = this._handleVermenuCategory();
                "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0),
                    $("ul.megamenu > li").each(function () {
                        var S = 0;
                        $(this).find(".mobile-enabled").each(function () {
                            S++
                        }),
                            0 == S && $(this).find(".open-menu").addClass("mobile-disabled")
                    }),
                    $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(function () {
                        $(this).children("ul").addClass("active")
                    }, function () {
                        $(this).children("ul").removeClass("active")
                    }),
                    $(".close-categories").unbind("click"),
                    $(".close-categories").on("click", function () {
                        return $(this).parent().removeClass("active"),
                            $(this).next().animate({
                                height: "hide"
                            }, 400),
                            !1
                    }),
                    $(".open-categories").unbind("click"),
                    $(".open-categories").on("click", function () {
                        return $(".open-categories").parent().removeClass("active"),
                            $(".open-categories").next().next().animate({
                                height: "hide"
                            }, 400),
                            $(this).parent().addClass("active"),
                            $(this).next().next().animate({
                                height: "show"
                            }, 400),
                            !1
                    }),
                    $(".close-menu").unbind("click"),
                    $(".close-menu").on("click", function () {
                        return $(this).parent().removeClass("active"),
                            $(this).next().next().next().animate({
                                height: "hide"
                            }, 400),
                            !1
                    }),
                    $(".open-menu").unbind("click"),
                    $(".open-menu").on("click", function () {
                        return $("ul.megamenu > li").removeClass("active"),
                            $("ul.megamenu > li").find(".sub-menu").animate({
                                height: "hide"
                            }, 400),
                            $(this).parent().addClass("active"),
                            $(this).next().next().animate({
                                height: "show"
                            }, 400),
                            $(window).trigger("resize"),
                            window.megamenu_responsive = !0,
                            !1
                    }),
                    $("ul.megamenu > li.click .content a").unbind("click"),
                    $("ul.megamenu > li.click .content a").click(function () {
                        window.location = $(this).attr("href")
                    }),
                    $("ul.megamenu > li.hover").hover(function () {
                        if (0 == window.megamenu_responsive) {
                            if (window.megamenu_active = $(this),
                                window.megamenu_hover = !0,
                                $("ul.megamenu > li").removeClass("active"),
                                $(this).addClass("active"),
                                window.rtl) {
                                $(this).children(".sub-menu").css("right", "auto"),
                                    $(this).children(".sub-menu").css("left", "auto");
                                var S = $(this).children(".sub-menu")
                                    , I = S.offset().left
                                    , T = $(".horizontal ul.megamenu")
                                    , P = T.offset().left - 45;
                                P > I && $(this).children(".sub-menu").css("left", "0")
                            } else {
                                $(this).children(".sub-menu").css("right", "auto");
                                var S = $(this).children(".sub-menu")
                                    , I = $(window).width() - (S.offset().left + S.outerWidth());
                                if ($(".header-type-3").length)
                                    var T = $("#top .container")
                                        , P = $(window).width() - (T.offset().left + T.outerWidth());
                                else
                                    var T = $(".overflow-megamenu")
                                        , P = $(window).width() - (T.offset().left + T.outerWidth());
                                P > I && $(this).children(".sub-menu").css("right", "0")
                            }
                            var z = $(this).children("a").outerWidth() / 2
                                , A = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                            $(this).find(".content > .arrow").css("left", A + z)
                        }
                    }, function () {
                        if (0 == window.megamenu_responsive) {
                            var S = $(this).attr("title");
                            if (window.megamenu_hover = !1,
                                "hover-intent" == S) {
                                var I = $(this);
                                setTimeout(function () {
                                    0 == window.megamenu_hover && $(I).removeClass("active")
                                }, 500)
                            } else
                                $(this).removeClass("active")
                        }
                    }),
                    $("ul.megamenu > li.click").unbind("click"),
                    $("ul.megamenu > li.click").click(function () {
                        if (1 == $(this).removeClass("active"))
                            return !1;
                        if (window.megamenu_active = $(this),
                            window.megamenu_hover = !0,
                            $("ul.megamenu > li").removeClass("active"),
                            $(this).addClass("active"),
                            1 == window.megamenu_responsive && $(this).children(".sub-menu").animate({
                                height: "show"
                            }, 400),
                            window.rtl) {
                            $(this).children(".sub-menu").css("right", "auto"),
                                $(this).children(".sub-menu").css("left", "auto");
                            var S = $(this).children(".sub-menu")
                                , I = S.offset().left
                                , T = $(".horizontal ul.megamenu")
                                , P = T.offset().left - 45;
                            P > I && $(this).children(".sub-menu").css("left", "0")
                        } else {
                            $(this).children(".sub-menu").css("right", "auto");
                            var S = $(this).children(".sub-menu")
                                , I = $(window).width() - (S.offset().left + S.outerWidth());
                            if ($(".header-type-3").length)
                                var T = $("#top .container")
                                    , P = $(window).width() - (T.offset().left + T.outerWidth());
                            else
                                var T = $(".overflow-megamenu")
                                    , P = $(window).width() - (T.offset().left + T.outerWidth());
                            P > I && $(this).children(".sub-menu").css("right", "0")
                        }
                        var z = $(this).children("a").outerWidth() / 2
                            , A = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                        return $(this).find(".content > .arrow").css("left", A + z),
                            !1
                    }),
                    $(".categories-image-right ul > li > a").hover(function () {
                        $(this).closest(".categories-image-right").find("img").attr("src", $(this).attr("data-image"))
                    }, function () {
                        var S = $(this).closest(".categories-image-right").attr("data-image");
                        $(this).closest(".categories-image-right").find("img").attr("src", S)
                    }),
                    $(".megaMenuToggle").unbind("click"),
                    $(".megaMenuToggle").click(function () {
                        return 1 == $(this).removeClass("active") ? $(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                            height: "hide"
                        }, 400) : ($(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                            height: "toggle"
                        }, 400),
                            $(this).addClass("active")),
                            !1
                    }),
                    $("html").unbind("click"),
                    $("html").on("click", function () {
                        "yes" == window.megamenu_responsive_design && 992 > $(window).width() || $("ul.megamenu > li.click").removeClass("active")
                    }),
                    C,
                    $(window).resize(function () {
                        window.megamenu_responsive = !1,
                            "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0),
                            C
                    })
            },
            onUnload: function () {
                this.$container.off(this.megaMenuNamspace)
            },
            onSelect: function () { },
            onBlockSelect: function () { },
            onBlockDeselect: function () { }
        }),
            y
    }(),
    theme.TopBlockSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.topBlockId = $("#shopify-section-" + I),
                this.topBlock = $("#top-block-" + I),
                this.topBlockNamspace = "#top-block-wrapper-" + I,
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () { },
            onUnload: function () {
                this.$container.off(this.topBlockNamspace)
            }
        }),
            y
    }(),
    theme.CustomWidgetSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.customWidgetId = $("#shopify-section-" + I),
                this.customWidgetNamspace = "#custom-widget-" + I,
                this.placement_fullwidth = $(this.customWidgetNamspace).data("placement_fullwidth"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                if ("1" == this.placement_fullwidth && !window.sidebar) {
                    var C = this.sectionId;
                    onFullWidthOption(C)
                }
            },
            onUnload: function () {
                this.$container.off(this.customWidgetNamspace)
            }
        }),
            y
    }(),
    theme.BannerSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.bannerId = $("#shopify-section-" + I),
                this.bannerNamspace = "#banner-" + I,
                this.placement_fullwidth = $(this.bannerNamspace).data("placement_fullwidth"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                if ("1" == this.placement_fullwidth && !window.sidebar) {
                    var C = this.sectionId;
                    onFullWidthOption(C)
                }
            },
            onUnload: function () {
                this.$container.off(this.bannerNamspace)
            }
        }),
            y
    }(),
    theme.DeliveryBarSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.deliveryBarId = $("#shopify-section-" + I),
                this.deliveryBar = $("#delivery-bar-" + I),
                this.deliveryBarNamspace = "#delivery-bar-" + I,
                this.placement_fullwidth = $(this.deliveryBarNamspace).data("placement_fullwidth"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                if ("1" == this.placement_fullwidth && !window.sidebar) {
                    var C = this.sectionId;
                    onFullWidthOption(C)
                }
            },
            onUnload: function () {
                this.$container.off(this.deliveryBarNamspace)
            }
        }),
            y
    }(),
    theme.SlideShowSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.slideShowId = $("#shopify-section-" + I),
                this.slideShow = $("#home-slider-" + I),
                this.slideShowNamspace = "#home-slider-" + I,
                this.option = {
                    slider_auto: this.slideShow.data("slider_auto"),
                    slider_interval: this.slideShow.data("slider_interval"),
                    slider_scale: this.slideShow.data("slider_scale"),
                    slider_auto_height: this.slideShow.data("slider_auto_height"),
                    slider_height: this.slideShow.data("slider_height"),
                    slider_align_top: this.slideShow.data("slider_align_top"),
                    full_width: this.slideShow.data("full_width"),
                    is_megamenu: this.slideShow.data("is_megamenu")
                },
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                if ("1" == this.option.slider_align_top ? $(".templateIndex").addClass("slider-align-top") : $(".templateIndex").removeClass("slider-align-top"),
                    this._handleSlideshow(),
                    this._initResize(),
                    "1" == this.option.full_width && !window.sidebar) {
                    var C = this.sectionId;
                    onFullWidthOption(C)
                }
                "1" == this.option.is_megamenu && this._handleMegaMenu()
            },
            _handleVermenuCategory: function () {
                if ($("#vermenu_cat_gap").length && 992 <= roar.getWidthBrowser() && 0 < $(".container-megamenu.vertical .megamenu-wrapper").length) {
                    var C = $(".container-megamenu.vertical .megamenu-wrapper").outerHeight()
                        , S = $(".container-megamenu.vertical .megamenu-wrapper").offset().top
                        , I = $("#sidebar").offset().top;
                    $("#vermenu_cat_gap").css("height", C - (I - S))
                }
            },
            _handleMegaMenu: function () {
                var C = this._handleVermenuCategory();
                "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0),
                    $("ul.megamenu > li").each(function () {
                        var S = 0;
                        $(this).find(".mobile-enabled").each(function () {
                            S++
                        }),
                            0 == S && $(this).find(".open-menu").addClass("mobile-disabled")
                    }),
                    $("ul.megamenu li .sub-menu .content .hover-menu ul li").hover(function () {
                        $(this).children("ul").addClass("active")
                    }, function () {
                        $(this).children("ul").removeClass("active")
                    }),
                    $(".close-categories").unbind("click"),
                    $(".close-categories").on("click", function () {
                        return $(this).parent().removeClass("active"),
                            $(this).next().animate({
                                height: "hide"
                            }, 400),
                            !1
                    }),
                    $(".open-categories").unbind("click"),
                    $(".open-categories").on("click", function () {
                        return $(".open-categories").parent().removeClass("active"),
                            $(".open-categories").next().next().animate({
                                height: "hide"
                            }, 400),
                            $(this).parent().addClass("active"),
                            $(this).next().next().animate({
                                height: "show"
                            }, 400),
                            !1
                    }),
                    $(".close-menu").unbind("click"),
                    $(".close-menu").on("click", function () {
                        return $(this).parent().removeClass("active"),
                            $(this).next().next().next().animate({
                                height: "hide"
                            }, 400),
                            !1
                    }),
                    $(".open-menu").unbind("click"),
                    $(".open-menu").on("click", function () {
                        return $("ul.megamenu > li").removeClass("active"),
                            $("ul.megamenu > li").find(".sub-menu").animate({
                                height: "hide"
                            }, 400),
                            $(this).parent().addClass("active"),
                            $(this).next().next().animate({
                                height: "show"
                            }, 400),
                            $(window).trigger("resize"),
                            window.megamenu_responsive = !0,
                            !1
                    }),
                    $("ul.megamenu > li.click .content a").unbind("click"),
                    $("ul.megamenu > li.click .content a").click(function () {
                        window.location = $(this).attr("href")
                    }),
                    $("ul.megamenu > li.hover").hover(function () {
                        if (0 == window.megamenu_responsive) {
                            if (window.megamenu_active = $(this),
                                window.megamenu_hover = !0,
                                $("ul.megamenu > li").removeClass("active"),
                                $(this).addClass("active"),
                                window.rtl) {
                                $(this).children(".sub-menu").css("right", "auto"),
                                    $(this).children(".sub-menu").css("left", "auto");
                                var S = $(this).children(".sub-menu")
                                    , I = S.offset().left
                                    , T = $(".horizontal ul.megamenu")
                                    , P = T.offset().left - 45;
                                P > I && $(this).children(".sub-menu").css("left", "0")
                            } else {
                                $(this).children(".sub-menu").css("right", "auto");
                                var S = $(this).children(".sub-menu")
                                    , I = $(window).width() - (S.offset().left + S.outerWidth());
                                if ($(".header-type-3").length)
                                    var T = $("#top .container")
                                        , P = $(window).width() - (T.offset().left + T.outerWidth());
                                else
                                    var T = $(".overflow-megamenu")
                                        , P = $(window).width() - (T.offset().left + T.outerWidth());
                                P > I && $(this).children(".sub-menu").css("right", "0")
                            }
                            var z = $(this).children("a").outerWidth() / 2
                                , A = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                            $(this).find(".content > .arrow").css("left", A + z)
                        }
                    }, function () {
                        if (0 == window.megamenu_responsive) {
                            var S = $(this).attr("title");
                            if (window.megamenu_hover = !1,
                                "hover-intent" == S) {
                                var I = $(this);
                                setTimeout(function () {
                                    0 == window.megamenu_hover && $(I).removeClass("active")
                                }, 500)
                            } else
                                $(this).removeClass("active")
                        }
                    }),
                    $("ul.megamenu > li.click").unbind("click"),
                    $("ul.megamenu > li.click").click(function () {
                        if (1 == $(this).removeClass("active"))
                            return !1;
                        if (window.megamenu_active = $(this),
                            window.megamenu_hover = !0,
                            $("ul.megamenu > li").removeClass("active"),
                            $(this).addClass("active"),
                            1 == window.megamenu_responsive && $(this).children(".sub-menu").animate({
                                height: "show"
                            }, 400),
                            window.rtl) {
                            $(this).children(".sub-menu").css("right", "auto"),
                                $(this).children(".sub-menu").css("left", "auto");
                            var S = $(this).children(".sub-menu")
                                , I = S.offset().left
                                , T = $(".horizontal ul.megamenu")
                                , P = T.offset().left - 45;
                            P > I && $(this).children(".sub-menu").css("left", "0")
                        } else {
                            $(this).children(".sub-menu").css("right", "auto");
                            var S = $(this).children(".sub-menu")
                                , I = $(window).width() - (S.offset().left + S.outerWidth());
                            if ($(".header-type-3").length)
                                var T = $("#top .container")
                                    , P = $(window).width() - (T.offset().left + T.outerWidth());
                            else
                                var T = $(".overflow-megamenu")
                                    , P = $(window).width() - (T.offset().left + T.outerWidth());
                            P > I && $(this).children(".sub-menu").css("right", "0")
                        }
                        var z = $(this).children("a").outerWidth() / 2
                            , A = $(this).children("a").offset().left - $(this).find(".content").offset().left;
                        return $(this).find(".content > .arrow").css("left", A + z),
                            !1
                    }),
                    $(".categories-image-right ul > li > a").hover(function () {
                        $(this).closest(".categories-image-right").find("img").attr("src", $(this).attr("data-image"))
                    }, function () {
                        var S = $(this).closest(".categories-image-right").attr("data-image");
                        $(this).closest(".categories-image-right").find("img").attr("src", S)
                    }),
                    $(".megaMenuToggle").unbind("click"),
                    $(".megaMenuToggle").click(function () {
                        return 1 == $(this).removeClass("active") ? $(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                            height: "hide"
                        }, 400) : ($(this).parent().find(".megamenu-wrapper").stop(!0, !0).animate({
                            height: "toggle"
                        }, 400),
                            $(this).addClass("active")),
                            !1
                    }),
                    $("html").unbind("click"),
                    $("html").on("click", function () {
                        "yes" == window.megamenu_responsive_design && 992 > $(window).width() || $("ul.megamenu > li.click").removeClass("active")
                    }),
                    C,
                    $(window).resize(function () {
                        window.megamenu_responsive = !1,
                            "yes" == window.megamenu_responsive_design && 992 > $(window).width() && (window.megamenu_responsive = !0),
                            C
                    })
            },
            _handleSlideshow: function () {
                var C, S, I, T, P, z, A, q;
                if (this.slideShow.length) {
                    var M = this.slideShow;
                    C = M.data("afx-head"),
                        S = M.data("afx-cap"),
                        I = M.data("afx-cta"),
                        T = M.data("afx-sticker"),
                        P = M.data("dfx-head"),
                        z = M.data("dfx-cap"),
                        A = M.data("dfx-cta"),
                        q = M.data("dfx-sticker")
                }
                var O = this.slideShowNamspace
                    , N = this.option.slider_auto
                    , E = this.option.slider_interval
                    , B = this.option.slider_scale
                    , U = this;
                this.slideShow.length && (this.slideShow.flexslider({
                    animation: "fade",
                    prevText: "",
                    nextText: "",
                    slideshowSpeed: E,
                    slideshow: N,
                    controlNav: !1,
                    start: function () {
                        jQuery("body").removeClass("loading"),
                            jQuery(O + " ul.slides h2.caption-content").css("opacity", "0"),
                            jQuery(O + " ul.slides .real-caption").css("opacity", "0"),
                            jQuery(O + " ul.slides .caption-link").css("opacity", "0"),
                            jQuery(O + " ul.slides .slide-sticker-wrapper img").css("opacity", "0"),
                            jQuery(O + " ul.slides li:nth-child(1) h2.caption-content").css("opacity", "1.0").addClass("rt-animated " + C).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass("rt-animated " + C)
                            }),
                            jQuery(O + " ul.slides li:nth-child(1) .real-caption").css("opacity", "1.0").addClass("rt-animated " + S).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass("rt-animated " + S)
                            }),
                            jQuery(O + " ul.slides li:nth-child(1) .caption-link").css("opacity", "1.0").addClass("rt-animated " + I).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass("rt-animated " + I)
                            }),
                            jQuery(O + " ul.slides li:nth-child(1) .slide-sticker-wrapper img").css("opacity", "1.0").addClass("rt-animated " + T).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass("rt-animated " + T)
                            })
                    },
                    after: function (W) {
                        var D = parseInt(W.currentSlide, 10) + 1;
                        jQuery(O + " ul.slides li:nth-child(" + D + ") h2.caption-content").css("opacity", "1.0").addClass("rt-animated " + C).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                            $(this).removeClass("rt-animated " + C)
                        }),
                            jQuery(O + " ul.slides li:nth-child(" + D + ") .real-caption").css("opacity", "1.0").addClass("rt-animated " + S).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass("rt-animated " + S)
                            }),
                            jQuery(O + " ul.slides li:nth-child(" + D + ") .caption-link").css("opacity", "1.0").addClass("rt-animated " + I).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass("rt-animated " + I)
                            }),
                            jQuery(O + " ul.slides li:nth-child(" + D + ") .slide-sticker-wrapper img").css("opacity", "1.0").addClass("rt-animated " + T).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass("rt-animated " + T)
                            })
                    },
                    before: function (W) {
                        var D = parseInt(W.currentSlide, 10) + 1;
                        jQuery(O + " ul.slides li:nth-child(" + D + ") h2.caption-content").addClass("rt-animated " + P).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                            $(this).removeClass("rt-animated " + P).css("opacity", "0")
                        }),
                            jQuery(O + " ul.slides li:nth-child(" + D + ") .real-caption").addClass("rt-animated " + z).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass("rt-animated " + z).css("opacity", "0")
                            }),
                            jQuery(O + " ul.slides li:nth-child(" + D + ") .caption-link").addClass("rt-animated " + A).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass("rt-animated " + A).css("opacity", "0")
                            }),
                            jQuery(O + " ul.slides li:nth-child(" + D + ") .slide-sticker-wrapper img").addClass("rt-animated " + q).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                $(this).removeClass("rt-animated " + q).css("opacity", "0")
                            })
                    }
                }),
                    imagesLoaded(O, function () {
                        B ? U._mockupCaptionSlider2() : U._mockupCaptionSlider()
                    }))
            },
            _mockupCaptionSlider2: function () {
                if (this.slideShow.length) {
                    var C = this.slideShowNamspace
                        , S = roar.getWidthBrowser();
                    $(C + " .slide-body").each(1200 > S ? function () {
                        var T = $(this).data("height");
                        $(this).css({
                            height: T * S / 1200
                        })
                    }
                        : function () {
                            var T = $(this).data("height");
                            $(this).css({
                                height: T
                            })
                        }
                    ),
                        $(C + " .caption-content").each(1200 > S ? function () {
                            var T = $(this).data("min")
                                , P = $(this).data("max")
                                , z = P * S / 1200;
                            T > z && (z = T),
                                $(this).css({
                                    "font-size": z
                                })
                        }
                            : function () {
                                var T = $(this).data("max");
                                $(this).css({
                                    "font-size": T
                                })
                            }
                        );
                    var I = this.slideShow.height() / 2;
                    $(C + " .slide-caption").each(function () {
                        var T = $(this).data("position");
                        if (1 == T) {
                            var P = $(this).data("left")
                                , z = $(this).data("top")
                                , A = $(this).data("right")
                                , q = $(this).data("bottom")
                                , M = $(this).data("width")
                                , O = $(this).data("align")
                                , N = $(".container-slider").offset().left;
                            if ("undefined" == typeof z && (z = "auto"),
                                "undefined" == typeof q && (q = "auto"),
                                "undefined" == typeof P && (P = "auto"),
                                "undefined" == typeof A && (A = "auto"),
                                1200 > S && ("auto" != P && 0 > P.toString().indexOf("%") && (P = P * S / 1200),
                                    "auto" != z && 0 > z.toString().indexOf("%") && (z = z * S / 1200),
                                    "auto" != A && 0 > A.toString().indexOf("%") && (A = A * S / 1200),
                                    "auto" != q && 0 > q.toString().indexOf("%") && (q = q * S / 1200),
                                    M = M * S / 1200),
                                $(this).css({
                                    top: z,
                                    left: P,
                                    bottom: q,
                                    right: A,
                                    "max-width": M,
                                    "text-align": O,
                                    display: "inline-block",
                                    opacity: 1,
                                    width: "auto",
                                    "line-height": 1
                                }),
                                P = $(this).data("left"),
                                0 < $(".common-home.show-vertical-megamenu .vertical .megamenu-wrapper").length && 991 < S && "undefined" != typeof P && "auto" != P && 0 > P.toString().indexOf("%")) {
                                var E = P + N;
                                1280 > S && (E = N + P * S / 1280);
                                var B = $(".common-home.show-vertical-megamenu .vertical .megamenu-wrapper")
                                    , U = B.offset().left + B.outerWidth();
                                U > E && (E = U + 30),
                                    $(this).css("left", E)
                            }
                        } else {
                            var W = $(this).height();
                            $(this).css({
                                top: I - W / 2,
                                opacity: 1
                            })
                        }
                    })
                }
            },
            _mockupCaptionSlider: function () {
                if (this.slideShow.length) {
                    var C = this.slideShowNamspace
                        , S = this.option.slider_auto_height
                        , I = this.option.slider_height
                        , T = roar.getWidthBrowser();
                    if (767 > T && 0 == S && 0 < I) {
                        var P = I * T / 1200;
                        $(C + " .slide-body").css("height", P)
                    }
                    767 <= T && 0 == S && 0 < I && $(C + " .slide-body").css("height", I),
                        $(C + " .caption-content").each(767 > T ? function () {
                            var z = $(this).data("min")
                                , A = $(this).data("max")
                                , q = A;
                            50 < A && (q = 50),
                                z > q && (q = z),
                                $(this).css({
                                    "font-size": q
                                })
                        }
                            : function () {
                                var z = $(this).data("max");
                                $(this).css({
                                    "font-size": z
                                })
                            }
                        );
                    var P = this.slideShow.height() / 2;
                    $(C + " .slide-caption").each(function () {
                        var z = $(this).data("position");
                        if (1 == z) {
                            var A = $(this).data("left")
                                , q = $(this).data("top")
                                , M = $(this).data("right")
                                , O = $(this).data("bottom")
                                , N = $(this).data("width")
                                , E = $(this).data("align")
                                , B = $(".container-slider").offset().left;
                            if ("undefined" == typeof q && (q = "auto"),
                                "undefined" == typeof O && (O = "auto"),
                                "undefined" == typeof A && (A = "auto"),
                                "undefined" == typeof M && (M = "auto"),
                                1200 > T && ("auto" != A && 0 > A.toString().indexOf("%") && (A = A * T / 1200),
                                    "auto" != q && 0 > q.toString().indexOf("%") && (q = q * T / 1200),
                                    "auto" != M && 0 > M.toString().indexOf("%") && (M = M * T / 1200),
                                    "auto" != O && 0 > O.toString().indexOf("%") && (O = O * T / 1200),
                                    N = N * T / 1200),
                                $(this).css({
                                    top: q,
                                    left: A,
                                    bottom: O,
                                    right: M,
                                    "max-width": N,
                                    "text-align": E,
                                    display: "inline-block",
                                    opacity: 1,
                                    width: "auto",
                                    "line-height": 1
                                }),
                                A = $(this).data("left"),
                                0 < $(".common-home.show-vertical-megamenu .vertical .megamenu-wrapper").length && 991 < T && "undefined" != typeof A && "auto" != A && 0 > A.toString().indexOf("%")) {
                                var U = A + B;
                                1280 > T && (U = B + A * T / 1280);
                                var W = $(".common-home.show-vertical-megamenu .vertical .megamenu-wrapper")
                                    , D = W.offset().left + W.outerWidth();
                                D > U && (U = D + 30),
                                    $(this).css("left", U)
                            }
                        } else {
                            var F = $(this).height();
                            $(this).css({
                                top: P - F / 2,
                                opacity: 1
                            })
                        }
                    })
                }
            },
            _initResize: function () {
                var C = this.option.slider_scale
                    , S = this;
                jQuery(window).resize(function () {
                    C ? S._mockupCaptionSlider2() : S._mockupCaptionSlider()
                })
            },
            onUnload: function () {
                this.$container.off(this.slideShowNamspace)
            }
        }),
            y
    }(),
    theme.SidebarSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.sideBarId = $("#shopify-section-" + I),
                this.sideBar = $("#sidebar-" + I),
                this.sideBarNamspace = "#sidebar-" + I,
                this.tabSideBar = $(".tab-filter-tabs" + I + " a"),
                this.tabItem = $(".procduct_tab_item-" + I),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                var C = this;
                0 < this.tabItem.length && this.tabItem.each(function () {
                    var S = {
                        _tabcount: $(this).data("_tabcount"),
                        _ptab_carousel: $(this).data("_ptab_carousel"),
                        _id: $(this).data("_id")
                    };
                    1 < parseInt(S._tabcount) ? (C._initTab(),
                        S._ptab_carousel && C._initMultiSlide(S),
                        C._initMultiSlides(S)) : (S._ptab_carousel && C._initSlide(S),
                            C._initSlides(S))
                })
            },
            _initTab: function () {
                this.tabSideBar.each(function () {
                    $(this).click(function (C) {
                        C.preventDefault(),
                            $(this).tab("show")
                    })
                })
            },
            _initSlide: function (C) {
                var S = $(".box #myCarousel" + C._id + " .carousel-inner");
                $("#myCarousel" + C._id + "_next").click(function () {
                    return S.trigger("next.owl.carousel"),
                        !1
                }),
                    $("#myCarousel" + C._id + "_prev").click(function () {
                        return S.trigger("prev.owl.carousel"),
                            !1
                    }),
                    S.owlCarousel({
                        slideSpeed: 500,
                        items: 1,
                        rtl: window.rtl
                    })
            },
            _initSlides: function (C) {
                var S = $(".box #myCarousel" + C._id + "s .carousel-inner");
                S.owlCarousel({
                    slideSpeed: 500,
                    rtl: window.rtl,
                    responsive: {
                        0: {
                            items: 1
                        },
                        320: {
                            items: 1
                        },
                        479: {
                            items: 1
                        },
                        767: {
                            items: 1
                        },
                        979: {
                            items: 1
                        },
                        1199: {
                            items: 1
                        }
                    }
                }),
                    $("#myCarousel" + C._id + "s_next").click(function () {
                        return S.trigger("next.owl.carousel"),
                            !1
                    }),
                    $("#myCarousel" + C._id + "s_prev").click(function () {
                        return S.trigger("prev.owl.carousel"),
                            !1
                    })
            },
            _initMultiSlide: function (C) {
                var S = $(".filter-product #myCarousel" + C._id + " .carousel-inner");
                $("#myCarousel" + C._id + "_next").click(function () {
                    return S.trigger("next.owl.carousel"),
                        !1
                }),
                    $("#myCarousel" + C._id + "_prev").click(function () {
                        return S.trigger("prev.owl.carousel"),
                            !1
                    }),
                    S.owlCarousel({
                        slideSpeed: 500,
                        items: 1,
                        rtl: window.rtl
                    })
            },
            _initMultiSlides: function (C) {
                var S = $(".filter-product #myCarousel" + C._id + "s .carousel-inner");
                $("#myCarousel" + C._id + "s_next").click(function () {
                    return S.trigger("next.owl.carousel"),
                        !1
                }),
                    $("#myCarousel" + C._id + "s_prev").click(function () {
                        return S.trigger("prev.owl.carousel"),
                            !1
                    }),
                    S.owlCarousel({
                        slideSpeed: 500,
                        rtl: window.rtl,
                        responsive: {
                            0: {
                                items: 1
                            },
                            320: {
                                items: 1
                            },
                            479: {
                                items: 1
                            },
                            767: {
                                items: 1
                            },
                            979: {
                                items: 1
                            },
                            1199: {
                                items: 1
                            }
                        }
                    })
            },
            onUnload: function () {
                this.$container.off(this.sideBarNamspace)
            }
        }),
            y
    }(),
    theme.ProductTabSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.productTabId = $("#shopify-section-" + I),
                this.productTab = $("#product-tab-" + I),
                this.productTabNamspace = "#product-tab-" + I,
                this.tabProductTabVertical = $(".tab-filter-tabs-vertical-" + I + " a"),
                this.tabProductTab = $(".tab-filter-tabs-" + I + " a"),
                this.tabItem = $(".product-tab-item-" + I),
                this._tabcount = this.productTab.data("_tabcount"),
                this.placement_fullwidth = this.productTab.data("placement_fullwidth"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                var C = this
                    , S = this._tabcount;
                if (0 < this.tabItem.length && this.tabItem.each(function () {
                    var T = {
                        _tabcount: S,
                        _ptab_carousel: $(this).data("_ptab_carousel"),
                        _cols: $(this).data("_cols"),
                        _id: $(this).data("_id")
                    };
                    1 < parseInt(T._tabcount) ? (C._initTab(),
                        C._initMultiSlide(T)) : C._initSlide(T)
                }),
                    "1" == this.placement_fullwidth && !window.sidebar) {
                    var I = this.sectionId;
                    onFullWidthOption(I)
                }
            },
            _initTab: function () {
                0 < this.tabProductTab.length && this.tabProductTab.each(function () {
                    $(this).click(function (C) {
                        C.preventDefault(),
                            $(this).tab("show")
                    })
                }),
                    0 < this.tabProductTabVertical.length && this.tabProductTabVertical.each(function () {
                        $(this).click(function (C) {
                            C.preventDefault(),
                                $(this).tab("show")
                        })
                    })
            },
            _initSlide: function (C) {
                if (C._ptab_carousel) {
                    var S = $(".box #myCarousel" + C._id + " .carousel-inner");
                    $("#myCarousel" + C._id + "_next").click(function () {
                        return S.trigger("next.owl.carousel"),
                            !1
                    }),
                        $("#myCarousel" + C._id + "_prev").click(function () {
                            return S.trigger("prev.owl.carousel"),
                                !1
                        }),
                        S.owlCarousel({
                            slideSpeed: 500,
                            rtl: window.rtl,
                            responsive: {
                                0: {
                                    items: 1
                                },
                                320: {
                                    items: 1
                                },
                                479: {
                                    items: 2 > C._cols ? C._cols : 2
                                },
                                767: {
                                    items: 3 > C._cols ? C._cols : 3
                                },
                                979: {
                                    items: 4 > C._cols ? C._cols : 4
                                },
                                1199: {
                                    items: C._cols
                                }
                            }
                        })
                }
            },
            _initMultiSlide: function (C) {
                if (C._ptab_carousel) {
                    var S = $(".filter-product #myCarousel" + C._id + " .carousel-inner");
                    S.owlCarousel({
                        slideSpeed: 500,
                        rtl: window.rtl,
                        responsive: {
                            0: {
                                items: 1
                            },
                            320: {
                                items: 1
                            },
                            479: {
                                items: 2 > C._cols ? C._cols : 2
                            },
                            767: {
                                items: 3 > C._cols ? C._cols : 3
                            },
                            979: {
                                items: 4 > C._cols ? C._cols : 4
                            },
                            1199: {
                                items: C._cols
                            }
                        }
                    }),
                        $("#myCarousel" + C._id + "_next").click(function () {
                            return S.trigger("next.owl.carousel"),
                                !1
                        }),
                        $("#myCarousel" + C._id + "_prev").click(function () {
                            return S.trigger("prev.owl.carousel"),
                                !1
                        })
                }
            },
            onUnload: function () {
                this.$container.off(this.productTabNamspace)
            }
        }),
            y
    }(),
    theme.AdvancedGridSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.advancedGridId = $("#shopify-section-" + I),
                this.advancedGrid = $("#advanced-grid-" + I),
                this.advancedGridNamspace = "#advanced-grid-" + I,
                this._ag_bgtype = this.advancedGrid.data("_ag_bgtype"),
                this._ag_fullwidth = this.advancedGrid.data("_ag_fullwidth"),
                this._agProductsCarousel = $(".myProductsCarousel-" + I),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                if (this._ag_fullwidth && !window.sidebar) {
                    var C = this.sectionId;
                    onFullWidthOption(C)
                }
                "2" == this._ag_bgtype && this._initParalax(),
                    this._initProductTab(),
                    this._initProductsSlide(),
                    this._initCountdown()
            },
            _initCountdown: function () {
                0 < $(".ag_product_countdown").length && $(".ag_product_countdown").each(function () {
                    var C = parseInt($(this).data("offer_date_year"))
                        , S = parseInt($(this).data("offer_date_month"))
                        , I = parseInt($(this).data("offer_date_day"))
                        , T = new Date
                        , P = new Date(C, S - 1, I);
                    T < P ? $(this).countdown({
                        until: P
                    }) : $(this).hide()
                })
            },
            _initParalax: function () {
                var C = this.sectionId;
                $(".advanced-grid-" + C + " .parallax-window").scrolly({
                    bgParallax: !0
                })
            },
            _initProductsSlide: function () {
                0 < this._agProductsCarousel.length && this._agProductsCarousel.each(function () {
                    var C = $(this)
                        , S = C.data("_skin_type")
                        , I = C.data("_id");
                    "sportwinter" == S ? C.owlCarousel({
                        slideSpeed: 500,
                        items: 1,
                        rtl: window.rtl
                    }) : C.owlCarousel({
                        responsive: {
                            0: {
                                items: 1
                            },
                            320: {
                                items: 1
                            },
                            479: {
                                items: 2
                            },
                            767: {
                                items: 3
                            },
                            979: {
                                items: 4
                            },
                            1199: {
                                items: 5
                            }
                        },
                        rtl: window.rtl
                    }),
                        $("#myCarousel" + I + "_next").click(function () {
                            return C.trigger("next.owl.carousel"),
                                !1
                        }),
                        $("#myCarousel" + I + "_prev").click(function () {
                            return C.trigger("prev.owl.carousel"),
                                !1
                        })
                })
            },
            _initProductTab: function () {
                var C = this.sectionId
                    , S = this;
                0 < $(".ag-products-tabs-" + C).length && $(".ag-products-tabs-" + C).each(function () {
                    var I = $(this).data("_tabcount")
                        , T = $(this).data("_block_id");
                    1 < parseInt(I) ? (S._initTab(T),
                        S._initMultiSlide(T)) : S._initSlide(T)
                })
            },
            _initTab: function (C) {
                0 < $(".tab-filter-tabs-" + C).length && $(".tab-filter-tabs-" + C + " a").each(function () {
                    $(this).click(function (S) {
                        S.preventDefault(),
                            $(this).tab("show")
                    })
                })
            },
            _initSlide: function (C) {
                0 < $(".ag-product-tab-item-" + C).length && $(".ag-product-tab-item-" + C).each(function () {
                    var S = $(this).data("_pid")
                        , I = $(this).data("_acm_carousel")
                        , T = $(this).data("_cols");
                    if (I) {
                        var P = $(".box #myCarousel" + S + " .carousel-inner");
                        0 < $("#myCarousel" + S + "_next").length && $("#myCarousel" + S + "_next").click(function () {
                            return P.trigger("next.owl.carousel"),
                                !1
                        }),
                            0 < $("#myCarousel" + S + "_prev").length && $("#myCarousel" + S + "_prev").click(function () {
                                return P.trigger("prev.owl.carousel"),
                                    !1
                            }),
                            0 < P.length && P.owlCarousel({
                                slideSpeed: 500,
                                rtl: window.rtl,
                                responsive: {
                                    0: {
                                        items: 1
                                    },
                                    320: {
                                        items: 1
                                    },
                                    479: {
                                        items: 2 > T ? T : 2
                                    },
                                    767: {
                                        items: 3 > T ? T : 3
                                    },
                                    979: {
                                        items: 4 > T ? T : 4
                                    },
                                    1199: {
                                        items: T
                                    }
                                }
                            })
                    }
                })
            },
            _initMultiSlide: function (C) {
                0 < $(".ag-product-tab-item-" + C).length && $(".ag-product-tab-item-" + C).each(function () {
                    var S = $(this).data("_pid")
                        , I = $(this).data("_acm_carousel")
                        , T = $(this).data("_cols");
                    if (I) {
                        var P = $(".filter-product #myCarousel" + S + " .carousel-inner");
                        $("#myCarousel" + S + "_next").click(function () {
                            return P.trigger("next.owl.carousel"),
                                !1
                        }),
                            $("#myCarousel" + S + "_prev").click(function () {
                                return P.trigger("prev.owl.carousel"),
                                    !1
                            }),
                            P.owlCarousel({
                                slideSpeed: 500,
                                rtl: window.rtl,
                                responsive: {
                                    0: {
                                        items: 1
                                    },
                                    320: {
                                        items: 1
                                    },
                                    479: {
                                        items: 2 > T ? T : 2
                                    },
                                    767: {
                                        items: 3 > T ? T : 3
                                    },
                                    979: {
                                        items: 4 > T ? T : 4
                                    },
                                    1199: {
                                        items: T
                                    }
                                }
                            })
                    }
                })
            },
            onUnload: function () {
                this.$container.off(this.advancedGridNamspace)
            }
        }),
            y
    }(),
    theme.PrefaceFooterSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.prefaceFooterId = $("#shopify-section-" + I),
                this.prefaceFooter = $("#preface-footer-" + I),
                this.prefaceFooterNamspace = "#preface-footer-" + I,
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () { },
            onUnload: function () {
                this.$container.off(this.prefaceFooterNamspace)
            }
        }),
            y
    }(),
    theme.FooterTopSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.footerTopId = $("#shopify-section-" + I),
                this.footerTop = $("#footer-top-" + I),
                this.footerTopNamspace = "#footer-top-" + I,
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () { },
            onUnload: function () {
                this.$container.off(this.footerTopNamspace)
            }
        }),
            y
    }(),
    theme.FooterBottomSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.footerTopId = $("#shopify-section-" + I),
                this.footerTop = $("#footer-top-" + I),
                this.footerTopNamspace = "#footer-top-" + I,
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () { },
            onUnload: function () {
                this.$container.off(this.footerTopNamspace)
            }
        }),
            y
    }(),
    theme.FooterCopyRightSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.footerCopyRightId = $("#shopify-section-" + I),
                this.footerCopyRight = $("#footer-copyright-" + I),
                this.footerCopyRightNamspace = "#footer-copyright-" + I,
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () { },
            onUnload: function () {
                this.$container.off(this.footerCopyRightNamspace)
            }
        }),
            y
    }(),
    theme.FooterColumn = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.footerColumnId = $("#shopify-section-" + I),
                this.footerColumn = $("#footer-column-" + I),
                this.footerColumnNamspace = "#footer-column-" + I,
                this._class = this.footerColumn.data("_class"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                "" != this._class && this.footerColumnId.addClass(this._class)
            },
            onUnload: function () {
                this.$container.off(this.footerColumnNamspace)
            }
        }),
            y
    }(),
    theme.TestimonialSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.testimonialId = $("#shopify-section-" + I),
                this.testimonial = $("#testimonial-" + I),
                this.testimonialNamspace = "#testimonial-" + I,
                this.placement_fullwidth = this.testimonial.data("placement_fullwidth"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                var C = this.sectionId
                    , S = $(".box #myCarousel_testi_" + C + " .carousel-inner");
                if ($("#myCarousel_testi_next_" + C).click(function () {
                    return S.trigger("next.owl.carousel"),
                        !1
                }),
                    $("#myCarousel_testi_prev_" + C).click(function () {
                        return S.trigger("prev.owl.carousel"),
                            !1
                    }),
                    S.owlCarousel({
                        slideSpeed: 500,
                        items: 1,
                        direction: window.rtl
                    }),
                    "1" == this.placement_fullwidth && !window.sidebar) {
                    var C = this.sectionId;
                    onFullWidthOption(C)
                }
            },
            onUnload: function () {
                this.$container.off(this.testimonialNamspace)
            }
        }),
            y
    }(),
    theme.TestimonialSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.testimonialId = $("#shopify-section-" + I),
                this.testimonial = $("#testimonial-" + I),
                this.testimonialNamspace = "#testimonial-" + I,
                this.placement_fullwidth = this.testimonial.data("placement_fullwidth"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                var C = this.sectionId
                    , S = $(".box #myCarousel_testi_" + C + " .carousel-inner");
                if ($("#myCarousel_testi_next_" + C).click(function () {
                    return S.trigger("next.owl.carousel"),
                        !1
                }),
                    $("#myCarousel_testi_prev_" + C).click(function () {
                        return S.trigger("prev.owl.carousel"),
                            !1
                    }),
                    S.owlCarousel({
                        slideSpeed: 500,
                        items: 1,
                        direction: window.rtl
                    }),
                    "1" == this.placement_fullwidth && !window.sidebar) {
                    var C = this.sectionId;
                    onFullWidthOption(C)
                }
            },
            onUnload: function () {
                this.$container.off(this.testimonialNamspace)
            }
        }),
            y
    }(),
    theme.LatestBlogSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.latestBlogId = $("#shopify-section-" + I),
                this.latestBlog = $("#latest_blog-" + I),
                this.latestBlogNamspace = "#latest_blog-" + I,
                this.placement_fullwidth = this.latestBlog.data("placement_fullwidth"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                if ("1" == this.placement_fullwidth && !window.sidebar) {
                    var C = this.sectionId;
                    onFullWidthOption(C)
                }
            },
            onUnload: function () {
                this.$container.off(this.latestBlogNamspace)
            }
        }),
            y
    }(),
    theme.InstafeedSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.instafeedId = $("#shopify-section-" + I),
                this.instafeed = $("#home-instagram-widget-" + I),
                this.instafeedNamspace = "#home-instagram-widget-" + I,
                this.instagram_list = $("#instagram_home_" + I),
                this.instagram_target = "instagram_home_" + I,
                this.placement_fullwidth = this.instafeed.data("placement_fullwidth"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                if ("1" == this.placement_fullwidth && !window.sidebar) {
                    var C = this.sectionId;
                    onFullWidthOption(C)
                }
                0 < this.instagram_list.length && this._instafeedRun()
            },
            _instafeedRun: function () {
                var C = this.instagram_target
                    , S = this.instagram_list.data("social_instagram_token")
                    , I = this.instagram_list.data("user_id")
                    , T = this.instagram_list.data("home_instafeed_limit")
                    , P = new Instafeed({
                        get: "user",
                        target: C,
                        accessToken: S,
                        userId: I,
                        limit: T,
                        resolution: "thumbnail",
                        resolution2: "standard_resolution",
                        template: '<div class="wrap animated"><a target="_blank" href="\{\{link\}\}"><img src="\{\{image\}\}" alt="\{\{caption\}\}" width="150" height="150" /><span class="hover_border"></span></a></div>'
                    });
                P.run()
            },
            onUnload: function () {
                this.$container.off(this.instafeedNamspace)
            }
        }),
            y
    }(),
    theme.mobileNavSection = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.mobileNavId = $("#shopify-section-" + I),
                this.mobileNav = $("#primary-" + I),
                this.mobilenavNamespace = "#primary-" + I,
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                this._initMobile()
            },
            _initMobile: function () {
                function C() {
                    $(document.body).removeClass("open-canvas-panel"),
                        $(".fastor-off-canvas-panel, #primary-mobile-nav").removeClass("open")
                }
                var S = this.mobileNav;
                $("header").on("click", "#un-navbar-toggle", function (I) {
                    I.preventDefault(),
                        S.toggleClass("open"),
                        $(document.body).toggleClass("open-canvas-panel")
                }),
                    S.on("click", ".mobile-child-menu", function (I) {
                        I.preventDefault(),
                            $(this).closest("li").siblings().find("ul").slideUp(),
                            $(this).closest("li").siblings().removeClass("active"),
                            $(this).closest("li").siblings().find("li").removeClass("active"),
                            $(this).closest("li").children("ul").slideToggle(),
                            $(this).closest("li").toggleClass("active")
                    }),
                    S.on("click", ".close-canvas-mobile-panel", function (I) {
                        I.preventDefault(),
                            C()
                    }),
                    $(window).on("resize", function () {
                        991 < $(window).width() && S.hasClass("open") && (S.removeClass("open"),
                            $(document.body).removeClass("open-canvas-panel"))
                    })
            },
            onUnload: function () {
                this.$container.off(this.mobilenavNamespace)
            }
        }),
            y
    }(),
    theme.ProductVariantMobile = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.wrapperId = $("#" + I),
                this.wrapper = $("#" + I),
                this.wrapperNamspace = "#" + I,
                this.addCartId = $("#btn-" + I + ".m-allow-cart"),
                this.addCartClass = $(".variant-item-" + I + ".m-allow-cart"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                var C = this;
                C._initScroll(),
                    C._initCompact(),
                    C._initEvents(),
                    $(window).resize(function () {
                        991 >= $(window).width() && C._initCompact()
                    })
            },
            _initScroll: function () {
                $(window).on("scroll", function () {
                    var C = $("#shopify-section-product-variants-mobile").height();
                    $(window).scrollTop() > C ? $(document.body).addClass("sticky-product-variants-mobile") : ($(document.body).removeClass("sticky-product-variants-mobile"),
                        $(".product-variants-mobile").hasClass("active") && $(".product-variants-mobile").height($(".variants-header").data("height")))
                })
            },
            _initCompact: function () {
                if (0 < $(".product-variant-mobile-section").length) {
                    var C = $(".product-variant-mobile-section")
                        , S = $(".product-variants-mobile");
                    S.each(function () {
                        var I = $(this)
                            , T = I.find(".variants-header")
                            , P = T.innerHeight()
                            , z = I.find(".variants-content").outerHeight()
                            , A = T.closest(".product-variants-mobile");
                        T.data("height", P),
                            I.data("height", P + z)
                    }),
                        S.each(function () {
                            var I = $(this)
                                , T = I.find(".variants-header")
                                , P = T.innerHeight()
                                , z = I.find(".variants-content").outerHeight()
                                , A = T.closest(".product-variants-mobile");
                            T.data("height", P),
                                I.data("height", P + z),
                                A.hasClass("active") && A.height(A.data("height"))
                        }),
                        C.unbind("click") && C.on("click", ".variants-header .title", function () {
                            var I = $(this)
                                , T = I.closest(".variants-header")
                                , P = I.closest(".product-variants-mobile");
                            P.hasClass("active") || S.closest(".active").removeClass("active").height(I.data("height")),
                                P.toggleClass("active"),
                                P.hasClass("active") ? P.height(P.data("height")) : P.height(T.data("height"))
                        })
                }
            },
            _initEvents: function () {
                var C = $("#ProductSelect-product-template.variation-select").val();
                0 < this.addCartId.length && (this.addCartId.unbind("click"),
                    this.addCartId.on("click", function () {
                        $("#ProductSelect-product-template.variation-select").val(C),
                            $("#AddToCart-product-template").trigger("click")
                    })),
                    0 < this.addCartClass.length && (this.addCartClass.unbind("click"),
                        this.addCartClass.on("click", function () {
                            var S = $(this).data("id");
                            $("#ProductSelect-product-template.variation-select").val(S),
                                $("#AddToCart-product-template").trigger("click")
                        }))
            },
            onUnload: function () {
                this.$container.off(this.wrapperNamspace)
            }
        }),
            y
    }(),
    theme.CartVariantMobile = function () {
        function y(C) {
            var S = this.$container = $(C)
                , I = this.sectionId = S.attr("data-section-id")
                , T = S.attr("data-section-type");
            this.wrapperId = $("#" + I),
                this.wrapper = $("#" + I),
                this.wrapperNamspace = "#" + I,
                this.addCartId = $("#btn-" + I + ".m-allow-cart"),
                this.addCartClass = $(".variant-item-" + I + ".m-allow-cart"),
                this._init()
        }
        return y.prototype = _.assignIn({}, y.prototype, {
            _init: function () {
                var C = this;
                C._initScroll()
            },
            _initScroll: function () {
                $(window).on("scroll", function () {
                    var C = $("#shopify-section-product-variants-mobile").height();
                    $(window).scrollTop() > C ? $(document.body).addClass("sticky-product-variants-mobile") : ($(document.body).removeClass("sticky-product-variants-mobile"),
                        $(".product-variants-mobile").hasClass("active") && $(".product-variants-mobile").height($(".variants-header").data("height")))
                })
            },
            onUnload: function () {
                this.$container.off(this.wrapperNamspace)
            }
        }),
            y
    }();
function onFullWidthOption(y) {
    _force_full_width(y),
        $(window).resize(function () {
            _force_full_width(y)
        })
}
function _force_full_width(y) {
    var C = $(".standard-body .full-width #shopify-section-" + y);
    if (!window.rtl) {
        if (0 < C.size()) {
            C.width($("body").width()),
                C.css("left", "0px");
            var S = C.offset();
            C.css("left", "-" + S.left + "px"),
                C.find(".container").css("padding-left", S.left),
                C.find(".container").css("padding-right", S.left)
        }
    } else if (0 < C.size()) {
        C.width($("body").width()),
            C.css("right", "0px");
        var S = C.offset();
        C.css("right", "-" + -1 * S.left + "px"),
            C.find(".container").css("padding-left", -1 * S.left),
            C.find(".container").css("padding-right", -1 * S.left)
    }
    var I = $(".standard-body .fixed #shopify-section-" + y);
    if (!window.rtl) {
        if (0 < I.size()) {
            I.width($(".standard-body .fixed .pattern").width()),
                I.css("left", "0px");
            var S = I.offset()
                , T = $(".standard-body .fixed .pattern").offset()
                , P = S.left - T.left;
            I.css("left", "-" + P + "px"),
                I.find(".container").css("padding-left", P),
                I.find(".container").css("padding-right", P)
        }
    } else if (0 < I.size()) {
        I.width($(".standard-body .fixed .pattern").width()),
            I.css("right", "0px");
        var S = I.offset()
            , T = $(".standard-body .fixed .pattern").offset()
            , P = S.left - T.left;
        I.css("right", "-" + -1 * P + "px"),
            I.find(".container").css("padding-left", -1 * P),
            I.find(".container").css("padding-right", -1 * P)
    }
    var z = $(".standard-body .fixed2 #shopify-section-" + y);
    if (0 < z.size()) {
        z.width($("body").width()),
            z.css("left", "0px");
        var S = z.offset();
        z.css("left", "-" + S.left + "px"),
            z.find(".container").css("padding-left", S.left),
            z.find(".container").css("padding-right", S.left)
    }
    var A = $(".fixed-body #shopify-section-" + y);
    if (!window.rtl) {
        if (0 < A.size()) {
            A.width($(".fixed-body .main-fixed").width()),
                A.css("left", "0px");
            var S = A.offset()
                , T = $(".fixed-body .main-fixed").offset()
                , P = S.left - T.left;
            A.css("left", "-" + P + "px"),
                A.find(".container").css("padding-left", P),
                A.find(".container").css("padding-right", P)
        }
    } else if (0 < A.size()) {
        A.width($(".fixed-body .main-fixed").width()),
            A.css("right", "0px");
        var S = A.offset()
            , T = $(".fixed-body .main-fixed").offset()
            , P = S.left - T.left;
        A.css("right", "-" + -1 * P + "px"),
            A.find(".container").css("padding-left", -1 * P),
            A.find(".container").css("padding-right", -1 * P)
    }
}
$(document).ready(function () {
    var y = new theme.Sections;
    y.register("product-template", theme.Product),
        y.register("mega-menu", theme.MegaMenuSection),
        y.register("topblock-section", theme.TopBlockSection),
        y.register("custom-widget", theme.CustomWidgetSection),
        y.register("banner", theme.BannerSection),
        y.register("delivery-bar", theme.DeliveryBarSection),
        y.register("slideshow", theme.SlideShowSection),
        y.register("slideshow-with-html", theme.SlideShowSection),
        y.register("slideshow-with-megamenu", theme.SlideShowSection),
        y.register("sidebar", theme.SidebarSection),
        y.register("product-tab", theme.ProductTabSection),
        y.register("advanced-grid", theme.AdvancedGridSection),
        y.register("preface-footer", theme.PrefaceFooterSection),
        y.register("footer-top", theme.FooterTopSection),
        y.register("footer-bottom", theme.FooterBottomSection),
        y.register("footer-copyright", theme.FooterCopyRightSection),
        y.register("footer-column-1", theme.FooterColumn),
        y.register("footer-column-2", theme.FooterColumn),
        y.register("footer-column-3", theme.FooterColumn),
        y.register("footer-column-4", theme.FooterColumn),
        y.register("testimonial", theme.TestimonialSection),
        y.register("instafeed", theme.InstafeedSection),
        y.register("latest-blog", theme.LatestBlogSection),
        y.register("mobile-nav-section", theme.mobileNavSection),
        y.register("product-variant-mobile", theme.ProductVariantMobile),
        y.register("cart-variant-mobile", theme.CartVariantMobile)
});