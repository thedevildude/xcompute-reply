console.log("Script Loaded");
import {
  observeElement,
  createImageElement,
  styleText,
  updateTweetTextArea,
} from "./utils";

const updateMainTweetText = () => {
  const tweetText = document.querySelector(
    '[data-testid="tweetText"]'
  )?.textContent;
  alert(tweetText);
  updateTweetTextArea(tweetText || "");
};

const updateRepliesTweetText = () => {
  const xComputeButton = document.querySelector("#x-compute-button");
  if (!xComputeButton) {
    console.error("Button container not found.");
    return;
  }
  // Find the parent cellInnerDiv of the button container
  const cellInnerDiv = xComputeButton.closest('[data-testid="cellInnerDiv"]');
  const tweetText = cellInnerDiv?.querySelector(
    '[data-testid="tweetText"]'
  )?.textContent;

  alert(tweetText);

  updateTweetTextArea(tweetText || "");
};

const addButtonToToolbar = (toolBar: Element) => {
  if (toolBar.querySelector("#x-compute-button") === null) {
    const div = document.createElement("div");
    div.id = "x-compute-button";
    const sRoot = div.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = styleText;

    const repliesTweetImgSrc = `chrome-extension://${chrome.runtime.id}/icon32.png`;
    const mainTweetImgSrc = `chrome-extension://${chrome.runtime.id}/icon32-black.png`;

    // Selects the current reply tweet from the tweet thread
    const repliesTweetImage = createImageElement(
      repliesTweetImgSrc,
      "x-compute-button-img",
      updateRepliesTweetText
    );

    // Selects the current tweet thread's original tweet
    const mainTweetImage = createImageElement(
      mainTweetImgSrc,
      "x-compute-button-img",
      updateMainTweetText
    );
    sRoot.append(styleElement);
    sRoot.append(repliesTweetImage);
    sRoot.append(mainTweetImage);
    // Insert the button into the toolbar
    toolBar.insertAdjacentElement("afterbegin", div);
  }
};

observeElement('[data-testid="toolBar"]', (toolBar) => {
  addButtonToToolbar(toolBar);
  console.log("Button added to toolbar");
});
