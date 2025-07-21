{
  AOS.init({ duration: 650 });
}
// {
//   const lenis = new Lenis({
//     duration: 0.1,
//     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//   });
//   function raf(time) {
//     lenis.raf(time);
//     requestAnimationFrame(raf);
//   }
//   requestAnimationFrame(raf);
// }

// Section by Section Scroll Without Sticky
// {
//   gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

//   const panels = gsap.utils.toArray(".videoRowScript");
//   let currentIndex = 0;
//   let isScrolling = false;
//   let snapScrollEnabled = false;

//   // Activate snap scroll when first .videoRowScript enters
//   ScrollTrigger.create({
//     trigger: panels[0],
//     start: "top 10%", // or "top 5%" for more strict trigger
//     end: "center center",
//     onEnter: () => {
//       snapScrollEnabled = true;
//     },
//     onLeaveBack: () => {
//       snapScrollEnabled = false;
//     },
//   });

//   // Track when we are past the last section to disable snapping
//   ScrollTrigger.create({
//     trigger: panels[panels.length - 1],
//     start: "bottom bottom",
//     onEnter: () => {
//       snapScrollEnabled = false;
//     },
//     onLeaveBack: () => {
//       snapScrollEnabled = true;
//     },
//   });

//   function goToPanel(index) {
//     if (index < 0 || index >= panels.length || isScrolling) return;

//     isScrolling = true;
//     gsap.to(window, {
//       duration: 1,
//       scrollTo: { y: panels[index], autoKill: false },
//       onComplete: () => {
//         isScrolling = false;
//         currentIndex = index;
//       },
//     });
//   }

//   // Wheel listener: only trigger snap scroll between sections
//   window.addEventListener(
//     "wheel",
//     (e) => {
//       if (!snapScrollEnabled || isScrolling) return;

//       const direction = e.deltaY > 0 ? 1 : -1;
//       const newIndex = currentIndex + direction;

//       if (newIndex < 0 || newIndex >= panels.length) {
//         // Allow default scroll at boundaries
//         return;
//       }

//       e.preventDefault(); // Hijack only within active area
//       goToPanel(newIndex);
//     },
//     { passive: false }
//   );
// }

gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray(".videoRowScript");
let currentIndex = 0;
let isAnimating = false;
let snapScrollEnabled = false;

// Enable snap when first panel is mostly in view
ScrollTrigger.create({
  trigger: panels[0],
  start: "top 10%",
  onEnter: () => (snapScrollEnabled = true),
  onLeaveBack: () => (snapScrollEnabled = false),
});

// Disable snap after last panel scrolls out
ScrollTrigger.create({
  trigger: panels[panels.length - 1],
  start: "bottom bottom",
  onEnter: () => (snapScrollEnabled = false),
  onLeaveBack: () => (snapScrollEnabled = true),
});

// Setup all panels initially
gsap.set(panels, { autoAlpha: 0 });
gsap.set(panels[0], { autoAlpha: 1 }); // Show first section

function fadeToPanel(index) {
  if (index < 0 || index >= panels.length || isAnimating) return;

  isAnimating = true;

  const current = panels[currentIndex];
  const next = panels[index];

  const tl = gsap.timeline({
    onComplete: () => {
      currentIndex = index;
      isAnimating = false;
    },
  });

  tl.to(current, { autoAlpha: 0, duration: 0.4 }).to(
    next,
    { autoAlpha: 1, duration: 0.4 },
    "<"
  );
}

// Listen for wheel events
window.addEventListener(
  "wheel",
  (e) => {
    if (!snapScrollEnabled || isAnimating) return;

    const direction = e.deltaY > 0 ? 1 : -1;
    const nextIndex = currentIndex + direction;

    if (nextIndex < 0 || nextIndex >= panels.length) return;

    e.preventDefault();
    fadeToPanel(nextIndex);
  },
  { passive: false }
);

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
