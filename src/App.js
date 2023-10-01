// library
import React, { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import dayjs from 'dayjs'
import { getMoment } from './utils/helpers'

// images
import { ThemeProvider } from '@emotion/react'
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg'
// import { ReactComponent as DayCloudyIcon } from './images/day-cloudy.svg'
import { ReactComponent as RainIcon } from './images/rain.svg'
import { ReactComponent as RefreshIcon } from './images/refresh.svg'
import { ReactComponent as LoadingIcon } from './images/loading.svg'

// components
import WeatherIcon from './components/WeatherIcon'

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

const WeatherCard = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: 0 1px 3px 0 #999999;
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`

const Location = styled.div`
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transfrom: rotate(0deg);
    }
  }
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    animation: rotate infinite 1.5s linear;
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
  }
`

// const DayCloudy = styled(DayCloudyIcon)`
//   flex-basis: 30%;
// `

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
  const {
    observationTime,
    locationName,
    description,
    windSpeed,
    temperature,
    rainPossibility,
    isLoading,
    weatherCode
  } = currentWeather
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
        <WeatherCard>
          <Location>{locationName}</Location>
          <Description>{description}</Description>
          <CurrentWeather>
            <Temperature>
              {Math.round(temperature)}
              <Celsius>℃</Celsius>
            </Temperature>
            <WeatherIcon weatherCode={weatherCode} moment={moment} />
          </CurrentWeather>
          <AirFlow>
            <AirFlowIcon />
            {windSpeed} m/h
          </AirFlow>
          <Rain>
            <RainIcon />
            {rainPossibility}%
          </Rain>
          <Refresh onClick={fetchData} isLoading={isLoading}>
            最後觀測時間：
            {new Intl.DateTimeFormat('zh-TW', {
              hour: 'numeric',
              minute: 'numeric'
            }).format(dayjs(observationTime))}{' '}
            {isLoading ? <LoadingIcon /> : <RefreshIcon />}
          </Refresh>
        </WeatherCard>
      </Container>
    </ThemeProvider>
  )
}

export default App
