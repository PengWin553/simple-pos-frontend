import {Modal} from 'react-bootstrap';

const ClientUpdateModal = ({
    showUpdateModal,
    makeUpdateModalAppear,
    id,
    clientName,
    residency,
    setResidency,
    setClientName,
    setId,
    updateClient
}) => {

    return(
        <>
            {/* Update Client */}
            <Modal show={showUpdateModal} onHide={makeUpdateModalAppear}>
                <Modal.Header closeButton>
                    <b className='bold-color'>Update Client Info</b>
                </Modal.Header>
                <Modal.Body>
                    {/* <label htmlFor="id">Id:</label> */}
                    <input type="hidden"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        id="id"
                        readOnly
                    />

                    <label htmlFor="name">Name:</label>
                    <input type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        id="name"
                    />

                    <label htmlFor="residency">Residency:</label>
                    <input type="text"
                        value={residency}
                        onChange={(e) => setResidency(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={updateClient} className="action-btn modal-btn" >Update Client</button>
                </Modal.Footer>
            </Modal>
        </>
    );
} 

export default ClientUpdateModal;