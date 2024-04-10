import { useState, useEffect } from "react";
import "../styles/modal.scss";

const AddNewModal = ({ name, setName, addNew, setShowAddNewModal, persons }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => setError(null), 3000);
        console.log("click")
        return () => {
            clearInterval(interval);
        }
    }, [error]);

    return (
        <div className="modal small">
            <div className="modal-content">
                {error && <label className="error">{error}</label>}
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
                <button
                    className="send-button"
                    onClick={() => {
                        const personExists = persons.find((person) => person.name === name);
                        personExists ? setError("Nimi on jo käytössä!") : addNew(name);
                    }}
                >
                    Lisää
                </button>
                <button className="cancel-button" onClick={() => {
                    setName(null);
                    setShowAddNewModal(false)
                }}>
                    Peruuta
                </button>
            </div>
        </div>
    )
}

export default AddNewModal