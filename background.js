chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
  .catch(console.error);

chrome.action.onClicked.addListener((tab) => {
  if (tab.url.match(/outlook\.(live|office(365)?)\.com/)) {
    chrome.sidePanel.open({ windowId: tab.windowId });
  }
});
