import React from "react";
import "../styles/modal.scss";

const AddNewModal = ({ name, setName, addNew, setShowAddNewModal }) => (
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
                setShowAddNewModal(false)
            }}>
                Peruuta
            </button>
        </div>
    </div>
)

export default AddNewModal