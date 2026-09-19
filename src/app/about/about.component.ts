import { Component, AfterViewInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../reveal.directive';

interface Skill {
  name: string;
  pct: number;
  color: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="about" class="about-section section-pad">
      <div class="container">
        <div class="about-grid">
          <div class="about-visual" appReveal="reveal-left">
            <div class="photo-frame comics-border-thick">
              <img src="https://images.pexels.com/photos/16922040/pexels-photo-16922040.jpeg?auto=compress&cs=tinysrgb&h=650&w=500"
                   alt="Photographer with camera" />
              <div class="photo-shine"></div>
            </div>
            <div class="floating-badge badge-1 comics-border anim-float">
              <span class="badge-icon">🏆</span>
              <div class="badge-text">
                <span class="badge-num display-font">10+</span>
                <span class="badge-label">Years</span>
              </div>
            </div>
            <div class="floating-badge badge-2 comics-border anim-float-slow">
              <span class="badge-icon">⚡</span>
              <div class="badge-text">
                <span class="badge-num display-font">24h</span>
                <span class="badge-label">Fast Delivery</span>
              </div>
            </div>
            <div class="floating-badge badge-3 comics-border anim-float">
              <span class="badge-icon">😊</span>
              <div class="badge-text">
                <span class="badge-num display-font">500+</span>
                <span class="badge-label">Happy Clients</span>
              </div>
            </div>
          </div>

          <div class="about-text" appReveal="reveal-right">
            <div class="section-tag" style="background: var(--c-primary-100);">ABOUT</div>
            <h2 class="about-title display-font">THE STORY BEHIND THE LENS</h2>
            <p class="about-desc">
              Hey there! I'm a passionate photographer with over a decade of
              experience capturing life's most vibrant moments. From studio
              portraits to cinematic wedding films, I believe every frame
              tells a story worth remembering.
            </p>
            <p class="about-desc">
              My style is bold, colorful, and full of energy — just like the
              comics that inspired me. I don't just take photos; I create
              visual adventures that make you feel something every time
              you look at them.
            </p>

            <div class="skills stagger" appReveal>
              <div *ngFor="let skill of skills" class="skill-bar">
                <div class="skill-header">
                  <span>{{ skill.name }}</span>
                  <span class="skill-pct">{{ skill.pct }}%</span>
                </div>
                <div class="skill-track">
                  <div
                    class="skill-fill"
                    [style.width]="skillsAnimated() ? skill.pct + '%' : '0%'"
                    [style.background]="skill.color"
                  ></div>
                </div>
              </div>
            </div>

            <div class="about-cta" appReveal="reveal-pop">
              <a href="#contact" class="btn-primary">
                Let's Work Together →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .about-section {
      background: var(--n-50);
      position: relative;
      overflow: hidden;
    }

    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: var(--sp-6);
      align-items: center;
    }

    .about-visual {
      position: relative;
      display: flex;
      justify-content: center;
    }

    .photo-frame {
      width: 100%;
      max-width: 400px;
      height: 500px;
      overflow: hidden;
      transform: rotate(-3deg);
      transition: transform 0.4s var(--ease-bounce);
      position: relative;
    }

    .photo-frame:hover {
      transform: rotate(0deg) scale(1.02);
    }

    .photo-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .photo-shine {
      position: absolute;
      top: 0;
      left: -100%;
      width: 50%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent,
        rgba(255,255,255,0.25),
        transparent
      );
      animation: shimmer 5s ease-in-out infinite;
      pointer-events: none;
    }

    .floating-badge {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      background: var(--n-50);
      z-index: 2;
      transition: transform 0.3s var(--ease-bounce);
    }

    .floating-badge:hover {
      transform: scale(1.08) rotate(0deg) !important;
      box-shadow: 6px 6px 0 var(--ink);
    }

    .badge-1 {
      top: 20px;
      right: -10px;
      transform: rotate(5deg);
    }

    .badge-2 {
      bottom: 30px;
      left: -20px;
      transform: rotate(-4deg);
    }

    .badge-3 {
      top: 45%;
      right: -15px;
      transform: rotate(3deg);
    }

    .badge-icon {
      font-size: 28px;
    }

    .badge-text {
      display: flex;
      flex-direction: column;
    }

    .badge-num {
      font-size: 22px;
      color: var(--ink);
      line-height: 1;
    }

    .badge-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--ink-light);
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
      transition: transform 0.3s var(--ease-bounce);
    }

    .section-tag:hover {
      transform: scale(1.05) rotate(-2deg);
    }

    .about-title {
      font-size: clamp(32px, 5vw, 52px);
      color: var(--ink);
      margin-bottom: var(--sp-3);
      -webkit-text-stroke: 1px var(--ink);
      line-height: 1.1;
    }

    .about-desc {
      font-size: 16px;
      color: var(--ink-light);
      line-height: 1.7;
      margin-bottom: var(--sp-2);
    }

    .skills {
      display: flex;
      flex-direction: column;
      gap: 14px;
      margin: var(--sp-4) 0;
    }

    .skill-bar {
      width: 100%;
    }

    .skill-header {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      font-size: 14px;
      color: var(--ink);
      margin-bottom: 6px;
    }

    .skill-pct {
      color: var(--c-accent-600);
      font-weight: 700;
    }

    .skill-track {
      height: 14px;
      background: var(--n-200);
      border: 2px solid var(--ink);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 2px 2px 0 var(--ink);
    }

    .skill-fill {
      height: 100%;
      border-right: 2px solid var(--ink);
      border-radius: 0 8px 8px 0;
      transition: width 1.2s var(--ease-bounce);
      position: relative;
    }

    .skill-fill::after {
      content: '';
      position: absolute;
      inset: 0;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 6px,
        rgba(255,255,255,0.15) 6px,
        rgba(255,255,255,0.15) 12px
      );
    }

    .about-cta {
      margin-top: var(--sp-3);
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      background: var(--c-accent-500);
      color: white;
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      border: 3px solid var(--ink);
      border-radius: 14px;
      box-shadow: 5px 5px 0 var(--ink);
      transition: all 0.3s var(--ease-bounce);
      position: relative;
      overflow: hidden;
    }

    .btn-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(120deg, transparent, rgba(255,255,255,0.25), transparent);
      transform: translateX(-100%);
      transition: transform 0.5s ease;
    }

    .btn-primary:hover::before {
      transform: translateX(100%);
    }

    .btn-primary:hover {
      transform: translate(-3px, -3px);
      box-shadow: 8px 8px 0 var(--ink);
      background: var(--c-accent-600);
    }

    @media (max-width: 900px) {
      .about-grid {
        grid-template-columns: 1fr;
        gap: var(--sp-5);
      }

      .about-visual {
        order: 2;
      }

      .photo-frame {
        max-width: 320px;
        height: 400px;
      }

      .badge-1 { right: 10px; }
      .badge-2 { left: 10px; }
      .badge-3 { right: 10px; }
    }
  `],
})
export class AboutComponent implements AfterViewInit {
  skillsAnimated = signal(false);

  skills: Skill[] = [
    { name: 'Portrait Photography', pct: 95, color: 'var(--c-accent-500)' },
    { name: 'Wedding Photography', pct: 90, color: 'var(--c-primary-500)' },
    { name: 'Cinematic Videography', pct: 85, color: 'var(--c-secondary-500)' },
    { name: 'Photo Editing & Retouch', pct: 92, color: 'var(--c-success-500)' },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => this.skillsAnimated.set(true), 400);
  }
}
