import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { reducers, metaReducers } from "./store/reducers";
import { environment } from "../environments/environment";
import { DataService } from "./mock/data.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
    EffectsModule.forRoot([]),
    HttpClientInMemoryWebApiModule.forRoot(DataService),
    HttpClientModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
