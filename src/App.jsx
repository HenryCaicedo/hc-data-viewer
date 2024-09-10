import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DataTabs from './components/DataTabs'
import { Box, Card, CardContent, Typography } from '@mui/material'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Card variant='elevation' sx={{ margin: 5, height: 1, padding: 5 }}>
      <CardContent>
        <Typography variant='h3' component='h1' fontWeight={500} gutterBottom>HC Data Viewer</Typography>
        <DataTabs />
      </CardContent>
    </Card>
  )
}

export default App
