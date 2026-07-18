import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-maintenance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page">
      <h1>Maintenance mode</h1>
      <p>Quantify is preparing a fresh release. Please come back soon.</p>
    </div>
  `,
  styles: [
    `:host { display:block; }`,
    `.page { min-height:100vh; display:grid; place-items:center; padding:2rem; text-align:center; background:#f4f7fb; }`
  ]
})
export class MaintenanceComponent {}
