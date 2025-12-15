const container = document.querySelector(".container");
const choices = document.querySelector(".choices");
const boutonQwerty = document.getElementById("bouton-qwerty");

let isQwerty = false;

// ici, je modifie chaque touche qui diffère entre un clavier Azerty et un Qwerty
const mappingAzertyToQwerty = {
  A: "Q",
  Z: "W",
  Q: "A",
  W: "Z",
  M: ";",
  ",": "M",
  ";": ",",
  ":": ".",
  "?": "/"
};
// même chose ici sauf qu'on le fait de Qwerty vers Azerty
const mappingQwertyToAzerty = {
  Q: "A",
  W: "Z",
  A: "Q",
  Z: "W",
  ";": "M",
  M: ",",
  ",": ";",
  ".": ":",
  "/": "?"
};
// cette fonction selectionne toutes les touches, sauf espace et delete et vérifie si cette touche est dans le mapping, si OUI elle modifie le data symbol par la valeur qui correspond
function switchLayout(mapping) {
  const keys = container.querySelectorAll("button.key:not(.space):not(.del)");
  keys.forEach(key => {
    const currentSymbol = key.dataset.symbol;
    if (mapping[currentSymbol]) {
      key.dataset.symbol = mapping[currentSymbol];
      key.textContent = mapping[currentSymbol];
    }
  });
}
// fonction pour modifier notre petit bouton
boutonQwerty.addEventListener("click", () => {
  if (!isQwerty) {
    switchLayout(mappingAzertyToQwerty);
    boutonQwerty.textContent = "Passer en AZERTY";
  } else {
    switchLayout(mappingQwertyToAzerty);
    boutonQwerty.textContent = "Passer en QWERTY";
  }
  isQwerty = !isQwerty;
});

container.addEventListener("click", (event) => {
  const key = event.target.closest(".container > button.key");
  if (!key) return;

  // brief visual feedback
  key.classList.add("pressed");
  setTimeout(() => key.classList.remove("pressed"), 800);

  const action = key.dataset.action;

  // Delete: remove exactly one character from the end
  if (action === "del") {
    const text = choices.textContent || "";
    if (!text) return;
    choices.textContent = text.slice(0, -1);
    return;
  }

  // Regular key: use the data-symbol from HTML (single source of truth)
  const symbol = key.dataset.symbol || key.textContent.trim() || "";
  if (!symbol) return;
  choices.appendChild(document.createTextNode(symbol));
});

