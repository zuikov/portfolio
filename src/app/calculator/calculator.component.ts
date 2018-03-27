import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  constructor() { }

  ngOnInit() {

    function add(a: number, b: number) { return a + b; }
    function subtraction(a: number, b: number) { return a - b; }
    function multiplication(a: number, b: number) { return +(a * b); }
    function division(a: number, b: number) { return +(a / b); }

    class Command {
      execute: Function;
      undo: Function;
      value: number;
      constructor(execute: Function, undo: Function, value: number) {
        this.execute = execute;
        this.undo = undo;
        this.value = value;
      }
    }

    class AddCommand {
      constructor(value: number) {
        return new Command(add, subtraction, value);
      }
    }

    class SubtractionCommand {
      constructor(value: number) {
        return new Command(subtraction, add, value);
      }
    }

    class MultiplicationCommand {
      constructor(value: number) {
        return new Command(multiplication, division, value);
      }
    }

    class DivisionCommand {
      constructor(value: number) {
        return new Command(division, multiplication, value);
      }
    }

    class Calculator {
      _current: number;
      _commands: string[];
      _currentSum: number;

      constructor() {
        this._current = 0;
        this._commands = [];
      }

      execute(command) {
        this._current = command.execute(this._current, command.value);
        this._commands.push(command);
      }

      undo(arr) {
        if (arr.length) {
          input.innerHTML = arr.pop(arr[arr.length - 1]);
        };
      }

      getCurrentValue() {
        return this._current;
      }
    }

    let instance = new Calculator();


    // Присваиваем узлы DOM в javascript-переменные  
    const input = document.getElementById('input'), // input/output button
      number = document.querySelectorAll('.numbers div'), // number buttons
      operator = document.querySelectorAll('.operators div'), // operator buttons
      result = document.getElementById('result'), // equal button
      undo = document.getElementById('undo'), // undo button
      clear = document.getElementById('clear'); // clear button
    let resultDisplayed = false; // flag to keep an eye on what output is displayed

    let undoString = [];

    //-------------------------------------------------------------------------------------------------------
    // здесь логика ввода чисел
    // adding click handlers to number buttons
    for (let i = 0; i < number.length; i++) {
      number[i].addEventListener("click", function (event) {

        // storing current input string and its last character in variables - used later
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        let currentEvent = <Element>event.target;

        // if result is not diplayed, just keep adding
        if (resultDisplayed === false) {
          input.innerHTML += currentEvent.innerHTML;
        } else if (resultDisplayed === true &&
          lastChar === "+" ||
          lastChar === "-" ||
          lastChar === "×" ||
          lastChar === "÷") {
          // if result is currently displayed and user pressed an operator
          // we need to keep on adding to the string for next operation
          resultDisplayed = false;
          input.innerHTML += currentEvent.innerHTML;
        } else {
          // if result is currently displayed and user pressed a number
          // we need clear the input string and add the new input to start the new opration
          resultDisplayed = false;
          input.innerHTML = "";
          input.innerHTML += currentEvent.innerHTML;
        }
      });
    }

    //-------------------------------------------------------------------------------------------------------
    // здесь логика ввода операторов
    // adding click handlers to operator buttons
    for (let i = 0; i < operator.length; i++) {
      operator[i].addEventListener("click", function (event) {

        // storing current input string and its last character in variables - used later
        let currentString = input.innerHTML;
        let lastChar = currentString[currentString.length - 1];

        let currentEvent = <Element>event.target;

        // if last character entered is an operator, replace it with the currently pressed one
        if (lastChar === "+" ||
          lastChar === "-" ||
          lastChar === "×" ||
          lastChar === "÷") {
          let newString = currentString.substring(0, currentString.length - 1) + currentEvent.innerHTML;
          input.innerHTML = newString;
        } else if (currentString.length == 0) {
          // if first key pressed is an opearator, don't do anything
          console.log("enter a number first");
        } else {
          // else just add the operator pressed to the input
          input.innerHTML += currentEvent.innerHTML;
        }

      });
    }

    //---------------------------------------------------------------------------------------------------------
    // логика отмены арифметических операций
    // on click of 'undo' button
    undo.addEventListener("click", function () {

      instance.undo(undoString);
      resultDisplayed = true; // turning flag if result is displayed
    });


    //---------------------------------------------------------------------------------------------------------
    // логика выполнения арифметических операций
    // on click of 'equal' button
    result.addEventListener("click", function () {

      // this is the string that we will be processing eg. -10+26+33-56*34/23
      let inputString = input.innerHTML;

      undoString.push(inputString);

      // forming an array of numbers. eg for above string it will be: numbers = ["10", "26", "33", "56", "34", "23"]
      let numbers: string[] = inputString.split(/\+|\-|\×|\÷/g);

      // let numbers = numbersString.map((item) => {
      //   parseFloat(item);
      // });


      // forming an array of operators. for above string it will be: operators = ["+", "+", "-", "*", "/"]
      // first we replace all the numbers and dot with empty string and then split
      let operators = inputString.replace(/[0-9]|\./g, "").split("");

      // now we are looping through the array and doing one operation at a time.
      // first divide, then multiply, then subtraction and then addition
      // as we move we are alterning the original numbers and operators array
      // the final element remaining in the array will be the output

      let divide = operators.indexOf("÷");
      while (divide != -1) {
        instance.execute(new AddCommand(parseFloat(numbers[divide])));
        instance.execute(new DivisionCommand(parseFloat(numbers[divide + 1])));
        numbers.splice(divide, 2, instance.getCurrentValue().toString());
        operators.splice(divide, 1);
        divide = operators.indexOf("÷");
        instance._currentSum += instance._current;
        instance._current = 0;
      }

      let multiply = operators.indexOf("×");
      while (multiply != -1) {
        instance.execute(new AddCommand(parseFloat(numbers[multiply])));
        instance.execute(new MultiplicationCommand(parseFloat(numbers[multiply + 1])));
        numbers.splice(multiply, 2, instance.getCurrentValue().toString());
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
        instance._currentSum += instance._current;
        instance._current = 0;
      }

      let subtract = operators.indexOf("-");
      while (subtract != -1) {
        instance.execute(new AddCommand(parseFloat(numbers[subtract])));
        instance.execute(new SubtractionCommand(parseFloat(numbers[subtract + 1])));
        numbers.splice(subtract, 2, instance.getCurrentValue().toString());
        operators.splice(subtract, 1);
        subtract = operators.indexOf("-");
        instance._currentSum += instance._current;
        instance._current = 0;
      }

      let add = operators.indexOf("+");
      while (add != -1) {
        // using parseFloat is necessary, otherwise it will result in string concatenation :)
        instance.execute(new AddCommand(parseFloat(numbers[add])));
        instance.execute(new AddCommand(parseFloat(numbers[add + 1])));
        numbers.splice(add, 2, instance.getCurrentValue().toString());
        operators.splice(add, 1);
        add = operators.indexOf("+");
        instance._currentSum += instance._current;
        instance._current = 0;
      }

      input.innerHTML = numbers[0]; // displaying the output

      resultDisplayed = true; // turning flag if result is displayed

      return undoString;
    });

    //-------------------------------------------------------------------------------------------
    // clearing the input on press of clear
    clear.addEventListener("click", function () {
      input.innerHTML = "";
    })


  }

}
