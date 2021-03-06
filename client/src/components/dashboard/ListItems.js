import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link,Routes,Route } from 'react-router-dom';
import HailIcon from '@mui/icons-material/Hail';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';



export const mainListItems = (
  <div>
    <ListItem button component={Link} to='/events'>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem  button component={Link} to='/promoters' >
      <ListItemIcon>
        <HailIcon  />
      </ListItemIcon>
      <ListItemText primary="Promoter" />
    </ListItem>
    <ListItem >
      <ListItemIcon button>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Clients" />
    </ListItem>
    <ListItem button component={Link} to='/shops'>
      <ListItemIcon>
      <StoreMallDirectoryIcon/>
      </ListItemIcon>
      <ListItemText primary="Shops" />
    </ListItem>
    <ListItem button component={Link} to='details'>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Organization" />
    </ListItem>
    <ListItem button component={Link} to='/charts'>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Charts" />
    </ListItem>
    <ListItem button component={Link} to='shops/:id'>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem>

  </div>
);

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );