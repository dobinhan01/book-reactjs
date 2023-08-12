import './App.scss';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import Public from './routes/Public';
import Home from './client/pages/Home';
import Login from './client/pages/Login';
import Register from './client/pages/Register';
import ProductList from './client/pages/ProductList';
import Product from './client/pages/Product';
import Products from './client/pages/shop/Products';
import Blogs from './client/pages/Blogs';
import BlogDetail from './client/pages/BlogDetail';
import Contact from './client/pages/Contact';
import Wishlist from './client/pages/Wishlist';
import Cart from './client/pages/Cart';
import Checkout from './client/pages/Checkout';
import Profile from './client/pages/profile/Profile';
import OrderDetail from './client/pages/order/OrderDetail';
import NotFound from './routes/NotFound';
import Private from './routes/Private';
import AdminLogin from './admin/pages/login/AdminLogin';
import HomeAdmin from './admin/pages/HomeAdmin';
import Category from './admin/pages/category/Category';
import Publisher from './admin/pages/publisher/Publisher';
import Order from './admin/pages/order/Order';
import ManageProduct from './admin/pages/products/ManageProduct';
import ManageAccount from './admin/pages/account/ManageAccount';
import ManageContact from './admin/pages/contact/Contact';
import ManageBlog from './admin/pages/blog/Blog';
import AddBlog from './admin/pages/blog/AddBlog';
import EditBlog from './admin/pages/blog/EditBlog';

function App() {

  const { isLoggedIn, currentUser } = useSelector(state => state.auth);

  return (<>
    <Routes>
      <Route path="/" element={<Public />}>
        <Route index element={<Home />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" replace /> : <Register />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/products" element={<Products />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order/:id" element={<OrderDetail />} />
      </Route>

      <Route path="/admin" element={!currentUser?.isAdmin ? <Navigate to="/" replace /> : <Private />} >
        <Route index element={<HomeAdmin />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/publisher" element={<Publisher />} />
        <Route path="/admin/order" element={<Order />} />
        <Route path="/admin/product" element={<ManageProduct />} />
        <Route path="/admin/account" element={<ManageAccount />} />
        <Route path="/admin/contact" element={<ManageContact />} />
        <Route path="/admin/blog" element={<ManageBlog />} />
        <Route path="/admin/blog/add" element={<AddBlog />} />
        <Route path="/admin/blog/edit/:id" element={<EditBlog />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>);
}

export default App;
