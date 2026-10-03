/* ========================================
   Feline Fairies
   Global Site JavaScript
======================================== */


/* ========================================
   Header + Navigation
======================================== */

(() => {

  const header =
    document.querySelector(
      ".site-header"
    );

  const announcement =
    document.querySelector(
      ".announcement"
    );

  const nav =
    document.querySelector(
      "#site-navigation"
    );

  const toggle =
    document.querySelector(
      ".nav-toggle"
    );

  const donate =
    header?.querySelector(
      ".header-donate"
    );

  const headerInner =
    header?.querySelector(
      ".header-inner"
    );


  if (
    !header ||
    !nav ||
    !toggle ||
    !donate ||
    !headerInner
  ) {

    return;

  }


  /*
   * The hamburger already exists in the HTML.
   * JavaScript only activates it.
   */

  toggle.hidden =
    false;


  document.documentElement
    .classList
    .add(
      "menu-enhanced"
    );


  const compact =
    window.matchMedia(
      "(max-width: 1150px)"
    );


  const branch =
    nav.querySelector(
      ".nav-branch"
    );

  const submenuToggle =
    branch?.querySelector(
      ".submenu-toggle"
    );

  const submenu =
    branch?.querySelector(
      ".nav-submenu"
    );


  /* ========================================
     Get Involved Submenu
  ======================================== */

  function setSubmenu(open) {

    if (
      !submenu ||
      !submenuToggle
    ) {

      return;

    }


    submenu.hidden =
      !open;


    submenuToggle.setAttribute(
      "aria-expanded",
      String(open)
    );


    submenuToggle.setAttribute(
      "aria-label",
      `${
        open
          ? "Collapse"
          : "Expand"
      } Get Involved options`
    );

  }


  submenuToggle?.addEventListener(
    "click",
    () => {

      const open =
        submenuToggle.getAttribute(
          "aria-expanded"
        ) !== "true";


      setSubmenu(open);

    }
  );


  branch?.addEventListener(
    "pointerenter",
    (event) => {

      if (
        !compact.matches &&
        event.pointerType === "mouse"
      ) {

        setSubmenu(true);

      }

    }
  );


  branch?.addEventListener(
    "pointerleave",
    () => {

      if (
        !compact.matches &&
        !branch.contains(
          document.activeElement
        )
      ) {

        setSubmenu(false);

      }

    }
  );


  branch?.addEventListener(
    "focusin",
    (event) => {

      const parentLink =
        branch.querySelector(
          ".nav-branch__row > a"
        );


      if (
        !compact.matches &&
        event.target === parentLink
      ) {

        setSubmenu(true);

      }

    }
  );


  branch?.addEventListener(
    "focusout",
    (event) => {

      if (
        !compact.matches &&
        !branch.contains(
          event.relatedTarget
        )
      ) {

        setSubmenu(false);

      }

    }
  );


  document.addEventListener(
    "click",
    (event) => {

      if (
        !branch?.contains(
          event.target
        )
      ) {

        setSubmenu(false);

      }

    }
  );


  /* ========================================
     Measurements
  ======================================== */

  function updateMeasurements() {

    const announcementHeight =
      announcement
        ? announcement
            .getBoundingClientRect()
            .height
        : 0;


    document.documentElement
      .style
      .setProperty(
        "--announcement-height",
        `${announcementHeight}px`
      );


    const menuTop =
      Math.max(
        0,
        headerInner
          .getBoundingClientRect()
          .bottom
      );


    document.documentElement
      .style
      .setProperty(
        "--menu-top",
        `${menuTop}px`
      );

  }


  /* ========================================
     Condensed Header
  ======================================== */

  let scrollFrame =
    0;


  function updateStickyState() {

    /*
     * Keep the mobile header the same height.
     * Only tablet/desktop gets the subtle
     * condensed state.
     */

    if (
      window.innerWidth <= 700
    ) {

      header.classList.remove(
        "is-condensed"
      );

      return;

    }


    const threshold =
      announcement
        ? announcement.offsetHeight
        : 0;


    const condensed =
      header.classList.contains(
        "is-condensed"
      );


    if (
      !condensed &&
      window.scrollY >
        threshold + 8
    ) {

      header.classList.add(
        "is-condensed"
      );

      updateMeasurements();

    } else if (
      condensed &&
      window.scrollY <
        Math.max(
          0,
          threshold - 8
        )
    ) {

      header.classList.remove(
        "is-condensed"
      );

      updateMeasurements();

    }

  }


  function scheduleStickyUpdate() {

    if (scrollFrame) {

      return;

    }


    scrollFrame =
      requestAnimationFrame(
        () => {

          scrollFrame =
            0;

          updateStickyState();

        }
      );

  }


  /* ========================================
     Mobile Menu
  ======================================== */

  let previousFocus =
    null;


  function closeMenu(
    restoreFocus = true
  ) {

    setSubmenu(false);


    const wasOpen =
      toggle.getAttribute(
        "aria-expanded"
      ) === "true";


    toggle.setAttribute(
      "aria-expanded",
      "false"
    );

    toggle.setAttribute(
      "aria-label",
      "Open menu"
    );


    nav.classList.remove(
      "is-open"
    );


    document.documentElement
      .classList
      .remove(
        "menu-open"
      );


    document
      .querySelector(
        "main"
      )
      ?.removeAttribute(
        "inert"
      );


    document
      .querySelector(
        "footer"
      )
      ?.removeAttribute(
        "inert"
      );


    if (compact.matches) {

      nav.setAttribute(
        "aria-hidden",
        "true"
      );

      nav.inert =
        true;

    } else {

      nav.removeAttribute(
        "aria-hidden"
      );

      nav.inert =
        false;

    }


    if (
      restoreFocus &&
      wasOpen
    ) {

      const focusTarget =
        previousFocus?.isConnected
          ? previousFocus
          : toggle;


      focusTarget.focus({
        preventScroll:
          true
      });

    }

  }


  function openMenu() {

    previousFocus =
      document.activeElement;


    updateMeasurements();


    nav.classList.add(
      "is-open"
    );


    nav.removeAttribute(
      "aria-hidden"
    );


    nav.inert =
      false;


    toggle.setAttribute(
      "aria-expanded",
      "true"
    );


    toggle.setAttribute(
      "aria-label",
      "Close menu"
    );


    document.documentElement
      .classList
      .add(
        "menu-open"
      );


    document
      .querySelector(
        "main"
      )
      ?.setAttribute(
        "inert",
        ""
      );


    document
      .querySelector(
        "footer"
      )
      ?.setAttribute(
        "inert",
        ""
      );


    nav
      .querySelector(
        "a"
      )
      ?.focus({
        preventScroll:
          true
      });

  }


  toggle.addEventListener(
    "click",
    () => {

      const isOpen =
        toggle.getAttribute(
          "aria-expanded"
        ) === "true";


      if (isOpen) {

        closeMenu();

      } else {

        openMenu();

      }

    }
  );


  nav.addEventListener(
    "click",
    (event) => {

      /*
       * Clicking the Get Involved chevron
       * should expand the submenu instead
       * of closing the entire mobile menu.
       */

      if (
        event.target.closest(
          ".submenu-toggle"
        )
      ) {

        return;

      }


      if (
        event.target.closest(
          "a"
        ) &&
        compact.matches
      ) {

        closeMenu(false);

      }

    }
  );


  /* ========================================
     Responsive Navigation
  ======================================== */

  function syncNavigation() {

    setSubmenu(false);

    closeMenu(false);


    if (compact.matches) {

      /*
       * Place the menu immediately after
       * the sticky header so it can fill
       * the remaining viewport.
       */

      header.insertAdjacentElement(
        "afterend",
        nav
      );


      nav.appendChild(
        donate
      );


      nav.setAttribute(
        "aria-hidden",
        "true"
      );


      nav.inert =
        true;

    } else {

      /*
       * Restore normal desktop structure.
       */

      headerInner.appendChild(
        nav
      );


      headerInner.appendChild(
        donate
      );


      nav.removeAttribute(
        "aria-hidden"
      );


      nav.inert =
        false;

    }


    updateStickyState();

    updateMeasurements();

  }


  /* ========================================
     Keyboard Support
  ======================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      /*
       * Desktop submenu Escape behavior.
       */

      if (
        event.key === "Escape" &&
        !compact.matches &&
        submenuToggle?.getAttribute(
          "aria-expanded"
        ) === "true"
      ) {

        event.preventDefault();

        setSubmenu(false);


        submenuToggle.focus({
          preventScroll:
            true
        });


        return;

      }


      /*
       * Everything below applies only
       * while the mobile menu is open.
       */

      if (
        toggle.getAttribute(
          "aria-expanded"
        ) !== "true"
      ) {

        return;

      }


      if (
        event.key === "Escape"
      ) {

        event.preventDefault();

        closeMenu();

        return;

      }


      /*
       * Keep keyboard focus inside the
       * open mobile navigation.
       */

      if (
        event.key === "Tab"
      ) {

        const focusables = [

          toggle,

          ...[
            ...nav.querySelectorAll(
              "a, button"
            )
          ].filter(
            (element) =>
              element
                .getClientRects()
                .length > 0
          )

        ];


        const first =
          focusables[0];


        const last =
          focusables[
            focusables.length - 1
          ];


        if (
          event.shiftKey &&
          document.activeElement ===
            first
        ) {

          event.preventDefault();

          last.focus();

        } else if (
          !event.shiftKey &&
          document.activeElement ===
            last
        ) {

          event.preventDefault();

          first.focus();

        }

      }

    }
  );


  /* ========================================
     Responsive Listeners
  ======================================== */

  if (
    typeof compact.addEventListener ===
    "function"
  ) {

    compact.addEventListener(
      "change",
      syncNavigation
    );

  }


  window.addEventListener(
    "scroll",
    scheduleStickyUpdate,
    {
      passive:
        true
    }
  );


  window.addEventListener(
    "resize",
    updateMeasurements,
    {
      passive:
        true
    }
  );


  if (
    "ResizeObserver" in
    window
  ) {

    const sizes =
      new ResizeObserver(
        updateMeasurements
      );


    if (announcement) {

      sizes.observe(
        announcement
      );

    }


    sizes.observe(
      headerInner
    );

  }


  syncNavigation();

})();



/* ========================================
   Impact Number Animation
======================================== */

const impactNumbers =
  document.querySelectorAll(
    ".impact-number"
  );


function animateImpactNumber(
  element
) {

  if (
    element.dataset.animated ===
    "true"
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


  function updateNumber(
    currentTime
  ) {

    const elapsed =
      currentTime -
      startTime;


    if (
      currentTime -
        lastUpdate >=
      updateInterval
    ) {

      let randomNumber =
        "";


      for (
        let i = 0;
        i < digitCount;
        i++
      ) {

        randomNumber +=
          Math.floor(
            Math.random() *
            10
          );

      }


      element.textContent =
        randomNumber;


      lastUpdate =
        currentTime;

    }


    if (
      elapsed <
      duration
    ) {

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


if (
  impactNumbers.length
) {

  const prefersReducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    prefersReducedMotion ||
    !(
      "IntersectionObserver" in
      window
    )
  ) {

    impactNumbers.forEach(
      (number) => {

        number.textContent =
          number.dataset
            .impactNumber ||
          number.textContent;

      }
    );

  } else {

    const impactObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              animateImpactNumber(
                entry.target
              );


              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold:
            0.4
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

}