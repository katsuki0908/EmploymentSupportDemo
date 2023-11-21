import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import {Drawer,Divider,List,ListItem,IconButton,Typography} from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkIcon from '@mui/icons-material/Work';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ListItemText from '@mui/material/ListItemText';
import  LogoutButton from '../mid/logout_button';

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

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const side_bar_item = [{ text: 'ユーザー管理ページ', url: '/usermanage',icon: <HomeIcon/> }, //サイドバー表示内容
    { text: '求人一覧閲覧', url: '/joblist', icon: <WorkIcon/> },
    { text: 'マイページ', url: '/mypage', icon: <AccountBoxIcon/> },
    { text: 'キャリア活動編集', url: '/edit_career', icon: <EditNoteIcon/> },
    { text: 'プロフィール編集', url: '/edit_profile', icon: <EditNoteIcon/> },
    { text: 'お知らせ編集ページ', url: '/edit_notice', icon: <EditNoteIcon/> },
    { text: '求人票編集', url: '/edit_joblist', icon: <EditNoteIcon/> },
    { text: 'ユーザー管理ページ', url: '/usermanage', icon: <EditNoteIcon/> }, //@@@@@
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
         <CssBaseline />
      <Box sx={{ display: 'flex',backgroundcolor:'secondary.main'}}>
        <AppBars position="fixed" open={open} sx={{backgroundColor:theme.palette.primary.main, display: { xs: 'flex', md: 'none',height:55 } }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1,mt:2 }} color="primary" component="div">
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
            <ChevronRightIcon />
          </IconButton>
          <Typography>サイドバー</Typography>
        </DrawerHeader>
        <Divider />
        <List>
          {side_bar_item.map((item) => ( //サイドバーの内容を表示する
            <ListItem key={item.text} disablePadding>
              <ListItemButton href={item.url}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text}/>
              </ListItemButton>
           
            </ListItem>
            
          ))}
             <LogoutButton/>
        </List>
      </Drawer>
      </Box>
    </>
  );
}