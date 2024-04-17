class Character {
  constructor() {
    if (this) {
      this.start();
      requestAnimationFrame(this.update);
    }
  }

  start() {}

  update(tick: number) {
    if (this) {
      requestAnimationFrame(this.update);
    }
  }
}

export default Character;
