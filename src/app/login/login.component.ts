import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;

  constructor(private authService: AuthService,private snackbar: MatSnackBar,private router: Router) { }
  profileForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {
    localStorage.removeItem('token'); 
  }

  Login(){
  this.authService.Login(this.profileForm.value).subscribe((res:any) => {
    console.log(res);
   if(res.result){
     localStorage.setItem('token',res.token);
     localStorage.setItem('name',res.name);
     localStorage.setItem('userIds',res.id);

    this.snackbar.open('Login Successful!', '', {duration: 2000});
    this.router.navigate(['/home']); 

   }else{
    this.snackbar.open('Invalid Credentials!..', '', {duration: 2000});

   }
   
      });
  }
}
