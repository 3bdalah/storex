import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servics/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private _authServ: AuthService, private router: Router, private toast:ToastrService) {}
  isLoading: boolean = false;
  loginForm:FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.required,
      
    ]),
  });
  ngOnInit(): void {
  }
  handleLogin(ValueForm:any) {
    this.isLoading = true;
    
      this._authServ.login(ValueForm).subscribe({
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

  handleValidForm(loginForm: FormGroup){
    if (loginForm.valid) {
      this.handleLogin(loginForm.value);
    }
  }
  hanldeGuest(){
   this.handleLogin({email:"ahmedmutti@gmail.com",password:"Ahmed@123"});
  }
}
