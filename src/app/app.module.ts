import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {UserWebRepository} from "./users/adapters/user-web-repository";
import {UserSearchDisplayerService} from "./users/adapters/user-search-displayer.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: 'UserRepository', useClass: UserWebRepository},
    { provide: 'UserSearchDisplayerRepository', useClass: UserSearchDisplayerService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
