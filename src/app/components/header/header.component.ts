import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/servics/auth.service';
import { CartService } from 'src/app/servics/cart.service';
import { WishlistService } from 'src/app/servics/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogin:boolean=false;
  openMenu:boolean=false;
  numItemsCart:number=0;
  numItemsWish:number=0;
  constructor(private _authserv : AuthService,private _cartserv:CartService,private _wishList:WishlistService){
    

   
   
  };

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
    this._cartserv.numberOfCartItems.subscribe({
      next: (res)=>{
        console.log("test header cart",res);
        this.numItemsCart = res;

        console.log(this.numItemsCart);
      }
    });

    this._wishList.numberOfWishListItems.subscribe({
      next : (res)=>{
        console.log("res header wish list",res);
        this.numItemsWish = res;
        
      }
    })
  }

  Logout(){
     this._authserv.logout();
  }
  toggleMenu(){
   this.openMenu = !this.openMenu;
   console.log("favv",this.openMenu);
  }
}
