import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Category = (props) => {

    const [listCategoryHome, setListCategoryHome] = useState([]);
    const { categoryHome } = useSelector(state => state.category);
    useEffect(() => {
        setListCategoryHome(categoryHome);
    }, [categoryHome])

    return (
        <div className="section-container">
            <div className="container">
                <div className="section-wrap">
                    <div className="heading">BỘ SƯU TẬP</div>
                    <div className="title">Danh mục</div>
                    <div className="desc">Đọc sách giúp bạn thư giãn và giúp<br /> giảm căng thẳng</div>
                    <div className="content category">
                        <div className='row list'>
                            {listCategoryHome?.length > 0 &&
                                listCategoryHome.map((item, index) => {
                                    let priviewImg = new Buffer(item.img, 'base64').toString('binary');
                                    return (
                                        <Link to={`products/${item.slug}`} className='item' key={index}>
                                            <img src={priviewImg} alt="" width="700" height="700" />
                                            <div className='cat-name'>
                                                {item.name}
                                                <div className='browse'>Đến ngay</div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category;