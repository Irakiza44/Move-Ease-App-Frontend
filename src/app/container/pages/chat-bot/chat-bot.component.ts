import { Component } from '@angular/core';
import { ChatBotService } from '../../../services/chat-bot.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent {
  messages: { type: string; content: string }[] = [];
  currentMessage = '';

  constructor(
    private chatBotService: ChatBotService,
    private toastr: ToastrService
  ) {}

  sendMessage(): void {
    if (this.currentMessage.trim() === '') {
      return;
    }

    this.messages.push({ type: 'user', content: this.currentMessage });

    this.chatBotService.sendMessage(this.currentMessage).subscribe(
      (response) => {
        this.messages.push({ type: 'bot', content: response.message });
      },
      (error) => {
        this.toastr.error(
          error.error.message || 'An error occurred. Please try again.'
        );
      }
    );

    this.currentMessage = '';
  }
}
