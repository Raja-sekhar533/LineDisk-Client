import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  username = '';
  email = '';
  password = '';
  pass1 = '';
  pass = '';
  matched:boolean = false;
  constructor(private authservice:AuthService,private snackbar: MatSnackBar,private router: Router) { }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  
  profileForm = new FormGroup({
    username: new FormControl('',[Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    revenue: new FormControl()
  });

  showDetails: boolean = false;
  hide = true;
  ngOnInit(): void {
  }
  
  onStrengthChanged(strength: number) {
    console.log('password strength = ', strength);
  }

  Signup(){
    console.log(this.profileForm.value)
    this.authservice.signup(this.profileForm.value).subscribe((res) => {
      if(res.result == true){
        this.snackbar.open('Signup Successful!!', '', {duration: 2000});
        this.router.navigate(['/login']); 
      }else{
        this.snackbar.open('Something went wrong!.', '', {duration: 2000});
      }
    });
  }
  passwordMatch(){
    if(this.pass === this.pass1){
      this.matched = false;
    }else{
      this.matched = true;
    }
  }

}
