document.addEventListener('DOMContentLoaded', function () {
    const applyFontButton = document.getElementById('apply-font');
    const fontSelect = document.getElementById('font-select');
  
    applyFontButton.addEventListener('click', async function () {
      const selectedFont = fontSelect.value;
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: changeFont,
          args: [selectedFont]
        });
      } catch (error) {
        console.error('Error executing script:', error);
      }
    });
  
    function changeFont(selectedFont) {
      document.body.style.fontFamily = selectedFont;
    }
  });
