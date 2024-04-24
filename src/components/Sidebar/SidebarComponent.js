import './SidebarComponent.css';
import logo from './logo.png';
import { Link, useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import { useEffect, useState } from 'react';


function SidebarComponent() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(JSON.parse(localStorage.getItem('user')).isAdmin)
    }, []);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    return (
        <>
            <div className="sidebar">
                <div className="logo-details">
                    <span className="logo_name text-center justify-content-center">
                        <img className="img-fluid" src={logo} alt="" />
                    </span>
                </div>
                <div style={{ height: "60px" }}></div>
                <ul className="nav-links">
                    <li>
                        {/* <Link to="/webapp-profile"> */}
                        <Link to="/">
                            <i className='bx bxs-user-account'></i>
                            <span className="links_name">Profile</span>
                        </Link>
                    </li>
                    {isAdmin && (
                        <li>
                            <Link to="/webapp-dashboard">
                                <i className='bx bxs-dashboard'></i>
                                <span className="links_name">Dashboard</span>
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link to="/webapp-product-list">
                            <i className='bx bx-list-ul'></i>
                            <span className="links_name">Product List</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/webapp-bill">
                            <i className='bx bx-list-ul'></i>
                            <span className="links_name">Bill</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/webapp-cart">
                            <i className='bx bx-cart'></i>
                            <span className="links_name">cart</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/webapp-inventory">
                            <i className='bx bx-package'></i>
                            <span className="links_name">Inventory</span>
                        </Link>
                    </li>
                    {isAdmin && (
                        <>
                            <li>
                                <Link to="/webapp-add-product">
                                    <i className='bx bx-list-ul'></i>
                                    <span className="links_name">Add product</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/webapp-sales-history">
                                    <i className='bx bx-book-content'></i>
                                    <span className="links_name">Sales History</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/webapp-user-details">
                                    <i className='bx bxs-user-account'></i>
                                    <span className="links_name">User Details</span>
                                </Link>
                            </li>
                        </>
                    )}
                    <li className="log_out" onClick={logout}>
                        <a href="##">
                            <i className='bx bx-log-out'></i>
                            <span className="links_name">Log out</span>
                        </a>
                    </li>
                </ul>
            </div>
        </>
    );
}
export default SidebarComponent;