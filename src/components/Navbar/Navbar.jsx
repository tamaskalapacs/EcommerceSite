import React from 'react'
import { AppBar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core'
import  ToolBar  from '@material-ui/core/Toolbar'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/icon.png'
import useStyle from './styles'

const Navbar = ({totalItems}) => {
    const classes = useStyle()
    const location = useLocation()

    return (
        <>
            <AppBar position ="fixed" className = {classes.AppBar} color = "inherit">
                <ToolBar>
                    <Typography component = {Link} to = "/" variant = "h6" className = {classes.title} color = "inherit">
                        <img src={logo} alt="Mock commerce" height="25px" className = {classes.image}/>
                        Mock Commerce
                    </Typography>
                    <div className = {classes.grow}/>
                    {location.pathname === '/' && (
                        <div className = {classes.button}>
                            <IconButton component = {Link} to = "/cart" aria-label = "Show cart items" color = "inherit">
                                <Badge badgeContent={totalItems} color = "secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </ToolBar>
            </AppBar>
        </>
    )
}

export default Navbar
