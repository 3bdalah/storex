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
    if(localStorage.getItem("userToken") !== null){
     this.decodedUserData();
    }
   }

  decodedUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem('userToken'));
    let decodedToken : any =jwtDecode(encodedToken);
    this.userData.next( decodedToken);
  }
  register(userData:object): Observable<any>{
    return this._http.post('https://route-ecommerce.onrender.com/api/v1/auth/signup',userData);
  }
  
  logout(){
    localStorage.removeItem("tokenUser");
    this.userData.next(null);
    this._router.navigate(['/login']);
  }
  login(userData:object): Observable<any>{
    return this._http.post('https://route-ecommerce.onrender.com/api/v1/auth/login',userData);
  }
}
