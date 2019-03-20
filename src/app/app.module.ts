import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './materials/pages/home/home.component';
import {MaterialModule} from './material.module';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {UserIndexComponent} from './materials/pages/users/user-index/user-index.component';
import { NavComponent } from './materials/organisms/nav/nav.component';
import { SkillsPageComponent } from './materials/pages/skills/skills-page.component';
import { SkillCardComponent } from './materials/molecules/skill-card/skill-card.component';
import {FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './materials/organisms/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './materials/organisms/register/register.component';
import { AngularFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserIndexComponent,
    NavComponent,
    SkillsPageComponent,
    SkillCardComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent],
})
export class AppModule { }
