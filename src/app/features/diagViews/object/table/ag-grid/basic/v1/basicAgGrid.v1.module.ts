import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import {AgGridModule} from 'ag-grid-angular';

import { BasicAgGridv1Component } from './basicAgGrid.v1.component';

@NgModule({
  imports: [SharedModule, AgGridModule.withComponents([])],
  declarations: [BasicAgGridv1Component],
  exports: [BasicAgGridv1Component]
})
export class BasicAgGridv1Module {}
