import './TableProduct.scss';
import { Table } from 'react-bootstrap';
import { NumericFormat } from 'react-number-format';

const TableProduct = (props) => {

    const { listProducts, dataProductEditFromChildToParent, dataProductDeleteFromChildToParent } = props;

    const handleEditProduct = (product) => {
        dataProductEditFromChildToParent(product);
    }

    const handleDeleteProduct = (product) => {
        dataProductDeleteFromChildToParent(product);
    }

    return (
        <div className='TableProduct'>
            <Table hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên sách</th>
                        <th>Hình ảnh</th>
                        <th>Tác giả</th>
                        <th>Nhà xuất bản</th>
                        <th>Giá</th>
                        <th>Danh mục</th>
                        <th>Số lượng trong kho</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {listProducts.map((item, index) => {
                        let priviewImg = new Buffer(item.img, 'base64').toString('binary');
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td className='title'>{item.title}</td>
                                <td className='thumbnail'>
                                    <img src={priviewImg} alt='' width='200' height='260' />
                                </td>
                                <td className='author'>{item.author}</td>
                                <td className='publisher'>{item.Publisher.name}</td>
                                <td>
                                    <NumericFormat value={item.price}
                                        displayType={'text'}
                                        suffix={'đ'}
                                        thousandSeparator=","
                                    />
                                </td>
                                <td>{item.Category.name}</td>
                                <td>{item.quantityStock}</td>
                                <td className='actions'>
                                    <button
                                        className='btn btn-warning m-1'
                                        onClick={() => handleEditProduct(item)}
                                    >Edit</button>
                                    <button
                                        className='btn btn-danger m-1'
                                        onClick={() => handleDeleteProduct(item)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default TableProduct;