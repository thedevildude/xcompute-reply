export const observeElement = (
  selector: string,
  callback: (element: Element) => void
) => {
  const targetNode = document.querySelector("#react-root");
  if (!targetNode) {
    throw new Error("React root element not found");
  }
  const config = { childList: true, subtree: true };
  const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        const element = document.querySelector(selector);
        if (element) {
          callback(element);
          observer.disconnect();
          break;
        }
      }
    }
  });
  observer.observe(targetNode, config);
};

export const createImageElement = (
  imgSrc: string,
  imgId: string,
  handleClick: () => void
) => {
  const imageElement = document.createElement("img");
  imageElement.id = imgId;
  imageElement.src = imgSrc;
  imageElement.addEventListener("click", () => handleClick());

  return imageElement;
};

export const updateTweetTextArea = (tweetText: string) => {
  const tweetTextArea = document.querySelectorAll(
    '[data-text="true"], [data-testid="tweetTextarea_0"]'
  );
  tweetTextArea.forEach((tweetTextArea) => {
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
  });
};

export const styleText = `
#x-compute-button-img {
  width: 25px;
  height: 25px;
  margin-left: 5px;
}

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
`;
