function GameLoop(images, context, overview) {
  this._context = context;
  this._overview = overview;
  this._pieces = [
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],  // I
    [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],  // J
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],  // L
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],  // O
    [0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0],  // S
    [0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],  // T
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0],  // Z
  ].map((bits, index) => new Piece(images, index, [
    [bits[0], bits[1], bits[2], bits[3]],
    [bits[4], bits[5], bits[6], bits[7]],
    [bits[8], bits[9], bits[10], bits[11]],
    [bits[12], bits[13], bits[14], bits[15]],
  ]));
  this._grid = new Grid(images);
  this._piece = {
    current: this._pieces[Math.floor(Math.random() * 7)],
    next: this._pieces[Math.floor(Math.random() * 7)],
    position: {
      x: 6,
      y: 0,
    },
  };
  this._running = false;
  window.addEventListener('keydown', this._keyDown.bind(this));
  this.tick = this.tick.bind(this);
  this.render = this.render.bind(this);
}

GameLoop.prototype._updateOverview = function () {
  this._overview.clearRect(0, 0, 80, 80);
  this._piece.next.render(this._overview, 0, 0);
};

GameLoop.prototype._keyDown = function (event) {
  switch (event.code) {
  case 'ArrowUp':
    const rotated = this._piece.current.rotate();
    if (!this._grid.collision(
        rotated,
        this._piece.position.x,
        this._piece.position.y))
    {
      this._piece.current = rotated;
    }
    break;
  case 'ArrowDown':
    if (!this._grid.collision(
        this._piece.current,
        this._piece.position.x,
        this._piece.position.y + 1))
    {
      this._piece.position.y++;
    }
    break;
  case 'ArrowLeft':
    if (!this._grid.collision(
        this._piece.current,
        this._piece.position.x - 1,
        this._piece.position.y))
    {
      this._piece.position.x--;
    }
    break;
  case 'ArrowRight':
    if (!this._grid.collision(
        this._piece.current,
        this._piece.position.x + 1,
        this._piece.position.y))
    {
      this._piece.position.x++;
    }
    break;
  }
};

GameLoop.prototype.tick = function () {
  if (!this._running) {
    return;
  }
  if (this._grid.collision(
      this._piece.current,
      this._piece.position.x,
      this._piece.position.y + 1))
  {
    if (this._grid.collision(
        this._piece.current,
        this._piece.position.x,
        this._piece.position.y)) {
      this._running = false;
      window.alert('game over');
    } else {
      this._grid.addPiece(
          this._piece.current,
          this._piece.position.x,
          this._piece.position.y);
      this._grid.removeFullLines();
      this._piece.current = this._piece.next;
      this._piece.next = this._pieces[Math.floor(Math.random() * 7)];
      this._piece.position = {
        x: 6,
        y: 0,
      };
      this._updateOverview();
    }
  } else {
    this._piece.position.y++;
  }
};

GameLoop.prototype.start = function () {
  this._updateOverview();
  window.setInterval(this.tick, 500);
  window.requestAnimationFrame(this.render);
  this._running = true;
};

GameLoop.prototype.render = function () {
  this._grid.render(this._context);
  this._piece.current.render(
      this._context,
      this._piece.position.x,
      this._piece.position.y);
  window.requestAnimationFrame(this.render);
};

