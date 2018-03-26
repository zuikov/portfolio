import { AfterViewInit, ViewChild } from '@angular/core';

import { Component, OnInit, Input } from '@angular/core';

// import { TimerService }     from '../timer/timer.service';

import { TimerClockComponent } from '../timer-clock/timer-clock.component';
import { TimerFormComponent } from '../timer-form/timer-form.component';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  // providers: [TimerService]
})


export class TimerComponent implements AfterViewInit {

  startDisabled: boolean = false;
  pauseDisabled: boolean = true;
  resetDisabled: boolean = true;
  pauseButton: string = 'Pause the timer';
  timerId;
  dial;

  @ViewChild(TimerClockComponent)
  private timerClockComponent: TimerClockComponent;

  @ViewChild(TimerFormComponent)
  private timerFormComponent: TimerFormComponent;

  

  ngAfterViewInit() {
    this.timerClockComponent.dial.addEventListener('click', (e) => {
      console.log('this.timerClockComponent2', this.timerClockComponent);
      let target = e.target,
        currentSecond = +target.id;
      if (isNaN(currentSecond)) return currentSecond;
      let [m, s] = this.timerClockComponent.getTime();
    
      if (m == 0 && s > 0) {
        s = currentSecond;
        if (s < 10) s = '0' + s;
        this.timerClockComponent.timer.innerHTML = m + ':' + s;
        this.timerClockComponent.changeClockColor(1, this.timerClockComponent.activeColor, this.timerClockComponent.activeColor);
        this.timerClockComponent.changeClockColor(currentSecond + 1, 'grey', this.timerClockComponent.activeColor);
      };
    })
  }

constructor() { 
}


//  Controls for the form and timer elements

start() {
  // e.preventDefault();
  this.timerClockComponent.isStart = true;
  this.timeCounter();
  this.timerClockComponent.changeClockColor(1, this.timerClockComponent.activeColor, this.timerClockComponent.activeColor);
  this.startDisabled = true;
  this.pauseDisabled = false;
}

pause() {
  // e.preventDefault();
  if (!this.timerClockComponent.isPause) {
    clearTimeout(this.timerId);
    this.pauseButton = 'Run the timer';
    this.timerClockComponent.isPause = true;
  } else {
    this.timeCounter();
    this.pauseButton = 'Pause the timer';
    this.timerClockComponent.isPause = false;
  };
}

reset() {
  // e.preventDefault();
  this.startDisabled = false;
  this.pauseDisabled = true;
  this.resetDisabled = true;
  this.timerFormComponent.minutes = '01';
  this.timerFormComponent.seconds = '10';
  this.timerClockComponent.timer.innerHTML = '01:10';
};

  timeCounter() {
    let [m, s] = this.timerClockComponent.getTime();
    this.timerClockComponent.updateClockColor(m);
    if (s == 0) {
      if (m == 0) {
        this.pauseDisabled = true;
        this.resetDisabled = false;
        this.timerClockComponent.changeClockColor(1, 'grey', 'grey')
        return;
      }
      m--;
      if (m < 10) m = '0' + m;
      s = 59;
    }
    else s--;
  
    if (m == 0) {
      this.timerClockComponent.changeClockColor(1, this.timerClockComponent.activeColor, this.timerClockComponent.activeColor);
      this.timerClockComponent.changeClockColor(s + 1, 'grey', this.timerClockComponent.activeColor);
    };
    if (m == 0 && s < 10) this.timerClockComponent.blink();
    if (s < 10) s = '0' + s;
    this.timerClockComponent.timer.innerHTML = m + ':' + s;
    this.timerId = setTimeout(() => this.timeCounter(), 1000);
  };
  
  
  ngOnInit() {
    window.addEventListener('resize', (e) => {
  this.timerClockComponent.setActiveColor();
});
  }

}
  
// Implements timer logic realization


// // Controls for the form and timer elements


// // Timer realisation
