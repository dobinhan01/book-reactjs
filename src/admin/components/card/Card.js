import './Card.scss';

const Card = (props) => {
    return (
        <div className='card-container' style={{
            background: props.color.backGround,
            boxShadow: props.color.boxShadow,
        }}>
            <div className='top'>
                <div className='detail'>
                    <span>{props.title}</span>
                    <span>{props.value}</span>
                </div>
                {props.png}
            </div>
        </div >
    )
}

export default Card;