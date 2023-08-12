import './NotFound.scss';
import img404 from '../assets/images/404.gif';
import { useNavigate } from 'react-router-dom';

const NotFound = (props) => {

    const navigate = useNavigate();

    return (
        <div className="NotFound">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="col-sm-12 col-sm-offset-1 text-center">
                            <div className="four_zero_four_bg" style={{ backgroundImage: `url(${img404})` }}>
                                <h1 className="text-center">404</h1>
                            </div>
                            <div className="contant_box_404">
                                <h3 className="h2">Look like you're lost</h3>
                                <p>The page you are looking for not avaible!</p>
                                <div className="link_404"
                                    onClick={() => navigate(-1)}
                                >Go back</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;