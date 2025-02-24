function extractEmailContent() {
  // Selettori per diversi elementi dell'email in Outlook
  const selectors = [
    '.ReadingPaneContents',
    '[role="main"] [role="document"]',
    '.mailContent'
  ];

  for (const selector of selectors) {
    const element = document.querySelector(selector);
    if (element) {
      return {
        subject: document.querySelector('[role="heading"]')?.innerText || 'No Subject',
        body: element.innerText
      };
    }
  }

  return null;
}
