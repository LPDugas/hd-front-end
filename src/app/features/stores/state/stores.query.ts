import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { StoresStore, StoresState } from './stores.store';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class StoresQuery extends QueryEntity<StoresState> {

  constructor(protected store: StoresStore) {
    super(store);
  }


  getStores() {
      return this.selectAll();
  }

  getStore(storeName: string) {
    return this.selectEntity(storeName);
  }

}
