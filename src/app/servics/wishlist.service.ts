import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  urlWish:string = "https://ecommerce.routemisr.com/api/v1/wishlist";
  headerUser:any = {token : localStorage.getItem("tokenUser")};
  cartId = new BehaviorSubject("");
  numberOfWishListItems= new BehaviorSubject(0);
  constructor(private _http:HttpClient) {
    this.getLoggedUserWhistList().subscribe({
      next: (res:any)=>{
        console.log("res whistList",res);
        this.numberOfWishListItems.next(res.count);
      this.cartId.next(res.data._id);
      }
    })

   };

  
  addToWish(productId:string):Observable<any> {
     return this._http.post(this.urlWish,{productId:productId},{headers:this.headerUser})
  }
  getLoggedUserWhistList():Observable<any>{
    return this._http.get(this.urlWish,{headers:this.headerUser});
  }
}
