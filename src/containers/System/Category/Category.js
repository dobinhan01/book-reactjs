import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTIONS } from '../../../utils';
import * as actions from '../../../store/actions';
import './Category.scss';

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCategories: [],
            categoryName: '',
            action: '',
            categoryEditId: '',
        }
    }

    async componentDidMount() {
        this.props.fetchAllCategories();
    }

    componentDidUpdate(prevProps, prevState, snaphot) {

        if (prevProps.categories !== this.props.categories) {
            this.setState({
                listCategories: this.props.categories,
            })
        }
        prevState.categoryName = '';
        prevState.action = CRUD_ACTIONS.CREATE
    }

    handleSaveCategory = () => {
        if (!this.state.categoryName) {
            alert('This input is required: category');
            return;
        }

        let { action } = this.state
        if (action === CRUD_ACTIONS.CREATE) {
            this.props.createNewCategory({
                categoryName: this.state.categoryName
            })
        }
        if (action === CRUD_ACTIONS.EDIT) {
            this.props.editACategory({
                id: this.state.categoryEditId,
                categoryName: this.state.categoryName
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
    handleEditCategory = (category) => {
        this.setState({
            categoryName: category.categoryName,
            action: CRUD_ACTIONS.EDIT,
            categoryEditId: category.id
        })
    }

    handleDeleteCategory = (category) => {
        this.props.deleteACategory(category.id);
    }

    render() {
        let { categoryName } = this.state;
        let arrCategories = this.state.listCategories;
        return (
            <div className="category-container">
                <div className="title my-5">Manage Category</div>
                <div className='container'>
                    <div className="row">
                        <div className="col-5">
                            <div className="category">
                                <div className="category-heading">
                                    Add category
                                </div>
                                <div className="category-body">
                                    <div>
                                        <div className="form-group">
                                            <label>Category name:</label>
                                            <input type="text" className="form-control fs-4 p-2"
                                                value={categoryName}
                                                onChange={(event) => this.onChangeInput(event, 'categoryName')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning mt-5 fs-4' : 'btn btn-primary mt-5 fs-4'}
                                                onClick={() => this.handleSaveCategory()}
                                            >
                                                {this.state.action === CRUD_ACTIONS.EDIT ? 'Save changes' : 'Save category'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="category">
                                <div className="category-heading">List categories</div>
                                <div className="category-body">
                                    <table className="table">
                                        <tbody>
                                            <tr className="bg-primary">
                                                <th>Category name</th>
                                                <th>Actions</th>
                                            </tr>
                                            {arrCategories && arrCategories.length > 0 &&
                                                arrCategories.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item.categoryName}</td>
                                                            <td>
                                                                <button className='btn-edit'
                                                                    onClick={() => this.handleEditCategory(item)}
                                                                ><i className='fas fa-pencil-alt'></i></button>
                                                                <button className='btn-delete'
                                                                    onClick={() => this.handleDeleteCategory(item)}
                                                                ><i className='fas fa-trash'></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        categories: state.category.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllCategories: () => dispatch(actions.fetchAllCategories()),
        createNewCategory: (data) => dispatch(actions.createNewCategory(data)),
        deleteACategory: (data) => dispatch(actions.deleteACategory(data)),
        editACategory: (data) => dispatch(actions.editACategory(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
