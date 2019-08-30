import { Component, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private dataService: DataStorageService) {}

  ngOnInit() {
  }

  onSave() {
    this.dataService.saveData();
  }

  onFetch() {
    this.dataService.fetchData().subscribe();
  }
}
