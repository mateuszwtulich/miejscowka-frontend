import { Injectable } from '@angular/core';
import { HttpClient, HttpParams,  HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RestServiceUrl } from '../utils/RestServiceUrl';

@Injectable({
  providedIn: 'root'
})
export class ImgurService {
  private IMGUR: string;

  httpOptions = {
    headers: new HttpHeaders({
      'authorization': 'Client-ID 1022d0cd76335f8'
    })
  };

  constructor(private http: HttpClient) { 
    this.IMGUR = `${RestServiceUrl.IMGUR}`;
  }

  public addImage(imageFile: File): Observable<string> {
    let formData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    return this.http.post<string>(this.IMGUR, formData, {headers: this.httpOptions.headers}).pipe(
      map((data) => data));
  }
}