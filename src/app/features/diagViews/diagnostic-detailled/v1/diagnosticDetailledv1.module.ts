import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { DiagnosticDetailledv1Component } from './diagnosticDetailledv1.component';

import {Titlev1Module} from '../../object/title/v1/titlev1.module'

@NgModule({
  imports: [SharedModule, Titlev1Module],
  declarations: [DiagnosticDetailledv1Component],
  exports: [DiagnosticDetailledv1Component]
})
export class DiagnosticDetailledv1Module {}
