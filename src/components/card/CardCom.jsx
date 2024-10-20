import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from 'react-redux';
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart } from "../../actions/cartActions";

export default function CardCom({product}) {
  const [isExpanded, setIsExpanded] = React.useState(false);

console.log(product)
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={product.title}
        subheader="September 14, 2016"
      />
      <CardMedia component="img" height="194" image={product.image} alt="Paella dish" />
      
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            display: '-webkit-box',
          WebkitLineClamp: isExpanded ? 'unset' : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          mb: 1
          }}
        >
          {product.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <AddShoppingCartIcon        onClick={handleAddToCart}/>
        </IconButton>
      </CardActions>
    </Card>
  );
}
