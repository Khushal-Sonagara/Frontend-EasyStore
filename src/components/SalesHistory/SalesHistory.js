import { useState, useEffect, useCallback } from "react";
import { Link } from 'react-router-dom';
import './SalesHistory.css'

function SalesHistory() {
    const [salesData, setSalesData] = useState([]);
    const [filteredSalesData, setFilteredSalesData] = useState([]);
    const [selectedOption, setSelectedOption] = useState("all");
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    // useEffect(() => {
    //     fetch("http://localhost:5000/sales-history")
    //         .then((res) => res.json())
    //         .then((res) => {
    //             setSalesData(res);
    //             setFilteredSalesData(res);
    //             setIsLoading(false);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching sales data:", error);
    //             setIsLoading(false);
    //         });
    // }, []);
    const filterSalesData = useCallback((option) => {
        setSelectedOption(option);
        if (option === "custom") {
            setStartDate(null); // Reset start date
            setEndDate(null); // Reset end date
        }
        let filteredData = [...salesData];

        if (option === "all") {
            setFilteredSalesData(salesData);
            setStartDate(null);
            setEndDate(null);
            return;
        }

        let startDateFilter = null;
        let endDateFilter = new Date();

        switch (option) {
            case "yesterday":
                startDateFilter = new Date();
                startDateFilter.setDate(startDateFilter.getDate() - 1);
                endDateFilter = new Date();
                setStartDate(null)
                setEndDate(null)
                break;
            case "lastSevenDays":
                startDateFilter = new Date();
                startDateFilter.setDate(startDateFilter.getDate() - 6);
                endDateFilter = new Date();
                setStartDate(null)
                setEndDate(null)
                break;
            case "lastThirtyDays":
                startDateFilter = new Date();
                startDateFilter.setDate(startDateFilter.getDate() - 29);
                endDateFilter = new Date();
                setStartDate(null)
                setEndDate(null)
                break;
            case "custom":
                startDateFilter = startDate;
                endDateFilter = endDate;
                break;
            default:
                break;
        }

        filteredData = salesData.filter((sale) => {
            const saleDate = new Date(sale.date);
            return (!startDateFilter || saleDate >= startDateFilter) && (!endDateFilter || saleDate <= endDateFilter);
        });
        setFilteredSalesData(filteredData);
    }, [salesData, startDate, endDate])

    const fetchSalesData = useCallback(() => {
        let url = `http://localhost:5000/sales-history?page=${currentPage}&option=${selectedOption}`;
        if (selectedOption === "custom" && startDate && endDate) {
            url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        }
        setIsLoading(true);
        fetch(url)
            .then((res) => res.json())
            .then((res) => {
                const newData = Array.isArray(res) ? res : [];
                console.log(newData)
                setSalesData(newData);
                setFilteredSalesData(newData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching sales data:", error);
                setIsLoading(false);
            });
    }, [selectedOption, startDate, endDate, currentPage]);

    useEffect(() => {
        fetchSalesData();
    }, [selectedOption, startDate, endDate, currentPage,fetchSalesData]);

    const handleStartDateChange = (e) => {
        setStartDate(new Date(e.target.value));
    };

    const handleEndDateChange = (e) => {
        setEndDate(new Date(e.target.value));
    };

    const handleSearchQueryChange = (value) => {
        const query = value.toLowerCase();
        setSearchQuery(query);
        let filteredData = [];
        let temp = [];
        salesData.forEach((sale) => {
            sale.sales.forEach((item) => {
                if (item.name.toLowerCase().includes(query) ||
                    item.phoneNumber.includes(query)) {
                    temp.push(item)
                }
            });
            if (temp.length > 0) {
                filteredData.push({ ...sale, sales: temp })
                temp = []
            }
        })
        setFilteredSalesData(filteredData);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSalesData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredSalesData.length / itemsPerPage);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div>
            <h1 style={{ "textAlign": "center", "margin": "5vh", "color": "#ea9600" }}>Sales History</h1>
            <div style={{ "display": "flex", "justifyContent": "space-between", "marginBottom": "20px" }}>
                <select className="form-control" value={selectedOption} onChange={(e) => filterSalesData(e.target.value)} style={{ "width": "50%" }}>
                    <option value="all">All</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="lastSevenDays">Last 7 Days</option>
                    <option value="lastThirtyDays">Last 30 Days</option>
                    <option value="custom">Custom</option>
                </select>
                <input type="text" style={{ "width": "40%" }} placeholder="Search" value={searchQuery} onChange={(e) => handleSearchQueryChange(e.target.value)}></input>
            </div>
            {selectedOption === "custom" && (
                <div style={{ "display": "flex" }}>
                    <div style={{ "margin": "20px" }}>
                        <label htmlFor="start_date"> Start Date: </label>
                        <input type="date" id="start_date" onChange={handleStartDateChange} /></div>
                    <div style={{ "margin": "20px" }}>
                        <label htmlFor="end_date"> End Date: </label>
                        <input type="date" id="end_date" onChange={handleEndDateChange} />
                    </div>
                </div>
            )}
            {isLoading ? (
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
            ) : (
                <div>
                    {currentItems.map((sale, index) => (
                        <div key={index}>
                            <h2>Date: {sale.date}</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <td style={{ width: '16%' }}>Name</td>
                                        <td style={{ width: '16%' }}>Phone Number</td>
                                        <td style={{ width: '16%' }}>Product Name</td>
                                        <td style={{ width: '16%' }}>Product Price</td>
                                        <td style={{ width: '16%' }}>Sold Quantity</td>
                                        <td style={{ width: '16%' }}></td>
                                    </tr>
                                </thead>
                            </table>
                            <ul>
                                {sale.sales.map((item) => (
                                    <div key={item._id} className="card">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td style={{ width: '16%' }}>{item.name}</td>
                                                    <td style={{ width: '16%' }}>{item.phoneNumber}</td>
                                                    <td style={{ width: '16%' }}>{item.productId.name}</td>
                                                    <td style={{ width: '16%' }}>{item.productId.price}</td>
                                                    <td style={{ width: '16%' }}>{item.soldQuantity}</td>
                                                    <td style={{ width: '16%' }}>
                                                        <Link to={`/webapp-sales-history/${item._id}`} className="btn">
                                                            &#11166;
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <div className="d-flex justify-content-center">
                        <button onClick={prevPage} disabled={currentPage === 1}>
                            &#11164;
                        </button>
                        <span>{currentPage}</span> / <span>{totalPages}</span>
                        <button onClick={nextPage} disabled={currentPage === totalPages}>
                            &#11166;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SalesHistory;