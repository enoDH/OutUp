import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { UserLite } from 'src/app/shared/interfaces';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('chatFieldEl') chatFieldEl: ElementRef;
  text: FormControl;
  socket: Socket;
  reader: FileReader;
  cSub: Subscription;
  user: UserLite;

  constructor(private _renderer2: Renderer2, private _auth: AuthService, private _router: Router) {
  }

  ngOnInit(): void {
    this.cSub = this._auth.getUser().subscribe(
      data => {
        this.user = data;
      },
      error => {
        this._router.navigate(['/login']);
        MaterialService.toast('Unauthorized!');
      }
    );

    this.socket = io({
      path: '/api/chat/',
      extraHeaders: {
        Authorization: this._auth.getToken()
      }
    });

    this.text = new FormControl('', [Validators.minLength(1), Validators.maxLength(256), Validators.required]);

    this.socket.emit('firstLoad');
    this.socket.on('message', (data) => {
      if (typeof data.length === 'undefined') {
        const div = this._renderer2.createElement('div');
        const name = this._renderer2.createText(`${data.name}`);
        const text = this._renderer2.createText(`${data.message}`);
        const label = this._renderer2.createElement('label');
        const p = this._renderer2.createElement('p');

        this._renderer2.addClass(div, 'message');

        this.addDiv(label, name, p, text, div);
      }
      else {
        for (let i of data) {
          const div = this._renderer2.createElement('div');
          const name = this._renderer2.createText(`${i.name}`);
          const text = this._renderer2.createText(`${i.message}`);
          const label = this._renderer2.createElement('label');
          const p = this._renderer2.createElement('p');

          if (i.user == this.user.user) {
            this._renderer2.addClass(div, 'my-message');
          }
          else {
            this._renderer2.addClass(div, 'message');
          }

          this.addDiv(label, name, p, text, div);
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }

    if (this.cSub) {
      this.cSub.unsubscribe();
    }
  }

  send(): void {
    const div = this._renderer2.createElement('div');
    const name = this._renderer2.createText(`${this.user.name}`);
    const text = this._renderer2.createText(`${this.text.value}`);
    const label = this._renderer2.createElement('label');
    const p = this._renderer2.createElement('p');

    this._renderer2.addClass(div, 'my-message');

    this.addDiv(label, name, p, text, div);
    this.socket.emit('message', this.text.value);

    this.text.setValue('');
  }

  addDiv(label, name, p, text, div): void {
    this._renderer2.appendChild(label, name);
    this._renderer2.appendChild(p, text);
    this._renderer2.appendChild(div, label);
    this._renderer2.appendChild(div, p);
    this._renderer2.appendChild(this.chatFieldEl.nativeElement, div);
  }
}
