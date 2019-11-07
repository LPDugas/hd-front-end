import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';


import { plotTimeSeriesv1Component } from './plotTimeSeries.v1.component';

@NgModule({
  imports: [SharedModule, ],
  declarations: [plotTimeSeriesv1Component],
  exports: [plotTimeSeriesv1Component]
})
export class plotTimeSeriesv1Module {}
