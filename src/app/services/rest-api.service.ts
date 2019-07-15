import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {

  // Define API
  private apiURL = 'http://api.aih.tqdesign.vn/';

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
