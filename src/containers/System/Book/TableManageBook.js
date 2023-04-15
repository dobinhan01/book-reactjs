import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageBook.scss';
import * as actions from '../../../store/actions';


class TableManageBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listBooks: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllBooks();
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
        console.log(book)
        this.props.handleEditBookFromParent(book)
    }

    render() {
        let arrBooks = this.state.listBooks;
        return (
            <React.Fragment>
                <table className='table-container' >
                    <tbody>
                        <tr>
                            <th>Book title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th style={{ width: "10%" }}>Actions</th>
                        </tr>

                        {arrBooks && arrBooks.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.author}</td>
                                    <td>{item.publisher}</td>
                                    <td>{item.price}</td>
                                    <td>{item.discount}</td>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllBooks: () => dispatch(actions.fetchAllBooks()),
        deleteABook: (id) => dispatch(actions.deleteABook(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageBook);
