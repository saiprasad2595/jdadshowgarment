import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import 'rxjs';
//import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { BrowserModule } from '@angular/platform-browser';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Storage } from '@ionic/storage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AngularMultiSelectModule }
  from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { AngularWeatherWidgetModule, WeatherApiName }
  from 'angular-weather-widget';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import {
  Location, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import reducer from '../reducers';
import {
  UserActions, NavigationActions,
  GeneralActions, GarmentActions
} from '../actions';
import { UserEffects, NavigationEffects } from '../effects';
import {
  UserService, LoadingService,
  MainService, AuthService
} from '../services';
import {
  LoadingIndicator,
} from '../components/index';
import {
  SignUp,
  Login,
  Home,
  Reviews,
  WashTips,
  StyleTips
} from '../pages';

import { AppConfig, firebaseConfig } from '../config/appConfig';
import { AngularFireModule } from 'angularfire2';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFirestoreModule } from 'angularfire2/firestore';
export const COMPONENTS = [
  MyApp,
  Login,
  LoadingIndicator,
  SignUp,
  Home,
  Reviews,
  WashTips,
  StyleTips
];
export function provideStorage(): Storage {

  return new Storage({
    driverOrder: ['localstorage']
  });
}

let dev = [StoreDevtoolsModule.instrumentOnlyWithExtension()];
@NgModule({
  declarations: COMPONENTS,
  imports: [
    HttpModule, AngularMultiSelectModule, BrowserModule,
    IonicModule.forRoot(MyApp, AppConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    StoreModule.provideStore(reducer),
    EffectsModule.run(UserEffects),
    EffectsModule.run(NavigationEffects),
    ...dev,
    ChartsModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularWeatherWidgetModule.forRoot({
      key: AppConfig.serviceRequests.weatherKey,
      name: WeatherApiName.OPEN_WEATHER_MAP,
      baseUrl: AppConfig.serviceRequests.weatherUrl,
    })
  ],
  providers: [
    { provide: Storage, useFactory: provideStorage },
    // SplashScreen,
    StatusBar, {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    UserActions,
    NavigationActions,
    GeneralActions,
    GarmentActions,
    UserService,
    LoadingService,
    MainService,
    AuthService,
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy }
  ],
  bootstrap: [IonicApp],
  entryComponents: COMPONENTS
})
export class AppModule { }
