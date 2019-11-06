import { Component, OnInit } from '@angular/core';

import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FunctionExpr } from '@angular/compiler';
import { async } from '@angular/core/testing';
import * as Ajv from 'ajv';
// import * as request from 'request'

import { throwError } from 'rxjs';
import { DiagnosticDetailledTesterService } from './diagnosticDetailledViewTester.service';

export class JsStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

type ajvValidateFn = (data: any) => PromiseLike<boolean>;

@Component({
  selector: 'app-diagnostic-detailled-view-tester',
  templateUrl: './diagnosticDetailledViewTester.component.html',
  styleUrls: ['./diagnosticDetailledViewTester.component.css'],
  providers: [DiagnosticDetailledTesterService],
})
export class DiagnosticDetailledViewTesterComponent implements OnInit {
  constructor(private diagViewSvc: DiagnosticDetailledTesterService) {
    this.diagViewSvc = diagViewSvc;
    this.baseSchema = diagViewSvc.getBaseJSONSchema().subscribe((data: any) => {
      this.baseSchema = data;

      async function loadSchema(uri: string): Promise<object> {
        try {
          const json = await diagViewSvc.getNewJsonURI(uri).toPromise();
          return json;
        } catch (error) {
          if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
          } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
              `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
          }
          // return an observable with a user-facing error message
          throw new Error('Something bad happened; please try again later.');
        }
      }
      // create the ajv component
      this.ajv = new Ajv({ loadSchema: loadSchema });

      // Compile the schema now
      let that = this
      this.ajv.compileAsync(this.baseSchema).then(function(validate) {
        // Replace the ajvValidateFunction with the compiled validate function
        that.ajvValidateFunction = async function(json): Promise<boolean> {
          const valid = validate( JSON.parse(json));
          return new Promise<boolean>((resolve, reject) => {
            if(valid)
              resolve(valid);
            else
              reject(validate.errors);
          });
        };
      });
    });
  }

  private baseSchema: any;
  private ajv: Ajv.Ajv;

  public ajvErrorText:string;

  formControl: FormControl;

  viewForm = new FormGroup({});

  matcher = new JsStateMatcher();

  ngOnInit() {
    this.formControl = new FormControl(
      '',
      [Validators.required],
      [this.jsonSchemaValidator.bind(this)]
    );
  }

  private jsonSchemaValidator: AsyncValidatorFn = async (
    control: AbstractControl
  ): Promise<ValidationErrors | null> => {
    try {
      const valid = await this.ajvValidateFunction(control.value);
      return valid ? null : { jsonObjectNotValid: { value: control.value } };
    } catch (error) {
      if (error === 'Schema Compilation not finished')
        return { jsonSchemaNotCompiled: { value: control.value } };

        //When JSON parse is not working
      else if(error.name === 'SyntaxError') {
        this.ajvErrorText = error.message;
        return { jsonObjectNotValid: {value: control.value }};

        //When Ajv fails 
      }else {
        this.ajvErrorText = this.ajv.errorsText(error);
        return { jsonObjectNotValid: {value: control.value }};
      }
    }
  };

  private ajvValidateFunction: ajvValidateFn = async function(
    data
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      reject('Schema Compilation not finished');
    });
  };
}
