import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../reveal.directive';
import { SERVICES, type ServiceTier } from '../data';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="services" class="services-section section-pad">
      <div class="container">
        <div class="section-header" appReveal>
          <div class="section-tag">SERVICES</div>
          <h2 class="section-title display-font">CHOOSE YOUR LEVEL</h2>
          <p class="section-desc">
            From simple snaps to full cinematic productions — pick the package
            that fits your vision. Every tier includes professional editing and
            a private online gallery.
          </p>
        </div>

        <div class="tiers stagger" appReveal>
          <div
            *ngFor="let tier of services; let i = index"
            class="tier-card"
            [class.popular]="tier.popular"
            [style.--tier-color]="tier.color"
            [style.--tier-bg]="tier.bgColor"
            [style.--tier-border]="tier.borderColor"
          >
            <div class="tier-badge" *ngIf="tier.popular">
              <span class="display-font">MOST POPULAR</span>
            </div>

            <div class="tier-icon-wrap">
              <div class="tier-icon" [style.background]="tier.color">
                <span class="tier-icon-emoji">{{ getIcon(tier.icon) }}</span>
              </div>
            </div>

            <div class="tier-level" [style.color]="tier.color">{{ tier.level }}</div>
            <h3 class="tier-name display-font">{{ tier.name }}</h3>
            <p class="tier-tagline">{{ tier.tagline }}</p>

            <div class="tier-price">
              <span class="price-amount display-font">{{ tier.price }}</span>
              <span class="price-suffix">/ session</span>
            </div>

            <ul class="tier-features">
              <li *ngFor="let feature of tier.features" class="feature-item">
                <span class="check-mark" [style.background]="tier.color">✓</span>
                <span>{{ feature }}</span>
              </li>
            </ul>

            <a
              href="#contact"
              class="tier-btn"
              [style.background]="tier.color"
            >
              Book {{ tier.level | titlecase }}
            </a>
          </div>
        </div>

        <div class="services-bottom-note" appReveal="reveal-pop">
          <p>Need something custom? <a href="#contact">Get in touch</a> for a tailored quote.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .services-section {
      background: var(--n-50);
      position: relative;
    }

    .services-section::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 60px;
      background: linear-gradient(to bottom, var(--c-primary-100), transparent);
    }

    .section-header {
      text-align: center;
      max-width: 640px;
      margin: 0 auto var(--sp-6);
    }

    .section-tag {
      display: inline-block;
      padding: 6px 16px;
      background: var(--c-secondary-100);
      border: 2px solid var(--ink);
      border-radius: 50px;
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 2px;
      box-shadow: 2px 2px 0 var(--ink);
      margin-bottom: var(--sp-2);
    }

    .section-title {
      font-size: clamp(36px, 6vw, 64px);
      color: var(--ink);
      margin-bottom: var(--sp-2);
      -webkit-text-stroke: 1px var(--ink);
    }

    .section-desc {
      font-size: 17px;
      color: var(--ink-light);
      line-height: 1.6;
    }

    .tiers {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--sp-3);
      align-items: stretch;
    }

    .tier-card {
      position: relative;
      background: var(--n-50);
      border: 4px solid var(--ink);
      border-radius: 20px;
      box-shadow: 8px 8px 0 var(--ink);
      padding: var(--sp-4) var(--sp-3);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      transition: all 0.4s var(--ease-bounce);
      overflow: visible;
    }

    .tier-card:hover {
      transform: translate(-4px, -4px) rotate(-1deg);
      box-shadow: 12px 12px 0 var(--ink);
    }

    .tier-card.popular {
      background: var(--c-primary-50);
      border-width: 5px;
      transform: scale(1.05);
      box-shadow: 10px 10px 0 var(--ink);
    }

    .tier-card.popular:hover {
      transform: scale(1.05) translate(-4px, -4px) rotate(-1deg);
      box-shadow: 14px 14px 0 var(--ink);
    }

    .tier-badge {
      position: absolute;
      top: -16px;
      left: 50%;
      transform: translateX(-50%);
      padding: 6px 20px;
      background: var(--c-accent-500);
      color: white;
      border: 3px solid var(--ink);
      border-radius: 50px;
      font-size: 13px;
      letter-spacing: 1px;
      box-shadow: 3px 3px 0 var(--ink);
      white-space: nowrap;
      animation: wobble 2s ease-in-out infinite;
    }

    .tier-icon-wrap {
      margin-bottom: var(--sp-2);
    }

    .tier-icon {
      width: 72px;
      height: 72px;
      border: 3px solid var(--ink);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 4px 4px 0 var(--ink);
      transition: transform 0.3s var(--ease-bounce);
    }

    .tier-card:hover .tier-icon {
      transform: rotate(15deg) scale(1.1);
    }

    .tier-icon-emoji {
      font-size: 32px;
    }

    .tier-level {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      margin-bottom: 4px;
    }

    .tier-name {
      font-size: 28px;
      color: var(--ink);
      margin-bottom: 6px;
      letter-spacing: 1px;
    }

    .tier-tagline {
      font-size: 14px;
      color: var(--ink-light);
      margin-bottom: var(--sp-3);
      min-height: 40px;
    }

    .tier-price {
      margin-bottom: var(--sp-3);
      display: flex;
      align-items: baseline;
      gap: 2px;
    }

    .price-currency {
      font-size: 24px;
      font-weight: 700;
      color: var(--ink);
    }

    .price-amount {
      font-size: 48px;
      color: var(--ink);
      line-height: 1;
    }

    .price-suffix {
      font-size: 14px;
      color: var(--ink-light);
      font-weight: 500;
    }

    .tier-features {
      list-style: none;
      width: 100%;
      margin-bottom: var(--sp-3);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .feature-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 14px;
      text-align: left;
      color: var(--ink);
      font-weight: 500;
    }

    .check-mark {
      flex-shrink: 0;
      width: 22px;
      height: 22px;
      border: 2px solid var(--ink);
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 13px;
      box-shadow: 2px 2px 0 var(--ink);
    }

    .tier-btn {
      display: block;
      width: 100%;
      padding: 14px 24px;
      color: white;
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      border: 3px solid var(--ink);
      border-radius: 14px;
      box-shadow: 5px 5px 0 var(--ink);
      transition: all 0.3s var(--ease-bounce);
      text-align: center;
    }

    .tier-btn:hover {
      transform: translate(-3px, -3px);
      box-shadow: 8px 8px 0 var(--ink);
      filter: brightness(1.1);
    }

    .tier-btn:active {
      transform: translate(2px, 2px);
      box-shadow: 1px 1px 0 var(--ink);
    }

    .services-bottom-note {
      text-align: center;
      margin-top: var(--sp-5);
      font-size: 16px;
      color: var(--ink-light);
    }

    .services-bottom-note a {
      color: var(--c-accent-600);
      font-weight: 700;
      text-decoration: none;
      border-bottom: 2px solid var(--c-accent-500);
      transition: color 0.3s;
    }

    .services-bottom-note a:hover {
      color: var(--c-accent-800);
    }

    @media (max-width: 900px) {
      .tiers {
        grid-template-columns: 1fr;
        max-width: 420px;
        margin: 0 auto;
      }

      .tier-card.popular {
        transform: scale(1);
      }

      .tier-card.popular:hover {
        transform: translate(-4px, -4px) rotate(-1deg);
      }
    }
  `],
})
export class ServicesComponent {
  services = SERVICES;

  getIcon(icon: string): string {
    const icons: Record<string, string> = {
      'camera': '📷',
      'camera-enhance': '📸',
      'movie': '🎬',
    };
    return icons[icon] ?? '📷';
  }
}
