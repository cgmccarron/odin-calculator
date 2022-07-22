const icon = document.getElementById("icon");
const content = document.querySelector(".content");

icon.addEventListener("click", () => {
  //This is the toggle between light and dark themes
  content.classList.toggle("darkTheme");
  //This switches the icon of sun to moon and visa versa
  if (content.classList.contains("darkTheme")) {
    icon.src = "./images/moon-icon.png";
  } else {
    icon.src = "./images/sun-icon.png";
  }
});
