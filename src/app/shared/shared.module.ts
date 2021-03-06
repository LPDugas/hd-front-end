import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

//Initialize plotly
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import { PlotlyModule } from 'angular-plotly.js'
PlotlyModule.plotlyjs = PlotlyJS


// we now have to import every sub modules of material we want to use
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatExpansionModule,
} from '@angular/material';

const MaterialModules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSidenavModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatSelectModule,
  MatExpansionModule
];

/**
 * this module should be imported in every sub-modules
 * you can define here the modules, components, pipes that you want to re-use all over your app
 */
export const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  FlexLayoutModule,
  TranslateModule,
  PlotlyModule,
  ...MaterialModules,
];

export const declarations = [];

@NgModule({
  imports: modules,
  exports: [...modules, ...declarations],
  declarations,
})
export class SharedModule {}
