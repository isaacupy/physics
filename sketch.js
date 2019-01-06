class Dot{
    constructor(){
        this.vec = createVector(random(0, width),random(0, height));
        
    }
    velo(velx,vely){
        this.vecspd = createVector(velx, vely);
    }
    addv(addx,addy){
        this.addvec = createVector(addx, addy);
        this.vecspd.add(this.addvec);
    }
    gravity(){
        if(this.vec.y < height - radius){
            this.grav = createVector(0, 1);
            this.vecspd.add(this.grav);
        }
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
        ellipse(this.vec.x,this.vec.y, diameter ,diameter);
        ellipse(this.futvec.x,this.futvec.y,diameter/3,diameter/3);
    }
}

var dots = [];
var crashes = 0;
var amount = 250;
var diameter = 10;
var radius = diameter/2;
var colmag = -.999;
var rubber = true;
var bounce = false;
var bouncemag = -0.990;
function setup(){
    createCanvas(1500,850);
    for (i = 0; i < amount; i++) {
        dots.push(new Dot());
        dots[i].velo(random(-4, 4), random(-4, 4));
        dots[i].mmag(1);
    }
}

function draw(){
    background(0, 150, 150);
    for (i = 0; i < dots.length; i++){
        dots[i].mov();
        //dots[i].gravity();
        for (j = 0; j < dots.length; j++) {
            if (j == i) {
            }
            else {
                if(dots[i].vec.dist(dots[j].vec) < diameter){
                    tempmag = colmag*dots[i].vecspd.mag();
                    dots[i].vecspd.setMag(dots[j].vecspd.mag()*colmag);
                    dots[j].vecspd.setMag(tempmag);
                    crashes = crashes + 1
                    
                }
            }
        }
        if(rubber){
            if (dots[i].vec.x > width) {
                dots[i].addv(random(-1, -2), 0);
            }
            if (dots[i].vec.y > height) {
                dots[i].addv(0, random(-1, -2));
            }
            if (dots[i].vec.x < 0) {
                dots[i].addv(random(+1, +2), 0);
            }
            if (dots[i].vec.y < 0) {
                dots[i].addv(0, random(+1, +2));
            }
        }
        if(bounce){
            if ((dots[i].vec.x > width - radius) || (dots[i].vec.x < 0 + radius)) {
                dots[i].velo(dots[i].vecspd.x * bouncemag, dots[i].vecspd.y);
            }
            if ((dots[i].vec.y > height - radius) || (dots[i].vec.y < 0 + radius)) {
                dots[i].velo(dots[i].vecspd.x, dots[i].vecspd.y * bouncemag);
            }
        }
        dots[i].draw();
    }
    fill(255);
    text("balls: " + dots.length, 10, 10);
    text("collisions: " + crashes, 150, 10);
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
// if ((dots[i].vec.x > width) || (dots[i].vec.y > height)) {
//     dots[i].addv(random(-1, -2), random(-1, -2));
// }
// if ((dots[i].vec.x < 0) || (dots[i].vec.y < 0)) {
//     dots[i].addv(random(+1, +2), random(+1, +2));
// }