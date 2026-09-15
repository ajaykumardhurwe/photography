import { Component, signal, computed } from '@angular/core';
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

        <!-- Category filters -->
        <div class="filters" appReveal="reveal-pop">
          <button
            *ngFor="let cat of categories"
            class="filter-btn"
            [class.active]="activeCategory() === cat"
            (click)="setCategory(cat)"
          >
            {{ cat }}
            <span class="filter-count" *ngIf="getCount(cat) > 0">{{ getCount(cat) }}</span>
          </button>
        </div>

        <!-- Instagram-style grid -->
        <div class="gallery-grid stagger" appReveal>
          <div
            *ngFor="let item of filteredItems(); let i = index"
            class="gallery-item"
            [class.is-video]="item.type === 'video'"
            (click)="openLightbox(item)"
            [style.animation-delay]="(i % 6) * 0.05 + 's'"
          >
            <img [src]="item.thumb" [alt]="item.caption" loading="lazy" />

            <!-- Video badge -->
            <div class="video-badge" *ngIf="item.type === 'video'">
              <span class="play-icon">▶</span>
            </div>

            <!-- Overlay -->
            <div class="gallery-overlay">
              <div class="overlay-content">
                <p class="overlay-caption">{{ item.caption }}</p>
                <div class="overlay-stats">
                  <span class="stat-pill">
                    <span>❤</span> {{ formatCount(item.likes) }}
                  </span>
                  <span class="stat-pill">
                    <span>💬</span> {{ item.comments }}
                  </span>
                </div>
                <div class="overlay-category">{{ item.category }}</div>
              </div>
            </div>

            <!-- Corner accent -->
            <div class="corner-accent" [style.background]="getCategoryColor(item.category)"></div>
          </div>
        </div>

        <!-- Load more hint -->
        <div class="gallery-footer" appReveal>
          <a href="#contact" class="instagram-cta">
            <span class="ig-icon">📸</span>
            <span>Book your session — your photos could be here next!</span>
          </a>
        </div>
      </div>

      <!-- Lightbox -->
      <div class="lightbox" [class.open]="lightboxItem() !== null" (click)="closeLightbox()">
        <button class="lightbox-close" (click)="closeLightbox()">✕</button>
        <div class="lightbox-content" *ngIf="lightboxItem() as item" (click)="$event.stopPropagation()">
          <img [src]="item.url" [alt]="item.caption" />
          <div class="lightbox-info">
            <div class="lightbox-cat" [style.background]="getCategoryColor(item.category)">{{ item.category }}</div>
            <p class="lightbox-caption">{{ item.caption }}</p>
            <div class="lightbox-stats">
              <span>❤ {{ formatCount(item.likes) }} likes</span>
              <span>💬 {{ item.comments }} comments</span>
            </div>
          </div>
        </div>
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
      transition: all 0.3s var(--ease-bounce);
      background: var(--n-200);
    }

    .gallery-item:hover {
      transform: translate(-3px, -3px) rotate(-1deg);
      box-shadow: 7px 7px 0 var(--ink);
      z-index: 5;
    }

    .gallery-item img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s var(--ease-smooth);
    }

    .gallery-item:hover img {
      transform: scale(1.1);
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
      z-index: 2;
    }

    .play-icon {
      color: white;
      font-size: 14px;
      margin-left: 2px;
    }

    .gallery-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(26,26,46,0.9) 0%, rgba(26,26,46,0.3) 60%, transparent 100%);
      display: flex;
      align-items: flex-end;
      opacity: 0;
      transition: opacity 0.3s var(--ease-smooth);
    }

    .gallery-item:hover .gallery-overlay {
      opacity: 1;
    }

    .overlay-content {
      padding: 16px;
      width: 100%;
      transform: translateY(20px);
      transition: transform 0.3s var(--ease-bounce);
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
      margin-bottom: 6px;
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

    .overlay-category {
      display: inline-block;
      padding: 2px 10px;
      background: var(--c-primary-400);
      border: 1px solid var(--ink);
      border-radius: 50px;
      font-size: 11px;
      font-weight: 700;
      color: var(--ink);
      letter-spacing: 1px;
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
      opacity: 0.8;
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

    .ig-icon {
      font-size: 22px;
      animation: wobble 1.5s ease-in-out infinite;
    }

    /* Lightbox */
    .lightbox {
      position: fixed;
      inset: 0;
      background: rgba(26,26,46,0.92);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s var(--ease-smooth);
      padding: var(--sp-3);
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
    }

    .lightbox-close:hover {
      transform: rotate(90deg) scale(1.1);
    }

    .lightbox-content {
      max-width: 600px;
      width: 100%;
      background: var(--n-50);
      border: 4px solid var(--ink);
      border-radius: 20px;
      box-shadow: 10px 10px 0 var(--ink);
      overflow: hidden;
      animation: popIn 0.4s var(--ease-bounce);
    }

    .lightbox-content img {
      width: 100%;
      max-height: 500px;
      object-fit: cover;
      display: block;
    }

    .lightbox-info {
      padding: var(--sp-3);
    }

    .lightbox-cat {
      display: inline-block;
      padding: 4px 14px;
      border: 2px solid var(--ink);
      border-radius: 50px;
      font-size: 12px;
      font-weight: 700;
      color: white;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }

    .lightbox-caption {
      font-size: 16px;
      font-weight: 600;
      color: var(--ink);
      margin-bottom: 8px;
    }

    .lightbox-stats {
      display: flex;
      gap: var(--sp-2);
      font-size: 14px;
      color: var(--ink-light);
      font-weight: 500;
    }

    @media (max-width: 900px) {
      .gallery-grid {
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
      }
    }

    @media (max-width: 600px) {
      .gallery-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
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
    }
  `],
})
export class GalleryComponent {
  items = GALLERY_ITEMS;
  categories = GALLERY_CATEGORIES;
  activeCategory = signal('All');
  lightboxItem = signal<GalleryItem | null>(null);

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
      Studio: 'var(--c-secondary-400)',
      Wedding: 'var(--c-accent-400)',
      Street: 'var(--c-warning-500)',
      Nature: 'var(--c-success-500)',
      Video: 'var(--c-primary-500)',
    };
    return colors[cat] ?? 'var(--c-primary-500)';
  }

  formatCount(n: number): string {
    if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  openLightbox(item: GalleryItem): void {
    this.lightboxItem.set(item);
  }

  closeLightbox(): void {
    this.lightboxItem.set(null);
  }
}
