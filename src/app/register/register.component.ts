import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  postFail = false;
  postError = '';
  
  passwordValidation: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const password = form?.get('password');
    const passwordVerify = form?.get('passwordVerify');
    return password && passwordVerify && password.value === passwordVerify.value ? null : { notSame: true };
  };

  fcFirstName = new FormControl('', [Validators.required, Validators.pattern('[-_a-zA-Z0-9]*')]);
  fcLastName = new FormControl('', [Validators.required, Validators.pattern('[-_a-zA-Z0-9]*')]);
  fcEmail = new FormControl('', [Validators.required, Validators.email]);
  fcPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
  fcPasswordVerify = new FormControl('', [Validators.required]);

  registerForm: FormGroup = new FormGroup({
    firstName: this.fcFirstName,
    lastName: this.fcLastName,
    email: this.fcEmail,
    password: this.fcPassword,
    passwordVerify: this.fcPasswordVerify
  }, { validators: this.passwordValidation });

  constructor(
    private http: HttpClient, 
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegisterSubmit() {

    const firstName = this.fcFirstName.value;
    const lastName = this.fcLastName.value;
    const emailAddress = this.fcEmail.value;
    const password = this.fcPassword.value;
    const username = emailAddress?.substring(0, emailAddress.indexOf('@'));

    const headers = new HttpHeaders({'Content-type': 'application/json'});

    const reqObject = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress
    };

    this.http.post('http://localhost:3000/users/register', reqObject, {headers: headers}).subscribe({
      
      next: (response) => {
        this.authService.setLocalStorage(response);
      },

      error: (response) => {
        if(!response.error.success){
          this.postFail = true;
          this.postError = response.error.msg;
        }
      },

      complete: () => {
        this.router.navigate(['signin']);
      }

    });
  }
}
