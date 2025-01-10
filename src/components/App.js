//<p>Now I can render any React component on any DOM node I want using ReactDOM.render</p>
import React, { useState, useEffect } from "react";
function App() {
  const [markdown, setMarkdown] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const parseMarkdown = (text) => {
    text = text.replace(/^#\s(.*$)/gim, "<h1>$1</h1>");
    text = text.replace(/^##\s(.*$)/gim, "<h2>$1</h2>");
    text = text.replace(/^###\s(.*$)/gim, "<h3>$1</h3>");
    text = text.replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>");
    text = text.replace(/\*(.*?)\*/gim, "<i>$1</i>");
    text = text.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>');
    text = text.replace(/\n/gim, "<br>");
    return text.trim();
  };
  
  const handleInputChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div className="app">
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          <textarea
            className="textarea"
            placeholder="Write your markdown here..."
            value={markdown}
            onChange={handleInputChange}
          ></textarea>
          <div
            className="preview"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(markdown) }}
          ></div>
        </>
      )}
    </div>
  );
}

export default App;
