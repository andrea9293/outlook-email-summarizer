# 🤖 Outlook Email Summarizer - Chrome Extension

Transform your Outlook experience with AI-powered email summaries using Gemini AI! 

## ✨ Features
- 📧 Instant email summarization in Outlook
- 💬 Interactive chat to ask questions about emails
- 📱 Clean sidebar interface
- 🔄 Works with outlook.live.com and outlook.office365.com
- 🎯 Multiple summary types (brief, detailed, bullet points)

## 🛠️ Tech Stack
- Node.js
- Google Gemini AI
- Chrome Extensions API
- Marked.js for Markdown

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Google Gemini API key
- Chrome browser

### Installation

1. Clone the repository
``` 
git clone https://github.com/andrea9293/outlook-email-summarizer.git
```

2. Install dependencies
```
npm install
```

3. Configure API Key
- Copy `src/config.example.js` to `src/config.js`
- Add your Gemini API key in `config.js`

4. Build the extension
```
npm run build
```

5. Load in Chrome
- Open Chrome Extensions (chrome://extensions/)
- Enable Developer Mode
- Click "Load unpacked"
- Select the extension directory

## 🎮 Usage
1. Open any email in Outlook
2. Click the extension icon
3. Choose summary type from dropdown
4. Click "Summarize Email"
5. Use chat to ask questions about the email

## 🔑 API Key Setup
1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Add it to `src/config.js`

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📜 License
MIT License - see [LICENSE](LICENSE) file

## 🌟 Credits
- Built with [Google Gemini AI](https://ai.google.dev/)
- Icons from [Emoji Icons](https://emoji.supply/)

## 📞 Support
Open an issue or submit a pull request

---
Made with ❤️ for email productivity
