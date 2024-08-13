import { useState, useEffect } from "react";
import creeperHead from "../assets/creeperhead.png";
import "boxicons";
import API_BASE_URL from "../config";
import axios from "axios";  // Add this import

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [checkOut, setCheckOut] = useState([]);

  const getProducts = async () => {
    const response = await fetch(API_BASE_URL + "/api/ProductApi/GetProducts");
    const result = await response.json();
    setProducts(result);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSelectProduct = (product) => {
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

  const handleQuantityChange = (productId, change) => {
    setCheckOut((prevCheckOut) =>
      prevCheckOut.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const calculateTotal = () => {
    return checkOut
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    const transaction = {
      totalAmount: parseFloat(calculateTotal()),
      transactionProduct: checkOut.map(item => ({
        productName: item.productName,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await axios.post(API_BASE_URL + "/api/TransactionApi/SaveTransaction", transaction);
      if (response.data && response.data.message) {
        alert(response.data.message);
        setCheckOut([]);
      }
    } catch (error) {
      console.error("Error saving transaction:", error);
      alert("There was an error processing your transaction.");
    }
  };

  return (
    <div className="content-container">
      <div className="card-content-container">
        <div className="card-container">
          {products.map((p) => (
            <label
              key={p.productId}
              className="product-card"
              htmlFor={`checkbox-${p.productId}`}
              onClick={() => handleSelectProduct(p)}
              style={{ cursor: "pointer" }}
            >
              <img src={creeperHead} alt="a creeper head" />
              <h3 className="product-name">{p.productName}</h3>
              <p className="product-price">${p.price}</p>
              <input
                id={`checkbox-${p.productId}`}
                type="checkbox"
                checked={checkOut.some(
                  (item) => item.productId === p.productId
                )}
                onChange={() => handleSelectProduct(p)}
                style={{ display: "none" }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="checkOutContainer">
        <h4 className="checkout-title">
          <strong>Checkout</strong>
        </h4>
        <div className="fixTableHead">
          <table className="checkout-table">
            <thead className="thead">
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {checkOut.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productName}</td>
                  <td>${item.price}</td>
                  <td
                    style={{
                      background: "",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <i
                      className="bx bxs-minus-circle bx-quantity-icon"
                      onClick={() => handleQuantityChange(item.productId, -1)}
                    />
                    <span style={{ paddingLeft: "8px", paddingRight: "8px" }}>
                      {item.quantity}
                    </span>
                    <i
                      className="bx bxs-plus-circle bx-quantity-icon"
                      onClick={() => handleQuantityChange(item.productId, 1)}
                    />
                  </td>
                  <td className="trash-column">
                    <i
                      className="bx bxs-trash"
                      onClick={() => handleSelectProduct(item)}
                      style={{ textAlign: "center" }}
                    ></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="foot">
          <div className="total-container">
            <h6 colSpan="3">
              <strong>Total:</strong>
            </h6>
            <h6>${calculateTotal()}</h6>
          </div>
          <div className="checkout-btn-container">
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
