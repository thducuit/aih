import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  // Define API
  private apiURL = environment.api;

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getEndPoints(url) {
    return `${this.apiURL}${url}`;
  }

  post(url, params: any) {
    const apiUrl = this.getEndPoints(url);
    return this.http.post(apiUrl, params, this.httpOptions);
  }

}
