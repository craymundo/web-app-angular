import { Component, OnInit, OnDestroy } from '@angular/core';
import Stepper from 'bs-stepper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/storage/storage.service';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { getAge } from 'src/app/shared/utils/functions';

export interface Detail {
  id: number,
  abbreviation:  string,
  conference:  string,
  comments:  string,
  teamName:  string,
  city:  string,
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  formOne: FormGroup;
  formTwo: FormGroup;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  private stepper: Stepper;
  txtErrorName: string;
  txtErrorLastName: string;
  txtErrorPosicion: string;

  detaitls: Array<Detail>= [];

  constructor(private _formBuilder: FormBuilder,  private _storageService: StorageService) {
    this.buildForm();
    this.detaitls = [];
  }

  next() {
    this.stepper.next();
  }

  previous() {
    this.stepper.previous();
  }

  private buildForm(): void {
    this.formOne = this._formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastname:  [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      heightInches: [null],
      heightFeet: [null],
      weight: [null],
      position: ['',[Validators.required]],
      birthDate: [null],
      age: [null],
      comments: [null],
      timeYear: [null],
      otherA: [null],
      otherB: [null],
      otherD: [null],
      otherE: [null],
    });

    
    this.txtErrorName = 'El nombre es requerido';
    this.txtErrorLastName = 'El apellido es requerido';
    this.txtErrorPosicion = 'La posición es requerido';

    this.formTwo = this._formBuilder.group({
      abbreviation: [null],
      conference: [''],
      comments: [null],
      teamName: [null],
      city: [''],
    })


    this.formOne.get('birthDate').valueChanges.subscribe((newVal) => {
         const edad = getAge(newVal);
      this.formOne.get('age').setValue(edad);
    });

  }

  formIsValidOne(): boolean {
    
    return (
      this.formOne.invalid 
    );
  }

  isPosicionC(): boolean {
    return this.formOne.get('position').value === 'C';
  }


  onSubmitOne(event: Event) {
    event.preventDefault();
  }

  onSubmitTwo(event: Event) {
    event.preventDefault();
  }

  addObject() {
    const value = this.formTwo.value;
    const detail = {
      id: this.detaitls.length + 1,
      abbreviation:  value.abbreviation,
      conference:  value.conference,
      comments:  value.comments,
      teamName:  value.teamName,
      city:  value.city,
    }

    this.detaitls.push(detail);
    this.dtTrigger.next();
    this.formTwo.reset();

  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  showTextError(type: string): boolean {
    const control = this.formOne.get(type);
    return control.invalid && (control.dirty || control.touched);
  }

  isShowTextErrorName() {
    return this.showTextError('name');
  }

  isShowTextErrorLastName() {
    return this.showTextError('lastname');
  }

  isShowTextErrorPosition() {
    return this.showTextError('position');
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
