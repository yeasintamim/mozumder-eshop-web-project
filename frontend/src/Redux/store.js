import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import { productDetailsReducer, productListReducer } from "./Reducers/ProductReducers";
import { cartReducer } from "./Reducers/CartReducers";



const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer, 
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
const initialState = {
    cart:{
        cartItems:cartItemsFromLocalStorage
    }
};  
const middleware = [ thunk ];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store