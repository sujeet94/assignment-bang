import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokimon-details',
  templateUrl: './pokimon-details.component.html',
  styleUrls: ['./pokimon-details.component.scss']
})
export class PokimonDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() details;
}
