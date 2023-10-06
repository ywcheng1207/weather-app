// tools
import { useEffect, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { onTheme } from '../store/slice/theme'

// icons
import { ReactComponent as DayCloudy } from './../images/day-cloudy.svg'
import { ReactComponent as DayThunderstorm } from './../images/day-thunderstorm.svg'
import { ReactComponent as DayClear } from './../images/day-clear.svg'
import { ReactComponent as DayCloudyFog } from './../images/day-cloudy-fog.svg'
import { ReactComponent as DayFog } from './../images/day-fog.svg'
import { ReactComponent as DayPartiallyClearWithRain } from './../images/day-partially-clear-with-rain.svg'
import { ReactComponent as DaySnowing } from './../images/day-snowing.svg'
import { ReactComponent as NightThunderstorm } from './../images/night-thunderstorm.svg'
import { ReactComponent as NightClear } from './../images/night-clear.svg'
import { ReactComponent as NightCloudyFog } from './../images/night-cloudy-fog.svg'
import { ReactComponent as NightCloudy } from './../images/night-cloudy.svg'
import { ReactComponent as NightFog } from './../images/night-fog.svg'
import { ReactComponent as NightPartiallyClearWithRain } from './../images/night-partially-clear-with-rain.svg'
import { ReactComponent as NightSnowing } from './../images/night-snowing.svg'

// style
const IconContainer = styled.div`
  flex-basis: 30%;
  svg {
    max-height: 110px;
  }
`

const weatherTypes = {
  isThunderstorm: [15, 16, 17, 41, 42],
  isClear: [1, 2, 3, 30, 31, 32, 33, 34],
  isCloudyFog: [5, 6, 37],
  isCloudy: [4, 7, 35, 36, 38],
  isFog: [8, 11],
  isPartiallyClearWithRain: [12, 13, 14, 18, 26, 39, 40],
  isSnowing: [19, 20, 21, 22, 23, 24, 25, 29, 43, 44]
}
const weatherIcons = {
  day: {
    isThunderstorm: <DayThunderstorm />,
    isClear: <DayClear />,
    isCloudyFog: <DayCloudyFog />,
    isCloudy: <DayCloudy />,
    isFog: <DayFog />,
    isPartiallyClearWithRain: <DayPartiallyClearWithRain />,
    isSnowing: <DaySnowing />
  },
  night: {
    isThunderstorm: <NightThunderstorm />,
    isClear: <NightClear />,
    isCloudyFog: <NightCloudyFog />,
    isCloudy: <NightCloudy />,
    isFog: <NightFog />,
    isPartiallyClearWithRain: <NightPartiallyClearWithRain />,
    isSnowing: <NightSnowing />
  }
}

const weatherCodeToType = (weatherCode) => {
  const [weatherType] =
    Object.entries(weatherTypes).find(([weatherCodes]) =>
      weatherCodes.includes(Number(weatherCode))
    ) || []
  return weatherType
}

const WeatherIcon = ({ weatherCode, moment }) => {
  const [weatherIcon, setWeatherIcon] = useState()
  const weatherType = useMemo(
    () => weatherCodeToType(weatherCode),
    [weatherCode]
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (moment) {
      if (moment.split(' ').includes('pm')) {
        setWeatherIcon(weatherIcons.night[weatherType])
        dispatch(onTheme({ type: 'dark' }))
      } else {
        setWeatherIcon(weatherIcons.day[weatherType])
        dispatch(onTheme({ type: 'light' }))
      }
    }
  }, [moment])

  return <IconContainer>{weatherIcon}</IconContainer>
}

export default WeatherIcon
