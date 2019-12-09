import { Component, OnInit } from '@angular/core';

import { StoresQuery } from "../../stores/state/stores.query";
import { StoresService } from "../../stores/state/stores.service";
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router'
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-store-diag-detailled',
    templateUrl: './diagView.component.html'
})
export class DiagViewComponent implements OnInit {
    store$:Observable<any>;
    loading$: Observable<boolean>;

    diag: any;

    storeName: string;
    diagID: string

    constructor(
        private storesQuery: StoresQuery,
        private storesService: StoresService,
        private route: ActivatedRoute
        ) {}

    ngOnInit() {
        this.route.paramMap.subscribe( params => {
            this.storeName = params.get('storeName');
            this.diagID = params.get('diagID');


            this.storesService.getSpecificStore(this.storeName).subscribe(() => {
                console.log("get store$");
                this.store$ = this.storesQuery.getStore(this.storeName).pipe(tap((store) => {
                    this.diag = store.object.find( diag => diag._id === this.diagID );
                }));
                
            })
            
        });
    }

}