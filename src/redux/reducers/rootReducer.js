import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import publisherReducer from './publisherReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer';
import wishlistReducer from './wishlistReducer';
import contactReducer from './contactReducer';
import reviewReducer from './reviewReducer';
import blogReducer from './blogReducer';

import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const authPersistConfig = {
    key: 'auth',
    storage
};

const cartPersistConfig = {
    key: 'cart',
    storage
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
    user: userReducer,
    category: categoryReducer,
    publisher: publisherReducer,
    product: productReducer,
    wishlist: wishlistReducer,
    order: orderReducer,
    contact: contactReducer,
    review: reviewReducer,
    blog: blogReducer,
});

export default rootReducer;