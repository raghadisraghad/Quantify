import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page">
      <h1>Owner verification required</h1>
      <p>This area is protected for owner-only workflows.</p>
      <a routerLink="/dashboard" class="btn">Return to dashboard</a>
    </div>
  `,
  styles: [
    `:host { display:block; }`,
    `.page { min-height:100vh; display:grid; place-items:center; padding:2rem; text-align:center; background:#f4f7fb; }`,
    `.btn { display:inline-flex; margin-top:1rem; padding:.8rem 1rem; border-radius:999px; background:#4756c8; color:white; }`
  ]
})
export class UnauthorizedComponent {}
