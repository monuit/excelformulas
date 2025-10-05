"use client";

export function KofiButton() {
  return (
    <div className="flex items-center justify-center">
      <a 
        href="https://ko-fi.com/Z8Z51MBSO5" 
        target="_blank" 
        rel="noopener noreferrer"
        className="transition-transform hover:scale-105"
      >
        <img
          height="36"
          style={{ border: 0, height: 36 }}
          src="https://storage.ko-fi.com/cdn/kofi6.png?v=6"
          alt="Buy Me a Coffee at ko-fi.com"
        />
      </a>
    </div>
  );
}
