{
  AOS.init({ duration: 650 });
}
// Section by Section Scroll Fade Effect With Tiny Animation

if (window.matchMedia("(min-width: 1026px)").matches) {
  gsap.registerPlugin(ScrollTrigger);

  // 1. FIRST ENSURE PERFECT VIEWPORT FIT
  const section = document.querySelector(".videoSect");
  section.style.height = "100vh";
  section.style.overflow = "hidden";

  // Set all panels to fill container
  const panels = gsap.utils.toArray(".videoSect .videoRowScript");
  panels.forEach((panel) => {
    panel.style.position = "absolute";
    panel.style.top = "0";
    panel.style.left = "0";
    panel.style.width = "100%";
    panel.style.height = "100%";
  });

  // 2. ORIGINAL ANIMATION CODE WITH IMPROVEMENTS
  let allowScroll = true;
  let scrollTimeout = gsap
    .delayedCall(0.25, () => (allowScroll = true))
    .pause();
  let currentIndex = 0;
  let swipePanels = gsap.utils.toArray(".videoSect .videoRowScript");

  // Initialize panel states
  gsap.set(swipePanels, {
    zIndex: (i) => swipePanels.length - i,
    opacity: (i) => (i === 0 ? 1 : 0), // Only first panel visible
  });

  let intentObserver = ScrollTrigger.observe({
    type: "wheel,touch",
    onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
    onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
    tolerance: 10,
    preventDefault: true,
    onEnable(self) {
      allowScroll = false;
      scrollTimeout.restart(true);
      let savedScroll = window.scrollY;
      self._restoreScroll = () => window.scrollTo(0, savedScroll);
      window.addEventListener("scroll", self._restoreScroll);
    },
    onDisable: (self) => {
      window.removeEventListener("scroll", self._restoreScroll);
    },
  });
  intentObserver.disable();

  function gotoPanel(index, isScrollingDown) {
    // Boundary checks
    if (
      (index >= swipePanels.length && isScrollingDown) ||
      (index < 0 && !isScrollingDown)
    ) {
      // Add bounce effect at boundaries
      gsap.fromTo(
        swipePanels[currentIndex],
        { y: 0 },
        { y: 20, duration: 0.3, ease: "elastic.out(1, 0.5)", yoyo: true }
      );
      intentObserver.disable();
      return;
    }

    if (index < 0 || index >= swipePanels.length) return;

    allowScroll = false;
    scrollTimeout.restart(true);

    let currentPanel = swipePanels[currentIndex];
    let targetPanel = swipePanels[index];
    let direction = index > currentIndex ? 1 : -1;

    // Enhanced animation with direction-based movement
    gsap.to(currentPanel, {
      opacity: 0,
      y: -50 * direction,
      duration: 0.75,
      ease: "power2.out",
    });

    gsap.fromTo(
      targetPanel,
      {
        opacity: 0,
        y: 50 * direction,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: "power2.out",
      }
    );

    currentIndex = index;
  }

  // 3. SCROLLTRIGGER SETUP WITH FIT MAINTAINANCE
  ScrollTrigger.create({
    trigger: ".videoSect",
    pin: true,
    start: "top top",
    end: "bottom bottom",
    onEnter: (self) => {
      if (intentObserver.isEnabled) return;
      window.scrollTo(0, self.start + 1);
      intentObserver.enable();
    },
    onEnterBack: (self) => {
      if (intentObserver.isEnabled) return;
      window.scrollTo(0, self.end - 1);
      intentObserver.enable();
    },
    onRefresh: () => {
      // Maintain fit during resize
      section.style.height = window.innerHeight + "px";
    },
  });

  // 4. RESIZE HANDLER
  window.addEventListener("resize", () => {
    section.style.height = window.innerHeight + "px";
    ScrollTrigger.refresh();
  });
}

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

// {
//   gsap.registerPlugin(ScrollTrigger);

//   const panels = gsap.utils.toArray(".videoRowScript");
//   let currentIndex = 0;
//   let isAnimating = false;
//   let snapScrollEnabled = false;

//   // Enable snap when first panel is mostly in view
//   ScrollTrigger.create({
//     trigger: panels[0],
//     start: "top 10%",
//     onEnter: () => (snapScrollEnabled = true),
//     onLeaveBack: () => (snapScrollEnabled = false),
//   });

//   // Disable snap after last panel scrolls out
//   ScrollTrigger.create({
//     trigger: panels[panels.length - 1],
//     start: "bottom bottom",
//     onEnter: () => (snapScrollEnabled = false),
//     onLeaveBack: () => (snapScrollEnabled = true),
//   });

//   // Setup all panels initially
//   gsap.set(panels, { autoAlpha: 0 });
//   gsap.set(panels[0], { autoAlpha: 1 }); // Show first section

//   function fadeToPanel(index) {
//     if (index < 0 || index >= panels.length || isAnimating) return;

//     isAnimating = true;

//     const current = panels[currentIndex];
//     const next = panels[index];

//     const tl = gsap.timeline({
//       onComplete: () => {
//         currentIndex = index;
//         isAnimating = false;
//       },
//     });

//     tl.to(current, { autoAlpha: 0, duration: 0.4 }).to(
//       next,
//       { autoAlpha: 1, duration: 0.4 },
//       "<"
//     );
//   }

//   // Listen for wheel events
//   window.addEventListener(
//     "wheel",
//     (e) => {
//       if (!snapScrollEnabled || isAnimating) return;

//       const direction = e.deltaY > 0 ? 1 : -1;
//       const nextIndex = currentIndex + direction;

//       if (nextIndex < 0 || nextIndex >= panels.length) return;

//       e.preventDefault();
//       fadeToPanel(nextIndex);
//     },
//     { passive: false }
//   );
// }

// Script For Section by Section Fade Effects
// if (window.matchMedia("(min-width: 1026px)").matches) {
//   gsap.registerPlugin(ScrollTrigger);

//   let allowScroll = true;
//   let scrollTimeout = gsap
//     .delayedCall(0.25, () => (allowScroll = true))
//     .pause();
//   let currentIndex = 0;
//   let swipePanels = gsap.utils.toArray(".videoSect .videoRowScript");

//   gsap.set(swipePanels, { zIndex: (i) => swipePanels.length - i });

//   let intentObserver = ScrollTrigger.observe({
//     type: "wheel,touch",
//     onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
//     onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
//     tolerance: 10,
//     preventDefault: true,
//     onEnable(self) {
//       allowScroll = false;
//       scrollTimeout.restart(true);
//       let savedScroll = self.scrollY();
//       self._restoreScroll = () => self.scrollY(savedScroll);
//       document.addEventListener("scroll", self._restoreScroll, {
//         passive: true,
//       });
//     },
//     onDisable: (self) =>
//       document.removeEventListener("scroll", self._restoreScroll),
//   });
//   intentObserver.disable();

//   function gotoPanel(index, isScrollingDown) {
//     if (
//       (index === swipePanels.length && isScrollingDown) ||
//       (index === -1 && !isScrollingDown)
//     ) {
//       intentObserver.disable();
//       return;
//     }
//     allowScroll = false;
//     scrollTimeout.restart(true);

//     let currentPanel = swipePanels[currentIndex];
//     let targetPanel = swipePanels[index];

//     gsap.set(currentPanel, { opacity: 1 });
//     gsap.set(targetPanel, { opacity: 0 });

//     gsap.to(currentPanel, { opacity: 0, duration: 0.75 });
//     gsap.to(targetPanel, { opacity: 1, duration: 0.75 });

//     currentIndex = index;
//   }

//   ScrollTrigger.create({
//     trigger: ".videoSect",
//     pin: true,
//     start: "top top",
//     // end: "+=100",
//     onEnter: (self) => {
//       if (intentObserver.isEnabled) return;
//       self.scroll(self.start + 1);
//       intentObserver.enable();
//     },
//     onEnterBack: (self) => {
//       if (intentObserver.isEnabled) return;
//       self.scroll(self.end - 1);
//       intentObserver.enable();
//     },
//   });
// }

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
