import './Cards.scss';
import Card from '../card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAmountDashboard } from '../../../redux/actions/userAction';

const Cards = (props) => {

    const dispatch = useDispatch();
    const { amountDashboard } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAmountDashboard());
    }, [dispatch])

    useEffect(() => {
        console.log(amountDashboard)
    }, [amountDashboard])


    const dataCards = [
        {
            title: "Sản phẩm",
            color: {
                backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
                boxShadow: "0px 10px 20px 0px #e0c6f5",
            },
            value: amountDashboard.amountProduct,
            png: <i className='bx bx-package'></i>
        },
        {
            title: "Tài khoản",
            color: {
                backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
                boxShadow: "0px 10px 20px 0px #FDC0C7",
            },
            value: amountDashboard.amountAccount,
            png: <i className='bx bx-user-circle'></i>
        },
        {
            title: "Đơn hàng",
            color: {
                backGround:
                    "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
                boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            value: amountDashboard.amountOrder,
            png: <i className='bx bx-clipboard'></i>
        }
    ]

    return (
        <div className='Cards'>
            {dataCards.map((item, index) => {
                return (
                    <div className="parentContainer" key={index}>
                        <Card
                            title={item.title}
                            color={item.color}
                            value={item.value}
                            png={item.png}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Cards;