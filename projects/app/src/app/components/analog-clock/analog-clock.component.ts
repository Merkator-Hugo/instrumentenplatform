import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.scss']
})
export class AnalogClockComponent implements OnInit, OnChanges {

  @Input() time: Date;
  canvas: any;
  ctx: any;
  radius: any;
  secHandLength: number = 37;

  constructor() { }

  ngOnInit(): void {
    this.canvas = document.getElementById('clock');
    this.ctx = this.canvas.getContext('2d');
    // this.clearCanvas();
    // this.drawClock();
    // this.radius = this.canvas.height / 2;
    // this.ctx.translate(this.radius, this.radius);
    // this.radius = this.radius * 0.90
    // setInterval(this.drawClock, 1000);
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        switch (propName) {
          case 'time': {
            if (this.canvas != undefined) {
              // this.clearCanvas();
              this.drawClock();
            }      
          }
        }
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawClock() {
    this.outerDial();
    this.centerDial();
    this.showSeconds();
    this.showMinutes();
    this.showHours();
  }

  outerDial() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.canvas.width / 2, this.canvas.height / 2,
      this.secHandLength + 10, 0, Math.PI * 2
    );
    this.ctx.strokeStyle = '#cbd5e0';
    this.ctx.lineWidth = 5;
    this.ctx.stroke();
  }
  
  centerDial() {
    this.ctx.beginPath();
    this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 2, 2, 0, Math.PI * 2);
    this.ctx.lineWidth = 3;
    this.ctx.fillStyle = '#cbd5e0';
    this.ctx.strokeStyle = '#cbd5e0';
    this.ctx.stroke();
  }

  showSeconds() {
    const sec = this.time.getSeconds();
    const angle = ((Math.PI * 2) * (sec / 60)) - ((Math.PI * 2) / 4);
    this.ctx.lineWidth = 0.5;

    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.lineTo((this.canvas.width / 2 + Math.cos(angle) * this.secHandLength),
      this.canvas.height / 2 + Math.sin(angle) * this.secHandLength);

    this.ctx.strokeStyle = '#cbd5e0';
    this.ctx.stroke();
  }

  showMinutes() {
    const min = this.time.getMinutes();
    const angle = ((Math.PI * 2) * (min / 60)) - ((Math.PI * 2) / 4);
    this.ctx.lineWidth = 1.5;

    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.lineTo((this.canvas.width / 2 + Math.cos(angle) * (this.secHandLength / 1.1)),
      this.canvas.height / 2 + Math.sin(angle) * (this.secHandLength / 1.1));

    this.ctx.strokeStyle = '#cbd5e0';
    this.ctx.stroke();
  }

  showHours() {
    const hour = this.time.getHours();
    const min = this.time.getMinutes();
    const angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
    this.ctx.lineWidth = 1.5;

    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);
    this.ctx.lineTo((this.canvas.width / 2 + Math.cos(angle) * (this.secHandLength / 1.5)),
      this.canvas.height / 2 + Math.sin(angle) * (this.secHandLength / 1.5));
    this.ctx.strokeStyle = '#cbd5e0';
    this.ctx.stroke();
  }


  // drawClock() {
  //   this.drawFace(this.ctx, this.radius);
  //   this.drawNumbers(this.ctx, this.radius);
  //   this.drawTime(this.ctx, this.radius);
  // }

  // drawFace(ctx, radius) {
  //   var grad;
  //   ctx.beginPath();
  //   ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  //   ctx.fillStyle = 'white';
  //   ctx.fill();
  //   grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
  //   grad.addColorStop(0, '#333');
  //   grad.addColorStop(0.5, 'white');
  //   grad.addColorStop(1, '#333');
  //   ctx.strokeStyle = grad;
  //   ctx.lineWidth = radius * 0.1;
  //   ctx.stroke();
  //   ctx.beginPath();
  //   ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
  //   ctx.fillStyle = '#333';
  //   ctx.fill();
  // }

  // drawNumbers(ctx, radius) {
  //   var ang;
  //   var num;
  //   ctx.font = radius * 0.15 + "px arial";
  //   ctx.textBaseline = "middle";
  //   ctx.textAlign = "center";
  //   for (num = 1; num < 13; num++) {
  //     ang = num * Math.PI / 6;
  //     ctx.rotate(ang);
  //     ctx.translate(0, -radius * 0.85);
  //     ctx.rotate(-ang);
  //     ctx.fillText(num.toString(), 0, 0);
  //     ctx.rotate(ang);
  //     ctx.translate(0, radius * 0.85);
  //     ctx.rotate(-ang);
  //   }
  // }

  // drawTime(ctx, radius) {
  //   var now = new Date();
  //   var hour = now.getHours();
  //   var minute = now.getMinutes();
  //   var second = now.getSeconds();
  //   //hour
  //   hour = hour % 12;
  //   hour = (hour * Math.PI / 6) +
  //     (minute * Math.PI / (6 * 60)) +
  //     (second * Math.PI / (360 * 60));
  //   this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
  //   //minute
  //   minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
  //   this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
  //   // second
  //   second = (second * Math.PI / 30);
  //   this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
  // }

  // drawHand(ctx, pos, length, width) {
  //   ctx.beginPath();
  //   ctx.lineWidth = width;
  //   ctx.lineCap = "round";
  //   ctx.moveTo(0, 0);
  //   ctx.rotate(pos);
  //   ctx.lineTo(0, -length);
  //   ctx.stroke();
  //   ctx.rotate(-pos);
  // }

}
