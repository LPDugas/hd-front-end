import { Component, OnInit, Input } from '@angular/core';

import { StoresQuery } from "../../stores/state/stores.query";
import { StoresService } from "../../stores/state/stores.service";
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'app-store-diag-detailled',
    templateUrl: './diagView.component.html'
})
export class DiagViewComponent implements OnInit {

    @Input() storeName: string;
    @Input() diagID: string

    store$:Observable<any>;
    loading$: Observable<boolean>;

    diag: any;

    constructor(
        private storesQuery: StoresQuery,
        private storesService: StoresService,
        ) {}

    ngOnInit() {
        this.storesService.getSpecificStore(this.storeName).subscribe(() => {
            console.log("get store$");
            console.log(this.storeName + " " + this.diagID)
            this.store$ = this.storesQuery.getStore(this.storeName).pipe(tap((store) => {
                this.diag = store.object.find( diag => diag._id === this.diagID );
            }));
        });
                
    }

}