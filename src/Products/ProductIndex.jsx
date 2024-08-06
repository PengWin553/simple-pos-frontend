import { useState, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const Products = () => {
    // get Products to display
    const [products, setProducts] = useState([]);
    
    // get Categories to display
    const [categories, setCategories] = useState([]);

    // set loading...
    const [loading, setLoading] = useState(true);

    // Fetch Products
    const getProducts = async () => {
        const response = await fetch(
            "http://localhost:5175/api/ProductApi/GetProducts"
        );

        const result = await response.json();
        setProducts(result);
    }

    // Fetch Categories
    const getCategories = async () => {
        const response = await fetch(
            "http://localhost:5175/api/CategoryApi/GetCategories"
        );

        const result = await response.json();
        setCategories(result);
    }

    // update browser in case of database updates
    useEffect(() => {
        const fetchData = async () => {
            await getProducts();
            await getCategories();
            setLoading(false);
        };
        fetchData();
    }, []);

    // Helper function to get category name
    const getCategoryName = (categoryId) => {
        const category = categories.find(c => c.categoryId === categoryId);
        return category ? category.categoryName : 'Unknown';
    };

    // if the browser is still loading data
    if (loading) return <center><h1>Loading</h1></center>

    return (
        <>
            {/* Display All Product Data */}
            <div className="content-container">
                <div className="table-container">
                    <div className="fixTableHead">
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Unit</th>
                                    <th>Category</th>
                                    <th className='action-btn-row-container'>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p) =>
                                    <tr key={p.productId}>
                                        <td>{p.productId}</td>
                                        <td>{p.productName}</td>
                                        <td>{p.price}</td>
                                        <td>{p.stock}</td>
                                        <td>{p.unit}</td>
                                        <td>{getCategoryName(p.categoryId)}</td>
                                        <td className='action-btn-container-display'>
                                            {/* Action buttons */}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
           
            <Toaster expand={true} richColors position='bottom-right' className='mr-8'></Toaster>
        </>
    );
}

export default Products;