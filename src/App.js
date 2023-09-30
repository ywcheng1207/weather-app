// library
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import dayjs from 'dayjs'

// images
import { ThemeProvider } from '@emotion/react'
import { ReactComponent as AirFlowIcon } from './images/airFlow.svg'
import { ReactComponent as DayCloudyIcon } from './images/day-cloudy.svg'
import { ReactComponent as RainIcon } from './images/rain.svg'
import { ReactComponent as RefreshIcon } from './images/refresh.svg'

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
const AUTHORIZATION_KEY = 'Vl4ShXFx793OuUPAtKGCYrwuWDwuxfAZ'
const url =
  'http://dataservice.accuweather.com/forecasts/v1/daily/1day/4-315078_1_AL'

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
  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
`

const DayCloudy = styled(DayCloudyIcon)`
  flex-basis: 30%;
`

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark')
  const [currentWeather, setCurrentWeather] = useState({
    locationName: '台北市',
    description: '多雲',
    windSpeed: '1.1',
    temperature: 22.9,
    rainPossibility: 48.3,
    observationTime: '2023-09-30T12:43:00+08:00',
    isLoading: true
  })

  const handleTheme = () => () => {
    currentTheme === 'light'
      ? setCurrentTheme('dark')
      : setCurrentTheme('light')
  }

  const fetchCurrentWeather = () => {
    setCurrentWeather((pre) => ({ ...pre, isLoading: true }))
    fetch(
      `${url}?apikey=${AUTHORIZATION_KEY}&details=true&metric=true&language=zh-tw`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = data.DailyForecasts[0]
        const headLineData = data.Headline
        setCurrentWeather({
          locationName: '台北市',
          description: headLineData.Text,
          windSpeed: forecastData.Day.Wind.Speed.Value,
          temperature: forecastData.Temperature.Maximum.Value,
          rainPossibility: forecastData.Day.RainProbability,
          observationTime: forecastData.Day.Date,
          isLoading: false
        })
      })
  }

  useEffect(() => {
    fetchCurrentWeather()
  }, [])

  return (
    <ThemeProvider theme={theme[currentTheme]}>
      <Container>
        <WeatherCard onClick={handleTheme()}>
          <Location>{currentWeather.locationName}</Location>
          <Description>{currentWeather.description}</Description>
          <CurrentWeather>
            <Temperature>
              {Math.round(currentWeather.temperature)}
              <Celsius>℃</Celsius>
            </Temperature>
            <DayCloudy />
          </CurrentWeather>
          <AirFlow>
            <AirFlowIcon />
            {currentWeather.windSpeed} m/h
          </AirFlow>
          <Rain>
            <RainIcon />
            {currentWeather.rainPossibility}%
          </Rain>
          <Refresh>
            最後觀測時間：
            {new Intl.DateTimeFormat('zh-TW', {
              hour: 'numeric',
              minute: 'numeric'
            }).format(dayjs(currentWeather.observationTime))}{' '}
            <RefreshIcon onClick={() => fetchCurrentWeather()} />
          </Refresh>
        </WeatherCard>
      </Container>
    </ThemeProvider>
  )
}

export default App
