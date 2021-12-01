import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './components/search/search.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { PlaceDetailsComponent } from './components/place-details/place-details.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdministratorComponent } from './components/administrator/administrator.component';
import { MatTableModule } from '@angular/material/table';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { ModifyPlaceComponent } from './components/modify-place/modify-place.component';
import { DeletePlaceComponent } from './components/delete-place/delete-place.component';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarConfig, MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import {HttpBackend, HttpClient, HttpClientModule, HttpHandler, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { TokenInterceptor } from './security/tokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    HomeComponent,
    SearchComponent,
    PlaceDetailsComponent,
    LoginComponent,
    RegistrationComponent,
    AdministratorComponent,
    AddPlaceComponent,
    ModifyPlaceComponent,
    DeletePlaceComponent,
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
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatPaginatorModule,
    MatSnackBarModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [
    AppComponent,
  ],
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
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    MatPaginatorModule,
    MatSnackBarModule,
    NgxPermissionsModule,
    PlaceDetailsComponent
  ]
})
export class AppModule { }
