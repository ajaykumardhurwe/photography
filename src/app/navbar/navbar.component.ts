import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="scroll-progress" [style.width.%]="scrollProgress()"></div>

    <!-- Top bar: logo + Book Now only -->
    <nav class="navbar" [class.scrolled]="scrolled()">
      <div class="nav-container">
        <a href="#hero" class="logo">
          <span class="logo-icon">📸</span>
          <span class="logo-text display-font">SNAP<span class="logo-accent">STAR</span></span>
        </a>
        <a href="#contact" class="nav-cta">
          Book Now
        </a>
      </div>
    </nav>

    <!-- Bottom tab bar with 5 tabs -->
    <nav class="bottom-tabs">
      <a *ngFor="let link of links"
         href="{{ link.url }}"
         class="tab-item"
         [class.active]="activeTab() === link.label"
         (click)="setActiveTab(link.label)">
        <span class="tab-icon">{{ link.icon }}</span>
        <span class="tab-label">{{ link.label }}</span>
        <span class="tab-indicator" *ngIf="activeTab() === link.label"></span>
      </a>
    </nav>
  `,
  styles: [`
    .scroll-progress {
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--c-accent-500), var(--c-primary-500), var(--c-secondary-500));
      z-index: 2000;
      transition: width 0.1s ease;
      border-bottom: 2px solid var(--ink);
    }

    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      padding: 10px 0;
      background: transparent;
    }

    .navbar.scrolled {
      background: var(--n-50);
      border-bottom: 3px solid var(--ink);
      box-shadow: 0 4px 0 rgba(26, 26, 46, 0.08);
      padding: 6px 0;
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
      gap: 8px;
      text-decoration: none;
      transition: transform 0.3s var(--ease-bounce);
    }

    .logo:hover {
      transform: scale(1.05) rotate(-2deg);
    }

    .logo-icon {
      font-size: 26px;
      animation: wobble 2s ease-in-out infinite;
    }

    .logo-text {
      font-size: 26px;
      color: var(--ink);
      letter-spacing: 2px;
    }

    .logo-accent {
      color: var(--c-accent-500);
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
      position: relative;
      overflow: hidden;
    }

    .nav-cta::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }

    .nav-cta:hover::before {
      transform: translateX(100%);
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

    /* ===== Bottom tab bar ===== */
    .bottom-tabs {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: stretch;
      align-items: stretch;
      gap: 0;
      background: var(--n-50);
      border-top: 3px solid var(--ink);
      box-shadow: 0 -4px 12px rgba(26, 26, 46, 0.12);
      padding: 0;
      padding-bottom: env(safe-area-inset-bottom, 0px);
      max-width: 600px;
      margin: 0 auto;
      border-radius: 0;
      overflow: hidden;
      height: 64px;
    }

    .tab-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 3px;
      padding: 8px 4px;
      text-decoration: none;
      color: var(--ink-light);
      font-weight: 600;
      font-size: 11px;
      transition: all 0.3s var(--ease-bounce);
      position: relative;
      border-right: 1px solid var(--n-200);
      min-height: 56px;
    }

    .tab-item:last-child {
      border-right: none;
    }

    .tab-item:hover {
      background: var(--c-primary-50);
      color: var(--ink);
    }

    .tab-item.active {
      color: var(--c-accent-600);
      background: var(--c-accent-50);
    }

    .tab-icon {
      font-size: 22px;
      transition: transform 0.3s var(--ease-bounce);
      line-height: 1;
    }

    .tab-item:hover .tab-icon {
      transform: scale(1.2) rotate(5deg);
    }

    .tab-item.active .tab-icon {
      transform: scale(1.15);
    }

    .tab-label {
      letter-spacing: 0.5px;
    }

    .tab-indicator {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 4px;
      background: var(--c-accent-500);
      border-radius: 0 0 4px 4px;
      animation: slideInUp 0.3s var(--ease-bounce);
    }

    @media (min-width: 501px) {
      .bottom-tabs {
        border-radius: 20px 20px 0 0;
      }
    }

    @media (max-width: 500px) {
      .tab-item {
        padding: 6px 2px;
        font-size: 10px;
        min-height: 52px;
      }

      .tab-icon {
        font-size: 20px;
      }

      .tab-label {
        font-size: 9px;
        letter-spacing: 0;
      }

      .logo-text {
        font-size: 22px;
      }

      .logo-icon {
        font-size: 22px;
      }

      .nav-cta {
        padding: 8px 18px;
        font-size: 14px;
      }

      .bottom-tabs {
        height: 60px;
      }
    }
  `],
})
export class NavbarComponent {
  scrolled = signal(false);
  scrollProgress = signal(0);
  activeTab = signal('Home');

  links = [
    { label: 'Home', url: '#hero', icon: '🏠' },
    { label: 'Services', url: '#services', icon: '🎯' },
    { label: 'Gallery', url: '#gallery', icon: '🖼️' },
    { label: 'About', url: '#about', icon: '👤' },
    { label: 'Reviews', url: '#testimonials', icon: '⭐' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrolled.set(scrollTop > 60);
    this.scrollProgress.set(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

    // Auto-detect active tab based on scroll position
    const sections = ['hero', 'services', 'gallery', 'about', 'testimonials'];
    const labels = ['Home', 'Services', 'Gallery', 'About', 'Reviews'];
    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom > 120) {
          this.activeTab.set(labels[i]);
          break;
        }
      }
    }
  }

  setActiveTab(label: string): void {
    this.activeTab.set(label);
  }
}
