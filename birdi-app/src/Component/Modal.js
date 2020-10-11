import React from 'react'
import './css/modal.css'
import ReactDOM from 'react-dom'
import EscapeOutside from 'react-escape-outside'

function Modal({load, img, setLoad}) {
    if (load==="") return null
    return ReactDOM.createPortal (
        <>
            <div className="overlay" onClick={() => (load==="img")?setLoad(""):null}/>
            <div className="modal">
                <div className="modal__content">

                    {load==="load"?
                        <div className="load">
                            <div className="load__circle">
                                <div className="load__spinner load-red"/>
                                <div className="load__spinner load-blue"/>
                                <div className="load__spinner load-green"/>

                                <div className="load-txt">
                                    Loading ...
                                </div>
                            </div>
                        </div>:
                    load==="img"?
                        <EscapeOutside onEscapeOutside={() => setLoad("")}>
                            <div className="popup">
                                <div className="popup__content">
                                    <div className="img">
                                        <span onClick={() => setLoad("")}>CLOSE</span>
                                        <img src={img} alt=""/>
                                    </div>
                                </div>
                            </div>
                        </EscapeOutside>
                        :""
                    }
                </div>
            </div>
        </>,
        document.getElementById("portal")
    )
}

export default Modal
