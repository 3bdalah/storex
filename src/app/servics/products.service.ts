import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   baseURL:string = "https://ecommerce.routemisr.com/"; 
  constructor(private _http:HttpClient) { }

  getProducts(pageNum:number):Observable<any> {
    return this._http.get(this.baseURL+'api/v1/products',{
      params:{page:pageNum}
    });
  }
  getProductDetails(productID:string):Observable<any>{
    return this._http.get(this.baseURL+`api/v1/products/${productID}`);
  }

  getCategories():Observable<any>{
    return this._http.get(this.baseURL+"api/v1/categories");
  }

  getBrands():Observable<any>{
    return this._http.get(this.baseURL + 'api/v1/brands')
  }
}
