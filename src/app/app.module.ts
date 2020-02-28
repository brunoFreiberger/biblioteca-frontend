import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LivroHandlerComponent } from './livro/livro-handler/livro-handler.component';
import { LivroListComponent } from './livro/livro-list/livro-list.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LivroHandlerComponent,
    LivroListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    HttpClientModule,
    AlertModule.forRoot()
  ],
  providers: [FormBuilder, HttpClient, NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
