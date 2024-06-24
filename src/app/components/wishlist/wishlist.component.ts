import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { WishlistService } from 'src/app/servics/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent  implements OnInit{
 countItemsWishList= new BehaviorSubject(0);
 listWish:any;
  constructor(private _wish:WishlistService, private toast:ToastrService){}

ngOnInit(): void {
  this._wish.getLoggedUserWhistList().subscribe({
    next:(res)=> {
      console.log("response from wish list ",res.data);
      this.listWish = res.data;
      this.countItemsWishList.next(res.count);
      
    }
  })
}

removeItem(productId:string){
  this._wish.removeProduct(productId).subscribe({
    next:(res) => {
      // this.countItemsWishList = res.data;
      console.log("response remove item from wish ",res);
      if(res.status==="success") this.toast.success("Removed Item");
      this._wish.numberOfWishListItems.next(res.data.length)
    },
    error:(error)=> {console.log(error);
    }
  })
}
}
