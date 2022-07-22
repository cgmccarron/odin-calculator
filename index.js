const icon = document.getElementById("icon");
const content = document.querySelector(".content");
icon.addEventListener("click", () => {
  content.classList.toggle("darkTheme");
  if (content.classList.contains("darkTheme")) {
    icon.src = "./images/moon-icon.png";
  } else {
    icon.src = "./images/sun-icon.png";
  }
});
