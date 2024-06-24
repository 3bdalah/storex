import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servics/auth.service';

interface LoginCredentials {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  guestForm!: FormGroup;
  isLoading: boolean = false;
  guestLoad:boolean=false;
  constructor(private _authServ: AuthService, private router: Router, private toast:ToastrService) {}
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.required,
        
      ]),
    });

    this.guestForm = new FormGroup({
      email: new FormControl('ahmedmutti@gmail.com'), 
      password: new FormControl('Ahmed@123'), 
    
    });
  }
  handleLoginLogic(loginForm:LoginCredentials) {
    this.isLoading = true;
      this._authServ.login(loginForm).subscribe({
        next: (response) => {
          console.log("resonponse login",response);
    
          const msg = response.message;
          console.log("response login",response.message); 
          if (msg == 'success') {
            this.toast.success("ya alf 300 Welcome");
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

  handleLogin(loginForm: FormGroup) {
    if (loginForm.valid) {
      this.handleLoginLogic(loginForm.value);
    }
  }
  hanldeGuest(){
    this.guestLoad = true;
    console.log(this.guestForm.value,'log guest');
    
     this.handleLoginLogic(this.guestForm.value);
  }
}
