import { useContext } from 'react';

import './product-card.styles.scss';

import Button from '../button/button.component';
import { BUTTON_TYPE_CLASSES } from '../button/button.types';

import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(CartContext);

  const addProductToCart = () => addItemToCart(product);

  return (
  <div className='product-card-container'>
  <img src={imageUrl} alt={`${name}`} />
  <div className='product-footer'>
    <span className='name'>{name}</span>
    <span className='price'>{price}</span>
  </div>
  <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
</div>
    );
};

export default ProductCard;