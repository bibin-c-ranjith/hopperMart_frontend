import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
allProducts:any=[]
  
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.getWishlistItem()
  }

  getWishlistItem(){
    this.api.getWishlistItemapi().subscribe({
      next:(res:any)=>{ 

       this.allProducts = res
       console.log(this.allProducts);
       
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  removeItem(id:any){
    this.api.removeItemFromWishlist(id).subscribe({
      next:(res:any)=>{
      console.log(res);
      this.getWishlistItem()
      this.api.getwishlistCount()
      
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          this.api.removeItemFromWishlist(product._id)
          alert('product added to cart successfully')
          this.api.getcartCount( )
          this.removeItem(product._id)
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }
    else{
      alert('please login')
    }
  }

}
