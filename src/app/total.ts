import { Component, ChangeDetectorRef } from '@angular/core';
import { Surface, EVENT_DATA_UPDATED, EVENT_GRAPH_CLEARED } from '@visuallyjs/browser-ui';
import { VisuallyJsService } from '@visuallyjs/browser-ui-angular';

@Component({
  selector: 'ni-total',
  standalone: true,
  template: `<div style="position:absolute; top:0.5rem; right:0.5rem; font-size:27px;">{{ '$' + total.toFixed(2) }}</div>`,
  styleUrls: ['../network-infrastructure.css']
})
export class TotalComponent {
  total = 0;
  private model: any = null;



  constructor(private vjs: VisuallyJsService, private cdr: ChangeDetectorRef) {
    this.vjs.getSurface((s: Surface) => {
      this.model = s.model;
      this.model.bind(EVENT_DATA_UPDATED, () => this.update());
      this.model.bind(EVENT_GRAPH_CLEARED, () => this.update());
      this.update();
    });
  }

  update() {
    if (this.model) {
      const nodeTotal = this.model.getNodes().map((n: any) => n.data).reduce((acc: number, current: any) => acc + (current.monthlyPrice || 0), 0);
      const groupTotal = this.model.getGroups().map((n: any) => n.data).reduce((acc: number, current: any) => acc + (current.monthlyPrice || 0), 0);
      this.total = nodeTotal + groupTotal;
      this.cdr.detectChanges();
    }
  }
}
