import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { Credentials } from './Authorization';
import { RestServiceUrl } from '../utils/RestServiceUrl';
import { LocalStorageService } from '../components/cache/localStorage.service';

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationService {
    private spinnerDataSource = new BehaviorSubject(false);
    public spinnerData = this.spinnerDataSource.asObservable();
    private loggedDataSource = new BehaviorSubject(false);
    public logged$ = this.loggedDataSource.asObservable();

    constructor(
        public router: Router,
        private http: HttpClient,
        private localStorageService: LocalStorageService,
        private snackbar: MatSnackBar,
        private permissionsService: NgxPermissionsService) {
  
    }
  
    public isAuthenticated(): boolean {
      let authenticated = false;
      if (this.localStorageService.isStorageInitialized()) {
        if (this.localStorageService.getUsername() && this.localStorageService.getTokenExp() <= new Date().getTime()) {
          authenticated = true;
        }
      }
      return authenticated;
    }
  
    public authenticate(credentials: Credentials): Promise<void> {
      return new Promise((resolve, reject) => {
        this.spinnerDataSource.next(true);
        this.login(credentials).subscribe((data: Response) => {
          const token: string | null = data.headers.get('Authorization');
          const decodedToken: object = jwt_decode(token || '{}');
          this.localStorageService.setToken(token || '{}');
          this.localStorageService.setAuthInfo(this.localStorageService.parseHeaderToAuthInfo(decodedToken));
          this.localStorageService.setBasicAuthority();
          this.localStorageService.setIsRequestToServer(false);
          this.permissionsService.addPermission(this.localStorageService.getAuthorities() || '{}');
          this.spinnerDataSource.next(false);
          this.loggedDataSource.next(true);
          resolve();
        },
          (error) => {
            if (error.status == 403) {
              this.snackbar.open('Niepoprawny login lub hasło', 'ERROR', { duration: 5000 });
              this.spinnerDataSource.next(false);
            }
            if(error.status != 403)
              this.snackbar.open('Bład serwera', 'ERROR', { duration: 5000 });
              this.spinnerDataSource.next(false);

              reject(error);
          });
      });
    }
  
    public login(credentials: Credentials): Observable<any> {
      return this.http.post(RestServiceUrl.AUTHORIZE,
        { username: credentials.username, password: credentials.password }, { observe: 'response' });
    }
  
    public logout(): void {
      if (this.isAuthenticated()) {
        this.localStorageService.clearLocalStorage();
        this.permissionsService.flushPermissions();
        this.loggedDataSource.next(false);
        this.router.navigate(['home']);
      }
    }
  }
  