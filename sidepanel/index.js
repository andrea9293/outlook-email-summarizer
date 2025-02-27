import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory
} from '../node_modules/@google/generative-ai/dist/index.mjs';
import { config } from '../src/config.js';

const apiKey = config.API_KEY;

let genAI = null;
let model = null;
let generationConfig = {
  temperature: 1
};

const chatInput = document.querySelector('#chat-input');
const sendButton = document.querySelector('#send-message');
const chatMessages = document.querySelector('#chat-messages')

const buttonPrompt = document.body.querySelector('#button-prompt');
const elementResponse = document.body.querySelector('#response');
const elementLoading = document.body.querySelector('#loading');
const elementError = document.body.querySelector('#error');

function initModel(generationConfig) {
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE
    }
  ];
  genAI = new GoogleGenerativeAI(apiKey);
  model = genAI.getGenerativeModel({
    model: 'gemini-2.0-flash-thinking-exp',
    safetySettings,
    generationConfig
  });
  return model;
}

async function extractEmailContent() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const [result] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: () => {
      // Using specific message body ID
      const emailBody = document.querySelector('#ReadingPaneContainerId');
      const subject = document.querySelector('[role="heading"]');
      
      return {
        // subject: subject ? subject.innerText : 'No Subject',
        body: emailBody ? emailBody.innerText : ''
      };
    }
  });
  return result.result;
}

async function summarizeEmail() {
  try {
    const emailData = await extractEmailContent();
    const prompt = `Summarize this email in key points while keeping essential information:\n\nSubject: ${emailData.subject}\n\nContent:\n${emailData.body}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (e) {
    console.error('Error during summarization:', e);
    throw e;
  }
}

// Function to add a message to chat
function addMessage(content, isUser = false) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${isUser ? 'user-message' : 'ai-message'}`;
  messageDiv.innerHTML = marked.parse(content);
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle message sending
async function handleChatMessage() {
  const emailContent = await extractEmailContent();
  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, true);
  chatInput.value = '';
  showLoading();

  try {
    const prompt = `Based on this email:\n\nContent:\n${emailContent.body}\n\nAnswer this question: ${message}`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    addMessage(response.text());
  } catch (e) {
    showError(e);
  } finally {
    hide(elementLoading);
  }
}

buttonPrompt.addEventListener('click', async () => {
  showLoading();
  try {
    const summary = await summarizeEmail();
    showResponse(summary);
  } catch (e) {
    showError(e);
  }
});

sendButton.addEventListener('click', handleChatMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleChatMessage();
});

function showLoading() {
  hide(elementResponse);
  hide(elementError);
  show(elementLoading);
}

function showResponse(response) {
  hide(elementLoading);
  show(elementResponse);
  elementResponse.innerHTML = marked.parse(response);
}

function showError(error) {
  show(elementError);
  hide(elementResponse);
  hide(elementLoading);
  elementError.textContent = error;
}

function show(element) {
  element.removeAttribute('hidden');
}

function hide(element) {
  element.setAttribute('hidden', '');
}

initModel(generationConfig);