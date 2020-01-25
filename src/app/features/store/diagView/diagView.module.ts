import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { CommonModule } from '@angular/common';

import {DiagViewComponent} from './diagView.component';

import { DiagnosticDetailledv1Module } from '../../diagViews/diagnostic-detailled/v1/diagnosticDetailledv1.module'

@NgModule({
  imports: [SharedModule, CommonModule, DiagnosticDetailledv1Module],
  declarations: [DiagViewComponent],
  exports: [DiagViewComponent]
})
export class DiagViewModule {}
