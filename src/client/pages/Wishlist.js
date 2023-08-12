import './Wishlist.scss';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { NumericFormat } from 'react-number-format';
import { deleteWishlist, fecthAllWishlistsByUserId } from '../../redux/actions/wishlistAction';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const Wishlist = () => {

    let userId;
    let localStorageData = window.localStorage.getItem('persist:auth');
    if (localStorageData && typeof localStorageData === 'string') {
        localStorageData = JSON.parse(localStorageData);
        const currentUser = JSON.parse(localStorageData?.currentUser);
        userId = currentUser?.id;
    }

    const dispatch = useDispatch();
    const { wishlistsByUserId } = useSelector(state => state.wishlist);

    useEffect(() => {
        dispatch(fecthAllWishlistsByUserId(userId));
    }, [dispatch, userId])

    const handleRemove = (item) => {
        const payload = {
            userId: item.userId,
            productId: item.productId
        };
        dispatch(deleteWishlist(payload));
        console.log(payload)
    }

    return (
        <div className='wishlist-container'>
            <Breadcrumb
                children1='Danh sách yêu thích'
                navigate1='/wishlist'
            />
            <div className='container'>
                {wishlistsByUserId.length !== 0 ?
                    <div className='content'>
                        <div className='col-10'>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='thumbnail'></th>
                                        <th>Tên sách</th>
                                        <th>Tác giả</th>
                                        <th>Nhà xuất bản</th>
                                        <th>Giá</th>
                                        <th className='remove'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wishlistsByUserId.map((item, index) => {
                                        const previewImg = new Buffer.from(item.Product.img, 'base64').toString('binary');
                                        return (
                                            <tr key={index}>
                                                <td className='thumbnail'>
                                                    <img src={previewImg} alt="" width='213' height='284' />
                                                </td>
                                                <td><p>{item.Product.title}</p></td>
                                                <td><p>{item.Product.author}</p></td>
                                                <td><p>{item.Product.Publisher.name}</p></td>
                                                <td>
                                                    <NumericFormat value={item.Product.price}
                                                        displayType={'text'}
                                                        suffix={'đ'}
                                                        thousandSeparator=","
                                                    />
                                                </td>
                                                <td className='remove'
                                                    onClick={() => handleRemove(item)}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    :
                    <div className='no-cart'>
                        <h3>Danh sách yêu thích của bạn đang trống</h3>
                        <Link to={'/products'} className='btn'>Mua ngay</Link >
                    </div>
                }
            </div>
        </div>
    )
}

export default Wishlist;