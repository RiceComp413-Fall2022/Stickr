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

function renderFirstImage(sx = 0, sy = 0, width, height) {
  firstImage.src = firstImageLoc;
  firstImageCanvas.width = width||firstImage.width;
  firstImageCanvas.height = height||firstImage.height;

  firstCanvasCtx.filter = generateFirstImageFilter();
  firstCanvasCtx.drawImage(firstImage, sx, sy, firstImageCanvas.width, firstImageCanvas.height, 0, 0, firstImageCanvas.width, firstImageCanvas.height);

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

function draw(c, nodes, boundary) {
  //draw in the container
  // c.fillStyle = "#000000";
  // c.fillRect(container.y, container.x, container.width, container.height);
  // renderFirstImage();

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
  
  node_radius = 15
  x_1 = 0
  x_2 = firstImageCanvas.width;
  y_1 = 0
  y_2 = firstImageCanvas.height;

  var node1 = new Node(x_1, y_1, node_radius);
  var node2 = new Node(x_2, y_1, node_radius);
  var node3 = new Node(x_2, y_2, node_radius);
  var node4 = new Node(x_1, y_2, node_radius);

  var boundingBox = new Box(node1, node2, node3, node4);
  
  handleMouseDrag(firstImageCanvas, [node1, node2, node3, node4]);

  let myReq;

  function updateFrame() {
    firstCanvasCtx.save();
    renderFirstImage();
    // renderFirstImage(node1.x, node1.y, node2.x-node1.x, node3.y-node1.y);
    draw(firstCanvasCtx, [node1, node2, node3, node4], boundingBox);
    firstCanvasCtx.restore();

    myReq = requestAnimationFrame(updateFrame);
  };

  updateFrame();

  firstImageSaveBtn.addEventListener('click', event => {

    cancelAnimationFrame(myReq);

    clean_canvas();


    // firstCanvasCtx.clearRect(0, 0, firstImageCanvas.width, firstImageCanvas.height);
    


    // firstCanvasCtx.fillStyle = "rgba(0, 0, 0, 0)";
    // firstCanvasCtx.fillRect(0, 0, firstCanvasCtx.width, firstCanvasCtx.height); 
    // firstCanvasCtx.restore();

    renderFirstImage();

    window.alert(myReq);


    clean_canvas();

    // renderFirstImage(node1.x, node1.y, node2.x-node1.x, node3.y-node1.y);

    width = node2.x-node1.x
    height = node3.y-node1.y

    firstImage.src = firstImageLoc;
    firstImageCanvas.width = width||firstImage.width;
    firstImageCanvas.height = height||firstImage.height;

    firstCanvasCtx.filter = generateFirstImageFilter();
    firstCanvasCtx.drawImage(firstImage, node1.x, node1.y, firstImageCanvas.width, firstImageCanvas.height, 0, 0, firstImageCanvas.width, firstImageCanvas.height);

    firstImage.setAttribute('crossorigin', 'anonymous');



    // let newUrl = firstImageCanvas.toDataURL();
    // currFirstImage.setAttribute('crossorigin', 'anonymous');
    // currFirstImage.src = newUrl;
    // firstImageLoc = newUrl;

  });

  function clean_canvas(){
    firstCanvasCtx.beginPath();
    firstCanvasCtx.fillStyle = "rgba(0, 0, 0, 255)";
    firstCanvasCtx.fillRect(0, 0, firstImageCanvas.width, firstImageCanvas.height);    
    firstCanvasCtx.closePath()
    firstCanvasCtx.stroke();
  }

  


  

  // firstCanvasCtx.beginPath();
  // firstCanvasCtx.lineWidth = "6";
  // firstCanvasCtx.strokeStyle = "red";
  // firstCanvasCtx.rect(0, 0, firstImageCanvas.width, firstImageCanvas.height);
  // firstCanvasCtx.stroke();

  // // firstCanvasCtx.drawImage(image, 150, 200, 500, 300, 60,60, 500, 300);
  // // firstImage.width = 256;
  // // firstImage.height = 256;
  // firstImage.left = 0;
  // firstImage.width = 256;
  // firstImage.top = 0;
  // firstImage.height = 256;
  // console.log(firstImage);

  // // firstCanvasCtx.drawImage(firstImage, 0, 0, 100, 100, 0, 0, firstImage.width, firstImage.height);
  // console.log("Here");
  // // firstCanvasCtx.drawImage(firstImage, 150, 200, 500, 300, 60,60, 500, 300);

}

function saveFirstImage() {
  let newUrl = firstImageCanvas.toDataURL();
  currFirstImage.setAttribute('crossorigin', 'anonymous');
  currFirstImage.src = newUrl;
  firstImageLoc = newUrl;
}

function finalCropFirstImage(sx, sy, width, height) {


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

firstImageCropBtn.addEventListener('click', event => {
  renderFirstCropSquare();
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

// Refer to: https://stackoverflow.com/questions/45449177/dragging-a-circle-on-a-canvas-using-mousedown