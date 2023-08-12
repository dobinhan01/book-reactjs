import Slider from "react-slick";
import imgAvatar1 from '../../../assets/images/author/author1.jpg'

const Feedback = (props) => {

    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };

    return (<>
        <div className="feedback-container">
            <div className="feedback-wrap">
                <div className="intro">
                    <h2>What our customers says</h2>
                    <p>
                        Bring to the table win-win survival strategies to ensure proactive domination.
                        At the end of the day, going forward, a new normal that has evolved from generation X
                        is on the runway heading towards a streamlined cloud solution.
                        Capitalize on low hanging fruit to identify a ballpark value added activity to beta test.
                    </p>
                </div>
                <div className="content">
                    <Slider {...settings}>
                        <div className="item-wrap">
                            <div className="item">
                                <div className="top">
                                    <img src={imgAvatar1} alt="" width="150" height="150" />
                                    <div className="name">
                                        <h4>Henry</h4>
                                        <p>Team Leader</p>
                                    </div>
                                </div>
                                <div className="info">
                                    Lectus proin nibh nisl condimentum id. Integer vitae justo eget magna fermentum.
                                    Malesuada fames ac turpis egestas sed tempus urna.
                                </div>
                            </div>
                        </div>
                        <div className="item-wrap">
                            <div className="item">
                                <div className="top">
                                    <img src={imgAvatar1} alt="" width="150" height="150" />
                                    <div className="name">
                                        <h4>Henry</h4>
                                        <p>Team Leader</p>
                                    </div>
                                </div>
                                <div className="info">
                                    Lectus proin nibh nisl condimentum id. Integer vitae justo eget magna fermentum.
                                    Malesuada fames ac turpis egestas sed tempus urna.
                                </div>
                            </div>
                        </div>
                        <div className="item-wrap">
                            <div className="item">
                                <div className="top">
                                    <img src={imgAvatar1} alt="" width="150" height="150" />
                                    <div className="name">
                                        <h4>Henry</h4>
                                        <p>Team Leader</p>
                                    </div>
                                </div>
                                <div className="info">
                                    Lectus proin nibh nisl condimentum id. Integer vitae justo eget magna fermentum.
                                    Malesuada fames ac turpis egestas sed tempus urna.
                                </div>
                            </div>
                        </div>
                        <div className="item-wrap">
                            <div className="item">
                                <div className="top">
                                    <img src={imgAvatar1} alt="" width="150" height="150" />
                                    <div className="name">
                                        <h4>Henry</h4>
                                        <p>Team Leader</p>
                                    </div>
                                </div>
                                <div className="info">
                                    Lectus proin nibh nisl condimentum id. Integer vitae justo eget magna fermentum.
                                    Malesuada fames ac turpis egestas sed tempus urna.
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
        </div>
    </>)
}

export default Feedback;