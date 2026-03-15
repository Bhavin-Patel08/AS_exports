(function ($) {
    "use strict";

    /* =========================
       PAGE LOADING SPINNER
    ========================= */
    // Hide the loading spinner once the page is ready
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    /* =========================
       WOW ANIMATION INIT
    ========================= */
    // Initialize scroll animations if WOW.js exists
    if (typeof WOW === "function") {
        new WOW().init();
    }


    /* =========================
       STICKY NAVBAR
    ========================= */
    // Show navbar after scrolling 300px
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top')
                .addClass('shadow-sm')
                .css('top', '0px');
        } else {
            $('.sticky-top')
                .removeClass('shadow-sm')
                .css('top', '-100px');
        }
    });


    /* =========================
       COUNTER ANIMATION
    ========================= */
    // Animated number counters
    if ($.fn.counterUp) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });
    }


    /* =========================
       SKILL / EXPERIENCE BARS
    ========================= */
    // Animate progress bars when section appears
    if ($.fn.waypoint) {
        $('.experience').waypoint(function () {
            $('.progress .progress-bar').each(function () {
                $(this).css(
                    "width",
                    $(this).attr("aria-valuenow") + '%'
                );
            });
        }, { offset: '80%' });
    }


    /* =========================
       BACK TO TOP BUTTON
    ========================= */
    // Show button after scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });

    // Smooth scroll to top
    $('.back-to-top').click(function () {
        $('html, body').animate(
            { scrollTop: 0 },
            1500,
            'easeInOutExpo'
        );
        return false;
    });


    /* =========================
       MAP PINS CLICK ACTION
    ========================= */
    // Show alert when clicking export country pin
    document.querySelectorAll(".pin").forEach(pin => {
        pin.addEventListener("click", () => {
            alert(pin.innerText + " Export Countries");
        });
    });


    /* =========================
       COUNTRY LIST SWITCH
    ========================= */
    // Toggle export country lists
    const pins = document.querySelectorAll(".pin");

    pins.forEach(pin => {

        pin.addEventListener("click", function () {

            const target = this.getAttribute("data-target");

            // Hide all country lists
            document.querySelectorAll(".country-list").forEach(list => {
                list.classList.remove("active");
            });

            // Show selected list
            const targetElement = document.getElementById(target);
            if (targetElement) {
                targetElement.classList.add("active");
            }

        });

    });


    /* =========================
       VIDEO MODAL PLAYER
    ========================= */
    var $videoSrc;

    // Capture video URL when play button clicked
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });

    // Autoplay when modal opens
    $('#videoModal').on('shown.bs.modal', function () {
        $("#video").attr(
            'src',
            $videoSrc +
            "?autoplay=1&modestbranding=1&showinfo=0"
        );
    });

    // Stop video when modal closes
    $('#videoModal').on('hide.bs.modal', function () {
        $("#video").attr('src', $videoSrc);
    });

})(jQuery);



/* =========================
   FAQ ACCORDION
========================= */
// Toggle FAQ items
document.querySelectorAll(".faq-question").forEach(button => {

    button.addEventListener("click", () => {

        const active = document.querySelector(".faq-item.active");

        // Close other open FAQ
        if (active && active !== button.parentElement) {
            active.classList.remove("active");
        }

        // Toggle clicked FAQ
        button.parentElement.classList.toggle("active");

    });

});