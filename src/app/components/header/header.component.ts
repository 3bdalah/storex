import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servics/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean=false;
  constructor(private _authserv : AuthService){};

  ngOnInit(): void {

    this._authserv.userData.subscribe({
      next:()=>{
        if(this._authserv.userData.getValue() !== null){
         this.isLogin =true;
        }else{
          this.isLogin = false;
        }

      }
    })
  }
}
