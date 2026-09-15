import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar" [class.scrolled]="scrolled()" [class.menu-open]="menuOpen()">
      <div class="nav-container">
        <a href="#hero" class="logo" (click)="closeMenu()">
          <span class="logo-icon">📸</span>
          <span class="logo-text display-font">SNAP<span class="logo-accent">STAR</span></span>
        </a>

        <button class="hamburger" (click)="toggleMenu()" aria-label="Toggle menu">
          <span [class.open]="menuOpen()"></span>
          <span [class.open]="menuOpen()"></span>
          <span [class.open]="menuOpen()"></span>
        </button>

        <ul class="nav-links" [class.open]="menuOpen()">
          <li *ngFor="let link of links; let i = index"
              [style.animation-delay]="menuOpen() ? (i * 0.08) + 's' : '0s'">
            <a href="{{ link.url }}" (click)="closeMenu()" class="nav-link">
              <span class="link-icon">{{ link.icon }}</span>
              <span>{{ link.label }}</span>
            </a>
          </li>
          <li class="nav-cta-li">
            <a href="#contact" (click)="closeMenu()" class="nav-cta">
              Book Now
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      padding: var(--sp-2) 0;
      background: transparent;
    }

    .navbar.scrolled {
      background: var(--n-50);
      border-bottom: 3px solid var(--ink);
      box-shadow: 0 4px 0 rgba(26, 26, 46, 0.08);
      padding: var(--sp-1) 0;
    }

    .nav-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--sp-2);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: var(--sp-1);
      text-decoration: none;
      transition: transform 0.3s var(--ease-bounce);
    }

    .logo:hover {
      transform: scale(1.05) rotate(-2deg);
    }

    .logo-icon {
      font-size: 28px;
      animation: wobble 2s ease-in-out infinite;
    }

    .logo-text {
      font-size: 28px;
      color: var(--ink);
      letter-spacing: 2px;
    }

    .logo-accent {
      color: var(--c-accent-500);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: var(--sp-2);
      list-style: none;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 6px;
      text-decoration: none;
      color: var(--ink);
      font-weight: 600;
      font-size: 15px;
      padding: 8px 14px;
      border-radius: 10px;
      border: 2px solid transparent;
      transition: all 0.3s var(--ease-bounce);
      position: relative;
    }

    .nav-link::after {
      content: '';
      position: absolute;
      bottom: 2px;
      left: 14px;
      right: 14px;
      height: 3px;
      background: var(--c-accent-500);
      border-radius: 2px;
      transform: scaleX(0);
      transition: transform 0.3s var(--ease-bounce);
    }

    .nav-link:hover {
      background: var(--c-primary-100);
      border-color: var(--ink);
      transform: translateY(-2px);
      box-shadow: 3px 3px 0 var(--ink);
    }

    .nav-link:hover::after {
      transform: scaleX(1);
    }

    .link-icon {
      font-size: 18px;
    }

    .nav-cta {
      display: inline-block;
      padding: 10px 24px;
      background: var(--c-accent-500);
      color: white;
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
      border: 3px solid var(--ink);
      border-radius: 12px;
      box-shadow: 4px 4px 0 var(--ink);
      transition: all 0.3s var(--ease-bounce);
    }

    .nav-cta:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0 var(--ink);
      background: var(--c-accent-600);
    }

    .nav-cta:active {
      transform: translate(2px, 2px);
      box-shadow: 1px 1px 0 var(--ink);
    }

    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
    }

    .hamburger span {
      width: 28px;
      height: 3px;
      background: var(--ink);
      border-radius: 2px;
      transition: all 0.3s var(--ease-bounce);
    }

    .hamburger span.open:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    .hamburger span.open:nth-child(2) {
      opacity: 0;
    }
    .hamburger span.open:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }

    @media (max-width: 900px) {
      .hamburger { display: flex; }

      .nav-links {
        position: fixed;
        top: 64px;
        right: 0;
        width: 280px;
        flex-direction: column;
        background: var(--n-50);
        border: 3px solid var(--ink);
        border-radius: 0 0 0 20px;
        box-shadow: -6px 6px 0 var(--ink);
        padding: var(--sp-3) var(--sp-2);
        gap: var(--sp-1);
        transform: translateX(100%);
        opacity: 0;
        pointer-events: none;
        transition: all 0.4s var(--ease-bounce);
      }

      .nav-links.open {
        transform: translateX(0);
        opacity: 1;
        pointer-events: auto;
      }

      .nav-links li {
        width: 100%;
        opacity: 0;
        animation: slideInRight 0.4s var(--ease-bounce) forwards;
      }

      .nav-links.open li {
        animation: slideInRight 0.4s var(--ease-bounce) forwards;
      }

      .nav-link {
        width: 100%;
        justify-content: flex-start;
        padding: 12px 16px;
      }

      .nav-cta-li {
        margin-top: var(--sp-1);
      }

      .nav-cta {
        display: block;
        text-align: center;
      }
    }
  `],
})
export class NavbarComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  links = [
    { label: 'Home', url: '#hero', icon: '🏠' },
    { label: 'Services', url: '#services', icon: '🎯' },
    { label: 'Gallery', url: '#gallery', icon: '🖼️' },
    { label: 'About', url: '#about', icon: '👤' },
    { label: 'Reviews', url: '#testimonials', icon: '⭐' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 60);
  }

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}
