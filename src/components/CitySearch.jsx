import { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { searchCities } from '../data/cityData';

const CitySearch = ({ onCitySelect, loading }) => {
  const [inputValue, setInputValue] = useState('');

  const loadOptions = async (inputValue) => {
    if (!inputValue) return [];
    return searchCities(inputValue);
  };

  const handleChange = (selectedOption) => {
    if (selectedOption) {
      onCitySelect(selectedOption.value);
      setInputValue('');
    }
  };

  return (
    <div className="w-full md:w-96">
      <AsyncSelect
        cacheOptions
        defaultOptions
        value={null}
        inputValue={inputValue}
        onInputChange={(newValue) => setInputValue(newValue)}
        onChange={handleChange}
        loadOptions={loadOptions}
        isLoading={loading}
        placeholder="Search for a city..."
        noOptionsMessage={({ inputValue }) => 
          !inputValue ? "Start typing to search..." : "No cities found"
        }
        className="text-sm"
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: '0.5rem',
            borderColor: '#e2e8f0',
            '&:hover': {
              borderColor: '#cbd5e1',
            },
          }),
          menu: (base) => ({
            ...base,
            borderRadius: '0.5rem',
            marginTop: '0.5rem',
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#e2e8f0' : 'white',
            color: '#1e293b',
            '&:hover': {
              backgroundColor: '#e2e8f0',
            },
          }),
        }}
      />
    </div>
  );
};

export default CitySearch; 