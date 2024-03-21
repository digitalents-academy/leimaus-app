import { useState, useEffect } from 'react'
import { getTime, clearAllowed, weekdays } from './features/functions'
import { UserAuth } from "./context/AuthContext";
import './App.scss'

function App() {
  const [persons, setPersons] = useState([]);
  const [time, setTime] = useState(getTime);
  const [helloText, setHelloText] = useState(null);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAnalyticModal, setShowAnalyticModal] = useState(false);
  const [showAddnewModal, setShowAddnewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [analyticData, setAnalyticData] = useState(null);
  const [databaseStatus, setDatabaseStatus] = useState(true);

  const { user, register, login, logout } = UserAuth();

  const fetchPersons = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/trainees`);
      const data = await res.json();
      // check if person exists in localstorage and replace the data
      if (localStorage.stamps) {
        const stamps = JSON.parse(localStorage.getItem('stamps'));
        for (let i = 0; i < data.length; i++) {
          const j = stamps.findIndex((stamp) => stamp.name === data[i].name)
          if (j >= 0) {
            data[i] = stamps[j]
          }
        }
      }
      setPersons(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPersons();
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
  }, [helloText]);

  useEffect(() => {
    const interval = setInterval(() => setDatabaseStatus(true), 3000);
    return () => {
      clearInterval(interval);
    }
  }, [databaseStatus]);

  const createStamp = async () => {
    let d = new Date()
    let current_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
    try {
      const res = await fetch("http://localhost:5000/api/stamps", {
        method: "POST",
        headers: {
          "content-type": "application/JSON",
        },
        body: JSON.stringify({ date: current_date, data: persons }),
      });
      setDatabaseStatus(res.ok)
      if (res.ok) {
        localStorage.removeItem('stamps');
        fetchPersons()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const stampHandler = (name, index) => {
    let persons_copy = [...persons];
    persons_copy[index].stamp = getTime();
    setPersons(persons_copy);
    setHelloText("Huomenta, " + name + "!");
    localStorage.setItem('stamps', JSON.stringify(persons_copy));
  }

  const fetchData = async (name) => {
    try {
      const res = await fetch(`http://localhost:5000/api/stamps/${name}`);
      const data = await res.json();
      setAnalyticData(data);
      setShowAnalyticModal(true);
    } catch (error) {
      console.log(error);
    }
  }

  const addNew = async (name) => {
    try {
      const res = await fetch("http://localhost:5000/api/trainees", {
        method: "POST",
        headers: {
          "content-type": "application/JSON",
        },
        body: JSON.stringify({ name: name }),
      });
      setDatabaseStatus(res.ok)
      setName(null);
      setShowAddnewModal(false);
      fetchPersons();
    } catch (error) {
      console.log(error)
    }
  }

  const deletePerson = async (name) => {
    try {
      const res = await fetch("http://localhost:5000/api/trainees", {
        method: "DELETE",
        headers: {
          "content-type": "application/JSON",
        },
        body: JSON.stringify({ name: name }),
      });
      setDatabaseStatus(res.ok);
      console.log(res)
      setName(null);
      setShowDeleteModal(false);
      fetchPersons();
    } catch (error) {
      console.log(error)
    }
  }

  const signup = () => {
    if (name && password) {
      register(name, password);
    }
    setName(null);
    setPassword(null);
    setShowSignupModal(false)
  }

  const signin = () => {
    if (name && password) {
      login(name, password);
    }
    setName(null);
    setPassword(null);
    setShowLoginModal(false)
  }

  return (
    <div className='main'>
      <div className="content-bg">
        <div className='content'>
          {persons.map((person, index) => (
            <button
              className={`person ${person.stamp ? "stamped" : ""}`}
              key={index}
              disabled={!user && person.stamp}
              onClick={() => user ? fetchData(person.name) : stampHandler(person.name, index)}>
              {person.name}
            </button>
          ))}
        </div>
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
        <div className="buttons">
          {user && <label className='user-text'>{user}</label>}
          {user && <div className='auth-button' onClick={() => setShowAddnewModal(true)}>+ Add new</div>}
          {user && <div className='auth-button' onClick={() => setShowDeleteModal(true)}>- Delete</div>}
          {clearAllowed() ? (
            <div
              className='clear-button'
              onClick={() => createStamp()}
            >
              Tallenna
            </div>) : (
            <div className='clear-button disabled'>Tallenna</div>
          )}
          {!databaseStatus && <div className='database-error'>Tallennus ei onnistunut</div>}
          <div className='auth-button' onClick={() => setShowSignupModal(true)}>Sign up</div>
          <div className='auth-button' onClick={() => setShowLoginModal(true)}>Sign in</div>
          <div className='auth-button' onClick={() => logout()}>Sign out</div>
        </div>
      </div>
      {showSignupModal && (
        <div className="modal small">
          <div className="modal-content">
            <div className="auth-content">
              <label>Rekisteröidy</label>
              <div className="inputs">
                <div className="input-field">
                  <input type="text" placeholder="Nimi" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-field">
                  <input type="password" placeholder="Salasana" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-buttons">
            <button className="send-button" onClick={() => signup()}>
              Lähetä
            </button>
            <button className="cancel-button" onClick={() => {
              setName(null);
              setPassword(null);
              setShowSignupModal(false)
            }}>
              Peruuta
            </button>
          </div>
        </div>
      )}
      {showLoginModal && (
        <div className="modal small">
          <div className="modal-content">
            <div className="auth-content">
              <label>Kirjaudu sisään</label>
              <div className="inputs">
                <div className="input-field">
                  <input type="text" placeholder="Nimi" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="input-field">
                  <input type="password" placeholder="Salasana" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-buttons">
            <button className="send-button" onClick={() => signin()}>
              Lähetä
            </button>
            <button className="cancel-button" onClick={() => {
              setName(null);
              setPassword(null);
              setShowLoginModal(false)
            }}>
              Peruuta
            </button>
          </div>
        </div>
      )}
      {showAnalyticModal && (
        <div className="modal">
          <div className="modal-content">
            <div className='analytic-main'>
              {analyticData.map((data, index) => {
                const d = data.date.split('-');
                const nd = new Date(d[0], d[1] - 1, d[2])
                return (
                  <div className={`analytic-row ${index % 2 === 0 ? "even" : ""}`} key={index}>
                    <div className='date'>
                      <div>{weekdays[nd.getDay()]}</div>
                      <div>{nd.getDate()}.{nd.getMonth() + 1}</div>
                    </div>
                    <div>{data.stamp ? data.stamp : "ei leimausta"}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="modal-buttons">
            <button className="send-button" onClick={() => {
              setAnalyticData(null);
              setShowAnalyticModal(false);
            }}>
              Sulje
            </button>
          </div>

        </div>
      )}
      {showAddnewModal && (
        <div className="modal small">
          <div className="modal-content">
            <div className="auth-content">
              <label>Lisää uusi pajalainen</label>
              <div className="inputs">
                <div className="input-field">
                  <input type="text" placeholder="Nimi" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-buttons">
            <button className="send-button" onClick={() => addNew(name)}>
              Lisää
            </button>
            <button className="cancel-button" onClick={() => {
              setName(null);
              setShowAddnewModal(false)
            }}>
              Peruuta
            </button>
          </div>
        </div>
      )}
      {showDeleteModal && (
        <div className="modal small">
          <div className="modal-content">
            <div className="auth-content">
              <label>Poista pajalainen</label>
              <div className="inputs">
                <div className="input-field">
                  <input type="text" placeholder="Nimi" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
          <div className="modal-buttons">
            <button className="send-button" onClick={() => deletePerson(name)}>
              Poista
            </button>
            <button className="cancel-button" onClick={() => {
              setName(null);
              setShowDeleteModal(false)
            }}>
              Peruuta
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
