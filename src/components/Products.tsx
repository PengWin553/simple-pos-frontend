import { useEffect, useState } from "react";
import ProductModal from "./ProductModal";

interface Product {
    productId: string;
    productName: string;
    price: number;
    stock: number;
    unit: string;
    sku: string;
    categoryId: string;
}

interface Category {
    categoryId: string;
    categoryName: string;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);

    // Fetch Products
    const getProducts = async () => {
        try {
            const response = await fetch("http://localhost:5175/api/ProductApi/GetProducts");
            if (!response.ok) throw new Error('Network response was not ok');
            const result: Product[] = await response.json();
            setProducts(result);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const getCategories = async () => {
        try {
            const response = await fetch("http://localhost:5175/api/CategoryApi/GetCategories");
            if (!response.ok) throw new Error('Network response was not ok');
            const result: Category[] = await response.json();
            setCategories(result);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const deleteProduct = async (id: string) => {
        const response = await fetch(
            "http://localhost:5175/api/ProductApi/DeleteProduct?Id=" + id,
            {
                method: "DELETE",
            }
        );

        if (response.ok) {
            await getProducts();
        }
    }

    const handleAddProduct = () => {
        setProductToEdit(undefined);
        setIsModalOpen(true);
    };

    const handleEditProduct = (productId: string) => {
        const product = products.find(p => p.productId === productId);
        if (product) {
            setProductToEdit(product);
            setIsModalOpen(true);
        }
    };

    const handleSubmitProduct = () => {
        getProducts();
    };

    useEffect(() => {
        const fetchData = async () => {
            await getProducts();
            await getCategories();
        };
        fetchData();
    }, []);

    // Helper function to get category name
    const getCategoryName = (categoryId: string): string => {
        const category = categories.find(c => c.categoryId === categoryId);
        return category ? category.categoryName : 'Unknown';
    };

    return (
        <div className="p-8 bg-gray-800 min-h-screen">
            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitProduct}
                productToEdit={productToEdit}
                categories={categories}
            />
            <div className="flex flex-col max-w-6xl mx-auto bg-gray-900 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                <div className="p-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-50">Products</h1>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={handleAddProduct}
                    >
                        Add
                    </button>
                </div>
                    <div className="overflow-x-auto">
                        <table className="w-full bg-gray-900 ">
                            <thead className="bg-gray-800 text-gray-50">
                                <tr>
                                    <th className="py-3 px-4 border-b border-gray-700">Id</th>
                                    <th className="py-3 px-4 border-b border-gray-700">Name</th>
                                    <th className="py-3 px-4 border-b border-gray-700">Price</th>
                                    <th className="py-3 px-4 border-b border-gray-700">Stock</th>
                                    <th className="py-3 px-4 border-b border-gray-700">Unit</th>
                                    <th className="py-3 px-4 border-b border-gray-700">Sku</th>
                                    <th className="py-3 px-4 border-b border-gray-700">Category</th>
                                    <th className="py-3 px-4 border-b border-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-50">
                                <tr>
                                    <td colSpan={8}>
                                        <div className="h-96 overflow-y-auto">
                                            <table className="w-full">
                                                <tbody>
                                                    {products.map((p) => (
                                                        <tr key={p.productId} className="bg-gray-900">
                                                            <td className="py-3 px-4 border-b border-gray-700">{p.productId}</td>
                                                            <td className="py-3 px-4 border-b border-gray-700">{p.productName}</td>
                                                            <td className="py-3 px-4 border-b border-gray-700">${p.price}</td>
                                                            <td className="py-3 px-4 border-b border-gray-700">{p.stock}</td>
                                                            <td className="py-3 px-4 border-b border-gray-700">{p.unit}</td>
                                                            <td className="py-3 px-4 border-b border-gray-700">{p.sku}</td>
                                                            <td className="py-3 px-4 border-b border-gray-700">{getCategoryName(p.categoryId)}</td>
                                                            <td className="py-3 px-4 border-b border-gray-700">
                                                                <button
                                                                    className="px-3 py-1 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                                                                    onClick={() => handleEditProduct(p.productId)}
                                                                >
                                                                    Edit
                                                                </button>
                                                                <button 
                                                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                                    onClick={() => deleteProduct (p.productId)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Products;
