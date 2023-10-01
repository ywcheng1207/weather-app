// library
import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { getMoment } from './utils/helpers'
import useWeatherAPI from './hooks/useWeatherAPI'

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

function App() {
  // state
  const [currentTheme, setCurrentTheme] = useState('dark')

  //
  const [currentWeather, fetchData] = useWeatherAPI({
    FORECAST_URL,
    CONDITION_URL
  })
  const moment = useMemo(() => getMoment('臺北市'), [])

  // effect
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
