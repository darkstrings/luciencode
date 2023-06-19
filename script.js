const aboutLink = document.getElementById("about");
const worksLink = document.getElementById("works");
const contactLink = document.getElementById("contact");
const content = document.querySelector(".content");

aboutLink.addEventListener("click", () => {
  content.innerHTML = `<p>Hello!</p><p>My name is Lucien and I've had an associates degree in Web Development since 2005 and after a long stint working in other facets of IT (internet marketing assitance, desktop support and E-Mail server management) and most recently a guitar technician for eight years, I have decided to dedicate myself to returning to it.</p><p>I've spent some time away from it but the journey back has been a challenging yet rewarding path that I'll continue to walk and I look forward to doing so as part of a team.</p>`;
});
worksLink.addEventListener("click", () => {
  content.innerHTML = `<p>The journey so far</p>`;
});
contactLink.addEventListener("click", () => {
  console.log("hi from contact");
});
