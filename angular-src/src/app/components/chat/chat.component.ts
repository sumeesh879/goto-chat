import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  socket = null;
  chatip = '';
  chatmsg = new Array();
  user: any;

  constructor() {
    this.socket = io('/');
    let listener = Observable.fromEvent(this.socket, 'message');
    listener.subscribe((payload) => {
      this.chatmsg.push(payload);
    })
  }

  send(msg) {
    this.chatip = '';
    this.socket.emit('message', msg);
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.socket.emit('newUser', this.user.username);
  }

}