import { SkipSelf, Component} from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular'


@Component({
    selector: 'app-diagnostic-object-agGrid-basic-v1-cell-renderer',
    templateUrl: './cellRenderer.component.html',
    styleUrls: ['./cellRenderer.component.scss'],
})

export class CellRenderer implements ICellRendererAngularComp {
    public params: any;

    public items: any;

    private getType( thing: any): string {
        return typeof thing;
    }

    agInit(params: any): void {
        this.params = params;
        this.items = params['value'];
        if ( ! Array.isArray(this.items) )
            this.items = [this.items];
    }

    refresh(): boolean {
        return false;
    }
}