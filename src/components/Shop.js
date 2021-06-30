import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import RightPanel from './RightPanel';
import LeftPanel from './LeftPanel';

const Shop = (props) => {
  const { items } = props;
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [coupon, setCoupon] = useState(0);

  const addItem = (item) => {
    let updatedCart = [];
    let isNew = true;
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].name === item.name) {
        isNew = false;
        const updatecart = {
          ...cart[i],
          quantity: cart[i].quantity + 1,
          totalPrice: cart[i].totalPrice + item.price,
        };
        updatedCart.push(updatecart);
      } else {
        updatedCart.push(cart[i]);
      }
    }
    if (isNew) {
      const updatecart = {
        name: item.name,
        quantity: 1,
        totalPrice: item.price,
      };
      updatedCart = [...cart, updatecart];
    }
    setCart(updatedCart);

    calcSubTotal(updatedCart, coupon);
  };

  const removeItem = (item) => {
    if (cart.some((cartItem) => cartItem.name === item.name)) {
      let isLast = true;
      let updatedCart = [];
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].quantity > 1 && cart[i].name === item.name) {
          isLast = false;
          const updatecart = {
            ...cart[i],
            quantity: cart[i].quantity - 1,
            totalPrice: cart[i].totalPrice - item.price,
          };
          updatedCart.push(updatecart);
        } else {
          updatedCart.push(cart[i]);
        }
      }

      if (isLast) {
        updatedCart = updatedCart.filter(
          (itemCart) => itemCart.name !== item.name
        );
      }
      setCart(updatedCart);

      calcSubTotal(updatedCart, coupon);
    }
  };

  const calcSubTotal = (newCart, tempCoupon) => {
    if (newCart !== undefined && newCart !== null && newCart !== []) {
      const subTotal =
        newCart.reduce((sum, item) => (sum += item.totalPrice), 0) *
        (1 - tempCoupon / 100);

      setSubTotal(subTotal);
    }
  };

  const handleCouponChange = (event) => {
    setCoupon(event.target.value);
    calcSubTotal(cart, event.target.value);
  };

  return (
    <div>
      <Grid className='GridRoot'>
        <LeftPanel items={items} addItem={addItem} removeItem={removeItem} />
        <Divider orientation='vertical' />
        <RightPanel
          cart={cart}
          coupon={coupon}
          handleCouponChange={handleCouponChange}
          subTotal={subTotal}
        />
      </Grid>
    </div>
  );
};

export default Shop;
