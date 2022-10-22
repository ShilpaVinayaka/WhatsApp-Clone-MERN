import React from 'react'
import './Sidebar.css';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {Avatar, IconButton} from '@material-ui/core';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ChatIcon from '@mui/icons-material/Chat';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SidebarChat from './SidebarChat';

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className="sidebar__header">
            <Avatar src="https://cdn3.vectorstock.com/i/1000x1000/01/77/businesswoman-character-avatar-icon-vector-12800177.jpg" />
            <div className="sidebar__headerRight">
                <IconButton>
                    <DonutLargeIcon />
                </IconButton>
                <IconButton>
                    <ChatIcon />
                </IconButton>
                <IconButton>
                    <MoreVertIcon />
                </IconButton>
            </div>
        </div>

        <div className='sidebar__search'>
            <div className='sidebar__searchContainer'>
                <SearchOutlinedIcon />
                <input placeholder="Search or start new chat" type="text" />
            </div>
        </div>

        <div className="sidebar__chats">
            <SidebarChat />
            <SidebarChat />
            <SidebarChat />
        </div>


    </div>
  )
}

export default Sidebar