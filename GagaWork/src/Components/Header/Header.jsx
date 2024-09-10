import "./header.scss"

function Header () {
    return (
        <nav className="navbar">
            <div className="Logo">GagaWork</div>
            <div className="navLinks">
                <ul>
                    <a href="">
                        <li>Mon profil</li>
                    </a>
                    <a href="">
                        <li>Se connecter</li>
                    </a>
                </ul>
            </div>
        </nav>
    )
}

export default Header