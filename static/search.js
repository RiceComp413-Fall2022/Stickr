const firstImageCanvas = document.querySelector("#firstImageCanvas");
const secondImageCanvas = document.querySelector("#secondImageCanvas");
const thirdImageCanvas = document.querySelector("#thirdImageCanvas");
const fourthImageCanvas = document.querySelector("#fourthImageCanvas");
const firstCanvasCtx = firstImageCanvas.getContext("2d");
const secondCanvasCtx = secondImageCanvas.getContext("2d");
const thirdCanvasCtx = thirdImageCanvas.getContext("2d");
const fourthCanvasCtx = fourthImageCanvas.getContext("2d");
const firstImage = new Image();
const secondImage = new Image();
const thirdImage = new Image();
const fourthImage = new Image();
let firstImageModalBtn = document.getElementById("openFirstImageModal");
let secondImageModalBtn = document.getElementById("openSecondImageModal");
let thirdImageModalBtn = document.getElementById("openThirdImageModal");
let fourthImageModalBtn = document.getElementById("openFourthImageModal");

function renderFirstImage() {
  firstImage.src = firstImageLoc;
  firstImageCanvas.width = firstImage.width;
  firstImageCanvas.height = firstImage.height;
  firstCanvasCtx.drawImage(firstImage, 0, 0);
}

function renderSecondImage() {
  secondImage.src = secondImageLoc;
  secondImageCanvas.width = secondImage.width;
  secondImageCanvas.height = secondImage.height;
  secondCanvasCtx.drawImage(secondImage, 0, 0);
}

function renderThirdImage() {
  thirdImage.src = thirdImageLoc;
  thirdImageCanvas.width = thirdImage.width;
  thirdImageCanvas.height = thirdImage.height;
  thirdCanvasCtx.drawImage(thirdImage, 0, 0);
}

function renderFourthImage() {
  fourthImage.src = fourthImageLoc;
  fourthImageCanvas.width = fourthImage.width;
  fourthImageCanvas.height = fourthImage.height;
  fourthCanvasCtx.drawImage(fourthImage, 0, 0);
}

firstImageModalBtn.addEventListener('click', event => {
  renderFirstImage();
});

secondImageModalBtn.addEventListener('click', event => {
  renderSecondImage();
});

thirdImageModalBtn.addEventListener('click', event => {
  renderThirdImage();
});

fourthImageModalBtn.addEventListener('click', event => {
  renderFourthImage();
});