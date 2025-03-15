import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

const matmodules = [
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule
]


@NgModule({
  declarations: [],
  imports: [
    ...matmodules
  ],
  exports: [
    ...matmodules
  ]
})
export class MaterialModule { }
