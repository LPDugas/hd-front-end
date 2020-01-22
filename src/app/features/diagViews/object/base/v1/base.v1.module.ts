import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { Basev1Component } from './base.v1.component';

import {Titlev1Module} from '../../title/v1/titlev1.module';
import {Paragraphv1Module} from '../../paragraph/v1/paragraphv1.module';
import { plotTimeSeriesv1Module } from '../../plot/timeSeries/v1/plotTimeSeries.v1.module';
import { Flagv1Module } from '../../flag/v1/flag.v1.module';

//Manage here the ag-grid component to fix the cyclic dependencies
import {BasicAgGridv1Component} from '../../table/ag-grid/basic/v1/basicAgGrid.v1.component'
import {CellRenderer} from '../../table/ag-grid/basic/v1/cellRenderer/cellRenderer.component'
import {AgGridModule} from 'ag-grid-angular';


@NgModule({
  imports: [
    SharedModule,
    Titlev1Module,
    Paragraphv1Module,
    plotTimeSeriesv1Module,
    Flagv1Module, 
    AgGridModule.withComponents([CellRenderer])
  ],
  declarations: [Basev1Component, BasicAgGridv1Component, CellRenderer],
  exports: [Basev1Component, BasicAgGridv1Component]
})
export class Basev1Module {}
