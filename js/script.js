const aboutLink = document.getElementById("about");
const worksLink = document.getElementById("works");
const contactLink = document.getElementById("contact");
const homeLink = document.querySelector(".home");
const contentDisplay = document.querySelector(".content");
const contactDisplay = document.querySelector(".contact");

import { worksMenu } from "./content.js";
import { aboutText } from "./content.js";
import { splashPic } from "./content.js";

// About content
aboutLink.addEventListener("click", () => {
  contentDisplay.innerHTML = aboutText;
  contentDisplay.classList.remove("hidden");
  contactDisplay.classList.add("hidden");
});

// works content
worksLink.addEventListener("click", () => {
  contentDisplay.innerHTML = worksMenu;
  contentDisplay.classList.remove("hidden");
  contactDisplay.classList.add("hidden");
});

//contact content
contactLink.addEventListener("click", () => {
  contentDisplay.classList.add("hidden");
  contactDisplay.classList.remove("hidden");
});

// Splash pic in content onLoad
addEventListener("load", () => {
  contentDisplay.innerHTML = splashPic;
});

//home link (brings back splash)
homeLink.addEventListener("click", () => {
  contentDisplay.innerHTML = splashPic;
  contentDisplay.classList.remove("hidden");
  contactDisplay.classList.add("hidden");
});

// Text effect on mouseOver/mouseOut

// About
aboutLink.addEventListener("mouseover", () => {
  aboutLink.classList.add("link_glitch");
});
aboutLink.addEventListener("mouseout", () => {
  aboutLink.classList.remove("link_glitch");
});

//contact
contactLink.addEventListener("mouseover", () => {
  contactLink.classList.add("link_glitch");
});
contactLink.addEventListener("mouseout", () => {
  contactLink.classList.remove("link_glitch");
});

//works
worksLink.addEventListener("mouseover", () => {
  worksLink.classList.add("link_glitch");
});
worksLink.addEventListener("mouseout", () => {
  worksLink.classList.remove("link_glitch");
});
