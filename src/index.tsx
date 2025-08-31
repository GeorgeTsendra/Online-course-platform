import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { config } from "./utils/configInstance";

async function enableMocks() {
  if (config.NODE_ENV === "development") {
    const { worker } = await import("./mocks/browser");
    await worker.start({
      serviceWorker: { url: "/mockServiceWorker.js" },
    });
  }
}

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  enableMocks().then(() => {
    root.render(<App />);
  });
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
