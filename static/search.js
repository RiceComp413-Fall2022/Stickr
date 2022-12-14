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

let firstImageCropBtn = document.getElementById("cropFirstImage");
let secondImageCropBtn = document.getElementById("cropSecondImage");
let thirdImageCropBtn = document.getElementById("cropThirdImage");
let fourthImageCropBtn = document.getElementById("cropFourthImage");

let currFirstImage = document.getElementById("firstImage");
let currSecondImage = document.getElementById("secondImage");
let currThirdImage = document.getElementById("thirdImage");
let currFourthImage = document.getElementById("fourthImage");
let firstImageSaveBtn = document.getElementById("firstImageSave");
let secondImageSaveBtn = document.getElementById("secondImageSave");
let thirdImageSaveBtn = document.getElementById("thirdImageSave");
let fourthImageSaveBtn = document.getElementById("fourthImageSave");
let firstModalCloseBtn = document.getElementById("firstModalCloseBtn");
let secondModalCloseBtn = document.getElementById("secondModalCloseBtn");
let thirdModalCloseBtn = document.getElementById("thirdModalCloseBtn");
let fourthModalCloseBtn = document.getElementById("fourthModalCloseBtn");
const firstImageSettings = {};
const secondImageSettings = {};
const thirdImageSettings = {};
const fourthImageSettings = {};


class stickerImage{
  constructor(image, imageCanvas, canvasCtx, imageLoc, settings, currImage, modalCloseBtn){
    this.image = image;
    this.imageCanvas = imageCanvas;
    this.canvasCtx = canvasCtx;
    this.imageLoc = imageLoc;
    this.settings = settings;
    this.currImage = currImage;
    this.modalCloseBtn = modalCloseBtn
  }
}

let firstSticker = new stickerImage(firstImage, firstImageCanvas, firstCanvasCtx, firstImageLoc, firstImageSettings, currFirstImage, firstModalCloseBtn);
let secondSticker = new stickerImage(secondImage, secondImageCanvas, secondCanvasCtx, secondImageLoc, secondImageSettings, currSecondImage, secondModalCloseBtn);
let thirdSticker = new stickerImage(thirdImage, thirdImageCanvas, thirdCanvasCtx, thirdImageLoc, thirdImageSettings, currThirdImage, thirdModalCloseBtn);
let fourthSticker = new stickerImage(fourthImage, fourthImageCanvas, fourthCanvasCtx, fourthImageLoc, fourthImageSettings, currFourthImage, fourthModalCloseBtn);

function resetImageSettings(sticker, brightnessInput, saturationInput, blurInput, inversionInput) {
  sticker.settings.brightness = "100";
  sticker.settings.saturation = "100";
  sticker.settings.blur = "0";
  sticker.settings.inversion = "0";

  brightnessInput.value = sticker.settings.brightness;
  saturationInput.value = sticker.settings.saturation;
  blurInput.value = sticker.settings.blur;
  inversionInput.value = sticker.settings.inversion;
}

function updateImageSetting(sticker, key, value) {
  sticker.settings[key] = value;
  renderImage(sticker);
}

function generateImageFilter(sticker) {
  const {brightness, saturation, blur, inversion} = sticker.settings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function renderImage(sticker, sx = 0, sy = 0, width, height) {
  sticker.image.src = sticker.imageLoc;
  sticker.imageCanvas.width = width||sticker.imageCanvas.width;
  sticker.imageCanvas.height = height||sticker.imageCanvas.height;

  sticker.canvasCtx.filter = generateImageFilter(sticker);
  sticker.canvasCtx.drawImage(sticker.image, sx, sy, sticker.imageCanvas.width, sticker.imageCanvas.height, 0, 0, sticker.imageCanvas.width, sticker.imageCanvas.height);

  sticker.image.setAttribute('crossorigin', 'anonymous');
}

function draw(c, nodes, boundary) {

  //draw boundary
  c.beginPath();
  c.moveTo(boundary.node1x, boundary.node1y);
  c.lineTo(boundary.node2x, boundary.node2y);

  c.moveTo(boundary.node2x, boundary.node2y);
  c.lineTo(boundary.node3x, boundary.node3y);

  c.moveTo(boundary.node3x, boundary.node3y);
  c.lineTo(boundary.node4x, boundary.node4y);

  c.moveTo(boundary.node4x, boundary.node4y);
  c.lineTo(boundary.node1x, boundary.node1y);
  
  c.strokeStyle = boundary.color;
  c.lineWidth = boundary.width;
  c.closePath();
  c.stroke();

  //draw nodes
  for (var i in nodes) {
    c.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, 2 * Math.PI);
    c.fillStyle = nodes[i].color;
    c.fill()
    c.closePath();
  }
  
}

function Node(x, y, r, color) {
  this.x = x;
  this.y = y;
  this.r = r || 15;
  this.color = color || "aqua";
}

function Box(node1, node2, node3, node4, width, color) {
  this.node1 = node1;
  this.node2 = node2;
  this.node3 = node3;
  this.node4 = node4;
  this.width = width || 5;
  this.color = color || "grey";
  Object.defineProperties(this, {
    node1x: {
      "get": () => this.node1.x,
      "set": x => { this.node1.x = x }
    },
    node1y: {
      "get": () => this.node1.y,
      "set": y => { this.node1.y = y }
    },
    node2x: {
      "get": () => this.node2.x,
      "set": x => { this.node2.x = x }
    },
    node2y: {
      "get": () => this.node2.y,
      "set": y => { this.node2.y = y }
    },
    node3x: {
      "get": () => this.node3.x,
      "set": x => { this.node3.x = x }
    },
    node3y: {
      "get": () => this.node3.y,
      "set": y => { this.node3.y = y }
    },
    node4x: {
      "get": () => this.node4.x,
      "set": x => { this.node4.x = x }
    },
    node4y: {
      "get": () => this.node4.y,
      "set": y => { this.node4.y = y }
    }
  })
}

function handleMouseDrag(canvas, nodes) {
  var isDrag = false;
  var offset = { x: 0, y: 0, x0: 0, y0: 0 };
  var dragNode = undefined;
  var last_moved = undefined;

  canvas.addEventListener("mousedown", function (e) {
    var bbox = canvas.getBoundingClientRect();
    var x = e.offsetX * (canvas.width  / bbox.width);
    var y = e.offsetY * (canvas.height / bbox.height);
    for (var i in nodes) {
      if (Math.pow(x - nodes[i].x, 2) + Math.pow(y - nodes[i].y, 2) < Math.pow(nodes[i].r, 2)) {
        isDrag = true;
        last_moved = i
        dragNode = nodes[i];
        offset = { x: dragNode.x, y: dragNode.y, x0: x, y0: y };
        return;
      }
    }
  });
  canvas.addEventListener("mousemove", function (e) {
    if (isDrag) {
      var bbox = canvas.getBoundingClientRect();
      var x = e.offsetX * (canvas.width  / bbox.width);
      var y = e.offsetY * (canvas.height / bbox.height);
      dragNode.x = x - offset.x0 + offset.x;
      dragNode.y = y - offset.y0 + offset.y;

      if (last_moved == 0){
        nodes[1].y = nodes[0].y;
        nodes[3].x = nodes[0].x;
      }
      if (last_moved == 1){
        nodes[2].x = nodes[1].x;
        nodes[0].y = nodes[1].y;
      }
      if (last_moved == 2){
        nodes[3].y = nodes[2].y
        nodes[1].x = nodes[2].x
      }
      if (last_moved == 3){
        nodes[2].y = nodes[3].y
        nodes[0].x = nodes[3].x
      }
    }
  });
  canvas.addEventListener("mouseup", function (e) {
    
    if (isDrag){
      if (last_moved == 0){
        nodes[1].y = nodes[0].y;
        nodes[3].x = nodes[0].x;
      }
      if (last_moved == 1){
        nodes[2].x = nodes[1].x;
        nodes[0].y = nodes[1].y;
      }
      if (last_moved == 2){
        nodes[3].y = nodes[2].y
        nodes[1].x = nodes[2].x
      }
      if (last_moved == 3){
        nodes[2].y = nodes[3].y
        nodes[0].x = nodes[3].x
      }
      
    }

    isDrag = false;
    last_moved = undefined;


  });
  canvas.addEventListener("mouseleave", function (e) {
    isDrag = false;
  });
}

function renderCropSquare(sticker, saveBtn, saveFunc) {
  
  const node_radius = 7.5
  const x_1 = 0
  const x_2 = sticker.imageCanvas.width;
  const y_1 = 0
  const y_2 = sticker.imageCanvas.height;

  var node1 = new Node(x_1, y_1, node_radius);
  var node2 = new Node(x_2, y_1, node_radius);
  var node3 = new Node(x_2, y_2, node_radius);
  var node4 = new Node(x_1, y_2, node_radius);

  var boundingBox = new Box(node1, node2, node3, node4);
  
  handleMouseDrag(sticker.imageCanvas, [node1, node2, node3, node4]);

  let myReq;

  function updateFrame() {
    sticker.canvasCtx.save();
    renderImage(sticker);
    draw(sticker.canvasCtx, [node1, node2, node3, node4], boundingBox);
    sticker.canvasCtx.restore();

    myReq = requestAnimationFrame(updateFrame);
  };

  updateFrame();

  saveBtn.removeEventListener('click', saveFunc);

  function saveCroppedImage(event){

    cancelAnimationFrame(myReq);

    const width = node2.x-node1.x
    const height = node3.y-node1.y

    sticker.image.src = sticker.imageLoc;

    sticker.canvasCtx.filter = generateImageFilter(sticker);
    sticker.canvasCtx.drawImage(sticker.image, node1.x, node1.y, width, height, 0, 0, sticker.imageCanvas.width, sticker.imageCanvas.height);

    sticker.image.setAttribute('crossorigin', 'anonymous');

    saveImage(sticker);

    saveBtn.removeEventListener('click', saveCroppedImage);
    saveBtn.addEventListener('click', saveFunc);

    sticker.modalCloseBtn.click();
    
    return
  }

  saveBtn.addEventListener('click', saveCroppedImage);

  return
}

let t = 'Sample text';

function renderTextBox(sticker, saveBtn, saveFunc, textBox, textSize) {
  sticker.canvasCtx.save();
  renderImage(sticker);

  updateTextSize(textSize, textBox);
  textBox.style.display = "block";
  let centerX = sticker.imageCanvas.offsetLeft + sticker.imageCanvas.offsetWidth/2;
  let centerY = sticker.imageCanvas.offsetTop + sticker.imageCanvas.offsetHeight/2;
  let width = textBox.clientWidth;
  let height = textBox.clientHeight;
  textBox.style.left = centerX - (width/2) + 'px';
  textBox.style.top = centerY - (height/2) + 'px';

  textBox.style.display = "block";

  t = 'Sample text';

  saveBtn.removeEventListener('click', saveFunc);

  function saveTextBoxOntoCanvas(event) {
    if (textBox.style.display == "none") {
      console.log("No textbox present");
      return;
    }
  
    let ctx = sticker.canvasCtx;
    ctx.drawImage(sticker.image, 0, 0);
    
    // Set where the textbox is added onto the canvas
    var textOffsets = textBox.getBoundingClientRect();
    var canvasOffsets = sticker.imageCanvas.getBoundingClientRect();
    let textLeft = textOffsets.left;
    let textTop = textOffsets.top;
    let canvasLeft = canvasOffsets.left;
    let canvasTop = canvasOffsets.top;

    // Need to handle scale differences between canvas and image.
    let canvasWidth = sticker.imageCanvas.width;
    let canvasHeight = sticker.imageCanvas.height;

    let imageWidth = canvasWidth-8;
    let imageHeight = canvasHeight-8;

    // Setting up text type descriptions
    var textBoxStyle = getComputedStyle(textBox);
    ctx.fillStyle = textBoxStyle.color;
    ctx.font = textBoxStyle.font;

    // ctx.height = firstImageCanvas.height;
    // console.log(ctx.height);

    // Take into account padding values
    let imageAreaPadding = getComputedStyle(document.querySelector('.image-area')).padding.replace('px','');
    
    // Get the text (it can a word or a sentence) to write over the image.
    let str = textBox.innerHTML.replace(/\n\r?/g, '<br />').split('<br />');    

    // Draw the text using Canvas fillText() method.
    let x = (textLeft - canvasLeft)*(canvasWidth/imageWidth);
    // let y = (textTop - canvasTop)*(canvasHeight/imageHeight) + parseInt(imageAreaPadding);
    let fontSize = parseInt(textBox.style.fontSize.replace('NaN', '14').replace('px',''));
    let y = (textTop - canvasTop)*(canvasHeight/imageHeight) + fontSize + (fontSize-50)/10//+'px'// + parseInt(imageAreaPadding) + parseInt(textBox.style.fontSize.replace('px',''))*2/3;
    // y = textOffsets.bottom - canvasTop;
    // console.log(x, y);
    // console.log((textTop - canvasTop)*(canvasHeight/imageHeight), parseInt(imageAreaPadding), parseInt(textBox.style.fontSize.replace('px','')))
    // console.log(textBox.style.fontSize.replace('px',''))
    // ctx.fillText(str, x, y);
    for (let i = 0; i <= str.length - 1; i++) {
            	
      ctx.fillText(
          str[i]
              .replace('</div>','')
              .replace('<br>', '')
              .replace(';',''), 
          x, y + i * 15);
  }
    
    // Make the textbox disappear
    textBox.style.display = "none";

    saveImage(sticker);

    // Set the save button to what it previously was
    saveBtn.removeEventListener('click', saveTextBoxOntoCanvas);
    saveBtn.addEventListener('click', saveFunc);

    return;
  }

  saveBtn.addEventListener('click', saveTextBoxOntoCanvas);

  return
}

function writeText(inputBox, textBox) {
  t = inputBox.value;
  textBox.innerHTML = t.replace(/\n\r?/g, '<br />').replace(/" "?/g, ' &nbsp;');
}

function updateTextSize(inputBox, textEntry) {
  let intInput = parseInt(inputBox.value)
  if (!isNaN(intInput) && (intInput > 0)) {
    textEntry.style.fontSize = intInput+'px';
  }
}

$(document).ready(function() {
  $(function() { 
      $('#firstTextEntry').draggable({
          containment: "parent"
      });
      $('#secondTextEntry').draggable({
        containment: "parent"
      });
      $('#thirdTextEntry').draggable({
        containment: "parent"
      });
      $('#fourthTextEntry').draggable({
        containment: "parent"
      });
  });
});

let firstImageTextInput = document.getElementById("textInputFirstImage");
let firstTextEntry = document.getElementById("firstTextEntry");
firstImageTextInput.addEventListener('keyup', event => {
  writeText(firstImageTextInput, firstTextEntry)
});

let firstImageTextSize = document.getElementById("firstImageTextSize");
firstImageTextSize.addEventListener('keyup', event => {
  updateTextSize(firstImageTextSize, firstTextEntry);
});

let firstImageTextButton = document.getElementById("textEditFirstImage");
firstImageTextButton.addEventListener('click', event => { 
  renderTextBox(firstSticker, firstImageSaveBtn, saveFirstSticker, firstTextEntry, firstImageTextSize);
});


let secondImageTextInput = document.getElementById("textInputSecondImage");
let secondTextEntry = document.getElementById("secondTextEntry");
secondImageTextInput.addEventListener('keyup', event => {
  writeText(secondImageTextInput, secondTextEntry)
});

let secondImageTextSize = document.getElementById("secondImageTextSize");
secondImageTextSize.addEventListener('keyup', event => {
  updateTextSize(secondImageTextSize, secondTextEntry);
});

let secondImageTextButton = document.getElementById("textEditSecondImage");
secondImageTextButton.addEventListener('click', event => { 
  renderTextBox(secondSticker, secondImageSaveBtn, saveSecondSticker, secondTextEntry, secondImageTextSize);
});


let thirdImageTextInput = document.getElementById("textInputThirdImage");
let thirdTextEntry = document.getElementById("thirdTextEntry");
thirdImageTextInput.addEventListener('keyup', event => {
  writeText(thirdImageTextInput, thirdTextEntry)
});

let thirdImageTextSize = document.getElementById("thirdImageTextSize");
thirdImageTextSize.addEventListener('keyup', event => {
  updateTextSize(thirdImageTextSize, thirdTextEntry);
});

let thirdImageTextButton = document.getElementById("textEditThirdImage");
thirdImageTextButton.addEventListener('click', event => { 
  renderTextBox(thirdSticker, thirdImageSaveBtn, saveThirdSticker, thirdTextEntry, thirdImageTextSize);
});


let fourthImageTextInput = document.getElementById("textInputFourthImage");
let fourthTextEntry = document.getElementById("fourthTextEntry");
fourthImageTextInput.addEventListener('keyup', event => {
  writeText(fourthImageTextInput, fourthTextEntry)
});

let fourthImageTextSize = document.getElementById("fourthImageTextSize");
fourthImageTextSize.addEventListener('keyup', event => {
  updateTextSize(fourthImageTextSize, fourthTextEntry);
});

let fourthImageTextButton = document.getElementById("textEditFourthImage");
fourthImageTextButton.addEventListener('click', event => { 
  renderTextBox(fourthSticker, fourthImageSaveBtn, saveFourthSticker, fourthTextEntry, fourthImageTextSize);
});


function saveImage(sticker) {
  sticker.imageCanvas.setAttribute('crossorigin', 'anonymous');
  let newUrl = sticker.imageCanvas.toDataURL();
  sticker.currImage.setAttribute('crossorigin', 'anonymous');
  sticker.currImage.src = newUrl;
  sticker.imageLoc = newUrl;

}


function saveFirstSticker(event){
  saveImage(firstSticker);
  firstImageLoc = firstSticker.imageLoc;
  firstModalCloseBtn.click();
}

firstImageSaveBtn.addEventListener('click', saveFirstSticker);

function saveSecondSticker(event){
  saveImage(secondSticker);
  secondImageLoc = secondSticker.imageLoc;
  secondModalCloseBtn.click();
}

secondImageSaveBtn.addEventListener('click', saveSecondSticker);

function saveThirdSticker(event){
  saveImage(thirdSticker);
  thirdImageLoc = thirdSticker.imageLoc;
  thirdModalCloseBtn.click();
}

thirdImageSaveBtn.addEventListener('click', saveThirdSticker);

function saveFourthSticker(event){
  saveImage(fourthSticker);
  fourthImageLoc = fourthSticker.imageLoc;
  fourthModalCloseBtn.click();
}

fourthImageSaveBtn.addEventListener('click', saveFourthSticker);

firstImageModalBtn.addEventListener('click', event => {
  resetImageSettings(firstSticker, firstImageBrightnessInput, firstImageSaturationInput, firstImageBlurInput, firstImageInversionInput);
  renderImage(firstSticker);
});

secondImageModalBtn.addEventListener('click', event => {
  resetImageSettings(secondSticker, secondImageBrightnessInput, secondImageSaturationInput, secondImageBlurInput, secondImageInversionInput);
  renderImage(secondSticker);
});

thirdImageModalBtn.addEventListener('click', event => {
  resetImageSettings(thirdSticker, thirdImageBrightnessInput, thirdImageSaturationInput, thirdImageBlurInput, thirdImageInversionInput);
  renderImage(thirdSticker);
});

fourthImageModalBtn.addEventListener('click', event => {
  resetImageSettings(fourthSticker, fourthImageBrightnessInput, fourthImageSaturationInput, fourthImageBlurInput, fourthImageInversionInput);
  renderImage(fourthSticker);
});

firstImageCropBtn.addEventListener('click', event => {
  renderCropSquare(firstSticker, firstImageSaveBtn, saveFirstSticker);
});

secondImageCropBtn.addEventListener('click', event => {
  renderCropSquare(secondSticker, secondImageSaveBtn, saveSecondSticker);
});

thirdImageCropBtn.addEventListener('click', event => {
  renderCropSquare(thirdSticker, thirdImageSaveBtn, saveThirdSticker);
});

fourthImageCropBtn.addEventListener('click', event => {
  renderCropSquare(fourthSticker, fourthImageSaveBtn, saveFourthSticker);
});

firstImageBrightnessInput.addEventListener("change", () =>
  updateImageSetting(firstSticker, "brightness", firstImageBrightnessInput.value)
);

firstImageSaturationInput.addEventListener("change", () =>
  updateImageSetting(firstSticker, "saturation", firstImageSaturationInput.value)
);

firstImageBlurInput.addEventListener("change", () =>
  updateImageSetting(firstSticker, "blur", firstImageBlurInput.value)
);

firstImageInversionInput.addEventListener("change", () =>
  updateImageSetting(firstSticker, "inversion", firstImageInversionInput.value)
);

secondImageBrightnessInput.addEventListener("change", () =>
  updateImageSetting(secondSticker, "brightness", secondImageBrightnessInput.value)
);

secondImageSaturationInput.addEventListener("change", () =>
  updateImageSetting(secondSticker, "saturation", secondImageSaturationInput.value)
);

secondImageBlurInput.addEventListener("change", () =>
  updateImageSetting(secondSticker, "blur", secondImageBlurInput.value)
);

secondImageInversionInput.addEventListener("change", () =>
  updateImageSetting(secondSticker, "inversion", secondImageInversionInput.value)
);

thirdImageBrightnessInput.addEventListener("change", () =>
  updateImageSetting(thirdSticker, "brightness", thirdImageBrightnessInput.value)
);

thirdImageSaturationInput.addEventListener("change", () =>
  updateImageSetting(thirdSticker, "saturation", thirdImageSaturationInput.value)
);

thirdImageBlurInput.addEventListener("change", () =>
  updateImageSetting(thirdSticker, "blur", thirdImageBlurInput.value)
);

thirdImageInversionInput.addEventListener("change", () =>
  updateImageSetting(thirdSticker, "inversion", thirdImageInversionInput.value)
);

fourthImageBrightnessInput.addEventListener("change", () =>
  updateImageSetting(fourthSticker, "brightness", fourthImageBrightnessInput.value)
);

fourthImageSaturationInput.addEventListener("change", () =>
  updateImageSetting(fourthSticker, "saturation", fourthImageSaturationInput.value)
);

fourthImageBlurInput.addEventListener("change", () =>
  updateImageSetting(fourthSticker, "blur", fourthImageBlurInput.value)
);

fourthImageInversionInput.addEventListener("change", () =>
  updateImageSetting(fourthSticker, "inversion", fourthImageInversionInput.value)
);  

// Attempts at further usage of variations

// var cors_access_link = 'https://cors-anywhere.herokuapp.com/';
// function vary_image(sticker) {
//   fetch(cors_access_link+sticker.image.src).then(res => res.blob())
//  .then(blob => {
//      const formData = new FormData();
//      formData.append('image', blob, 'image');
//      formData.append("url", sticker.image.src);
//     //  fetch(url_for('search', query=query, model=model), {
//     //          method: "POST",
//     //          body: formData
//     //      }).then(response => response.text()).then((newUrl) => {
//     //          console.log(newUrl);
//     //          sticker.image.src = cors_access_link+newUrl;
//     //          sticker.imageLoc = cors_access_link+newUrl;
//     //      });
//     fetch_from_search(query, "filler_model_name", formData).then(response => response.text()).then((newUrl) => {
//                console.log(newUrl);
//                sticker.image.src = cors_access_link+newUrl;
//                sticker.imageLoc = cors_access_link+newUrl;
//            });
//  });
// }

// let firstStickerVariation = document.getElementById("firstStickerVariation");
// firstStickerVariation.addEventListener('click', event => {
//   console.log('Within ');
//   vary_image(firstSticker);
// });

// let secondStickerVariation = document.getElementById("secondStickerVariation");
// secondStickerVariation.addEventListener('click', event => {
//   vary_image(secondSticker);
// });

// let thirdStickerVariation = document.getElementById("thirdStickerVariation");
// thirdStickerVariation.addEventListener('click', event => {
//   vary_image(thirdSticker);
// });

// let fourthStickerVariation = document.getElementById("fourthStickerVariation");
// fourthStickerVariation.addEventListener('click', event => {
//   vary_image(fourthSticker);
// });