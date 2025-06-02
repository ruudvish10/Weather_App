# 🌦️ Weather-App

This is a clean, responsive weather application built with modern JavaScript that displays current and forecasted weather conditions for any location worldwide.

## ✨ Features

- **Real-time Weather Data**  
  Fetches current conditions (temperature, humidity, wind) from OpenWeather API
- **5-Day Forecast**  
  Shows midday weather predictions with min/max temperatures
- **Error Resilient**  
  Gracefully handles invalid locations and API failures
- **Responsive Design**  
  Works on mobiles/desktops

## 🛠️ Technical Implementation

- **Frontend**: Vanilla JS (ES6+) with DOM manipulation
- **Backend**: Vercel serverless proxy (hides API keys)
- **Architecture**:
  - Separation of concerns (UI/logic/data layers)
  - Async/await for API calls
  - Dynamic DOM updates

## 🚀 Learning Outcomes

- API integration with error handling
- Modern JavaScript (destructuring, optional chaining)
- Serverless function deployment
- Responsive CSS techniques
- Environment variable security

## 🔍 Try It Live

- https://weather-app-delta-three-68.vercel.app/

## 📦 Setup

In your terminal:
- git clone https://github.com/yourusername/weather-app.git
- cd weather-app
- vercel dev  # Requires Vercel CLI