import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Transactions from "./components/Transactions";
import Categories from "./components/Categories";

function AppRoutes() {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/transactions" element={<Transactions />} />
            </Routes>
        </>
    )
}

export default AppRoutes;