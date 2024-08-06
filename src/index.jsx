import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

// // import CategoryAddModal
// import CategoryAddModal from './CategoryAddModal.jsx';

// // import CategoryUpdateModal
// import CategoryUpdateModal from './CategoryUpdateModal.jsx';

// // import CategoryDeleteModal
// import CategoryDeleteModal from './CategoryDeleteModal.jsx';

const Categories = () => {

    // get Categories to display
    const [categories, setCategories] = useState([]);

    // set loading...
    const [loading, setLoading] = useState(true);

    // Handle individual variables
    const [categoryId, setCategoryId] = useState("");
    const [categoryName, setCategoryName] = useState("");

    // Add Modal
    const [showAddModal, setShowAddModal] = useState(false);
    const makeAddModalAppear = () => setShowAddModal(!showAddModal);

    // Update Modal
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const makeUpdateModalAppear = () => setShowUpdateModal(!showUpdateModal);

    // Delete Modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const makeDeleteModalAppear = () => setShowDeleteModal(!showDeleteModal);

    // Fetch Categories
    const getCategories = async () => {
        const response = await fetch(
            "http://localhost:5175/api/CategoryApi/GetCategories"
        );
        const result = await response.json();
        setCategories(result);
        setLoading(false);
    }

    // // Fetch Client
    // const getClient = async (id) => {
    //     const response = await fetch(
    //         "http://localhost:5029/api/ClientApi/GetClient?id=" + id,
    //     );

    //     const result = await response.json();
    //     setId(result.id);
    //     setClientName(result.clientName);
    //     setResidency(result.residency);

    //     setLoading(false);
    // }

    // // Add Client
    // const saveClient = async () => {
    //     const dataToSend = {
    //         "clientName": clientName,
    //         "residency": residency
    //     }

    //     const response = await fetch(
    //         "http://localhost:5029/api/ClientApi/SaveClient",
    //         {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(dataToSend)
    //         }
    //     );

    //     if (response.ok) {
    //         await getClients();
    //         makeAddModalAppear();
    //         setClientName('');
    //         setResidency('');
    //         toast.success('Client saved successfully');
    //     } else {
    //         toast.error('Failed to save client');
    //     }
    // }

    // // Update Client
    // const updateClient = async () => {
    //     const dataToSend = {
    //         "clientName": clientName,
    //         "residency": residency,
    //     }

    //     const response = await fetch(
    //         "http://localhost:5029/api/ClientApi/UpdateClient?Id=" + id,
    //         {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             body: JSON.stringify(dataToSend)
    //         }
    //     );

    //     if (response.ok) {
    //         await getClients();
    //         makeUpdateModalAppear();
    //         setClientName('');
    //         setResidency('');
    //         toast.success('Client updated successfully');
    //     } else {
    //         toast.error('Failed to save client');
    //     }

    // }

    // // Delete Client
    // const deleteClient = async (id) => {
    //     const response = await fetch(
    //         "http://localhost:5029/api/ClientApi/DeleteClient?Id=" + id,
    //         {
    //             method: "DELETE",
    //         }
    //     );

    //     if (response.ok) {
    //         await getClients();
    //         makeDeleteModalAppear();
    //         setClientName('');
    //         setResidency('');
    //         toast.success('Client deleted successfully');
    //     } else {
    //         toast.error('Failed to delete client');
    //     }
    // }

    // update browser in case of database updates
    useEffect(() => {
        getCategories();
    }, []);

    // if the browser is still loading data
    if (loading) return <center><h1>Loading</h1></center>

    return (
        <>
            {/* Add Client */}
            {/* <ClientAddModal
                showAddModal={showAddModal}
                makeAddModalAppear={makeAddModalAppear}
                clientName={clientName}
                setClientName={setClientName}
                residency={residency}
                setResidency={setResidency}
                saveClient={saveClient}
            /> */}

            {/* Update Client */}
            {/* <ClientUpdateModal
                showUpdateModal={showUpdateModal}
                makeUpdateModalAppear={makeUpdateModalAppear}
                id={id}
                clientName={clientName}
                residency={residency}
                setResidency={setResidency}
                setClientName={setClientName}
                setId={setId}
                updateClient={updateClient}
            /> */}

            {/* Delete Client */}
            {/* <ClientDeleteModal
                showDeleteModal={showDeleteModal}
                makeDeleteModalAppear={makeDeleteModalAppear}
                id={id}
                clientName={clientName}
                residency={residency}
                deleteClient={deleteClient}
            /> */}
           
            <h3 className="title">Simple ReactJS POS With C# API</h3>

            {/* Show Add Client Modal */}
            <div className="add-client-btn-container">
                <button className="action-btn add-client-btn" onClick={makeAddModalAppear}>Add New Category</button>
            </div>

            {/* Display All Client Data */}
            <div className="fixTableHead">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th className='action-btn-row-container'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((c) =>
                            <tr key={c.categoryId}>
                                <td>{c.categoryId}</td>
                                <td>{c.categoryName}</td>
                                <td className='action-btn-container-display'>
                                    {/* <button className="action-btn row-btn update-client-btn" onClick={() => { getClient(c.id); makeUpdateModalAppear() }}>Update</button>
                                    <button className="action-btn row-btn delete-client-btn" onClick={() => { getClient(c.id); makeDeleteModalAppear() }}>Delete</button> */}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <Toaster expand={true} richColors position='bottom-right' className='mr-8'></Toaster>
        </>
    );
}

export default Categories;
