import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule }          from '@angular/forms';
import { HttpModule }           from '@angular/http';
import                               './rxjs-extensions';

import { AppComponent }         from './app.component';
import { routing }              from './app.routing';
import { LoginService }         from './services/login.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    LoginService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
