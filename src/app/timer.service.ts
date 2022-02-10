import { Injectable } from '@angular/core';
import { interval, Observable } from 'rxjs';
import { share, take } from 'rxjs/operators';

const TIME_LIMIT = 5

@Injectable({
  providedIn: 'root'
})
class TimerService {
  private timer$: Observable<number>
  private multicastTimer$: Observable<number>

  constructor() { 
    this.timer$ = interval(1000).pipe(take(TIME_LIMIT))
    this.multicastTimer$ = this.timer$.pipe(share())
  }

  getTimerObservable(): Observable<number>{
    return this.timer$
  }

  getMultiCastTimerObservable(): Observable<number>{
    return this.multicastTimer$
  }
}

export {TimerService, TIME_LIMIT}