import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevealDirective } from '../reveal.directive';
import { SERVICES } from '../data';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, RevealDirective],
  template: `
    <section id="contact" class="contact-section section-pad">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info" appReveal="reveal-left">
            <div class="section-tag" style="background: var(--c-accent-100);">BOOK NOW</div>
            <h2 class="contact-title display-font">LET'S CREATE MAGIC</h2>
            <p class="contact-desc">
              Ready to capture your story? Fill out the form and we'll get back
              to you within 24 hours with availability and next steps.
            </p>

            <div class="contact-methods stagger" appReveal>
              <div class="contact-method">
                <div class="method-icon" style="background: var(--c-accent-400);">📧</div>
                <div class="method-info">
                  <span class="method-label">Email</span>
                  <span class="method-value">hello&#64;snapstar.photo</span>
                </div>
              </div>
              <div class="contact-method">
                <div class="method-icon" style="background: var(--c-secondary-400);">📱</div>
                <div class="method-info">
                  <span class="method-label">Phone</span>
                  <span class="method-value">(555) 123-4567</span>
                </div>
              </div>
              <div class="contact-method">
                <div class="method-icon" style="background: var(--c-primary-400);">📍</div>
                <div class="method-info">
                  <span class="method-label">Studio</span>
                  <span class="method-value">Downtown Arts District</span>
                </div>
              </div>
            </div>

            <div class="social-row" appReveal="reveal-pop">
              <a href="#" class="social-btn" aria-label="Instagram">📸</a>
              <a href="#" class="social-btn" aria-label="Facebook">👍</a>
              <a href="#" class="social-btn" aria-label="YouTube">▶</a>
              <a href="#" class="social-btn" aria-label="TikTok">🎵</a>
            </div>
          </div>

          <div class="contact-form-wrap" appReveal="reveal-right">
            <form class="contact-form comics-border-thick" (ngSubmit)="submitForm()" #form="ngForm">
              <div class="form-group">
                <label for="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  [(ngModel)]="formData.name"
                  required
                  placeholder="Jane Doe"
                  class="form-input"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    [(ngModel)]="formData.email"
                    required
                    placeholder="jane@email.com"
                    class="form-input"
                  />
                </div>
                <div class="form-group">
                  <label for="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    [(ngModel)]="formData.phone"
                    placeholder="(555) 000-0000"
                    class="form-input"
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="service">Service Level</label>
                <select id="service" name="service" [(ngModel)]="formData.service" required class="form-input form-select">
                  <option value="">Select a package...</option>
                  <option *ngFor="let s of services" [value]="s.level">
                    {{ s.level }} — {{ s.name }} ({{ s.price }})
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="date">Preferred Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  [(ngModel)]="formData.date"
                  class="form-input"
                />
              </div>

              <div class="form-group">
                <label for="message">Tell us about your vision</label>
                <textarea
                  id="message"
                  name="message"
                  [(ngModel)]="formData.message"
                  rows="4"
                  placeholder="What kind of session are you looking for?"
                  class="form-input form-textarea"
                ></textarea>
              </div>

              <button
                type="submit"
                class="submit-btn"
                [disabled]="!form.valid"
              >
                <span *ngIf="!submitting()">Send Booking Request 🚀</span>
                <span *ngIf="submitting()">Sending...</span>
              </button>

              <div class="form-success" *ngIf="submitted()">
                <div class="success-icon anim-pulse">✓</div>
                <p>Thanks! We'll be in touch within 24 hours.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .contact-section {
      background: linear-gradient(135deg, var(--c-primary-100) 0%, var(--c-accent-100) 100%);
      position: relative;
      overflow: hidden;
    }

    .contact-grid {
      display: grid;
      grid-template-columns: 1fr 1.3fr;
      gap: var(--sp-5);
      align-items: start;
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

    .contact-title {
      font-size: clamp(32px, 5vw, 52px);
      color: var(--ink);
      margin-bottom: var(--sp-2);
      -webkit-text-stroke: 1px var(--ink);
    }

    .contact-desc {
      font-size: 16px;
      color: var(--ink-light);
      line-height: 1.7;
      margin-bottom: var(--sp-4);
    }

    .contact-methods {
      display: flex;
      flex-direction: column;
      gap: var(--sp-2);
      margin-bottom: var(--sp-4);
    }

    .contact-method {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 16px;
      background: var(--n-50);
      border: 2px solid var(--ink);
      border-radius: 14px;
      box-shadow: 3px 3px 0 var(--ink);
      transition: all 0.3s var(--ease-bounce);
    }

    .contact-method:hover {
      transform: translate(-2px, -2px);
      box-shadow: 5px 5px 0 var(--ink);
    }

    .method-icon {
      width: 44px;
      height: 44px;
      border: 2px solid var(--ink);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      box-shadow: 2px 2px 0 var(--ink);
      flex-shrink: 0;
    }

    .method-info {
      display: flex;
      flex-direction: column;
    }

    .method-label {
      font-size: 12px;
      font-weight: 600;
      color: var(--ink-light);
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .method-value {
      font-size: 15px;
      font-weight: 700;
      color: var(--ink);
    }

    .social-row {
      display: flex;
      gap: 12px;
    }

    .social-btn {
      width: 48px;
      height: 48px;
      background: var(--n-50);
      border: 3px solid var(--ink);
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      text-decoration: none;
      box-shadow: 3px 3px 0 var(--ink);
      transition: all 0.3s var(--ease-bounce);
    }

    .social-btn:hover {
      transform: translate(-2px, -2px) rotate(-5deg);
      box-shadow: 5px 5px 0 var(--ink);
      background: var(--c-primary-100);
    }

    /* Form */
    .contact-form {
      background: var(--n-50);
      padding: var(--sp-4);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }

    label {
      font-weight: 600;
      font-size: 14px;
      color: var(--ink);
    }

    .form-input {
      padding: 12px 14px;
      border: 2px solid var(--ink);
      border-radius: 10px;
      font-size: 15px;
      font-family: var(--font-body);
      background: var(--n-50);
      color: var(--ink);
      box-shadow: 2px 2px 0 var(--ink);
      transition: all 0.3s var(--ease-bounce);
      outline: none;
    }

    .form-input:focus {
      border-color: var(--c-accent-500);
      box-shadow: 3px 3px 0 var(--ink);
      transform: translate(-1px, -1px);
    }

    .form-input::placeholder {
      color: var(--n-400);
    }

    .form-select {
      cursor: pointer;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%231a1a2e' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
      padding-right: 36px;
    }

    .form-textarea {
      resize: vertical;
      min-height: 80px;
    }

    .submit-btn {
      padding: 16px 28px;
      background: var(--c-accent-500);
      color: white;
      font-weight: 700;
      font-size: 17px;
      border: 3px solid var(--ink);
      border-radius: 14px;
      box-shadow: 5px 5px 0 var(--ink);
      cursor: pointer;
      transition: all 0.3s var(--ease-bounce);
      font-family: var(--font-body);
    }

    .submit-btn:hover:not(:disabled) {
      transform: translate(-3px, -3px);
      box-shadow: 8px 8px 0 var(--ink);
      background: var(--c-accent-600);
    }

    .submit-btn:active:not(:disabled) {
      transform: translate(2px, 2px);
      box-shadow: 1px 1px 0 var(--ink);
    }

    .submit-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .form-success {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: var(--c-success-500);
      border: 3px solid var(--ink);
      border-radius: 12px;
      box-shadow: 3px 3px 0 var(--ink);
      color: white;
      font-weight: 600;
      animation: popIn 0.4s var(--ease-bounce);
    }

    .success-icon {
      width: 36px;
      height: 36px;
      background: white;
      color: var(--c-success-600);
      border: 2px solid var(--ink);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 18px;
    }

    @media (max-width: 900px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
    }

    @media (max-width: 500px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class ContactComponent {
  services = SERVICES;
  submitting = signal(false);
  submitted = signal(false);

  formData = {
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    message: '',
  };

  submitForm(): void {
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
      this.formData = {
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        message: '',
      };
      setTimeout(() => this.submitted.set(false), 5000);
    }, 1200);
  }
}
