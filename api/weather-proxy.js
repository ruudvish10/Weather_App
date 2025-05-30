// Vercel expects this default export for serverless functions
export default async (req, res) => {
const {city} = req.query;                                           // Extract city from URL query

// Build OpenWeather API URL with environment variable
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${process.env.API_KEY}`;

const response = await fetch(url);                                  // Forward request to OpenWeather
const data = await response.json();                                 // Parse JSON response

res.json(data);                                                     // Send weather data back to frontend

};


