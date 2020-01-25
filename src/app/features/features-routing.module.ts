import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FeaturesComponent } from 'app/features/features.component';
import { DiagnosticDetailledViewTesterComponent } from './diagnosticDetailledViewTester/diagnosticDetailledViewTester.component';
import { ProfileComponent } from './profile/profile.component';

import { StoresComponent } from './stores/stores.component'

import { AuthGuard } from '../shared/states/auth/auth.guard';
import { StoreStatusComponent } from './store/storeStatus.component';

const routes: Routes = [
  {
    path: '',
    component: FeaturesComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'diagViewTester',
        component: DiagnosticDetailledViewTesterComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'stores',
        component: StoresComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'store/:storeName',
        component: StoreStatusComponent,
        canActivate: [AuthGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FeaturesRoutingModule {}
