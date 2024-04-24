import { useState, useEffect } from "react";
function EmployeeDetail() {
    const [userDetail, setuserDetail] = useState([]);
    const auth = JSON.parse(localStorage.getItem('user'))
    useEffect(() => {
        fetch("http://localhost:5000/users/" + auth._id)
            .then((res) => res.json())
            .then((res) => {
                setuserDetail(res);
            });
    }, [auth._id]);
    return (
        <div className="card p-3 bg bg-secondary-subtle" key={userDetail._id}>
            <div className="d-flex justify-content-center"><i className='bx bx-user-circle ' style={{ fontSize: '15rem', color: 'blue' }}></i></div>
            <p>Name:</p>
            <p className="card p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">{userDetail.name}</p>
            <p>phoneNumber:</p>
            <p className="card p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">{userDetail.phoneNumber}</p>
            <p>Email:</p>
            <p className="card p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">{userDetail.email}</p>
            <p>Admin:</p>
            <p className="card p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-3">{userDetail.isAdmin ? 'Yes' : 'No'}</p>
        </div>)
}

export default EmployeeDetail;