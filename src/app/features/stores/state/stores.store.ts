import { Injectable } from '@angular/core';
import {EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface Store {
    name: string | null;
    object: any | null;
}

export interface StoresState  extends EntityState<Store> {}


@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stores', idKey: 'name' })
export class StoresStore extends EntityStore<StoresState> {

  constructor() {
    super();
  }
}