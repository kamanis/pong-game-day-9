class Select {
    constructor(first, second) {
        this.first = {
            x: first.x,
            y: first.y,
            w: first.width,
            h: first.height
        };
        this.second = {
            x: second.x,
            y: second.y,
            w: second.width,
            h: second.height
        };
        this.pos = this.first;
        this.i = 0;
    }
    display() {
        if (this.i === 0) {
            this.pos = this.first;
        }
        if (this.i === 1) {
            this.pos = this.second;
        }
       
        if (this.i < 0) {
            this.i = 0;
             //play sound
        }
       
        if (this.i > 1) {
            this.i = 1;
             //play sound
        }
        push();
        noFill();
        stroke(0, 255, 255);
        strokeWeight(10);
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.pos.w, this.pos.h);
        pop();
    }
    move() {
        if (keyCode === 39) {
            this.i++;
            //play sound
        }
        if (keyCode === 37) {
            this.i--;
            //play sound
        }
    }
}