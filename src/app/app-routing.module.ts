import { NgModule } from '@angular/core';
import {
  NoPreloading,
  PreloadAllModules,
  RouterModule,
  Routes,
} from '@angular/router';

import { environment } from 'environments/environment';

import { CallbackComponent } from './shared/states/auth/callback.component';

// if you don't want to lazy load the features module,
// simply put the loadFeaturesModule as value of loadChildren
// import { FeaturesModule } from './features/features.module';

// export function loadFeaturesModule() {
//   return FeaturesModule;
// }

const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/features/features.module#FeaturesModule',
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
];
@NgModule({
  declarations: [CallbackComponent],
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: environment.preloadAllLazyLoadedModules
        ? PreloadAllModules
        : NoPreloading,
    }),
  ],
})
export class AppRoutingModule {}
