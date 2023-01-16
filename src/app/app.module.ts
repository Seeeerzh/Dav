import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeyboardsComponent } from './keyboards/keyboards.component';
import { KeyboardDetailComponent } from './keyboard-detail/keyboard-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { KeyboardSearchComponent } from './keyboard-search/keyboard-search.component';
import { HttpClientModule } from '@angular/common/http';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
@NgModule({
  declarations: [
    AppComponent,
    KeyboardsComponent,
    KeyboardDetailComponent,
    MessagesComponent,
    DashboardComponent,
    KeyboardSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
 
  bootstrap: [AppComponent]
})
export class AppModule { }
