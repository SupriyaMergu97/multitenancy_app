import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';


const modulearr = [
  MatToolbarModule,
  FormsModule, ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatTableModule,
  MatInputModule,
  MatIconModule,
  MatSnackBarModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...modulearr
  ],
  exports: [
    ...modulearr

  ]
})
export class MaterialModule { }
