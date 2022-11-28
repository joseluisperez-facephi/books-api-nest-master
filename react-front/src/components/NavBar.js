import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, useNavigate} from "react-router-dom";

export default function NavBar() {

  const navigate = useNavigate()

  return (
      <Box sx={{flexGrow: 1}}>
        <AppBar position='static' color='transparent'>
          <Container>
            <Toolbar>
                <Typography sx={{ flexGrow: 1 }}>
                  <Link to="/"> INICIO </Link >
                </Typography>

              
            </Toolbar>
          </Container>
        </AppBar>

      </Box>
  )
}
