import '../assets/Header.css';
import { Link } from "react-router-dom"

export default function Header() {

    return (
        <nav className="nav">
            <div className="wrap-nav-link">
                <div>
                    <Link className="nav-link" to={'/'}>Home</Link>
                    <Link className="nav-link" to={'/my-collection'}>My Collection</Link>
                </div>
            </div>
        </nav>
    )
}