import { Component, Input } from '@angular/core';

@Component({
  selector: 'branch',
  template: `
    <span>{{node.title}}</span>
`
})

export class BranchComponent {

  @Input() node: any;

}
