import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './search/search.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlaceDetailsComponent } from './place-details/place-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    SearchComponent,
    PlaceDetailsComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxChartsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pl-PL' }],
  bootstrap: [AppComponent],
  exports: [
    SidenavComponent,
    HomeComponent,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    SearchComponent,
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxChartsModule,
    ReactiveFormsModule
  ]
})
export class AppModule { }
