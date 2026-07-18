import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RecipeItem {
  name: string; category: string; price: number; margin: number;
  image?: string;
  ingredients: { name: string; qty: string }[];
}

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page page-fade">
      <div class="page-head">
        <div>
          <div class="eyebrow">Recipes</div>
          <h1>Recipes & Formulas</h1>
        </div>
        <button class="btn btn-primary">+ New Recipe</button>
      </div>

      <div class="grid two-col">
        <div class="card" *ngFor="let r of recipes">
          <div class="card-img-row">
            <div class="thumb">
              <img *ngIf="r.image" [src]="r.image" [alt]="r.name" />
              <svg *ngIf="!r.image" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="thumb-ph"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
            </div>
            <div class="card-title-area">
              <h3>{{ r.name }}</h3>
              <span class="cat-tag">{{ r.category }}</span>
            </div>
            <span class="price-badge">MAD {{ r.price }}</span>
          </div>
          <div class="recipe-meta">{{ r.margin }}% margin</div>
          <div class="ingredients-list">
            <div class="ing-item" *ngFor="let i of r.ingredients">
              <span>{{ i.name }}</span>
              <span class="qty">{{ i.qty }}</span>
            </div>
          </div>
          <div class="recipe-actions">
            <button class="text-btn">Edit</button>
            <button class="text-btn danger">Deactivate</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .page { display:flex; flex-direction:column; gap:1.25rem; }
    .page-head { display:flex; justify-content:space-between; align-items:center; }
    .page-head h1 { margin:0; font-size:1.5rem; color:var(--text-primary); }
    .eyebrow { text-transform:uppercase; letter-spacing:.18em; font-size:.75rem; color:#8fb4ff; margin-bottom:.2rem; }
    .btn { border:none; border-radius:.85rem; padding:.65rem 1.1rem; font-weight:600; cursor:pointer; font-size:.88rem; transition:transform .12s; }
    .btn:active { transform:scale(.97); }
    .btn-primary { background:linear-gradient(135deg,#7c8dff,#52c6ff); color:white; }
    .grid { display:grid; gap:1rem; }
    .two-col { grid-template-columns:repeat(2, minmax(0,1fr)); }
    .card { background:var(--bg-card); border-radius:1.2rem; padding:1.25rem; box-shadow:var(--shadow-card); }
    .card-img-row { display:flex; align-items:center; gap:.75rem; margin-bottom:.4rem; }
    .thumb { width:44px; height:44px; min-width:44px; border-radius:.6rem; background:var(--bg-hover); display:grid; place-items:center; overflow:hidden; }
    .thumb img { width:100%; height:100%; object-fit:cover; }
    .thumb-ph { width:22px; height:22px; color:var(--text-light); }
    .card-title-area { flex:1; min-width:0; }
    .card-title-area h3 { margin:0; font-size:1rem; color:var(--text-primary); }
    .cat-tag { font-size:.7rem; padding:.15rem .5rem; border-radius:999px; background:var(--bg-hover); color:var(--text-muted); font-weight:600; }
    .price-badge { background:#eef4ff; color:#4756c8; padding:.25rem .65rem; border-radius:999px; font-size:.78rem; font-weight:700; white-space:nowrap; }
    .recipe-meta { font-size:.82rem; color:var(--text-muted); margin-bottom:.75rem; }
    .ingredients-list { display:flex; flex-direction:column; gap:.35rem; margin-bottom:.75rem; }
    .ing-item { display:flex; justify-content:space-between; font-size:.85rem; padding:.4rem .6rem; background:var(--bg-hover); border-radius:.5rem; color:var(--text-primary); }
    .qty { color:var(--text-muted); font-weight:500; }
    .recipe-actions { display:flex; gap:.75rem; }
    .text-btn { background:none; border:none; color:#4756c8; cursor:pointer; font-weight:600; font-size:.82rem; padding:.3rem; }
    .text-btn.danger { color:#dc2626; }
    @media (max-width: 900px) { .two-col { grid-template-columns:1fr; } }
  `]
})
export class RecipesComponent {
  recipes: RecipeItem[] = [
    { name: 'Sourdough Loaf', category: 'Bakery', price: 38, margin: 64, image: 'https://picsum.photos/seed/sourdough/100/100', ingredients: [{ name: 'Flour', qty: '500g' }, { name: 'Water', qty: '300ml' }, { name: 'Salt', qty: '10g' }, { name: 'Yeast', qty: '5g' }] },
    { name: 'Cinnamon Bun', category: 'Pastry', price: 24, margin: 58, ingredients: [{ name: 'Flour', qty: '250g' }, { name: 'Butter', qty: '100g' }, { name: 'Sugar', qty: '80g' }, { name: 'Cinnamon', qty: '15g' }] },
    { name: 'Flat White', category: 'Coffee', price: 32, margin: 71, image: 'https://picsum.photos/seed/flatwhite/100/100', ingredients: [{ name: 'Coffee Beans', qty: '18g' }, { name: 'Milk', qty: '200ml' }] },
    { name: 'Chocolate Croissant', category: 'Pastry', price: 28, margin: 62, ingredients: [{ name: 'Flour', qty: '200g' }, { name: 'Butter', qty: '120g' }, { name: 'Chocolate', qty: '50g' }] }
  ];
}
