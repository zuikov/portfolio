import { Component, OnInit, Input } from '@angular/core';
import { NgForm} from '@angular/forms';
// import { TimerService }     from '../timer/timer.service';

// import { TimerClockComponent } from '../timer-clock/timer-clock.component';

@Component({
  selector: 'app-timer-form',
  templateUrl: './timer-form.component.html',
  styleUrls: ['./timer-form.component.css'],
  // providers: [TimerService]
})

export class TimerFormComponent implements OnInit {
  

  minutes: string;
  seconds: string;
  timer: any;
  
  // constructor(private friendlyNumbersService: FriendlyNumbersService) { }
  // constructor(private timerService: TimerService) { }

setMinutes(minutes) {
  minutes = minutes.replace(/[^0-9]+/g, '');
  this.minutes = minutes;
}

setSeconds(seconds) {
  seconds = seconds.replace(/[^0-9]+/g, '');
  if (seconds > 60) seconds = 60;
    
  this.seconds = seconds;
}

setTime(minutes, seconds) {
  if(minutes && seconds &&
    minutes.length == 2 &&
    seconds.length == 2){
    this.timer.innerHTML = minutes + ':' + seconds;
  }
}

  ngOnInit() {
    this.minutes = '01';
    this.seconds ='10';
    this.timer = document.getElementById('timer');
  }
}








// export class TimerFormComponent implements OnInit {

//   // @Input()  minutes: number | string;
//   // @Input()  seconds: number | string;
  

//   setTimer: NgForm;

//   constructor() { }

//   ngOnInit() {

//   //   onsubmit(myForm: NgForm){
//   //     console.log(myForm);
//   // }

//     const timer = document.getElementById('timer');
  
// // Passes the data from form to the clock, filters the data and
// // provides buttons and input fields
//   var ua = navigator.userAgent,
//   // timerSettings = document.querySelector('setTimer'),

//     // timerSettings = this.setTimer,

//     timerSettings = document.forms.setTimer,
//     // setTimer = setTimer,
//     // timerSettings = NgForm,
//     inputIvent = 'change';

//   // const minutesInput = document.getElementById('minutes');
//   // const secondsInput = document.getElementById('secondss');

//   const startButton = timerSettings.elements.startButton;
//   const pauseButton = timerSettings.elements.pauseButton;
//   const resetButton = timerSettings.elements.resetButton;

//   // const startButton = timerSettings.controls.startButton;
//   // const pauseButton = timerSettings.controls.pauseButton;
//   // const resetButton = timerSettings.controls.resetButton;

//   const minutesInput = timerSettings.elements.minutes;
//   const secondsInput = timerSettings.elements.seconds;

//   // const minutesInput = timerSettings.controls.minutes;
//   // const secondsInput = timerSettings.controls.seconds;

//   // This is the hand-made polyfill for IE11   
//   if (ua.search(/11.0/) > -1) {
//     inputIvent = 'keyup';
//   };
  

  
//   // Pass the data from the input fields to the timer view
//   // and update clock color
//   minutesInput.addEventListener(inputIvent, function (e) {
//     timer.innerHTML = minutesInput.value + ':' + secondsInput.value;
//   });

//   secondsInput.addEventListener(inputIvent, function (e) {
//     restrictMaxValue(secondsInput);
//     timer.innerHTML = minutesInput.value + ':' + secondsInput.value;
//   });

//   // Restricts incorrect insertion in the input fields
//   minutesInput.oncontextmenu = () => { return false };
//   secondsInput.oncontextmenu = () => { return false };

//   minutesInput.addEventListener('keyup', (e) => {
//     filterValue(minutesInput);
//   });

//   secondsInput.addEventListener('keyup', (e) => {
//     filterValue(secondsInput);
//     restrictMaxValue(secondsInput);
//   });

//   // Only number input is permitted due to the function bellow
//   function filterValue(e) {
//     e.value = e.value.replace(/[^0-9]+/g, '');
//   };
//   // This function restricts the max value for second input
//   function restrictMaxValue(e) {
//     if (e.value > 60) e.value = 60;
//   };
  


//   }
    

// }
