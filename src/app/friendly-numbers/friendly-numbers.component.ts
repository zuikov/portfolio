import { Component, OnInit } from '@angular/core';
import { FriendlyNumbersService } from './friendly-numbers.service';

import { NgModule } from '@angular/core';
import { isArray } from 'util';


@Component({
  selector: 'app-friendly-numbers',
  templateUrl: './friendly-numbers.component.html',
  styleUrls: ['./friendly-numbers.component.css'],
  providers: [FriendlyNumbersService]
})



export class FriendlyNumbersComponent implements OnInit {
  start: number;
  end: number;
  result: {}[];
  isStop: boolean;
  isFindDisabled: boolean;
  isStopDisabled: boolean;
  findDisabled: boolean = false;
  stopCalculate: boolean;
  progressbar: number = 0;
  iterationAmount: number = 100;
  friendlyPairs: any = [];
  finishMessage: string;
  friendlyPairFirstPart: {pair: string, author?: string}[] = [];
  friendlyPairSecondPart: {pair: string, author?: string}[] = [];
 
  constructor(private friendlyNumbersService: FriendlyNumbersService) {
    
   }

calculateFriendlyNumbers(start, end) {
    this.progressbar = 0;
    this.finishMessage = '';
    let result = this.getFriendlyNumbers(start, end);


  for (let i = 0; i <= 100; i++) {
    setTimeout(() => {

      let currentResult = result.next();

      // console.log(currentResult.value);
      
        if(typeof(currentResult.value) === 'string') {
          this.finishMessage = currentResult.value;
          this.progressbar = 100;

          setTimeout(() => {
            this.progressbar = 0;
            this.isFindDisabled = false;
          }, 300);
        };

    });
      
  };

  }

// ---------------------------------------------------------------------

getFriendlyNumbers = function* getFriendlyNumbers(start: number, end: number) {
  // Проверяем корректность заданного диапазона поиска

  if (start === undefined || end === undefined) {
    this.result = [];
    return false;
  };

  if (start == 0 || end == 0) {
    this.result = [];
    return false;
  };

  if ((Number.isInteger(start) == false) || (Number.isInteger(end) == false)) {
    this.result = [];
    return false;
  };

  if (start > end || start < 0) {
    this.result = [];
    return false;
  };

  // Объявляем массив с дружественными числами  
  this.result = [];
  this.findDisabled = true;


  // let currentPair = [];

  this.friendlyNumbersService.findSimpleNewdevider(end);

  let interval = Math.ceil((end - start) / 100),
      i = 0;
      if((end - start) < 100) this.progressbar = 100;
  // Проходим наш диапазон, вызывая функцию для подсчета суммы делителей
  // и записываем в массив найденные дружественные числа 

  for (let currentNumber = start; currentNumber <= end; currentNumber++) {
    
    if(this.stopCalculate) currentNumber = end;

    i += 1;
    if (this.progressbar < 100 && i === interval) {
      this.progressbar += 1;
      i = 0;
      yield 1;
    }
    
    // setTimeout(() => {
      
     
      // this.progressbar = Math.round((currentNumber - start) / interval * 100);

      
      if (this.stopCalculate) {
        this.progressbar = 0;
        this.findDisabled = false;
        return false;
      }; 


      

      let second = this.friendlyNumbersService.getPrimeDevedersSum(currentNumber);
      if (currentNumber < second && second <= end && this.friendlyNumbersService.getPrimeDevedersSum(second) == currentNumber) {

       
        let currentPair = [currentNumber, second];
        this.result.push(currentPair);
        // yield currentPair;
      };


      
      
      // if(this.progressbar == 100) {
      //   yield this.progressbar = 0;
      //   this.findDisabled = false;
      // };

      // if(this.progressbar == 100) setTimeout(() => {
      //   this.progressbar = 0;
      //   this.findDisabled = false;
      // }, 300);



    // });

  };
  // return 'Calculation is finished';
  return 'calculation is finished';
};



// --------------------------------------------------------------------------

startCalculate() {
  this.stopCalculate = false;
  this.isFindDisabled = true;
  this.isStopDisabled = false;
}

stopCalculating() {
    this.stopCalculate = true;
    this.isFindDisabled = false;
    this.isStopDisabled = true;
}

 
  ngOnInit() {

    this.stopCalculate = false;
    this.isStop = false;
    this.friendlyPairFirstPart = [
      {pair: '220 and 284', author: 'Pythagoras, 500 b.c.'},
      {pair: '1184 and 1210', author: 'Niccolò Paganini, 1866 a.d.'},
      {pair: '2620 and 2924', author: 'Leonhard Euler, 1747 a.d.'},
      {pair: '5020 and 5564', author: 'Leonhard Euler, 1747 a.d.'},
      {pair: '6232 and 6368', author: 'Leonhard Euler, 1750 a.d.'},
      {pair: '10 744 and 10 856', author: 'Leonhard Euler, 1747 a.d.'},
      {pair: '12 285 and 14 595', author: 'Brown, 1939 a.d.'},
      {pair: '17 296 and 18 416', author: 'Ibn al-Bannā 1300 a.d., Pierre de Fermat, 1636 a.d.'},
      {pair: '63 020 and 76 084', author: 'Leonhard Euler, 1747 a.d.'},
      {pair: '66 928 and 66 992', author: 'Leonhard Euler, 1750 a.d.'},
      {pair: '67 095 and 71 145', author: 'Leonhard Euler, 1747 a.d.'},
      {pair: '69 615 and 87 633', author: 'Leonhard Euler, 1747 a.d.'},
      {pair: '79 750 and 88 730', author: 'Rolf, 1964 a.d.'},
      {pair: '100 485 and 124 155'},
      {pair: '122 265 and 139 815'},
      {pair: '122 368 and 123 152'},
      {pair: '141 664 and 153 176'},
      {pair: '142 310 and 168 730'},
      {pair: '171 856 and 176 336'},
      {pair: '176 272 and 180 848'}
    ]; 

    this.friendlyPairSecondPart = [
      {pair: '185 368 and 203 432'},
      {pair: '196 724 and 202 444'},
      {pair: '280 540 and 365 084'},
      {pair: '308 620 and 389 924'},
      {pair: '319 550 and 430 402'},
      {pair: '356 408 and 399 592'},
      {pair: '437 456 and 455 344'},
      {pair: '469 028 and 486 178'},
      {pair: '503 056 and 514 736'},
      {pair: '522 405 and 525 915'},
      {pair: '600 392 and 669 688'},
      {pair: '609 928 and 686 072'},
      {pair: '624 184 and 691 256'},
      {pair: '635 624 and 712 216'},
      {pair: '643 336 and 652 664'},
      {pair: '667 964 and 783 556'},
      {pair: '726 104 and 796 696'},
      {pair: '802 725 and 863 835'},
      {pair: '879 712 and 901 424'},
      {pair: '898 216 and 980 984'}
    ]; 
  }

}
