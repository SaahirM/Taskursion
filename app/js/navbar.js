var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navbar = function (_React$Component) {
    _inherits(Navbar, _React$Component);

    function Navbar(props) {
        _classCallCheck(this, Navbar);

        var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

        _this.state = { isLoggedIn: false };
        return _this;
    }

    _createClass(Navbar, [{
        key: "render",
        value: function render() {
            var navbarProfileInfo = void 0;
            if (!this.state.isLoggedIn) {
                navbarProfileInfo = React.createElement(
                    "ul",
                    { className: "navbar-nav flex-row" },
                    React.createElement(NavbarLink, { text: "Sign up" }),
                    React.createElement(NavbarLink, { text: "Login" })
                );
            } else {
                navbarProfileInfo = React.createElement(
                    "ul",
                    { className: "navbar-nav flex-row" },
                    React.createElement(NavbarLink, { text: "Todo" })
                );
            }

            return React.createElement(
                "header",
                null,
                React.createElement(
                    "nav",
                    { className: "navbar border-bottom border-dark-subtle" },
                    React.createElement(
                        "div",
                        { className: "container-fluid" },
                        React.createElement(
                            "div",
                            { className: "row w-100" },
                            React.createElement(
                                "div",
                                { className: "col-6" },
                                React.createElement(
                                    "a",
                                    { href: "/", className: "navbar-brand" },
                                    React.createElement("img", { src: "img/logo.png", alt: "Taskursion logo" }),
                                    React.createElement(
                                        "h1",
                                        { className: "d-inline ms-1 align-middle" },
                                        "Taskursion"
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-6 d-flex justify-content-end" },
                                navbarProfileInfo
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Navbar;
}(React.Component);

export default Navbar;
;

function NavbarLink(_ref) {
    var text = _ref.text;

    return React.createElement(
        "li",
        { className: "nav-item ps-3" },
        React.createElement(
            "a",
            { href: "/", className: "nav-link" },
            text
        )
    );
}