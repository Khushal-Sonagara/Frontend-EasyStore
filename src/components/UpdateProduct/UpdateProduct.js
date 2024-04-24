import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatedProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({ name: '', price: '', quantity: '', category: '', company: '' });

    // const [data, setData] = useState({});
    // const [name, setName] = useState('');
    // const [price, setPrice] = useState('');
    // const [category, setCategory] = useState('');
    // const [company, setCompany] = useState('');
    // const [error] = useState(false);

    // useEffect(() =>{
    //     fetch(`http://localhost:5000/product/${id}`)
    //         .then(response=> response.json())
    //         .then(product =>setData(product))
    //         console.log(data);
    // },[id]);

    useEffect(() => {
        fetch(`http://localhost:5000/product/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product data');
                }
                return response.json();
            })
            .then(product => {
                setData(product);
                console.log(product);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }, [id]);

    return (
        <div className='product'>
            <h1>Update Product</h1>
            <h5>Product Name:</h5>
            <form id="productForm" onSubmit={(event) => {
                event.preventDefault();
                // console.log(data)
                fetch(`http://localhost:5000/update-product/${data._id}`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }).then((res) => {
                    if (!res.ok) throw res;
                    return navigate("/webapp-inventory");
                }).catch(err => console.log(err))
                    .finally(() => document.location.reload());
            }}>
                <input
                    type="text"
                    placeholder='Enter product name'
                    className='inputBox form-control '
                    value={data.name || ""}
                    onChange={(e) => {
                        setData(prevData => ({ ...prevData, name: e.target.value }))
                    }}
                />

                {/* {error && !name && <span className='invalid-input'>Enter valid name</span>} */}
                <h5>Product Price:</h5>
                <input
                    type="text"
                    placeholder='Enter product price'
                    className='inputBox form-control'
                    value={data.price || ""}
                    onChange={(e) => {
                        setData(prevData => ({ ...prevData, price: e.target.value }))
                    }}
                />
                {/* {error && !price && <span className='invalid-input'>Enter valid price</span>} */}

                <h5>Product Price:</h5>
                <input
                    type="text"
                    placeholder='Enter product price'
                    className='inputBox form-control'
                    value={data.quantity || ""}
                    onChange={(e) => {
                        setData(prevData => ({ ...prevData, quantity: e.target.value }))
                    }}
                />
                {/* {error && !price && <span className='invalid-input'>Enter valid price</span>} */}

                <h5>Product Category:</h5>
                <input
                    type="text"
                    placeholder='Enter product category'
                    className='inputBox form-control'
                    value={data.category || ""}
                    onChange={(e) => {
                        setData(prevData => ({ ...prevData, category: e.target.value }))
                    }}
                />
                {/* {error && !category && <span className='invalid-input'>Enter valid category</span>} */}

                <h5>Product Company:</h5>
                <input
                    type="text"
                    placeholder='Enter product company'
                    className='inputBox form-control'
                    value={data.company || ""}
                    onChange={(e) => {
                        setData(prevData => ({ ...prevData, company: e.target.value }))
                    }}
                />
                {/* {error && !company && <span className='invalid-input'>Enter valid company</span>} */}
                
                <button className="button" type='submit' >
                    Update Product
                </button>

            </form>
        </div>
    )
}

export default UpdatedProduct;