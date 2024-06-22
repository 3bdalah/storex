import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/servics/auth.service';
import { CartService } from 'src/app/servics/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean=false;
  numItemsCart:number=0;
  constructor(private _authserv : AuthService,private _cartserv:CartService){
    this._authserv.userData.subscribe({
      next:()=>{
        if(this._authserv.userData.getValue() !== null){
         this.isLogin =true;
        }else{
          this.isLogin = false;
        }
  
      }
    })

    this._cartserv.numberOfCartItems.subscribe({
      next: (res)=>{
        console.log("test header cart",res);
        this.numItemsCart = res;

        console.log(this.numItemsCart);
      }
    })
  };

  ngOnInit(): void {
    
  }
}
