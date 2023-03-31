import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './Category.scss';

class Category extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryName: '',
            categories: [],
            action: '',
            categoryEditId: '',
        }
    }

    async componentDidMount() {
        this.props.fetchAllCategories();
        // this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snaphot) {

        if (prevProps.categories !== this.props.categories) {
            this.setState({
                categories: this.props.categories,
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

    handleEditUserFromParent = (user) => {

        // let imageBase64 = '';
        // if (user.image) {
        //     imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        // }

        // this.setState({
        //     email: user.email,
        //     password: 'HARDCODE',
        //     firstName: user.firstName,
        //     lastName: user.lastName,
        //     phoneNumber: user.phonenumber,
        //     address: user.address,
        //     gender: user.gender,
        //     role: user.roleId,
        //     avatar: '',
        //     previewImgURl: imageBase64,
        //     action: CRUD_ACTIONS.EDIT,
        //     userEditId: user.id
        // }, () => {
        //     console.log('dobinhan', this.state)
        // })
        // // console.log('ansasx', user)
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
        let arrCategories = this.state.categories;
        return (
            <div className="category-container">
                <div className="title mb-5">
                    <h1>Danh mục sản phẩm</h1>
                </div>
                <div className='container'>
                    <div className="row">
                        <div className="col-5">
                            <div className="category category-left">
                                <div className="category-heading">
                                    Thêm danh mục
                                </div>
                                <div className="category-body">
                                    <div>
                                        <div className="form-group">
                                            <label>Tên danh mục:</label>
                                            <input type="text" className="form-control fs-4 p-2" placeholder="Tên danh mục..."
                                                value={categoryName}
                                                onChange={(event) => this.onChangeInput(event, 'categoryName')}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning mt-5 fs-4' : 'btn btn-primary mt-5 fs-4'}
                                                onClick={() => this.handleSaveCategory()}
                                            >
                                                {this.state.action === CRUD_ACTIONS.EDIT ? 'Lưu thay đổi' : 'Them moi'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-7">
                            <div className="category category-left">
                                <div className="category-heading">Danh sách danh mục</div>
                                <div className="category-body">
                                    <table className="table">
                                        <tbody>
                                            <tr className="bg-primary">
                                                <th>Tên danh mục</th>
                                                <th>Tùy chọn</th>
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
        // language: state.app.language,
        // genderRedux: state.admin.genders,
        // roleRedux: state.admin.roles,
        // isLoadingGender: state.admin.isLoadingGender,
        categories: state.category.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // getGenderStart: () => dispatch(actions.fetchGenderStart()),
        // getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewCategory: (data) => dispatch(actions.createNewCategory(data)),
        fetchAllCategories: () => dispatch(actions.fetchAllCategoriesStart()),
        deleteACategory: (data) => dispatch(actions.deleteACategory(data)),
        editACategory: (data) => dispatch(actions.editACategory(data)),
        // editAUser: (data) => dispatch(actions.editAUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
