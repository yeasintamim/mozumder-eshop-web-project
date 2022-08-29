import React,{useEffect} from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux' 
import {addToCart} from './../Redux/Actions/cartActions'


const CartScreen = ({match,location}) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch()
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split("=")[1]) : 1
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  useEffect(() => {
    if(productId){
      dispatch(addToCart(productId,qty))

    }

  }, [dispatch,productId,qty]);
  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {
          cartItems.length === 0 ? (
            <div className=" alert alert-info text-center mt-3">
          Your cart is empty
          <Link
            className="btn btn-success mx-5 px-5 py-3"
            to="/"
            style={{
              fontSize: "12px",
            }}
          >
            SHOPPING NOW
          </Link>
        </div>
          ):
          (
            <>
            <div className=" alert alert-info text-center mt-3">
          Total Cart Products
          <Link className="text-success mx-2" to="/cart">
            ({cartItems.length})
          </Link>
        </div>
        {/* cartiterm */}
        {
          cartItems.map(item => (
            <div className="cart-iterm row">
          <div className="remove-button d-flex justify-content-center align-items-center">
            <i className="fas fa-times"></i>
          </div>
          <div className="cart-image col-md-3">
            <img src={item.image} alt={item.name} />
          </div>
          <div className="cart-text col-md-5 d-flex align-items-center">
            <Link to={`/products/${item.product}`}>
              <h4>{item.name}</h4>
            </Link>
          </div>
          <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
            <h6>QUANTITY</h6>
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
            <h6>SUBTOTAL</h6>
            <h4>$456</h4>
          </div>
        </div>

          ))
        }
        

        {/* End of cart iterms */}
        <div className="total">
          <span className="sub">total:</span>
          <span className="total-price">$567</span>
        </div>
        <hr />
        <div className="cart-buttons d-flex align-items-center row">
          <Link to="/" className="col-md-6 ">
            <button>Continue To Shopping</button>
          </Link>
          <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
            <button>
              <Link to="/shipping" className="text-white">
                Checkout
              </Link>
            </button>
          </div>
        </div>
            </>
          )
        }
      
        
      </div>
    </>
  );
};

export default CartScreen;
