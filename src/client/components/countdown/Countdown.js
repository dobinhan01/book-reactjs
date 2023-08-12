import { useEffect, useRef, useState } from 'react';
import './Countdown.scss';

const Countdown = (props) => {

    const [timerDays, setTimerDays] = useState('00');
    const [timerHours, setTimerHours] = useState('00');
    const [timerMinutes, setTimerMinutes] = useState('00');
    const [timerSeconds, setTimerSeconds] = useState('00');

    let interval = useRef();

    const startTimer = () => {
        const countdownDate = new Date('Aug 01,2023 00:00:00').getTime();

        interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = countdownDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            if (distance < 0) {
                clearInterval(interval.current);
            } else {
                setTimerDays(days);
                setTimerHours(hours);
                setTimerMinutes(minutes);
                setTimerSeconds(seconds);
            }

        }, 1000)
    }

    useEffect(() => {
        startTimer();
        return () => {
            // clearInterval(interval.current);
            setTimerDays('00');
            setTimerHours('00');
            setTimerMinutes('00');
            setTimerSeconds('00');
        }
    }, [])

    return (
        <div className="countdown">
            <span>{timerDays}</span><span>d </span>
            <span>{timerHours}</span><span>h </span>
            <span>{timerMinutes}</span><span>m </span>
            <span>{timerSeconds}</span><span>s</span>
        </div>
    )
}

export default Countdown;