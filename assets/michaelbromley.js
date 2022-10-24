function MichaelBromleyVisualization() {
  this.id = "michaelbromley_visualization";
  this.name = "Michael Bromley Visualization";
  this.analyser = "";
  this.container = "";
  this.preferences = {
    width: 500,
    height: 500,
    fullscreen: false,
    inherit: true,
  };
  this.tileSize = "";
  this.tiles = [];
  this.stars = [];
  this.fgCanvas = "";
  this.fgCtx = "";
  this.fgRotation = 0.001;
  this.bgCanvas = "";
  this.bgCtx = "";
  this.sfCanvas = "";
  this.sfCtx = "";
  this.volume = 0;
  this.streamData = new Uint8Array(128);
  this.drawBgInterval = "";
  this.rotateForegroundInterval = "";
  this.sampleAudioStreamInterval = "";
  this.animationFrame = "";
  this.setPreferences = function (userPreferences) {
    for (var key in this.preferences) {
      if (userPreferences[key] != undefined) {
        this.preferences[key] = userPreferences[key];
      }
    }
  };
  this.startVisualization = function (element) {
    this.analyser = Amplitude.getAnalyser();
    this.container = element;
    if (this.preferences.inherit) {
      this.preferences.width = this.container.offsetWidth;
      this.preferences.height = this.container.offsetHeight;
    }
    this.fgCanvas = document.createElement("canvas");
    this.fgCanvas.setAttribute("style", "position: absolute; z-index: 10");
    this.fgCtx = this.fgCanvas.getContext("2d");
    this.container.appendChild(this.fgCanvas);
    this.sfCanvas = document.createElement("canvas");
    this.sfCtx = this.sfCanvas.getContext("2d");
    this.sfCanvas.setAttribute("style", "position: absolute; z-index: 5");
    this.container.appendChild(this.sfCanvas);
    this.bgCanvas = document.createElement("canvas");
    this.bgCtx = this.bgCanvas.getContext("2d");
    this.container.appendChild(this.bgCanvas);
    this.makePolygonArray();
    this.makeStarArray();
    this.resizeCanvas();
    this.draw();
    this.sampleAudioStreamInterval = setInterval(
      this.sampleAudioStream.bind(this),
      20
    );
    this.drawBgInterval = setInterval(this.drawBg.bind(this), 100);
    this.rotateForegroundInterval = setInterval(
      this.rotateForeground.bind(this),
      20
    );
    window.addEventListener("resize", this.resizeCanvas, false);
  };
  (this.makePolygonArray = function () {
    this.tiles = [];
    let i = 0;
    this.tiles.push(
      new Polygon(
        6,
        0,
        0,
        this.tileSize,
        this.fgCtx,
        i,
        this.analyser,
        this.streamData,
        this.tiles
      )
    );
    i++;
    for (var layer = 1; layer < 7; layer++) {
      this.tiles.push(
        new Polygon(
          6,
          0,
          layer,
          this.tileSize,
          this.fgCtx,
          i,
          this.analyser,
          this.streamData,
          this.tiles,
          this.fgRotation
        )
      );
      i++;
      this.tiles.push(
        new Polygon(
          6,
          0,
          -layer,
          this.tileSize,
          this.fgCtx,
          i,
          this.analyser,
          this.streamData,
          this.tiles,
          this.fgRotation
        )
      );
      i++;
      for (var x = 1; x < layer; x++) {
        this.tiles.push(
          new Polygon(
            6,
            x,
            -layer,
            this.tileSize,
            this.fgCtx,
            i,
            this.analyser,
            this.streamData,
            this.tiles,
            this.fgRotation
          )
        );
        i++;
        this.tiles.push(
          new Polygon(
            6,
            -x,
            layer,
            this.tileSize,
            this.fgCtx,
            i,
            this.analyser,
            this.streamData,
            this.tiles,
            this.fgRotation
          )
        );
        i++;
        this.tiles.push(
          new Polygon(
            6,
            x,
            layer - x,
            this.tileSize,
            this.fgCtx,
            i,
            this.analyser,
            this.streamData,
            this.tiles,
            this.fgRotation
          )
        );
        i++;
        this.tiles.push(
          new Polygon(
            6,
            -x,
            -layer + x,
            this.tileSize,
            this.fgCtx,
            i,
            this.analyser,
            this.streamData,
            this.tiles,
            this.fgRotation
          )
        );
        i++;
      }
      for (var y = -layer; y <= 0; y++) {
        this.tiles.push(
          new Polygon(
            6,
            layer,
            y,
            this.tileSize,
            this.fgCtx,
            i,
            this.analyser,
            this.streamData,
            this.tiles,
            this.fgRotation
          )
        );
        i++;
        this.tiles.push(
          new Polygon(
            6,
            -layer,
            -y,
            this.tileSize,
            this.fgCtx,
            i,
            this.analyser,
            this.streamData,
            this.tiles,
            this.fgRotation
          )
        );
        i++;
      }
    }
  }),
    (this.makeStarArray = function () {
      var x;
      var y;
      var starSize;
      this.stars = [];
      var limit = this.fgCanvas.width / 15;
      for (var i = 0; i < limit; i++) {
        x = (Math.random() - 0.5) * this.fgCanvas.width;
        y = (Math.random() - 0.5) * this.fgCanvas.height;
        starSize = (Math.random() + 0.1) * 3;
        this.stars.push(
          new Star(
            x,
            y,
            starSize,
            this.sfCtx,
            this.fgCanvas,
            this.analyser,
            this.streamData
          )
        );
      }
    }),
    (this.resizeCanvas = function () {
      if (this.fgCanvas) {
        if (this.preferences.fullscreen) {
          this.fgCanvas.width = window.innerWidth;
          this.fgCanvas.height = window.innerHeight;
          this.fgCtx.translate(
            this.fgCanvas.width / 2,
            this.fgCanvas.height / 2
          );
          this.bgCanvas.width = window.innerWidth;
          this.bgCanvas.height = window.innerHeight;
          this.sfCanvas.width = window.innerWidth;
          this.bgCanvas.height = window.innerHeight;
          this.sfCtx.translate(
            this.fgCanvas.width / 2,
            this.fgCanvas.height / 2
          );
        } else {
          this.fgCanvas.width = this.preferences.width;
          this.fgCanvas.height = this.preferences.height;
          this.fgCtx.translate(
            this.fgCanvas.width / 2,
            this.fgCanvas.height / 2
          );
          this.bgCanvas.width = this.preferences.width;
          this.bgCanvas.height = this.preferences.height;
          this.sfCanvas.width = this.preferences.width;
          this.bgCanvas.height = this.preferences.height;
          this.sfCtx.translate(
            this.fgCanvas.width / 2,
            this.fgCanvas.height / 2
          );
        }
        this.tileSize =
          this.fgCanvas.width > this.fgCanvas.height
            ? this.fgCanvas.width / 25
            : this.fgCanvas.height / 25;
        this.drawBg();
        this.makePolygonArray();
        this.makeStarArray();
      }
    }),
    (this.draw = function () {
      this.fgCtx.clearRect(
        -this.fgCanvas.width,
        -this.fgCanvas.height,
        this.fgCanvas.width * 2,
        this.fgCanvas.height * 2
      );
      this.sfCtx.clearRect(
        -this.fgCanvas.width / 2,
        -this.fgCanvas.height / 2,
        this.fgCanvas.width,
        this.fgCanvas.height
      );
      this.stars.forEach(function (star) {
        star.drawStar();
      });
      this.tiles.forEach(function (tile) {
        tile.drawPolygon();
      });
      this.tiles.forEach(function (tile) {
        if (tile.highlight > 0) {
          tile.drawHighlight();
        }
      });
      this.animationFrame = window.requestAnimationFrame(this.draw.bind(this));
    }),
    (this.drawBg = function () {
      this.bgCtx.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
      var r, g, b, a;
      var val = this.volume / 1000;
      r = 200 + (Math.sin(val) + 1) * 28;
      g = val * 2;
      b = val * 8;
      a = Math.sin(val + (3 * Math.PI) / 2) + 1;
      this.bgCtx.beginPath();
      this.bgCtx.rect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
      var grd = this.bgCtx.createRadialGradient(
        this.bgCanvas.width / 2,
        this.bgCanvas.height / 2,
        val,
        this.bgCanvas.width / 2,
        this.bgCanvas.height / 2,
        this.bgCanvas.width -
          Math.min(Math.pow(val, 2.7), this.bgCanvas.width - 20)
      );
      grd.addColorStop(0, "rgba(0,0,0,0)");
      grd.addColorStop(
        0.8,
        "rgba(" +
          Math.round(r) +
          ", " +
          Math.round(g) +
          ", " +
          Math.round(b) +
          ", 0.4)"
      );
      this.bgCtx.fillStyle = grd;
      this.bgCtx.fill();
    }),
    (this.sampleAudioStream = function () {
      this.analyser.getByteFrequencyData(this.streamData);
      var total = 0;
      for (var i = 0; i < 80; i++) {
        total += this.streamData[i];
      }
      this.volume = total;
    }),
    (this.rotateForeground = function () {
      for (let i = 0; i < this.tiles.length; i++) {
        this.tiles[i].rotateVertices();
      }
    }),
    (this.getName = function () {
      return name;
    }),
    (this.getID = function () {
      return this.id;
    }),
    (this.stopVisualization = function () {
      clearInterval(this.sampleAudioStreamInterval);
      clearInterval(this.drawBgInterval);
      clearInterval(this.rotateForegroundInterval);
      window.cancelAnimationFrame(this.animationFrame);
      this.container.innerHTML = "";
    }),
    (this.getVolume = function () {
      return this.volume;
    });
}
function Polygon(
  sides,
  x,
  y,
  tileSize,
  ctx,
  num,
  analyser,
  streamData,
  tiles,
  fgRotation
) {
  this.analyser = analyser;
  this.sides = sides;
  this.tileSize = tileSize;
  this.ctx = ctx;
  this.tiles = tiles;
  this.fgRotation = fgRotation;
  this.num = num;
  this.high = 0;
  this.decay = this.num > 42 ? 1.5 : 2;
  this.highlight = 0;
  var step = Math.round(Math.cos(Math.PI / 6) * tileSize * 2);
  this.y = Math.round(step * Math.sin(Math.PI / 3) * -y);
  this.x = Math.round(x * step + (y * step) / 2);
  this.vertices = [];
  for (var i = 1; i <= this.sides; i += 1) {
    x =
      this.x +
      this.tileSize * Math.cos((i * 2 * Math.PI) / this.sides + Math.PI / 6);
    y =
      this.y +
      this.tileSize * Math.sin((i * 2 * Math.PI) / this.sides + Math.PI / 6);
    this.vertices.push([x, y]);
  }
  this.streamData = streamData;
}
Polygon.prototype.rotateVertices = function () {
  var rotation = this.fgRotation;
  rotation -=
    this.analyser.volume > 10000 ? Math.sin(this.analyser.volume / 800000) : 0;
  for (var i = 0; i <= this.sides - 1; i += 1) {
    this.vertices[i][0] =
      this.vertices[i][0] - this.vertices[i][1] * Math.sin(rotation);
    this.vertices[i][1] =
      this.vertices[i][1] + this.vertices[i][0] * Math.sin(rotation);
  }
};
Polygon.prototype.drawPolygon = function () {
  var bucket = Math.ceil(
    (this.streamData.length / this.tiles.length) * this.num
  );
  var val = Math.pow(this.streamData[bucket] / 255, 2) * 255;
  val *= this.num > 42 ? 1.1 : 1;
  if (val > this.high) {
    this.high = val;
  } else {
    this.high -= this.decay;
    val = this.high;
  }
  var r, g, b, a;
  if (val > 0) {
    this.ctx.beginPath();
    var offset = this.calculateOffset(this.vertices[0]);
    this.ctx.moveTo(
      this.vertices[0][0] + offset[0],
      this.vertices[0][1] + offset[1]
    );
    for (var i = 1; i <= this.sides - 1; i += 1) {
      offset = this.calculateOffset(this.vertices[i]);
      this.ctx.lineTo(
        this.vertices[i][0] + offset[0],
        this.vertices[i][1] + offset[1]
      );
    }
    this.ctx.closePath();
    if (val > 128) {
      r = (val - 128) * 2;
      g =
        (Math.cos((((2 * val) / 128) * Math.PI) / 2 - (4 * Math.PI) / 3) + 1) *
        128;
      b = (val - 105) * 3;
    } else if (val > 175) {
      r = (val - 128) * 2;
      g = 255;
      b = (val - 105) * 3;
    } else {
      r = (Math.cos((((2 * val) / 128) * Math.PI) / 2) + 1) * 128;
      g =
        (Math.cos((((2 * val) / 128) * Math.PI) / 2 - (4 * Math.PI) / 3) + 1) *
        128;
      b =
        (Math.cos((((2.4 * val) / 128) * Math.PI) / 2 - (2 * Math.PI) / 3) +
          1) *
        128;
    }
    if (val > 210) {
      this.cubed = val;
    }
    if (val > 120) {
      this.highlight = 100;
    }
    var e = 2.7182;
    a =
      0.5 / (1 + 40 * Math.pow(e, -val / 8)) +
      0.5 / (1 + 40 * Math.pow(e, -val / 20));
    this.ctx.fillStyle =
      "rgba(" +
      Math.round(r) +
      ", " +
      Math.round(g) +
      ", " +
      Math.round(b) +
      ", " +
      a +
      ")";
    this.ctx.fill();
    if (val > 20) {
      var strokeVal = 20;
      this.ctx.strokeStyle =
        "rgba(" + strokeVal + ", " + strokeVal + ", " + strokeVal + ", 0.5)";
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }
  }
};
Polygon.prototype.calculateOffset = function (coords) {
  this.analyser.getByteFrequencyData(this.streamData);
  var total = 0;
  for (var i = 0; i < 80; i++) {
    total += this.streamData[i];
  }
  var volume = total;
  var angle = Math.atan(coords[1] / coords[0]);
  var distance = Math.sqrt(Math.pow(coords[0], 2) + Math.pow(coords[1], 2));
  var mentalFactor = Math.min(Math.max(Math.tan(volume / 6000) * 0.5, -20), 2);
  var offsetFactor =
    Math.pow(distance / 3, 2) *
    (volume / 2000000) *
    (Math.pow(this.high, 1.3) / 300) *
    mentalFactor;
  var offsetX = Math.cos(angle) * offsetFactor;
  var offsetY = Math.sin(angle) * offsetFactor;
  offsetX *= coords[0] < 0 ? -1 : 1;
  offsetY *= coords[0] < 0 ? -1 : 1;
  return [offsetX, offsetY];
};
Polygon.prototype.drawHighlight = function () {
  this.ctx.beginPath();
  var offset = this.calculateOffset(this.vertices[0]);
  this.ctx.moveTo(
    this.vertices[0][0] + offset[0],
    this.vertices[0][1] + offset[1]
  );
  for (var i = 0; i <= this.sides - 1; i += 1) {
    offset = this.calculateOffset(this.vertices[i]);
    this.ctx.lineTo(
      this.vertices[i][0] + offset[0],
      this.vertices[i][1] + offset[1]
    );
  }
  this.ctx.closePath();
  var a = this.highlight / 100;
  this.ctx.strokeStyle = "rgba(255, 255, 255, " + a + ")";
  this.ctx.lineWidth = 1;
  this.ctx.stroke();
  this.highlight -= 0.5;
};
function Star(x, y, starSize, ctx, fgCanvas, analyser, streamData) {
  this.x = x;
  this.y = y;
  this.angle = Math.atan(Math.abs(y) / Math.abs(x));
  this.starSize = starSize;
  this.ctx = ctx;
  this.high = 0;
  this.fgCanvas = fgCanvas;
  this.analyser = analyser;
  this.streamData = streamData;
}
Star.prototype.drawStar = function () {
  var distanceFromCentre = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
  this.analyser.getByteFrequencyData(this.streamData);
  var total = 0;
  for (var i = 0; i < 80; i++) {
    total += this.streamData[i];
  }
  var volume = total;
  var brightness = 200 + Math.min(Math.round(this.high * 5), 55);
  this.ctx.lineWidth =
    0.5 + (distanceFromCentre / 2000) * Math.max(this.starSize / 2, 1);
  this.ctx.strokeStyle =
    "rgba(" + brightness + ", " + brightness + ", " + brightness + ", 1)";
  this.ctx.beginPath();
  this.ctx.moveTo(this.x, this.y);
  var lengthFactor =
    1 +
    Math.min(
      ((Math.pow(distanceFromCentre, 2) / 30000) * Math.pow(volume, 2)) /
        6000000,
      distanceFromCentre
    );
  var toX = Math.cos(this.angle) * -lengthFactor;
  var toY = Math.sin(this.angle) * -lengthFactor;
  toX *= this.x > 0 ? 1 : -1;
  toY *= this.y > 0 ? 1 : -1;
  this.ctx.lineTo(this.x + toX, this.y + toY);
  this.ctx.stroke();
  this.ctx.closePath();
  var speed = (lengthFactor / 20) * this.starSize;
  this.high -= Math.max(this.high - 0.0001, 0);
  if (speed > this.high) {
    this.high = speed;
  }
  var dX = Math.cos(this.angle) * this.high;
  var dY = Math.sin(this.angle) * this.high;
  this.x += this.x > 0 ? dX : -dX;
  this.y += this.y > 0 ? dY : -dY;
  var limitY = this.fgCanvas.height / 2 + 500;
  var limitX = this.fgCanvas.width / 2 + 500;
  if (
    this.y > limitY ||
    this.y < -limitY ||
    this.x > limitX ||
    this.x < -limitX
  ) {
    this.x = ((Math.random() - 0.5) * this.fgCanvas.width) / 3;
    this.y = ((Math.random() - 0.5) * this.fgCanvas.height) / 3;
    this.angle = Math.atan(Math.abs(this.y) / Math.abs(this.x));
  }
};
