import { geolocation } from "@vercel/functions";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  try {
    const { latitude, longitude, city, country } = geolocation(request);

    // If no geolocation data available (local development), return defaults
    if (!latitude || !longitude) {
      return NextResponse.json({
        latitude: null,
        longitude: null,
        city: "Unknown",
        country: "Unknown",
        temperature: null,
        error: "Geolocation not available",
      });
    }

    // Fetch weather data from Open-Meteo API
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`
    );

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await weatherResponse.json();

    return NextResponse.json({
      latitude,
      longitude,
      city,
      country,
      temperature: weatherData.current.temperature_2m,
      temperatureUnit: weatherData.current_units.temperature_2m,
      weatherCode: weatherData.current.weather_code,
      timezone: weatherData.timezone,
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
