import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { LoggerService } from '../logger.service';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.css']
})
export class ObserverComponent implements OnInit {

  @Input() num: number = -1

  constructor(private http: HttpService, private log: LoggerService, private timer: TimerService) {
  }

  ngOnInit(): void {    
    if(this.isThirdObserver()) {
      this.setSubscriptionLateMulticast()
    }
    
    if(this.isSeconddObserver()){
      this.setSubscriptionRunningMulticast()
    }
    
    if(this.isFirstObserver()){
      this.setSubscriptionUnicast()
    }
  }

  private isThirdObserver(): boolean{
    return this.num === 3
  }
  private isSeconddObserver(): boolean{
    return this.num === 2
  }
  private isFirstObserver(): boolean{
    return this.num === 1
  }

  /**
   * Connects with a delay to a multicast that is running already so it will miss a few initial values
   */
  private setSubscriptionLateMulticast(){
    setTimeout(() => {
      this.timer.getMultiCastTimerObservable().subscribe(
        res => this.log.put('observer #' + this.num + ' received a time update with value: ' + res),
        err => this.log.put('multicast subscription #' + this.num + ' could not be initialized: ' + err),
        () => this.log.put('multicast subscription is done for component #' + this.num)
      )
      this.log.put('observer #' + this.num + ' has set up its late multicast subscription')   
    }, 4000)  
  }

  /**
   * Connects to a multicast that is running already but does it with no delay so it will surely get all updates from it
   */
  private setSubscriptionRunningMulticast(){
    this.timer.getMultiCastTimerObservable().subscribe(
      res => this.log.put('observer #' + this.num + ' received a time update with value: ' + res),
      err => this.log.put('multicast subscription #' + this.num + ' could not be initialized: ' + err),
      () => this.log.put('multicast subscription is done for component #' + this.num)
    )
    this.log.put('observer #' + this.num + ' has set up its prompt multicast subscription')   
  }

  /**
   * Connects to a unicast observable i.e. it will always get a full iteration from the beginning, no matter if the observable
   * has running subscriptions already
   */
  private setSubscriptionUnicast(){
    setTimeout(() => {
      this.timer.getTimerObservable().subscribe(
        res => this.log.put('observer #' + this.num + ' received a time update with value: ' + res),
        err => this.log.put('unicast subscription #' + this.num + ' could not be initialized: ' + err),
        () => this.log.put('unicast subscription is finally done for component #' + this.num)
      )
      this.log.put('observer #' + this.num + ' has set up its -just-in-time- unicast subscription')   
    }, 2000)
  }
}
