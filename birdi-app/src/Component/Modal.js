import React from 'react'
import './css/modal.css'
import ReactDOM from 'react-dom'

function Modal({load}) {
    if (load==="") return null
    return ReactDOM.createPortal (
        <>
            <div className="overlay"/>
            <div className="modal">
                <div className="modal__content">

                    {load==="load"?<div className="load">
                        <div className="load__circle">
                            <div className="load__spinner load-red"/>
                            <div className="load__spinner load-blue"/>
                            <div className="load__spinner load-green"/>

                            <div className="load-txt">
                                Loading ...
                            </div>
                        </div>
                    </div>:""}

                    <div className="popup">

                    </div>
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default Modal
