import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

function SalesHistoryById() {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/sales/" + id)
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })
            .catch((err) => console.log("Error: " + err));
    }, [id]);

    if (!data) {
        return (
            <div className="dot-spinner-container">
                <div className="dot-spinner">
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                    <div className="dot-spinner__dot"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="card p-3">
            <h3>Name: {data.name}</h3>
            <h3>Phone Number: {data.phoneNumber}</h3>
            <h3>Email: {data.email}</h3>
            <h3>Product Name: {data.productId.name}</h3>
            <h3>Product Price: {data.productId.price}</h3>
            <h3>Sold Quantity: {data.soldQuantity}</h3>
            <h3>Product Category: {data.productId.category}</h3>
            <h3>Product Company: {data.productId.company}</h3>
        </div>
    );
}
export default SalesHistoryById