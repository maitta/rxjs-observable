import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { ConsoleComponent } from './console/console.component';
import { ObservableComponent } from './observable/observable.component';
import { ObserverComponent } from './observer/observer.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ConsoleComponent,
    ObservableComponent,
    ObserverComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
