// library
import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { getMoment } from './utils/helpers'

// images
import { ThemeProvider } from '@emotion/react'

// components
import WeatherCard from './views/WeatherCard'

// theme
const theme = {
  light: {
    backgroundColor: '#ededed',
    foregroundColor: '#f9f9f9',
    boxShadow: '0 1px 3px 0 #999999',
    titleColor: '#212121',
    temperatureColor: '#757575',
    textColor: '#828282'
  },
  dark: {
    backgroundColor: '#1F2022',
    foregroundColor: '#121416',
    boxShadow:
      '0 1px 4px 0 rgba(12, 12, 13, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.15)',
    titleColor: '#f9f9fa',
    temperatureColor: '#dddddd',
    textColor: '#cccccc'
  }
}

// accu api
// sKrX8HgKnprwshKWA2c0z9B8gSnuvLi1
// Vl4ShXFx793OuUPAtKGCYrwuWDwuxfAZ
const AUTHORIZATION_KEY = 'sKrX8HgKnprwshKWA2c0z9B8gSnuvLi1'
const LOCATION_ID = '4-315078_1_AL'
const LANGUAGE = 'zh-tw'
const CONDITION_URL = `http://dataservice.accuweather.com/currentconditions/v1/${LOCATION_ID}
?apikey=${AUTHORIZATION_KEY}&details=true&language=${LANGUAGE}`
const FORECAST_URL = `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${LOCATION_ID}
?apikey=${AUTHORIZATION_KEY}&details=true&metric=true&language=${LANGUAGE}`

// style
const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const fetchCurrentWeather = () => {
  return fetch(FORECAST_URL)
    .then((res) => res.json())
    .then((data) => {
      const forecastData = data.DailyForecasts[0]
      return {
        locationName: '台北市',
        windSpeed: forecastData.Day.Wind.Speed.Value,
        rainPossibility: forecastData.Day.RainProbability,
        observationTime: forecastData.Day.Date
      }
    })
}

const fetchWeatherCondition = () => {
  return fetch(CONDITION_URL)
    .then((res) => res.json())
    .then((data) => {
      return {
        description: data[0].WeatherText,
        temperature: data[0].Temperature.Metric.Value,
        weatherCode: data[0].WeatherIcon,
        isLoading: false
      }
    })
}

function App() {
  // state
  const [currentTheme, setCurrentTheme] = useState('dark')
  const [currentWeather, setCurrentWeather] = useState({
    locationName: '台北市',
    description: '',
    windSpeed: 0,
    temperature: 0,
    rainPossibility: 0,
    observationTime: new Date(),
    isLoading: true
  })

  // des
  const moment = useMemo(() => getMoment('臺北市'), [])

  // function
  const fetchData = async () => {
    setCurrentWeather((pre) => ({
      ...pre,
      isLoading: true
    }))
    const [currentWeatherData, conditionData] = await Promise.all([
      fetchCurrentWeather(),
      fetchWeatherCondition()
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
  }, [])
  useEffect(() => {
    setCurrentTheme(moment === 'day' ? 'light' : 'dark')
  }, [moment])

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <WeatherCard
          currentWeather={currentWeather}
          moment={moment}
          fetchData={fetchData}
        />
      </Container>
    </ThemeProvider>
  )
}

export default App
