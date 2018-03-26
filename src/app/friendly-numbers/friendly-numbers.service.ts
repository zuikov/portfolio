import { Injectable } from '@angular/core';

@Injectable()
export class FriendlyNumbersService {
  
// Для нахождения делителей дружественного числа используем 
// пополняемый массив простых чисел
primeDeveders: number[] = [2, 3, 5, 7, 11, 13, 17];
primeMax: number = 17;

// findSimpleNewdevider пополняет массив простых чисел

findSimpleNewdevider(val) {
  if (val < this.primeMax) return 0;

  for (var i = this.primeMax; i < val; i++) {
    if (this.nothingDivided(i) != 0) {
      this.primeDeveders.push(i);
    };
  };
  this.primeMax = +i - 1;
};


nothingDivided(val) {
  for (let i = 0; i < this.primeDeveders.length; i++)

    if ((val % this.primeDeveders[i]) == 0) return 0;
  return 1;
};


// Для нахождения суммы делителей применена факторизация.
// Число делим на найденные заранее простые числа,
// затем повторяем процедуру для всех частных от деления.
// Повторяющиеся делители исключаем

getPrimeDevedersSum(val) {
  let devider = [+1];

  for (let i = 0; i < this.primeDeveders.length; i++) {
    if (this.primeDeveders[i] >= val) {
      break;
    };

    if ((val % this.primeDeveders[i]) != 0) {
      continue;
    };

    let res = val / this.primeDeveders[i];
    if (devider.indexOf(res) == -1) {
      devider.push(+(res));
    };

    if (devider.indexOf(this.primeDeveders[i]) == -1) {
      devider.push(+this.primeDeveders[i]);
    };
  };


  for (let i = 1; i < devider.length; i++) {

    for (let j = 1; j < devider.length; j++) {
      if (j == i) continue;
      if (devider[i] < devider[j]) continue;
      if (devider[i] % devider[j] != 0) continue;

      let res = devider[i] / devider[j];
      if (devider.indexOf(res) == -1) {
        devider.push(res);
      };
    };
  };

  // Подсчитываем сумму
  let sum = 0;

  for (let i = 0; i < devider.length; i++) {
    sum += devider[i];
  };
  return sum;

};


// Полифилл для IE и Safari
// Number.isInteger = Number.isInteger || function (value) {
//   return typeof value === 'number'
//     && Number.isFinite(value)
//     && !(value % 1);
// };

constructor() {  }

 
  ngOnInit() {
  }


}



