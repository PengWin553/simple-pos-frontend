import {Modal} from 'react-bootstrap';

const ClientDeleteModal = ({
    showDeleteModal,
    makeDeleteModalAppear,
    id,
    clientName,
    residency,
    deleteClient
}) => {
    return(
        <>
            <Modal show={showDeleteModal} onHide={makeDeleteModalAppear}>
            <Modal.Header closeButton>
                <h3 className="delete-modal-title"><b>Are you sure you want to delete this?</b></h3>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="name" className='delete-label-styles'>Name: <span className='delete-data-text'>{clientName}</span> </label>
                <label htmlFor="residency" className='delete-label-styles'>Residency: <span className='delete-data-text'>{residency}</span> </label>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => deleteClient(id)} className="action-btn modal-btn">Confirm Deletion</button>
            </Modal.Footer>
        </Modal>
        </>
    );
} 

export default ClientDeleteModal;