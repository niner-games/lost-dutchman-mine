import { createRoot } from "react-dom/client";
import Main from "./components/Main";

const el = document.getElementById("root");

if (el) {
  // If the root element is found, render the app into it
  const root = createRoot(el);
  root.render(<Main />);
} else {
  // If the root element is not found, create a new one
  const root = createRoot(document.body);
  root.render(<Main />);
}
