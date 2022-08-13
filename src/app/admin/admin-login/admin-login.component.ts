import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  hide = true;

  constructor(private authService: AuthService,private snackbar: MatSnackBar,private router: Router) { }
  profileForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
  }
  Login(){
    this.authService.AdminLogin(this.profileForm.value).subscribe((res:any) => {
      console.log(res);
     if(res.result){
       localStorage.setItem('admintoken',res.token);
       localStorage.setItem('adminname',res.name);
       localStorage.setItem('admid',res.id);
  
      this.snackbar.open('Login Successful!', '', {duration: 2000});
      this.router.navigate(['/home']); 
  
     }else{
      this.snackbar.open('Login Faild!', '', {duration: 2000});
  
     }
     
        });
    }
}
