const selectors = {
  btnClear: "[data-click='clear']",
  rangeValue: "#rangeValue",
  dataMode: "[data-mode]",
  dataModeActive: ".active[data-mode]",
  rangeInput: "#range",
  mode: ".btn.active",
  canvas: ".canvas",
  color: "#color",
  filledElement: ".canvas [style*=background-color]",
};

const active = "active";

const rangeValue = document.querySelector(selectors.rangeValue);
const rangeInput = document.querySelector(selectors.rangeInput);
const dataMode = document.querySelectorAll(selectors.dataMode);
const canvas = document.querySelector(selectors.canvas);
const color = document.querySelector(selectors.color);
const btnClear = document.querySelector(selectors.btnClear);

function followTheRange() {
  rangeValue.textContent = `${rangeInput.value} x ${rangeInput.value}`;
}

function createPixels() {
  canvas.innerHTML = "";
  const n = Number(rangeInput.value);
  const size = n ** 2;
  const width = 100 / n;

  for (let i = 0; i < size; i++) {
    canvas.appendChild(createPixel(width));
  }
}

function createPixel(width) {
  const pixel = document.createElement("div");
  pixel.dataset.pixel = "true";
  pixel.style.width = `${width}%`;

  return pixel;
}

function drawing({ target }) {
  if (target.dataset.pixel == "true") {
    setPixel();

    target.dataset.pixel = "false";
    target.style.backgroundColor = getColor();
  }
}

function startDrawing() {
  canvas.addEventListener("mousemove", drawing);
}

function endDrawing() {
  canvas.removeEventListener("mousemove", drawing);

  setPixel();
}

function setPixel() {
  let pixel = canvas.querySelector("[data-pixel='false']");

  if (pixel) {
    pixel.dataset.pixel = "true";
  }
}

function getColor() {
  const mode = document.querySelector(selectors.mode);
  const colorMode = {
    standard: color.value,
    rainbow: getRandomColor(),
    eraser: "var(--canvas)",
  };

  if (colorMode.hasOwnProperty(mode.dataset.mode)) {
    return colorMode[mode.dataset.mode];
  }

  return "#ffffff";
}

function getRandomColor() {
  var letters = "6789ABCDEF"; // this way only light colors will be obtained
  var color = "#";

  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 10)];
  }

  return color;
}

function setButtonEvent(btn) {
  const btnActive = document.querySelector(selectors.dataModeActive);

  if (btnActive) {
    btnActive.classList.remove(active);
  }

  btn.classList.add(active);
}

function clearCanvas() {
  const filledElements = document.querySelectorAll(selectors.filledElement);

  if (!filledElements.length) return false;

  filledElements.forEach((element) => {
    element.style.backgroundColor = "";
  });
}

function start() {
  followTheRange();
  createPixels();

  rangeInput.addEventListener("change", createPixels);
  rangeInput.addEventListener("input", followTheRange);
  btnClear.addEventListener("click", clearCanvas);
  canvas.addEventListener("mousedown", startDrawing);
  canvas.addEventListener("mouseup", endDrawing);

  dataMode.forEach((btn) => {
    btn.addEventListener("click", () => setButtonEvent(btn));
  });
}

start();
