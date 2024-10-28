"use client";

import React, { useEffect } from "react";
import Form from "./form";
import Results from "./results";

const SaasApp: React.FC = () => {
  const AWS_ENDPOINT_BEFORE: string =
    "https://aawc0obe06.execute-api.us-west-2.amazonaws.com/prod";
  const [prompt, setPrompt] = React.useState("");
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [snippet, setSnippet] = React.useState(``);
  const [hasResults, setHasResults] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    fetch(`${AWS_ENDPOINT_BEFORE}/snippet_keywords?msg=${prompt}`)
      .then((res) => res.json())
      .then((data) => {
        setKeywords(data.keywords);
        setSnippet(data.snippet);
        setHasResults(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isLoading) {
      document
        .getElementById("submitButton")
        ?.setAttribute("disabled", "disabled");
    }
  }, [isLoading]);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-[var(--pmBg)] gap-4 overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(100% 100% at 50% 50%, var(--bgG2), var(--bgG1) 50%",
      }}
    >
      <Form
        prompt={prompt}
        setPrompt={setPrompt}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
      {hasResults && <Results keywords={keywords} snippet={snippet} />}
    </div>
  );
};

export default SaasApp;
