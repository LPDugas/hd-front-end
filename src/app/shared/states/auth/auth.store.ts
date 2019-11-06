import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Auth } from 'app/shared/states/auth/auth.interface';

export interface AuthState {
  access_token: string;
  id_token: string;
}

export function createInitialState(): AuthState {
  return {
    access_token: null,
    id_token: null,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'auth' })
export class AuthStore extends Store<Auth> {
  constructor() {
    super(createInitialState());
  }
}
