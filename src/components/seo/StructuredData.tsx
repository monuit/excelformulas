"use client";

import { useId } from "react";

interface StructuredDataProps {
  data: unknown | unknown[];
}

export function StructuredData({ data }: StructuredDataProps) {
  const id = useId();
  const payload = Array.isArray(data) ? data : [data];

  return payload.map((entry, index) => (
    <script
      key={`${id}-${index}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(entry),
      }}
    />
  ));
}
