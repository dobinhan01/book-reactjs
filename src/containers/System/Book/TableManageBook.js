import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageBook.scss';
import * as actions from '../../../store/actions';
import NumberFormat from 'react-number-format';


class TableManageBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listBooks: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllBooks();
        this.props.fetchDiscountStart();
        this.props.fetchAllCategories();
    }

    componentDidUpdate(prevProps, prevState, snaphot) {
        if (prevProps.books !== this.props.books) {
            this.setState({
                listBooks: this.props.books
            })
        }
    }

    handleDeleteBook = (book) => {
        this.props.deleteABook(book.id);
    }

    handleEditBook = (book) => {
        this.props.handleEditBookFromParent(book)
    }

    render() {
        let arrBooks = this.state.listBooks;
        let arrDiscounts = this.props.discounts;
        let arrCategories = this.props.categories;
        return (
            <React.Fragment>
                <table className='table-container' >
                    <tbody>
                        <tr>
                            <th>Book title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Price</th>
                            <th>Price new</th>
                            <th>Discount</th>
                            <th>Category</th>
                            <th style={{ width: "10%" }}>Actions</th>
                        </tr>

                        {arrBooks && arrBooks.map((item, index) => {
                            let discount = arrDiscounts.find((i) => {
                                return i.key === item.discount
                            });
                            let category = arrCategories.find((i) => {
                                return i.id === item.categoryId
                            });
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.author}</td>
                                    <td>{item.publisher}</td>
                                    <td>
                                        <NumberFormat
                                            value={item.price}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </td>
                                    <td>
                                        <NumberFormat
                                            value={item.priceNew}
                                            displayType={'text'}
                                            thousandSeparator={true}
                                            suffix={'đ'}
                                        />
                                    </td>
                                    <td>{discount.valueVi}%</td>
                                    <td>{category.categoryName}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditBook(item)}
                                        ><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteBook(item)}
                                        ><i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        books: state.book.books,
        discounts: state.book.discounts,
        categories: state.category.categories,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBooks: () => dispatch(actions.fetchAllBooks()),
        deleteABook: (id) => dispatch(actions.deleteABook(id)),
        fetchDiscountStart: () => dispatch(actions.fetchDiscountStart()),
        fetchAllCategories: () => dispatch(actions.fetchAllCategories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBook);
