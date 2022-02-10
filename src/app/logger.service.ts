import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private messages: any[]

  constructor() {
    this.messages = new Array()
  }

  put(msg: any): void{
    this.messages.push(msg)
  }

  get(i: number): any{
    return this.messages[i]
  }

  getAll(): any[]{
    return this.messages;
  }
}
