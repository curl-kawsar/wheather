import { XCircle } from 'lucide-react';

const WeatherCard = ({ city, isCelsius, onRemove }) => {
  const temperature = isCelsius ? city.temp : city.temp_f;
  const feelsLike = isCelsius ? city.feels_like : city.feels_like_f;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 relative">
      <button
        onClick={onRemove}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
        aria-label="Remove city"
      >
        <XCircle className="w-6 h-6" />
      </button>

      <div className="text-center">
        <h2 className="text-xl font-bold mb-2">
          {city.name}
          {city.country && `, ${city.country}`}
        </h2>
        
        <div className="flex items-center justify-center mb-4">
          <img
            src={city.icon}
            alt={city.condition}
            className="w-16 h-16"
          />
          <div className="text-center">
            <div className="text-3xl font-bold">
              {Math.round(temperature)}°{isCelsius ? 'C' : 'F'}
            </div>
            <div className="text-sm text-gray-600">
              Feels like: {Math.round(feelsLike)}°{isCelsius ? 'C' : 'F'}
            </div>
          </div>
        </div>

        <p className="text-lg text-gray-700 mb-2 capitalize">
          {city.condition}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div>
            <p className="font-semibold">Humidity</p>
            <p>{city.humidity}%</p>
          </div>
          <div>
            <p className="font-semibold">Wind</p>
            <p>{isCelsius ? city.windSpeed : city.windSpeedMph} {isCelsius ? 'km/h' : 'mph'} {city.wind_dir}</p>
          </div>
          <div>
            <p className="font-semibold">Pressure</p>
            <p>{city.pressure} hPa</p>
          </div>
          <div>
            <p className="font-semibold">Visibility</p>
            <p>{city.visibility} km</p>
          </div>
        </div>

        <div className="text-xs text-gray-500 mt-4">
          Last updated: {city.last_updated}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard; 