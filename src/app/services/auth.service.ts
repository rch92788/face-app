import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Session } from '../models/session.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private sessionService: SessionService
  ) { }

  setLocalStorage(responseObj: any){

    const expires = moment().add(responseObj.expiresIn);
    const token_user = {
      id: responseObj.user.id,
      firstName: responseObj.user.firstName,
      lastName: responseObj.user.lastName
    }

    localStorage.setItem('token', responseObj.token);
    localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
    localStorage.setItem('token_user', JSON.stringify(token_user.valueOf()));

    const sessionData: Session = {
      user: token_user,
      dashboard: null
    };
    this.sessionService.setSessionData(sessionData);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    localStorage.removeItem('token_user');
    this.sessionService.clearSessionData();
  }

  isLoggedIn() {
    return moment().isBefore(this.getExpiration(), "second");
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  getTokenUser() {
    const token_userStr = localStorage.getItem('token_user');
    const token_user = JSON.parse(token_userStr!);
    return moment(token_user);
  }
}
