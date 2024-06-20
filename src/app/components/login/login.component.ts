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

  constructor(private _authServ: AuthService, private router: Router) {}
  isLoading: boolean = false;
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        
      ]),
    });
  }
  handleLogin(loginForm: FormGroup) {
    this.isLoading = true;
    if (loginForm.valid) {
      this._authServ.login(loginForm.value).subscribe({
        next: (response) => {
          const msg = response.message;
          console.log("response login",response.message); 
          if (msg == 'success') {
            this.isLoading = false;
            localStorage.setItem("tokenUser",response.token);
            this._authServ.decodedUserData();
           
            this.router.navigate(['/home']);
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
