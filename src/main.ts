import { Component, signal, HostListener } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NavbarComponent } from './app/navbar/navbar.component';
import { HeroComponent } from './app/hero/hero.component';
import { ServicesComponent } from './app/services/services.component';
import { GalleryComponent } from './app/gallery/gallery.component';
import { AboutComponent } from './app/about/about.component';
import { TestimonialsComponent } from './app/testimonials/testimonials.component';
import { ContactComponent } from './app/contact/contact.component';
import { FooterComponent } from './app/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    ServicesComponent,
    GalleryComponent,
    AboutComponent,
    TestimonialsComponent,
    ContactComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-services />
      <app-gallery />
      <app-about />
      <app-testimonials />
      <app-contact />
    </main>
    <app-footer />

    <!-- Back to top button -->
    <button
      class="back-to-top"
      [class.visible]="showBackToTop()"
      (click)="scrollToTop()"
      aria-label="Back to top"
    >
      <span>↑</span>
    </button>
  `,
  styles: [`
    :host {
      display: block;
    }

    .back-to-top {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 52px;
      height: 52px;
      background: var(--c-accent-500);
      color: white;
      border: 3px solid var(--ink);
      border-radius: 50%;
      font-size: 22px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 4px 4px 0 var(--ink);
      z-index: 999;
      opacity: 0;
      transform: scale(0) rotate(-180deg);
      pointer-events: none;
      transition: all 0.4s var(--ease-bounce);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .back-to-top.visible {
      opacity: 1;
      transform: scale(1) rotate(0deg);
      pointer-events: auto;
      animation: pulseGlow 2.5s ease-in-out infinite;
    }

    .back-to-top:hover {
      transform: scale(1.15) rotate(0deg);
      box-shadow: 6px 6px 0 var(--ink);
      background: var(--c-accent-600);
    }

    .back-to-top:active {
      transform: scale(0.95);
      box-shadow: 2px 2px 0 var(--ink);
    }
  `],
})
export class App {
  showBackToTop = signal(false);

  @HostListener('window:scroll')
  onScroll(): void {
    this.showBackToTop.set(window.scrollY > 500);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

bootstrapApplication(App, {
  providers: [provideAnimations()],
});
