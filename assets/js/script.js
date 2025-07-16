{
  document.addEventListener("DOMContentLoaded", function () {
    const swiperWrapper = document.querySelector(
      ".listIconSlider .swiper-wrapper"
    );
    const slide = swiperWrapper.querySelector(".swiper-slide");

    if (slide) {
      for (let i = 0; i < 10; i++) {
        let clone = slide.cloneNode(true);
        swiperWrapper.appendChild(clone);
      }
    }

    var swiper = new Swiper(".listIconSlider", {
      slidesPerView: "auto",
      loop: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      speed: 5500,
      breakpoints: {
        150: {
          spaceBetween: 15,
        },
        576: {
          spaceBetween: 20,
        },
        769: {
          spaceBetween: 30,
        },
        1025: {
          spaceBetween: 35,
        },
      },
    });
  });
}
