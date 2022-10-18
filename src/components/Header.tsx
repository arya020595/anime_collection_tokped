import '../assets/Header.css';

export default function Header() {

    return (
        <nav className="nav">
            <div className="wrap-nav-link">
                <div>
                    <a href="/" className="nav-link">Home</a>
                    <a href="/my-collection" className="nav-link">My Collection</a>
                </div>
            </div>
        </nav>
    )
}