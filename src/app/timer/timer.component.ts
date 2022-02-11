
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggerService } from '../services/logger.service';
import { TimerService, TIME_LIMIT } from '../services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  unicastSecondsLeft: number = TIME_LIMIT
  multicastSecondsLeft: number = TIME_LIMIT
  unicastTimerSub: Subscription = new Subscription()
  multicastTimerSub: Subscription = new Subscription()

  constructor(private timer: TimerService, private log: LoggerService) {
  }

  /**
   * Fires up both observable timers by subscribing to both of them, this way both timers are in sync.
   */
  ngOnInit(): void {  
    this.setUnicastSubscription()  
    this.setMulticastSubscription()
  }

  private setUnicastSubscription(): void{
    this.unicastTimerSub = this.timer.getTimerObservable().subscribe(
      res => this.displayCurrentTimerTick(res, true),
      err => this.log.put('unicast timer could not be initialized: ' + err),
      () => this.log.put('unicast subscription is done for component timer')
    )
    this.log.put('timer has set up its unicast subscription')   
  }

  private setMulticastSubscription(): void{
    this.multicastTimerSub = this.timer.getMultiCastTimerObservable().subscribe(
      res => this.displayCurrentTimerTick(res, false),
      err => this.log.put('multicast timer could not be initialized: ' + err),
      () => this.log.put('multicast subscription is done for component timer')
    )
    this.log.put('timer has set up its multicast subscription') 
  }

  private displayCurrentTimerTick(currentTick: number, isUnicast: boolean): void {
    const currentTickInteger = (currentTick + 1) // rxjs interval operator starts at 0

    if(isUnicast) this.unicastSecondsLeft = TIME_LIMIT - currentTickInteger
    else this.multicastSecondsLeft = TIME_LIMIT - currentTickInteger
  }
}
