const aboutLink = document.getElementById("about");
const worksLink = document.getElementById("works");
const contactLink = document.getElementById("contact");
const homeLink = document.querySelector(".home");
const contentDisplay = document.querySelector(".content");
import { worksMenu } from "./content.js";
import { aboutText } from "./content.js";
import { splashPic } from "./content.js";

aboutLink.addEventListener("click", () => {
  contentDisplay.innerHTML = aboutText;
});

worksLink.addEventListener("click", () => {
  contentDisplay.innerHTML = worksMenu;
});
contactLink.addEventListener("click", () => {
  console.log("hi from contact");
});

addEventListener("load", () => {
  contentDisplay.innerHTML = splashPic;
});

homeLink.addEventListener("click", () => {
  contentDisplay.innerHTML = splashPic;
});
