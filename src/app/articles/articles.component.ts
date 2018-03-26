import { Component, OnInit,  Renderer2, ElementRef } from '@angular/core';

// import {ArticlesService } from './articles.service';

import { Article } from '../article';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
//   providers: [ArticlesService]
})

export class ArticlesComponent implements OnInit {
    title: string;
    content: string;
    url: URL;
    removedTitle: string;
    queryTitle: string;
    queryString: string;
    articles: Article[] = [];
    detectedArticle: Article;
    isBusy: boolean;
    borderColor: string; 

    news = [
        {title: `How this module works`,
         content: `There shouldn\'t
         be an identical by amount of key-words articles. Counterparts will be removed
         by sort-method. Words should be divided by white space`},
        {title: `The Promise of a Burger Party`,
         content: `Two weeks ago, I was
         in a conversation about how I might implement a feature in JavaScript.
         It needed to be asynchronous to access external data, I said "well,
         let's use fetch()...so in code... umm..." while I paused to remember
         fetch API, the person I was talking to said, "It returns a promise".
         My brain froze, and I said: "I honestly don't know what you mean..."` ,
         url: new URL('https://kosamari.com/notes/the-promise-of-a-burger-party')   },
        {title: `Design patterns`,
         content: `Design patterns are advanced object-oriented solutions
          to commonly occurring software problems.  Patterns are about reusable
          designs and interactions of objects.  Each pattern has a name and 
          becomes part of a vocabulary when discussing complex design solutions...`,
          url: new URL('http://www.dofactory.com/javascript/design-patterns')}
    ];

   
    
    // constructor(private renderer: Renderer2, private el: ElementRef) { }
    // constructor(private articleService: ArticlesService) { }

  ngOnInit() {

    this.isBusy = false;
    this.borderColor = '#999999';
//----------------------------------------------------Method init
/* Implement initialization of the object */
/* Check that news array is not empty and all articles have title and content */

      if (!Array.isArray(this.news) ||
          !this.news.length) {
          return false;
      };

      let length = this.news.length
      for (let i = 0; i < length; i++) {
          if (!this.news[i].hasOwnProperty('title') ||
              !this.news[i].hasOwnProperty('content') ||
              typeof (this.news[i].title) === 'undefined' ||
              typeof (this.news[i].content) === 'undefined' ||
              !/\S/.test(this.news[i].title) ||
              !/\S/.test(this.news[i].content)) {
              i = length;
              return false;
          };
      };
      this.articles = this.news;
  };




  callbackFunction(value) {
    return value;
  };
 

//-------------------------------------------------Method addArticle
/* Check that article is valid and callbackFunction exists */ 
/* Push new article into this. articles array */  
    addArticle(title: string, content: string, callbackFunction) {
        if (this.isBusy || typeof callbackFunction !== 'function') {
            return false;
        };
        this.isBusy = true;

        setTimeout(() => {
            if (title && content && title !== '' && content !== '') {
                this.articles.push(new Article(title, content));
                this.isBusy = false;
                callbackFunction();
            } else {
                this.isBusy = false;
                callbackFunction();
            };
        });
    };


//-------------------------------------------------Method removeArticle
/* Metod removes first appropriate article */
/* Check that article is valid and callbackFunction exists */ 
    removeArticle(removedTitle: string, callbackFunction) {
        if (this.isBusy ||
            typeof callbackFunction !== 'function' ||
            removedTitle === '') {
            return false;
        };
        this.isBusy = true;

        setTimeout(() => {
                let length = this.articles.length;
                for (let i = 0; i < length; i++) {
                    if (this.articles[i].title === removedTitle) {
                        this.articles.splice(i, 1);
                        i = length;
                        this.isBusy = false;
                        callbackFunction(this.articles[i]);
                    };
                };
                this.isBusy = false;
                callbackFunction(null);
        });
    };         


//--------------------------------------------------------Method find
/* Pass found article into callback, stop on first match */
    find(title, callbackFunction) {
        if (this.isBusy ||
            typeof title !== 'string' ||
            typeof callbackFunction !== 'function') {

            return false;
        };
        this.isBusy = true;

        setTimeout(() => {
                let length = this.articles.length;
                for (let i = 0; i < length; i++) {

                    if (this.articles[i].hasOwnProperty('title') &&
                        this.articles[i].hasOwnProperty('content') &&
                        title === this.articles[i].title) {
                            // this.borderColor = 'red';
                            this.detectedArticle = this.articles[i];  

                        this.isBusy = false;
                        callbackFunction(this.articles[i]);
                        i = length;
                    }
                };
                this.isBusy = false;
                callbackFunction(null);
        });

    };

//----------------------------------------------------Method query
/* Return found sorted articles  */
/* Range found articles according to number of coincidental keywords */
    query(queryString) {
        if (this.isBusy ||
            typeof queryString === 'undefined' ||
            queryString === '') {

            return false;
        };
        this.isBusy = true;

        var spacer = /\s+/g; 

        let arrOfArticles = [],
            arrOfSortedArticles = [],
            queryWords = queryString.toLowerCase().split(spacer),
            uniqueQueryWords = getUnique(queryWords); 

        /* set strings as object property names */
        /* identical words turn in to one object property name */
        /* and due to square brackets strange symbols in names are possible) */
        function getUnique(arr) {
            let obj = {},
                length = arr.length
            for (let i = 0; i < length; i++) {
              let str = arr[i];
              obj[str] = true; 
            }
            return Object.keys(obj); // it will not work with IE8 without polyfill
          };
         
        let length = this.articles.length;
        for (let i = 0; i < length; i++) {
           
            if (this.articles[i].hasOwnProperty('title') &&
                this.articles[i].hasOwnProperty('content')) {

            let title = this.articles[i].title.toLowerCase().split(spacer),
                content = this.articles[i].content.toLowerCase().split(spacer),
                currrentString = title.concat(content),
                hitsCounter = 0;

                for (let j = 0; j < uniqueQueryWords.length; j++) {
                    for (let k = 0; k < currrentString.length; k++) {
                        if ( currrentString[k] === uniqueQueryWords[j] ) {
                            hitsCounter += 1;
                        };
                    };
                };
                if (hitsCounter) {
                /* use hitsCounter as index for arrOfArticles elements  */    
                    arrOfArticles[hitsCounter] = this.articles[i];
                }; 
            };
        };
        
        arrOfArticles.reverse();   
        arrOfSortedArticles = arrOfArticles.filter(function(item) {
            return item !== undefined 
        });
        this.isBusy = false;   
        return this.articles = arrOfSortedArticles;
        
    };

//-------------------------------------------------Method getInstance
    // getInstance: function ()  {
    //     let instance;

    //     const singlton = (function () {
    //         if (!instance) {
    //             instance = NewsFeedModule;
    //         };    
    //     })();
    //     return instance;       
    // }
    
}