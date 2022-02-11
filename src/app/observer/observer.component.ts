import { Component, Input, OnInit } from '@angular/core';
import { Data } from '../json-server/data';
import { HttpService } from '../services/http.service';
import { LoggerService } from '../services/logger.service';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-observer',
  templateUrl: './observer.component.html',
  styleUrls: ['./observer.component.css']
})
export class ObserverComponent implements OnInit {

  @Input() num!: number
  data?: Data

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
        res => this.getData(res),
        err => this.handleTimerError(ConnectionType.multicast, err),
        () => this.handleTimerCompletion(ConnectionType.multicast)
      )
      this.log.put(`observer #${this.num} has set up its late multicast subscription`)   
    }, 4000)  
  }

  /**
   * Connects to a multicast that is running already but does it with no delay so it will surely get all updates from it
   */
  private setSubscriptionRunningMulticast(){
    this.timer.getMultiCastTimerObservable().subscribe(
      res => this.getData(res),
      err => this.handleTimerError(ConnectionType.multicast, err),
      () => this.handleTimerCompletion(ConnectionType.multicast)
    )
    this.log.put(`observer #${this.num} has set up its prompt multicast subscription`)   
  }

  /**
   * Connects to a unicast observable i.e. it will always get a full iteration from the beginning, no matter if the observable
   * has running subscriptions already
   */
  private setSubscriptionUnicast(){
    setTimeout(() => {
      this.timer.getTimerObservable().subscribe(
        res => this.getData(res),
        err => this.handleTimerError(ConnectionType.unicast, err),
        () => this.handleTimerCompletion(ConnectionType.unicast)
      )
      this.log.put(`observer #${this.num} has set up its -just-in-time- unicast subscription`)   
    }, 2000)
  }

  private getData(currentTick: number): void {
    currentTick++ // rxjs interval starts at 0
    this.http.getData(currentTick).subscribe((data: Data) => { 
      this.data = {...data}
      this.log.put(`(${currentTick}) observer #${this.num} received a json response: \n ${JSON.stringify(this.data)}`)
    })
  }

  private handleTimerError(type: ConnectionType, err: any): void{
    this.log.put(`${type} subscription #${this.num} could not be initialized: ${err}`)
  }

  private handleTimerCompletion(type: ConnectionType): void {
    this.log.put(`${type} subscription is done for component observer #${this.num}`)
  }
}

const enum ConnectionType{
  unicast = 'unicast',
  multicast = 'multicast'
}