import React from "react";
import "../styles/modal.scss";

const SignupModal = ({ name, password, setName, setPassword, signup, setShowSignupModal }) => (
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
                setName("");
                setPassword("");
                setShowSignupModal(false)
            }}>
                Peruuta
            </button>
        </div>
    </div>
)

export default SignupModal