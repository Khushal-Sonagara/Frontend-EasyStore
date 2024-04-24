import { React, useState } from 'react';
import './AddProduct.css';

function AddProduct() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState(false);

    const addProduct = async () => {

        if (!name || !price || !company || !category) {
            setError(true);
            return false
        }

        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId ,quantity}),
            headers: {
                "Content-type": "application/json"
            }
        });
        result = await result.json();
        console.log(result)
        if (result) { 
            
            console.log("Success");
            setName('');
            setPrice('');
            setQuantity('');
            setCategory('');
            setCompany('');
        }
    }

    return (
        <div className='product'>
            <h1>Add Product</h1>
            <h5>Product Name:</h5>
            <input type="text" placeholder='Enter product name' className='inputBox form-control '
                value={name} onChange={(e) => { setName(e.target.value) }}
            />
            {error && !name && <span className='invalid-input'>Enter valid name</span>}

            <h5>Product price:</h5>
            <input type="number" placeholder='Enter product price' className='inputBox form-control'
                value={price} onChange={(e) => { setPrice(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <h5>Product Quantity:</h5>
            <input type="number" placeholder='Enter product price' className='inputBox form-control'
                value={quantity} onChange={(e) => { setQuantity(e.target.value) }}
            />
            {error && !price && <span className='invalid-input'>Enter valid price</span>}

            <h5>Product Category:</h5>
            <input type="text" placeholder='Enter product category' className='inputBox form-control'
                value={category} onChange={(e) => { setCategory(e.target.value) }}
            />
            {error && !category && <span className='invalid-input'>Enter valid category</span>}

            <h5>Product Company:</h5>
            <input type="text" placeholder='Enter product company' className='inputBox form-control'
                value={company} onChange={(e) => { setCompany(e.target.value) }}
            />
            {error && !company && <span className='invalid-input'>Enter valid company</span>}

            
            <button className="button" onClick={addProduct}>
                Add Product
            </button>
        </div>
    )
}

export default AddProduct;