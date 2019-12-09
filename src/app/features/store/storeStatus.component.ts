import { Component, OnInit } from '@angular/core';

import { StoresQuery } from "../stores/state/stores.query";
import { StoresService } from "../stores/state/stores.service";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-store-status',
    templateUrl: './storeStatus.component.html'
})
export class StoreStatusComponent implements OnInit {
    store$:Observable<any>;
    loading$: Observable<boolean>;

    storeName: string;

    constructor(
        private storesQuery: StoresQuery,
        private storesService: StoresService,
        private route: ActivatedRoute
        ) {}

    ngOnInit() {
        this.route.paramMap.subscribe( params => {
            this.storeName = params.get('storeName');

            this.storesService.getSpecificStore(this.storeName).subscribe(() => {
                console.log("get store$");
                this.store$ = this.storesQuery.getStore(this.storeName);
                
            })
            
        });
    }

}