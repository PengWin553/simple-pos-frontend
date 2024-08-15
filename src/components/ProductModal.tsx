import { useState, useEffect } from "react";

interface Product {
    productId: string;
    productName: string;
    price: number;
    stock: number;
    unit: string;
    sku: string;
    categoryId: string;
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (product: Product) => void;
    productToEdit?: Product;
    categories: { categoryId: string; categoryName: string }[];
}

const ProductModal = ({ isOpen, onClose, onSubmit, productToEdit, categories }: ProductModalProps) => {
    const [product, setProduct] = useState<Product>({
        productId: "",
        productName: "",
        price: 0,
        stock: 0,
        unit: "",
        sku: "",
        categoryId: ""
    });

    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
        } else {
            setProduct({
                productId: "",
                productName: "",
                price: 0,
                stock: 0,
                unit: "",
                sku: "",
                categoryId: ""
            });
        }
    }, [productToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveProductS = async (product: Product) => {
        let payload;

        if (product.productId) {
            payload = { ...product };
        } else {
            const { productId, ...productWithoutId } = product;
            payload = productWithoutId;
        }
        const url = product.productId 
            ? `http://localhost:5175/api/ProductApi/UpdateProduct?Id=${product.productId}`
            : 'http://localhost:5175/api/ProductApi/SaveProduct';

        const method = product.productId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const result = await response.json();
            console.log('Product saved:', result);

            onSubmit(product);
            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('There was an error saving the product. Please try again.');
        }
    };

    const handleSubmit = () => {
        saveProductS(product);
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
            
            {/* Modal */}
            <dialog open className="fixed inset-0 m-auto p-6 bg-gray-900 text-gray-50 rounded-lg shadow-lg z-50 w-96">
                <h2 className="text-xl font-bold mb-4">{productToEdit ? "Edit Product" : "Add Product"}</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="productName">Name</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={product.productName}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 text-gray-50 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 text-gray-50 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="stock">Stock</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 text-gray-50 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="unit">Unit</label>
                        <input
                            type="text"
                            id="unit"
                            name="unit"
                            value={product.unit}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 text-gray-50 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="sku">SKU</label>
                        <input
                            type="text"
                            id="sku"
                            name="sku"
                            value={product.sku}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 text-gray-50 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="categoryId">Category</label>
                        <select
                            id="categoryId"
                            name="categoryId"
                            value={product.categoryId}
                            onChange={handleChange}
                            className="w-full p-2 bg-gray-800 text-gray-50 rounded"
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map(category => (
                                <option key={category.categoryId} value={category.categoryId}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button type="button" className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                            {productToEdit ? "Update" : "Add"}
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
};

export default ProductModal;
