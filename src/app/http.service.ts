import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  getDummy(obsN: number): string{
    return "Observer_" + obsN + " just called"
  }
}
