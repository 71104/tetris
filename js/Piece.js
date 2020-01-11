function Piece(images, index, matrix) {
  this._images = images;
  this.index = index;
  this.matrix = matrix;
}

Piece.prototype.render = function (context, x0, y0) {
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      if (this.matrix[y][x]) {
        context.drawImage(
            this._images[this.index],
            (x0 + x) * 20,
            (y0 + y) * 20);
      }
    }
  }
};

Piece.prototype.rotate = function () {
  const matrix = [
    this.matrix[0].slice(),
    this.matrix[1].slice(),
    this.matrix[2].slice(),
    this.matrix[3].slice(),
  ];
  for (var y = 0; y < 4; y++) {
    for (var x = 0; x < 4; x++) {
      matrix[3 - x][y] = this.matrix[y][x];
    }
  }
  return new Piece(this._images, this.index, matrix);
};

