import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-store',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: `./store.component.html`
})
export class StoreComponent {
  @Input() store: any;
}