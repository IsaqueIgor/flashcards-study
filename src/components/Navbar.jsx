import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../services/supabase'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import { Logout, Home, Add } from '@mui/icons-material'

export default function Navbar({ session }) {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <AppBar position="static" color="default" elevation={1} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center" gap={4}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            color="text.primary"
            sx={{ textDecoration: 'none', fontWeight: 700 }}
          >
            FlashCards
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              component={Link}
              to="/"
              startIcon={<Home fontSize="small" />}
              color="inherit"
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              Dashboard
            </Button>
            <Button
              component={Link}
              to="/create-deck"
              startIcon={<Add fontSize="small" />}
              variant="contained"
              sx={{ textTransform: 'none', fontWeight: 500 }}
            >
              New Deck
            </Button>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="text.secondary">
            {session?.user?.email}
          </Typography>
          <Button
            onClick={handleSignOut}
            startIcon={<Logout fontSize="small" />}
            color="inherit"
            sx={{ textTransform: 'none', fontWeight: 500 }}
          >
            Sign Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
} 