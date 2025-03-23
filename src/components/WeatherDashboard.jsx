import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import WeatherCard from './WeatherCard';
import CitySearch from './CitySearch';

const STORAGE_KEY = 'weatherCities';
const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes

const WeatherDashboard = () => {
  const [cities, setCities] = useState(() => {
    // Load cities from localStorage on initial render
    const savedCities = localStorage.getItem(STORAGE_KEY);
    return savedCities ? JSON.parse(savedCities) : [];
  });
  
  const [isCelsius, setIsCelsius] = useState(() => {
    const savedPreference = localStorage.getItem('tempPreference');
    return savedPreference ? savedPreference === 'celsius' : true;
  });
  
  const [loading, setLoading] = useState(false);
  const refreshTimeoutRef = useRef(null);
  const lastRefreshRef = useRef(Date.now());

  const fetchWeatherData = useCallback(async (cityName) => {
    try {
      const options = {
        method: 'GET',
        url: `https://${process.env.NEXT_PUBLIC_RAPIDAPI_HOST}/weather/${encodeURIComponent(cityName)}`,
        headers: {
          'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          'x-rapidapi-host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST
        }
      };

      const response = await axios.request(options);
      const data = response.data;

      return {
        id: `${data.location.lat}-${data.location.lon}`,
        name: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        temp_f: data.current.temp_f,
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        windSpeedMph: data.current.wind_mph,
        condition: data.current.condition.text,
        icon: data.current.condition.icon,
        description: data.current.condition.text,
        feels_like: data.current.feelslike_c,
        feels_like_f: data.current.feelslike_f,
        pressure: data.current.pressure_mb,
        cloud: data.current.cloud,
        visibility: data.current.vis_km,
        uv: data.current.uv,
        gust: data.current.gust_kph,
        last_updated: data.current.last_updated,
        wind_dir: data.current.wind_dir
      };
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw new Error('Could not fetch weather data. Please try again.');
    }
  }, []);

  const refreshWeather = useCallback(async () => {
    if (cities.length === 0) return;

    const now = Date.now();
    if (now - lastRefreshRef.current < REFRESH_INTERVAL) {
      return;
    }

    try {
      const updatedCities = await Promise.all(
        cities.map(async (city) => {
          try {
            return await fetchWeatherData(city.name);
          } catch (error) {
            console.error(`Error updating ${city.name}:`, error);
            return city;
          }
        })
      );

      lastRefreshRef.current = now;
      setCities(updatedCities);
      toast.success('Weather data updated');
    } catch (error) {
      console.error('Error refreshing weather data:', error);
      toast.error('Error updating weather data');
    }
  }, [cities, fetchWeatherData]);

  // Initial load of weather data
  useEffect(() => {
    if (cities.length > 0) {
      refreshWeather();
    }
  }, []); // Empty dependency array for initial load only

  // Save to localStorage whenever cities change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
  }, [cities]);

  // Save temperature preference
  useEffect(() => {
    localStorage.setItem('tempPreference', isCelsius ? 'celsius' : 'fahrenheit');
  }, [isCelsius]);

  // Set up periodic refresh
  useEffect(() => {
    if (cities.length === 0) {
      if (refreshTimeoutRef.current) {
        clearInterval(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
      return;
    }

    refreshTimeoutRef.current = setInterval(refreshWeather, REFRESH_INTERVAL);

    return () => {
      if (refreshTimeoutRef.current) {
        clearInterval(refreshTimeoutRef.current);
        refreshTimeoutRef.current = null;
      }
    };
  }, [cities.length]); // Only re-run when cities.length changes

  const addCity = async (cityName) => {
    try {
      setLoading(true);
      
      // Check if city already exists
      if (cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
        toast.error('City already added');
        return;
      }

      const weatherData = await fetchWeatherData(cityName);
      setCities(prev => [...prev, weatherData]);
      toast.success('City added successfully');
    } catch (error) {
      toast.error('Failed to add city. Please try again.');
      console.error('Error adding city:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeCity = (cityId) => {
    setCities(prev => {
      const updatedCities = prev.filter(city => city.id !== cityId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCities));
      return updatedCities;
    });
    toast.success('City removed');
  };

  const toggleTemperature = () => {
    setIsCelsius(prev => !prev);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Weather Dashboard</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <CitySearch onCitySelect={addCity} loading={loading} />
        
        <button
          onClick={toggleTemperature}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Switch to {isCelsius ? '°F' : '°C'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cities.map(city => (
          <WeatherCard
            key={city.id}
            city={city}
            isCelsius={isCelsius}
            onRemove={() => removeCity(city.id)}
          />
        ))}
      </div>

      {cities.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No cities added yet. Start by searching for a city above.
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard; 