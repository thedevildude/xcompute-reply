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

const addButtonToToolbar = (toolbar: Element) => {
  // Check if the button already exists
  if (toolbar.querySelector('.x-compute-button')) {
    return;
  }
  
  const button = document.createElement("button");
  button.textContent = "Click Me";
  button.className = "x-compute-button";
  button.addEventListener("click", () => {
    alert("Button clicked!");
  });

  toolbar.appendChild(button);
};

// Detect when the toolbar is added to the DOM and add a button to it
observeElement('[data-testid="toolBar"]', (toolbar) => {
  addButtonToToolbar(toolbar);
  console.log("Button added to toolbar");
});
