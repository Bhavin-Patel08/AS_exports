(function ($) {
    "use strict";

    /* =========================
       PAGE LOADING SPINNER
    ========================= */
    // Hide the loading spinner once the page is ready
   var spinner = function () {
    window.addEventListener("load", function () {
        var spinner = document.getElementById("spinner");
        if (spinner) {
            spinner.classList.remove("show");
        }
    });
};
spinner(); 


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
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

      // Close other items
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove("active");
        }
      });

      // Toggle current item
      item.classList.toggle("active");
    });
  });
});

new WOW({
  offset: 80,
  mobile: false,
  live: false
}).init();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
});

document.querySelectorAll(".animate-on-scroll")
.forEach(el => observer.observe(el));


const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {
        let scrollTop = document.documentElement.scrollTop;
        let scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrollPercent = (scrollTop / scrollHeight) * 100;

        backToTop.style.background =
            `conic-gradient(#ff7a00 ${scrollPercent}%, #2a2a2a ${scrollPercent}%)`;
    });

    backToTop.addEventListener("click", function(e){
        e.preventDefault();
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    });

}

/* LEVEL 1 (Products) */
document.querySelectorAll(".level-1").forEach(header => {
  header.addEventListener("click", function () {

    let menu = document.querySelector(".level-1-menu");
    const isOpen = menu.classList.contains("show");

    document.querySelectorAll(".level-1").forEach(h => h.classList.remove("active"));

    if (isOpen) {
      menu.classList.remove("show");
      this.classList.remove("active");
    } else {
      menu.classList.add("show");
      this.classList.add("active");
    }

  });
});


/* ✅ LEVEL 2 (Category + Arrow FIXED) */
document.querySelectorAll(".level-2").forEach(header => {
  header.addEventListener("click", function () {

    let submenu = this.nextElementSibling;
    const isOpen = submenu.classList.contains("show");

    // CLOSE ALL
    document.querySelectorAll(".level-3-menu").forEach(menu => {
      menu.classList.remove("show");
    });

    document.querySelectorAll(".level-2").forEach(h => {
      h.classList.remove("active");
    });

    document.querySelectorAll(".level-2 .arrow").forEach(a => {
      a.style.transform = "rotate(-45deg)";
    });

    // OPEN CURRENT
    if (!isOpen) {
      submenu.classList.add("show");
      this.classList.add("active");

      const arrow = this.querySelector(".arrow");
      arrow.style.transform = "rotate(45deg)";
    }

  });
});


/* AUTO CLOSE SIDEBAR */
document.querySelectorAll(".sidebar-link, .sidebar-submenu a").forEach(link => {
  link.addEventListener("click", () => {
    let sidebar = bootstrap.Offcanvas.getInstance(document.getElementById('mobileSidebar'));
    if (sidebar) sidebar.hide();
  });
});

const previewImage = document.getElementById("previewImage");
const previewText = document.getElementById("previewText");
const previewCategory = document.getElementById("previewCategory");
const previewBtn = document.getElementById("previewBtn");

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
