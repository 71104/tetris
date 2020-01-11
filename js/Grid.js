function Grid(images) {
  this._images = images;
  this._matrix = [];
  for (var y = 0; y < 20; y++) {
    this._matrix[y] = [];
    for (var x = 0; x < 15; x++) {
      this._matrix[y].push(-1);
    }
  }
}

Grid.prototype.render = function (context) {
  context.clearRect(0, 0, 300, 400);
  for (var y = 0; y < 20; y++) {
    for (var x = 0; x < 15; x++) {
      if (this._matrix[y][x] >= 0) {
        context.drawImage(this._images[this._matrix[y][x]], x * 20, y * 20);
      }
    }
  }
};

Grid.prototype.collision = function (piece, x0, y0) {
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      if (piece.matrix[y][x]) {
        if (x0 + x < 0 ||
            x0 + x >= 15 ||
            y0 + y >= 20 ||
            this._matrix[y0 + y][x0 + x] >= 0)
        {
          return true;
        }
      }
    }
  }
  return false;
};

Grid.prototype.addPiece = function (piece, x0, y0) {
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      if (piece.matrix[y][x]) {
        this._matrix[y0 + y][x0 + x] = piece.index;
      }
    }
  }
};

Grid.prototype.removeFullLines = function () {
  for (var y = 0; y < 20; y++) {
    if (this._matrix[y].every(bit => bit >= 0)) {
      for (var y1 = y; y1 > 0; y1--) {
        this._matrix[y1] = this._matrix[y1 - 1];
      }
      this._matrix[0] = Array(15).fill(-1);
    }
  }
};

