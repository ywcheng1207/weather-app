// tools
import styled from '@emotion/styled'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectTheme } from './store/slice/theme'
import { selectPage } from './store/slice/page'
import { ThemeProvider } from '@emotion/react'

// components
import WeatherCard from './views/WeatherCard'
import WeatherSetting from './views/WeatherSetting'

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

// style
const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

function App() {
  const themeState = useSelector(selectTheme)
  const pageState = useSelector(selectPage)

  return (
    <ThemeProvider theme={theme[themeState.type]}>
      <Container>
        {pageState.value === 'WeatherCard' && <WeatherCard />}
        {pageState.value === 'WeatherSetting' && <WeatherSetting />}
      </Container>
    </ThemeProvider>
  )
}

export default App
