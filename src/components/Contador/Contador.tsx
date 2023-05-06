import { useState, useEffect } from "react";
import "./Contador.css";
import alarmSound from '../../assets/alarmPomodoro.wav';

function Contador() {
    const [workMinutes, setWorkMinutes] = useState<number>(25);
    const [workSeconds, setWorkSeconds] = useState<number>(0);
    const [breakMinutes, setBreakMinutes] = useState<number>(5);
    const [breakSeconds, setBreakSeconds] = useState<number>(0);
    const [isWorking, setIsWorking] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // tiempo restante en segundos
    const [isAlarmOn, setIsAlarmOn] = useState<boolean>(false);
    const [volume] = useState<number>(0.051);

    useEffect(() => {
        if (isWorking) {
            document.title = `(${new Date(timeLeft * 1000).toISOString().substr(14, 5)}) - Pomodoro`;
        } else {
            document.title = "Pomodoro";
        }
    }, [isWorking, timeLeft]);

    useEffect(() => {
        setTimeLeft(workMinutes * 60 + workSeconds);
    }, [workMinutes, workSeconds]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isWorking) {
            interval = setInterval(() => {
                updateTimeLeft();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isWorking, breakMinutes, breakSeconds, workMinutes, workSeconds]);

    function updateTimeLeft() {
        setTimeLeft((prevTimeLeft) => {
            if (prevTimeLeft === 0) {
                setIsWorking((prevIsWorking) => !prevIsWorking);
                setIsAlarmOn(true);
                const breakTimeLeft = isWorking
                    ? breakMinutes * 60 + breakSeconds
                    : workMinutes * 60 + workSeconds;
                return breakTimeLeft;
            } else {
                return prevTimeLeft - 1;
            }
        });
    }

    function startTimer() {
        setIsWorking(true);
    }

    function stopTimer() {
        setIsWorking(false);
    }

    function resetTimer() {
        setWorkMinutes(25);
        setWorkSeconds(0);
        setBreakMinutes(5);
        setBreakSeconds(0);
        setIsWorking(false);
        setIsAlarmOn(false);
        setTimeLeft(25 * 60);
    }

    function handleWorkMinutesChange(event: React.ChangeEvent<HTMLInputElement>) {
        setWorkMinutes(Number(event.target.value));
    }



    function handleBreakMinutesChange(event: React.ChangeEvent<HTMLInputElement>) {
        setBreakMinutes(Number(event.target.value));
    }



    const time = new Date(timeLeft * 1000).toISOString().substr(14, 5);
    return (
        <div className="timer-central">
            <div className="timer-display">
                <span>{time}</span>
                {isAlarmOn && (<div className="alarm-message">
                    <audio id="audio" ref={(audio: HTMLAudioElement) => { if (audio) { audio.volume = volume } }} autoPlay onEnded={() => setIsAlarmOn(false)}>
                        <source src={alarmSound} />
                    </audio>




                    <p>Termino el tiempo de estudio Disfruta tu descanso!</p>
                </div>
                )}
            </div>
            <div className="timer-controls">
                <div className="timer-inputs">
                    <div>
                        <label htmlFor="work-minutes">Minutos de estudio: </label>
                        <input
                            type="number"
                            id="work-minutes"
                            min="0"
                            max="60"
                            value={workMinutes}
                            onChange={handleWorkMinutesChange}
                        />
                    </div>

                    <div>
                        <label htmlFor="break-minutes">Minutos de descanso: </label>
                        <input
                            type="number"
                            id="break-minutes"
                            min="0"
                            max="60"
                            value={breakMinutes}
                            onChange={handleBreakMinutesChange}
                        />
                    </div>

                </div>
                <div className="timer-buttons">
                    {!isWorking ? (
                        <button onClick={startTimer}>Iniciar</button>
                    ) : (
                        <button onClick={stopTimer}>Detener</button>
                    )}
                    <button onClick={resetTimer}>Reiniciar</button>
                </div>
            </div>
        </div>
    );

}

export default Contador;
