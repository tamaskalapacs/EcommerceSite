import React from 'react'
import { Typography, List, ListItem, ListItemText } from '@material-ui/core'


const Review = ({checkOutToken}) => {
    return (
        <>
           <Typography variant = "h6" gutterBottom>Order summary</Typography> 
           <List disablePadding>
                {checkOutToken.live.line_items.map((product) => (
                    <ListItem style={{padding: '10px 0px'}} key={product.name}>
                        <ListItemText primary={product.name} secondary ={`Quantity: ${product.quantity}`}/>
                        <Typography variant="body2">{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style = {{padding: '10px 0px'}}>
                    <ListItemText primary = "Total"/>
                    <Typography variant = "subtitle1" style = {{fontWeight: 700}}>
                        {checkOutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
           </List>
        </>
    )
}

export default Review
