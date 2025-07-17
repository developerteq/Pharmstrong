{
  const lenis = new Lenis({
    duration: 2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

{
  function forFaq() {
    const accordionSections = document.querySelectorAll(".faqInnerHldr");

    accordionSections.forEach((section) => {
      const accordionItemHeaders = section.querySelectorAll(
        ".accordion-item-header"
      );

      if (accordionItemHeaders.length > 0) {
        const firstAccordionItemHeader = accordionItemHeaders[0];
        const firstAccordionItemBody =
          firstAccordionItemHeader.nextElementSibling;

        firstAccordionItemHeader.classList.add("active");
        firstAccordionItemBody.style.maxHeight =
          firstAccordionItemBody.scrollHeight + "px";
      }

      accordionItemHeaders.forEach((accordionItemHeader) => {
        accordionItemHeader.addEventListener("click", (event) => {
          const accordionItemBody = accordionItemHeader.nextElementSibling;
          accordionItemHeaders.forEach((item) => {
            if (item !== accordionItemHeader) {
              item.classList.remove("active");
              item.nextElementSibling.style.maxHeight = 0;
            }
          });
          accordionItemHeader.classList.toggle("active");
          if (accordionItemHeader.classList.contains("active")) {
            accordionItemBody.style.maxHeight =
              accordionItemBody.scrollHeight + "px";
          } else {
            accordionItemBody.style.maxHeight = 0;
          }
        });
      });
    });
  }
  forFaq();
}

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
          spaceBetween: 20,
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
