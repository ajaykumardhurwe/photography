import { Directive, ElementRef, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input('appReveal') revealClass = 'reveal';
  @Input() revealThreshold = 0.15;

  private observer: IntersectionObserver | null = null;
  private fallbackTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    const host = this.el.nativeElement as HTMLElement;
    this.renderer.addClass(host, this.revealClass);

    // Check if element is already in viewport on load
    const rect = host.getBoundingClientRect();
    const alreadyVisible =
      rect.top < window.innerHeight && rect.bottom > 0;

    if (alreadyVisible) {
      this.renderer.addClass(host, 'visible');
      return;
    }

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

    // Safety fallback: ensure content becomes visible even if observer fails
    this.fallbackTimer = setTimeout(() => {
      this.renderer.addClass(host, 'visible');
    }, 1500);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.fallbackTimer) clearTimeout(this.fallbackTimer);
  }
}
