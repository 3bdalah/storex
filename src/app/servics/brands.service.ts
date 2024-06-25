import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  urlBrands:string = "https://ecommerce.routemisr.com/api/v1/brands";
  headerUser:any = {token : localStorage.getItem("tokenUser")};
  
  constructor(private _http:HttpClient) {
   
   };

  getLoggedUser():Observable<any>{
    return this._http.get(this.urlBrands,{headers:this.headerUser});
  }


}
