"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  latitude: number | null;
  longitude: number | null;
  city: string;
  country: string;
  temperature: number | null;
  temperatureUnit: string;
  weatherCode?: number;
  timezone?: string;
  error?: string;
};

const getWeatherDescription = (code: number | undefined): string => {
  if (!code) return "";

  // WMO Weather interpretation codes
  if (code === 0) return "Clear";
  if (code <= 3) return "Partly Cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 67) return "Rainy";
  if (code <= 77) return "Snowy";
  if (code <= 82) return "Showers";
  if (code <= 99) return "Thunderstorm";
  return "Unknown";
};

const getWeatherEmoji = (code: number | undefined): string => {
  if (!code) return "🌡️";

  if (code === 0) return "☀️";
  if (code <= 3) return "⛅";
  if (code <= 48) return "🌫️";
  if (code <= 67) return "🌧️";
  if (code <= 77) return "❄️";
  if (code <= 82) return "🌦️";
  if (code <= 99) return "⛈️";
  return "🌡️";
};

export function WeatherFooter({
  onWeatherClick,
}: {
  onWeatherClick: () => void;
}) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch("/api/weather");
        const data = await response.json();

        // Only show if we have valid weather data
        if (data && data.temperature !== null && !data.error) {
          setWeather(data);
          // Small delay to ensure smooth appearance
          setTimeout(() => setIsVisible(true), 100);
        }
      } catch (error) {
        console.error("Failed to fetch weather:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  // Don't render anything while loading or if no valid weather data
  if (loading || !weather?.temperature || weather?.error) {
    return null;
  }

  // Don't show until fully loaded and ready
  if (!isVisible) {
    return null;
  }

  const weatherEmoji = getWeatherEmoji(weather.weatherCode);
  const weatherDesc = getWeatherDescription(weather.weatherCode);

  return (
    <button
      className="group flex items-center gap-2 rounded-lg border bg-background px-3 py-2 text-sm shadow-sm transition-all hover:border-zinc-400 hover:shadow-md dark:hover:border-zinc-600"
      onClick={onWeatherClick}
      type="button"
    >
      <span className="text-2xl transition-transform group-hover:scale-110">
        {weatherEmoji}
      </span>
      <div className="flex flex-col items-start">
        <div className="flex items-baseline gap-1">
          <span className="font-semibold text-base">
            {Math.round(weather.temperature)}
            {weather.temperatureUnit}
          </span>
          {weatherDesc && (
            <span className="text-muted-foreground text-xs">{weatherDesc}</span>
          )}
        </div>
        <div className="text-muted-foreground text-xs">
          {weather.city}
          {weather.city !== "Unknown" &&
            weather.country &&
            `, ${weather.country}`}
        </div>
      </div>
      <div className="ml-2 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </button>
  );
}
