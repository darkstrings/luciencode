const aboutLink = document.getElementById("about");
const worksLink = document.getElementById("works");
const contactLink = document.getElementById("contact");
const homeLink = document.querySelector(".home");
const contentDisplay = document.querySelector(".content");
const contactDisplay = document.querySelector(".contact");

import { worksMenu } from "./content.js";
import { aboutText } from "./content.js";
import { splashPic } from "./content.js";

aboutLink.addEventListener("click", () => {
  contentDisplay.innerHTML = aboutText;
  contentDisplay.classList.remove("hidden");
  contactDisplay.classList.add("hidden");
});

worksLink.addEventListener("click", () => {
  contentDisplay.innerHTML = worksMenu;
  contentDisplay.classList.remove("hidden");
  contactDisplay.classList.add("hidden");
});

contactLink.addEventListener("click", () => {
  contentDisplay.classList.add("hidden");
  contactDisplay.classList.remove("hidden");
});

addEventListener("load", () => {
  contentDisplay.innerHTML = splashPic;
});

homeLink.addEventListener("click", () => {
  contentDisplay.innerHTML = splashPic;
  contentDisplay.classList.remove("hidden");
  contactDisplay.classList.add("hidden");
});
