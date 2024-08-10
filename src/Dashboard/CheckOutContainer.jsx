const CheckOutContainer = () =>{
    return(
        // <div className="checkOutContainer">
            
        // </div>

        <table className="checkout-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                    <tr>
                    
                        <td></td>
                        <td></td>
                        <td>
                            <i class='bx bxs-minus-circle bx-quantity-icon' />
                            <span></span>
                            <i class='bx bxs-plus-circle bx-quantity-icon' />
                        </td>
                        <td className='trash-column'>
                            {/* <i class='bx bxs-trash'></i> */}
                        </td>
                    
                    </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="3"><strong>Total:</strong></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>

    );
}

export default CheckOutContainer;