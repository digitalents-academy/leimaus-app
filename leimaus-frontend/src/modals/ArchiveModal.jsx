import { useState } from "react";
import "../styles/modal.scss";

const ArchiveModal = ({ fetchData, setShowArchiveModal }) => {
    const [name, setName] = useState(null);

    return (
        <div className="modal small">
            <div className="modal-content">
                <div className="auth-content">
                    <label>Läsnäoloarkisto</label>
                    <div className="inputs">
                        <div className="input-field">
                            <input type="text" placeholder="Nimi" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-buttons">
                <button className="send-button" onClick={() => {
                    fetchData(name);
                    setShowArchiveModal(false);
                    setName(null);
                }}>
                    Hae arkistosta
                </button>
                <button className="cancel-button" onClick={() => {
                    setName(null);
                    setShowArchiveModal(false)
                }}>
                    Peruuta
                </button>
            </div>
        </div>
    )
}

export default ArchiveModal