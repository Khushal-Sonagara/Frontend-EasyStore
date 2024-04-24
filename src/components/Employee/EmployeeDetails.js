import { useState, useEffect } from "react";
function EmployeeDetails() {
    const [userDetail, setuserDetail] = useState([]);
    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then((res) => res.json())
            .then((res) => {
                setuserDetail(res);
            });
    }, []);

    const detail = userDetail.map((data) => {
        return (
            <div className="container card p-3 bg bg-transparent">
                <div className="row">
                    <div className="d-flex justify-content-center col-3 align-items-center"><i className='bx bx-user-circle ' style={{ fontSize: '15rem', color: 'blue' }}></i></div>
                    <div className="col">
                        <div key={data._id}>
                            <p>Name:</p>
                            <p className="card p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">{data.name}</p>
                            <p>phoneNumber:</p>
                            <p className="card p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">{data.phoneNumber}</p>
                            <p>Email:</p>
                            <p className="card p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">{data.email}</p>
                            <p>Admin:</p>
                            <p className="card p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">{data.isAdmin ? 'Yes' : 'No'}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <div>
            {detail}
        </div>)
}

export default EmployeeDetails;