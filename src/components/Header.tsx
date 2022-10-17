import '../assets/Header.css';

export default function Header() {

    const mystyle = {
        display: 'flex',
        marginLeft: 'auto'
    };

    return (
        <nav className="nav">
            <div className="wrap-nav-link">
                <div>
                    <a href="/" className="nav-link">Home</a>
                    <a href="/my-collection/" className="nav-link">My Collection</a>
                </div>

                {/* <div style={mystyle}>
                    <a href="/" className="nav-link">Login</a>
                </div> */}
            </div>
        </nav>
    )
}