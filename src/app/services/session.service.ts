import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private obj_SessionData = new BehaviorSubject<Session|null>(null);
  obs_SessionData: Observable<Session|null> = this.obj_SessionData.asObservable();

  constructor() { }

  setSessionData(sessionData: Session|null): void {
    this.obj_SessionData.next(sessionData);
    const sessionDataStr = JSON.stringify(sessionData);
    sessionStorage.setItem('session_data', sessionDataStr)
  }

  getSessionData(): Session|null {
    const sessionDataStr = sessionStorage.getItem('session_data');
    return (sessionDataStr) ? JSON.parse(sessionDataStr!) : null;
  }

  clearSessionData(): void {
    this.obj_SessionData.next(null);
    sessionStorage.clear();
  }
}
