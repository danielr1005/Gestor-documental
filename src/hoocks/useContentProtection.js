import { useEffect } from "react";

export default function useContentProtection(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const preventDefault = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();

      if (
        (event.ctrlKey || event.metaKey) &&
        ["c", "x", "v", "p", "s"].includes(key)
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("copy", preventDefault);
    document.addEventListener("cut", preventDefault);
    document.addEventListener("paste", preventDefault);
    document.addEventListener("contextmenu", preventDefault);
    document.addEventListener("selectstart", preventDefault);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("cut", preventDefault);
      document.removeEventListener("paste", preventDefault);
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("selectstart", preventDefault);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);
}