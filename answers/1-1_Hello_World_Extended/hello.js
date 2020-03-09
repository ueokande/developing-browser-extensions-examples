const modal = document.createElement("span");
modal.id = "modal";
modal.style.position = "absolute";
modal.style.top = "0";
modal.style.left = "0";
modal.style.right = "0";
modal.style.bottom = "0";
modal.style.backgroundColor = "rgba(0,0,0,0.5)";
modal.style.color = "white";
modal.style.fontSize = "5rem";
modal.style.textAlign = "center";
modal.style.padding = "9rem";
modal.style.fontWeight = "bold";
modal.style.textShadow = "0 0 4rem black";
modal.textContent = "Hello, world!";
document.body.appendChild(modal);

window.addEventListener("keydown", (event) => {
  const modal = document.getElementById("modal");
  modal.textContent = event.key;
})
