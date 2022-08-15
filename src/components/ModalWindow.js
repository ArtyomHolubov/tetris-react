import React from 'react';

function ModalWindow({children}) {
    return (
        <>
            <div className={'modal-cover'}>
                <div className={'modal-window'}>
                    {children}
                </div>
            </div>
            <style jsx>{`
              .modal-cover {
                position: absolute;
                height: 100%;
                width: 100%;
                background-color: rgba(0,0,0,0.5);
                z-index: 100;
              }

              .modal-window {
                position: absolute;
                top: 50%;
                left: 50%;    
                transform: translate(-50%, -50%);
                z-index: 200;    
              }
            `}</style>
        </>
    );
}

export default ModalWindow;
