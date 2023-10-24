import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import HomeIcon from '@mui/icons-material/Home';
import { Button, Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {Avatar} from '@mui/material';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import {Typography} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {Drawer,Divider,List,ListItem} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import fu_logo from '../../../public/images/fu_logo'


const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff',
      dark: '#ffffff',
    },
    secondary:{
      main: '#b3424a',
    }
  },
});


const drawerWidth = 290;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}


const AppBars = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));


export default function Header() {

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

    return (
      <ThemeProvider theme={theme}>
         <CssBaseline />
      <Box sx={{ display: 'flex',backgroundcolor:'secondary.main'}}>
       
        {/* <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 ,backgroundColor:'secondary.main', display: { xs: 'none', md: 'flex' } }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1,backgroundColor:'secondary.main' }}>
              <IconButton aria-label="delete">
                <HomeIcon />
              </IconButton>
              <Button color="primary" href='/'>トップページ</Button>
              <Button color="primary" href='/joboffer'>求人一覧</Button>
              <Button color="primary" href='/mypage'>マイページ</Button>
              <Button color="primary">サイトマップ</Button>
              <Button color="primary" href="auth/signin">ログイン</Button>
            </Box>
  
            <Stack direction="row" spacing={2}>
            <Avatar alt="hiroto"/>
            <Button variant='contained' color="inherit">就活状況登録</Button>
            </Stack>
          </Toolbar>
        </AppBar> */}
        <AppBars position="fixed" open={open} sx={{backgroundColor:'secondary.main', display: { xs: 'flex', md: 'flex',height:70 } }}>
        <Toolbar>
          <Typography variant="h5" noWrap sx={{ flexGrow: 1,mt:2 }} color="primary" component="div">
            ロゴマークが入るよ
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            size='large'
            sx={{ ...(open && { display: 'none' }) ,mt:1}}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBars>
      <Main open={open}>
        <DrawerHeader />
        </Main>
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
          サイドバー
        </DrawerHeader>

        <Divider />
        <List>
          {['トップページ', '求人一覧閲覧', 'マイページ', 'キャリア活動編集','プロフィール編集','お知らせ編集ページ','求人票編集','ログアウト',].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton href='/auth/signin'>
                <ListItemIcon>
                  {index % 1 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      </Box>
      </ThemeProvider>
    );
  }