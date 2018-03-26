import { Component, OnInit, Input, Renderer2, ElementRef } from '@angular/core';

// import { TimerService }     from '../timer/timer.service';

@Component({
  selector: 'app-timer-clock',
  templateUrl: './timer-clock.component.html',
  styleUrls: ['./timer-clock.component.css'],
  // providers: [TimerService]
})
export class TimerClockComponent implements OnInit {
  dial;
  timer;
  dashes = [];
  angle = 0;
  activeColor = 'purple';
  isPause = false;
  isStart = false;
 

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  getTime() {
    let time = this.timer.innerHTML;
    return time.split(':');
  };

  blink() {
    if (this.timer) {
      this.timer.style.color = 'red';
      setTimeout(function () {
        this.timer.style.color = 'black';
      }, 500);
    };
  };

  changeClockColor(dashNumber, dashColor, timerColor) {
    dashColor = dashColor || 'purple';
    timerColor = timerColor || 'purple';
    for (let i = dashNumber; i <= 60; i++) {
      this.dashes[i].style.background = dashColor;
    };
    this.timer.style.color = timerColor;
  };

  updateClockColor(minutes) {
    if (minutes != 0 && this.isStart) {
      this.changeClockColor(1, this.activeColor, this.activeColor);
    };
  };

  setActiveColor() {
    var height = document.documentElement.clientHeight,
      width = document.documentElement.clientWidth;
  
    let [m, s] = this.getTime();
  
    if (width >= 1000 && height >= 700) {
      this.activeColor = 'purple';
    } else if (width >= 500 && width < 1000 && height >= 300 && height < 700) {
      this.activeColor = 'red';
    } else this.activeColor = 'blue';
  
    this.updateClockColor(m);
  };


ngOnInit() {
// Creates a clock dial and a clock timer and exports 
// public properties and methods 
this.dial = document.getElementById('clock');
this.timer = document.getElementById('timer');

      for (let i = 1; i <= 60; i++) {
        let currentDash = this.dashes[i];
        currentDash = this.renderer.createElement('div');
        currentDash.setAttribute('class', 'dash');
        currentDash.setAttribute('id', i);

        currentDash.style.MozTransformOrigin = '0 5.0em';
        currentDash.style.WebkitTransformOrigin = '0 5.0em';
        currentDash.style.OTransformOrigin = '0 5.0em';
        currentDash.style.MsTransformOrigin = '0 5.0em';
        currentDash.style.transformOrigin = '0 5.0em';

        currentDash.style.MozTransform = 'rotate(' + this.angle + 'deg)';
        currentDash.style.WebkitTransform = 'rotate(' + this.angle + 'deg)';
        currentDash.style.OTransform = 'rotate(' + this.angle + 'deg)';
        currentDash.style.MsTransform = 'rotate(' + this.angle + 'deg)';
        currentDash.style.transform = 'rotate(' + this.angle + 'deg)';

        this.dashes[i] = currentDash;
        this.dial.appendChild(this.dashes[i]);
        this.angle += 6;
      };
   }
}
