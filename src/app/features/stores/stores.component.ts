import { Component, OnInit } from '@angular/core';

import { StoresService } from "./state/stores.service";
import { StoresQuery } from "./state/stores.query";
import { Observable } from 'rxjs';

@Component({
    selector: 'app-stores',
    templateUrl: './stores.component.html'
})
export class StoresComponent implements OnInit {
    stores$: Observable<any[]>;
    loading$: Observable<boolean>;

    constructor(
        private storesService: StoresService,
        private storesQuery: StoresQuery
        ) {}

    ngOnInit() {
        this.storesService.get().subscribe();
        this.loading$ = this.storesQuery.selectLoading();

        this.stores$= this.storesQuery.getStores();
    }

}