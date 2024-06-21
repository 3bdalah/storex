import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  urlCart:string = "https://ecommerce.routemisr.com/api/v1/cart";
  headerUser:any = {token : localStorage.getItem("tokenUser")};
  cartId = new BehaviorSubject("");
  constructor(private _http:HttpClient) {
    this.getLoggedUser().subscribe({
      next: (res)=>{
      this.cartId.next(res.data._id);
      }
    })
   };

  
  addToCart(productId:string):Observable<any> {
     return this._http.post(this.urlCart,{productId:productId},{headers:this.headerUser})
  }
  getLoggedUser():Observable<any>{
    return this._http.get(this.urlCart,{headers:this.headerUser});
  }

  removeProduct(productId:string):Observable<any> {
    return this._http.delete(this.urlCart+'/'+productId,{headers:this.headerUser});
  }
  updateProductCount(productId:string,count:number):Observable<any> {
    return this._http.put(this.urlCart+'/'+productId,{count:count},{headers:this.headerUser});
  }
  onlinePayment(shippingAddress:any,cartId:string):Observable<any> {
    return this._http.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{shippingAddress:shippingAddress},{headers:this.headerUser});
  }
}
