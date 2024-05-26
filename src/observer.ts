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