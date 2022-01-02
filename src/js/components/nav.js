const navList = document.querySelector(".nav__list");

navList.addEventListener("click", (e) => {
  e.preventDefault();
  const headerHeight = document
    .querySelector(".header")
    .getBoundingClientRect().height;
  console.log(headerHeight);
  const source = e.target;
  const navLink = source.closest(".nav__link");

  if (navLink && /^#\w+/.test(navLink.hash)) {
    const target = document.querySelector(navLink.hash);

    const targetTop =
      target.getBoundingClientRect().top - headerHeight + window.pageYOffset;

    console.log(targetTop);

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  }
});
