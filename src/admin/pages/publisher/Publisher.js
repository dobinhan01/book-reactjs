import './Publisher.scss';
import _ from 'lodash';
import { debounce } from 'lodash';
import TablePublisher from '../../components/tables/TablePublisher';
import ModalAddPublisher from '../../components/modals/publisher/ModalAddPublisher';
import ModalEditPublisher from '../../components/modals/publisher/ModalEditPublisher';
import ModalConfirm from '../../components/modals/publisher/ModalConfirm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPublishers } from '../../../redux/actions/publisherAction';

const Publisher = () => {

    const dispatch = useDispatch();
    const { publishers } = useSelector(state => state.publisher);
    const [listPublisher, setListPublisher] = useState([]);

    const [isShowModalAddPublisher, setIsShowModalAddPublisher] = useState(false);
    const [isShowModalEditPublisher, setIsShowModalEditPublisher] = useState(false);
    const [dataPublisherEdit, setDataPublisherEdit] = useState({});
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [dataPublisherDelete, setDataPublisherDelete] = useState({});

    useEffect(() => {
        dispatch(fetchAllPublishers());
    }, [dispatch])
    useEffect(() => {
        setListPublisher(publishers)
    }, [publishers])

    const handleClose = () => {
        setIsShowModalAddPublisher(false);
        setIsShowModalEditPublisher(false);
        setIsShowModalConfirm(false);
    }

    const handleEditPublisher = (Publisher) => {
        setDataPublisherEdit(Publisher);
        setIsShowModalEditPublisher(true)
    }

    const handleDeletePublisher = (Publisher) => {
        setDataPublisherDelete(Publisher);
        setIsShowModalConfirm(true)
    }

    const handleSearch = debounce((event) => {
        let term = event.target.value.toLowerCase();
        if (term) {
            let cloneListPublisher = _.cloneDeep(publishers);
            cloneListPublisher = cloneListPublisher.filter(item => item.name.toLowerCase().includes(term))
            setListPublisher(cloneListPublisher)
        } else {
            dispatch(fetchAllPublishers());
        }
    }, 500)

    return (
        <div className='Publisher' style={{ padding: '76px 16px 30px' }}>
            <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '30px' }}>
                <h1 className="m-0">Nhà xuất bản</h1>
                <button className='btn btn-success'
                    onClick={() => setIsShowModalAddPublisher(true)}
                >
                    Thêm nhà xuất bản mới
                </button>
            </div>
            <div className='search'>
                <div className='icon'>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                <input type='text' placeholder='Tìm kiếm theo tên nhà xuất bản...'
                    onChange={(event) => handleSearch(event)}
                />
            </div>
            <TablePublisher
                listPublisher={listPublisher}
                dataPublisherEditFromChildToParent={handleEditPublisher}
                dataPublisherDeleteFromChildToParent={handleDeletePublisher}
            />
            <ModalAddPublisher
                show={isShowModalAddPublisher}
                handleClose={handleClose}
            />
            <ModalEditPublisher
                show={isShowModalEditPublisher}
                handleClose={handleClose}
                dataPublisherEdit={dataPublisherEdit}
            />
            <ModalConfirm
                show={isShowModalConfirm}
                handleClose={handleClose}
                dataPublisherDelete={dataPublisherDelete}
            />
        </div>
    )
}

export default Publisher;