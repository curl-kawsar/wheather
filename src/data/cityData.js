// Cities organized by regions
export const cityData = {
  bangladesh: {
    name: "Bangladesh",
    cities: [
      // Divisions
      "Dhaka",
      "Chittagong",
      "Sylhet",
      "Rajshahi",
      "Khulna",
      "Barisal",
      "Rangpur",
      "Mymensingh",
      // Major Districts and Cities
      "Narayanganj",
      "Gazipur",
      "Comilla",
      "Cox's Bazar",
      "Jessore",
      "Bogra",
      "Dinajpur",
      "Tangail",
      "Faridpur",
      "Jamalpur",
      "Pabna",
      "Kushtia",
      "Rangamati",
      "Feni",
      "Chandpur",
      "Brahmanbaria",
      "Noakhali",
      "Barguna",
      "Bhola",
      "Jhalokati",
      "Patuakhali",
      "Pirojpur",
      "Bandarban",
      "Khagrachari",
      "Lakshmipur",
      "Shariatpur",
      "Madaripur",
      "Gopalganj",
      "Narsingdi",
      "Munshiganj",
      "Rajbari",
      "Kishoreganj",
      "Manikganj",
      "Netrokona",
      "Sherpur",
      "Sunamganj",
      "Habiganj",
      "Moulvibazar",
      "Natore",
      "Chapainawabganj",
      "Naogaon",
      "Joypurhat",
      "Sirajganj",
      "Satkhira",
      "Meherpur",
      "Narail",
      "Chuadanga",
      "Magura",
      "Lalmonirhat",
      "Nilphamari",
      "Gaibandha",
      "Thakurgaon",
      "Panchagarh",
      "Kurigram"
    ]
  },
  southAsia: {
    name: "South Asia",
    cities: [
      // India
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Kolkata",
      "Chennai",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      // Pakistan
      "Karachi",
      "Lahore",
      "Islamabad",
      "Rawalpindi",
      // Nepal
      "Kathmandu",
      "Pokhara",
      // Sri Lanka
      "Colombo",
      "Kandy",
      // Maldives
      "Male"
    ]
  },
  eastAsia: {
    name: "East Asia",
    cities: [
      // China
      "Beijing",
      "Shanghai",
      "Hong Kong",
      "Guangzhou",
      "Shenzhen",
      // Japan
      "Tokyo",
      "Osaka",
      "Kyoto",
      "Yokohama",
      // South Korea
      "Seoul",
      "Busan",
      // Taiwan
      "Taipei",
      "Kaohsiung"
    ]
  },
  europe: {
    name: "Europe",
    cities: [
      // UK
      "London",
      "Manchester",
      "Birmingham",
      // France
      "Paris",
      "Lyon",
      "Marseille",
      // Germany
      "Berlin",
      "Munich",
      "Hamburg",
      // Italy
      "Rome",
      "Milan",
      "Venice",
      // Spain
      "Madrid",
      "Barcelona",
      "Valencia",
      // Other Major European Cities
      "Amsterdam",
      "Brussels",
      "Vienna",
      "Prague",
      "Stockholm",
      "Copenhagen",
      "Oslo",
      "Helsinki",
      "Warsaw",
      "Budapest",
      "Athens",
      "Lisbon",
      "Dublin"
    ]
  },
  northAmerica: {
    name: "North America",
    cities: [
      // USA
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
      "Miami",
      "Las Vegas",
      "Seattle",
      "Boston",
      "Denver",
      "Washington DC",
      "Atlanta",
      "San Francisco",
      // Canada
      "Toronto",
      "Vancouver",
      "Montreal",
      "Calgary",
      "Ottawa",
      // Mexico
      "Mexico City",
      "Guadalajara",
      "Monterrey"
    ]
  },
  middleEast: {
    name: "Middle East",
    cities: [
      "Dubai",
      "Abu Dhabi",
      "Doha",
      "Riyadh",
      "Jeddah",
      "Muscat",
      "Kuwait City",
      "Manama",
      "Tehran",
      "Istanbul",
      "Ankara",
      "Tel Aviv",
      "Jerusalem"
    ]
  },
  australia: {
    name: "Australia & Oceania",
    cities: [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Perth",
      "Adelaide",
      "Auckland",
      "Wellington",
      "Christchurch"
    ]
  }
};

// Function to get all cities as a flat array
export const getAllCities = () => {
  return Object.values(cityData)
    .reduce((acc, region) => {
      return [...acc, ...region.cities];
    }, [])
    .sort();
};

// Function to search cities
export const searchCities = (query) => {
  const normalizedQuery = query.toLowerCase();
  return getAllCities()
    .filter(city => city.toLowerCase().includes(normalizedQuery))
    .map(city => ({
      value: city,
      label: city
    }));
};

export default cityData; 