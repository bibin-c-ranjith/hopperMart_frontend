import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){}

  registerForm= this.fb.group({
    /* validator is a class for giving validation in angular */
    username:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  register(){
    //template driven form is the form that we created earlier 
    //other way of creating form in angular is model driven forms - eg - reactive form
    /* import reactiveformsmodule inside of formsmodule */

    if(this.registerForm.valid){
      const username = this.registerForm.value.username
      const email = this.registerForm.value.email
      const password = this.registerForm.value.password
      const user={username,email,password}
       this.api.registerapi(user).subscribe({
        next:(res:any)=>{
          alert('register successfull')
          this.registerForm.reset()
          this.router.navigateByUrl('/user/login')
        },
        error:(err:any)=>{
          alert(err.error);
          this.registerForm.reset()
        }
       })
    }
    else{
      this.registerForm.reset()
      alert('invalid form')
    }
    /* console.log(this.registerForm.get('username')?.errors); - return null when there is not error otherwise return patten object */
    
  }
}