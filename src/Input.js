export default class {
  constructor() {
    this.spacePressed = false;
    this.lastPressed = false;
    this.justPressed = false;

    addEventListener('keydown', event => {
      if (event.keyCode == 32) {
        this.spacePressed = true;
        event.preventDefault();
      }
    });

    addEventListener('keyup', event => {
      if (event.keyCode == 32) {
        this.spacePressed = false;
        event.preventDefault();
      }
    });
  }

  update() {
    this.justPressed = !this.lastPressed && this.spacePressed;

    this.lastPressed = this.spacePressed;
  }
}
