import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  public get(endpoint: string,   params?: any): Observable<any> {
    const headers = { 'x-rapidapi-key': environment.KEY};
    return this.http.get(endpoint, {headers, params});
  }

}