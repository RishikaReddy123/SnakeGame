function init() {
  canvas = document.getElementById("canvas");
  W = canvas.width = 1000;
  H = canvas.height = 680;
  pen = canvas.getContext("2d");
  cs = 50;
  score = 0;

  food_img = new Image();
  food_img.src = "Assets/food.jpg";

  game_over = false;
  food = getRandomFood();

  snake = {
    init_len: 5,
    color: "blue",
    cells: [],
    direction: "right",

    createSnake: function () {
      for (let i = this.init_len; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },

    drawSnake: function () {
      for (let i = 0; i < this.cells.length; i++) {
        pen.fillStyle = this.color;
        pen.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 2,
          cs - 2
        );
      }
    },

    updateSnake: function () {
      let headX = this.cells[0].x;
      let headY = this.cells[0].y;

      if (headX == food.x && headY == food.y) {
        food = getRandomFood();
        score += 5;
      } else {
        this.cells.pop();
      }

      let nextX, nextY;

      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == "down") {
        nextX = headX;
        nextY = headY + 1;
      } else {
        nextX = headX;
        nextY = headY - 1;
      }

      this.cells.unshift({ x: nextX, y: nextY });

      let last_x = Math.round(W / cs);
      let last_y = Math.round(H / cs);

      if (
        this.cells[0].x < 0 ||
        this.cells[0].y < 0 ||
        this.cells[0].x > last_x ||
        this.cells[0].y > last_y
      ) {
        game_over = true;
      }
    },
  };
  snake.createSnake();
  function keyPressed(e) {
    if (e.key == "ArrowRight") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft") {
      snake.direction = "left";
    } else if (e.key == "ArrowDown") {
      snake.direction = "down";
    } else {
      snake.direction = "up";
    }
  }
  document.addEventListener("keydown", keyPressed);
}

function draw() {
  pen.clearRect(0, 0, W, H);
  snake.drawSnake();
  pen.fillStyle = food.color;
  pen.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
  pen.font = "25px Roboto";
  pen.fillText(score, 50, 50);
}

function update() {
  snake.updateSnake();
}

function getRandomFood() {
  let foodX = Math.round((Math.random() * (W - cs)) / cs);
  let foodY = Math.round((Math.random() * (H - cs)) / cs);

  let food = {
    x: foodX,
    y: foodY,
    color: "red",
  };
  return food;
}

function gameloop() {
  if (game_over == true) {
    clearInterval(f);
    alert("Game over!");
    return;
  }
  draw();
  update();
}
init();
let f = setInterval(gameloop, 100);
