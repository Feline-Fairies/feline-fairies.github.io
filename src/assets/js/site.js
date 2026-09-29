const menuButton =
  document.querySelector(".mobile-menu-button");

const navigation =
  document.querySelector(".primary-navigation");

const siteChrome =
  document.querySelector(".site-chrome");

const navLinks =
  document.querySelectorAll(".primary-navigation a");


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
      window.innerWidth > 900 &&
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