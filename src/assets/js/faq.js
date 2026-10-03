(() => {

  const links = [
    ...document.querySelectorAll(".faq-index a")
  ];

  if (!links.length) {
    return;
  }


  const select = (hash) => {

    const current =
      links.find((link) => link.hash === hash)
      || links[0];


    links.forEach((link) => {

      if (link === current) {

        link.setAttribute(
          "aria-current",
          "location"
        );

      } else {

        link.removeAttribute(
          "aria-current"
        );

      }

    });

  };


  links.forEach((link) => {

    link.addEventListener(
      "click",
      () => select(link.hash)
    );

  });


  window.addEventListener(
    "hashchange",
    () => select(location.hash)
  );


  select(location.hash);

})();