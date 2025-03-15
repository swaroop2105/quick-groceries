import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './landing/landing.component';
import { CreateGroceryComponent } from './create-grocery/create-grocery.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroceryViewComponent } from './grocery-view/grocery-view.component';
import { LoginComponent } from './auth/login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    CreateGroceryComponent,
    GroceryViewComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
