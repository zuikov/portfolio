import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // import the NgbModule coming from Ng-bootstra1
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
// import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

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
    RouterModule.forRoot(
      appRoutes
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    NgbModule.forRoot() // Add Bootstrap module here.
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// export class NgbdDropdownConfig {
//   constructor(config: NgbDropdownConfig) {
//     // customize default values of dropdowns used by this component tree
//     config.placement = 'top-left';
//     config.autoClose = false;
//   }
// }
