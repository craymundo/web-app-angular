import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DataTablesModule } from 'angular-datatables';
import { ReplaceNullPipe } from 'src/app/shared/pipes/replace-null.pipe';

import { ModalDirective } from 'ngx-bootstrap/modal';

export class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

export interface Detail {
  equipo: string;
  conferencia: string;
  abreviatura: string;
  nombreCompleto: string;
  division: string;
  ciudad: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ReplaceNullPipe],
})
export class HomeComponent implements OnInit {

  @ViewChild("detailTeam") detailTeam: ModalDirective;
  
  dtOptions: DataTables.Settings = {};
  result = [];

  detail: Detail = {
    equipo: '',
    conferencia: '',
    abreviatura: '',
    nombreCompleto: '',
    division: '',
    ciudad: '',
  }

  bolError = false;

  constructor(private _dashboardService: DashboardService) {}

  ngOnInit(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        const { draw, length, search } = dataTablesParameters;
        that.getAllPlayers(draw, length, search.value).then((res: any) => {
         that.result = res.data;
          callback({
            recordsTotal: res.meta.total_count,
            recordsFiltered: res.meta.total_count,
            data: [],
          });
        });
      },
      columns: [
        { data: 'id',  render: ''},
        { data: 'id' },
        { data: 'first_name' },
        { data: 'last_name' },
        { data: 'height_inches' },
        { data: 'height_feet' },
        { data: 'weight_pounds' },
        { data: 'position' },
      ],
    };
  }

  getColor(position: string) {
    return `color-${position}`;
  }

  getAllPlayers(page: string, per_page: string, search: string) {
    return new Promise((resolve, reject) => {
      this._dashboardService
        .getAllPlayers(page, per_page, search)
        .subscribe(resolve, reject);
    });
  }

  getSpecificTeam(id: string){
    return new Promise((resolve, reject) => {
      this._dashboardService
        .getSpecificTeam(id)
        .subscribe(resolve, reject);
    });
  }

  mostrar_modal(id) {
    this.getSpecificTeam(id).then( (res:any) => {
      this.detail = {
        equipo: res.name,
        conferencia: res.conference,
        abreviatura: res.abbreviation,
        nombreCompleto: res.full_name,
        division: res.abbreviation,
        ciudad: res.city,
      };
      this.bolError = false;
      this.detailTeam.show();
    }).catch( () => {
      this.bolError = true;
      this.detailTeam.show();
    });
    
  }
}
