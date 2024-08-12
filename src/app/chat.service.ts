import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ChatMessage } from './chat-message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatCollection;

  constructor(private firestore: Firestore) {
    this.chatCollection = collection(this.firestore, 'chatMessages');
  }

  // Method to send a chat message
  sendMessage(message: ChatMessage): Promise<void> {
    return addDoc(this.chatCollection, message).then(() => {});
  }

  // Method to get chat messages, ordered by timestamp
  getMessages(): Observable<ChatMessage[]> {
    const messagesQuery = query(this.chatCollection, orderBy('timestamp', 'asc'));
    return collectionData(messagesQuery, { idField: 'id' }) as Observable<ChatMessage[]>;
  }
}
