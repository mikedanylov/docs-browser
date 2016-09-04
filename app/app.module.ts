import { NgModule }               from '@angular/core';
import { BrowserModule }          from '@angular/platform-browser';
import { FormsModule }            from '@angular/forms';
import { HttpModule }             from '@angular/http';
import                                 './rxjs-extensions';

import { AppComponent }           from './app.component';
import { LoginComponent }         from './login/login.component';
import { DocumentsListComponent } from './documents-list/documents-list.component';
import { DocumentComponent }      from './document/document.component';
import { LoginService }           from './services/login.service';
import { DocumentService }        from './services/document.service';
import { routing }                from './app.routing';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    DocumentsListComponent,
    DocumentComponent
  ],
  providers: [
    LoginService,
    DocumentService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
