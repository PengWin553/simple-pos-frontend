import { useState, useEffect } from 'react';

const Dashboard = () => {

    // get Products to display
    const [products, setProducts] = useState([]);

    // Fetch Products
    const getProducts = async () => {
        const response = await fetch(
            "http://localhost:5062/api/ProductApi/GetProducts"
        );

        const result = await response.json();
        console.log(result); // Add this line to check the API response
        setProducts(result);
    }

    // update browser in case of database updates
    useEffect(() => {
       getProducts();
    }, []);
    
    return(
      <>
        {/* Display All Product Data */}
            <div className="content-container">
                <div className="table-container">
                    <div className="fixTableHead">
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    {/* <th className='action-btn-row-container'>Actions</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) =>
                                    <tr key={p.productId}>
                                        <td>{p.productName}</td>
                                        <td>{p.price}</td>
                                        <td>{p.stock}</td>
                                        <td className='action-btn-container-display'>
                                            {/* <button className="action-btn row-btn update-client-btn" onClick={() => { handleSelectedData(p.productId, p.productName, p.price, p.stock, p.unit, p.sku, p.categoryId); makeUpdateModalAppear() }}>Update</button>
                                            <button className="action-btn row-btn delete-client-btn" onClick={() => { handleSelectedData(p.productId, p.productName); makeDeleteModalAppear() }}>Delete</button> */}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
      </>
    )
}

export default Dashboard;