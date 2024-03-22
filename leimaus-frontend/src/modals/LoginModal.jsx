import React from "react";
import "../styles/modal.scss";

const LoginModal = ({ name, password, setName, setPassword, signin, setShowLoginModal }) => (
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
)

export default LoginModal