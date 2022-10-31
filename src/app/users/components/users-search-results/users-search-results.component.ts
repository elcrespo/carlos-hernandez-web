import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../domain/models/user";

@Component({
  selector: 'app-users-search-results',
  templateUrl: './users-search-results.component.html',
  styleUrls: ['./users-search-results.component.scss']
})
export class UsersSearchResultsComponent implements OnInit {
  @Input() users: User[] = [];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['login', 'avatar_url', 'type'];

  constructor() { }

  ngOnInit(): void {
  }

}
