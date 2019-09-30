import React from 'react';

import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import PinDropIcon from '@material-ui/icons/PinDrop';
import EmailIcon from '@material-ui/icons/Email';
import ExtensionIcon from '@material-ui/icons/Extension';
import MenuIcon from '@material-ui/icons/Menu';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import InfoIcon from '@material-ui/icons/Info';
import BuildIcon from '@material-ui/icons/Build';
import TextFormatIcon from '@material-ui/icons/TextFormat';
import PaletteIcon from '@material-ui/icons/Palette';
import PersonIcon from '@material-ui/icons/Person';
import EventNoteIcon from '@material-ui/icons/EventNote';
import FaceIcon from '@material-ui/icons/Face';
import ChatIcon from '@material-ui/icons/Chat';
import DateRangeIcon from '@material-ui/icons/DateRange';

import themes from './themes';

export const configuredTheme = themes[0].theme;

export const configuredLayout = {
  currentLayout: 'classic',
  notificationsOpen: false
};

const iconStyle = {
  fontSize: 16
};

export const menuItems = [{
    title: 'Home',
    href: '/',
    icon: <HomeIcon style={iconStyle} />,
}, {
  title: 'TEAMS',
  icon: <DesktopWindowsIcon style={iconStyle} />,
  children: [{
    title: 'Teams List',
    href: '/teams',
    icon: <EmailIcon style={iconStyle} />
  }, {
    title: 'Add Team',
    href: '/team/create',
    icon: <CheckCircleIcon style={iconStyle} />
  }]
}, {
  title: 'INITIATIVES',
  icon: <DesktopWindowsIcon style={iconStyle} />,
  children: [{
    title: 'Initiatives List',
    href: '/apps/email',
    icon: <EmailIcon style={iconStyle} />
  }, {
    title: 'Add Initiatives',
    href: '/apps/todo',
    icon: <CheckCircleIcon style={iconStyle} />
  }]
}, {
  title: 'BOARDS',
  icon: <DesktopWindowsIcon style={iconStyle} />,
  children: [{
    title: 'Boards List',
    href: '/boards',
    icon: <EmailIcon style={iconStyle} />
  }, {
    title: 'Add Board',
    href: '/apps/todo',
    icon: <CheckCircleIcon style={iconStyle} />
  }]
}, {
    title: 'Settings',
    href: '/apps/maps',
    icon: <PinDropIcon style={iconStyle} />
}];
