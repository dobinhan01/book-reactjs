import './Home.scss';
import Banner from "../components/home/Banner";
import Intro from "../components/home/Intro";
import Arrival from "../components/home/Arrival"
import Category from '../components/home/Category';
import Discount from '../components/home/Discount';
// import Feedback from '../components/home/Feedback';
import Blog from '../components/home/Blog';

const Home = (props) => {
    return (<>
        <Banner />
        <Intro />
        <Arrival />
        <Category />
        <Discount />
        {/* <Feedback /> */}
        <Blog />
    </>)
}

export default Home;