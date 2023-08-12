import './Breadcrumb.scss';
import { Link } from 'react-router-dom'

const Breadcrumb = (props) => {

    const { children1, children2, navigate1, navigate2 } = props;

    return (
        <div className='breadcrumb-container'>
            <div className='container'>
                <div className='title'>{children1}</div>
                {navigate1 &&
                    <div className='breadcrumb'>
                        <Link to='/'>
                            <i className="fa-solid fa-house"></i>
                        </Link>
                        <ul>
                            {children2 &&
                                <li>
                                    <i className="fa-solid fa-chevron-right"></i>
                                    <Link to={`${navigate2}`}>{children2}</Link>
                                </li>
                            }
                            <li>
                                <i className="fa-solid fa-chevron-right"></i>
                                <Link to={`${navigate1}`}>{children1}</Link>
                            </li>
                        </ul>
                    </div>
                }
            </div>
        </div >
    )
}

export default Breadcrumb;