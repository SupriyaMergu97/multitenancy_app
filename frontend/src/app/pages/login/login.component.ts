import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';
import { CONSTANTS } from '../../shared/constants';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
  goToDash() {
    this.errorMessage = '';
    const { valid, value } = this.loginForm;
    if (valid) {
      this.auth.login(value).subscribe((data: any) => {
        if (data) {
          const { user, token } = data;
          this.userService.setToken(CONSTANTS.DB_NAME_KEY, user.dbName);
          this.userService.setToken(CONSTANTS.TOKEN_KEY, token);
          this.router.navigate(['/dashboard']);
        }
      }, (err) => {
        this.errorMessage = err ? err.error.message : 'something went wrong';
        this.openSnackBar(this.errorMessage);
      });
    }
    else {
    }
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  clear() {
    this.loginForm.markAsUntouched();
    this.loginForm.markAsPristine();
    this.loginForm.reset();
  }

}
