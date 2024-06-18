import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   baseURL:string = "https://ecommerce.routemisr.com/"; 
  constructor(private _http:HttpClient) { }

  getProducts():Observable<any> {
    return this._http.get(this.baseURL+'api/v1/products');
  }
  getProductDetails(productID:string):Observable<any>{
    return this._http.get(`https://api.escuelajs.co/api/v1/products/${productID}`);
  }

  getCategories():Observable<any>{
    return this._http.get(this.baseURL+"api/v1/categories");
  }
}
