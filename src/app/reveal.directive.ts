import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('appReveal') revealClass = 'reveal';
  @Input() revealThreshold = 0.15;

  private observer: IntersectionObserver | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    const host = this.el.nativeElement as HTMLElement;
    this.renderer.addClass(host, this.revealClass);

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(host, 'visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: this.revealThreshold },
    );

    this.observer.observe(host);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
