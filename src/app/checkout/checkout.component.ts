import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'; 
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  public payPalConfig?: IPayPalConfig;
  proceedToPayStatus:boolean=false
  makePaymentStatus:boolean=false
  grandTotal:any=""
  checkoutForm = this.fb.group({
    uname:["",[Validators.required, Validators.pattern('[a-zA-z ]*')]],
    flat:["",[Validators.required, Validators.pattern('[a-zA-z0-9:,. ]*')]],
    place:["",[Validators.required, Validators.pattern('[a-zA-z ]*')]],
    pincode:["",[Validators.required, Validators.pattern('[0-9]*')]]
  })

  constructor(private fb:FormBuilder , private api:ApiService,private router:Router){}

  cancel(){
    this.checkoutForm.reset()
  }

  proceedToPay(){
    if (this.checkoutForm.valid){
      this.proceedToPayStatus = true
      if(sessionStorage.getItem("total")){
      this.grandTotal=sessionStorage.getItem("total") ||""
      }
      
    }
    else{
      alert('enter valid input')
    }
  }

  back(){
    this.proceedToPayStatus =false
  }
  makePayment(){
    this.makePaymentStatus = true
    this.initConfig()
  }
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.grandTotal,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.grandTotal
              }
            }
          },
         
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.api.emptyAllcartProduct().subscribe((res:any)=>{
     this.api.getcartCount()
     alert('payment successfull')

     this.proceedToPayStatus = false
     this.makePaymentStatus = false
    
     this.api.getcartCount()
     this.router.navigateByUrl("/")
    })
    },
    
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
      alert('payment cancelled')
      this.proceedToPayStatus = true
    },
    /* error in gateway */
    onError: err => {
      console.log('OnError', err);
      alert('transaction failed please try again after sometimes')

    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

}
