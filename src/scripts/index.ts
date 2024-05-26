const isElementLoaded = async (selector: string) => {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};

isElementLoaded('[data-testid="tweetText"]').then((selector) => {
  console.log(selector && selector.textContent)
});
