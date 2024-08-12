import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../chat.service';
import { AuthService } from '../auth.service'; // Import AuthService
import { Observable } from 'rxjs';
import { ChatMessage } from '../chat-message.model';

@Component({
  selector: 'app-chat-room',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  messages$!: Observable<ChatMessage[]>;
  newMessage: string = '';

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(): void {
    this.messages$ = this.chatService.getMessages();
  }

  sendMessage(): void {
    const currentUser = this.authService.getCurrentUser(); // Get the current user
    if (this.newMessage.trim() && currentUser) {
      const message: ChatMessage = {
        content: this.newMessage,
        sender: currentUser.displayName || 'Anonymous',  // Use the logged-in user's name
        timestamp: Date.now()
      };

      // Clear the input field immediately
      this.newMessage = '';

      // Send the message
      this.chatService.sendMessage(message).catch((error) => {
        console.error('Error sending message:', error);
      });
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
      event.preventDefault(); // Prevent default newline behavior
      this.sendMessage();
    }
  }
}
