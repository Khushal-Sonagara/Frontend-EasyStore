import React,{ useState, useEffect } from 'react';
import jsPDF from 'jspdf'
import 'jspdf-autotable'

function BillingSystemComponent() {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [name, setName] = useState('abc');
    const [phoneNumber, setPhoneNumber] = useState('0000000000');
    const [email, setEmail] = useState('abc@abc.com');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [billId, setBillId] = useState('');
    const [printDisabled, setPrintDisabled] = useState(true);
    const doc = jsPDF();
    const auth = JSON.parse(localStorage.getItem('user'));
    
    useEffect(() => {
        fetch("http://localhost:5000/carts/" + auth._id)
            .then((res) => res.json())
            .then((res) => {
                setData(res.cart)
                setTotal(res.totalAmount)
                setPrintDisabled(res.cart.length === 0)
            }).catch((error) => {
                console.error("Error fetching data:", error);
            });;
        const currentDate = new Date();
        const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`;
        const formattedTime = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
        const generatedBillId = generateBillId(currentDate);
        setDate(formattedDate);
        setTime(formattedTime);
        setBillId(generatedBillId);
    }, [auth._id]);

    const generateBillId = (currentDate) => {
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hour = String(currentDate.getHours()).padStart(2, '0');
        const minute = String(currentDate.getMinutes()).padStart(2, '0');
        const second = String(currentDate.getSeconds()).padStart(2, '0');
        return `${year}${month}${day}_${hour}${minute}${second}`;
    };

    const addSales = () => {
        console.log(name,email,phoneNumber)
        console.log(data)
        fetch("http://localhost:5000/add-all-sales", {
            method: "POST",
            body: JSON.stringify({ cart: data, name: name, phoneNumber: phoneNumber, email: email }),
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((res) => {
                console.log("Items added to sales:", res);
                const { salesDateAndTime } = data;
                if (salesDateAndTime && salesDateAndTime.length > 0) {
                    const { saleDate, saleTime } = salesDateAndTime[0];
                    setDate(saleDate);
                    setTime(saleTime);
                }
                exportPdf();
            })
            .catch((error) => {
                console.error("Error adding items to sales:", error);
            });
    };

    const handleSales = () => {
        if (validateEmail(email) && validatePhoneNumber(phoneNumber)) {
            console.log("addSales")
            addSales();
        } else {
            alert('Please enter a valid email and phone number.');
        }
    };

    const exportPdf = () => {
        doc.autoTable({ html: '#bill-table' });
        doc.save("Bill.pdf");
        handleEmptyCart();
    };

    const handleEmptyCart = () => {
        const auth = JSON.parse(localStorage.getItem('user'));
        fetch("http://localhost:5000/carts/" + auth._id, { method: "DELETE" })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to empty cart');
                }
                setTotal(0)
                setData([]);
                console.log("Cart emptied successfully");
                document.getElementById('nameInput').value = '';
                document.getElementById('phoneNumberInput').value = '';
                document.getElementById('emailInput').value = '';
                setName('abc');
                setPhoneNumber('0000000000');
                setEmail('abc@abc.com');
            })
            .catch(error => {
                console.log('Empty cart error:', error);
            });
    };

    const handleRemoveProduct = (itemId) => {
        const auth = JSON.parse(localStorage.getItem('user'));
        fetch("http://localhost:5000/carts/" + auth._id + "/" + itemId, { method: "DELETE" })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to delete product');
                }
                console.log(res);
            }).then(res => {
                const updatedData = data.map(cartItem => ({
                    ...cartItem,
                    product: cartItem.product.filter(item => item.productId._id !== itemId)
                }));
                if (updatedData.every(cartItem => cartItem.product.length === 0)) {
                    handleEmptyCart();
                }
                else {
                    setData(updatedData);
                }
            })
            .catch(error => {
                console.log('Delete error:', error);
            });
    };

    const bill = data ? (
        data.map((cartItem) => (
            cartItem.product.map((item) => (
                <tr key={item._id}>
                    <td style={{ width: '33%' }}>{item.productId.name}</td>
                    <td style={{ width: '33%' }}>{item.productId.price}</td>
                    <td style={{ width: '17%' }}>{item.quantity}</td>
                    <td style={{ width: '17%' }}>{item.quantity * parseFloat(item.productId.price)}</td>
                    <td style={{ width: '33%' }}><button className="button" onClick={() => handleRemoveProduct(item.productId._id)}>Remove</button></td>
                </tr>
            ))
        ))
    ) : null;

    const validatePhoneNumber = (input) => {
        return /^\d{10}$/.test(input);
    };
    
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <>
            <h1 style={{ "textAlign": "center", "margin": "5vh", "color": "#ea9600" }}>Bill</h1>
            <>
                <form>
                    <div className='container'>
                        <div className='row m-3'>
                            <span className='col-2'>Name: </span>
                            <input
                                className='col-auto'
                                type="text"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                id="nameInput"
                            />
                        </div>
                        <div className='row m-3'>
                            <span className='col-2'>Phone Number: </span>
                            <input
                                className='col-auto'
                                type="text"
                                placeholder="Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                id="phoneNumberInput"
                            />
                        </div>
                        <div className='row m-3'>
                            <span className='col-2'>Email: </span>
                            <input
                                className='col-auto'
                                type="text"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                id="emailInput"
                            />
                        </div>
                    </div>
                </form>
                <table className="table table-bordered p-5" id='bill-table'>
                    <thead>
                        <tr>
                            <td className="text-start fw-bold">Date: {date}</td>
                            <td className="text-start fw-bold">Time: {time}</td>
                            <td colSpan={2} className="text-start fw-bold">Bill Id: {billId}</td>
                        </tr>
                        <tr>
                            <td className="text-start fw-bold">Name:  {name}</td>
                            <td className="text-start fw-bold">Phone Number:  {phoneNumber}</td>
                            <td colSpan={2} className="text-start fw-bold">Email:  {email}</td>

                        </tr>
                        <tr>
                            <td className="fw-bold" style={{ width: '33%' }}>Product Name</td>
                            <td className="fw-bold" style={{ width: '33%' }}>Product Price</td>
                            <td className="fw-bold" style={{ width: '33%' }}>quantity</td>
                            <td className="fw-bold" style={{ width: '33%' }}>Price</td>
                            {data && data.length <= 0 ? <></> : <td ><button className="button" onClick={() => handleEmptyCart()}>Empty Cart</button></td>}
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.length > 0 ?
                            bill :
                            <tr>
                                <td colSpan="4" className="text-center fw-bold">No Item Found</td>
                            </tr>
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan={3} className="fw-bold text-end " >Total:</td>
                            <td className="fw-bold">{total}</td>
                        </tr>
                    </tfoot>
                </table>
                <button className='button ms-auto' onClick={() => handleSales()} disabled={printDisabled}>Print Bill</button>
            </>
        </>
    )
};

export default BillingSystemComponent;
