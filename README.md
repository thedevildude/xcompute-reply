# xCompute Reply Chrome Extension

With just a click, you can quickly add either the current reply tweet or the main original tweet of the conversation thread into your tweet reply input.

## Features

- **Insert Reply Tweet**: Click the left button to insert the text of the current reply tweet from the conversation thread into the reply input box.
- **Insert Main Tweet**: Click the right button to insert the text of the main original tweet of the conversation thread into the reply input box.

## How to Use

1. Ensure you have Node.js installed on your system.
2. Clone the repository:

    ```bash
    git clone https://github.com/thedevildude/xcompute-reply.git
    ```

3. Navigate to the project directory and install dependencies:

    ```bash
    cd xcompute-reply
    npm install
    ```

4. Build the extension:

    ```bash
    npm run build
    ```

5. Open Google Chrome and go to the Extensions page (chrome://extensions/).
6. Enable Developer mode by toggling the switch at the top right.
7. Click on "Load unpacked" and select the `dist` folder created after building the extension.
8. The xCompute Reply extension should now be installed and active in your browser.
9. Visit Twitter (https://x.com) and navigate to any conversation thread to see the buttons in action.
