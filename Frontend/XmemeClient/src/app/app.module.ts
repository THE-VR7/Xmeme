import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxEditorModule } from 'ngx-editor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { MemesListComponent } from './components/memes-list/memes-list.component';
import { MemeformComponent } from './components/memeform/memeform.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MemesListComponent,
    MemeformComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
