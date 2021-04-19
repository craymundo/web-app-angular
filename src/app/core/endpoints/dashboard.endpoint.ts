import { environment } from '../../../environments/environment';


export class DashboardEndPoint  {
    public static getAllPlayers = `${environment.URL_API}players`;
    public static getSpecificTeam = `${environment.URL_API}teams/`;
}