document.addEventListener("DOMContentLoaded", function () {
  const applyFontButton = document.getElementById("apply-font");
  const fontSelect = document.getElementById("font-select");
  const textSizeInput = document.getElementById("text-size");
  const decreaseSpacingButton = document.getElementById("decrease-spacing");
  const increaseSpacingButton = document.getElementById("increase-spacing");
  const textSpacingValue = document.getElementById("text-spacing-value");
  const customFontUploadInput = document.getElementById("custom-font-upload");
  let spacingValue = 0;

  fontSelect.addEventListener("change", function () {
    if (fontSelect.value === "Custom") {
      customFontUploadInput.style.display = "block";
    } else {
      customFontUploadInput.style.display = "none";
    }
  });

  function changeFont(selectedFont, selectedTextSize, selectedTextSpacing) {
    const style = document.createElement("style");
    style.innerHTML = `body {
      font-family: '${selectedFont}';
      font-size: ${selectedTextSize}px;
      letter-spacing: ${selectedTextSpacing}px;
    }`;
    document.head.appendChild(style);
  }

  function changeCustomFont(fontData, selectedTextSize, selectedTextSpacing) {
    const style = document.createElement("style");
    style.innerHTML = `@font-face {
      font-family: 'CustomFont';
      src: url(${fontData});
    }
    body {
      font-family: 'CustomFont', sans-serif;
      font-size: ${selectedTextSize}px;
      letter-spacing: ${selectedTextSpacing}px;
    }`;
    document.head.appendChild(style);
  }

  applyFontButton.addEventListener("click", async function () {
    const selectedFont = fontSelect.value;
    const selectedTextSize = textSizeInput.value;
    const file = customFontUploadInput.files[0];
    if (selectedFont === "Custom" && file) {
      console.log("Selected font:", selectedFont);
      const reader = new FileReader();
      reader.onload = (e) => {
        const fontData = e.target.result;
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: changeCustomFont,
            args: [fontData, selectedTextSize, spacingValue],
          });
        });
      };
      reader.readAsDataURL(file);
    } else {
      console.log("Selected font:", selectedFont);
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          function: changeFont,
          args: [selectedFont, selectedTextSize, spacingValue],
        });
      } catch (error) {
        console.error("Error executing script:", error);
      }
    }
  });

  decreaseSpacingButton.addEventListener("click", function () {
    spacingValue--;
    textSpacingValue.textContent = spacingValue;
  });

  increaseSpacingButton.addEventListener("click", function () {
    spacingValue++;
    textSpacingValue.textContent = spacingValue;
  });
});
