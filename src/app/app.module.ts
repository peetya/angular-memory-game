import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardsComponent } from './game/cards/cards.component';
import { CardComponent } from './game/cards/card/card.component';
import { GameComponent } from './game/game.component';
import {GameService} from "./game/game.service";

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers:
    [
      GameService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
