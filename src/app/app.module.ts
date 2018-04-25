import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalBasic } from '../modal-basic';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { TimerComponent } from './timer/timer.component';
import { TimerClockComponent } from './timer-clock/timer-clock.component';
import { TimerFormComponent } from './timer-form/timer-form.component';
import { FriendlyNumbersComponent } from './friendly-numbers/friendly-numbers.component';
import { HardwareProjectsComponent } from './hardware-projects/hardware-projects.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SalaryComponent } from './salary/salary.component';
import { ArticlesComponent } from './articles/articles.component';

// import {HashLocationStrategy, Location, LocationStrategy} from '@angular/common';

const appRoutes: Routes = [
  { path: 'timer', component: TimerComponent },
  { path: 'calculator', component: CalculatorComponent },
  {
    path: 'friendly-numbers',
    component: FriendlyNumbersComponent,
    data: { title: 'FriendlyNumbers base' }
  },
  { path: 'hardware-projects', component: HardwareProjectsComponent },
  { path: 'salary', component: SalaryComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'about-me', component: AboutMeComponent },
  { path: '',
    redirectTo: 'timer',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/' }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NgbdModalBasic,
    CalculatorComponent,
    TimerComponent,
    TimerClockComponent,
    TimerFormComponent,
    FriendlyNumbersComponent,
    HardwareProjectsComponent,
    AboutMeComponent,
    SalaryComponent,
    ArticlesComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true }),
    // RouterModule.forRoot(
    //   appRoutes
    //   // { enableTracing: true } // <-- debugging purposes only
    // ),
    BrowserModule,
    FormsModule,
    NgbModule.forRoot() // Add Bootstrap module here.
  ],
  // providers: [Location, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export class HashLocationComponent {
//   location: Location;
//   constructor(location: Location) { this.location = location; }
// }