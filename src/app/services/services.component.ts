import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../reveal.directive';
import { PRICING_ROWS, SERVICE_LEVELS, type ServiceLevel } from '../data';

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
            From budget-friendly basics to full cinematic productions — pick the
            tier that fits your vision. Every package includes professional editing
            and a private online gallery.
          </p>
        </div>

        <!-- Level cards -->
        <div class="levels" appReveal>
          <div
            *ngFor="let lvl of serviceLevels; let i = index"
            class="level-card"
            [class.popular]="lvl.popular"
            [style.--lvl-color]="lvl.color"
            [style.--lvl-bg]="lvl.bgColor"
            [style.--lvl-border]="lvl.borderColor"
          >
            <div class="level-badge" *ngIf="lvl.popular">
              <span class="display-font">MOST POPULAR ⭐</span>
            </div>

            <div class="level-icon-wrap">
              <div class="level-icon" [style.background]="lvl.bgColor">
                <span class="level-icon-emoji">{{ lvl.icon }}</span>
              </div>
            </div>

            <div class="level-label" [style.color]="lvl.color">
              <span class="level-dot">{{ lvl.dotColor }}</span>
              LEVEL {{ lvl.level }} — {{ lvl.label }}
            </div>
            <p class="level-tagline">{{ lvl.tagline }}</p>

            <!-- Packages within each level -->
            <div class="packages">
              <div *ngFor="let pkg of lvl.packages; let j = index" class="package-block"
                   [style.animation-delay]="(j * 0.1) + 's'">
                <div class="package-header">
                  <span class="package-name">{{ pkg.name }}</span>
                  <span class="package-price display-font" [style.color]="lvl.color">{{ pkg.price }}</span>
                </div>
                <ul class="package-features">
                  <li *ngFor="let f of pkg.features" class="pkg-feature">
                    <span class="pkg-check" [style.background]="lvl.bgColor">✓</span>
                    <span>{{ f }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <a href="#contact" class="level-btn" [style.background]="lvl.bgColor">
              Book {{ lvl.label | titlecase }}
            </a>
          </div>
        </div>

        <!-- Pricing table -->
        <div class="pricing-section" appReveal>
          <h3 class="pricing-title display-font">FULL PRICE LIST</h3>
          <p class="pricing-sub">All price ranges in ₹ (INR). Final quote depends on location, hours, and customizations.</p>

          <div class="pricing-table-wrap comics-border-thick">
            <table class="pricing-table">
              <thead>
                <tr>
                  <th class="col-service">Service</th>
                  <th class="col-tier">
                    <span class="tier-dot">🟢</span>
                    <span class="tier-name">Basic</span>
                  </th>
                  <th class="col-tier col-standard">
                    <span class="tier-dot">🔵</span>
                    <span class="tier-name">Standard</span>
                    <span class="star-badge">⭐</span>
                  </th>
                  <th class="col-tier">
                    <span class="tier-dot">🟣</span>
                    <span class="tier-name">Premium</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let row of pricingRows; let i = index"
                    [class.even]="i % 2 === 0"
                    [class.odd]="i % 2 === 1">
                  <td class="col-service">{{ row.service }}</td>
                  <td>{{ row.basic }}</td>
                  <td class="col-standard">{{ row.standard }}</td>
                  <td>{{ row.premium }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile pricing cards -->
          <div class="pricing-cards-mobile">
            <div *ngFor="let row of pricingRows" class="pricing-card-row comics-border">
              <div class="pcr-service">{{ row.service }}</div>
              <div class="pcr-tiers">
                <div class="pcr-tier">
                  <span class="pcr-dot">🟢</span>
                  <span class="pcr-label">Basic</span>
                  <span class="pcr-price">{{ row.basic }}</span>
                </div>
                <div class="pcr-tier pcr-standard">
                  <span class="pcr-dot">🔵</span>
                  <span class="pcr-label">Standard</span>
                  <span class="pcr-price">{{ row.standard }}</span>
                </div>
                <div class="pcr-tier">
                  <span class="pcr-dot">🟣</span>
                  <span class="pcr-label">Premium</span>
                  <span class="pcr-price">{{ row.premium }}</span>
                </div>
              </div>
            </div>
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
      transition: transform 0.3s var(--ease-bounce);
    }

    .section-tag:hover {
      transform: scale(1.05) rotate(-2deg);
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

    /* Level cards */
    .levels {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--sp-3);
      align-items: start;
    }

    .level-card {
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

    .level-card:hover {
      transform: translate(-4px, -4px) rotate(-1deg);
      box-shadow: 12px 12px 0 var(--ink);
    }

    .level-card.popular {
      background: var(--c-primary-50);
      border-width: 5px;
      transform: scale(1.03);
      box-shadow: 10px 10px 0 var(--ink);
    }

    .level-card.popular:hover {
      transform: scale(1.03) translate(-4px, -4px) rotate(-1deg);
      box-shadow: 14px 14px 0 var(--ink);
    }

    .level-badge {
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

    .level-icon-wrap {
      margin-bottom: var(--sp-2);
    }

    .level-icon {
      width: 72px;
      height: 72px;
      border: 3px solid var(--ink);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 4px 4px 0 var(--ink);
      transition: transform 0.4s var(--ease-bounce);
    }

    .level-card:hover .level-icon {
      transform: rotate(20deg) scale(1.15);
    }

    .level-icon-emoji {
      font-size: 32px;
    }

    .level-label {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1px;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .level-dot {
      font-size: 14px;
    }

    .level-tagline {
      font-size: 13px;
      color: var(--ink-light);
      margin-bottom: var(--sp-3);
      line-height: 1.5;
      min-height: 40px;
    }

    .packages {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: var(--sp-2);
      margin-bottom: var(--sp-3);
    }

    .package-block {
      background: var(--n-100);
      border: 2px solid var(--ink);
      border-radius: 12px;
      padding: var(--sp-2);
      text-align: left;
      transition: all 0.3s var(--ease-bounce);
    }

    .package-block:hover {
      transform: translateX(4px);
      box-shadow: -3px 3px 0 var(--ink);
    }

    .package-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 2px dashed var(--n-300);
    }

    .package-name {
      font-weight: 700;
      font-size: 15px;
      color: var(--ink);
    }

    .package-price {
      font-size: 24px;
      line-height: 1;
      transition: transform 0.3s var(--ease-bounce);
    }

    .package-block:hover .package-price {
      transform: scale(1.1);
    }

    .package-features {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .pkg-feature {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 13px;
      color: var(--ink);
      font-weight: 500;
      transition: transform 0.2s ease;
    }

    .pkg-feature:hover {
      transform: translateX(3px);
    }

    .pkg-check {
      flex-shrink: 0;
      width: 18px;
      height: 18px;
      border: 2px solid var(--ink);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 11px;
      box-shadow: 1px 1px 0 var(--ink);
    }

    .level-btn {
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
      margin-top: auto;
      position: relative;
      overflow: hidden;
    }

    .level-btn::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }

    .level-btn:hover::before {
      transform: translateX(100%);
    }

    .level-btn:hover {
      transform: translate(-3px, -3px);
      box-shadow: 8px 8px 0 var(--ink);
      filter: brightness(1.1);
    }

    .level-btn:active {
      transform: translate(2px, 2px);
      box-shadow: 1px 1px 0 var(--ink);
    }

    /* Pricing table */
    .pricing-section {
      margin-top: var(--sp-8);
    }

    .pricing-title {
      font-size: clamp(28px, 5vw, 48px);
      color: var(--ink);
      text-align: center;
      margin-bottom: var(--sp-1);
      -webkit-text-stroke: 1px var(--ink);
    }

    .pricing-sub {
      text-align: center;
      font-size: 14px;
      color: var(--ink-light);
      margin-bottom: var(--sp-4);
    }

    .pricing-table-wrap {
      background: var(--n-50);
      overflow-x: auto;
      padding: 0;
    }

    .pricing-table {
      width: 100%;
      border-collapse: collapse;
      font-family: var(--font-body);
    }

    .pricing-table thead th {
      background: var(--ink);
      color: white;
      padding: 14px 16px;
      font-weight: 700;
      font-size: 14px;
      text-align: left;
      position: relative;
      white-space: nowrap;
    }

    .pricing-table thead .col-service {
      border-right: 2px solid var(--n-600);
    }

    .pricing-table thead .col-tier {
      display: flex;
      align-items: center;
      gap: 6px;
      border-right: 2px solid var(--n-600);
    }

    .pricing-table thead .col-tier:last-child {
      border-right: none;
    }

    .pricing-table thead .col-standard {
      background: var(--c-secondary-700);
    }

    .tier-dot {
      font-size: 16px;
    }

    .tier-name {
      letter-spacing: 1px;
    }

    .star-badge {
      position: absolute;
      top: -10px;
      right: 8px;
      font-size: 16px;
      filter: drop-shadow(0 0 2px var(--c-primary-400));
    }

    .pricing-table tbody tr.even {
      background: var(--n-50);
    }

    .pricing-table tbody tr.odd {
      background: var(--n-100);
    }

    .pricing-table tbody tr {
      transition: background 0.2s ease, transform 0.2s ease;
    }

    .pricing-table tbody tr:hover {
      background: var(--c-primary-50);
      transform: translateX(2px);
    }

    .pricing-table tbody td {
      padding: 12px 16px;
      font-size: 14px;
      color: var(--ink);
      border-bottom: 1px solid var(--n-200);
    }

    .pricing-table tbody .col-service {
      font-weight: 700;
    }

    .pricing-table tbody .col-standard {
      background: rgba(0, 188, 212, 0.06);
      font-weight: 600;
    }

    .pricing-table tbody tr:hover .col-standard {
      background: rgba(0, 188, 212, 0.12);
    }

    /* Mobile pricing cards */
    .pricing-cards-mobile {
      display: none;
    }

    .pricing-card-row {
      background: var(--n-50);
      padding: var(--sp-2);
      margin-bottom: 12px;
      transition: transform 0.3s var(--ease-bounce);
    }

    .pricing-card-row:hover {
      transform: translateX(-3px);
    }

    .pcr-service {
      font-weight: 700;
      font-size: 15px;
      color: var(--ink);
      margin-bottom: 10px;
      padding-bottom: 8px;
      border-bottom: 2px dashed var(--n-300);
    }

    .pcr-tiers {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .pcr-tier {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      background: var(--n-100);
      border: 2px solid var(--n-300);
      border-radius: 10px;
      font-size: 13px;
      transition: all 0.3s var(--ease-bounce);
    }

    .pcr-tier:hover {
      border-color: var(--ink);
      box-shadow: 2px 2px 0 var(--ink);
    }

    .pcr-standard {
      background: rgba(0, 188, 212, 0.08);
      border-color: var(--c-secondary-400);
      font-weight: 600;
    }

    .pcr-dot {
      font-size: 14px;
    }

    .pcr-label {
      font-weight: 700;
      color: var(--ink);
      min-width: 60px;
    }

    .pcr-price {
      color: var(--ink-light);
      margin-left: auto;
      font-weight: 600;
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
      transition: color 0.3s, transform 0.3s;
      display: inline-block;
    }

    .services-bottom-note a:hover {
      color: var(--c-accent-800);
      transform: translateY(-2px);
    }

    @media (max-width: 900px) {
      .levels {
        grid-template-columns: 1fr;
        max-width: 500px;
        margin: 0 auto;
      }

      .level-card.popular {
        transform: scale(1);
      }

      .level-card.popular:hover {
        transform: translate(-4px, -4px) rotate(-1deg);
      }
    }

    @media (max-width: 700px) {
      .pricing-table-wrap {
        display: none;
      }

      .pricing-cards-mobile {
        display: block;
      }
    }
  `],
})
export class ServicesComponent {
  pricingRows = PRICING_ROWS;
  serviceLevels: ServiceLevel[] = SERVICE_LEVELS;
}
