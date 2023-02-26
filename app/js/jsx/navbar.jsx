export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }

	render() {
        let navbarProfileInfo;
        if (!this.state.isLoggedIn) {
            navbarProfileInfo = (
                <ul className="navbar-nav flex-row">
                    <NavbarLink text="Sign up" />
                    <NavbarLink text="Login" />
                </ul>
            );
        } else {
            navbarProfileInfo = (
                <ul className="navbar-nav flex-row">
                    <NavbarLink text="Todo" />
                </ul>
            );
        }

		return (
			<header>
				<nav className="navbar border-bottom border-dark-subtle">
                    <div className="container-fluid">
                        <div className="row w-100">
                            <div className="col-6">
                                <a href="/" className="navbar-brand">
                                    <img src="img/logo.png" alt="Taskursion logo" />
                                    <h1 className="d-inline ms-1 align-middle">Taskursion</h1>
                                </a>
                            </div>
                            <div className="col-6 d-flex justify-content-end">
                                {navbarProfileInfo}
                            </div>
                        </div>
                    </div>
				</nav>
			</header>
		);
	}
};

function NavbarLink({text}) {
    return <li className="nav-item ps-3"><a href="/" className="nav-link">{text}</a></li>
}