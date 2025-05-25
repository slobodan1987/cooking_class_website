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
    '/cooking_class_website/assets/img/img0.jpg',
    '/cooking_class_website/assets/img/img1.jpg',
    '/cooking_class_website/assets/img/img2.jpg',
    '/cooking_class_website/assets/img/img3.jpg',
    '/cooking_class_website/assets/img/img4.jpg',
    '/cooking_class_website/assets/img/img5.jpg',
    '/cooking_class_website/assets/img/img6.jpg',
    '/cooking_class_website/assets/img/img7.jpg',
    '/cooking_class_website/assets/img/img8.jpg',
    '/cooking_class_website/assets/img/img9.jpg',
    '/cooking_class_website/assets/img/img10.jpg',
    '/cooking_class_website/assets/img/img11.jpg',
    '/cooking_class_website/assets/img/img12.jpg',
    '/cooking_class_website/assets/img/img13.jpg',
    '/cooking_class_website/assets/img/img14.jpg',
    '/cooking_class_website/assets/img/img15.jpg',
    '/cooking_class_website/assets/img/img16.jpg',
    '/cooking_class_website/assets/img/img17.jpg',
    '/cooking_class_website/assets/img/img18.jpg',
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
