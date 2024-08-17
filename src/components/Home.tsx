import { useState, useEffect } from "react";
import { LuTrash } from "react-icons/lu";

interface Product {
    productId: string;
    productName: string;
    price: number;
}

interface CheckOutProduct extends Product {
    quantity: number;
}

const Home = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [checkOut, setCheckOut] = useState<CheckOutProduct[]>([]);

    const getProducts = async () => {
        const response = await fetch("http://localhost:5175/api/ProductApi/GetProducts");
        const result: Product[] = await response.json();
        setProducts(result);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const handleSelectProduct = (product: Product) => {
        setCheckOut((prevCheckOut) => {
            const existingProduct = prevCheckOut.find(
                (item) => item.productId === product.productId
            );
            if (existingProduct) {
                return prevCheckOut.filter(
                    (item) => item.productId !== product.productId
                );
            } else {
                return [...prevCheckOut, { ...product, quantity: 1 }];
            }
        });
    };

    const handleQuantityChange = (productId: string, change: number) => {
        setCheckOut((prevCheckOut) =>
            prevCheckOut.map((item) =>
                item.productId === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + change) }
                    : item
            )
        );
    };

    const calculateTotal = (): string => {
        return checkOut
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2);
    };

    const handleCheckout = async () => {
        const transaction = {
            totalAmount: parseFloat(calculateTotal()),
            transactionProduct: checkOut.map((item) => ({
                productName: item.productName,
                price: item.price,
                quantity: item.quantity,
            })),
        };

        try {
            const response = await fetch(
                "http://localhost:5175/api/TransactionApi/SaveTransaction", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(transaction)
                }
            );
            const data = await response.json();
            if (data && data.message) {
                alert(data.message);
                setCheckOut([]);
            }
        } catch (error) {
            console.error("Error saving transaction:", error);
            alert("There was an error processing your transaction.");
        }
    };

    return (
        <div className="pl-28 pt-12 flex bg-gray-800 h-screen">
            <div className="pr-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[75dvh] overflow-y-auto p-8">
                    {products.map((p) => (
                        <label
                            key={p.productId}
                            className="bg-gray-900 text-white p-4 rounded-lg shadow-lg cursor-pointer flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-gray-700 hover:shadow-xl"
                            htmlFor={`checkbox-${p.productId}`}
                            onClick={() => handleSelectProduct(p)}
                        >
                            <img alt="a product" className="w-24 h-24 mb-4" />
                            <h3 className="text-lg font-semibold">{p.productName}</h3>
                            <p className="text-lg font-semibold">${p.price}</p>
                            <input
                                id={`checkbox-${p.productId}`}
                                type="checkbox"
                                checked={checkOut.some(
                                    (item) => item.productId === p.productId
                                )}
                                onChange={() => handleSelectProduct(p)}
                                className="hidden"
                            />
                        </label>
                    ))}
                </div>
            </div>

            <div className="bg-gray-900 text-white rounded-lg shadow-lg max-h-[70dvh] text-center">
                <h4 className="text-xl font-semibold mb-4">Checkout</h4>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Price</th>
                                <th className="py-2 px-4">Quantity</th>
                                <th className="py-2 px-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkOut.map((item) => (
                                <tr key={item.productId}>
                                    <td className="py-2 px-4">{item.productName}</td>
                                    <td className="py-2 px-4">${item.price}</td>
                                    <td className="py-2 px-4 flex justify-center items-center">
                                        <button
                                            className="text-xl text-yellow-500"
                                            onClick={() => handleQuantityChange(item.productId, -1)}
                                        >
                                            -
                                        </button>
                                        <span className="px-2">{item.quantity}</span>
                                        <button
                                            className="text-xl text-yellow-500"
                                            onClick={() => handleQuantityChange(item.productId, 1)}
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td className="py-2 px-4">
                                        <button
                                            className="text-red-500"
                                            onClick={() => handleSelectProduct(item)}
                                        >
                                            <LuTrash/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-between items-center mt-4 p-6">
                    <h6 className="text-lg font-semibold">Total:</h6>
                    <h6 className="text-lg font-semibold">${calculateTotal()}</h6>
                </div>

                <div className="mt-4 flex justify-center">
                    <button
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
