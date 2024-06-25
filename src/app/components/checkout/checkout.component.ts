import { CartService } from 'src/app/servics/cart.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
   cartID:string="";
   constructor(private _cartServ:CartService,private toast:ToastrService){};
   ngOnInit(): void {
     this._cartServ.cartId.subscribe({
      next:(value)=>{
        this.cartID = value;
      }
     })
   }
  shippingAddress:FormGroup = new FormGroup({
    details: new FormControl(null,[ Validators.required]),
    phone:new FormControl(null,[Validators.required]),
    city:new FormControl(null,[Validators.required]),
  });

  navigatetoUrl(url:string){
     window.location.href= url;
  }
  handleSubmit(shippingAddress:FormGroup){
    if(shippingAddress.valid){
      this._cartServ.onlinePayment(shippingAddress.value,this.cartID).subscribe({
        next:(res)=>{console.log('respone payment',res.session.url)
          this.navigatetoUrl(res.session.url)
        },
        error:(error)=>{this.toast.error("error da")}
      })
    };
  }
}
