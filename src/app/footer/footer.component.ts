import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="#hero" class="logo">
              <span class="logo-icon">📸</span>
              <span class="logo-text display-font">SNAP<span class="logo-accent">STAR</span></span>
            </a>
            <p class="footer-tagline">
              Bold, vibrant, unforgettable photography for every level.
              Capturing your story one frame at a time.
            </p>
            <div class="social-row">
              <a href="#" class="social-btn" aria-label="Instagram">📸</a>
              <a href="#" class="social-btn" aria-label="Facebook">👍</a>
              <a href="#" class="social-btn" aria-label="YouTube">▶</a>
              <a href="#" class="social-btn" aria-label="TikTok">🎵</a>
            </div>
          </div>

          <div class="footer-col">
            <h4 class="footer-heading">Services</h4>
            <ul class="footer-links">
              <li><a href="#services">Basic — Starter Snap</a></li>
              <li><a href="#services">Intermediate — Pro Shoot</a></li>
              <li><a href="#services">Advanced — Cinematic Master</a></li>
              <li><a href="#contact">Custom Quote</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-heading">Explore</h4>
            <ul class="footer-links">
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#testimonials">Reviews</a></li>
              <li><a href="#contact">Book Now</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h4 class="footer-heading">Get in Touch</h4>
            <ul class="footer-links">
              <li>📧 hello&#64;snapstar.photo</li>
              <li>📱 (555) 123-4567</li>
              <li>📍 Downtown Arts District</li>
              <li>⏰ Mon–Sat: 9am–7pm</li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2026 SnapStar Photography. All rights reserved.</p>
          <p class="made-with">Made with 💛 and a camera</p>
        </div>
      </div>

      <!-- Decorative wave -->
      <div class="footer-wave">
        <div class="wave-shape" *ngFor="let i of [1,2,3,4,5,6,7,8,9,10]"></div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--ink);
      color: var(--n-200);
      padding: var(--sp-8) 0 var(--sp-4);
      position: relative;
      overflow: hidden;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: var(--sp-4);
      margin-bottom: var(--sp-5);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      margin-bottom: var(--sp-2);
    }

    .logo-icon {
      font-size: 28px;
    }

    .logo-text {
      font-size: 26px;
      color: white;
      letter-spacing: 2px;
    }

    .logo-accent {
      color: var(--c-accent-400);
    }

    .footer-tagline {
      font-size: 14px;
      line-height: 1.6;
      color: var(--n-400);
      margin-bottom: var(--sp-2);
      max-width: 280px;
    }

    .social-row {
      display: flex;
      gap: 10px;
    }

    .social-btn {
      width: 42px;
      height: 42px;
      background: var(--ink-light);
      border: 2px solid var(--n-600);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      text-decoration: none;
      transition: all 0.3s var(--ease-bounce);
    }

    .social-btn:hover {
      background: var(--c-accent-500);
      border-color: var(--c-accent-400);
      transform: translate(-2px, -2px) rotate(-5deg);
    }

    .footer-heading {
      font-family: var(--font-display);
      font-size: 18px;
      color: var(--c-primary-400);
      letter-spacing: 2px;
      margin-bottom: var(--sp-2);
    }

    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .footer-links a,
    .footer-links li {
      color: var(--n-400);
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s, transform 0.3s;
      cursor: pointer;
    }

    .footer-links a:hover {
      color: var(--c-accent-400);
      transform: translateX(4px);
    }

    .footer-bottom {
      border-top: 2px solid var(--ink-light);
      padding-top: var(--sp-3);
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: var(--n-500);
    }

    .made-with {
      color: var(--n-500);
    }

    .footer-wave {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 8px;
      display: flex;
    }

    .wave-shape {
      flex: 1;
      border-top: 4px solid var(--c-accent-500);
      border-radius: 50% 50% 0 0;
      margin: 0 2px;
      animation: pulseScale 2s ease-in-out infinite;
    }

    .wave-shape:nth-child(odd) {
      border-color: var(--c-primary-500);
      animation-delay: 0.3s;
    }
    .wave-shape:nth-child(3n) {
      border-color: var(--c-secondary-500);
      animation-delay: 0.6s;
    }

    @media (max-width: 900px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
      }

      .footer-brand {
        grid-column: 1 / -1;
      }
    }

    @media (max-width: 500px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }

      .footer-bottom {
        flex-direction: column;
        gap: 8px;
        text-align: center;
      }
    }
  `],
})
export class FooterComponent {}
