import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../reveal.directive';
import { TESTIMONIALS } from '../data';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="testimonials" class="testimonials-section section-pad">
      <div class="container">
        <div class="section-header" appReveal>
          <div class="section-tag" style="background: var(--c-success-500); color: white;">REVIEWS</div>
          <h2 class="section-title display-font">HAPPY CLIENTS</h2>
          <p class="section-desc">
            Don't just take our word for it — here's what people are saying
            after working with us.
          </p>
        </div>

        <div class="testimonial-grid stagger" appReveal>
          <div
            *ngFor="let t of testimonials; let i = index"
            class="testimonial-card comics-border"
            [style.--card-rotate]="(i % 2 === 0 ? -1 : 1) + 'deg'"
          >
            <div class="quote-mark display-font">"</div>
            <p class="testimonial-text">{{ t.text }}</p>
            <div class="testimonial-author">
              <div class="author-avatar" [style.background]="t.color">
                {{ t.avatar }}
              </div>
              <div class="author-info">
                <span class="author-name">{{ t.name }}</span>
                <span class="author-role">{{ t.role }}</span>
              </div>
              <div class="stars">
                <span *ngFor="let s of [1,2,3,4,5]" class="star">★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonials-section {
      background: linear-gradient(180deg, var(--c-secondary-50) 0%, var(--n-50) 100%);
    }

    .section-header {
      text-align: center;
      max-width: 640px;
      margin: 0 auto var(--sp-5);
    }

    .section-tag {
      display: inline-block;
      padding: 6px 16px;
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

    .testimonial-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--sp-3);
    }

    .testimonial-card {
      position: relative;
      background: var(--n-50);
      padding: var(--sp-4) var(--sp-3);
      transform: rotate(var(--card-rotate));
      transition: all 0.4s var(--ease-bounce);
    }

    .testimonial-card:hover {
      transform: rotate(0deg) translate(-3px, -3px) scale(1.02);
      box-shadow: 8px 8px 0 var(--ink);
    }

    .quote-mark {
      position: absolute;
      top: -10px;
      left: 16px;
      font-size: 72px;
      color: var(--c-primary-400);
      line-height: 1;
      -webkit-text-stroke: 2px var(--ink);
      z-index: 0;
    }

    .testimonial-text {
      position: relative;
      z-index: 1;
      font-size: 15px;
      color: var(--ink);
      line-height: 1.7;
      margin-bottom: var(--sp-3);
      font-weight: 500;
    }

    .testimonial-author {
      display: flex;
      align-items: center;
      gap: 12px;
      border-top: 2px dashed var(--n-300);
      padding-top: var(--sp-2);
    }

    .author-avatar {
      width: 48px;
      height: 48px;
      border: 2px solid var(--ink);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 16px;
      box-shadow: 2px 2px 0 var(--ink);
      flex-shrink: 0;
    }

    .author-info {
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .author-name {
      font-weight: 700;
      font-size: 15px;
      color: var(--ink);
    }

    .author-role {
      font-size: 13px;
      color: var(--ink-light);
    }

    .stars {
      display: flex;
      gap: 2px;
    }

    .star {
      color: var(--c-primary-500);
      font-size: 16px;
      -webkit-text-stroke: 1px var(--ink);
    }

    @media (max-width: 900px) {
      .testimonial-grid {
        grid-template-columns: 1fr;
        max-width: 500px;
        margin: 0 auto;
      }

      .testimonial-card {
        transform: rotate(0deg);
      }
    }
  `],
})
export class TestimonialsComponent {
  testimonials = TESTIMONIALS;
}
