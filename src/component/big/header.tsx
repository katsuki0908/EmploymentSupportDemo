import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { Box, CssBaseline, Toolbar, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, Typography } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkIcon from '@mui/icons-material/Work';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LogoutButton from '../mid/logout_button';
import Link from 'next/link';
import BuildIcon from '@mui/icons-material/Build';
import { useSession } from 'next-auth/react';
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
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
  backgroundColor: 'primary.main',
}));

export default function Header() {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  const student_side_bar_item =
    [
      { text: 'トップページ', url: '/top', icon: <HomeIcon /> }, //学生用サイドバー表示内容
      { text: '求人一覧閲覧', url: '/joblist', icon: <WorkIcon /> },
      { text: 'マイページ', url: '/mypage', icon: <AccountBoxIcon /> },
      { text: 'キャリア活動編集', url: '/edit_career', icon: <EditNoteIcon /> },
    ];
  const admin_side_bar_item =
    [
      { text: 'トップページ', url: '/top', icon: <HomeIcon /> }, //管理者用サイドバー表示内容
      { text: '求人一覧閲覧', url: '/joblist', icon: <WorkIcon /> },
      { text: 'ユーザー管理', url: '/usermanage3', icon: <EditNoteIcon /> },
      { text: 'プロフィール編集', url: '/edit_profile', icon: <EditNoteIcon /> },
      { text: 'お知らせ編集ページ', url: '/edit_notice', icon: <EditNoteIcon /> },
      { text: '求人票編集', url: '/edit_joblist', icon: <EditNoteIcon /> },
      { text: '各種設定', url: '/config', icon: <BuildIcon /> },
    ];
  const side_bar_item = session?.user.user_type === 'student' ? student_side_bar_item : admin_side_bar_item;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <CssBaseline />
      <Box sx={{ display: 'flex', backgroundColor: 'secondary.main' }}>
        <AppBar position="fixed" open={open} sx={{ backgroundColor: 'primary.main', display: { xs: 'flex', md: 'flex', height: '7vh' } }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              size='large'
              sx={{ ...(open && { display: 'none' }), mt: 1, mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            <Link href='/top'>
              <Typography variant="h6" noWrap sx={{ mt: 1 }} color="white" component="div">
                福岡大学就活支援
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        <Main open={open}>
          <DrawerHeader />
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: 'secondary.main',
              color: 'primary.main'
            },
          }}
          variant="temporary" // Changed from "persistent" to "temporary"
          anchor="left"
          open={open}
          onClose={handleDrawerClose} // Add this line to handle closing the drawer
        >
          <DrawerHeader sx={{ backgroundColor: 'primary.main', height: '7vh' }}>
            <Typography color='white' sx={{ flexGrow: 1, ml: 2 }}>サイドバー</Typography>
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {side_bar_item.map((item) => ( //サイドバーの内容を表示する
              <ListItem key={item.text} disablePadding>
                <ListItemButton href={item.url}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(2) }}>
            <LogoutButton />
          </Box>
        </Drawer>
      </Box>
    </>
  );
}