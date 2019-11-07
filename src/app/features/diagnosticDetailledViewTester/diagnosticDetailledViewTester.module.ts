import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { DiagnosticDetailledViewTesterComponent } from './diagnosticDetailledViewTester.component';
import { DiagnosticDetailledTesterService } from './diagnosticDetailledViewTester.service';
import { DiagnosticDetailledv1Module } from '../diagViews/diagnostic-detailled/v1/diagnosticDetailledv1.module';



@NgModule({
  imports: [SharedModule, DiagnosticDetailledv1Module],
  declarations: [DiagnosticDetailledViewTesterComponent],
})
export class DiagnosticDetailledViewTesterModule {}
