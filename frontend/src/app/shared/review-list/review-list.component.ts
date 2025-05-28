import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-review-list',
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.scss',
})
export class ReviewListComponent {
  reviews = Array.from({ length: 45 }, (_, i) => ({
    text: `Recenzija broj ${i + 1}`,
    rating: '⭐⭐⭐✰✰',
  }));

  reviewsPerPage = 10;
  currentPage = 1;

  get paginatedReviews() {
    const start = (this.currentPage - 1) * this.reviewsPerPage;
    return this.reviews.slice(start, start + this.reviewsPerPage);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.reviewsPerPage + 1;
  }

  get endIndex(): number {
    const end = this.currentPage * this.reviewsPerPage;
    return end > this.reviews.length ? this.reviews.length : end;
  }

  get total(): number {
    return this.reviews.length;
  }

  nextPage() {
    if (this.endIndex < this.total) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
