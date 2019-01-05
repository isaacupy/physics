class Dot{
    constructor(){
        this.vec = createVector(random(0, 500),random(0, 500));
        
    }
    addv(addx,addy){
        this.vecspd = createVector(addx,addy);   
    }
    mov(){
        this.vec.add(this.vecspd);
        this.futvec = createVector(this.vec.x, this.vec.y);
        this.futvec.add(this.vecspd);
    }
    mmag(mmag){
        this.vec.setMag(this.vec.mag()*mmag);
    }
    draw(){
        fill(255)
        ellipse(this.vec.x,this.vec.y, 15 ,15);
        ellipse(this.futvec.x,this.futvec.y,5,5);
    }
}

var dots = [];
var somethingelse = 0;
var amount = 500;
function setup(){
    createCanvas(500,500);
    for (i = 0; i < amount; i++) {
        dots.push(new Dot());
        dots[i].addv(random(-8, 8), random(-8, 8));
        dots[i].mmag(random(1,3));
    }
}

function draw(){
    background(0, 150, 150);
    for (i = 0; i < dots.length; i++){
        dots[i].mov();
        dots[i].draw();

        for (j = 0; j < dots.length; j++) {
            if (j == i) {
            }
            else {
                if(dots[i].vec.dist(dots[j].vec) < 15){
                    tempmag = -1*dots[i].vecspd.mag();
                    dots[i].vecspd.setMag(dots[j].vecspd.mag());
                    dots[j].vecspd.setMag(tempmag);
                    somethingelse = somethingelse + 1
                    
                }
            }
        }
        if ((dots[i].vec.x > width) || (dots[i].vec.y > height)){
            dots[i].addv(random(-1,-2),random(-1,-2));
        }
        if ((dots[i].vec.x < 0) || (dots[i].vec.y < 0)){
            dots[i].addv(random(+1, +2),random(+1, +2));
        }
    }
    fill(255);
    text("balls: " + dots.length, 50, 500);
    text("collisions: " + somethingelse, 150, 500);
    text("firstborn magnitude: " + dots[0].vec.mag(), 50, 475);

}
/*
    collide(){
        for (i = 0; i < dots.length - 1; i++){
            if ((this.vec.x - 10 <= dots[i].vec.x >= this.vec.x + 10) && (this.vec.y + 10 <= dots[i].vec.y >= this.vec.y - 10)){
                this.addv(dots[i].vec.x,dots[i].vec.y);
            }
        }
    }
    */
// if ((dots[i].vec.x - 5 <= dots[j].vec.x <= dots[i].vec.x + 5) && (dots[i].vec.y - 5 <= dots[j].vec.y <= dots[i].vec.y + 5)) {
//     dots[i].addv(dots[j].vec.x * -1, dots[j].vec.y * -1);
// }