import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent {
  reviewsPerPage = 10;
  currentPage = 1;

  reviews = Array.from({ length: 45 }, (_, i) => ({
    author: `Korisnik${i + 1}`,
    comment: `Ovo je komentar korisnika broj ${i + 1}. Proizvod je bio ${
      i % 2 === 0 ? 'odličan' : 'solidan'
    }.`,
  }));

  get paginatedReviews() {
    const start = (this.currentPage - 1) * this.reviewsPerPage;
    return this.reviews.slice(start, start + this.reviewsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.reviews.length / this.reviewsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  get pageInfo(): string {
    const start = (this.currentPage - 1) * this.reviewsPerPage + 1;
    const end = Math.min(start + this.reviewsPerPage - 1, this.reviews.length);
    return `${start}–${end} [${this.reviews.length}]`;
  }
}
