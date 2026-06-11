const API_KEY = 'API Key';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

const chatBox = document.querySelector('.chat-box');
const input = document.querySelector('.input-area input'); // <- Direct select
const button = document.querySelector('.input-area button'); // <- Direct select

function saveChat(text, className) {
    let chats = JSON.parse(localStorage.getItem('myChats')) || [];
    chats.push({text: text, className: className});
    localStorage.setItem('myChats', JSON.stringify(chats));

    if(className === 'user-msg') {
        let chatItem = document.createElement('div');
        chatItem.className = 'chat-item';
        chatItem.textContent = text.slice(0, 25) + '...';
        document.querySelector('.chat-history').appendChild(chatItem);
    }
}

function loadChat() {
    let chats = JSON.parse(localStorage.getItem('myChats')) || [];
    chatBox.innerHTML = '';

    addMessage('Hello', 'ai-msg');
    addMessage('Bot is on now', 'user-msg');
    addMessage('100% ready', 'ai-msg');

    chats.forEach(c => {
        const msg = document.createElement('div');
        msg.className = c.className;
        msg.textContent = c.text;
        chatBox.appendChild(msg);
    });
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addMessage(text, className) {
  const msg = document.createElement('div');
  msg.className = className;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function showThinking() {
  const thinking = document.createElement('div');
  thinking.className = 'thinking';
  thinking.innerHTML = '<span></span><span></span><span></span>';
  chatBox.appendChild(thinking);
  return thinking;
}

async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  if(API_KEY === "Enter API Key") {
    addMessage('Error: Enter API KEY!', 'ai-msg');
    return;
  }

  addMessage(userText, 'user-msg');
  saveChat(userText, 'user-msg');
  input.value = '';

  const thinking = showThinking();

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: userText }] }] }) })

    const data = await response.json();
    thinking.remove();

    if (data.candidates && data.candidates[0]) {
      const aiReply = data.candidates[0].content.parts[0].text;
      addMessage(aiReply, 'ai-msg');
      saveChat(aiReply, 'ai-msg');
    } else {
      addMessage('Error: API response Wrong!', 'ai-msg');
    }

  } catch (error) {
    thinking.remove();
    addMessage('API Error: ' + error.message, 'ai-msg');
  }
}

// FIX: Button click event
button.addEventListener('click', sendMessage);
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

document.querySelector('.new-chat-btn').onclick = () => {
    localStorage.removeItem('myChats');
    loadChat();
}

document.addEventListener('DOMContentLoaded', loadChat);