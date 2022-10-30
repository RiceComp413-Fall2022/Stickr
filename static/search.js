const firstImageCanvas = document.querySelector("#firstImageCanvas");
const secondImageCanvas = document.querySelector("#secondImageCanvas");
const thirdImageCanvas = document.querySelector("#thirdImageCanvas");
const fourthImageCanvas = document.querySelector("#fourthImageCanvas");
const firstImageBrightnessInput = document.querySelector("#brightnessFirstImage");
const secondImageBrightnessInput = document.querySelector("#brightnessSecondImage");
const thirdImageBrightnessInput = document.querySelector("#brightnessThirdImage");
const fourthImageBrightnessInput = document.querySelector("#brightnessFourthImage");
const firstImageSaturationInput = document.querySelector("#saturationFirstImage");
const secondImageSaturationInput = document.querySelector("#saturationSecondImage");
const thirdImageSaturationInput = document.querySelector("#saturationThirdImage");
const fourthImageSaturationInput = document.querySelector("#saturationFourthImage");
const firstImageBlurInput = document.querySelector("#blurFirstImage");
const secondImageBlurInput = document.querySelector("#blurSecondImage");
const thirdImageBlurInput = document.querySelector("#blurThirdImage");
const fourthImageBlurInput = document.querySelector("#blurFourthImage");
const firstImageInversionInput = document.querySelector("#inversionFirstImage");
const secondImageInversionInput = document.querySelector("#inversionSecondImage");
const thirdImageInversionInput = document.querySelector("#inversionThirdImage");
const fourthImageInversionInput = document.querySelector("#inversionFourthImage");

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
let currFirstImage = document.getElementById("firstImage");
let currSecondImage = document.getElementById("secondImage");
let currThirdImage = document.getElementById("thirdImage");
let currFourthImage = document.getElementById("fourthImage");
let firstImageSaveBtn = document.getElementById("firstImageSave");
let secondImageSaveBtn = document.getElementById("secondImageSave");
let thirdImageSaveBtn = document.getElementById("thirdImageSave");
let fourthImageSaveBtn = document.getElementById("fourthImageSave");
const firstImageSettings = {};
const secondImageSettings = {};
const thirdImageSettings = {};
const fourthImageSettings = {};

function resetFirstImageSettings() {
  firstImageSettings.brightness = "100";
  firstImageSettings.saturation = "100";
  firstImageSettings.blur = "0";
  firstImageSettings.inversion = "0";

  firstImageBrightnessInput.value = firstImageSettings.brightness;
  firstImageSaturationInput.value = firstImageSettings.saturation;
  firstImageBlurInput.value = firstImageSettings.blur;
  firstImageInversionInput.value = firstImageSettings.inversion;
}

function resetSecondImageSettings() {
  secondImageSettings.brightness = "100";
  secondImageSettings.saturation = "100";
  secondImageSettings.blur = "0";
  secondImageSettings.inversion = "0";

  secondImageBrightnessInput.value = secondImageSettings.brightness;
  secondImageSaturationInput.value = secondImageSettings.saturation;
  secondImageBlurInput.value = secondImageSettings.blur;
  secondImageInversionInput.value = secondImageSettings.inversion;
}

function resetThirdImageSettings() {
  thirdImageSettings.brightness = "100";
  thirdImageSettings.saturation = "100";
  thirdImageSettings.blur = "0";
  thirdImageSettings.inversion = "0";

  thirdImageBrightnessInput.value = thirdImageSettings.brightness;
  thirdImageSaturationInput.value = thirdImageSettings.saturation;
  thirdImageBlurInput.value = thirdImageSettings.blur;
  thirdImageInversionInput.value = thirdImageSettings.inversion;
}

function resetFourthImageSettings() {
  fourthImageSettings.brightness = "100";
  fourthImageSettings.saturation = "100";
  fourthImageSettings.blur = "0";
  fourthImageSettings.inversion = "0";

  fourthImageBrightnessInput.value = fourthImageSettings.brightness;
  fourthImageSaturationInput.value = fourthImageSettings.saturation;
  fourthImageBlurInput.value = fourthImageSettings.blur;
  fourthImageInversionInput.value = fourthImageSettings.inversion;
}

function updateFirstImageSetting(key, value) {
  firstImageSettings[key] = value;
  renderFirstImage();
}

function updateSecondImageSetting(key, value) {
  secondImageSettings[key] = value;
  renderSecondImage();
}

function updateThirdImageSetting(key, value) {
  thirdImageSettings[key] = value;
  renderThirdImage();
}

function updateFourthImageSetting(key, value) {
  fourthImageSettings[key] = value;
  renderFourthImage();
}

function generateFirstImageFilter() {
  const {brightness, saturation, blur, inversion} = firstImageSettings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function generateSecondImageFilter() {
  const {brightness, saturation, blur, inversion} = secondImageSettings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function generateThirdImageFilter() {
  const {brightness, saturation, blur, inversion} = thirdImageSettings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function generateFourthImageFilter() {
  const {brightness, saturation, blur, inversion} = fourthImageSettings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function renderFirstImage() {
  firstImage.src = firstImageLoc;
  firstImageCanvas.width = firstImage.width;
  firstImageCanvas.height = firstImage.height;

  firstCanvasCtx.filter = generateFirstImageFilter();
  firstCanvasCtx.drawImage(firstImage, 0, 0);

  firstImage.setAttribute('crossorigin', 'anonymous');
}

function renderSecondImage() {
  secondImage.src = secondImageLoc;
  secondImageCanvas.width = secondImage.width;
  secondImageCanvas.height = secondImage.height;

  secondCanvasCtx.filter = generateSecondImageFilter();
  secondCanvasCtx.drawImage(secondImage, 0, 0);

  secondImage.setAttribute('crossorigin', 'anonymous');
}

function renderThirdImage() {
  thirdImage.src = thirdImageLoc;
  thirdImageCanvas.width = thirdImage.width;
  thirdImageCanvas.height = thirdImage.height;

  thirdCanvasCtx.filter = generateThirdImageFilter();
  thirdCanvasCtx.drawImage(thirdImage, 0, 0);

  thirdImage.setAttribute('crossorigin', 'anonymous');
}

function renderFourthImage() {
  fourthImage.src = fourthImageLoc;
  fourthImageCanvas.width = fourthImage.width;
  fourthImageCanvas.height = fourthImage.height;

  fourthCanvasCtx.filter = generateFourthImageFilter();
  fourthCanvasCtx.drawImage(fourthImage, 0, 0);

  fourthImage.setAttribute('crossorigin', 'anonymous');
}

function saveFirstImage() {
  let newUrl = firstImageCanvas.toDataURL();
  currFirstImage.setAttribute('crossorigin', 'anonymous');
  currFirstImage.src = newUrl;
  firstImageLoc = newUrl;
}

function saveSecondImage() {
  let newUrl = secondImageCanvas.toDataURL();
  currSecondImage.setAttribute('crossorigin', 'anonymous');
  currSecondImage.src = newUrl;
  secondImageLoc = newUrl;
}

function saveThirdImage() {
  let newUrl = thirdImageCanvas.toDataURL();
  currThirdImage.setAttribute('crossorigin', 'anonymous');
  currThirdImage.src = newUrl;
  thirdImageLoc = newUrl;
}

function saveFourthImage() {
  let newUrl = fourthImageCanvas.toDataURL();
  currFourthImage.setAttribute('crossorigin', 'anonymous');
  currFourthImage.src = newUrl;
  fourthImageLoc = newUrl;
}

firstImageSaveBtn.addEventListener('click', event => {
  saveFirstImage();
});

secondImageSaveBtn.addEventListener('click', event => {
  saveSecondImage();
});

thirdImageSaveBtn.addEventListener('click', event => {
  saveThirdImage();
});

fourthImageSaveBtn.addEventListener('click', event => {
  saveFourthImage();
});

firstImageModalBtn.addEventListener('click', event => {
  renderFirstImage();
  resetFirstImageSettings();
});

secondImageModalBtn.addEventListener('click', event => {
  renderSecondImage();
  resetSecondImageSettings();
});

thirdImageModalBtn.addEventListener('click', event => {
  renderThirdImage();
  resetThirdImageSettings();
});

fourthImageModalBtn.addEventListener('click', event => {
  renderFourthImage();
  resetFourthImageSettings();
});

firstImageBrightnessInput.addEventListener("change", () =>
  updateFirstImageSetting("brightness", firstImageBrightnessInput.value)
);

firstImageSaturationInput.addEventListener("change", () =>
  updateFirstImageSetting("saturation", firstImageSaturationInput.value)
);

firstImageBlurInput.addEventListener("change", () =>
  updateFirstImageSetting("blur", firstImageBlurInput.value)
);

firstImageInversionInput.addEventListener("change", () =>
  updateFirstImageSetting("inversion", firstImageInversionInput.value)
);

secondImageBrightnessInput.addEventListener("change", () =>
  updateSecondImageSetting("brightness", secondImageBrightnessInput.value)
);

secondImageSaturationInput.addEventListener("change", () =>
  updateSecondImageSetting("saturation", secondImageSaturationInput.value)
);

secondImageBlurInput.addEventListener("change", () =>
  updateSecondImageSetting("blur", secondImageBlurInput.value)
);

secondImageInversionInput.addEventListener("change", () =>
  updateSecondImageSetting("inversion", secondImageInversionInput.value)
);

thirdImageBrightnessInput.addEventListener("change", () =>
  updateThirdImageSetting("brightness", thirdImageBrightnessInput.value)
);

thirdImageSaturationInput.addEventListener("change", () =>
  updateThirdImageSetting("saturation", thirdImageSaturationInput.value)
);

thirdImageBlurInput.addEventListener("change", () =>
  updateThirdImageSetting("blur", thirdImageBlurInput.value)
);

thirdImageInversionInput.addEventListener("change", () =>
  updateThirdImageSetting("inversion", thirdImageInversionInput.value)
);

fourthImageBrightnessInput.addEventListener("change", () =>
  updateFourthImageSetting("brightness", fourthImageBrightnessInput.value)
);

fourthImageSaturationInput.addEventListener("change", () =>
  updateFourthImageSetting("saturation", fourthImageSaturationInput.value)
);

fourthImageBlurInput.addEventListener("change", () =>
  updateFourthImageSetting("blur", fourthImageBlurInput.value)
);

fourthImageInversionInput.addEventListener("change", () =>
  updateFourthImageSetting("inversion", fourthImageInversionInput.value)
);