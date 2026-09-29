/* ========================================
   Mobile Navigation
======================================== */

const menuButton =
  document.querySelector(".mobile-menu-button");

const navigation =
  document.querySelector(".primary-navigation");

const siteChrome =
  document.querySelector(".site-chrome");

const navLinks =
  document.querySelectorAll(".primary-navigation a");

const mobileBreakpoint =
  1120;


function updateMobileNavigationPosition() {

  if (!siteChrome) {
    return;
  }

  const chromeBottom =
    siteChrome.getBoundingClientRect().bottom;

  document.documentElement.style.setProperty(
    "--mobile-nav-top",
    `${Math.round(chromeBottom)}px`
  );

}


function openMenu() {

  if (!menuButton || !navigation) {
    return;
  }

  updateMobileNavigationPosition();

  navigation.classList.add("is-open");

  menuButton.classList.add("is-open");

  document.body.classList.add("menu-open");

  menuButton.setAttribute(
    "aria-expanded",
    "true"
  );

  menuButton.setAttribute(
    "aria-label",
    "Close navigation menu"
  );

}


function closeMenu() {

  if (!menuButton || !navigation) {
    return;
  }

  navigation.classList.remove("is-open");

  menuButton.classList.remove("is-open");

  document.body.classList.remove("menu-open");

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.setAttribute(
    "aria-label",
    "Open navigation menu"
  );

}


function toggleMenu() {

  const isOpen =
    navigation?.classList.contains("is-open");

  if (isOpen) {

    closeMenu();

  } else {

    openMenu();

  }

}


menuButton?.addEventListener(
  "click",
  toggleMenu
);


navLinks.forEach((link) => {

  link.addEventListener(
    "click",
    closeMenu
  );

});


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      navigation?.classList.contains("is-open")
    ) {

      closeMenu();

      menuButton?.focus();

    }

  }
);


window.addEventListener(
  "resize",
  () => {

    updateMobileNavigationPosition();

    if (
      window.innerWidth > mobileBreakpoint &&
      navigation?.classList.contains("is-open")
    ) {

      closeMenu();

    }

  }
);


if (
  siteChrome &&
  "ResizeObserver" in window
) {

  const chromeObserver =
    new ResizeObserver(
      updateMobileNavigationPosition
    );

  chromeObserver.observe(siteChrome);

}


updateMobileNavigationPosition();



/* ========================================
   Impact Number Animation
======================================== */

const impactNumbers =
  document.querySelectorAll(".impact-number");


function animateImpactNumber(element) {

  if (
    element.dataset.animated === "true"
  ) {
    return;
  }


  const finalValue =
    element.dataset.impactNumber;


  if (!finalValue) {
    return;
  }


  element.dataset.animated =
    "true";


  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (prefersReducedMotion) {

    element.textContent =
      finalValue;

    return;

  }


  const digitCount =
    finalValue.length;

  const duration =
    900;

  const updateInterval =
    45;

  const startTime =
    performance.now();

  let lastUpdate =
    0;


  function updateNumber(currentTime) {

    const elapsed =
      currentTime - startTime;


    if (
      currentTime - lastUpdate >=
      updateInterval
    ) {

      let randomNumber = "";


      for (
        let i = 0;
        i < digitCount;
        i++
      ) {

        randomNumber +=
          Math.floor(
            Math.random() * 10
          );

      }


      element.textContent =
        randomNumber;

      lastUpdate =
        currentTime;

    }


    if (elapsed < duration) {

      requestAnimationFrame(
        updateNumber
      );

    } else {

      element.textContent =
        finalValue;

    }

  }


  requestAnimationFrame(
    updateNumber
  );

}


if (impactNumbers.length) {

  const impactObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          animateImpactNumber(
            entry.target
          );


          observer.unobserve(
            entry.target
          );

        });

      },
      {
        threshold: 0.4
      }
    );


  impactNumbers.forEach(
    (number) => {

      impactObserver.observe(
        number
      );

    }
  );

}