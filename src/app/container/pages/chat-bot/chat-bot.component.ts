import { Component } from '@angular/core';
import { ChatBotService } from '../../../services/chat-bot.service';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent {
  messages: { type: string; content: string }[] = [];
  currentMessage = '';

  constructor(private chatBotService: ChatBotService) {}

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
        console.error('Error:', error);
      }
    );

    this.currentMessage = '';
  }
}
