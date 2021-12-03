import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../App';
import Header from './Header';
import TabsComponent from './TabsComponent';
import Footer from './Footer';

function ToggleColorMode() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            height: '110vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            p: 0,
        }}>
            <Header />
            <Box sx={{position: 'absolute', top:0 , right:0}}>
                <IconButton onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
            </Box>
            <TabsComponent />
            <Footer />
        </Box>
    )
}

export default ToggleColorMode;
