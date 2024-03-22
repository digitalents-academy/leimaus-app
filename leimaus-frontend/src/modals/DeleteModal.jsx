import React from "react";
import "../styles/modal.scss";

const DeleteModal = ({ name, setName, deletePerson, setShowDeleteModal }) => (
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
)

export default DeleteModal