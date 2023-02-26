export default class Main extends React.Component {    
    render() {
        return (
            <main className="container d-flex align-items-center justify-content-center">
                <LoginBox />
            </main>
        );
    };
}

function LoginBox() {
    return (
        <form method="POST" className="container border border-primary rounded">
            <div className="row g-2 py-3">
                <div className="col-12">
                    <h2>Login</h2>
                </div>
                <hr/>
                <div className="form-floating col-12">
                    <input className="form-control" type="email" name="login-email" id="login-email" placeholder="me@email.com"/>
                    <label htmlFor="login-email">Email</label>
                </div>
                <div className="form-floating col-12">
                    <input className="form-control" type="password" name="login-pw" id="login-pw" placeholder="Password"/>
                    <label htmlFor="login-pw">Password</label>
                </div>
                <div className="">
                    <input className="btn btn-success" type="submit" value="Login" />
                </div>
            </div>
        </form>
    );
}