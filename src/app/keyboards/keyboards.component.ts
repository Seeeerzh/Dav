import { Component, OnInit } from '@angular/core';
import { Keyboard } from '../keyboard';
import { KEYBOARDS } from '../mock-keyboards';
import { MessageService } from '../message.service';
import { KeyboardService } from '../keyboard.service';
@Component({
  selector: 'app-keyboards',
  templateUrl: './keyboards.component.html',
  styleUrls: ['./keyboards.component.css']
})
export class KeyboardsComponent implements OnInit {


  keyboards: Keyboard[] = [];


  constructor(private keyboardService: KeyboardService) { }

  ngOnInit(): void {
    this.getKeyboards();
  }

  

  getKeyboards(): void {
    this.keyboardService.getKeyboards()
        .subscribe(keyboards => this.keyboards = keyboards);
  }
  add(name: string, image: string): void {
    name = name.trim();
    image = image.trim();
    if (!name && !image) { return; }
    this.keyboardService.addKeyboard({ name, image } as unknown as Keyboard)
      .subscribe(keyboard => {
        this.keyboards.push(keyboard);
      });
  }

  delete(keyboard: Keyboard): void {
    this.keyboards = this.keyboards.filter(h => h !== keyboard);
    this.keyboardService.deleteKeyboard(keyboard.id).subscribe();
  }
}
