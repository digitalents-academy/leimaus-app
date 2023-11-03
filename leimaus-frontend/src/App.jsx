import { useState, useEffect } from 'react'
import { initPersons, getTime, clearAllowed } from './features/functions'
import './App.scss'

function App() {
  const [persons, setPersons] = useState(initPersons());
  const [time, setTime] = useState(getTime);
  const [helloText, setHelloText] = useState(null);

  useEffect(() => {
    if (localStorage.stamps) {
      setPersons(JSON.parse(localStorage.getItem('stamps')))
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setTime(getTime()), 1000);
    return () => {
      clearInterval(interval);
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => setHelloText(null), 3000);
    return () => {
      clearInterval(interval);
    }
  }, [helloText])

  const createStamp = async () => {
    let d = new Date()
    let current_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
    try {
      await fetch("http://localhost:5000/api/stamps", {
        method: "POST",
        headers: {
          "content-type": "application/JSON",
        },
        body: JSON.stringify({ date: current_date, data: persons }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className='main'>
      <div className='content'>
        {persons.map((person, index) => (
          <button 
            className={`person ${person.stamp ? "stamped" : ""}`}
            key={index}
            disabled={person.stamp}
            onClick={() => {
              let persons_copy = [...persons];
              persons_copy[index].stamp = getTime();
              setPersons(persons_copy);
              setHelloText("Huomenta, " + person.name + "!"),
              localStorage.setItem('stamps', JSON.stringify(persons_copy));
            }}>
            {person.name}
          </button>
        ))}
      </div>
      <div className='sidebar'>
        <div className='clock-greets'>
          <div className='clock'>
            {time}
          </div>
          <div className='greetings'>
            <label>{helloText}</label>
          </div>
        </div>
        {clearAllowed() ? (
          <div 
            className='clear-button'
            onClick={() => {
              localStorage.removeItem('stamps');
              setPersons(initPersons())
              createStamp()
            }}
          >
          Alusta
          </div>) : (
          <div className='clear-button disabled'>Alustus klo 12</div>
        )}
      </div>
    </div>
  )
}

export default App
