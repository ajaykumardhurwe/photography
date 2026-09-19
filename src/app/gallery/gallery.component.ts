import { Component, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../reveal.directive';
import { GALLERY_ITEMS, GALLERY_CATEGORIES, type GalleryItem } from '../data';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="gallery" class="gallery-section section-pad">
      <div class="container">
        <div class="section-header" appReveal>
          <div class="section-tag" style="background: var(--c-accent-100);">GALLERY</div>
          <h2 class="section-title display-font">INSTA MOMENTS</h2>
          <p class="section-desc">
            A peek into our latest work — photos and videos from sessions across
            all service levels. Filter by category and tap any tile to see it full-size.
          </p>
        </div>

        <!-- Instagram profile bar -->
        <div class="ig-profile-bar" appReveal="reveal-pop">
          <div class="ig-avatar">
            <span class="ig-avatar-ring"></span>
            <span class="ig-avatar-emoji">📸</span>
          </div>
          <div class="ig-profile-info">
            <span class="ig-handle">@snapstar.photo</span>
            <div class="ig-stats">
              <span><strong>12</strong> posts</span>
              <span><strong>4.8K</strong> followers</span>
              <span><strong>320</strong> following</span>
            </div>
          </div>
          <a href="#contact" class="ig-follow-btn">
            <span>Follow</span>
          </a>
        </div>

        <!-- Category filters -->
        <div class="filters" appReveal="reveal-pop">
          <button
            *ngFor="let cat of categories"
            class="filter-btn"
            [class.active]="activeCategory() === cat"
            (click)="setCategory(cat)"
          >
            <span class="filter-icon" *ngIf="cat === 'All'">⊞</span>
            <span class="filter-icon" *ngIf="cat === 'Studio'">🎥</span>
            <span class="filter-icon" *ngIf="cat === 'Wedding'">💍</span>
            <span class="filter-icon" *ngIf="cat === 'Street'">🌆</span>
            <span class="filter-icon" *ngIf="cat === 'Nature'">🏔️</span>
            <span class="filter-icon" *ngIf="cat === 'Video'">🎬</span>
            {{ cat }}
            <span class="filter-count" *ngIf="getCount(cat) > 0">{{ getCount(cat) }}</span>
          </button>
        </div>

        <!-- Instagram-style grid -->
        <div class="gallery-grid" appReveal>
          <div
            *ngFor="let item of filteredItems(); let i = index"
            class="gallery-item"
            [class.is-video]="item.type === 'video'"
            [class.featured]="i === 0 && activeCategory() === 'All'"
            (click)="openLightbox(item, i)"
            [style.animation-delay]="(i % 6) * 0.05 + 's'"
          >
            <img [src]="item.thumb" [alt]="item.caption" loading="lazy" />

            <!-- Video badge -->
            <div class="video-badge" *ngIf="item.type === 'video'">
              <span class="play-icon">▶</span>
            </div>

            <!-- Instagram-style top bar -->
            <div class="ig-top-bar">
              <span class="ig-cat-tag" [style.background]="getCategoryColor(item.category)">
                {{ item.category }}
              </span>
            </div>

            <!-- Overlay -->
            <div class="gallery-overlay">
              <div class="overlay-content">
                <p class="overlay-caption">{{ item.caption }}</p>
                <div class="overlay-stats">
                  <span class="stat-pill heart-pill">
                    <span class="heart-icon">❤</span>
                    {{ formatCount(item.likes) }}
                  </span>
                  <span class="stat-pill">
                    <span>💬</span>
                    {{ item.comments }}
                  </span>
                </div>
                <div class="view-hint">Tap to view →</div>
              </div>
            </div>

            <!-- Corner accent -->
            <div class="corner-accent" [style.background]="getCategoryColor(item.category)"></div>
          </div>
        </div>

        <!-- Empty state -->
        <div class="empty-state" *ngIf="filteredItems().length === 0">
          <span class="empty-icon">🔍</span>
          <p>No posts in this category yet. Check back soon!</p>
        </div>

        <!-- Load more hint -->
        <div class="gallery-footer" appReveal>
          <a href="#contact" class="instagram-cta">
            <span class="ig-icon anim-heart-beat">📸</span>
            <span>Book your session — your photos could be here next!</span>
            <span class="cta-arrow">→</span>
          </a>
        </div>
      </div>

      <!-- Lightbox -->
      <div class="lightbox" [class.open]="lightboxItem() !== null" (click)="closeLightbox()">
        <button class="lightbox-close" (click)="closeLightbox()" aria-label="Close">✕</button>

        <button
          class="lightbox-nav lightbox-prev"
          (click)="prevItem($event)"
          [class.disabled]="!canGoPrev()"
          aria-label="Previous"
        >‹</button>

        <div class="lightbox-content" *ngIf="lightboxItem() as item" (click)="$event.stopPropagation()">
          <div class="lightbox-image-wrap">
            <img [src]="item.url" [alt]="item.caption" />
            <div class="video-indicator" *ngIf="item.type === 'video'">
              <span class="play-large">▶</span>
            </div>
          </div>
          <div class="lightbox-info">
            <div class="lightbox-info-top">
              <div class="lightbox-avatar">📸</div>
              <div class="lightbox-author">
                <span class="lightbox-handle">@snapstar.photo</span>
                <span class="lightbox-cat" [style.background]="getCategoryColor(item.category)">{{ item.category }}</span>
              </div>
            </div>
            <p class="lightbox-caption">{{ item.caption }}</p>
            <div class="lightbox-stats">
              <span class="lb-stat">
                <span class="heart-icon">❤</span>
                {{ formatCount(item.likes) }} likes
              </span>
              <span class="lb-stat">
                <span>💬</span>
                {{ item.comments }} comments
              </span>
            </div>
            <div class="lightbox-counter">
              {{ lightboxIndex() + 1 }} / {{ filteredItems().length }}
            </div>
          </div>
        </div>

        <button
          class="lightbox-nav lightbox-next"
          (click)="nextItem($event)"
          [class.disabled]="!canGoNext()"
          aria-label="Next"
        >›</button>
      </div>
    </section>
  `,
  styles: [`
    .gallery-section {
      background: linear-gradient(180deg, var(--n-50) 0%, var(--c-secondary-50) 100%);
      position: relative;
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

    /* Instagram profile bar */
    .ig-profile-bar {
      display: flex;
      align-items: center;
      gap: var(--sp-3);
      padding: var(--sp-3);
      margin-bottom: var(--sp-4);
      background: var(--n-50);
      border: 3px solid var(--ink);
      border-radius: 20px;
      box-shadow: var(--shadow-comic);
    }

    .ig-avatar {
      position: relative;
      width: 80px;
      height: 80px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ig-avatar-ring {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      background: conic-gradient(
        from 0deg,
        var(--c-accent-500),
        var(--c-primary-500),
        var(--c-secondary-500),
        var(--c-accent-500)
      );
      animation: spinSlow 8s linear infinite;
    }

    .ig-avatar-ring::after {
      content: '';
      position: absolute;
      inset: 4px;
      border-radius: 50%;
      background: var(--n-50);
    }

    .ig-avatar-emoji {
      position: relative;
      z-index: 1;
      font-size: 36px;
    }

    .ig-profile-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .ig-handle {
      font-size: 18px;
      font-weight: 700;
      color: var(--ink);
    }

    .ig-stats {
      display: flex;
      gap: var(--sp-3);
      font-size: 14px;
      color: var(--ink-light);
    }

    .ig-stats strong {
      color: var(--ink);
      font-weight: 700;
    }

    .ig-follow-btn {
      padding: 10px 28px;
      background: var(--c-accent-500);
      color: white;
      font-weight: 700;
      font-size: 15px;
      text-decoration: none;
      border: 3px solid var(--ink);
      border-radius: 12px;
      box-shadow: 4px 4px 0 var(--ink);
      transition: all 0.3s var(--ease-bounce);
      flex-shrink: 0;
    }

    .ig-follow-btn:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0 var(--ink);
      background: var(--c-accent-600);
    }

    /* Filters */
    .filters {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
      margin-bottom: var(--sp-5);
    }

    .filter-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 10px 20px;
      background: var(--n-50);
      border: 2px solid var(--ink);
      border-radius: 50px;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s var(--ease-bounce);
      box-shadow: 3px 3px 0 var(--ink);
      font-family: var(--font-body);
      color: var(--ink);
    }

    .filter-btn:hover {
      transform: translate(-2px, -2px);
      box-shadow: 5px 5px 0 var(--ink);
      background: var(--c-primary-100);
    }

    .filter-btn.active {
      background: var(--c-accent-500);
      color: white;
      transform: translate(-2px, -2px);
      box-shadow: 5px 5px 0 var(--ink);
    }

    .filter-icon {
      font-size: 16px;
    }

    .filter-count {
      background: rgba(0,0,0,0.15);
      padding: 1px 8px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 700;
    }

    .filter-btn.active .filter-count {
      background: rgba(255,255,255,0.3);
    }

    /* Grid */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }

    .gallery-item {
      position: relative;
      aspect-ratio: 1;
      border: 3px solid var(--ink);
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 4px 4px 0 var(--ink);
      transition: all 0.4s var(--ease-bounce);
      background: var(--n-200);
    }

    .gallery-item:hover {
      transform: translate(-4px, -4px) rotate(-1.5deg);
      box-shadow: 8px 8px 0 var(--ink);
      z-index: 5;
    }

    .gallery-item.featured {
      grid-column: span 2;
      grid-row: span 2;
      aspect-ratio: 1;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.5s var(--ease-smooth), filter 0.4s ease;
      filter: saturate(1.1);
    }

    .gallery-item:hover img {
      transform: scale(1.12);
      filter: saturate(1.3) brightness(1.05);
    }

    .video-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 36px;
      height: 36px;
      background: var(--c-accent-500);
      border: 2px solid var(--ink);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 2px 2px 0 var(--ink);
      z-index: 3;
      transition: transform 0.3s var(--ease-bounce);
    }

    .gallery-item:hover .video-badge {
      transform: scale(1.15) rotate(10deg);
    }

    .play-icon {
      color: white;
      font-size: 14px;
      margin-left: 2px;
    }

    .ig-top-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 8px 10px;
      z-index: 2;
      display: flex;
      justify-content: flex-start;
      background: linear-gradient(to bottom, rgba(26,26,46,0.5), transparent);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .gallery-item:hover .ig-top-bar {
      opacity: 1;
    }

    .ig-cat-tag {
      padding: 3px 10px;
      border: 1.5px solid var(--ink);
      border-radius: 50px;
      font-size: 11px;
      font-weight: 700;
      color: white;
      letter-spacing: 1px;
      box-shadow: 1px 1px 0 var(--ink);
    }

    .gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(26,26,46,0.92) 0%, rgba(26,26,46,0.4) 50%, transparent 100%);
      display: flex;
      align-items: flex-end;
      opacity: 0;
      transition: opacity 0.35s var(--ease-smooth);
    }

    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }

    .overlay-content {
      padding: 16px;
      width: 100%;
      transform: translateY(20px);
      transition: transform 0.4s var(--ease-bounce);
    }

    .gallery-item:hover .overlay-content {
      transform: translateY(0);
    }

    .overlay-caption {
      color: white;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 8px;
      line-height: 1.4;
    }

    .overlay-stats {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }

    .stat-pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 10px;
      background: rgba(255,255,255,0.2);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50px;
      font-size: 12px;
      color: white;
      font-weight: 600;
    }

    .heart-pill .heart-icon {
      color: var(--c-accent-400);
      font-size: 14px;
    }

    .view-hint {
      font-size: 11px;
      color: rgba(255,255,255,0.7);
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    .corner-accent {
      position: absolute;
      top: 0;
      left: 0;
      width: 24px;
      height: 24px;
      border-bottom: 3px solid var(--ink);
      border-right: 3px solid var(--ink);
      border-bottom-right-radius: 12px;
      z-index: 2;
      opacity: 0.85;
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: var(--sp-6);
      color: var(--ink-light);
    }

    .empty-icon {
      font-size: 48px;
      display: block;
      margin-bottom: var(--sp-2);
    }

    /* Gallery footer */
    .gallery-footer {
      text-align: center;
      margin-top: var(--sp-5);
    }

    .instagram-cta {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      background: var(--c-secondary-100);
      border: 3px solid var(--ink);
      border-radius: 16px;
      box-shadow: 5px 5px 0 var(--ink);
      text-decoration: none;
      color: var(--ink);
      font-weight: 700;
      font-size: 16px;
      transition: all 0.3s var(--ease-bounce);
    }

    .instagram-cta:hover {
      transform: translate(-3px, -3px);
      box-shadow: 8px 8px 0 var(--ink);
      background: var(--c-secondary-200);
    }

    .instagram-cta:hover .cta-arrow {
      transform: translateX(6px);
    }

    .cta-arrow {
      transition: transform 0.3s var(--ease-bounce);
    }

    .ig-icon {
      font-size: 22px;
    }

    /* Lightbox */
    .lightbox {
      position: fixed;
      inset: 0;
      background: rgba(26,26,46,0.94);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s var(--ease-smooth);
      padding: var(--sp-3);
      backdrop-filter: blur(4px);
    }

    .lightbox.open {
      opacity: 1;
      pointer-events: auto;
    }

    .lightbox-close {
      position: absolute;
      top: 24px;
      right: 24px;
      width: 48px;
      height: 48px;
      background: var(--c-accent-500);
      border: 3px solid white;
      border-radius: 50%;
      color: white;
      font-size: 20px;
      cursor: pointer;
      box-shadow: 3px 3px 0 var(--ink);
      transition: transform 0.3s var(--ease-bounce);
      z-index: 10;
    }

    .lightbox-close:hover {
      transform: rotate(90deg) scale(1.15);
    }

    .lightbox-nav {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 52px;
      height: 52px;
      background: var(--c-primary-400);
      border: 3px solid var(--ink);
      border-radius: 50%;
      color: var(--ink);
      font-size: 28px;
      font-weight: 700;
      cursor: pointer;
      box-shadow: 3px 3px 0 var(--ink);
      transition: all 0.3s var(--ease-bounce);
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
    }

    .lightbox-prev { left: 24px; }
    .lightbox-next { right: 24px; }

    .lightbox-nav:hover:not(.disabled) {
      transform: translateY(-50%) scale(1.15);
      background: var(--c-primary-500);
    }

    .lightbox-nav.disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .lightbox-content {
      max-width: 600px;
      width: 100%;
      background: var(--n-50);
      border: 4px solid var(--ink);
      border-radius: 20px;
      box-shadow: 10px 10px 0 var(--ink);
      overflow: hidden;
      animation: bounceIn 0.5s var(--ease-bounce);
    }

    .lightbox-image-wrap {
      position: relative;
    }

    .lightbox-content img {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
      display: block;
    }

    .video-indicator {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 64px;
      height: 64px;
      background: var(--c-accent-500);
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 4px 4px 0 var(--ink);
      animation: pulseScale 2s ease-in-out infinite;
    }

    .play-large {
      color: white;
      font-size: 24px;
      margin-left: 4px;
    }

    .lightbox-info {
      padding: var(--sp-3);
    }

    .lightbox-info-top {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }

    .lightbox-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--c-accent-400), var(--c-primary-400));
      border: 2px solid var(--ink);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      box-shadow: 2px 2px 0 var(--ink);
    }

    .lightbox-author {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .lightbox-handle {
      font-weight: 700;
      font-size: 15px;
      color: var(--ink);
    }

    .lightbox-cat {
      padding: 2px 10px;
      border: 2px solid var(--ink);
      border-radius: 50px;
      font-size: 11px;
      font-weight: 700;
      color: white;
      letter-spacing: 1px;
    }

    .lightbox-caption {
      font-size: 16px;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 10px;
      line-height: 1.5;
    }

    .lightbox-stats {
      display: flex;
      gap: var(--sp-2);
      font-size: 14px;
      color: var(--ink-light);
      font-weight: 500;
      margin-bottom: 8px;
    }

    .lb-stat {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .lb-stat .heart-icon {
      color: var(--c-accent-500);
    }

    .lightbox-counter {
      font-size: 12px;
      color: var(--n-500);
      font-weight: 600;
      letter-spacing: 1px;
    }

    @media (max-width: 900px) {
      .gallery-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }

      .ig-profile-bar {
        flex-wrap: wrap;
        gap: var(--sp-2);
      }

      .ig-stats {
        font-size: 13px;
        gap: var(--sp-2);
      }
    }

    @media (max-width: 600px) {
      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
      }

      .gallery-item.featured {
        grid-column: span 2;
        grid-row: span 1;
      }

      .overlay-caption {
        font-size: 11px;
      }

      .stat-pill {
        font-size: 10px;
        padding: 2px 8px;
      }

      .filters {
        gap: 6px;
      }

      .filter-btn {
        padding: 8px 14px;
        font-size: 13px;
      }

      .lightbox-nav {
        width: 40px;
        height: 40px;
        font-size: 22px;
      }

      .lightbox-prev { left: 8px; }
      .lightbox-next { right: 8px; }

      .ig-profile-bar {
        padding: var(--sp-2);
      }

      .ig-avatar {
        width: 60px;
        height: 60px;
      }

      .ig-avatar-emoji {
        font-size: 28px;
      }
    }
  `],
})
export class GalleryComponent {
  items = GALLERY_ITEMS;
  categories = GALLERY_CATEGORIES;
  activeCategory = signal('All');
  lightboxItem = signal<GalleryItem | null>(null);
  lightboxIndex = signal(0);

  filteredItems = computed(() => {
    const cat = this.activeCategory();
    if (cat === 'All') return this.items;
    if (cat === 'Video') return this.items.filter((i) => i.type === 'video');
    return this.items.filter((i) => i.category === cat);
  });

  setCategory(cat: string): void {
    this.activeCategory.set(cat);
  }

  getCount(cat: string): number {
    if (cat === 'All') return this.items.length;
    if (cat === 'Video') return this.items.filter((i) => i.type === 'video').length;
    return this.items.filter((i) => i.category === cat).length;
  }

  getCategoryColor(cat: string): string {
    const colors: Record<string, string> = {
      Studio: 'var(--c-secondary-500)',
      Wedding: 'var(--c-accent-500)',
      Street: 'var(--c-warning-600)',
      Nature: 'var(--c-success-600)',
      Video: 'var(--c-primary-600)',
    };
    return colors[cat] ?? 'var(--c-primary-500)';
  }

  formatCount(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  openLightbox(item: GalleryItem, index: number): void {
    this.lightboxItem.set(item);
    this.lightboxIndex.set(index);
  }

  closeLightbox(): void {
    this.lightboxItem.set(null);
  }

  canGoPrev(): boolean {
    return this.lightboxIndex() > 0;
  }

  canGoNext(): boolean {
    return this.lightboxIndex() < this.filteredItems().length - 1;
  }

  prevItem(event: Event): void {
    event.stopPropagation();
    const idx = this.lightboxIndex();
    if (idx > 0) {
      this.lightboxIndex.set(idx - 1);
      this.lightboxItem.set(this.filteredItems()[idx - 1]);
    }
  }

  nextItem(event: Event): void {
    event.stopPropagation();
    const idx = this.lightboxIndex();
    const items = this.filteredItems();
    if (idx < items.length - 1) {
      this.lightboxIndex.set(idx + 1);
      this.lightboxItem.set(items[idx + 1]);
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.lightboxItem() === null) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowLeft' && this.canGoPrev()) {
      this.lightboxIndex.set(this.lightboxIndex() - 1);
      this.lightboxItem.set(this.filteredItems()[this.lightboxIndex()]);
    }
    if (event.key === 'ArrowRight' && this.canGoNext()) {
      this.lightboxIndex.set(this.lightboxIndex() + 1);
      this.lightboxItem.set(this.filteredItems()[this.lightboxIndex()]);
    }
  }
}
