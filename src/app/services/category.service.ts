import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CategoryEto } from '../model/CategoryEto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly CATEGORIES: CategoryEto[] = [
    {id: 1, name: "Restauracja", description: undefined}, 
    {id: 2, name:"Bar", description: undefined}, 
    {id: 3, name:"Basen", description: undefined},
    {id: 4, name:"Siłownia", description: undefined}, 
    {id: 5, name:"Hala Sportowa", description:undefined}]
  private categoriesData = new BehaviorSubject<CategoryEto[]>([]);
  public categories$: Observable<CategoryEto[]> = this.categoriesData.asObservable();
  
  constructor() { }

  public findAllCategories() {
    this.categoriesData.next(this.CATEGORIES);
  }
}
