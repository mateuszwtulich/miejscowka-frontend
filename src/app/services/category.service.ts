import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CategoryEto } from '../model/CategoryEto';
import { RestServiceUrl } from '../utils/RestServiceUrl';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnDestroy{

  private readonly unsubscribe = new Subject();
  private categoriesData = new BehaviorSubject<CategoryEto[]>([]);
  public categories$: Observable<CategoryEto[]> = this.categoriesData.asObservable();
  private spinnerDataSource = new BehaviorSubject(false);
  public spinner$ = this.spinnerDataSource.asObservable();
  
  constructor(
    private http: HttpClient,
    private snackbar: MatSnackBar,
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public findAllCategories() {
    this.spinnerDataSource.next(true);
    this.http.get<CategoryEto[]>(`${RestServiceUrl.CATEGORY_ENDPOINT}`)
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(
      (categories: CategoryEto[]) => {
        this.spinnerDataSource.next(false);
        this.categoriesData.next(categories);
      },
      (e) => {
        this.snackbar.open(e.error.message, 'ERROR', { duration: 5000 });
        this.spinnerDataSource.next(false);
      }
    )
  }
}
