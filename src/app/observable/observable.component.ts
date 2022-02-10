import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscriber } from "rxjs"
import { LoggerService } from '../logger.service';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {

  @Input() title: string = ''
  

  constructor() {
  }

  ngOnInit(): void {    
  }

}
