console.log("Script Loaded");
import { observeElement } from "./observer";

const updateTweetTextInput = () => {
  const tweetText = document.querySelector(
    '[data-testid="tweetText"]'
  )?.textContent;
  const tweetTextArea = document.querySelector('[data-text="true"]')
    ? document.querySelector('[data-text="true"]')
    : document.querySelector('[data-textid="tweetTextarea_0"]')
    ? document.querySelector('[data-textid="tweetTextarea_0"]')
    : null;

  alert(tweetText);

  const range = document.createRange();
  const selection = window.getSelection();
  if (tweetTextArea) {
    (tweetTextArea as HTMLElement).focus();
    range.selectNodeContents(tweetTextArea);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
    document.execCommand("insertHTML", false, tweetText ? tweetText : "");
  }
};

const handleXComputeClick = () => {
  updateTweetTextInput();
};
const addButtonToToolbar = (toolBar: Element) => {
  if (toolBar.querySelector("#x-compute-button") === null) {
    const div = document.createElement("div");
    div.id = "x-compute-button";
    const sRoot = div.attachShadow({ mode: "open" });

    const imgSrc = `chrome-extension://${chrome.runtime.id}/icon16.png`;
    const imgElement = document.createElement("img");
    imgElement.id = "x-compute-button-img";
    imgElement.src = imgSrc;
    imgElement.addEventListener("click", () => handleXComputeClick());
    sRoot.append(imgElement);
    // Insert the button into the toolbar
    toolBar.insertAdjacentElement("afterbegin", div);
  }
};

observeElement('[data-testid="toolBar"]', (toolBar) => {
  addButtonToToolbar(toolBar);
  console.log("Button added to toolbar");
});
