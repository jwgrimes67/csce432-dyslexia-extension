document.addEventListener('DOMContentLoaded', function () {
  const applyFontButton = document.getElementById('apply-font');
  const fontSelect = document.getElementById('font-select');
  const textSizeInput = document.getElementById('text-size');

  applyFontButton.addEventListener('click', async function () {
    const selectedFont = fontSelect.value;
    const selectedTextSize = textSizeInput.value;
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFont,
        args: [selectedFont, selectedTextSize]
      });
    } catch (error) {
      console.error('Error executing script:', error);
    }
  });

  function changeFont(selectedFont, selectedTextSize) {
    document.body.style.fontFamily = selectedFont;
    document.body.style.fontSize = selectedTextSize + 'px';
  }
});
