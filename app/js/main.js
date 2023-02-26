var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
    _inherits(Main, _React$Component);

    function Main() {
        _classCallCheck(this, Main);

        return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
    }

    _createClass(Main, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "main",
                { className: "container my-2 d-flex align-items-center justify-content-center" },
                React.createElement(LoginBox, null)
            );
        }
    }]);

    return Main;
}(React.Component);

export default Main;


function LoginBox() {
    return React.createElement(
        "form",
        { method: "POST", className: "container-fluid container-md border border-primary rounded" },
        React.createElement(
            "div",
            { className: "row g-2 py-3" },
            React.createElement(
                "div",
                { className: "col-12" },
                React.createElement(
                    "h2",
                    null,
                    "Login"
                )
            ),
            React.createElement("hr", null),
            React.createElement(
                "div",
                { className: "form-floating col-12" },
                React.createElement("input", { className: "form-control", type: "email", name: "login-email", id: "login-email", placeholder: "me@email.com" }),
                React.createElement(
                    "label",
                    { htmlFor: "login-email" },
                    "Email"
                )
            ),
            React.createElement(
                "div",
                { className: "form-floating col-12" },
                React.createElement("input", { className: "form-control", type: "password", name: "login-pw", id: "login-pw", placeholder: "Password" }),
                React.createElement(
                    "label",
                    { htmlFor: "login-pw" },
                    "Password"
                )
            ),
            React.createElement(
                "div",
                { className: "" },
                React.createElement("input", { className: "btn btn-success", type: "submit", value: "Login" })
            )
        )
    );
}