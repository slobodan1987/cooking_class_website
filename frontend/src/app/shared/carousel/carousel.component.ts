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
    '/assets/img/img0.jpg',
    '/assets/img/img1.jpg',
    '/assets/img/img2.jpg',
    '/assets/img/img3.jpg',
    '/assets/img/img4.jpg',
    '/assets/img/img5.jpg',
    '/assets/img/img6.jpg',
    '/assets/img/img7.jpg',
    '/assets/img/img8.jpg',
    '/assets/img/img9.jpg',
    '/assets/img/img10.jpg',
    '/assets/img/img11.jpg',
    '/assets/img/img12.jpg',
    '/assets/img/img13.jpg',
    '/assets/img/img14.jpg',
    '/assets/img/img15.jpg',
    '/assets/img/img16.jpg',
    '/assets/img/img17.jpg',
    '/assets/img/img18.jpg',
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
