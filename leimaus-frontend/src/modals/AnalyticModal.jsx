import React from "react";
import "../styles/modal.scss";

const AnalyticModal = ({ analyticData, setAnalyticData, setShowAnalyticModal }) => {

    const weekdays = ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'];

    return (
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
    )
}

export default AnalyticModal