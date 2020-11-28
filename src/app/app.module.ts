import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RequiredTextComponent } from './components/custom-form-controls/required-text/required-text.component';
import { AddressComponent } from './components/nested-forms/composite-control-value-accessors/address/address.component';
import { UpdateOnComponent } from './components/update-on/update-on.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateOnComponent,
    RequiredTextComponent,
    AddressComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
