import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';
import { DashboardEndPoint  as endpoint} from '../endpoints/dashboard.endpoint';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private httpService: HttpService,
  ) {
  }

  getAllPlayers(page?: string, per_page?: string, search?: string): Observable<any> {
   
    let params = new HttpParams();
    if(page) params = params.set("page", page);
    if(per_page) params = params.set("per_page", per_page);
    if(search) params = params.set("search", search);
    return this.httpService.get(endpoint.getAllPlayers,  params);
  }

  getSpecificTeam(id: string): Observable<any> {

    return this.httpService.get(endpoint.getSpecificTeam + id)
  }

}
