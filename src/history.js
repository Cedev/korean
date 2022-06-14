

export class History {
  constructor() {
    this.buffer = []
    this.index = 0;
  }

  get value() {
    return this.buffer[this.index];
  }

  next(generator) {
    console.log(this.index);
    console.log(this.buffer);
    console.log(this.buffer.length);
    if (this.index >= this.buffer.length - 1) {
      console.log("Generating");
      this.index = this.buffer.push(generator()) - 1;
    } else {
      console.log("Incrementing");
      this.index++;
    }
    return this.value;
  }

  prev() {
    this.index = Math.max(this.index - 1, 0);
    return this.value;
  }
}
