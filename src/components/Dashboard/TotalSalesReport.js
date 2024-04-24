import React, { useState, useEffect,useCallback  } from "react";

function Sales({ endpoint, title }) {
    const [displayedSales, setDisplayedSales] = useState(0);

    const fetchData = useCallback((endpoint) => {
        fetch(`http://localhost:5000/${endpoint}`)
            .then((res) => res.json())
            .then((res) => {
                animateSales(res.totalSales);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        fetchData(endpoint);
    }, [endpoint,fetchData]);

    const animateSales = (totalSales) => {
        const step = Math.ceil(totalSales / 100);
        let currentSales = 0;
        const interval = setInterval(() => {
            currentSales += step;
            if (currentSales >= totalSales) {
                clearInterval(interval);
                currentSales = totalSales;
            }
            setDisplayedSales(currentSales);
        }, 15);
    };

    return (
        <div className='col card p-3'>
            <h3>{title}</h3>
            <h3>&#8377;{displayedSales}</h3>
        </div>
    );
}

function WeeklySales() {
    return <Sales endpoint="sales-week" title="Weekly Sales" />;
}

function MonthlySales() {
    return <Sales endpoint="sales-month" title="Monthly Sales" />;
}

function YearlySales() {
    return <Sales endpoint="sales-year" title="Yearly Sales" />;
}

export { WeeklySales, MonthlySales, YearlySales };
