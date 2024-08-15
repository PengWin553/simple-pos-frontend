import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";

function AppRoutes() {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Products />} />
            </Routes>
        </>
    )
}

export default AppRoutes;