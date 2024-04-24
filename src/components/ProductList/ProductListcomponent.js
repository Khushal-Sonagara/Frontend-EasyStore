import { useState, useEffect } from "react";
import './ProductListComponent.css';

function ProductList() {
    const [item, setItem] = useState([]);
    const [selectedQuantities, setSelectedQuantities] = useState({});
    useEffect(() => {
        fetch("http://localhost:5000/product")
            .then((res) => res.json())
            .then((res) => {
                setItem(res);
            });
    }, []);

    useEffect(() => {
        const initialQuantities = {};
        item.forEach(product => {
            initialQuantities[product._id] = "";
        });
        setSelectedQuantities(initialQuantities);
    }, [item]);

    const handleQuantityChange = (itemId, event) => {
        let inputValue = event.target.value;
        inputValue = inputValue.replace(/\D/, ''); 
        const parsedValue = parseInt(inputValue);
    
        setSelectedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [itemId]: parsedValue >= 0 ? parsedValue : 0,
        }));
    }

    const handleAddToCart = (item) => {
        const quantity = selectedQuantities[item._id];
        if (!quantity || quantity === 0) {
            alert("Please enter a quantity before adding to cart.");
            return; // Stop further execution
        }
        const auth=JSON.parse(localStorage.getItem('user'));
        const newItem = { ...item, quantity };
        console.log(newItem._id);
        console.log(newItem.quantity);
        fetch("http://localhost:5000/carts/"+auth._id, {
            method: "POST",
            body: JSON.stringify({productId:newItem._id, quantity:newItem.quantity}),
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Item added to cart:", data);
            })
            .catch((error) => {
                console.error("Error adding item to cart:", error);
            });
    }

    const QuantityIncrementDecrement = (id, quantity) => {
        console.log(id);
        setSelectedQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: Math.max((parseInt(prevQuantities[id]) || 0) + parseInt(quantity), 0),
        }));
        console.log(selectedQuantities[id]);
    }

    

    const printitem = item.map((item) => {
        return (
            <div key={item._id} className="card">
                <table>
                    <tbody>
                        <tr>
                            <td style={{ width: '33%' }}>{item.name}</td>
                            <td style={{ width: '33%' }}>{item.price}</td>
                            <td style={{ width: '17%' }}>
                                <div style={{ display: 'flex' }}>
                                    <button onClick={() => QuantityIncrementDecrement(item._id,-1)} style={{ width: '17%' }}>-</button>
                                    <input
                                        type="number"
                                        style={{ width: '70px' }}
                                        placeholder="quantity"
                                        pattern="[0-9]*"
                                        value={selectedQuantities[item._id] || ""} 
                                        onChange={(event) => handleQuantityChange(item._id, event)} />
                                    <button onClick={() => QuantityIncrementDecrement(item._id,1)} style={{ width: '17%' }}>+</button>
                                </div>
                            </td>
                            <td style={{ width: '17%' }}>
                                <button className="button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    })

    return (
        <>
            <h1 style={{ "textAlign": "center", "margin": "5vh", "color": "#ea9600" }}>Product List</h1>
            {printitem}
        </>
    )
}

export default ProductList

