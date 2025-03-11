const link = document.querySelector("navbar__list__item");

document.getElementById("contact-btn").onmouseover = function () {
  this.classList.add("glitch");
};
document.getElementById("github-btn").onmouseover = function () {
  this.classList.add("glitch");
};

document.getElementById("contact-btn").onmouseout = function () {
  this.classList.remove("glitch");
};
document.getElementById("github-btn").onmouseout = function () {
  this.classList.remove("glitch");
};
