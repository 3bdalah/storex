import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  urlCart:string = "https://ecommerce.routemisr.com/api/v1/cart";
  headerUser:any = {token : localStorage.getItem("tokenUser")};
  constructor(private _http:HttpClient) { };

  
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
}
