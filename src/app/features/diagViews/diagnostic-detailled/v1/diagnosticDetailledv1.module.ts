import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { DiagnosticDetailledv1Component } from './diagnosticDetailledv1.component';

import {Basev1Module} from '../../object/base/v1/base.v1.module';

@NgModule({
  imports: [SharedModule, Basev1Module],
  declarations: [DiagnosticDetailledv1Component],
  exports: [DiagnosticDetailledv1Component]
})
export class DiagnosticDetailledv1Module {}
