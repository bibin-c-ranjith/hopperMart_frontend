import { Component } from '@angular/core';
import { FormBuilder , Validators  } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){}
 loginForm= this.fb.group({
   
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })


  login(){
   
    if(this.loginForm.valid){
      const email = this.loginForm.value.email
      const password = this.loginForm.value.password
      const user={email,password}
       this.api.loginapi(user).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('login successfull')
          //save to local storage
          sessionStorage.setItem("username",res.existingUser.username)
          sessionStorage.setItem("token",res.token)
          //change the value of behaviour subject
        
          this.loginForm.reset()
          this.router.navigateByUrl('')
        },
        error:(err:any)=>{
          alert(err.error);
          this.loginForm.reset()
        }
       })
    }
    else{
      this.loginForm.reset()
      alert('invalid form')
    }
  }
}