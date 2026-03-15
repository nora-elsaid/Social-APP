import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { AbstractControl, FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly authService=inject(AuthService);

  changeForm : FormGroup = new FormGroup({
    password : new FormControl("", [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    newPassword : new FormControl("", [Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
   
    
  } );

  rePassword = new FormControl("" , Validators.required);
  confirmPassword(group:AbstractControl){
    const password = group.get('newPassword')?.value;
    const rePassword = group.get('rePassword')?.value;
    if(rePassword !== password && rePassword !== ''){
      group.get('rePassword')?.setErrors({mismatch:true});
      return {mismatch:true};
    }
    else{
      return null;
    }
  }

  showPassword(element:HTMLInputElement):void{
    if(element.type ==='password'){
      element.type='text'
    }
    else{
      element.type='password'
    }
  }

  
  
  changePassword(){
  
    if(this.changeForm.valid){
      this.authService.changePassword(this.changeForm.value).subscribe({
  
        next:(res)=>{
        console.log("password updated");
        localStorage.setItem('socialToken' , res.data.token);
        },
        
        error:(err)=>{
        console.log(err)
        }
        
        })
    }
  
  }

}
