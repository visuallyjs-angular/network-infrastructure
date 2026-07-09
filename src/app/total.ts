import {Component, signal} from '@angular/core';
import {BrowserUIModel} from '@visuallyjs/browser-ui';
import {useVisuallyJsUpdate} from "@visuallyjs/browser-ui-angular"

@Component({
  selector: 'ni-total',
  standalone: true,
  template: `<div style="position:absolute; top:0.5rem; right:0.5rem; font-size:27px;">{{ '$' + total().toFixed(2) }}</div>`,
  styleUrls: ['../network-infrastructure.css']
})
export class TotalComponent {
  total = signal<number>(0)

    constructor() {
      // use an update hook to keep track of the current total spend
        useVisuallyJsUpdate((model:BrowserUIModel) => {
            const nodeTotal = model.getNodes().map((n: any) => n.data).reduce((acc: number, current: any) => acc + (current.monthlyPrice || 0), 0);
            const groupTotal = model.getGroups().map((n: any) => n.data).reduce((acc: number, current: any) => acc + (current.monthlyPrice || 0), 0);
            this.total.set(nodeTotal + groupTotal)
        })
    }
}
