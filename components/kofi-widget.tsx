"use client";

export function KofiWidget() {
  return (
    <div className="fixed right-4 bottom-4 z-50">
      <iframe
        className="rounded-2xl shadow-2xl"
        height="712"
        id="kofiframe"
        src="https://ko-fi.com/monuit/?hidefeed=true&widget=true&embed=true&preview=true"
        style={{
          border: "none",
          width: "100%",
          padding: "4px",
          background: "#f9f9f9",
        }}
        title="monuit"
      />
    </div>
  );
}
