import React, { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  onContentEndVisible: () => void;
};

interface IntersectionObserverInit {
  root: Element | null;
  rootMargin: string;
  threshold: number;
}

export function Observer({ children, onContentEndVisible }: Props) {
  const endContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
