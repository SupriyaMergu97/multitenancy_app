import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardForm: FormGroup;
  users: any[];
  isLoading = true;
  constructor(
    private router: Router,
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.getUsers();
    this.dashboardForm = this.fb.group({
      fullName: ['', Validators.required],
      contact: ['', [Validators.required,Validators.minLength(10)]],
      address: ['', Validators.required]
    });
  }
  onSubmit() {
    const { valid, value } = this.dashboardForm;
    if (valid) {
      this.auth.createUser(value).subscribe((data) => {
        if (data) {
          this.getUsers();
          this.dashboardForm.reset();
          this.dashboardForm.markAsUntouched();
          this.dashboardForm.markAsPristine();
      
        }
      })
    }
  }

  getUsers() {
    this.isLoading = true;
    this.auth.fetchUser().subscribe((data: any[]) => {
      if (data) {
        this.users = data;
        this.isLoading = false;
      }
    })
  }

  logout() {
    this.userService.removeToken('dbName');
    this.userService.removeToken('authToken');
    this.router.navigate(['/login']);
  }
}
