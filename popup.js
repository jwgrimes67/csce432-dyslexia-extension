document.addEventListener('DOMContentLoaded', function () {
  const applyFontButton = document.getElementById('apply-font');
  const fontSelect = document.getElementById('font-select');
  const textSizeInput = document.getElementById('text-size');
  const decreaseSpacingButton = document.getElementById('decrease-spacing');
  const increaseSpacingButton = document.getElementById('increase-spacing');
  const textSpacingValue = document.getElementById('text-spacing-value');
  let spacingValue = 0;

  applyFontButton.addEventListener('click', async function () {
    const selectedFont = fontSelect.value;
    const selectedTextSize = textSizeInput.value;
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: changeFont,
        args: [selectedFont, selectedTextSize, spacingValue]
      });
    } catch (error) {
      console.error('Error executing script:', error);
    }
  });

  decreaseSpacingButton.addEventListener('click', function () {
    spacingValue--;
    textSpacingValue.textContent = spacingValue;
  });

  increaseSpacingButton.addEventListener('click', function () {
    spacingValue++;
    textSpacingValue.textContent = spacingValue;
  });

  function changeFont(selectedFont, selectedTextSize, selectedTextSpacing) {
    document.body.style.fontFamily = selectedFont;
    document.body.style.fontSize = selectedTextSize + 'px';
    document.body.style.letterSpacing = selectedTextSpacing + 'px';
  }
});
