"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

interface TypingAnimationProps {
  text: string;
  duration?: number;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  duration = 200,
  className = "",
}) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const indexRef = useRef<number>(0);
  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const typingEffect = useCallback(
    (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;

      if (elapsed >= duration) {
        if (indexRef.current < text.length) {
          const nextChar = text[indexRef.current];
          if (nextChar !== undefined) {
            setDisplayedText((prev) => prev + nextChar);
            indexRef.current += 1;
            startTimeRef.current = timestamp;
          } else {
            console.error("Next character is undefined");
          }
        } else {
          if (frameRef.current) {
            cancelAnimationFrame(frameRef.current);
          }
          return;
        }
      }

      frameRef.current = requestAnimationFrame(typingEffect);
    },
    [text, duration],
  );

  useEffect(() => {
    // Reset the state and refs when text or duration changes
    setDisplayedText("");
    indexRef.current = 0;
    startTimeRef.current = null;

    frameRef.current = requestAnimationFrame(typingEffect);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [text, duration, typingEffect]);

  return (
    <h1 className={`mb-8 text-2xl font-semibold tracking-tighter ${className}`}>
      {displayedText}
    </h1>
  );
};

export default TypingAnimation;
