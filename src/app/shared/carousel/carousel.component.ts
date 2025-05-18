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
    '../../../assets/img/img.png',
    '../../../assets/img/img1.png',
    '../../../assets/img/img2.png',
    '../../../assets/img/img3.png',
    '../../../assets/img/img4.png',
    '../../../assets/img/img5.png',
    '../../../assets/img/img6.png',
    '../../../assets/img/img7.png',
    '../../../assets/img/img8.png',
    '../../../assets/img/img9.png',
    '../../../assets/img/img10.png',
    '../../../assets/img/img11.png',
    '../../../assets/img/img12.png',
    '../../../assets/img/img13.png',
    '../../../assets/img/img14.png',
    '../../../assets/img/img15.png',
    '../../../assets/img/img16.png',
    '../../../assets/img/img17.png',
    '../../../assets/img/img18.png',
    '../../../assets/img/img19.png',
    '../../../assets/img/img20.png',
    '../../../assets/img/img21.png',
    '../../../assets/img/img22.png',
    '../../../assets/img/img23.png',
    '../../../assets/img/img24.png',
    '../../../assets/img/img25.png',
    '../../../assets/img/img26.png',
    '../../../assets/img/img27.png',
    '../../../assets/img/img28.png',
    '../../../assets/img/img29.png',
    '../../../assets/img/img30.png',
    '../../../assets/img/img31.png',
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
