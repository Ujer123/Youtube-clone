import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { AiFillYoutube, AiOutlineShopping } from "react-icons/ai";
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { blue, green, red } from '@mui/material/colors';
import { CiStreamOn } from "react-icons/ci";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { FaRegBell, FaMicrophone, FaFire, FaGamepad, FaRegNewspaper, FaTrophy, FaRegLightbulb } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { GiClothes } from "react-icons/gi";
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { MdOutlineSubscriptions, MdOutlineMovie, MdOutlinePodcasts } from "react-icons/md";
import PersonIcon from '@mui/icons-material/Person';
import { RiVideoAddLine, RiMusicLine } from "react-icons/ri";
import { styled, alpha } from '@mui/material/styles';
import { SiYoutubeshorts } from "react-icons/si";
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { counterContext } from '../Context/Context';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginLeft: 0,
  width: '80%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <List sx={{ pt: 0 }}>
        {emails.map((email, index) => (
          <ListItem disableGutters key={email}>
            <ListItemButton onClick={() => handleListItemClick(email)}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: index === 0 ? blue[100] : green[100], color: index === 0 ? blue[600] : green[600] }}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}


export default function SearchAppBar({setCategory}) {

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const{check, setCheck} = React.useContext(counterContext);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [isPersonIcon, setIsPersonIcon] = React.useState(false);
  const [selectedEmailIndex, setSelectedEmailIndex] = React.useState(null);


  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setCheck(!check)
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloses = (value, index) => {
    setOpen(false);
    setSelectedValue(value);
    setSelectedEmailIndex(index);
    setIsPersonIcon(emails.includes(value));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar  className='bg-black'>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            className='font-extrabold'
          >
            <div className='flex title-dis'>

            <AiFillYoutube className='text-red-600  text-2xl sm:text-3xl'/> <span className='font-bold'>YouTube</span>  <sup className='text-sm'>IN</sup>
            </div>
          </Typography>
          <Search className='search_inp border rounded-xl'>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <FaRegBell className='text-xl absolute right-10 sm:right-20 sm:text-2xl'/>
          <RiVideoAddLine className='text-xl absolute right-16 sm:text-2xl sm:right-36'/>
          <FaMicrophone className='mic'/>
          {auth && (
            <div className='account'>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                  {isPersonIcon ? (
                  <Avatar sx={{ bgcolor: selectedEmailIndex === 0 ? blue[100] : green[100], color: selectedEmailIndex === 0 ? blue[600] : green[600] }}>
                    <PersonIcon />
                  </Avatar>
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                  justifyContent: 'end'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClickOpen} onClose={handleCloses}>Profile</MenuItem>
                <SimpleDialog
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleCloses}
                />
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <div className='relative z-10 h-full'>

      
        <ul className={` top-14 text-xl duration-500 bg-black text-white 
          ${check ? 'small-side fixed' : 'left-[0]  overflow-y-auto h-[100vh] fixed small-mob'}`}>
          <li onClick={()=> setCategory(0)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><FaHouse className='pt-1 mr-4 '/><p>Home</p></li>
          <li className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><SiYoutubeshorts className='pt-1 mr-4'/><p>Short</p></li>
          <li className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><MdOutlineSubscriptions className='pt-1 mr-4 sm:text-2xl'/><p>Subscription</p></li>
          <hr />
          <h2>Explore</h2>
          <li onClick={()=> setCategory(2)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><FaFire className='pt-1 mr-4 '/><p>Trending</p></li>
          <li onClick={()=> setCategory(15)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><AiOutlineShopping className='pt-1 mr-4 '/><p>Shopping</p></li>
          <li onClick={()=> setCategory(10)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><RiMusicLine className='pt-1 mr-4 '/><p>Music</p></li>
          <li onClick={()=> setCategory(1)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><MdOutlineMovie className='pt-1 mr-4 '/><p>Movies</p></li>
          <li onClick={()=> setCategory(21)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><CiStreamOn className='pt-1 mr-4 '/><p>Live</p></li>
          <li onClick={()=> setCategory(20)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><FaGamepad className='pt-1 mr-4 '/><p>Gaming</p></li>
          <li onClick={()=> setCategory(25)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><FaRegNewspaper className='pt-1 mr-4 '/><p>News</p></li>
          <li onClick={()=> setCategory(17)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><FaTrophy className='pt-1 mr-4 '/><p>Sports</p></li>
          <li onClick={()=> setCategory(27)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><FaRegLightbulb className='pt-1 mr-4 '/><p>Courses</p></li>
          <li onClick={()=> setCategory(26)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><GiClothes className='pt-1 mr-4 '/><p>Fashion & Beauty</p></li>
          <li onClick={()=> setCategory(22)} className='p-2 flex cursor-pointer hover:bg-gray-800 m-4 rounded-3xl text-lg'><MdOutlinePodcasts className='pt-1 mr-4 '/><p>Podcasts</p></li>
        </ul>
      
      </div>
    </Box>

  );
}
