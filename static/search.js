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

function resetImageSettings(settings, brightnessInput, saturationInput, blurInput, inversionInput) {
  settings.brightness = "100";
  settings.saturation = "100";
  settings.blur = "0";
  settings.inversion = "0";

  brightnessInput.value = settings.brightness;
  saturationInput.value = settings.saturation;
  blurInput.value = settings.blur;
  inversionInput.value = settings.inversion;
}

function updateImageSetting(settings, key, value, image, canvas, imageLoc, canvasCtx) {
  settings[key] = value;
  renderImage(image, canvas, imageLoc, settings, canvasCtx);
}

function generateImageFilter(settings) {
  const {brightness, saturation, blur, inversion} = settings;

  return `brightness(${brightness}%) saturate(${saturation}%) blur(${blur}px) invert(${inversion}%)`;
}

function renderImage(image, imageCanvas, imageLoc, settings, canvasCtx, sx = 0, sy = 0, width, height) {
  image.src = imageLoc;
  imageCanvas.width = width||image.width;
  imageCanvas.height = height||image.height;

  canvasCtx.filter = generateImageFilter(settings);
  canvasCtx.drawImage(image, sx, sy, imageCanvas.width, imageCanvas.height, 0, 0, imageCanvas.width, imageCanvas.height);

  image.setAttribute('crossorigin', 'anonymous');
}

function draw(c, nodes, boundary) {

  //draw nodes
  for (var i in nodes) {
    c.arc(nodes[i].x, nodes[i].y, nodes[i].r, 0, 2 * Math.PI);
    c.fillStyle = nodes[i].color;
    c.fill()
    c.closePath();
  }

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
}

function Node(x, y, r, color) {
  this.x = x;
  this.y = y;
  this.r = r || 15;
  this.color = color || "#ff0";
}

function Box(node1, node2, node3, node4, width, color) {
  this.node1 = node1;
  this.node2 = node2;
  this.node3 = node3;
  this.node4 = node4;
  this.width = width || 5;
  this.color = color || "#f00";
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

function renderFirstCropSquare() {
  
  const node_radius = 15
  const x_1 = 0
  const x_2 = firstImageCanvas.width;
  const y_1 = 0
  const y_2 = firstImageCanvas.height;

  var node1 = new Node(x_1, y_1, node_radius);
  var node2 = new Node(x_2, y_1, node_radius);
  var node3 = new Node(x_2, y_2, node_radius);
  var node4 = new Node(x_1, y_2, node_radius);

  var boundingBox = new Box(node1, node2, node3, node4);
  
  handleMouseDrag(firstImageCanvas, [node1, node2, node3, node4]);

  let myReq;

  function updateFrame() {
    firstCanvasCtx.save();
    renderImage(firstImage, firstImageCanvas, firstImageLoc, firstImageSettings, firstCanvasCtx);
    draw(firstCanvasCtx, [node1, node2, node3, node4], boundingBox);
    firstCanvasCtx.restore();

    myReq = requestAnimationFrame(updateFrame);
  };

  updateFrame();

  firstImageSaveBtn.addEventListener('click', event => {

    cancelAnimationFrame(myReq);

    clean_canvas();
    renderImage(firstImage, firstImageCanvas, firstImageLoc, firstImageSettings, firstCanvasCtx);

    clean_canvas();

    renderImage(firstImage, firstImageCanvas, firstImageLoc, firstImageSettings, firstCanvasCtx);

    let width = node2.x-node1.x
    let height = node3.y-node1.y

    firstImage.src = firstImageLoc;
    firstImageCanvas.width = width||firstImage.width;
    firstImageCanvas.height = height||firstImage.height;

    firstCanvasCtx.filter = generateImageFilter(firstImageSettings);
    firstCanvasCtx.drawImage(firstImage, node1.x, node1.y, firstImageCanvas.width, firstImageCanvas.height, 0, 0, firstImageCanvas.width, firstImageCanvas.height);

    firstImage.setAttribute('crossorigin', 'anonymous');

    saveImage(firstImageCanvas, currFirstImage, firstImageLoc);
  });

  function clean_canvas(){
    firstCanvasCtx.beginPath();
    firstCanvasCtx.fillStyle = "rgba(0, 0, 0, 255)";
    firstCanvasCtx.fillRect(0, 0, firstImageCanvas.width, firstImageCanvas.height);    
    firstCanvasCtx.closePath()
    firstCanvasCtx.stroke();
  }

}

function saveImage(imageCanvas, currImage, imageLoc) {
  let newUrl = imageCanvas.toDataURL();
  currImage.setAttribute('crossorigin', 'anonymous');
  currImage.src = newUrl;
  imageLoc = newUrl;
}

function finalCropFirstImage(sx, sy, width, height) {


}

firstImageSaveBtn.addEventListener('click', event => {
  saveImage(firstImageCanvas, currFirstImage, firstImageLoc);
});

secondImageSaveBtn.addEventListener('click', event => {
  saveImage(secondImageCanvas, currSecondImage, secondImageLoc);
});

thirdImageSaveBtn.addEventListener('click', event => {
  saveImage(thirdImageCanvas, currThirdImage, thirdImageLoc);
});

fourthImageSaveBtn.addEventListener('click', event => {
  saveImage(fourthImageCanvas, currFourthImage, fourthImageLoc);
});

firstImageModalBtn.addEventListener('click', event => {
  renderImage(firstImage, firstImageCanvas, firstImageLoc, firstImageSettings, firstCanvasCtx);
  resetImageSettings(firstImageSettings, firstImageBrightnessInput, firstImageSaturationInput, firstImageBlurInput, firstImageInversionInput);
});

secondImageModalBtn.addEventListener('click', event => {
  renderImage(secondImage, secondImageCanvas, secondImageLoc, secondImageSettings, secondCanvasCtx);
  resetImageSettings(secondImageSettings, secondImageBrightnessInput, secondImageSaturationInput, secondImageBlurInput, secondImageInversionInput);
});

thirdImageModalBtn.addEventListener('click', event => {
  renderImage(thirdImage, thirdImageCanvas, thirdImageLoc, thirdImageSettings, thirdCanvasCtx);
  resetImageSettings(thirdImageSettings, thirdImageBrightnessInput, thirdImageSaturationInput, thirdImageBlurInput, thirdImageInversionInput);
});

fourthImageModalBtn.addEventListener('click', event => {
  renderImage(fourthImage, fourthImageCanvas, fourthImageLoc, fourthImageSettings, fourthCanvasCtx);
  resetImageSettings(fourthImageSettings, fourthImageBrightnessInput, fourthImageSaturationInput, fourthImageBlurInput, fourthImageInversionInput);
});

firstImageCropBtn.addEventListener('click', event => {
  renderFirstCropSquare();
});


firstImageBrightnessInput.addEventListener("change", () =>
  updateImageSetting(firstImageSettings, "brightness", firstImageBrightnessInput.value, firstImage, firstImageCanvas, firstImageLoc, firstCanvasCtx)
);

firstImageSaturationInput.addEventListener("change", () =>
  updateImageSetting(firstImageSettings, "saturation", firstImageSaturationInput.value, firstImage, firstImageCanvas, firstImageLoc, firstCanvasCtx)
);

firstImageBlurInput.addEventListener("change", () =>
  updateImageSetting(firstImageSettings, "blur", firstImageBlurInput.value, firstImage, firstImageCanvas, firstImageLoc, firstCanvasCtx)
);

firstImageInversionInput.addEventListener("change", () =>
  updateImageSetting(firstImageSettings, "inversion", firstImageInversionInput.value, firstImage, firstImageCanvas, firstImageLoc, firstCanvasCtx)
);

secondImageBrightnessInput.addEventListener("change", () =>
  updateImageSetting(secondImageSettings, "brightness", secondImageBrightnessInput.value, secondImage, secondImageCanvas, secondImageLoc, secondCanvasCtx)
);

secondImageSaturationInput.addEventListener("change", () =>
  updateImageSetting(secondImageSettings, "saturation", secondImageSaturationInput.value, secondImage, secondImageCanvas, secondImageLoc, secondCanvasCtx)
);

secondImageBlurInput.addEventListener("change", () =>
  updateImageSetting(secondImageSettings, "blur", secondImageBlurInput.value, secondImage, secondImageCanvas, secondImageLoc, secondCanvasCtx)
);

secondImageInversionInput.addEventListener("change", () =>
  updateImageSetting(secondImageSettings, "inversion", secondImageInversionInput.value, secondImage, secondImageCanvas, secondImageLoc, secondCanvasCtx)
);

thirdImageBrightnessInput.addEventListener("change", () =>
  updateImageSetting(thirdImageSettings, "brightness", thirdImageBrightnessInput.value, thirdImage, thirdImageCanvas, thirdImageLoc, thirdCanvasCtx)
);

thirdImageSaturationInput.addEventListener("change", () =>
  updateImageSetting(thirdImageSettings, "saturation", thirdImageSaturationInput.value, thirdImage, thirdImageCanvas, thirdImageLoc, thirdCanvasCtx)
);

thirdImageBlurInput.addEventListener("change", () =>
  updateImageSetting(thirdImageSettings, "blur", thirdImageBlurInput.value, thirdImage, thirdImageCanvas, thirdImageLoc, thirdCanvasCtx)
);

thirdImageInversionInput.addEventListener("change", () =>
  updateImageSetting(thirdImageSettings, "inversion", thirdImageInversionInput.value, thirdImage, thirdImageCanvas, thirdImageLoc, thirdCanvasCtx)
);

fourthImageBrightnessInput.addEventListener("change", () =>
  updateImageSetting(fourthImageSettings, "brightness", fourthImageBrightnessInput.value, fourthImage, fourthImageCanvas, fourthImageLoc, fourthCanvasCtx)
);

fourthImageSaturationInput.addEventListener("change", () =>
  updateImageSetting(fourthImageSettings, "saturation", fourthImageSaturationInput.value, fourthImage, fourthImageCanvas, fourthImageLoc, fourthCanvasCtx)
);

fourthImageBlurInput.addEventListener("change", () =>
  updateImageSetting(fourthImageSettings, "blur", fourthImageBlurInput.value, fourthImage, fourthImageCanvas, fourthImageLoc, fourthCanvasCtx)
);

fourthImageInversionInput.addEventListener("change", () =>
  updateImageSetting(fourthImageSettings, "inversion", fourthImageInversionInput.value, fourthImage, fourthImageCanvas, fourthImageLoc, fourthCanvasCtx)
);  