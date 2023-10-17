import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContainerComponent } from './components/container/container.component';
import { MessagelistComponent } from './components/messages/messagelist/messagelist.component';
import { MessageComponent } from './components/messages/message/message.component';
import { CreateGroupComponent } from './components/create-group/create-group.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ContainerComponent,
    MessagelistComponent,
    MessageComponent,
    CreateGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
