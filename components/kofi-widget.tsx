"use client";

export function KofiWidget() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <iframe
        id="kofiframe"
        src="https://ko-fi.com/monuit/?hidefeed=true&widget=true&embed=true&preview=true"
        style={{
          border: "none",
          width: "100%",
          padding: "4px",
          background: "#f9f9f9",
        }}
        height="712"
        title="monuit"
        className="rounded-2xl shadow-2xl"
      />
    </div>
  );
}
