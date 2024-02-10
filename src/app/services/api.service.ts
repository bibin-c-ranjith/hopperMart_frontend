import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  server_url='http://localhost:3000'

  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)
  

  constructor(private http:HttpClient) {
    if (sessionStorage.getItem("token")) {
      this.getwishlistCount()/* to avoid removal of value while refresh */
      this.getcartCount()
      
    }
   }

  getallproductsapi(){
  return  this.http.get(`${this.server_url}/products/all`)
  }

  registerapi(user:any){
   return this.http.post(`${this.server_url}/register`,user)
  }

  loginapi(user:any){
    return this.http.post(`${this.server_url}/login`,user)
  }

  getproductapi(id:any){
   return this.http.get(`${this.server_url}/get-product/${id}`)
  }

addTokenToHeader(){
  /* create a object for class HttpHeaders */
  let headers = new HttpHeaders()
  const token = sessionStorage.getItem("token")/* getting token from the session storage */
  if (token) {
    /* appending token to the headers of the request */
    headers = headers.append('Authorization',`Bearer ${token}`)
    
  }
  return {headers}
}

  addTowishlistApi(product:any){
   return this.http.post(`${this.server_url}/wishlist/add`,product,this.addTokenToHeader())
  }

  getWishlistItemapi(){
  return this.http.get(`${this.server_url}/wishlist/allproduct`,this.addTokenToHeader())
 
  }

  getwishlistCount(){
    this.getWishlistItemapi().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  removeItemFromWishlist(id:any){
  return  this.http.delete(`${this.server_url}/wishlist/removeItem/${id}`,this.addTokenToHeader())
  }

  //add to cart
  addToCartApi(product:any){
 return this.http.post(`${this.server_url}/cart/add`,product,this.addTokenToHeader())

  }

  //get item from cart
  getCartApi(){
    return this.http.get(`${this.server_url}/cart/allproduct`,this.addTokenToHeader())
  }

  //get cart count
  getcartCount(){
    this.getCartApi().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }

  //removecartitem
  removeCartItem(id:any){
    return this.http.delete(`${this.server_url}/cart/remove-item/${id}`,this.addTokenToHeader())
  }

  //increament item
  incrementCartItem(id:any){
    return this.http.get(`${this.server_url}/cart/increment/${id}`,this.addTokenToHeader())
  }

  //decreament item
  decrementCartItem(id:any){
    return this.http.get(`${this.server_url}/cart/decrement/${id}`,this.addTokenToHeader())
  }

  //empty cart
  emptyAllcartProduct(){
    return this.http.delete(`${this.server_url}/empty-cart`,this.addTokenToHeader())
  }

}
