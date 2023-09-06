const selectors = {
  rangeValue: "#rangeValue",
  dataClick: "[data-click]",
  rangeInput: "#range",
  canvas: ".canvas",
  color: "#color",
};

const active = "active";

const rangeValue = document.querySelector(selectors.rangeValue);
const rangeInput = document.querySelector(selectors.rangeInput);
const dataClick = document.querySelectorAll(selectors.dataClick);
const canvas = document.querySelector(selectors.canvas);
const color = document.querySelector(selectors.color);

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

function start() {
  followTheRange();
  createPixels();

  rangeInput.addEventListener("change", createPixels);
  rangeInput.addEventListener("input", followTheRange);
  //   canvas.addEventListener("input", followTheRange);
}

start();
