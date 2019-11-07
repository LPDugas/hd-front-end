import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { DiagnosticDetailledv1Component } from './diagnosticDetailledv1.component';

import {Titlev1Module} from '../../object/title/v1/titlev1.module';
import {Paragraphv1Module} from '../../object/paragraph/v1/paragraphv1.module';
import { BasicAgGridv1Module } from '../../object/table/ag-grid/basic/v1/basicAgGrid.v1.module';
import { plotTimeSeriesv1Module } from '../../object/plot/timeSeries/v1/plotTimeSeries.v1.module';

@NgModule({
  imports: [SharedModule, Titlev1Module, Paragraphv1Module, BasicAgGridv1Module, plotTimeSeriesv1Module],
  declarations: [DiagnosticDetailledv1Component],
  exports: [DiagnosticDetailledv1Component]
})
export class DiagnosticDetailledv1Module {}
