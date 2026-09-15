import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="hero" class="hero">
      <!-- Floating decorative shapes -->
      <div class="hero-bg">
        <div class="shape shape-1 anim-float"></div>
        <div class="shape shape-2 anim-float-slow"></div>
        <div class="shape shape-3 anim-spin-slow"></div>
        <div class="shape shape-4 anim-float"></div>
        <div class="shape shape-5 anim-float-slow"></div>
        <div class="halftone-overlay"></div>
      </div>

      <div class="container hero-content">
        <div class="hero-text">
          <div class="badge anim-pulse" appReveal="reveal-pop">
            <span class="badge-dot"></span>
            Now booking 2026 sessions!
          </div>

          <h1 class="hero-title display-font" appReveal="reveal-left">
            <span class="title-line">CAPTURE</span>
            <span class="title-line title-accent">YOUR</span>
            <span class="title-line">STORY</span>
          </h1>

          <p class="hero-subtitle" appReveal="reveal-right">
            Professional photography services for every level — from first-timers
            to full cinematic productions. Bold, vibrant, unforgettable.
          </p>

          <div class="hero-actions" appReveal="reveal-pop">
            <a href="#services" class="btn-primary">
              <span>Explore Services</span>
              <span class="btn-arrow">→</span>
            </a>
            <a href="#gallery" class="btn-secondary">
              <span>📷</span>
              <span>View Gallery</span>
            </a>
          </div>

          <div class="hero-stats stagger" appReveal>
            <div class="stat">
              <span class="stat-num display-font">500+</span>
              <span class="stat-label">Sessions</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num display-font">12K</span>
              <span class="stat-label">Photos Delivered</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num display-font">4.9★</span>
              <span class="stat-label">Client Rating</span>
            </div>
          </div>
        </div>

        <div class="hero-visual" appReveal="reveal-right">
          <div class="photo-stack">
            <div class="photo-card photo-main comics-border-thick">
              <img src="https://images.pexels.com/photos/16029834/pexels-photo-16029834.jpeg?auto=compress&cs=tinysrgb&h=650&w=500"
                   alt="Photographer in studio" />
              <div class="photo-tag">PRO STUDIO</div>
            </div>
            <div class="photo-card photo-float-1 comics-border anim-float">
              <img src="https://images.pexels.com/photos/23991042/pexels-photo-23991042.jpeg?auto=compress&cs=tinysrgb&h=350&w=280"
                   alt="Fashion shoot" />
            </div>
            <div class="photo-card photo-float-2 comics-border anim-float-slow">
              <img src="https://images.pexels.com/photos/18322558/pexels-photo-18322558.jpeg?auto=compress&cs=tinysrgb&h=350&w=280"
                   alt="Wedding night" />
            </div>
            <div class="starburst-badge anim-pulse">
              <span class="starburst-text display-font">NEW!</span>
            </div>
          </div>
        </div>
      </div>

      <div class="scroll-indicator">
        <span class="scroll-text">Scroll to explore</span>
        <div class="scroll-arrow anim-float">
          <span>↓</span>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 80px;
      background: linear-gradient(135deg, var(--c-primary-100) 0%, var(--c-secondary-100) 50%, var(--c-accent-100) 100%);
    }

    .hero-bg {
      position: absolute;
      inset: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .shape {
      position: absolute;
      border: 3px solid var(--ink);
      border-radius: 20px;
    }

    .shape-1 {
      width: 80px; height: 80px;
      background: var(--c-accent-400);
      top: 15%; left: 5%;
      transform: rotate(-15deg);
    }
    .shape-2 {
      width: 60px; height: 60px;
      background: var(--c-secondary-400);
      top: 60%; left: 8%;
      border-radius: 50%;
    }
    .shape-3 {
      width: 100px; height: 100px;
      background: var(--c-primary-400);
      top: 20%; right: 10%;
      border-radius: 50%;
      opacity: 0.7;
    }
    .shape-4 {
      width: 50px; height: 50px;
      background: var(--c-success-500);
      bottom: 15%; right: 15%;
      transform: rotate(20deg);
      border-radius: 12px;
    }
    .shape-5 {
      width: 70px; height: 70px;
      background: var(--c-warning-500);
      bottom: 25%; left: 20%;
      clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
      border: none;
    }

    .halftone-overlay {
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle, var(--ink) 1px, transparent 1.5px);
      background-size: 24px 24px;
      opacity: 0.03;
    }

    .hero-content {
      position: relative;
      z-index: 2;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--sp-5);
      align-items: center;
      width: 100%;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      background: var(--c-accent-100);
      border: 2px solid var(--ink);
      border-radius: 50px;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: var(--sp-3);
      box-shadow: 3px 3px 0 var(--ink);
    }

    .badge-dot {
      width: 10px; height: 10px;
      background: var(--c-success-500);
      border: 2px solid var(--ink);
      border-radius: 50%;
      animation: pulseScale 1.5s ease-in-out infinite;
    }

    .hero-title {
      font-size: clamp(48px, 8vw, 96px);
      line-height: 0.95;
      margin-bottom: var(--sp-3);
    }

    .title-line {
      display: block;
      color: var(--ink);
      -webkit-text-stroke: 2px var(--ink);
    }

    .title-accent {
      color: var(--c-accent-500);
      -webkit-text-stroke: 2px var(--ink);
      position: relative;
      display: inline-block;
    }

    .title-accent::after {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 0;
      right: 0;
      height: 12px;
      background: var(--c-primary-400);
      z-index: -1;
      transform: skewX(-10deg);
    }

    .hero-subtitle {
      font-size: 18px;
      max-width: 480px;
      color: var(--ink-light);
      margin-bottom: var(--sp-4);
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: var(--sp-2);
      flex-wrap: wrap;
      margin-bottom: var(--sp-5);
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
    }

    .btn-primary:hover {
      transform: translate(-3px, -3px);
      box-shadow: 8px 8px 0 var(--ink);
      background: var(--c-accent-600);
    }

    .btn-primary:active {
      transform: translate(2px, 2px);
      box-shadow: 1px 1px 0 var(--ink);
    }

    .btn-arrow {
      transition: transform 0.3s var(--ease-bounce);
    }

    .btn-primary:hover .btn-arrow {
      transform: translateX(6px);
    }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 28px;
      background: var(--c-secondary-100);
      color: var(--ink);
      font-weight: 700;
      font-size: 16px;
      text-decoration: none;
      border: 3px solid var(--ink);
      border-radius: 14px;
      box-shadow: 5px 5px 0 var(--ink);
      transition: all 0.3s var(--ease-bounce);
    }

    .btn-secondary:hover {
      transform: translate(-3px, -3px);
      box-shadow: 8px 8px 0 var(--ink);
      background: var(--c-secondary-200);
    }

    .hero-stats {
      display: flex;
      align-items: center;
      gap: var(--sp-3);
    }

    .stat {
      display: flex;
      flex-direction: column;
    }

    .stat-num {
      font-size: 36px;
      color: var(--c-accent-600);
      line-height: 1;
    }

    .stat-label {
      font-size: 13px;
      font-weight: 500;
      color: var(--ink-light);
      margin-top: 4px;
    }

    .stat-divider {
      width: 2px;
      height: 40px;
      background: var(--ink);
      opacity: 0.2;
      border-radius: 1px;
    }

    /* Hero Visual */
    .hero-visual {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .photo-stack {
      position: relative;
      width: 100%;
      max-width: 420px;
      height: 480px;
    }

    .photo-card {
      position: absolute;
      overflow: hidden;
      background: var(--n-100);
    }

    .photo-card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    .photo-main {
      width: 320px;
      height: 420px;
      top: 30px;
      left: 50%;
      transform: translateX(-50%) rotate(-3deg);
      z-index: 2;
      transition: transform 0.4s var(--ease-bounce);
    }

    .photo-main:hover {
      transform: translateX(-50%) rotate(0deg) scale(1.03);
    }

    .photo-tag {
      position: absolute;
      bottom: 12px;
      left: 12px;
      padding: 6px 14px;
      background: var(--c-primary-400);
      border: 2px solid var(--ink);
      border-radius: 8px;
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 1px;
      box-shadow: 2px 2px 0 var(--ink);
    }

    .photo-float-1 {
      width: 160px;
      height: 200px;
      top: 0;
      right: 0;
      z-index: 1;
      transform: rotate(8deg);
    }

    .photo-float-2 {
      width: 140px;
      height: 180px;
      bottom: 0;
      left: -10px;
      z-index: 1;
      transform: rotate(-6deg);
    }

    .starburst-badge {
      position: absolute;
      top: -20px;
      right: -10px;
      width: 90px;
      height: 90px;
      background: var(--c-accent-500);
      border: 3px solid var(--ink);
      z-index: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      clip-path: polygon(
        50% 0%, 61% 18%, 83% 12%, 76% 35%, 100% 38%,
        82% 55%, 95% 78%, 70% 74%, 60% 100%, 50% 82%,
        40% 100%, 30% 74%, 5% 78%, 18% 55%, 0% 38%,
        24% 35%, 17% 12%, 39% 18%
      );
    }

    .starburst-text {
      color: white;
      font-size: 18px;
      letter-spacing: 1px;
    }

    /* Scroll indicator */
    .scroll-indicator {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .scroll-text {
      font-size: 12px;
      font-weight: 600;
      color: var(--ink-light);
      opacity: 0.6;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .scroll-arrow {
      width: 36px;
      height: 36px;
      background: var(--c-primary-400);
      border: 2px solid var(--ink);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 2px 2px 0 var(--ink);
    }

    @media (max-width: 900px) {
      .hero-content {
        grid-template-columns: 1fr;
        text-align: center;
        gap: var(--sp-4);
      }

      .hero-text {
        order: 1;
      }

      .hero-visual {
        order: 2;
      }

      .photo-stack {
        height: 360px;
        max-width: 320px;
      }

      .photo-main {
        width: 240px;
        height: 320px;
      }

      .photo-float-1 {
        width: 120px;
        height: 150px;
      }

      .photo-float-2 {
        width: 110px;
        height: 140px;
      }

      .hero-actions {
        justify-content: center;
      }

      .hero-stats {
        justify-content: center;
      }

      .hero-subtitle {
        margin-left: auto;
        margin-right: auto;
      }

      .scroll-indicator {
        display: none;
      }
    }

    @media (max-width: 500px) {
      .hero-stats {
        gap: var(--sp-2);
      }
      .stat-num {
        font-size: 28px;
      }
      .photo-stack {
        height: 280px;
        max-width: 260px;
      }
      .photo-main {
        width: 200px;
        height: 270px;
      }
      .photo-float-1, .photo-float-2 {
        display: none;
      }
    }
  `],
})
export class HeroComponent {}
