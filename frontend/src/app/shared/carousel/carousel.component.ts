import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent implements AfterViewInit {
  @ViewChild('carousel', { static: true })
  carousel!: ElementRef<HTMLDivElement>;

  images = [
    '/assets/img/img0.webp',
    '/assets/img/img1.webp',
    '/assets/img/img2.webp',
    '/assets/img/img3.webp',
    '/assets/img/img4.webp',
    '/assets/img/img5.webp',
    '/assets/img/img6.webp',
    '/assets/img/img7.webp',
    '/assets/img/img8.webp',
    '/assets/img/img9.webp',
    '/assets/img/img10.webp',
    '/assets/img/img11.webp',
    '/assets/img/img12.webp',
    '/assets/img/img13.webp',
    '/assets/img/img14.webp',
    '/assets/img/img15.webp',
    '/assets/img/img16.webp',
    '/assets/img/img17.webp',
    '/assets/img/img18.webp',
  ];

  currentIndex = 0;

  ngAfterViewInit() {
    this.carousel.nativeElement.addEventListener(
      'wheel',
      (e: WheelEvent) => {
        if (e.deltaY === 0 && e.deltaX === 0) return;
        e.preventDefault();
        this.carousel.nativeElement.scrollLeft +=
          e.deltaX !== 0 ? e.deltaX : e.deltaY;
      },
      { passive: false }
    );
  }

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
