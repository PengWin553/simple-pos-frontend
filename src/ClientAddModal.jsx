import {Modal} from 'react-bootstrap';

const ClientAddModal = ({
    showAddModal,
    makeAddModalAppear,
    clientName,
    residency,
    setResidency,
    setClientName,
    saveClient
}) => {

    return(
        <>
            {/* Add Client */}
            <Modal show={showAddModal} onHide={makeAddModalAppear}>
            <Modal.Header closeButton>
                <b className='bold-color'>New Client Info</b>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    id="name"
                    placeholder='Enter client name'
                />

                <label htmlFor="residency">Residency:</label>
                <input type="text"
                    value={residency}
                    onChange={(e) => setResidency(e.target.value)}
                    placeholder='Enter residency'
                />
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <button onClick={saveClient} className="action-btn modal-btn">Save Client</button>
            </Modal.Footer>
            </Modal>
        </>
    );
} 

export default ClientAddModal;