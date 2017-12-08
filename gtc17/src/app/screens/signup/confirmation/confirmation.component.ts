import { Component, OnInit, Input } from '@angular/core';
import { Member } from 'app/classes/Member';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  @Input() public member: Member;
  constructor() { }

  ngOnInit() {
    console.log(this.member);
  }

}
