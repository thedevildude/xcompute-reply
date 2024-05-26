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
const addButtonToToolbar = (toolBar: Element) => {
  if (toolBar.querySelector("#x-compute-button") === null) {
    const div = document.createElement("div");
    div.id = "x-compute-button";
    const sRoot = div.attachShadow({ mode: "open" });
    
    const imgSrc = `chrome-extension://${chrome.runtime.id}/icon16.png`;
    const imgElement = document.createElement("img");
    imgElement.id = "x-compute-button-img";
    imgElement.src = imgSrc;
    imgElement.addEventListener("click", () =>
      handleXComputeClick()
    );
    sRoot.append(imgElement);
    // Insert the button into the toolbar
    toolBar.insertAdjacentElement("afterbegin", div);
  }
};

observeElement('[data-testid="toolBar"]', (toolBar) => {
  addButtonToToolbar(toolBar);
  console.log("Button added to toolbar");
});
