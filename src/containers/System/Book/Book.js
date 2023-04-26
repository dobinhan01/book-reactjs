import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './Book.scss';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Select from 'react-select';
import TableManageBook from './TableManageBook';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);


class Book extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            listDiscounts: [],
            listCategories: [],

            name: '',
            author: '',
            publisher: '',
            price: '',
            priceNew: '',
            selectedDiscount: '',
            selectedCategory: '',
            image: '',
            previewImgURl: '',
            contentMarkdown: '',
            contentHTML: '',

            action: CRUD_ACTIONS.CREATE,
            bookEditId: '',
        }
    }

    componentDidMount() {
        this.props.fetchDiscountStart();
        this.props.fetchAllCategories();
    }

    buildDataSelectDiscount = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                object.label = item.valueEn + '%'
                object.value = item.key;
                result.push(object)
            })
        }
        return result;
    }

    buildDataISelectCategory = (data) => {
        let result = [];
        if (data && data.length > 0) {
            data.map((item, index) => {
                let object = {};
                object.label = item.categoryName
                object.value = item.id;
                result.push(object)
            })
        }
        return result;
    }

    componentDidUpdate(prevProps, prevState, snaphot) {
        if (prevProps.discounts !== this.props.discounts) {
            let dataSelect = this.buildDataSelectDiscount(this.props.discounts);
            this.setState({
                listDiscounts: dataSelect,
            })
        }
        if (prevProps.categories !== this.props.categories) {
            let dataSelect = this.buildDataISelectCategory(this.props.categories);
            this.setState({
                listCategories: dataSelect,
            })
        }
        if (prevProps.books !== this.props.books) {
            this.setState({
                name: '',
                author: '',
                publisher: '',
                price: '',
                selectedDiscount: '',
                selectedCategory: '',
                image: '',
                previewImgURl: '',
                contentMarkdown: '',
                contentHTML: '',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURl: objectUrl,
                image: base64,
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImgURl) return;
        this.setState({
            isOpen: true
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['name', 'author', 'publisher', 'price', 'selectedDiscount', 'selectedCategory', 'previewImgURl'];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveBook = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) return;

        let { action } = this.state

        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create book
            let arrDiscounts = this.props.discounts;
            let discount = this.state.selectedDiscount.value;
            let priceNew = this.state.price;
            discount = arrDiscounts.find((item) => {
                return item.key === discount
            });
            priceNew = discount.valueEn === '0' ? priceNew : priceNew * discount.valueEn / 100;

            this.props.createNewBook({
                name: this.state.name,
                author: this.state.author,
                publisher: this.state.publisher,
                price: this.state.price,
                priceNew: priceNew,
                discount: this.state.selectedDiscount.value,
                categoryId: this.state.selectedCategory.value,
                image: this.state.image,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            //fire redux edit book
            let arrDiscounts = this.props.discounts;
            let discount = this.state.selectedDiscount.value;
            let priceNew = this.state.price;
            discount = arrDiscounts.find((item) => {
                return item.key === this.state.selectedDiscount.value
            });
            priceNew = discount.valueEn === '0' ? priceNew : priceNew * discount.valueEn / 100;
            console.log(discount.valueEn, priceNew)

            this.props.editABook({
                id: this.state.bookEditId,
                name: this.state.name,
                author: this.state.author,
                publisher: this.state.publisher,
                price: this.state.price,
                priceNew: priceNew,
                discount: this.state.selectedDiscount.value,
                categoryId: this.state.selectedCategory.value,
                image: this.state.image,
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
            })
        }
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    handleChangeSelect = (selectedOption, id) => {
        let copyState = { ...this.state };
        copyState[id] = selectedOption;
        this.setState({ ...copyState });
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }

    handleEditBookFromParent = async (book) => {
        let { listDiscounts, listCategories } = this.state;

        let imageBase64 = '';
        if (book.image) {
            imageBase64 = Buffer.from(book.image, 'base64').toString('binary');
        }
        let selectedDiscount = listDiscounts.find((item) => {
            return item.value === book.discount
        })
        let selectedCategory = listCategories.find((item) => {
            return item.value === book.categoryId
        })

        this.setState({
            name: book.name,
            author: book.author,
            publisher: book.publisher,
            price: book.price,
            priceNew: book.priceNew,
            selectedDiscount: selectedDiscount,
            selectedCategory: selectedCategory,
            image: '',
            previewImgURl: imageBase64,
            contentMarkdown: book.contentMarkdown ? book.contentMarkdown : '',
            contentHTML: book.contentHTML ? book.contentHTML : '',
            action: CRUD_ACTIONS.EDIT,
            bookEditId: book.id
        })
    }

    render() {
        let { name, author, publisher, price } = this.state;
        return (
            <div className='book-container'>
                <div className='title my-5'>
                    Manage Book
                </div>
                <div className='container'>
                    <div className="book-body" >
                        <div className="book-content">
                            <div className="book-heading">Add new book</div>
                            <div className='row p-5'>
                                <div className='form-group col-4 my-3'>
                                    <label>Book title</label>
                                    <input className='form-control fs-4 p-3' type='text'
                                        value={name}
                                        onChange={(event) => { this.onChangeInput(event, 'name') }}
                                    />
                                </div>
                                <div className='form-group col-4 my-3'>
                                    <label>Author</label>
                                    <input className='form-control fs-4 p-3' type='text'
                                        value={author}
                                        onChange={(event) => { this.onChangeInput(event, 'author') }}
                                    />
                                </div>
                                <div className='form-group col-4 my-3'>
                                    <label>Publisher</label>
                                    <input className='form-control fs-4 p-3' type='text'
                                        value={publisher}
                                        onChange={(event) => { this.onChangeInput(event, 'publisher') }}
                                    />
                                </div>
                                <div className='form-group col-4 my-3'>
                                    <label>Price</label>
                                    <input className='form-control fs-4 p-3' type='text'
                                        value={price}
                                        onChange={(event) => { this.onChangeInput(event, 'price') }}
                                    />
                                </div>
                                <div className='form-group col-4 my-3'>
                                    <label>Discount</label>
                                    <Select
                                        value={this.state.selectedDiscount}
                                        onChange={(event) => this.handleChangeSelect(event, 'selectedDiscount')}
                                        options={this.state.listDiscounts}
                                    />
                                </div>
                                <div className='form-group col-4 my-3'>
                                    <label>Category</label>
                                    <Select
                                        value={this.state.selectedCategory}
                                        onChange={(event) => this.handleChangeSelect(event, 'selectedCategory')}
                                        options={this.state.listCategories}
                                    />
                                </div>
                                <div className='form-group col-4 my-3'>
                                    <label>Image</label>
                                    <div className='preview-img-container'>
                                        <input id='previewImg' type='file' hidden
                                            onChange={(event) => this.handleOnChangeImage(event)}
                                        />
                                        <label className='label-upload m-0' htmlFor='previewImg'>
                                            Upload
                                            <i className='fas fa-upload'></i>
                                        </label>
                                        <div className='preview-image'
                                            style={{ backgroundImage: `url(${this.state.previewImgURl})` }}
                                            onClick={() => this.openPreviewImage()}
                                        ></div>
                                    </div>
                                </div>
                                <div >
                                    <label>Description</label>
                                    <MdEditor
                                        style={{ height: '500px' }}
                                        renderHTML={text => mdParser.render(text)}
                                        onChange={this.handleEditorChange}
                                        value={this.state.contentMarkdown}
                                    />
                                </div>

                                <div className="form-group">
                                    <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning my-3 fs-4' : 'btn btn-primary my-3 fs-4'}
                                        onClick={() => this.handleSaveBook()}
                                    >
                                        {this.state.action === CRUD_ACTIONS.EDIT ? 'Save change' : 'Save book'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 my-5'>
                            <TableManageBook
                                handleEditBookFromParent={this.handleEditBookFromParent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgURl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        discounts: state.book.discounts,
        categories: state.category.categories,
        books: state.book.books,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDiscountStart: () => dispatch(actions.fetchDiscountStart()),
        fetchAllCategories: () => dispatch(actions.fetchAllCategories()),
        createNewBook: (data) => dispatch(actions.createNewBook(data)),
        editABook: (data) => dispatch(actions.editABook(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Book);
