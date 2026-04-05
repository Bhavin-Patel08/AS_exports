(function ($) {
    "use strict";

    /* =========================
       PAGE LOADING SPINNER
    ========================= */
    window.addEventListener("load", function () {
        const spinner = document.getElementById("spinner");
        if (spinner) spinner.classList.remove("show");
    });

    /* =========================
       STICKY NAVBAR + BACK TO TOP
    ========================= */
    $(window).on("scroll", function () {
        let scrollTop = $(this).scrollTop();

        // Sticky Navbar
        if (scrollTop > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
            $('.back-to-top').fadeOut('slow');
        }
    });

    /* =========================
       BACK TO TOP CLICK
    ========================= */
    $('.back-to-top').on("click", function () {
        $('html, body').animate(
            { scrollTop: 0 },
            1500,
            'easeInOutExpo'
        );
        return false;
    });

    /* =========================
       COUNTER ANIMATION
    ========================= */
    if ($.fn.counterUp) {
        $('[data-toggle="counter-up"]').counterUp({
            delay: 10,
            time: 2000
        });
    }

    /* =========================
       SKILL / EXPERIENCE BARS
    ========================= */
    if ($.fn.waypoint) {
        $('.experience').waypoint(function () {
            $('.progress .progress-bar').each(function () {
                $(this).css("width", $(this).attr("aria-valuenow") + '%');
            });
        }, { offset: '80%' });
    }

    /* =========================
       COUNTRY LIST SWITCH (MAP)
    ========================= */
    const pins = document.querySelectorAll(".pin");

    pins.forEach(pin => {
        pin.addEventListener("click", function () {

            const target = this.getAttribute("data-target");

            document.querySelectorAll(".country-list").forEach(list => {
                list.classList.remove("active");
            });

            const targetElement = document.getElementById(target);
            if (targetElement) targetElement.classList.add("active");

        });
    });

    /* =========================
       VIDEO MODAL PLAYER
    ========================= */
    let videoSrc;

    $('.btn-play').on("click", function () {
        videoSrc = $(this).data("src");
    });

    $('#videoModal').on('shown.bs.modal', function () {
        if (videoSrc) {
            $("#video").attr(
                'src',
                videoSrc + "?autoplay=1&modestbranding=1&showinfo=0"
            );
        }
    });

    $('#videoModal').on('hide.bs.modal', function () {
        $("#video").attr('src', videoSrc);
    });

})(jQuery);


/* =========================
   FAQ ACCORDION
========================= */
document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const button = item.querySelector(".faq-question");

        if (button) {
            button.addEventListener("click", () => {

                faqItems.forEach(other => {
                    if (other !== item) other.classList.remove("active");
                });

                item.classList.toggle("active");
            });
        }
    });
});


/* =========================
   SCROLL ANIMATION (MODERN)
========================= */
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("animate");
        }
    });
});

document.querySelectorAll(".animate-on-scroll")
    .forEach(el => observer.observe(el));


/* =========================
   BACK TO TOP PROGRESS RING
========================= */
const backToTop = document.getElementById("backToTop");

if (backToTop) {
    window.addEventListener("scroll", function () {
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrollPercent = (scrollTop / scrollHeight) * 100;

        backToTop.style.background =
            `conic-gradient(#ff7a00 ${scrollPercent}%, #2a2a2a ${scrollPercent}%)`;
    });

    backToTop.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
/* =========================
   SIDEBAR (STRONG VERSION)
========================= */
document.addEventListener("DOMContentLoaded", function () {

    const sidebarEl = document.getElementById("mobileSidebar");
    if (!sidebarEl) return;

    /* =========================
       LEVEL 1 MENU
    ========================= */
    const level1Headers = sidebarEl.querySelectorAll(".level-1");

    level1Headers.forEach(header => {
        header.addEventListener("click", function () {

            const menu = this.nextElementSibling; // FIX: correct menu
            if (!menu) return;

            const isOpen = menu.classList.contains("show");

            // Close all other menus
            sidebarEl.querySelectorAll(".level-1-menu").forEach(m => {
                if (m !== menu) m.classList.remove("show");
            });

            level1Headers.forEach(h => {
                if (h !== this) h.classList.remove("active");
            });

            // Toggle current
            menu.classList.toggle("show", !isOpen);
            this.classList.toggle("active", !isOpen);
        });
    });


    /* =========================
       LEVEL 2 MENU
    ========================= */
    const level2Headers = sidebarEl.querySelectorAll(".level-2");

    level2Headers.forEach(header => {
        header.addEventListener("click", function () {

            const submenu = this.nextElementSibling;
            if (!submenu) return;

            const isOpen = submenu.classList.contains("show");

            const parentMenu = this.closest(".level-1-menu");

            // Close siblings only (better UX)
            if (parentMenu) {
                parentMenu.querySelectorAll(".level-3-menu").forEach(menu => {
                    if (menu !== submenu) menu.classList.remove("show");
                });

                parentMenu.querySelectorAll(".level-2").forEach(h => {
                    if (h !== this) h.classList.remove("active");
                });

                parentMenu.querySelectorAll(".level-2 .arrow").forEach(a => {
                    a.style.transform = "rotate(-45deg)";
                });
            }

            // Toggle current
            submenu.classList.toggle("show", !isOpen);
            this.classList.toggle("active", !isOpen);

            const arrow = this.querySelector(".arrow");
            if (arrow) {
                arrow.style.transform = !isOpen
                    ? "rotate(45deg)"
                    : "rotate(-45deg)";
            }
        });
    });


    /* =========================
       AUTO CLOSE SIDEBAR
    ========================= */
    function closeSidebar() {

        // Bootstrap safe handling
        if (typeof bootstrap !== "undefined") {
            const instance = bootstrap.Offcanvas.getInstance(sidebarEl);
            if (instance) {
                instance.hide();
                return;
            }
        }

        // Fallback
        sidebarEl.classList.remove("show");
        sidebarEl.style.visibility = "hidden";

        document.body.classList.remove("offcanvas-open");
        document.body.style.overflow = "";

        const backdrop = document.querySelector(".offcanvas-backdrop");
        if (backdrop) backdrop.remove();
    }

    // Click links → close
    sidebarEl.querySelectorAll(".sidebar-link, .sidebar-submenu a").forEach(link => {
        link.addEventListener("click", closeSidebar);
    });

});

/* =========================
   MEGA MENU PREVIEW
========================= */
const previewImage = document.getElementById("previewImage");
const previewText = document.getElementById("previewText");
const previewCategory = document.getElementById("previewCategory");
const previewBtn = document.getElementById("previewBtn");

if (previewImage && previewText && previewCategory && previewBtn) {
    document.querySelectorAll(".preview-item").forEach(item => {
        item.addEventListener("mouseenter", () => {

            const img = item.dataset.img;
            const name = item.dataset.name;
            const category = item.dataset.category;
            const link = item.dataset.link;

            previewImage.style.opacity = 0;

            setTimeout(() => {
                previewImage.src = img;
                previewImage.style.opacity = 1;
            }, 150);

            previewText.innerText = name;
            previewCategory.innerText = category;
            previewBtn.href = link;
        });
    });
}