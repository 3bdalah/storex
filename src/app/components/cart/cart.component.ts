import { Component, OnInit } from '@angular/core';
import { Toast, ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/servics/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cardDetailes:any = null;
  // cartId = new BehaviorSubject(null);
  constructor(private _cartServ:CartService, private toast:ToastrService ){}
  ngOnInit(): void {
   this._cartServ.getLoggedUser().subscribe({
    next:(res)=>{
      console.log("cart data",res.data);

      this.cardDetailes = res.data;
      // this.cartId.next(res.data._id);
    },
    error:(err)=>{console.log(err);
    }
   });
  }

  updateItemCount(productId:string,count:number){
    this._cartServ.updateProductCount(productId,count).subscribe({
      next:(res) => {
        res.data.products.forEach((element:any) => {
          
          if(element.count==0){
                //  this.toast.success("removed Item")
                 this.removeItem(productId);
          }
        });
        this.cardDetailes = res.data;

      },
      error:(error)=> {console.log(error);
      }
    })
  }
  removeItem(productId:string){
    this._cartServ.removeProduct(productId).subscribe({
      next:(res) => {
        this.cardDetailes = res.data;
        console.log("response remove item",res);
        if(res.status==="success") this.toast.success("Removed Item");
        this._cartServ.numberOfCartItems.next(res.numOfCartItems)
      },
      error:(error)=> {console.log(error);
      }
    })
  }
}
