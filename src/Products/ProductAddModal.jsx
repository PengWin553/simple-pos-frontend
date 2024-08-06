import {Modal} from 'react-bootstrap';

const ProductAddModal = ({
    showAddModal,
    makeAddModalAppear,
    productName,
    price,
    stock,
    unit,
    categoryId,
    setProductName,
    setPrice,
    setStock,
    setUnit,
    setCategoryId,
    saveProduct

    // categoryName,
    // setCategoryName,
    // saveCategory
}) => {

    return(
        <>
            {/* Add Product */}
            <Modal show={showAddModal} onHide={makeAddModalAppear}>
            <Modal.Header closeButton>
                <b className='bold-color'>New Product</b>
            </Modal.Header>
            <Modal.Body>
                <label htmlFor="name">Name:</label>
                <input type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    id="name"
                    placeholder='Enter product name'
                />

                <label htmlFor="price">Price:</label>
                <input type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id="price"
                    placeholder='Enter price'
                />

                <label htmlFor="stock">Stock:</label>
                <input type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    id="stock"
                    placeholder='Enter stock'
                />

                <label htmlFor="unit">Unit:</label>
                <input type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    id="unit"
                    placeholder='Enter unit'
                />

                <label htmlFor="category">Category:</label>
                <input type="text"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    id="category"
                    placeholder='Enter category id'
                />
            </Modal.Body>
            <Modal.Footer className="modal-footer">
                <button onClick={saveProduct} className="action-btn modal-btn">Save Product</button>
            </Modal.Footer>
            </Modal>
        </>
    );
} 

export default ProductAddModal;