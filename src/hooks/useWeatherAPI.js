// library
import { useEffect, useState } from 'react'

const AUTHORIZATION_KEY = 'sKrX8HgKnprwshKWA2c0z9B8gSnuvLi1'
const LANGUAGE = 'zh-tw'

const fetchCurrentWeather = ({ currentCityKey }) => {
  const FORECAST_URL = `https://dataservice.accuweather.com/forecasts/v1/daily/1day/${currentCityKey}
?apikey=${AUTHORIZATION_KEY}&details=true&metric=true&language=${LANGUAGE}`

  return fetch(FORECAST_URL)
    .then((res) => res.json())
    .then((data) => {
      const forecastData = data.DailyForecasts[0]
      return {
        windSpeed: forecastData.Day.Wind.Speed.Value,
        rainPossibility: forecastData.Day.RainProbability
      }
    })
}

const fetchWeatherCondition = ({ currentCityKey }) => {
  const CONDITION_URL = `https://dataservice.accuweather.com/currentconditions/v1/${currentCityKey}
?apikey=${AUTHORIZATION_KEY}&details=true&language=${LANGUAGE}`

  return fetch(CONDITION_URL)
    .then((res) => res.json())
    .then((data) => {
      return {
        observationTime: data[0].LocalObservationDateTime,
        description: data[0].WeatherText,
        temperature: data[0].Temperature.Metric.Value,
        weatherCode: data[0].WeatherIcon,
        isLoading: false
      }
    })
}

const useWeatherAPI = ({ currentCityKey }) => {
  // state
  const [currentWeather, setCurrentWeather] = useState({
    locationName: '',
    description: '',
    windSpeed: 0,
    temperature: 0,
    rainPossibility: 0,
    isLoading: true
  })
  // function
  const fetchData = async () => {
    setCurrentWeather((pre) => ({
      ...pre,
      isLoading: true
    }))
    const [currentWeatherData, conditionData] = await Promise.all([
      fetchCurrentWeather({ currentCityKey }),
      fetchWeatherCondition({ currentCityKey })
    ])
    setTimeout(() => {
      setCurrentWeather({
        ...currentWeatherData,
        ...conditionData,
        isLoading: false
      })
    }, 300)
  }
  // effect
  useEffect(() => {
    fetchData()
  }, [currentCityKey])

  return [currentWeather, fetchData]
}

export default useWeatherAPI
