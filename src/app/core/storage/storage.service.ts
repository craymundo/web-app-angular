import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  setObject(name: string, item: any): void {
    localStorage.setItem(name, btoa(JSON.stringify(item)));
  };

  setItem(name: string, item: any): void {
    localStorage.setItem(name, btoa(item));
  };

  deleteItem(name: string): void {
    localStorage.removeItem(name);
  };

  clear(): void {
    localStorage.clear();
  };

  getItem(name: string): any {
    let value = localStorage.getItem(name);
    if (value == null || atob(value) === 'null') {
      return undefined;
    } else {
      return atob(localStorage.getItem(name));
    }
  }

  getObject(name: string): any {
    let value = localStorage.getItem(name);
    if (value == null || atob(value) === 'null') {
      return undefined;
    } else {
      return JSON.parse(atob(localStorage.getItem(name)));
    }
  }

}
