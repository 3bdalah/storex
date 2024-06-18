import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/servics/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private _authServ: AuthService, private _Router: Router) {}
  isLoading: boolean = false;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{5,10}$/),
      ]),
    });
  }
  handleLogin(loginForm: FormGroup) {
    this.isLoading = true;
    if (loginForm.valid) {
      this._authServ.login(loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            this.isLoading = false;
            localStorage.setItem("tokenUser",response.token);
            this._authServ.decodedUserData();
            this._Router.navigate(['/home']);
          }
        },
        error: (response) => {
          this.isLoading = false;
          console.log('response from error', response);
        },
        // complete:(response) => console.log("response from compelete",response),
      });
    }
  }
}
