import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-virtual-keyboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="vk-wrap" *ngIf="visible">
      <div class="vk">
        <div class="vk-row">
          <button *ngFor="let k of currentRow1" type="button" class="vk-key" (click)="type(k)">{{ k }}</button>
          <button type="button" class="vk-key vk-fn" (click)="backspace()">⌫</button>
        </div>
        <div class="vk-row">
          <button *ngFor="let k of currentRow2" type="button" class="vk-key" (click)="type(k)">{{ k }}</button>
          <button type="button" class="vk-key vk-fn" (click)="toggleCase()">{{ shift ? '⇧' : '⇪' }}</button>
        </div>
        <div class="vk-row">
          <button *ngFor="let k of currentRow3" type="button" class="vk-key" (click)="type(k)">{{ k }}</button>
        </div>
        <div class="vk-row">
          <button type="button" class="vk-key vk-fn" (click)="toggleSymbols()">.?123</button>
          <button type="button" class="vk-key vk-space" (click)="type(' ')">Space</button>
          <button type="button" class="vk-key vk-done" (click)="hide()">Done</button>
        </div>
      </div>
    </div>
    <button *ngIf="!visible" type="button" class="vk-toggle" (click)="show()">⌨</button>
  `,
  styles: [
    `:host { display:contents; }`,
    `.vk-wrap { margin-top:.5rem; }`,
    `.vk { background:#0f1a2e; border:1px solid rgba(255,255,255,.15); border-radius:1rem; padding:.65rem; display:flex; flex-direction:column; gap:.4rem; }`,
    `.vk-row { display:flex; gap:.35rem; justify-content:center; }`,
    `.vk-key { flex:1; max-width:3.2rem; height:2.8rem; border:none; border-radius:.6rem; background:rgba(255,255,255,.1); color:#f3f6ff; font-size:.95rem; font-weight:600; cursor:pointer; padding:0; font-family:inherit; }`,
    `.vk-key:active { background:rgba(255,255,255,.2); }`,
    `.vk-fn { flex:1.2; max-width:3.8rem; background:rgba(255,255,255,.06); color:#b9c7e6; font-size:.85rem; }`,
    `.vk-space { flex:4; max-width:none; }`,
    `.vk-done { flex:1.5; max-width:4.5rem; background:linear-gradient(135deg,#7c8dff,#52c6ff); color:#07111f; }`,
    `.vk-toggle { position:fixed; bottom:1rem; right:1rem; width:3.2rem; height:3.2rem; border-radius:50%; border:none; background:linear-gradient(135deg,#7c8dff,#52c6ff); color:#07111f; font-size:1.3rem; cursor:pointer; z-index:100; box-shadow:0 6px 20px rgba(0,0,0,.3); }`,
    `@media (max-width: 600px) { .vk-key { max-width:2.6rem; height:2.5rem; font-size:.85rem; } }`
  ]
})
export class VirtualKeyboardComponent {
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  shift = false;
  symbols = false;

  lettersLower = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m','@','.', '-']
  ];
  lettersUpper = [
    ['Q','W','E','R','T','Y','U','I','O','P'],
    ['A','S','D','F','G','H','J','K','L'],
    ['Z','X','C','V','B','N','M','@','.', '-']
  ];
  symRows = [
    ['1','2','3','4','5','6','7','8','9','0'],
    ['!','#','$','%','&','*','+','=','/','_'],
    ['(',')','[',']','{','}',':',';','\'','"']
  ];

  get currentRow1() { return this.symbols ? this.symRows[0] : this.shift ? this.lettersUpper[0] : this.lettersLower[0]; }
  get currentRow2() { return this.symbols ? this.symRows[1] : this.shift ? this.lettersUpper[1] : this.lettersLower[1]; }
  get currentRow3() { return this.symbols ? this.symRows[2] : this.shift ? this.lettersUpper[2] : this.lettersLower[2]; }

  type(key: string) {
    this.value += key;
    this.valueChange.emit(this.value);
    if (this.shift && !this.symbols) {
      this.shift = false;
    }
  }

  backspace() {
    this.value = this.value.slice(0, -1);
    this.valueChange.emit(this.value);
  }

  toggleCase() {
    this.shift = !this.shift;
    this.symbols = false;
  }

  toggleSymbols() {
    this.symbols = !this.symbols;
    this.shift = false;
  }

  show() {
    this.visible = true;
    this.visibleChange.emit(true);
  }

  hide() {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}
