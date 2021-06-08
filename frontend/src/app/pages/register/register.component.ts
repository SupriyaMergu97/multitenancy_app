import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  signupForm:FormGroup;
  errorMessage:string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(private router:Router,
     private fb:FormBuilder,
     private auth:AuthService,
     private snackBar:MatSnackBar,
     private location:Location) { }

  ngOnInit() {
    this.signupForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      dbName:['',Validators.required]
    })
  }

  signup() {
    const { valid, value } = this.signupForm;
    if (valid) {
      this.auth.createTenent(value).subscribe((data) => {
        if (data) {
          this.signupForm.reset();
          this.router.navigate(['/login']);
        }
      }, (err) => {
        this.errorMessage = err ? err.error.message : 'something went wrong';
        this.openSnackBar(this.errorMessage);
      });
    }
  }

  clear(){
    this.signupForm.reset();
    this.signupForm.markAsUntouched();
  }
  openSnackBar(message) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  back(){
    this.location.back();
  }
}
