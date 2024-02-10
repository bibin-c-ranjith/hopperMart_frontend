import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  allproduct:any=[]

  constructor(private api:ApiService){}

  ngOnInit(): void {
      this.api.getallproductsapi().subscribe({
        next:(res:any)=>{
          this.allproduct=res
          console.log(this.allproduct);
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
  }

  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
    this.api.addTowishlistApi(product).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.api.getwishlistCount()
       alert('product added successfully')
       
        
      },
      error:(err:any)=>{
        console.log(err);
        alert(err.error)
        
      }
      
    })
  
    }
    else{
     alert('please login...')
    }
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          console.log(res);
          this.api.getcartCount()
          alert('product added to cart successfully')
         
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
