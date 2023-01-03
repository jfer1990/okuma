var okuma = {
    breakPoint: 1024,
    timer: false,
    proStuff: function() {
        // okuma-slider
        $('.okuma-slider').slick({
            prevArrow: $('.prev-arrow'),
            nextArrow: $('.next-arrow'),
            dots: true,
            fade: true,
            autoplay: true,
            autoplaySpeed: 5000,
        });

        //
        $('.okuma-slider').on('init', function (event, slick) {
            $('.slide-text, .slide-photo').matchHeight();
        });

        $('.slide-text, .slide-photo').matchHeight({
            target: $('.slide-photo').first()
        });
    },

    headerScroll: function() {
        $('.scroll-down').on('click', function(event) {
            event.preventDefault();
            
            var section_bottom = $('header').outerHeight();
            $("html, body").animate({
                scrollTop: section_bottom
            }, {
                    duration: 800
            });
        });
    },

    toggleMenu: function() {
        $('.menu-toggle').on('click', function(e) {
            e.preventDefault();
            if ($(".megamenu-wrapper").is(":visible")) {
              $(".menu-toggle").removeClass("expanded");
            } else {              
              $(".menu-toggle").addClass("expanded");
            }
            $(".megaMenuToggle").trigger('click');
        });
    },

    navWrapperHeight: function() {
        $(".nav-wrapper .item").matchHeight();
    },

    sliderFixHeight:function() {
        $(window).on('resize load', function() {
            if ($(window).width() < okuma.breakPoint) {
                var photoHeight = $(".slide-photo").outerHeight();
                $(".okuma-pro-stuff .gray-overlay").css("top", Math.ceil(photoHeight / 2));
            }
        });
    },

    bannerFixHeight: function() {
        $('.banners .col-sm-3').matchHeight();
    },

    footerToggle: function() {
        $("#footer .linklist .clearfix, #footer .social_icon_wrapper ul").addClass("toggle-content");
        $("#footer .linklist .title, #footer .social_icon_wrapper .title").append('<i class="fa fa-angle-down" aria-hidden="true"></i>');
        if ($(window).width > okuma.breakPoint) {
          return;
        }
        $("#footer .linklist .title, #footer .social_icon_wrapper .title").on(
          "click",
          function() {
            var $toggleContent = $(this)
              .parent()
              .find(".toggle-content")
              .first();
            if ($toggleContent.is(":visible")) {
              $toggleContent.hide();
              $("i", this).removeClass("fa-angle-up");
              $("i", this).addClass("fa-angle-down");
            } else {
              $toggleContent.show();
              $("i", this).removeClass("fa-angle-down");
              $("i", this).addClass("fa-angle-up");
            }
          }
        );
    },

    readmore: function() {
      $('.slide-text-inner').readmore({
            speed: 75,
            collapsedHeight: 450,
            moreLink: '<a class="readmore-toggle" href="#"><span>Expand Full List</span></a>',
            lessLink: '',
            //afterToggle: function() {
            //    $('.inspired-fishing-col, .feature-list-col').matchHeight();
            //}
        });
        $('#tab-features .feature-list').readmore({
            speed: 75,
            collapsedHeight: 480,
            moreLink: '<a class="readmore-toggle" href="#"><span>Expand Full List</span></a>',
            lessLink: '',
            afterToggle: function() {
                $('.inspired-fishing-col, .feature-list-col').matchHeight();
            }
        });


        $('#product-accordion .feature-list').readmore({
            speed: 75,
            collapsedHeight: 550,
            moreLink: '<a class="readmore-toggle" href="#"><span>Expand Full List</span></a>',
            lessLink: '',
        });
    },

    getQueryString: function() {
        var queryStringKeyValue = window.location.search.replace('?', '').split('&');
        var qsJsonObject = {};
        if (queryStringKeyValue != '') {
            for (i = 0; i < queryStringKeyValue.length; i++) {
                qsJsonObject[queryStringKeyValue[i].split('=')[0]] = queryStringKeyValue[i].split('=')[1];
            }
        }
        return qsJsonObject;
    },

    findDealer: function() {

        var storeLocator = jQuery('#store-locator-iframe');
        console.log('storeLocator');
        console.log(storeLocator.attr('src'));
        if (storeLocator.length==0) return;

        var src = storeLocator.attr('src');
        if (src) {
            var q = okuma.getQueryString();
            if (q.zip) {
                src = src+'&zip='+q.zip;
            }
            if (q.limit) {
                src = src+'&limit='+q.limit;
            }
            storeLocator.attr('src', src );

            clearTimeout(okuma.timer);

            // update title page
            jQuery('#title-page').text('Dealer Locator');
            jQuery('.breadcrumb-content li:last-child').text('Dealer Locator');
        } else {
            okuma.timer = setTimeout(okuma.findDealer, 101);
        }

    },

    /* product page */
        selectModelTab: function() {
            $('.select-model').on('click', function(e) {
                e.preventDefault();
                $('.product-tabs a[href="#tab-models"]').trigger('click');
                
                $('html, body').animate({
                    scrollTop: $("#tabs").offset().top
                }, 2000);
            });
        },

        featuresTab: function() {
            // equal columns
            $('.inspired-fishing-col, .feature-list-col').matchHeight();
        },

        relatedProducts: function() {
            $('#myCarouselRelated .owl-item .product').matchHeight();
        },

        productVideoStyle: function() {
            if ($('.product-video').length == 0) return;
            $('.product-video-box').fitVids();

            var vimeoVideoID = $('.product-video-box').data('video');
            $.getJSON('https://www.vimeo.com/api/v2/video/' + vimeoVideoID + '.json?callback=?', { format: "json" }, function (data) {
                $('.product-video-overlay').css('background-image', 'url("'+data[0].thumbnail_large+'");');
                $('.product-video-overlay').attr('style', 'background-image: url("'+data[0].thumbnail_large+'");');
            });

            var iframe = $(this).parent('.product-video-box').find('iframe');
            var iframe = document.querySelector('iframe');;
            var player = new Vimeo.Player(iframe);

            $('.play-video').on('click', function(e) {
                e.preventDefault();
                $(this).parents('.product-video-overlay').hide();
                player.play();
            });
        },

        catalogFilter: function() {
            $('#bc-sf-filter-default-toolbar').wrapInner('<div class="bc-sf-filter-default-toolbar-inner"></div>');
        },

        sliderImageMobile: function() {
            $('#product-image-design-scroll-product-template').slick({
                adaptiveHeight: true,
                slidesToShow: 1,
                arrows: false,
                dots: true,
            });
        },

        productAccordions: function() {
            $('#product-accordion .product-accordion-item > a').on('click', function(e) {
                e.preventDefault();
                // $('#product-accordion .product-accordion-item').removeClass('active');
                $(this).parent().toggleClass('open');
            });
        }

    
}

$(document).ready(function() {
    for (var func in okuma) {
        if (okuma[func] instanceof Function) {
            okuma[func]();
        }
    }
});
