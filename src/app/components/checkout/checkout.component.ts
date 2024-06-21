import { CartService } from 'src/app/servics/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
   cartID:string="";
   constructor(private _cartServ:CartService){};
   ngOnInit(): void {
     this._cartServ.cartId.subscribe({
      next:(value)=>{
        this.cartID = value;
      }
     })
   }
  shippingAddress:FormGroup = new FormGroup({
    details: new FormControl(null,),
    phone:new FormControl(null),
    city:new FormControl(null),
  });

  navigatetoUrl(url:string){
     window.location.href= url;
  }
  handleSubmit(shippingAddress:FormGroup){
    this._cartServ.onlinePayment(shippingAddress.value,this.cartID).subscribe({
      next:(res)=>{console.log('respone payment',res.session.url)
        this.navigatetoUrl(res.session.url)
      }
    })
  };

}
