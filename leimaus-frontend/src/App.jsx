import { useState, useEffect } from 'react'
import { getTime } from './features/functions'
import { UserAuth } from "./context/AuthContext";
import Clock from './components/Clock';
import SignupModal from './modals/SignupModal';
import LoginModal from './modals/LoginModal';
import AnalyticModal from './modals/AnalyticModal';
import AddNewModal from './modals/AddNewModal';
import DeleteModal from './modals/DeleteModal';
import ArchiveModal from './modals/ArchiveModal';
import './styles/App.scss'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [helloText, setHelloText] = useState(null);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showAnalyticModal, setShowAnalyticModal] = useState(false);
    const [showAddNewModal, setShowAddNewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [analyticData, setAnalyticData] = useState(null);
    const [databaseStatus, setDatabaseStatus] = useState(true);

    const { user, error, register, login, logout } = UserAuth();

    const fetchPersons = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/trainees`);
            const mernPersons = await res.json();
            console.log(mernPersons)
            // check if person exists in localstorage and replace the data
            if (localStorage.stamps) {
                const localPersons = JSON.parse(localStorage.getItem('stamps'));
                for (let i = 0; i < mernPersons.length; i++) {
                    const j = localPersons.findIndex((stamp) => stamp.name === mernPersons[i].name)
                    if (j >= 0) {
                        mernPersons[i] = localPersons[j]
                    }
                }
            }
            setPersons(mernPersons);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchPersons();
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

    useEffect(() => {
        const twentyFourHours = 86400000;
        const now = new Date();
        let eta_ms = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 0, 0, 0).getTime() - now;
        if (eta_ms < 0) {
            eta_ms += twentyFourHours;
        }
        setTimeout(() => {
            // execute when the first 15:00
            localStorage.removeItem('stamps');
            fetchPersons()
            setInterval(() => {
                // execute every 15:00 after the first execution
                localStorage.removeItem('stamps');
                fetchPersons()
            }, twentyFourHours);
        }, eta_ms);
    }, [])

    const saveToDatabase = async (person_copy) => {
        let d = new Date()
        let current_date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
        try {
            const res = await fetch("http://localhost:5000/api/stamps", {
                method: "POST",
                headers: {
                    "content-type": "application/JSON",
                },
                body: JSON.stringify({ date: current_date, data: person_copy }),
            });
            setDatabaseStatus(res.ok)
        } catch (error) {
            console.log(error);
        }
    };

    const stampHandler = (name, index) => {
        let persons_copy = [...persons];
        persons_copy[index].stamp = getTime();
        saveToDatabase(persons_copy);
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
        } catch (e) {
            console.log(e);
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
            setShowAddNewModal(false);
            fetchPersons();
        } catch (e) {
            console.log(e)
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
        } catch (e) {
            console.log(e)
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
                    <Clock />
                    <div className='greetings'>
                        <label>{helloText}</label>
                    </div>
                </div>
                {error && <label className='database-error'>{error}</label>}
                <div className="buttons">
                    {user && <label className='user-text'>{user}</label>}
                    {user && <div className='auth-button' onClick={() => setShowArchiveModal(true)}>Arkisto</div>}
                    {user && <div className='auth-button' onClick={() => setShowAddNewModal(true)}>+ Lisää uusi</div>}
                    {user && <div className='auth-button' onClick={() => setShowDeleteModal(true)}>- Poista</div>}
                    {!databaseStatus && <div className='database-error'>Tallennus ei onnistunut</div>}
                    <div className='auth-button' onClick={() => setShowSignupModal(true)}>Rekisteröidy</div>
                    {user ?
                        (<div className='auth-button' onClick={() => logout()}>Kirjaudu ulos</div>)
                        :
                        (<div className='auth-button' onClick={() => setShowLoginModal(true)}>Kirjaudu</div>)
                    }
                </div>
            </div>
            {showSignupModal && (
                <SignupModal name={name} password={password} setName={setName} setPassword={setPassword} signup={signup} setShowSignupModal={setShowSignupModal} />
            )}
            {showLoginModal && (
                <LoginModal name={name} password={password} setName={setName} setPassword={setPassword} signin={signin} setShowLoginModal={setShowLoginModal} />
            )}
            {showAnalyticModal && (
                <AnalyticModal analyticData={analyticData} setAnalyticData={setAnalyticData} setShowAnalyticModal={setShowAnalyticModal} />
            )}
            {showAddNewModal && (
                <AddNewModal name={name} setName={setName} addNew={addNew} setShowAddNewModal={setShowAddNewModal} persons={persons} />
            )}
            {showDeleteModal && (
                <DeleteModal name={name} setName={setName} deletePerson={deletePerson} setShowDeleteModal={setShowDeleteModal} />
            )}
            {showArchiveModal && (
                <ArchiveModal fetchData={fetchData} setShowArchiveModal={setShowArchiveModal} />
            )}
        </div>
    )
}

export default App
