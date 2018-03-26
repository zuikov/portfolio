import { Component, OnInit } from '@angular/core';

import { Participant } from '../participant';

@Component({
  selector: 'app-salary',
  templateUrl: './salary.component.html',
  styleUrls: ['./salary.component.css']
})
export class SalaryComponent implements OnInit {
  seniorityLevel: string;
  firstName: string;
  lastName: string;
  price: number;
  constructor() {
    
  }

  ngOnInit() {
  //----------------------------------------------------Method init
  /* implement initialization of the object */
  /* participants - predefined array of participants */
  /* pricing - predefined object (keyvalue collection) of pricing */
    this.participants = [
      { seniorityLevel: 'intermediate', firstName: 'Gregor', lastName: 'Clegane' },
      { seniorityLevel: 'intermediate', firstName: 'Daenerys', lastName: 'Targaryen' },
      { seniorityLevel: 'intermediate', firstName: 'Tyrion', lastName: 'Lannister' },
      { seniorityLevel: 'intermediate', firstName: 'Jon', lastName: 'Snow' },
      { seniorityLevel: 'intermediate', firstName: 'Cersei ', lastName: 'Lannister' },
      { seniorityLevel: 'intermediate', firstName: 'Sansa', lastName: 'Stark' },
      { seniorityLevel: 'intermediate', firstName: 'Jorah', lastName: 'Mormont' },
      { seniorityLevel: 'intermediate', firstName: 'Samwell', lastName: 'Tarly' }
    ];
    this.pricing = { 'junior': 50, 'intermediate': 70 };

    //---------------------------------------------------Default state 
    this.isBusy = false;  
    this.borderColor = '#999999';

    for(var key in this.pricing) {
      let seniorityLevel = key,
          price = this.pricing[key],
          currentPriceObject = {seniorityLevel, price};
      this.priceArray.push(currentPriceObject);
    };
  }

  participants: Participant[] = [];
  requiredParticipant: Participant;
  foundParticipantsNumbers: number[] = [];
  pricing: {[seniorityLevel : string]: number} = { };
  priceArray: {seniorityLevel: string, price: number}[] = [];
  isBusy: boolean; 
  borderColor: string;  
  participantNotFoundMessage: string;
  periodInDays: number;
  salary: number = 0;


  

  functorForParticipant = (participant) => {
    if (this.requiredParticipant.firstName && this.requiredParticipant.lastName &&
      this.requiredParticipant.firstName === participant.firstName &&
      this.requiredParticipant.lastName === participant.lastName) {
      // console.log('1', this.requiredParticipant);  
      return true;
    } else if (!this.requiredParticipant.firstName &&
      this.requiredParticipant.lastName === participant.lastName) {
        // console.log('2', this.requiredParticipant);  
      return true;
    } else if (!this.requiredParticipant.lastName &&
      this.requiredParticipant.firstName === participant.firstName) {
        // console.log('3', this.requiredParticipant);  
      return true;
    } else {
      return false;
    };
  };

  setParticipant(seniorityLevel, firstName, lastName) {
    this.requiredParticipant = new Participant (seniorityLevel, firstName, lastName);
  };

  callbackFunction(value) {
    return value;
  };

//--------------------------------------------------Method findParticipant
  /* pass found participant into callback, stops on first match */
  /* functor - function that will be executed for elements of participants array */
  /* callbackFunction - function that will be executed with found participant as argument or with null if not */
  /* callbackFunction (participant) => {} */


  findParticipant(functor, callbackFunction) {
    if (this.isBusy || typeof functor !== 'function') {
      return false;
    };
    this.isBusy = true;

      setTimeout(() => {
        this.foundParticipantsNumbers = [];
          let length = this.participants.length;
          
          for (let i = 0; i < length; i++) {
              if ( functor(this.participants[i]) ) {
                this.foundParticipantsNumbers[0] = i + 1;
                this.participantNotFoundMessage = ''; 
                  callbackFunction(this.participants[i]);
                  this.isBusy = false; 
                  break;
              } 
          };
         if(!this.foundParticipantsNumbers[0]) this.participantNotFoundMessage = 'Participant is not found'; 
         this.isBusy = false;
         callbackFunction(null);
      });
  };  

//----------------------------------------------Method findParticipants    
  /* pass array of found participants into callback */
  /* functor - function that will be executed for elements of participants array */
  /* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
  /* callbackFunction (participantsArray) => {} */


  findParticipants(functor, callbackFunction) {
      if (this.isBusy || typeof functor !== 'function') {
        return false;
      };
      this.isBusy = true;

        setTimeout(() => {
            this.foundParticipantsNumbers = [];
            let length = this.participants.length,
            result = [],
            counter = 0;
            for (let i = 0; i < length; i++) {
                if ( functor(this.participants[i]) ) {
                  
                  this.participantNotFoundMessage = ''; 
                  this.foundParticipantsNumbers[counter] = i + 1;
                  result[counter] = this.participants[i]; 
                  counter += 1;
                } 
            };
            if(!this.foundParticipantsNumbers[0]) this.participantNotFoundMessage = 'Participants are not found'; 
            this.isBusy = false;
            callbackFunction(result);
        });
    };   

//----------------------------------------------Method addParticipant  
  /* push new participant into this.participants array */
  /* callbackFunction - function that will be executed when job will be done */
  /* (err) => {} */

  addParticipant(participantObject, callbackFunction) {
        if (this.isBusy || typeof participantObject === 'undefined') {
          return false;
        };
        this.isBusy = true;
        var err = 'в объекте participant отсутствует обязательный кключ seniorityLevel'
          setTimeout(() => {
              if ( participantObject.seniorityLevel ) {
                if(participantObject.firstName && participantObject.lastName) {
                this.participants.push(participantObject);
                this.isBusy = false;  
                callbackFunction(); 
                };
              };

              this.isBusy = false;
              callbackFunction(err);
              
          });
   };

//-------------------------------------------------------Method removeParticipant     
  /* push new participant into this.participants array */
  /* callback should receive removed participant */
  /* callbackFunction - function that will be executed with object of removed participant
   or null if participant wasn't found when job will be done */

  removeParticipant(participantObject, callbackFunction) { 
     this.isBusy = true;
        setTimeout(() => {
         
          if (this.participants.length > 0 && participantObject && typeof participantObject !== 'undefined') {
              
              let length = this.participants.length;
              
               for (let i = 0; i < length; i++) {
                  if (participantObject.firstName ===  this.participants[i].firstName &&
                    participantObject.lastName ===  this.participants[i].lastName) {
                    this.participants.splice(i, 1);
                    callbackFunction(participantObject);
                    i = length;
                    this.foundParticipantsNumbers = [];
                  }; 
               };
            };
            
            this.isBusy = false;
            callbackFunction(null); 

         });
 };

//---------------------------------------------------Method setPricing
  /* Extends this.pricing with new field or change existing */
  /* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */

  setPricing(seniorityLevel, price,  callbackFunction) {
    
    this.priceArray = [];
    if (this.isBusy) {
      return false;
    };
        this.isBusy = true;
        
          setTimeout(() => {
  
                if (seniorityLevel && price) {
                    this.pricing[seniorityLevel] = price;
                };

            for(var key in this.pricing) {
              let seniorityLevel = key,
                  price = this.pricing[key],
                  currentPriceObject = {seniorityLevel, price};
        
              this.priceArray.push(currentPriceObject);
            };


             this.isBusy = false;
             callbackFunction();
          });
     };

//------------------------------------------------------------Method setPricing     
  /* calculates salary of all participants in the given period */
  /* periodInDays, has type number, one day is equal 8 working hours */
  calculateSalary(periodInDays) { 
    this.salary = 0;
     let length = this.participants.length;
     
        for (let i = 0; i < length; i++) {
     
           for (var key in this.participants[i]) {
               if (key == 'seniorityLevel') {
                   var worker = this.participants[i][key];

                     if ( this.pricing[worker] ) {
                      this.salary += periodInDays * 8 * this.pricing[worker];
                     } else {
                     throw Error('pricing wasn\'t found');    
                     };
               };
           };
        };
       return this.salary;
  };


//------------------------------------------------------------------------------------------------
// const instance;

// const ProjectModule = {           
//   getInstance: function ()  {
     
//        if (!this.instance) {

//           for (var key in project) {
//               this[key] = project[key]; 
//              };
//              instance =  ProjectModule.getInstance;
//        }    
//        return instance;      
//   }

// ProjectModule.getInstance();




}
