import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../menu/menu.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  postFail = false;
  postError = '';

  fcEmail = new FormControl('', [Validators.required, Validators.email]);
  fcPassword = new FormControl('', [Validators.required]);

  signinForm: FormGroup = new FormGroup({
    emailAddress: this.fcEmail,
    password: this.fcPassword
  });

  hide: boolean = true;

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSigninSubmit(): void {
    
    let emailAddress = this.signinForm.value.emailAddress;

    const password = this.signinForm.value.password;

    const headers = new HttpHeaders({'Content-type': 'application/json'});

    const reqObject = {
      emailAddress: emailAddress,
      password: password
    };

    this.http.post('http://localhost:3000/users/login', reqObject, { headers: headers }).subscribe({
      
      next: (response: any) => {
        
        // If the user authenticates successfully, we need to store the JWT returned in localStorage
        this.authService.setLocalStorage(response);
      },

      error: (response) => {
        if(!response.error.success){
          this.postFail = true;
          this.postError = response.error.msg;
        }
      },
      
      // When observable completes
      complete: () => {
        this.router.navigate(['dashboard']);
      }

    });
  }

  goToRegister(){
    this.router.navigate(['/', 'register'])
    .then((_)=>{}, err => {
      console.log(err) // when there's an error
    });

  }

}
