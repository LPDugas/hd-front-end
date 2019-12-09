import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StoresStore } from './stores.store';
import { tap, mergeMap } from 'rxjs/operators';

import {environment} from 'environments/environment'
import { forkJoin, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StoresService {

  constructor(private storesStore: StoresStore,
              private http: HttpClient) {
  }

  get(): Observable<Object> {
      //clean up
      this.storesStore.set([]);
      this.storesStore.setLoading(true);
      //Get authorized Stores Name
      return this.http.get( `${environment.urlBackend}/stores`).pipe( tap(storesNameList => {  //mergeMap( (storesNameList ) => {
        //And get all the stores status here
        console.log(storesNameList);

        (storesNameList as Array<string>).map( (storeName) => {
            //insert empty objects that will be filled as required
            this.storesStore.upsert(storeName as string, {
                name: storeName as string,
                object: {}
            })
        });
        /* This is the way to fill all currentStatus right now
        const observablesList = (storesNameList as Array<string>).map((storeName) => {
            return this.http.get( `${environment.urlBackend}/store/${storeName}/currentStatus`).pipe(tap(storeMongoObject => {
                //Verify that we have our needed properties
                console.log(storeMongoObject);
                
                this.storesStore.upsert(storeName as string, {
                    name: storeName as string,
                    object: storeMongoObject
                });
            }));
        });
        return forkJoin(observablesList).pipe(tap( () => {
            this.storesStore.setLoading(false);
        }, (err) => {
            this.storesStore.setError({text: err });
        }));*/
      }));
  }

  getSpecificStore( storeName: string):Observable<Object> {
    return this.http.get( `${environment.urlBackend}/store/${storeName}/currentStatus`).pipe(tap(storeMongoObject => {
        //Verify that we have our needed properties
        console.log(storeMongoObject);
        
        this.storesStore.upsert(storeName as string, {
            name: storeName as string,
            object: storeMongoObject
        });
    }));
  }
}