import { useState, useEffect } from 'react';
import creeperHead from '../assets/creeperhead.png';

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

    return (
        <>
            {/* Display All Product Data */}
            <div className="content-container">
                <div className="card-content-container">
                    <div className="card-container">
                        {products.map((p) => (
                            <div key={p.productId} className="product-card">
                                <img src={creeperHead} alt="a creeper head" />
                                <h3 className='product-name'>{p.productName}</h3>
                                <p>${p.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
           
        </>
    )
}

export default Dashboard;