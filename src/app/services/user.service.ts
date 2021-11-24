import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserEto } from '../model/UserEto';
import { UserTo } from '../model/UserTo';
import { RestServiceUrl } from '../utils/RestServiceUrl';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly unsubscribe = new Subject();
  private spinnerDataSource = new BehaviorSubject(false);
  public spinner$ = this.spinnerDataSource.asObservable();

  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
  ) { }

  public createUser(userTo: UserTo) {
    this.spinnerDataSource.next(true);
    this.http.post<UserEto>(`${RestServiceUrl.USER_SIGN_UP_ENDPOINT}`, userTo)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (user: UserEto) => {
        this.spinnerDataSource.next(false);
        this.snackbar.open("Wysłaliśmy maila na Twoją skrzynkę. Potwierdź rejestrację.", 'INFO', { duration: 10000 });

      },
      (e) => {
        this.snackbar.open(e.error.message, 'ERROR', { duration: 5000 });
        this.spinnerDataSource.next(false);
      }
    )
  }
} 
