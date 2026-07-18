import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppStateService } from '../../../shared/services/app-state.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="shell">
      <header class="topbar">
        <div class="brand">Quantify</div>
        <nav>
          <a href="#features">Features</a>
          <a href="#benefits">Benefits</a>
          <a href="#faq">FAQ</a>
          <a routerLink="/login" class="btn btn-primary">Login</a>
        </nav>
      </header>

      <main class="hero">
        <div class="hero-copy">
          <span class="pill">Inventory • Procurement • Sales • Analytics</span>
          <h1>Run your bakery or café with clarity.</h1>
          <p>Quantify brings stock, recipes, orders, and team activity into one elegant workspace built for modern hospitality businesses.</p>
          <div class="hero-actions">
            <a routerLink="/login" class="btn btn-primary">Open Business Portal</a>
            <a href="#pricing" class="btn btn-secondary">View Pricing</a>
          </div>
          <div class="stats-grid">
            <div class="stat-card">
              <strong>24/7</strong>
              <span>Live stock visibility</span>
            </div>
            <div class="stat-card">
              <strong>98%</strong>
              <span>Order accuracy</span>
            </div>
            <div class="stat-card">
              <strong>4.9/5</strong>
              <span>Owner satisfaction</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="visual-card">
            <div class="card-header">Today at a glance</div>
            <div class="metric-row"><span>Revenue</span><strong>MAD 84.2k</strong></div>
            <div class="metric-row"><span>Items low stock</span><strong>3</strong></div>
            <div class="metric-row"><span>Orders</span><strong>128</strong></div>
          </div>
        </div>
      </main>

      <section id="features" class="section">
        <h2>Everything you need to run smoothly</h2>
        <div class="cards-grid">
          <article class="info-card">
            <strong>Inventory monitoring</strong>
            <span>Track ingredient quantities in real time with low-stock alerts and automatic deductions after every sale.</span>
          </article>
          <article class="info-card">
            <strong>Recipe-driven costing</strong>
            <span>Define ingredient requirements for each menu item and know your exact cost per serving before the first plate leaves the kitchen.</span>
          </article>
          <article class="info-card">
            <strong>Purchase approvals</strong>
            <span>Submit, review, and approve procurement orders with a clear audit trail. Owner-mode verification adds an extra security layer.</span>
          </article>
          <article class="info-card">
            <strong>Realtime alerts</strong>
            <span>Receive instant notifications when stock dips below safety thresholds or when sales surge above forecast.</span>
          </article>
          <article class="info-card">
            <strong>Employee PIN access</strong>
            <span>Each team member signs in with a unique 4-digit PIN. Managers and owners get role-based access to sensitive features.</span>
          </article>
          <article class="info-card">
            <strong>Sales analytics</strong>
            <span>Visualize revenue trends, compare daily performance against targets, and identify your best-selling products at a glance.</span>
          </article>
          <article class="info-card">
            <strong>Menu management</strong>
            <span>Create and manage menu items, define recipes, and automatically update inventory as orders are fulfilled.</span>
          </article>
          <article class="info-card">
            <strong>Multi-business ready</strong>
            <span>Built to scale from a single café to multi-location operations with independent databases and service isolation.</span>
          </article>
        </div>
      </section>

      <section id="benefits" class="section alt">
        <h2>Built for ambitious teams</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">&#9312;</div>
            <h3>Reduce waste</h3>
            <p>Know exactly what's in stock and what's expiring. Smart inventory tracking helps you order only what you need.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">&#9313;</div>
            <h3>Save time</h3>
            <p>Automatic stock deductions from sales eliminate manual counts. Focus on your craft, not spreadsheets.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">&#9314;</div>
            <h3>Increase profitability</h3>
            <p>Recipe-driven costing reveals your true margins. Identify which menu items drive profit and which need repricing.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">&#9315;</div>
            <h3>Stay in control</h3>
            <p>Owner-mode verification, employee PINs, and role-based access ensure the right people have the right access.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">&#9316;</div>
            <h3>Make data-driven decisions</h3>
            <p>Sales analytics, procurement history, and inventory reports give you the insights to grow your business.</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">&#9317;</div>
            <h3>Event-driven architecture</h3>
            <p>Sales events automatically update inventory and trigger notifications. Everything stays in sync in real time.</p>
          </div>
        </div>
      </section>

      <section id="faq" class="section">
        <h2>Frequently asked questions</h2>
        <div class="faq-item">How fast can we get started? <span>Within a single afternoon — just sign in and explore.</span></div>
        <div class="faq-item">Is owner verification included? <span>Yes, with mocked security flows for demo purposes.</span></div>
        <div class="faq-item">What PINs can I use for testing? <span>Try 1234 (Owner), 4321 (Manager), 9999 (Cashier), or 0000 (Test User).</span></div>
        <div class="faq-item">Can I manage multiple locations? <span>Yes, the architecture supports multi-business deployments out of the box.</span></div>
        <div class="faq-item">Does Quantify work on mobile? <span>The frontend is responsive and works on tablets and phones.</span></div>
        <div class="faq-item">How are inventory updates triggered? <span>Sales automatically deduct ingredients via Kafka events — no manual entry needed.</span></div>
        <div class="faq-item">Is there AI-powered forecasting? <span>AI demand prediction and smart restocking are planned for the Analytics Service.</span></div>
      </section>

      <section id="pricing" class="section alt">
        <h2>Flexible plans</h2>
        <div class="pricing-grid">
          <div class="pricing-card">
            <h3>Starter</h3>
            <div class="price">Free</div>
            <p>For small cafés and bakeries getting started.</p>
            <ul>
              <li>Up to 5 employees</li>
              <li>Basic inventory tracking</li>
              <li>Sales dashboard</li>
            </ul>
          </div>
          <div class="pricing-card">
            <h3>Growth</h3>
            <div class="price">MAD 299<span>/mo</span></div>
            <p>For growing businesses with multiple locations.</p>
            <ul>
              <li>Unlimited employees</li>
              <li>Advanced analytics</li>
              <li>Procurement management</li>
              <li>Priority support</li>
            </ul>
          </div>
          <div class="pricing-card featured">
            <h3>Enterprise</h3>
            <div class="price">Custom</div>
            <p>For large-scale operations and chains.</p>
            <ul>
              <li>AI-powered forecasting</li>
              <li>Custom integrations</li>
              <li>Dedicated account manager</li>
              <li>SLA guarantees</li>
            </ul>
          </div>
        </div>
      </section>

      <footer class="footer">© 2026 Quantify · Designed for modern food businesses</footer>
    </div>
  `,
  styles: [
    `:host { display:block; }`,
    `.shell { min-height:100vh; background:linear-gradient(135deg,#07111f,#111c2f 50%,#18243f); color:#f3f6ff; }`,
    `.topbar { display:flex; justify-content:space-between; align-items:center; padding:1.25rem 2rem; max-width:1200px; margin:0 auto; }`,
    `.brand { font-weight:800; font-size:1.4rem; letter-spacing:.08em; text-transform:uppercase; }`,
    `nav { display:flex; gap:1rem; align-items:center; }`,
    `nav a { color:#dfe7ff; text-decoration:none; }`,
    `.hero { display:grid; grid-template-columns:1.1fr .9fr; gap:2rem; padding:3rem 2rem 4rem; max-width:1200px; margin:0 auto; align-items:center; }`,
    `.pill { display:inline-flex; width:max-content; padding:0.45rem 0.85rem; border-radius:999px; background:rgba(255,255,255,.12); font-size:.8rem; }`,
    `h1 { font-size:clamp(2rem,4vw,3.4rem); margin:1rem 0; }`,
    `.hero-copy p { color:#b9c7e6; font-size:1.05rem; max-width:580px; }`,
    `.hero-actions { display:flex; gap:1rem; margin:1.5rem 0; }`,
    `.btn { display:inline-flex; align-items:center; justify-content:center; padding:0.85rem 1.15rem; border-radius:999px; border:1px solid transparent; text-decoration:none; font-weight:600; }`,
    `.btn-primary { background:linear-gradient(135deg,#7c8dff,#52c6ff); color:#07111f; }`,
    `.btn-secondary { border-color:rgba(255,255,255,.2); color:white; }`,
    `.stats-grid { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1rem; margin-top:2rem; }`,
    `.stat-card { background:rgba(255,255,255,.08); padding:1rem; border-radius:1rem; border:1px solid rgba(255,255,255,.12); }`,
    `.hero-visual .visual-card { background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.16); border-radius:1.5rem; padding:1.25rem; box-shadow:0 24px 60px rgba(0,0,0,.25); }`,
    `.card-header { font-weight:700; margin-bottom:1rem; }`,
    `.metric-row { display:flex; justify-content:space-between; padding:.6rem 0; border-bottom:1px solid rgba(255,255,255,.08); }`,
    `.section { max-width:1200px; margin:0 auto; padding:2rem; }`,
    `.section.alt { background:rgba(255,255,255,.04); border-radius:1.5rem; }`,
    `.cards-grid { display:grid; grid-template-columns:repeat(4, minmax(0,1fr)); gap:1rem; margin-top:1rem; }`,
    `.info-card { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); color:#f3f6ff; padding:1rem 1.1rem; border-radius:1rem; display:flex; flex-direction:column; gap:.35rem; }`,
    `.info-card strong { font-size:1rem; color:#e2eaff; }`,
    `.info-card span { font-size:.85rem; color:#b9c7e6; line-height:1.4; }`,
    `.benefits-grid { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1.25rem; margin-top:1.5rem; }`,
    `.benefit-card { background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); border-radius:1.2rem; padding:1.5rem; }`,
    `.benefit-card h3 { font-size:1.15rem; margin:.5rem 0 .35rem; }`,
    `.benefit-card p { font-size:.9rem; color:#b9c7e6; line-height:1.5; }`,
    `.benefit-icon { font-size:1.6rem; }`,
    `.pricing-grid { display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:1.25rem; margin-top:1.5rem; }`,
    `.pricing-card { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); color:#f3f6ff; border-radius:1.2rem; padding:1.5rem; }`,
    `.pricing-card.featured { border-color:#7c8dff; }`,
    `.pricing-card h3 { font-size:1.2rem; margin-bottom:.25rem; color:#e2eaff; }`,
    `.pricing-card .price { font-size:2rem; font-weight:800; margin:.5rem 0; }`,
    `.pricing-card .price span { font-size:1rem; font-weight:400; color:#9baecc; }`,
    `.pricing-card p { font-size:.9rem; color:#b9c7e6; }`,
    `.pricing-card ul { list-style:none; padding:0; margin:1rem 0 0; display:flex; flex-direction:column; gap:.5rem; color:#dfe7ff; }`,
    `.pricing-card li::before { content:"✓ "; color:#7c8dff; font-weight:700; }`,
    `.faq-item { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12); color:#f3f6ff; padding:1rem 1.1rem; border-radius:1rem; display:flex; justify-content:space-between; margin-top:.75rem; font-weight:600; }`,
    `.faq-item span { font-weight:400; color:#b9c7e6; }`,
    `.footer { text-align:center; padding:2rem 1rem 3rem; color:#9baecc; }`,
    `@media (max-width: 900px) { .hero { grid-template-columns:1fr; } .cards-grid { grid-template-columns:repeat(2, minmax(0,1fr)); } .stats-grid { grid-template-columns:1fr; } .benefits-grid, .pricing-grid { grid-template-columns:repeat(2, minmax(0,1fr)); } }`,
    `@media (max-width: 600px) { .topbar { flex-direction:column; gap:.7rem; } nav { flex-wrap:wrap; justify-content:center; } .hero { padding:2rem 1rem 3rem; } .section { padding:1rem; } .cards-grid, .benefits-grid, .pricing-grid { grid-template-columns:1fr; } .hero-actions { flex-direction:column; } }`
  ]
})
export class LandingPageComponent {
  readonly appState: AppStateService = inject(AppStateService);
}
