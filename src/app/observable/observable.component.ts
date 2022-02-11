import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-observable',
  templateUrl: './observable.component.html',
  styleUrls: ['./observable.component.css']
})
export class ObservableComponent implements OnInit {

  @Input() title?: string
  

  constructor() {
  }

  ngOnInit(): void {    
  }

}
