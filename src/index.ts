console.log("Script Loaded");

const observeElement = (
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

const handleXComputeClick = () => {
  alert("Button clicked!");
};
const addButtonToToolbar = () => {
  // Find the textarea element
  const textarea = document.querySelector('[data-testid="tweetTextarea_0"]');
  if (!textarea) {
    console.error("Textarea element not found.");
    return;
  }
  const nextSibling = textarea.nextSibling as HTMLElement;
  if (nextSibling && nextSibling.classList && nextSibling.classList.contains('x-compute-button')) {
    return;
  }
  const imgSrc = `chrome-extension://${chrome.runtime.id}/icon16.png`;
  const imgElement = document.createElement("img");
  imgElement.src = imgSrc;
  imgElement.className = "x-compute-button";
  imgElement.addEventListener("click", handleXComputeClick);

  // Appends the image element beside the textarea
  textarea.parentNode?.insertBefore(imgElement, textarea.nextSibling);
};

observeElement('[data-testid="toolBar"]', () => {
  addButtonToToolbar();
  console.log("Button added to toolbar");
});
