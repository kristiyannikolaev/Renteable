import { Component } from '@angular/core';

import { categoryOptions } from 'src/app/constants';
import { OffersService } from 'src/app/pages/offers.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  categories: string[] = categoryOptions;
  searchQuery: string = '';
  selectedCategory: string = '';

  constructor(private offersService: OffersService) {}

  search() {
    this.offersService.searchOffers(this.searchQuery).subscribe();
  }

  filterByCategory() {
    this.offersService.filterByCategory(this.selectedCategory).subscribe();
  }
}
