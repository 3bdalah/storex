import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { WishlistService } from 'src/app/servics/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent  implements OnInit{
 countItemsWishList= new BehaviorSubject(0);
  constructor(private _wish:WishlistService){}

ngOnInit(): void {
  this._wish.getLoggedUserWhistList().subscribe({
    next:(res)=> {
      console.log("response from whist list",res);
      this.countItemsWishList.next(res.count);
      
    }
  })
}
}
