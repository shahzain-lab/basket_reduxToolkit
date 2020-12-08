import React, { Fragment } from 'react';
/////useSelector

import {useSelector} from 'react-redux';
///material ui
import {createStyles , Theme , makeStyles} from '@material-ui/core/styles';
import {
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    IconButton,
    Avatar,
    Typography
  } from "@material-ui/core";
///// material ui icons  
import DeleteIcon from "@material-ui/icons/Delete";
///typescript types
import { ProductItem } from "../global.d";
///redux store
import { store, remove } from '../store/';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: "inline"
    },
    listItem: {
      padding: theme.spacing(1, 0),
      justifyContent: "flex-end"
    },
    total: {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.fontSize * 2
    }
  })
)


export const ProductCart = () => {
    const classes = useStyles({})
    const products = useSelector((state: ProductItem[]) => state)

    return(
        <div>
             <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Shopping Basket
      </Typography>
      <Typography component="p" variant="body1">
        You have {products.filter(product => product.added).length} items in your basket
      </Typography>
      <List className={classes.root}>
        {products
          .filter(product => product.added)
          .map((product: ProductItem) => (
            <Fragment key={product.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Product" src={product.imageUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={product.title}
                  secondary={
                    <Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        &pound;{(product.price / 100).toFixed(2)}
                      </Typography>
                      {` — ${product.description}`}
                    </Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => store.dispatch(remove({ id: product.id }))}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Fragment>
          ))}
        <ListItem className={classes.listItem}>
          <Typography variant="subtitle1" className={classes.total}>
            &pound;
            {(
              products
                .filter(product => product.added)
                .reduce((acc, current) => (acc += current.price), 0) / 100
            ).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
        </div>
    )
}  
