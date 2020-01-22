import { Component, Input } from "@angular/core";


@Component({
    selector: 'app-diagnostic-object-base-v1',
    templateUrl: './base.v1.component.html',
})

export class Basev1Component {
    @Input() jsonView: any;    

}