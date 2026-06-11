# AI Chat Bot - Web Interface

A responsive AI chat interface built with HTML, CSS, and JavaScript. Connects to any AI API like OpenAI, Gemini, or your own backend. Includes chat history, typing animation, and mobile support.

### Preview
Dark theme chat UI with gradient bubbles, fixed sidebar for chat history, and smooth typing indicator.

##  Features
- **Modern UI**: Gradient chat bubbles, rounded corners, glassmorphism effect
- **Real-time Chat**: Send messages, get AI responses with typing indicator
- **Chat History**: Auto-saves chats in browser localStorage + sidebar history list
- **New Chat**: Clear all history with 1 click
- **Responsive**: Sidebar hides on mobile < 768px, chat fills full width
- **Zero Dependencies**: Pure HTML, CSS, JS. No frameworks needed
- **Easy API Integration**: Swap endpoint + payload to use  Google ai studio.

##  Project Structure
ai-chat-bot/
-index.html
HTML structure: sidebar + chat container
Layout: Left fixed sidebar for "My Chats", right chat container with header, message area, input box

-style.css 
All styling, colors, animations, responsive rules
Dark gradient background, purple chat bubbles, bounce animation for 3 dots, custom scrollbar, mobile media query.
1. In chat container box set a width 400px and height 600px with backgorund white color and distrubute the chat header uesd {background: linear gradient}.
2. Bubble color and chat sending/receving message:- used for dessigning .ai-msg, .user-msg and .thinking classes and bubbles is span on thinking span class using nth child 2,3.
3. input area flex container for input + button. 'padding: 16px' for spacing: gap 10px between elements background for clean white bar border 1px to separate from chat.
4. input makes fill width, height 48px for easy typing, using border-radius:24px gives pill shape, border:1.5px gray for default border
5. input focus in onclick change color on blue+soft glow box shadow and sign og active.
6. input placeholder is set a ask anything to type in color of light gray .
7. The .sidebar is fixed to a left side of a page the sidebar width is 350px ,position is fixed and top,left is 0.
8. sidebar background color is dark gray ,display flex + flex direction colum for vertical layout
9. z-index is 1000 keeps on top ,box-shadow is adds left border
10. In sidebar elements h2 is title of My Chats with bottom border 1px and new chat-btn is gray color full width or hover changes to #555.


-script.js
Chat logic, API calls, localStorage handling
1. chatbox is a select the message area div to add/remove message,input area and button is directly selects to texting and sending and three functions to avod repeated queryselectors calls.
2. savechat(text,classname) is stores every message so chat doens't disappear on reload, (lets chats) is a saved chats from browser localstorage, chat push is a adds new message object to array.
3. if(className==='User-msg') only for a user message creates a sidebar preview, makes new div with class chat-item, takes first 25 chat of text+appends to chat history.
4. loadchat() shows old chat when you refresh page,chatBox.innerHTML is clear chat box and addMessage() is adds default message + new messages,chatBox.
5. scrollTop&Height is after loading old message is autoscroll chat to bottom latest message is visible.
6. AddMessage(text,classname) is new div for message and sets ai-msg,user-msg for css styling,msg.TextContent='text' the adds message text.
7. showThing() div class of .thinking is innerHTML is 3 times of span in 3 dots animantion,return-thinking returns element so we can remove it later.
8. sendMessage() is trim() gets input text ,after return stops input is empty,check API key,(userText,user-msg)shows user messaage in chat,after that saves in localstorage + sidebar. after showing user message function calls API and shows 3 bouncing dots const thinking = showThinking() while waiting for API responces.
9. try{} is error handling and catch{} is catches the error API fails, await fetch (url) is sends POST request to API and telling server we send JSON.
10. const data = await response.json() converts API response from JSON string to javascript object.
11. if (data.candidates && data.candidates[0]) checks if API gave a valid reply otherwise else block and catch(error).
12. button.addEventListener when yuo click the button send message functions runs sendMessage(),if(e.key==='Enter') pressing enter key sends messagee no need to click button. In sidebar('.new-chat-btn').onclick + New Chat button in sidebar, loadChat()reload chats for welcome message only.
13. addMessage() creates chat bubbles,showThinking() shows typing animation,sendMessage() calls API using fetch,saveChat() + loadChat() handle localStorage, Event listeners for Send button + Enter key + New Chat.
There is five main function used on js file.


##  Setup Steps

### 1. creates files
Keep `index.html`, `style.css`, `script.js` in the same folder.

### 2. Add  API credentials
Open `script.js` and replace these 2 lines at the top:
```javascript
const API_KEY = "API Key"; // Gemini key using google ai studio
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}"; // API url

Video Link:-
https://youtu.be/hYhCuTnWghI

