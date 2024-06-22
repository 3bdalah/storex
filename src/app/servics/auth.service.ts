import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData= new BehaviorSubject(null);
  constructor(private _http:HttpClient,private _router:Router) {
    if(localStorage.getItem("tokenUser") !== null){
     this.decodedUserData();
    }
   }

  decodedUserData(){
    let encodedToken:any = localStorage.getItem('tokenUser');
    const decodedToken:any =jwtDecode(encodedToken);
    this.userData.next( decodedToken);
  }
  register(userData:object): Observable<any>{
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData);
  }
  
  logout(){
    localStorage.removeItem("tokenUser");
    this.userData.next(null);
    this._router.navigate(['/login']);
  }
  login(userData:object): Observable<any>{
    return this._http.post('https://ecommerce.routemisr.com/api/v1/auth/signin',userData);
  }
}
