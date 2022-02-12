import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { ConsoleComponent } from './console/console.component';
import { ObservableComponent } from './observable/observable.component';
import { ObserverComponent } from './observer/observer.component';
import { ArrowComponent } from './arrow/arrow.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    ConsoleComponent,
    ObservableComponent,
    ObserverComponent,
    ArrowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
