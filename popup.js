document.addEventListener('DOMContentLoaded', function () {
    const applyFontButton = document.getElementById('apply-font');
    const fontSelect = document.getElementById('font-select');
    const fontSize = document.getElementById('size-select');
  
    applyFontButton.addEventListener('click', async function () {
      const selectedFont = fontSelect.value;
      const selectedSize = fontSize.value;
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: changeFont,
          args: [selectedFont, selectedSize]
        });
      } catch (error) {
        console.error('Error executing script:', error);
      }
    });
  
    function changeFont(selectedFont, selectedSize) {
      document.body.style.fontFamily = selectedFont;
      document.body.style.fontSize = selectedSize;
    }
  });
