"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var IndexRedirect = ReactRouter.IndexRedirect;
var Link = ReactRouter.Link;
var browserHistory = ReactRouter.browserHistory;

var Button = ReactBootstrap.Button;
var Modal = ReactBootstrap.Modal;
var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var MenuItem = ReactBootstrap.MenuItem;

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Panel = ReactBootstrap.Panel;

var Pagination = ReactBootstrap.Pagination;
var Form = ReactBootstrap.Form;
var Radio = ReactBootstrap.Radio;
var FormGroup = ReactBootstrap.FormGroup;
var FormControl = ReactBootstrap.FormControl;
var ControlLabel = ReactBootstrap.ControlLabel;
var Col = ReactBootstrap.Col;
var ListGroup = ReactBootstrap.ListGroup;
var Table = ReactBootstrap.Table;

var albumBucketName = "webpaa-deployments-mobilehub-2128298286";
var albumBucketName3 = "webpaa-deployments-mobilehub-209995345";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:3dd5b3b8-326c-4be6-9f32-67943932637a";

// var socket = io.connect();

var socket = io("localhost:8081");

// var socket = io();


AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

var s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName }
});

var anotherS3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName3 }
});
var Autosuggest = Autosuggest;

var moment = moment;

var global = 59;
var global2 = 59;
var redLight = true;
var yellowLight = false;
var greenLight = false;

// const API_URL = 'http://localhost:8084';
var API_URL = 'http://localhost:8084';

var API_HEADERS = {

    'Content-Type': 'application/json'

};

var TOKEN_KEY = "token";

var languageActive = true;

function token() {

    return localStorage.getItem(TOKEN_KEY);
}

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {

            cookies: false,
            visibility: false,
            cssActiveLogin: "active",
            cssActiveRegistraction: "inactive",
            searchText: ""
        };
        return _this;
    }

    _createClass(App, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;

            fetch(API_URL + '/cookies', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this2.setState({

                    cookies: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: "setCookie",
        value: function setCookie(event) {

            event.preventDefault();

            //   let newCookie = {

            //       "id":"1",
            //       "username": event.target.email.value,
            //       "password": event.target.password.value
            //   }

            //   fetch(API_URL+'/login', {

            //     method: 'post',
            //     headers: API_HEADERS,
            //     body: JSON.stringify(newCookie)
            // }).then(response => response.json()).then(response => {
            //     if(response.token!=undefined){
            //       localStorage.setItem(TOKEN_KEY, response.token)
            //     }
            // }); 

            // window.location.reload();

            localStorage.setItem(TOKEN_KEY, "1234");
        }
    }, {
        key: "isAuthenticated",
        value: function isAuthenticated() {

            return !!localStorage.getItem(TOKEN_KEY);
        }
    }, {
        key: "setRegistration",
        value: function setRegistration(event) {

            event.preventDefault();

            var newCookie = {

                "id": "1",
                "username": event.target.email.value,
                "password": event.target.password.value
            };

            fetch(API_URL + '/register', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newCookie)
            });

            window.location.reload();
        }
    }, {
        key: "onVisibility",
        value: function onVisibility(event) {

            if (!this.state.visibility) {

                this.setState({

                    visibility: true,
                    cssActiveRegistraction: "active",
                    cssActiveLogin: "inactive"
                });
            } else {
                this.setState({

                    visibility: false,
                    cssActiveRegistraction: "inactive",
                    cssActiveLogin: "active"
                });
            }
        }
    }, {
        key: "onSearch",
        value: function onSearch(event) {
            this.setState({
                searchText: event.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {

            var activeTab = void 0;

            var loginTab = React.createElement(Login, {
                setcookie: this.setCookie,
                setregistration: this.setRegistration

            });
            var registrationTab = React.createElement(Registration, {
                setcookie: this.setCookie,
                setregistration: this.setRegistration

            });

            var dashboard = React.createElement(
                "div",
                null,
                React.createElement(Toolbar, {
                    searchCallback: this.onSearch.bind(this)
                }),
                React.createElement(
                    "div",
                    { className: "container" },
                    this.props.children
                )
            );

            if (!this.state.visibility) {
                activeTab = loginTab;
            } else {
                activeTab = registrationTab;
            }

            // if(this.isAuthenticated()){

            return React.createElement(
                "div",
                null,
                dashboard
            );
            //  }
            // return (

            //     <Grid>
            //         <br/>
            //         <br/>
            //         <br/>
            //         <br/>
            //         <br/>
            //         <Panel>
            //             <Row>
            //             <ul className="nav nav-tabs">                
            //             <li className={this.state.cssActiveLogin} ><a onClick={this.onVisibility.bind(this)}><p>{'Login'}</p></a></li>
            //             <li className={this.state.cssActiveRegistraction} ><a onClick={this.onVisibility.bind(this)}><p>{'Registration'}</p></a></li>
            //             </ul>
            //             <div class="tab-content">
            //                 {activeTab}         
            //             </div>
            //             </Row>
            //         </Panel>            
            //     </Grid>
            // )
        }
    }]);

    return App;
}(React.Component);

var Actions = function (_React$Component2) {
    _inherits(Actions, _React$Component2);

    function Actions() {
        _classCallCheck(this, Actions);

        var _this3 = _possibleConstructorReturn(this, (Actions.__proto__ || Object.getPrototypeOf(Actions)).call(this));

        _this3.state = {

            masterAPI: [],
            parameter: '',
            show: false
        };

        return _this3;
    }

    _createClass(Actions, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this4 = this;

            setTimeout(function () {

                fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                    return response.json();
                }).then(function (responseData) {
                    _this4.setState({

                        masterAPI: responseData
                    });
                }).catch(function (error) {
                    console.log('Error fetching and parsing data', error);
                });
            }, 5000);

            this.setState({

                // parameter: this.props.params.actionid
            });
        }
    }, {
        key: "onPrinted",
        value: function onPrinted() {

            window.print();

            window.location.href = '/';
        }
    }, {
        key: "setPayment",
        value: function setPayment(event) {

            event.preventDefault();

            var currentTarget = '';

            // console.log(event.target.card.value)
            // console.log(event.target.groupOptions.value)

            var newMaster = {

                // "id": this.props.params.actionid,
                "payment": event.target.groupOptions.value

            };

            fetch(API_URL + '/payment', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newMaster)
            });

            window.location.href = '/';

            // console.log(newMaster)
        }
    }, {
        key: "onClicked",
        value: function onClicked() {

            this.setState({

                show: true
            });
        }
    }, {
        key: "onClose",
        value: function onClose() {

            this.setState({
                show: false
            });
        }
    }, {
        key: "onsavedetail",
        value: function onsavedetail(event) {

            event.preventDefault();

            // console.log(event.target.firstname.value);

            // console.log('saved!');

            var newItem = {

                "username": token(),
                "quantity": event.target.quantity.value,
                "address": event.target.address.value
            };

            console.log(newItem);

            fetch(API_URL + '/addorder', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newItem)
            });

            this.setState({

                show: false
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this5 = this;

            var filteredTable = this.state.masterAPI.filter(function (master) {
                return master.id == _this5.state.parameter;
            });

            var date = void 0;
            var name = void 0;
            var items = [];
            var image = void 0;

            if (filteredTable[0]) {

                date = filteredTable[0].date;
                name = filteredTable[0].name;
                items = filteredTable[0].item;
                image = filteredTable[0].image;
            }

            var loading = React.createElement(
                "div",
                { style: { 'text-align': 'center' } },
                React.createElement("img", { src: "http://localhost:8084/cargando.gif", alt: "Avatar" })
            );

            var bodyToLoad = React.createElement(
                "div",
                { className: "list-group" },
                React.createElement(
                    "div",
                    { className: "list-group-item" },
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { md: 3 },
                            React.createElement(
                                "p",
                                null,
                                "Name"
                            )
                        ),
                        React.createElement(
                            Col,
                            { md: 3 },
                            React.createElement(
                                "p",
                                null,
                                "Time"
                            )
                        ),
                        React.createElement(
                            Col,
                            { md: 3 },
                            React.createElement(
                                "p",
                                null,
                                "Developer"
                            )
                        ),
                        React.createElement(
                            Col,
                            { md: 2 },
                            React.createElement(
                                "p",
                                null,
                                "Sign"
                            )
                        ),
                        React.createElement(
                            Col,
                            { md: 1 },
                            React.createElement(
                                "p",
                                null,
                                "Acceptance"
                            )
                        )
                    )
                ),
                items.map(function (master) {
                    return React.createElement(
                        "div",
                        { className: "list-group-item" },
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Col,
                                { md: 3 },
                                React.createElement(
                                    Link,
                                    { to: '/profile/' + master.user },
                                    React.createElement(
                                        "p",
                                        null,
                                        master.user
                                    )
                                )
                            ),
                            React.createElement(
                                Col,
                                { md: 3 },
                                React.createElement(
                                    "p",
                                    null,
                                    master.quantity
                                )
                            ),
                            React.createElement(
                                Col,
                                { md: 3 },
                                React.createElement(
                                    "p",
                                    null,
                                    master.project
                                )
                            ),
                            React.createElement(
                                Col,
                                { md: 2 },
                                React.createElement(
                                    "p",
                                    null,
                                    "Cras justo odio"
                                )
                            ),
                            React.createElement(
                                Col,
                                { md: 1 },
                                React.createElement(
                                    Button,
                                    { onClick: _this5.onClicked.bind(_this5), className: "btn btn-success btn-lg" },
                                    React.createElement("i", { className: "fa fa-check", "aria-hidden": "true" })
                                ),
                                React.createElement(
                                    Modal,
                                    { show: _this5.state.show, onHide: _this5.onClose.bind(_this5) },
                                    React.createElement(
                                        Modal.Header,
                                        { closeButton: true },
                                        React.createElement(
                                            Modal.Title,
                                            null,
                                            "Modal heading"
                                        )
                                    ),
                                    React.createElement(
                                        Modal.Body,
                                        null,
                                        React.createElement(
                                            Form,
                                            { onSubmit: _this5.onsavedetail.bind(_this5) },
                                            React.createElement(
                                                Row,
                                                null,
                                                React.createElement(
                                                    FormGroup,
                                                    null,
                                                    React.createElement(
                                                        Col,
                                                        { componentClass: ControlLabel, md: 4, sm: 2 },
                                                        "Quantity"
                                                    ),
                                                    React.createElement(
                                                        Col,
                                                        { md: 8, sm: 6 },
                                                        React.createElement(FormControl, { type: "text", name: "quantity", value: master.quantity, placeholder: "Quantity", required: true })
                                                    )
                                                )
                                            ),
                                            React.createElement("br", null),
                                            React.createElement(
                                                Row,
                                                null,
                                                React.createElement(
                                                    FormGroup,
                                                    null,
                                                    React.createElement(
                                                        Col,
                                                        { componentClass: ControlLabel, md: 4, sm: 2 },
                                                        "Name"
                                                    ),
                                                    React.createElement(
                                                        Col,
                                                        { md: 8, sm: 6 },
                                                        React.createElement(FormControl, { type: "text", name: "firstname", value: master.user, placeholder: "Name", required: true })
                                                    )
                                                )
                                            ),
                                            React.createElement("br", null),
                                            React.createElement(
                                                Row,
                                                null,
                                                React.createElement(
                                                    FormGroup,
                                                    null,
                                                    React.createElement(
                                                        Col,
                                                        { componentClass: ControlLabel, md: 4, sm: 2 },
                                                        "Address"
                                                    ),
                                                    React.createElement(
                                                        Col,
                                                        { md: 8, sm: 6 },
                                                        React.createElement(FormControl, { type: "text", name: "address", value: master.quantity, placeholder: "Address", required: true })
                                                    )
                                                )
                                            ),
                                            React.createElement("br", null),
                                            React.createElement(
                                                Row,
                                                null,
                                                React.createElement(
                                                    Col,
                                                    { className: "col-md-offset-10" },
                                                    React.createElement(
                                                        Button,
                                                        { type: "submit" },
                                                        "Save"
                                                    )
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                        )
                    );
                })
            );

            var bodyToLoadIMG = React.createElement(
                Panel,
                { header: date },
                React.createElement(
                    "div",
                    { className: "card" },
                    React.createElement("img", { src: "http://localhost:8084/executed/" + image, alt: "Avatar", style: { "width": "100%" } }),
                    React.createElement(
                        "div",
                        { className: "container" },
                        React.createElement(
                            "h4",
                            null,
                            React.createElement(
                                "b",
                                null,
                                name
                            )
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Architect  Engineer"
                        )
                    )
                )
            );

            var activeTable = void 0;

            if (this.state.masterAPI.length == 0) {

                activeTable = loading;
            } else {
                activeTable = bodyToLoadIMG;
            }

            return React.createElement(
                Row,
                null,
                React.createElement(
                    Col,
                    { item: true },
                    activeTable
                )
            );
        }
    }]);

    return Actions;
}(React.Component);

var ActionsTable = function (_React$Component3) {
    _inherits(ActionsTable, _React$Component3);

    function ActionsTable() {
        _classCallCheck(this, ActionsTable);

        return _possibleConstructorReturn(this, (ActionsTable.__proto__ || Object.getPrototypeOf(ActionsTable)).apply(this, arguments));
    }

    _createClass(ActionsTable, [{
        key: "render",
        value: function render() {

            var today = moment(new Date()).format('DD-MM-YYYY');

            return React.createElement(
                "div",
                { id: "printcss ", style: { 'margin-left': '10px' } },
                React.createElement(
                    Grid,
                    null,
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { xs: 12 },
                            React.createElement(
                                "h3",
                                null,
                                "Orden de Servicio "
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "Supreme - Lavanderia "
                            ),
                            React.createElement(
                                "h5",
                                null,
                                "Av. Romulo Betancourt No. 1516 esq. 12 de Julio"
                            ),
                            React.createElement(
                                "h5",
                                null,
                                "Plaza Thalys, Bella Vista, Sto. Dgo."
                            ),
                            React.createElement(
                                "h4",
                                null,
                                "Tel.: 829-594-8430"
                            ),
                            React.createElement(
                                "h5",
                                null,
                                "Horario Lunes a Viernes 07:30am a 7:00pm"
                            ),
                            React.createElement(
                                "h5",
                                null,
                                "Sabado 08:30am a 5:00pm"
                            ),
                            React.createElement(
                                "h5",
                                null,
                                "RNC: 131576958"
                            ),
                            React.createElement(
                                "h5",
                                { className: "col-xs-offset-7" },
                                "Fecha: ",
                                today
                            ),
                            React.createElement("br", null)
                        )
                    ),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { xs: 12 },
                            React.createElement(
                                Table,
                                { striped: true, bordered: true, condensed: true, hover: true,
                                    style: { 'position': 'relative', 'width': '55%', 'margin': '0' } },
                                React.createElement(
                                    "thead",
                                    null,
                                    React.createElement(
                                        "tr",
                                        null,
                                        React.createElement(
                                            "th",
                                            { style: { 'width': '15px',
                                                    'font-size': '25px', 'border-spacing': '0 30px' } },
                                            "#"
                                        ),
                                        React.createElement(
                                            "th",
                                            { style: { 'width': '15px',
                                                    'font-size': '25px' } },
                                            "Articulo"
                                        ),
                                        React.createElement(
                                            "th",
                                            { style: { 'width': '15px',
                                                    'font-size': '25px' } },
                                            "Precio"
                                        ),
                                        React.createElement(
                                            "th",
                                            { style: { 'width': '15px',
                                                    'font-size': '25px' } },
                                            "Servicio"
                                        )
                                    )
                                ),
                                this.props.masterAPI.map(function (master, index) {
                                    return React.createElement(ActionsTableBody, {
                                        key: index,
                                        index: index,
                                        id: master.id,

                                        item: master.item
                                    });
                                }),
                                React.createElement(
                                    "tfoot",
                                    null,
                                    React.createElement(ActionsTableBodyFooter, {
                                        parameter: this.props.parameter,
                                        masterAPI: this.props.masterAPI
                                    })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ActionsTable;
}(React.Component);

var ActionsTableBodyFooter = function (_React$Component4) {
    _inherits(ActionsTableBodyFooter, _React$Component4);

    function ActionsTableBodyFooter() {
        _classCallCheck(this, ActionsTableBodyFooter);

        return _possibleConstructorReturn(this, (ActionsTableBodyFooter.__proto__ || Object.getPrototypeOf(ActionsTableBodyFooter)).apply(this, arguments));
    }

    _createClass(ActionsTableBodyFooter, [{
        key: "render",
        value: function render() {

            var nextState = this.props.masterAPI;

            var zoom = 0;

            if (nextState[0]) {

                zoom = nextState[0].project;
            }

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    "\xA0"
                ),
                React.createElement(
                    "td",
                    null,
                    "\xA0"
                ),
                React.createElement(
                    "td",
                    { style: { 'width': '15px', 'font-size': '20px' } },
                    "Total"
                ),
                React.createElement(
                    "td",
                    { style: { 'width': '15px',
                            'font-size': '20px' } },
                    "RD$",
                    zoom,
                    ".00"
                ),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement("br", null)
            );
        }
    }]);

    return ActionsTableBodyFooter;
}(React.Component);

var ActionsTableBody = function (_React$Component5) {
    _inherits(ActionsTableBody, _React$Component5);

    function ActionsTableBody() {
        _classCallCheck(this, ActionsTableBody);

        return _possibleConstructorReturn(this, (ActionsTableBody.__proto__ || Object.getPrototypeOf(ActionsTableBody)).apply(this, arguments));
    }

    _createClass(ActionsTableBody, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "tbody",
                null,
                this.props.item.map(function (master, index) {
                    return React.createElement(ActionsTableBodyDetail, {
                        key: index,
                        index: index + 1,
                        id: master.id,
                        name: master.firstname,
                        item: master.item,
                        development: master.development,
                        project: master.project
                    });
                })
            );
        }
    }]);

    return ActionsTableBody;
}(React.Component);

var ActionsTableBodyDetail = function (_React$Component6) {
    _inherits(ActionsTableBodyDetail, _React$Component6);

    function ActionsTableBodyDetail() {
        _classCallCheck(this, ActionsTableBodyDetail);

        return _possibleConstructorReturn(this, (ActionsTableBodyDetail.__proto__ || Object.getPrototypeOf(ActionsTableBodyDetail)).apply(this, arguments));
    }

    _createClass(ActionsTableBodyDetail, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { style: { 'font-size': '20px' } },
                    "\xA0"
                ),
                React.createElement(
                    "td",
                    { style: { 'font-size': '20px' } },
                    this.props.item
                ),
                React.createElement(
                    "td",
                    {
                        style: { 'font-size': '20px' } },
                    this.props.project,
                    ".00"
                ),
                React.createElement(
                    "td",
                    {
                        style: { 'font-size': '20px' } },
                    this.props.development
                )
            );
        }
    }]);

    return ActionsTableBodyDetail;
}(React.Component);

var Login = function (_React$Component7) {
    _inherits(Login, _React$Component7);

    function Login() {
        _classCallCheck(this, Login);

        return _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).apply(this, arguments));
    }

    _createClass(Login, [{
        key: "onSubmit",
        value: function onSubmit(event) {

            event.preventDefault();

            var newCookie = {

                "id": "1",
                "username": event.target.username.value,
                "password": "1234"
            };

            fetch(API_URL + '/login', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newCookie)
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                if (response.token != undefined) {
                    localStorage.setItem(TOKEN_KEY, response.token);
                }
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            setTimeout(function () {

                window.location.reload();
            }, 2000);
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement(
                "form",
                { onSubmit: this.onSubmit.bind(this) },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(Col, { md: 3, sm: 3, xs: 3 }),
                    React.createElement(
                        Col,
                        { md: 6, sm: 6, xs: 6 },
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-md-2 col-sm-2" },
                                React.createElement(
                                    "label",
                                    null,
                                    "Nickname:"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-10 col-sm-10" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control", id: "username", name: "username", placeholder: "Type your nickname" })
                            )
                        )
                    ),
                    React.createElement(Col, { md: 3, sm: 3, xs: 3 })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(Col, { md: 3, sm: 3, xs: 3 }),
                    React.createElement(Col, { md: 6, sm: 6, xs: 6 }),
                    React.createElement(
                        Col,
                        { md: 3, sm: 3, xs: 3 },
                        React.createElement(
                            Button,
                            { type: "submit" },
                            "Login"
                        )
                    )
                )
            );
        }
    }]);

    return Login;
}(React.Component);

var Registration = function (_React$Component8) {
    _inherits(Registration, _React$Component8);

    function Registration() {
        _classCallCheck(this, Registration);

        return _possibleConstructorReturn(this, (Registration.__proto__ || Object.getPrototypeOf(Registration)).apply(this, arguments));
    }

    _createClass(Registration, [{
        key: "onSubmit",
        value: function onSubmit(event) {

            event.preventDefault();

            var newCookie = {

                "id": "1",
                "username": event.target.first_name.value,
                "email": event.target.email.value,
                "password": "1234"
            };

            fetch(API_URL + '/register', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newCookie)
            });

            window.location.reload();
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement(
                "form",
                { onSubmit: this.onSubmit.bind(this) },
                React.createElement("br", null),
                React.createElement("br", null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(Col, { md: 3, sm: 3, xs: 3 }),
                    React.createElement(
                        Col,
                        { md: 6, sm: 6, xs: 6 },
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-md-2 col-sm-2" },
                                React.createElement(
                                    "label",
                                    null,
                                    "Nickname:"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-10 col-sm-10" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control", id: "first_name", name: "first_name", placeholder: "Type your nickname" })
                            )
                        )
                    ),
                    React.createElement(Col, { md: 3, sm: 3, xs: 3 })
                ),
                React.createElement("br", null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(Col, { md: 3, sm: 3, xs: 3 }),
                    React.createElement(
                        Col,
                        { md: 6, sm: 6, xs: 6 },
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-md-2 col-sm-2" },
                                React.createElement(
                                    "label",
                                    null,
                                    "Email:"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-10 col-sm-10" },
                                React.createElement("input", {
                                    type: "Email",
                                    className: "form-control", id: "email", name: "email", placeholder: "Type your email address" })
                            )
                        )
                    ),
                    React.createElement(Col, { md: 3, sm: 3, xs: 3 })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(Col, { md: 3, sm: 3, xs: 3 }),
                    React.createElement(Col, { md: 6, sm: 6, xs: 6 }),
                    React.createElement(
                        Col,
                        { md: 3, sm: 3, xs: 3 },
                        React.createElement(
                            Button,
                            { type: "submit" },
                            "Save"
                        )
                    )
                )
            );
        }
    }]);

    return Registration;
}(React.Component);

var Toolbar = function (_React$Component9) {
    _inherits(Toolbar, _React$Component9);

    function Toolbar() {
        _classCallCheck(this, Toolbar);

        var _this12 = _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).call(this));

        _this12.state = {
            searchText: ""
        };
        return _this12;
    }

    _createClass(Toolbar, [{
        key: "componentDidMount",
        value: function componentDidMount() {

            document.body.style.backgroundImage = "none";
        }
    }, {
        key: "onClicked",
        value: function onClicked() {

            localStorage.removeItem(TOKEN_KEY);
            window.location.reload();
        }
    }, {
        key: "onRefreshed",
        value: function onRefreshed() {
            this.props.history.push("/detail");
            window.location.reload();
        }
    }, {
        key: "onChanged",
        value: function onChanged(event) {

            this.props.searchCallback(event);
        }
    }, {
        key: "render",
        value: function render() {

            var toolbarES = React.createElement(
                Navbar,
                null,
                React.createElement(
                    "div",
                    { className: "navbar-header" },
                    React.createElement(
                        "div",
                        { className: "navbar-brand" },
                        React.createElement(
                            Link,
                            { to: '/', onClick: this.onRefreshed.bind(this) },
                            "Info-Solutions SYS"
                        )
                    )
                ),
                React.createElement(
                    Nav,
                    null,
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            Link,
                            { to: '/master' },
                            "Master"
                        )
                    ),
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            Link,
                            { to: '/detail' },
                            "Detail"
                        )
                    ),
                    React.createElement(
                        NavDropdown,
                        { eventKey: 3, title: "Report", id: "basic-nav-dropdown" },
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.1 },
                            React.createElement(
                                Link,
                                { to: "/partials" },
                                "Partials"
                            )
                        )
                    ),
                    React.createElement(
                        NavDropdown,
                        { style: { 'float': 'right', 'position': 'absolute', 'left': '80%' }, eventKey: 3, title: "Perfil Usuario", id: "basic-nav-dropdown" },
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.1 },
                            React.createElement(
                                Link,
                                { to: "/account" },
                                "Cuenta de Usuario"
                            )
                        ),
                        React.createElement(
                            MenuItem,
                            { eventKey: 3.2 },
                            React.createElement(
                                Link,
                                { onClick: this.onClicked, to: "/logout" },
                                "Log Out"
                            )
                        )
                    )
                )
            );

            var toolbarEN = React.createElement(
                Navbar,
                null,
                React.createElement(
                    "div",
                    { className: "navbar-header" },
                    React.createElement(
                        "div",
                        { className: "navbar-brand", style: { "height": "10%" } },
                        React.createElement(
                            Link,
                            { to: '/', onClick: this.onRefreshed.bind(this) },
                            React.createElement("img", { src: "http://localhost:8084/testiiiing.jpg", width: "100px", height: "100px" })
                        )
                    )
                ),
                React.createElement(
                    Nav,
                    null,
                    React.createElement(
                        "li",
                        { style: { "top": "40px" } },
                        React.createElement(
                            Link,
                            { to: '/master' },
                            "Home"
                        )
                    ),
                    React.createElement(
                        "li",
                        { style: { "top": "40px" } },
                        React.createElement(
                            Link,
                            { to: '/upload' },
                            "Finder"
                        )
                    )
                )
            );

            if (languageActive) {

                return React.createElement(
                    "div",
                    null,
                    React.createElement("br", null),
                    toolbarEN
                );
            } else {
                return React.createElement(
                    "div",
                    null,
                    toolbarES
                );
            }
        }
    }]);

    return Toolbar;
}(React.Component);

var About = function (_React$Component10) {
    _inherits(About, _React$Component10);

    function About() {
        _classCallCheck(this, About);

        return _possibleConstructorReturn(this, (About.__proto__ || Object.getPrototypeOf(About)).apply(this, arguments));
    }

    _createClass(About, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "h1",
                null,
                "About"
            );
        }
    }]);

    return About;
}(React.Component);

var Repos = function (_React$Component11) {
    _inherits(Repos, _React$Component11);

    function Repos() {
        _classCallCheck(this, Repos);

        return _possibleConstructorReturn(this, (Repos.__proto__ || Object.getPrototypeOf(Repos)).apply(this, arguments));
    }

    _createClass(Repos, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "h1",
                null,
                "Repos ",
                this.props.params.repo_name
            );
        }
    }]);

    return Repos;
}(React.Component);

var Master = function (_React$Component12) {
    _inherits(Master, _React$Component12);

    function Master() {
        _classCallCheck(this, Master);

        var _this15 = _possibleConstructorReturn(this, (Master.__proto__ || Object.getPrototypeOf(Master)).call(this));

        _this15.state = {
            countDown: 59,
            red: true,
            yellow: false,
            green: false,
            countDownKafka: 0
        };
        return _this15;
    }

    _createClass(Master, [{
        key: "componentDidMount",
        value: function componentDidMount() {

            socket.on('connect', function (tradeMsg) {
                console.log("It worked");
            });
        }
    }, {
        key: "filled",
        value: function filled(params) {
            global = params;
            this.setState({
                countDown: 10
            });
        }
    }, {
        key: "sendKey",
        value: function sendKey(event) {

            event.preventDefault();

            window.print();

            console.log('test');
        }
    }, {
        key: "render",
        value: function render() {
            var _this16 = this;

            var semaforoRojoActive = void 0;
            var semaforoAmarilloActive = void 0;
            var semaforoVerdeActive = void 0;

            socket.on('update', function (data) {

                var obj = JSON.parse(data);

                global2 = parseInt(obj.second);
                redLight = obj.redlight;
            });

            setTimeout(function () {

                _this16.filled(global2);
            }, 500);

            var semaforoRojo = React.createElement(
                Row,
                null,
                React.createElement(Col, { md: 5 }),
                React.createElement(
                    Col,
                    { md: 3 },
                    React.createElement("div", { style: { "height": "100px", "width": "100px", "border-style": "solid", "border-width": "2px", "border-radius": "87px", "background-color": "red", "box-shadow": "0 0 6em" } })
                ),
                React.createElement(Col, { md: 4 })
            );

            var semaforoAmarillo = React.createElement(
                Row,
                null,
                React.createElement(Col, { md: 5 }),
                React.createElement(
                    Col,
                    { md: 3 },
                    React.createElement("div", { style: { "height": "100px", "width": "100px", "border-style": "solid", "border-width": "2px", "border-radius": "87px", "background-color": "yellow", "box-shadow": "0 0 6em" } })
                ),
                React.createElement(Col, { md: 4 })
            );

            var semaforoVerde = React.createElement(
                Row,
                null,
                React.createElement(Col, { md: 5 }),
                React.createElement(
                    Col,
                    { md: 3 },
                    React.createElement("div", { style: { "height": "100px", "width": "100px", "border-style": "solid", "border-width": "2px", "border-radius": "87px", "background-color": "green", "box-shadow": "0 0 6em" } })
                ),
                React.createElement(Col, { md: 4 })
            );

            var semaforoRojoOpacity = React.createElement(
                Row,
                null,
                React.createElement(Col, { md: 5 }),
                React.createElement(
                    Col,
                    { md: 3 },
                    React.createElement("div", { style: { "height": "100px", "width": "100px", "border-style": "solid", "border-width": "2px", "border-radius": "87px", "background-color": "red", "opacity": "0.5" } })
                ),
                React.createElement(Col, { md: 4 })
            );
            var semaforoAmarilloOpacity = React.createElement(
                Row,
                null,
                React.createElement(Col, { md: 5 }),
                React.createElement(
                    Col,
                    { md: 3 },
                    React.createElement("div", { style: { "height": "100px", "width": "100px", "border-style": "solid", "border-width": "2px", "border-radius": "87px", "background-color": "yellow", "opacity": "0.5" } })
                ),
                React.createElement(Col, { md: 4 })
            );
            var semaforoVerdeOpacity = React.createElement(
                Row,
                null,
                React.createElement(Col, { md: 5 }),
                React.createElement(
                    Col,
                    { md: 3 },
                    React.createElement("div", { style: { "height": "100px", "width": "100px", "border-style": "solid", "border-width": "2px", "border-radius": "87px", "background-color": "green", "opacity": "0.5" } })
                ),
                React.createElement(Col, { md: 4 })
            );

            if (redLight) {

                semaforoRojoActive = semaforoRojo;
                if (global > 58) {

                    semaforoRojoActive = semaforoRojoOpacity;
                    semaforoAmarilloActive = semaforoAmarillo;
                } else {

                    semaforoAmarilloActive = semaforoAmarilloOpacity;
                }
                semaforoVerdeActive = semaforoVerdeOpacity;
            } else {

                semaforoRojoActive = semaforoRojoOpacity;
                semaforoAmarilloActive = semaforoAmarilloOpacity;
                semaforoVerdeActive = semaforoVerde;
            }

            if (global == 0) {

                if (redLight) {
                    redLight = !redLight;
                    yellowLight = !yellowLight;
                    greenLight = !greenLight;
                } else {
                    redLight = !redLight;
                    yellowLight = !yellowLight;
                    greenLight = !greenLight;
                }
            }

            return React.createElement(
                Row,
                null,
                React.createElement(
                    "button",
                    { className: "buttonPrint", onClick: this.sendKey.bind(this) },
                    "Test"
                )
            );
        }
    }]);

    return Master;
}(React.Component);

var MasterPagination = function (_React$Component13) {
    _inherits(MasterPagination, _React$Component13);

    function MasterPagination() {
        _classCallCheck(this, MasterPagination);

        return _possibleConstructorReturn(this, (MasterPagination.__proto__ || Object.getPrototypeOf(MasterPagination)).apply(this, arguments));
    }

    _createClass(MasterPagination, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "div",
                null,
                React.createElement(Pagination, {
                    prev: true,
                    next: true,
                    first: true,
                    last: true,
                    ellipsis: true,
                    boundaryLinks: true,
                    bsSize: "small",
                    items: 5,
                    activePage: this.props.activePage,
                    onSelect: this.props.masterCallback.handleSelect
                }),
                React.createElement("br", null)
            );
        }
    }]);

    return MasterPagination;
}(React.Component);

var MasterSearch = function (_React$Component14) {
    _inherits(MasterSearch, _React$Component14);

    function MasterSearch() {
        _classCallCheck(this, MasterSearch);

        return _possibleConstructorReturn(this, (MasterSearch.__proto__ || Object.getPrototypeOf(MasterSearch)).apply(this, arguments));
    }

    _createClass(MasterSearch, [{
        key: "render",
        value: function render() {

            var MasterSearchEN = React.createElement(
                "div",
                null,
                React.createElement(
                    Panel,
                    { header: "Search Master" },
                    React.createElement(
                        "form",
                        null,
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-md-2 col-sm-2" },
                                React.createElement(
                                    "label",
                                    null,
                                    "Search:"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-10 col-sm-10" },
                                React.createElement("input", {
                                    onChange: this.props.masterCallback.onhandleuserinput.bind(this),
                                    type: "text",
                                    className: "form-control",
                                    id: "first_name", name: "first_name" })
                            )
                        )
                    )
                )
            );

            var MasterSearchES = React.createElement(
                "div",
                null,
                React.createElement(
                    Panel,
                    { header: "Busqueda de Factura" },
                    React.createElement(
                        "form",
                        null,
                        React.createElement(
                            "div",
                            { className: "form-group" },
                            React.createElement(
                                "div",
                                { className: "col-md-2 col-sm-2" },
                                React.createElement(
                                    "label",
                                    null,
                                    "Buscar:"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-10 col-sm-10" },
                                React.createElement("input", {
                                    onChange: this.props.masterCallback.onhandleuserinput.bind(this),
                                    type: "text",
                                    className: "form-control",
                                    id: "first_name", name: "first_name" })
                            )
                        )
                    )
                )
            );

            if (languageActive) {
                return React.createElement(
                    "div",
                    null,
                    MasterSearchEN
                );
            } else {
                return React.createElement(
                    "div",
                    null,
                    MasterSearchES
                );
            }
        }
    }]);

    return MasterSearch;
}(React.Component);

var MasterTable = function (_React$Component15) {
    _inherits(MasterTable, _React$Component15);

    function MasterTable() {
        _classCallCheck(this, MasterTable);

        var _this19 = _possibleConstructorReturn(this, (MasterTable.__proto__ || Object.getPrototypeOf(MasterTable)).call(this));

        _this19.state = {

            masterAPI: [],
            onShowComment: "none",
            searchData: "",
            compare: []
        };
        return _this19;
    }

    _createClass(MasterTable, [{
        key: "onComment",
        value: function onComment(event) {

            event.preventDefault();

            if (this.state.onShowComment == "none") {
                this.setState({

                    onShowComment: "block"
                });
            } else {
                this.setState({

                    onShowComment: "none"
                });
            }
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this20 = this;

            var params = {
                Bucket: albumBucketName,
                MaxKeys: 100
            };

            s3.listObjects(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    _this20.setState({
                        compare: data
                    });
                }
            });
        }
    }, {
        key: "render",
        value: function render() {

            var rows = [];

            var item = [];

            var items = [];

            if (this.state.compare.Contents) {

                item = this.state.compare.Contents;
            }

            items = item;
            //console.log(item)

            for (var i = 0; i < items.length; i++) {
                rows.push(React.createElement(
                    Col,
                    { item: true, md: 4 },
                    React.createElement("br", null),
                    React.createElement(
                        Panel,
                        { style: { 'border-color': '#ffffff' } },
                        React.createElement(
                            Row,
                            null,
                            React.createElement(
                                Col,
                                { md: 12 },
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        Link,
                                        { to: '/actions/1' },
                                        React.createElement("img", { src: "https://webpaa-deployments-mobilehub-2128298286.s3.amazonaws.com/" + items[i].Key, alt: "Avatar", style: { "width": "100%", "height": "100%", "padding-left": "10px", "padding-right": "10px" } })
                                    )
                                ),
                                React.createElement(
                                    Row,
                                    { style: { 'text-align': 'center' } },
                                    React.createElement(
                                        "h5",
                                        null,
                                        items[i].Key
                                    )
                                )
                            )
                        )
                    )
                ));
            }

            return React.createElement(
                Row,
                null,
                rows
            );
        }
    }]);

    return MasterTable;
}(React.Component);

var MasterTableLike = function (_React$Component16) {
    _inherits(MasterTableLike, _React$Component16);

    function MasterTableLike() {
        _classCallCheck(this, MasterTableLike);

        return _possibleConstructorReturn(this, (MasterTableLike.__proto__ || Object.getPrototypeOf(MasterTableLike)).apply(this, arguments));
    }

    _createClass(MasterTableLike, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: "btn btn-warning", name: "like", onClick: this.props.onLike, value: '{"id":' + this.props.id + ',"press":"' + this.props.isLiked + '"}' },
                React.createElement("i", { className: "fa fa-shopping-cart", "aria-hidden": "true" }),
                " ",
                'Add To Cart'
            );
        }
    }]);

    return MasterTableLike;
}(React.Component);

var MasterTableComment = function (_React$Component17) {
    _inherits(MasterTableComment, _React$Component17);

    function MasterTableComment() {
        _classCallCheck(this, MasterTableComment);

        return _possibleConstructorReturn(this, (MasterTableComment.__proto__ || Object.getPrototypeOf(MasterTableComment)).apply(this, arguments));
    }

    _createClass(MasterTableComment, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                { className: "btn btn-link", onClick: this.props.onShow, name: "comment", value: '{"id":' + this.props.id + ',"press":"comments"}' },
                React.createElement("i", { className: "fa fa-comments", "aria-hidden": "true" }),
                " Comments"
            );
        }
    }]);

    return MasterTableComment;
}(React.Component);

var MasterTableCommentDisplay = function (_React$Component18) {
    _inherits(MasterTableCommentDisplay, _React$Component18);

    function MasterTableCommentDisplay() {
        _classCallCheck(this, MasterTableCommentDisplay);

        return _possibleConstructorReturn(this, (MasterTableCommentDisplay.__proto__ || Object.getPrototypeOf(MasterTableCommentDisplay)).apply(this, arguments));
    }

    _createClass(MasterTableCommentDisplay, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: { 'display': this.props.onShowComment }, className: "card" },
                React.createElement(
                    Row,
                    null,
                    React.createElement(Col, { md: 1, sm: 1, xs: 1 }),
                    React.createElement(
                        Col,
                        { md: 1, sm: 6, xs: 6 },
                        React.createElement("br", null),
                        React.createElement("img", { src: "http://localhost:8084/" + "img_avatar.png", alt: "Avatar", style: { "width": "100%", "padding-left": "10px", "padding-right": "10px" } })
                    ),
                    React.createElement(
                        Col,
                        { md: 8, sm: 6, xs: 6 },
                        React.createElement("br", null),
                        React.createElement(
                            "p",
                            null,
                            this.props.text
                        )
                    ),
                    React.createElement(Col, { md: 2, sm: 1, xs: 1 })
                )
            );
        }
    }]);

    return MasterTableCommentDisplay;
}(React.Component);

var MasterTableCommentField = function (_React$Component19) {
    _inherits(MasterTableCommentField, _React$Component19);

    function MasterTableCommentField() {
        _classCallCheck(this, MasterTableCommentField);

        return _possibleConstructorReturn(this, (MasterTableCommentField.__proto__ || Object.getPrototypeOf(MasterTableCommentField)).apply(this, arguments));
    }

    _createClass(MasterTableCommentField, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.props.onComment },
                React.createElement(
                    "div",
                    { style: { 'display': this.props.onShowComment }, className: "card" },
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { md: 1, sm: 6, xs: 6 },
                            React.createElement("img", { src: "http://localhost:8084/" + "img_avatar.png", alt: "Avatar", style: { "width": "100%", "padding-left": "10px", "padding-right": "10px" } })
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalName" },
                            React.createElement(
                                Col,
                                { md: 2, sm: 6 },
                                React.createElement(FormControl, { value: this.props.id, type: "text", name: "id", style: { 'display': 'none' }, required: true })
                            ),
                            React.createElement(
                                Col,
                                { md: 8, sm: 6 },
                                React.createElement(FormControl, { type: "text", name: "firstname", placeholder: "Type a Comment", required: true })
                            ),
                            React.createElement(Col, { md: 2, sm: 6 })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(Col, { md: 10, sm: 10, xs: 10 }),
                        React.createElement(
                            Col,
                            { md: 1, sm: 10, xs: 10 },
                            React.createElement(
                                "button",
                                { type: "submit", className: "btn btn-primary" },
                                "Comment"
                            )
                        ),
                        React.createElement(Col, { md: 1, sm: 10, xs: 10 })
                    )
                )
            );
        }
    }]);

    return MasterTableCommentField;
}(React.Component);

var MasterTableBody = function (_React$Component20) {
    _inherits(MasterTableBody, _React$Component20);

    function MasterTableBody() {
        _classCallCheck(this, MasterTableBody);

        return _possibleConstructorReturn(this, (MasterTableBody.__proto__ || Object.getPrototypeOf(MasterTableBody)).apply(this, arguments));
    }

    _createClass(MasterTableBody, [{
        key: "onClick",
        value: function onClick() {
            var _this26 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this26.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            console.log('clicked!');
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    this.props.id
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.date
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.name
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.items
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.status
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "a",
                        { target: "_blank", onClick: this.onClick, className: "btn btn-default", href: "http://localhost:3000/" + this.props.id },
                        React.createElement("i", { className: "fa fa-eye", "aria-hidden": "true" })
                    ),
                    ' ',
                    React.createElement(
                        Link,
                        { className: "btn btn-default", to: '/actions/' + this.props.id },
                        React.createElement("i", { className: "fa fa-dollar", "aria-hidden": "true" })
                    ),
                    ' ',
                    React.createElement(
                        Button,
                        { onClick: this.props.masterCallback.ondeletemaster.bind(this, this.props.id) },
                        React.createElement("i", { className: "fa fa-trash", "aria-hidden": "true" })
                    )
                )
            );
        }
    }]);

    return MasterTableBody;
}(React.Component);

var MasterModalButton = function (_React$Component21) {
    _inherits(MasterModalButton, _React$Component21);

    function MasterModalButton() {
        _classCallCheck(this, MasterModalButton);

        return _possibleConstructorReturn(this, (MasterModalButton.__proto__ || Object.getPrototypeOf(MasterModalButton)).apply(this, arguments));
    }

    _createClass(MasterModalButton, [{
        key: "render",
        value: function render() {

            var MasterModalButtonEN = React.createElement(
                Col,
                { md: 12 },
                React.createElement(
                    Button,
                    { style: { 'margin-left': '70%' },
                        bsStyle: 'default',
                        onClick: this.props.masterCallback.onsavemaster.bind(this) },
                    "Save"
                )
            );

            var MasterModalButtonES = React.createElement(
                Col,
                { md: 12 },
                React.createElement(
                    Button,
                    { style: { 'margin-left': '70%' },
                        bsStyle: 'default',
                        onClick: this.props.masterCallback.onsavemaster.bind(this) },
                    "Guardar"
                )
            );

            var MasterModalButtonActive = void 0;

            if (languageActive) {

                MasterModalButtonActive = MasterModalButtonEN;
            } else {

                MasterModalButtonActive = MasterModalButtonEN;
            }

            return React.createElement(
                Row,
                null,
                MasterModalButtonActive
            );
        }
    }]);

    return MasterModalButton;
}(React.Component);

var MasterModal = function (_React$Component22) {
    _inherits(MasterModal, _React$Component22);

    function MasterModal() {
        _classCallCheck(this, MasterModal);

        return _possibleConstructorReturn(this, (MasterModal.__proto__ || Object.getPrototypeOf(MasterModal)).apply(this, arguments));
    }

    _createClass(MasterModal, [{
        key: "render",
        value: function render() {

            var MasterModalEN = React.createElement(
                Modal.Title,
                null,
                this.props.idSelected
            );

            var MasterModalES = React.createElement(
                Modal.Title,
                null,
                "Agregar Factura"
            );

            var MasterModalActive = void 0;

            if (languageActive) {

                MasterModalActive = MasterModalEN;
            } else {

                MasterModalActive = MasterModalES;
            }

            return React.createElement(
                "div",
                null,
                React.createElement(
                    Modal,
                    { show: this.props.showModal, onHide: this.props.close },
                    React.createElement(
                        Modal.Header,
                        { closeButton: true },
                        MasterModalActive
                    ),
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement("br", null)
                    )
                )
            );
        }
    }]);

    return MasterModal;
}(React.Component);

var languages = [{
    name: 'TRAJES 2 PIEZAS',
    year: 1972
}, {
    name: 'SACOS',
    year: 2000
}, {
    name: 'PANTALONES',
    year: 1983
}, {
    name: 'CAMISAS',
    year: 2007
}, {
    name: 'POLO SHIRT',
    year: 2012
}, {
    name: 'CHACABANA',
    year: 2009
}, {
    name: 'VESTIDO DAMAS',
    year: 1990
}, {
    name: 'FALDAS',
    year: 1995
}, {
    name: 'BLUSAS',
    year: 1995
}, {
    name: 'CORTINAS',
    year: 1987
}, {
    name: 'COLCHAS',
    year: 1995
}, {
    name: 'FRANELA',
    year: 1991
}, {
    name: 'ABRIGO',
    year: 1995
}, {
    name: 'OVERALL',
    year: 2003
}, {
    name: 'SHORT',
    year: 2003
}, {
    name: 'VESTIDO DE NOVIA',
    year: 2003
}];

function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {

    var escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    var regex = new RegExp('^' + escapedValue, 'i');

    return languages.filter(function (language) {
        return regex.test(language.name);
    });
}

function renderSuggestion(suggestion) {
    return React.createElement(
        "span",
        null,
        suggestion.name
    );
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

var MasterModalField = function (_React$Component23) {
    _inherits(MasterModalField, _React$Component23);

    function MasterModalField() {
        _classCallCheck(this, MasterModalField);

        var _this29 = _possibleConstructorReturn(this, (MasterModalField.__proto__ || Object.getPrototypeOf(MasterModalField)).call(this));

        _this29.state = {

            value: '',
            suggestions: [],
            peluqueraData: [],
            masterAPI: []
        };
        return _this29;
    }

    _createClass(MasterModalField, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this30 = this;

            fetch(API_URL + '/master', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this30.setState({

                    masterAPI: responseData
                });
            });
            fetch(API_URL + '/peluquera', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this30.setState({

                    peluqueraData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: "onChange",
        value: function onChange(event, _ref) {
            var newValue = _ref.newValue,
                method = _ref.method;

            this.setState({

                value: newValue
            });
        }
    }, {
        key: "onSuggestionsFetchRequested",
        value: function onSuggestionsFetchRequested(_ref2) {
            var value = _ref2.value;

            this.setState({

                suggestions: getSuggestions(value)
            });
        }
    }, {
        key: "onSuggestionsClearRequested",
        value: function onSuggestionsClearRequested() {

            this.setState({
                suggestions: []
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this31 = this;

            var _state = this.state,
                value = _state.value,
                suggestions = _state.suggestions;

            var inputProps = {
                placeholder: "Type 'c'",
                value: value,
                onChange: this.onChange.bind(this)
            };

            var name = void 0;

            var filteredData = this.state.masterAPI.filter(function (master) {
                return master.id == _this31.props.idSelected;
            });

            if (filteredData[0]) {
                name = filteredData[0].name;
            }

            var MasterModalFieldEN = React.createElement(
                Row,
                null,
                React.createElement(
                    Form,
                    { onSubmit: this.props.masterCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalName" },
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement("input", { type: "text", style: { 'display': 'none' }, name: "id", value: this.props.idSelected })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalName" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                "Name"
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: "text", name: "firstname", value: name, placeholder: "Name", required: true })
                            )
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(Row, null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalName" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                "Project"
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: "text", name: "project", placeholder: "Project", required: true })
                            )
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalName" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                "Cantidad"
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: "text", name: "quantity", placeholder: "Cantidad", required: true })
                            )
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            Col,
                            { mdOffset: 4, sm: 6 },
                            React.createElement(
                                Button,
                                { type: "submit" },
                                "Save"
                            )
                        )
                    )
                )
            );

            var MasterModalFieldES = React.createElement(
                Row,
                null,
                React.createElement(
                    Form,
                    {
                        onSubmit: this.props.masterCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalName" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                "Cliente"
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: "text",
                                    name: "firstname", placeholder: "Cliente", required: true })
                            )
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalItem" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel,
                                    md: 1, sm: 2 },
                                "Articulo"
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(Autosuggest, {
                                    suggestions: suggestions,

                                    onSuggestionsFetchRequested: this.onSuggestionsFetchRequested.bind(this),

                                    onSuggestionsClearRequested: this.onSuggestionsClearRequested.bind(this),

                                    renderSuggestion: renderSuggestion,

                                    getSuggestionValue: getSuggestionValue,
                                    inputProps: inputProps
                                })
                            )
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: "formControlsSelect" },
                            React.createElement(
                                Col,
                                { md: 1, sm: 2 },
                                React.createElement(
                                    ControlLabel,
                                    null,
                                    "Tipo de Servicio"
                                )
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(
                                    FormControl,
                                    { componentClass: "select", name: "development", placeholder: "Tipo de Servicio", required: true },
                                    this.state.peluqueraData.sort(function (a, b) {
                                        return a.name > b.name;
                                    }).map(function (item) {
                                        return React.createElement(
                                            "option",
                                            { value: item.name },
                                            item.name
                                        );
                                    })
                                )
                            )
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalName" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                "Precio"
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: "text", name: "project", placeholder: "Precio", required: true })
                            )
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalName" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, md: 1, sm: 2 },
                                "Cantidad"
                            ),
                            React.createElement(
                                Col,
                                { md: 4, sm: 6 },
                                React.createElement(FormControl, { type: "text", name: "quantity", placeholder: "Cantidad", required: true })
                            ),
                            React.createElement(
                                Col,
                                { md: 2, sm: 2 },
                                React.createElement(
                                    Button,
                                    { type: "submit" },
                                    React.createElement("i", { className: "fa fa-plus", "aria-hidden": "true" })
                                )
                            )
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        Row,
                        null,
                        React.createElement("input", {
                            style: { 'width': '70px', 'display': 'none' }, type: "text", name: "suggest",
                            placeholder: "Name", value: this.state.value })
                    )
                )
            );

            var MasterModalFieldActive = void 0;

            if (languageActive) {

                MasterModalFieldActive = MasterModalFieldEN;
            } else {
                MasterModalFieldActive = MasterModalFieldES;
            }

            return React.createElement(
                Grid,
                null,
                MasterModalFieldActive
            );
        }
    }]);

    return MasterModalField;
}(React.Component);

var MasterModalTable = function (_React$Component24) {
    _inherits(MasterModalTable, _React$Component24);

    function MasterModalTable() {
        _classCallCheck(this, MasterModalTable);

        return _possibleConstructorReturn(this, (MasterModalTable.__proto__ || Object.getPrototypeOf(MasterModalTable)).apply(this, arguments));
    }

    _createClass(MasterModalTable, [{
        key: "render",
        value: function render() {

            var MasterModalTableEN = React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "#"
                ),
                React.createElement(
                    "th",
                    null,
                    "Name"
                ),
                React.createElement(
                    "th",
                    null,
                    "Item"
                ),
                React.createElement(
                    "th",
                    null,
                    "Development"
                ),
                React.createElement(
                    "th",
                    null,
                    "Project"
                )
            );

            var MasterModalTableES = React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "#"
                ),
                React.createElement(
                    "th",
                    null,
                    "Nombre"
                ),
                React.createElement(
                    "th",
                    null,
                    "Articulo"
                ),
                React.createElement(
                    "th",
                    null,
                    "Tipo de Servicio"
                ),
                React.createElement(
                    "th",
                    null,
                    "Precio"
                )
            );

            var MasterModalActive = void 0;

            if (languageActive) {

                MasterModalActive = MasterModalTableEN;
            } else {

                MasterModalActive = MasterModalTableES;
            }

            return React.createElement(
                "div",
                null,
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        "thead",
                        null,
                        MasterModalActive
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        this.props.masterDetail.map(function (masterdetail, index) {
                            return React.createElement(MasterModalTableBody, {
                                index: index + 1,
                                key: index,
                                id: masterdetail.id,

                                firstname: masterdetail.firstname,

                                item: masterdetail.item,

                                development: masterdetail.development,

                                project: masterdetail.project
                            });
                        })
                    )
                )
            );
        }
    }]);

    return MasterModalTable;
}(React.Component);

var MasterModalTableBody = function (_React$Component25) {
    _inherits(MasterModalTableBody, _React$Component25);

    function MasterModalTableBody() {
        _classCallCheck(this, MasterModalTableBody);

        return _possibleConstructorReturn(this, (MasterModalTableBody.__proto__ || Object.getPrototypeOf(MasterModalTableBody)).apply(this, arguments));
    }

    _createClass(MasterModalTableBody, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    this.props.index
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.firstname
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.item
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.development
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.project
                )
            );
        }
    }]);

    return MasterModalTableBody;
}(React.Component);

var Detail = function (_React$Component26) {
    _inherits(Detail, _React$Component26);

    function Detail() {
        _classCallCheck(this, Detail);

        var _this34 = _possibleConstructorReturn(this, (Detail.__proto__ || Object.getPrototypeOf(Detail)).call(this));

        _this34.state = {
            showModal: false,
            filterText: '',
            detailData: []
        };
        return _this34;
    }

    _createClass(Detail, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this35 = this;

            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this35.setState({

                    detailData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: "close",
        value: function close() {
            this.setState({
                showModal: false
            });
        }
    }, {
        key: "open",
        value: function open() {
            this.setState({
                showModal: true
            });
        }
    }, {
        key: "onSaveDetail",
        value: function onSaveDetail(event) {
            var _newDetail;

            event.preventDefault();

            var today = moment(new Date()).format('YYYY-MM-DD');

            var newDetail = (_newDetail = {

                "id": Date.now(),
                "date": today
            }, _defineProperty(_newDetail, "id", event.target.id.value), _defineProperty(_newDetail, "name", event.target.name.value), _defineProperty(_newDetail, "item", event.target.item.value), _defineProperty(_newDetail, "environment", event.target.environment.value), _newDetail);

            var nextState = this.state.detailData;

            nextState.push(newDetail);

            fetch(API_URL + '/detail', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newDetail)
            });

            this.setState({

                detailData: nextState,
                showModal: false
            });
        }
    }, {
        key: "onHandleChange",
        value: function onHandleChange(event) {

            this.setState({

                filterText: event.target.value
            });
        }
    }, {
        key: "onUpdated",
        value: function onUpdated(value) {

            console.log(value);
        }
    }, {
        key: "onDeleted",
        value: function onDeleted(value) {

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == value;
            });

            nextState.splice(index, 1);

            this.setState({

                detailData: nextState
            });

            fetch(API_URL + '/deletedetail', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "id": value })
            });
        }
    }, {
        key: "render",
        value: function render() {

            var DetailEN = React.createElement(
                Button,
                { onClick: this.open.bind(this) },
                "Add Detail"
            );

            var DetailES = React.createElement(
                Button,
                { onClick: this.open.bind(this) },
                "Agregar Articulo"
            );

            var DetailActive = void 0;

            if (languageActive) {
                DetailActive = DetailEN;
            } else {
                DetailActive = DetailES;
            }

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(DetailSearch, {
                        filterText: this.state.filterText,
                        detailCallback: {
                            onHandleChange: this.onHandleChange.bind(this)
                        }
                    })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        "div",
                        { className: "pull-right" },
                        DetailActive,
                        React.createElement(DetailModal, { showModal: this.state.showModal,
                            detailCallback: {
                                open: this.open,
                                close: this.close.bind(this),

                                onsavedetail: this.onSaveDetail.bind(this)
                            }
                        })
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(DetailTable, {
                        filterText: this.state.filterText,
                        detailData: this.state.detailData,
                        detailCallback: {
                            onUpdated: this.onUpdated.bind(this),
                            onDeleted: this.onDeleted.bind(this)
                        }
                    })
                )
            );
        }
    }]);

    return Detail;
}(React.Component);

var DetailPagination = function (_React$Component27) {
    _inherits(DetailPagination, _React$Component27);

    function DetailPagination() {
        _classCallCheck(this, DetailPagination);

        var _this36 = _possibleConstructorReturn(this, (DetailPagination.__proto__ || Object.getPrototypeOf(DetailPagination)).call(this));

        _this36.state = {
            activePage: 1
        };
        return _this36;
    }

    _createClass(DetailPagination, [{
        key: "handleSelect",
        value: function handleSelect(eventKey) {
            this.setState({
                activePage: eventKey
            });
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement(Pagination, {
                prev: true,
                next: true,
                first: true,
                last: true,
                ellipsis: true,
                boundaryLinks: true,
                items: 5,
                maxButtons: 5,
                activePage: this.state.activePage,
                onSelect: this.handleSelect.bind(this)
            });
        }
    }]);

    return DetailPagination;
}(React.Component);

var DetailSearch = function (_React$Component28) {
    _inherits(DetailSearch, _React$Component28);

    function DetailSearch() {
        _classCallCheck(this, DetailSearch);

        return _possibleConstructorReturn(this, (DetailSearch.__proto__ || Object.getPrototypeOf(DetailSearch)).apply(this, arguments));
    }

    _createClass(DetailSearch, [{
        key: "render",
        value: function render() {

            var DetailSearchEN = React.createElement(
                Panel,
                { header: "Search Detail" },
                React.createElement(
                    "form",
                    null,
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "div",
                            { className: "col-md-2 col-sm-2" },
                            React.createElement(
                                "label",
                                null,
                                "Search:"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-10 col-sm-10" },
                            React.createElement("input", {
                                onChange: this.props.detailCallback.onHandleChange.bind(this),
                                type: "text", className: "form-control", id: "first_name",
                                name: "first_name" })
                        )
                    )
                )
            );

            var DetailSearchES = React.createElement(
                Panel,
                { header: "Busqueda " },
                React.createElement(
                    "form",
                    null,
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "div",
                            { className: "col-md-2 col-sm-2" },
                            React.createElement(
                                "label",
                                null,
                                "Buscar:"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-10 col-sm-10" },
                            React.createElement("input", {
                                onChange: this.props.detailCallback.onHandleChange.bind(this),
                                type: "text", className: "form-control", id: "first_name",
                                name: "first_name" })
                        )
                    )
                )
            );

            var DetailSearchActive = void 0;

            if (languageActive) {

                DetailSearchActive = DetailSearchEN;
            } else {
                DetailSearchActive = DetailSearchES;
            }

            return React.createElement(
                "div",
                null,
                DetailSearchActive
            );
        }
    }]);

    return DetailSearch;
}(React.Component);

var DetailTable = function (_React$Component29) {
    _inherits(DetailTable, _React$Component29);

    function DetailTable() {
        _classCallCheck(this, DetailTable);

        return _possibleConstructorReturn(this, (DetailTable.__proto__ || Object.getPrototypeOf(DetailTable)).apply(this, arguments));
    }

    _createClass(DetailTable, [{
        key: "render",
        value: function render() {
            var _this39 = this;

            var filteredMaster = this.props.detailData.filter(function (detail) {
                return detail.name.indexOf(_this39.props.filterText) !== -1;
            });

            var DetailTableEN = React.createElement(
                Panel,
                { header: "Search List" },
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "ID"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Name"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Item"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Environment"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Acciones"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        filteredMaster.map(function (detail, index) {
                            return React.createElement(DetailTableBody, {
                                key: index,
                                id: detail.id,
                                name: detail.name,
                                item: detail.item,

                                environment: detail.environment,

                                detailCallback: _this39.props.detailCallback
                            });
                        })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "pull-right" },
                    React.createElement(DetailPagination, null)
                )
            );

            var DetailTableES = React.createElement(
                Panel,
                { header: "Listado " },
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "ID"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Descripcion"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Cantidad"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Precio"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Actions"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        filteredMaster.map(function (detail, index) {
                            return React.createElement(DetailTableBody, {
                                key: index,
                                id: detail.id,
                                name: detail.name,
                                item: detail.item,

                                environment: detail.environment,

                                detailCallback: _this39.props.detailCallback
                            });
                        })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "pull-right" },
                    React.createElement(DetailPagination, null)
                )
            );

            var DetailTableActive = void 0;

            if (languageActive) {
                DetailTableActive = DetailTableEN;
            } else {
                DetailTableActive = DetailTableES;
            }

            return React.createElement(
                Row,
                null,
                filteredMaster.sort(function (a, b) {
                    return b.id - a.id;
                }).map(function (master, index) {
                    return React.createElement(
                        Col,
                        { item: true, md: 4 },
                        React.createElement(
                            Panel,
                            { header: master.date },
                            React.createElement(
                                "div",
                                { className: "card" },
                                React.createElement(
                                    Link,
                                    { to: '/actions/' + master.id },
                                    React.createElement("img", { src: "http://localhost:8084/img_avatar2.png", alt: "Avatar", style: { "width": "100%" } })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "container" },
                                    React.createElement(
                                        "h4",
                                        null,
                                        React.createElement(
                                            "b",
                                            null,
                                            master.name
                                        )
                                    ),
                                    React.createElement(
                                        "p",
                                        null,
                                        "Architect  Engineer"
                                    ),
                                    React.createElement(
                                        Button,
                                        { style: { 'margin-left': '23%' } },
                                        "Add"
                                    )
                                )
                            )
                        )
                    );
                })
            );
        }
    }]);

    return DetailTable;
}(React.Component);

var DetailModalUpdate = function (_React$Component30) {
    _inherits(DetailModalUpdate, _React$Component30);

    function DetailModalUpdate() {
        _classCallCheck(this, DetailModalUpdate);

        var _this40 = _possibleConstructorReturn(this, (DetailModalUpdate.__proto__ || Object.getPrototypeOf(DetailModalUpdate)).call(this));

        _this40.state = {

            parameter: '',
            showModal: true,
            detailData: [],
            name: ''
        };

        return _this40;
    }

    _createClass(DetailModalUpdate, [{
        key: "close",
        value: function close() {

            this.setState({

                showModal: false
            });

            //window.location.href = '/'
        }
    }, {
        key: "open",
        value: function open() {

            this.setState({

                showModal: true
            });
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this41 = this;

            fetch(API_URL + '/detail', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this41.setState({

                    detailData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            this.setState({

                parameter: this.props.params.detailid
            });
        }
    }, {
        key: "onSubmitted",
        value: function onSubmitted(event) {
            var _this42 = this;

            event.preventDefault();

            var nextState = this.state.detailData;

            var index = nextState.findIndex(function (x) {
                return x.id == _this42.state.parameter;
            });

            var name = nextState[index].name;
            nextState[index].name = event.target.name.value;
            if (event.target.name.value == '') {
                event.target.name.value = name;
            }

            var environment = nextState[index].environment;
            if (event.target.environment.value == '') {
                event.target.environment.value = environment;
            }

            fetch(API_URL + '/updatedetail', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "name": event.target.name.value, "environment": event.target.environment.value })
            });

            this.setState({

                showModal: false
            });
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement(
                Modal,
                { show: this.state.showModal, onHide: this.close.bind(this) },
                React.createElement(
                    Modal.Header,
                    null,
                    React.createElement(
                        Modal.Title,
                        null,
                        React.createElement(
                            "h1",
                            null,
                            "Editing to ",
                            this.state.parameter
                        )
                    )
                ),
                React.createElement(
                    Form,
                    { onSubmit: this.onSubmitted.bind(this), horizontal: true },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalId" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                "ID"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { value: this.state.parameter, type: "id", placeholder: "id", disabled: true })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalName" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                "Nombre"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: "name", type: "text", placeholder: "Nombre" })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalEnvironment" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                "Cantidad"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: "environment", type: "text", placeholder: "Cantidad" })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalEnvironment" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                "Precio"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { name: "project", type: "text", placeholder: "Precio" })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            null,
                            "Save"
                        )
                    )
                )
            );
        }
    }]);

    return DetailModalUpdate;
}(React.Component);

var DetailTableBody = function (_React$Component31) {
    _inherits(DetailTableBody, _React$Component31);

    function DetailTableBody() {
        _classCallCheck(this, DetailTableBody);

        return _possibleConstructorReturn(this, (DetailTableBody.__proto__ || Object.getPrototypeOf(DetailTableBody)).apply(this, arguments));
    }

    _createClass(DetailTableBody, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    this.props.id
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.name
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.item
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.environment
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        Link,
                        { className: "btn btn-default",
                            to: '/updatedetail/' + this.props.id },
                        React.createElement("i", { className: "fa fa-edit",
                            "aria-hidden": "true" })
                    ),
                    React.createElement(
                        Button,
                        {
                            onClick: this.props.detailCallback.onDeleted.bind(this, this.props.id) },
                        React.createElement("i", {
                            className: "fa fa-trash", "aria-hidden": "true" })
                    )
                )
            );
        }
    }]);

    return DetailTableBody;
}(React.Component);

var DetailModal = function (_React$Component32) {
    _inherits(DetailModal, _React$Component32);

    function DetailModal() {
        _classCallCheck(this, DetailModal);

        return _possibleConstructorReturn(this, (DetailModal.__proto__ || Object.getPrototypeOf(DetailModal)).apply(this, arguments));
    }

    _createClass(DetailModal, [{
        key: "render",
        value: function render() {

            var DetailModalEN = React.createElement(
                Modal,
                { show: this.props.showModal,
                    onHide: this.props.detailCallback.close },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        "Modal heading"
                    )
                ),
                React.createElement(
                    Form,
                    { horizontal: true,
                        onSubmit: this.props.detailCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            {
                                controlId: "formHorizontalid" },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                "ID"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: "text", name: "id", placeholder: "ID" })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: "formHorizontalname" },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                "Name"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: "text", name: "name", placeholder: "Name" })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: "formHorizontalEnvironment" },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                "Environment"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: "text", name: "environment", placeholder: "Item" })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: "formHorizontalItem" },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                "Item"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: "text", name: "item", placeholder: "Item" })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: "submit",
                                pullRight: true },
                            "Save"
                        )
                    )
                )
            );
            var DetailModalES = React.createElement(
                Modal,
                { show: this.props.showModal,
                    onHide: this.props.detailCallback.close },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        "Agregar Articulo"
                    )
                ),
                React.createElement(
                    Form,
                    { horizontal: true,
                        onSubmit: this.props.detailCallback.onsavedetail.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            {
                                controlId: "formHorizontalid" },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                "Codigo"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: "text", name: "id", placeholder: "Codigo" })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: "formHorizontalname" },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                "Descripcion"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: "text", name: "name", placeholder: "Descripcion" })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: "formHorizontalEnvironment" },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                "Precio"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: "text", name: "environment", placeholder: "Precio" })
                            )
                        ),
                        React.createElement(
                            FormGroup,
                            {
                                controlId: "formHorizontalItem" },
                            React.createElement(
                                Col,
                                {
                                    componentClass: ControlLabel, sm: 2 },
                                "Cantidad"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, {
                                    type: "text", name: "item", placeholder: "Cantidad" })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: "submit",
                                pullRight: true },
                            "Save"
                        )
                    )
                )
            );

            var DetailModalActive = void 0;

            if (languageActive) {
                DetailModalActive = DetailModalEN;
            } else {
                DetailModalActive = DetailModalES;
            }

            return React.createElement(
                "div",
                null,
                DetailModalActive
            );
        }
    }]);

    return DetailModal;
}(React.Component);

var Partials = function (_React$Component33) {
    _inherits(Partials, _React$Component33);

    function Partials() {
        _classCallCheck(this, Partials);

        var _this45 = _possibleConstructorReturn(this, (Partials.__proto__ || Object.getPrototypeOf(Partials)).call(this));

        _this45.state = {

            masterAPI: [],
            searchData: '2017-10-06',
            total: 0
        };

        return _this45;
    }

    _createClass(Partials, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this46 = this;

            fetch(API_URL + '/reporte', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this46.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            var today = moment(new Date()).format('YYYY-MM-DD');

            this.setState({

                searchData: today
            });
        }
    }, {
        key: "onChanged",
        value: function onChanged(event) {

            this.setState({

                searchData: event.target.value
            });
        }
    }, {
        key: "onRun",
        value: function onRun() {
            var _this47 = this;

            var nextState = this.state.masterAPI.filter(function (master) {
                return master.date == _this47.state.searchData && (master.payment == "cash" || master.payment == "card");
            });

            var grand = 0;

            for (var x = 0; x < nextState.length; x++) {
                grand += parseInt(nextState[x].project);
            }

            this.setState({

                total: grand
            });

            window.print();
        }
    }, {
        key: "render",
        value: function render() {
            var _this48 = this;

            var PartialsEN = React.createElement(
                "h1",
                null,
                "Draw List"
            );

            var PartialsES = React.createElement(
                "h1",
                null,
                "Reporte Cuadre"
            );

            var PartialsActive = void 0;

            if (languageActive) {

                PartialsActive = PartialsEN;
            } else {

                PartialsActive = PartialsES;
            }

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { xs: 6 },
                        PartialsActive
                    )
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(PartialsSearch, {
                        onChanged: this.onChanged.bind(this)
                    }),
                    React.createElement(PartialsTable, {

                        masterAPI: this.state.masterAPI.filter(function (master) {
                            return master.date == _this48.state.searchData && (master.payment == "cash" || master.payment == "card");
                        }),
                        total: this.state.total,
                        payment: this.state.payment
                    })
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Button,
                        { onClick: this.onRun.bind(this) },
                        "i"
                    )
                )
            );
        }
    }]);

    return Partials;
}(React.Component);

var PartialsSearch = function (_React$Component34) {
    _inherits(PartialsSearch, _React$Component34);

    function PartialsSearch() {
        _classCallCheck(this, PartialsSearch);

        return _possibleConstructorReturn(this, (PartialsSearch.__proto__ || Object.getPrototypeOf(PartialsSearch)).apply(this, arguments));
    }

    _createClass(PartialsSearch, [{
        key: "render",
        value: function render() {

            return React.createElement(
                Col,
                { xs: 6 },
                React.createElement(
                    Form,
                    { horizontal: true,
                        onChange: this.props.onChanged.bind(this) },
                    React.createElement(
                        FormGroup,
                        { controlId: "formHorizontalEmail" },
                        React.createElement(Col, { componentClass: ControlLabel, xs: 2 }),
                        React.createElement(
                            Col,
                            { xs: 6 },
                            React.createElement(FormControl, { type: "date", placeholder: "Email" })
                        )
                    )
                )
            );
        }
    }]);

    return PartialsSearch;
}(React.Component);

var PartialsTable = function (_React$Component35) {
    _inherits(PartialsTable, _React$Component35);

    function PartialsTable() {
        _classCallCheck(this, PartialsTable);

        return _possibleConstructorReturn(this, (PartialsTable.__proto__ || Object.getPrototypeOf(PartialsTable)).apply(this, arguments));
    }

    _createClass(PartialsTable, [{
        key: "render",
        value: function render() {
            var _this51 = this;

            var partialsTableEN = React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    { style: { 'width': '15px', 'font-size': '25px', 'border-spacing': '0 30px' } },
                    "#"
                ),
                React.createElement(
                    "th",
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    "Date"
                ),
                React.createElement(
                    "th",
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    "Name"
                ),
                React.createElement(
                    "th",
                    { style: { 'width': '15px', 'font-size': '25px' } },
                    "Project"
                )
            );

            var partialsTableES = React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    { style: { 'width': '15px', 'font-size': '35px', 'border-spacing': '0 30px' } },
                    "#"
                ),
                React.createElement(
                    "th",
                    { style: { 'width': '15px', 'font-size': '35px' } },
                    "Fecha"
                ),
                React.createElement(
                    "th",
                    { style: { 'width': '15px', 'font-size': '35px' } },
                    "Cliente"
                ),
                React.createElement(
                    "th",
                    { style: { 'width': '15px', 'font-size': '35px' } },
                    "Precio"
                ),
                React.createElement(
                    "th",
                    { style: { 'width': '15px', 'font-size': '35px' } },
                    "Tipo Pago"
                )
            );

            var partialsTableActive = void 0;

            if (languageActive) {

                partialsTableActive = partialsTableEN;
            } else {

                partialsTableActive = partialsTableES;
            }

            return React.createElement(
                Row,
                null,
                React.createElement(
                    Col,
                    { xs: 12 },
                    React.createElement(
                        Table,
                        { striped: true, bordered: true, condensed: true, hover: true, style: { 'width': '100%' } },
                        React.createElement(
                            "thead",
                            null,
                            partialsTableActive
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            this.props.masterAPI.map(function (master, index) {
                                return React.createElement(PartialsTableBody, {
                                    key: index,
                                    index: index + 1,
                                    id: master.id,
                                    date: master.date,
                                    name: master.name,
                                    project: master.project,
                                    total: _this51.props.total,
                                    payment: master.payment
                                });
                            })
                        ),
                        React.createElement(
                            "tfoot",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    { style: { 'width': '10px', 'font-size': '35px' } },
                                    "Total"
                                ),
                                React.createElement(
                                    "td",
                                    { style: { 'width': '10px', 'font-size': '35px' } },
                                    "RD$",
                                    this.props.total,
                                    ".00"
                                ),
                                React.createElement("br", null),
                                React.createElement("br", null)
                            )
                        )
                    )
                )
            );
        }
    }]);

    return PartialsTable;
}(React.Component);

var PartialsTableBody = function (_React$Component36) {
    _inherits(PartialsTableBody, _React$Component36);

    function PartialsTableBody() {
        _classCallCheck(this, PartialsTableBody);

        return _possibleConstructorReturn(this, (PartialsTableBody.__proto__ || Object.getPrototypeOf(PartialsTableBody)).apply(this, arguments));
    }

    _createClass(PartialsTableBody, [{
        key: "render",
        value: function render() {

            var nextState = void 0;

            var tipoPagoEF = React.createElement(
                "td",
                { style: { 'font-size': '35px' } },
                "EFECTIVO"
            );

            var tipoPagoTA = React.createElement(
                "td",
                { style: { 'font-size': '35px' } },
                "TARJETA"
            );

            if (this.props.payment == "card") {

                nextState = tipoPagoTA;
            } else {

                nextState = tipoPagoEF;
            }

            return React.createElement(
                "tr",
                null,
                React.createElement("td", null),
                React.createElement(
                    "td",
                    { style: { 'font-size': '35px' } },
                    this.props.date
                ),
                React.createElement(
                    "td",
                    { style: { 'font-size': '35px' } },
                    this.props.name
                ),
                React.createElement(
                    "td",
                    { style: { 'font-size': '35px' } },
                    this.props.project,
                    ".00"
                ),
                React.createElement(
                    "td",
                    { style: { 'font-size': '35px' } },
                    nextState
                )
            );
        }
    }]);

    return PartialsTableBody;
}(React.Component);

var TriPartials = function (_React$Component37) {
    _inherits(TriPartials, _React$Component37);

    function TriPartials() {
        _classCallCheck(this, TriPartials);

        var _this53 = _possibleConstructorReturn(this, (TriPartials.__proto__ || Object.getPrototypeOf(TriPartials)).call(this));

        _this53.state = {

            masterAPI: []
        };
        return _this53;
    }

    _createClass(TriPartials, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this54 = this;

            fetch(API_URL + '/weeklyreportrecap', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this54.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement(TriPartialsTable, {
                masterAPI: this.state.masterAPI
            });
        }
    }]);

    return TriPartials;
}(React.Component);

var TriPartialsTable = function (_React$Component38) {
    _inherits(TriPartialsTable, _React$Component38);

    function TriPartialsTable() {
        _classCallCheck(this, TriPartialsTable);

        return _possibleConstructorReturn(this, (TriPartialsTable.__proto__ || Object.getPrototypeOf(TriPartialsTable)).apply(this, arguments));
    }

    _createClass(TriPartialsTable, [{
        key: "render",
        value: function render() {

            return React.createElement(
                Table,
                { striped: true, bordered: true, condensed: true, hover: true },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "#"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Nombre"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Total"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Porcentaje"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Total + Porcentaje"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.props.masterAPI.map(function (master, index) {
                        return React.createElement(TriPartialsTableBody, {
                            master: master._id,
                            total: master.total
                        });
                    })
                )
            );
        }
    }]);

    return TriPartialsTable;
}(React.Component);

var TriPartialsTableBody = function (_React$Component39) {
    _inherits(TriPartialsTableBody, _React$Component39);

    function TriPartialsTableBody() {
        _classCallCheck(this, TriPartialsTableBody);

        var _this56 = _possibleConstructorReturn(this, (TriPartialsTableBody.__proto__ || Object.getPrototypeOf(TriPartialsTableBody)).call(this));

        _this56.state = {
            percentage: 1
        };
        return _this56;
    }

    _createClass(TriPartialsTableBody, [{
        key: "onChanged",
        value: function onChanged(data) {
            this.setState({
                percentage: data.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {

            var percentageTotal = this.props.total * this.state.percentage / 100;

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    "\xA0"
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.master
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.total.toFixed(2)
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement("input", { type: "number", name: "percentage", placeholder: "%", onChange: this.onChanged.bind(this) })
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        "h6",
                        null,
                        percentageTotal.toFixed(2)
                    )
                )
            );
        }
    }]);

    return TriPartialsTableBody;
}(React.Component);

var BiPartials = function (_React$Component40) {
    _inherits(BiPartials, _React$Component40);

    function BiPartials() {
        _classCallCheck(this, BiPartials);

        var _this57 = _possibleConstructorReturn(this, (BiPartials.__proto__ || Object.getPrototypeOf(BiPartials)).call(this));

        _this57.state = {

            masterAPI: []
        };

        return _this57;
    }

    _createClass(BiPartials, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this58 = this;

            fetch(API_URL + '/weeklyreport', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this58.setState({

                    masterAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement(
                Table,
                { striped: true, bordered: true, condensed: true, hover: true },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "#"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Fecha"
                        ),
                        React.createElement(
                            "th",
                            null,
                            "Tipo de Servicio"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.masterAPI.map(function (master, index) {
                        return React.createElement(BiPartialsTable, {
                            index: index,
                            fecha: master._id,
                            count: master.count
                        });
                    })
                )
            );
        }
    }]);

    return BiPartials;
}(React.Component);

var BiPartialsTable = function (_React$Component41) {
    _inherits(BiPartialsTable, _React$Component41);

    function BiPartialsTable() {
        _classCallCheck(this, BiPartialsTable);

        return _possibleConstructorReturn(this, (BiPartialsTable.__proto__ || Object.getPrototypeOf(BiPartialsTable)).apply(this, arguments));
    }

    _createClass(BiPartialsTable, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    this.props.index
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.fecha
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        Table,
                        null,
                        this.props.count.map(function (item) {
                            return React.createElement(BiPartialsTableBody, {
                                totales: item.totales,
                                item: item.item
                            });
                        })
                    )
                )
            );
        }
    }]);

    return BiPartialsTable;
}(React.Component);

var BiPartialsTableBody = function (_React$Component42) {
    _inherits(BiPartialsTableBody, _React$Component42);

    function BiPartialsTableBody() {
        _classCallCheck(this, BiPartialsTableBody);

        return _possibleConstructorReturn(this, (BiPartialsTableBody.__proto__ || Object.getPrototypeOf(BiPartialsTableBody)).apply(this, arguments));
    }

    _createClass(BiPartialsTableBody, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    this.props.item[0]
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.totales
                )
            );
        }
    }]);

    return BiPartialsTableBody;
}(React.Component);

var AgregarPeluquera = function (_React$Component43) {
    _inherits(AgregarPeluquera, _React$Component43);

    function AgregarPeluquera() {
        _classCallCheck(this, AgregarPeluquera);

        var _this61 = _possibleConstructorReturn(this, (AgregarPeluquera.__proto__ || Object.getPrototypeOf(AgregarPeluquera)).call(this));

        _this61.state = {
            showModal: false,
            filterText: '',
            peluqueraData: []
        };
        return _this61;
    }

    _createClass(AgregarPeluquera, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this62 = this;

            fetch(API_URL + '/peluquera', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this62.setState({

                    peluqueraData: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: "close",
        value: function close() {
            this.setState({
                showModal: false
            });
        }
    }, {
        key: "open",
        value: function open() {
            this.setState({
                showModal: true
            });
        }
    }, {
        key: "onDeleted",
        value: function onDeleted(value) {

            var nextState = this.state.peluqueraData;

            var index = nextState.findIndex(function (x) {
                return x.id == value;
            });
            console.log(nextState);
            console.log(value);
            nextState.splice(index, 1);

            this.setState({

                peluqueraData: nextState
            });

            fetch(API_URL + '/deletepeluquera', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify({ "index": index, "id": value })
            });
        }
    }, {
        key: "onSavePeluquera",
        value: function onSavePeluquera(event) {

            event.preventDefault();

            var today = moment(new Date()).format('YYYY-MM-DD');

            var newPeluquera = {

                "id": Date.now(),
                "date": today,
                "name": event.target.name.value
            };

            var nextState = this.state.peluqueraData;

            nextState.push(newPeluquera);

            fetch(API_URL + '/peluquera', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newPeluquera)
            });

            this.setState({

                peluqueraData: nextState,
                showModal: false
            });
        }
    }, {
        key: "onHandleChange",
        value: function onHandleChange(event) {

            this.setState({

                filterText: event.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(PeluqueraSearch, null)
                ),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        "div",
                        { className: "pull-right" },
                        React.createElement(
                            Button,
                            { onClick: this.open.bind(this) },
                            "Agregar Tipo de Servicio"
                        ),
                        React.createElement(PeluqueraModal, { showModal: this.state.showModal,
                            peluqueraCallback: {
                                open: this.open,
                                close: this.close.bind(this),
                                onsavepeluquera: this.onSavePeluquera.bind(this),
                                ondeletepeluquera: this.onDeleted.bind(this)
                            }
                        })
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(PeluqueraTable, {
                        filterText: this.state.filterText,
                        peluqueraData: this.state.peluqueraData,
                        peluqueraCallback: {
                            onDeleted: this.onDeleted.bind(this)
                        }
                    })
                )
            );
        }
    }]);

    return AgregarPeluquera;
}(React.Component);

var PeluqueraSearch = function (_React$Component44) {
    _inherits(PeluqueraSearch, _React$Component44);

    function PeluqueraSearch() {
        _classCallCheck(this, PeluqueraSearch);

        return _possibleConstructorReturn(this, (PeluqueraSearch.__proto__ || Object.getPrototypeOf(PeluqueraSearch)).apply(this, arguments));
    }

    _createClass(PeluqueraSearch, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Panel,
                { header: "Busqueda " },
                React.createElement(
                    "form",
                    null,
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "div",
                            { className: "col-md-2 col-sm-2" },
                            React.createElement(
                                "label",
                                null,
                                "Buscar:"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-10 col-sm-10" },
                            React.createElement("input", { type: "text", className: "form-control", id: "first_name", name: "first_name" })
                        )
                    )
                )
            );
        }
    }]);

    return PeluqueraSearch;
}(React.Component);

var PeluqueraTable = function (_React$Component45) {
    _inherits(PeluqueraTable, _React$Component45);

    function PeluqueraTable() {
        _classCallCheck(this, PeluqueraTable);

        return _possibleConstructorReturn(this, (PeluqueraTable.__proto__ || Object.getPrototypeOf(PeluqueraTable)).apply(this, arguments));
    }

    _createClass(PeluqueraTable, [{
        key: "render",
        value: function render() {
            var _this65 = this;

            var filteredMaster = this.props.peluqueraData.filter(function (master) {
                return master.name.indexOf(_this65.props.filterText) !== -1;
            });

            return React.createElement(
                Panel,
                { header: "Listado de Tipo de Servicio" },
                React.createElement(
                    Table,
                    { striped: true, bordered: true, condensed: true, hover: true },
                    React.createElement(
                        "thead",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                null,
                                "ID"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Fecha"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Nombre"
                            ),
                            React.createElement(
                                "th",
                                null,
                                "Acciones"
                            )
                        )
                    ),
                    React.createElement(
                        "tbody",
                        null,
                        filteredMaster.map(function (master, index) {
                            var _React$createElement;

                            return React.createElement(PeluqueraTableBody, (_React$createElement = {
                                id: master.id, date: master.date
                            }, _defineProperty(_React$createElement, "date", master.date), _defineProperty(_React$createElement, "name", master.name), _defineProperty(_React$createElement, "peluqueraCallback", _this65.props.peluqueraCallback), _React$createElement));
                        })
                    )
                )
            );
        }
    }]);

    return PeluqueraTable;
}(React.Component);

var PeluqueraTableBody = function (_React$Component46) {
    _inherits(PeluqueraTableBody, _React$Component46);

    function PeluqueraTableBody() {
        _classCallCheck(this, PeluqueraTableBody);

        return _possibleConstructorReturn(this, (PeluqueraTableBody.__proto__ || Object.getPrototypeOf(PeluqueraTableBody)).apply(this, arguments));
    }

    _createClass(PeluqueraTableBody, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    null,
                    this.props.id
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.date
                ),
                React.createElement(
                    "td",
                    null,
                    this.props.name
                ),
                React.createElement(
                    "td",
                    null,
                    React.createElement(
                        Button,
                        { className: "btn btn-default" },
                        React.createElement("i", { className: "fa fa-edit", "aria-hidden": "true" })
                    ),
                    React.createElement(
                        Button,
                        { onClick: this.props.peluqueraCallback.onDeleted.bind(this, this.props.id) },
                        React.createElement("i", { className: "fa fa-trash", "aria-hidden": "true" })
                    )
                )
            );
        }
    }]);

    return PeluqueraTableBody;
}(React.Component);

var PeluqueraModal = function (_React$Component47) {
    _inherits(PeluqueraModal, _React$Component47);

    function PeluqueraModal() {
        _classCallCheck(this, PeluqueraModal);

        return _possibleConstructorReturn(this, (PeluqueraModal.__proto__ || Object.getPrototypeOf(PeluqueraModal)).apply(this, arguments));
    }

    _createClass(PeluqueraModal, [{
        key: "render",
        value: function render() {
            return React.createElement(
                Modal,
                { show: this.props.showModal, onHide: this.props.peluqueraCallback.close },
                React.createElement(
                    Modal.Header,
                    { closeButton: true },
                    React.createElement(
                        Modal.Title,
                        null,
                        "Agregar Tipo de Servicio"
                    )
                ),
                React.createElement(
                    Form,
                    { horizontal: true, onSubmit: this.props.peluqueraCallback.onsavepeluquera.bind(this) },
                    React.createElement(
                        Modal.Body,
                        null,
                        React.createElement(
                            FormGroup,
                            { controlId: "formHorizontalname" },
                            React.createElement(
                                Col,
                                { componentClass: ControlLabel, sm: 2 },
                                "Nombre"
                            ),
                            React.createElement(
                                Col,
                                { sm: 10 },
                                React.createElement(FormControl, { type: "text", name: "name", placeholder: "Nombre" })
                            )
                        )
                    ),
                    React.createElement(
                        Modal.Footer,
                        null,
                        React.createElement(
                            Button,
                            { type: "submit", pullRight: true },
                            "Save"
                        )
                    )
                )
            );
        }
    }]);

    return PeluqueraModal;
}(React.Component);

var Registration2 = function (_React$Component48) {
    _inherits(Registration2, _React$Component48);

    function Registration2() {
        _classCallCheck(this, Registration2);

        return _possibleConstructorReturn(this, (Registration2.__proto__ || Object.getPrototypeOf(Registration2)).apply(this, arguments));
    }

    _createClass(Registration2, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "container" },
                React.createElement(
                    "div",
                    { className: "row vertical-offset-100" },
                    React.createElement(
                        "div",
                        { className: "col-md-4 col-md-offset-4" },
                        React.createElement(
                            "div",
                            { className: "panel panel-default" },
                            React.createElement(
                                "div",
                                { className: "panel-heading" },
                                React.createElement(
                                    "h3",
                                    { className: "panel-title" },
                                    "Please sign up"
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "panel-body" },
                                React.createElement(
                                    "form",
                                    { onSubmit: this.props.setregistration.bind(this) },
                                    React.createElement(
                                        "fieldset",
                                        null,
                                        React.createElement(
                                            "div",
                                            { className: "form-group" },
                                            React.createElement("input", { className: "form-control", placeholder: "E-mail", name: "email", type: "text" })
                                        ),
                                        React.createElement(
                                            "div",
                                            { className: "form-group" },
                                            React.createElement("input", { className: "form-control", placeholder: "Password", name: "password", type: "password" })
                                        ),
                                        React.createElement(
                                            "button",
                                            { className: "btn btn-lg btn-success btn-block" },
                                            "Save"
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Registration2;
}(React.Component);

var Account = function (_React$Component49) {
    _inherits(Account, _React$Component49);

    function Account() {
        _classCallCheck(this, Account);

        var _this69 = _possibleConstructorReturn(this, (Account.__proto__ || Object.getPrototypeOf(Account)).call(this));

        _this69.state = {

            password: ""
        };
        return _this69;
    }

    _createClass(Account, [{
        key: "onSubmit",
        value: function onSubmit(event) {

            event.preventDefault();

            var newPassword = {
                "token": token(),
                "newpassword": this.state.password
            };
            console.log(newPassword);

            fetch(API_URL + '/resetpassword', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newPassword)
            });

            //window.location.reload();
        }
    }, {
        key: "onhandleuserinput",
        value: function onhandleuserinput(event) {
            this.setState({
                password: event.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                Panel,
                { header: "Reset Password" },
                React.createElement(
                    "form",
                    { onSubmit: this.onSubmit.bind(this) },
                    React.createElement(
                        "div",
                        { className: "form-group" },
                        React.createElement(
                            "div",
                            { className: "col-md-2 col-sm-2" },
                            React.createElement(
                                "label",
                                null,
                                "Password:"
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-10 col-sm-10" },
                            React.createElement("input", { onChange: this.onhandleuserinput.bind(this), type: "password", className: "form-control", id: "first_name", name: "first_name" }),
                            React.createElement("br", null),
                            React.createElement(
                                "button",
                                { className: "btn btn-lg btn-success btn-block" },
                                "Reset"
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Account;
}(React.Component);

var Profile = function (_React$Component50) {
    _inherits(Profile, _React$Component50);

    function Profile() {
        _classCallCheck(this, Profile);

        var _this70 = _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).call(this));

        _this70.state = {

            masterAPI: [],
            parameter: '',
            activePanel: "overview"
        };
        return _this70;
    }

    _createClass(Profile, [{
        key: "componentDidMount",
        value: function componentDidMount() {

            this.setState({

                parameter: this.props.params.userid
            });
        }
    }, {
        key: "onClicked",
        value: function onClicked(event) {

            this.setState({

                activePanel: event.target.value
            });
        }
    }, {
        key: "render",
        value: function render() {

            var activeRenderPanel = void 0;

            var overview = React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Overview"
                ),
                React.createElement(
                    "p",
                    null,
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                )
            );

            var account = React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Account Setting"
                ),
                React.createElement(
                    "p",
                    null,
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                )
            );

            var tasks = React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Tasks"
                ),
                React.createElement(
                    "p",
                    null,
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                )
            );

            var help = React.createElement(
                "div",
                null,
                React.createElement(
                    "h1",
                    null,
                    "Help"
                ),
                React.createElement(
                    "p",
                    null,
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                )
            );

            if (this.state.activePanel == "overview") {
                activeRenderPanel = overview;
            } else if (this.state.activePanel == "accountsetting") {
                activeRenderPanel = account;
            } else if (this.state.activePanel == "tasks") {
                activeRenderPanel = tasks;
            } else {
                activeRenderPanel = help;
            }

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Col,
                        { md: 4 },
                        React.createElement(
                            "h1",
                            null,
                            this.state.parameter
                        ),
                        React.createElement(
                            Panel,
                            null,
                            React.createElement(
                                "div",
                                { className: "card" },
                                React.createElement("img", { src: "http://localhost:8084/img_avatar.png", alt: "Avatar", style: { "width": "100%" } }),
                                React.createElement(
                                    "div",
                                    { className: "container" },
                                    React.createElement(
                                        "p",
                                        null,
                                        "Architect  Engineer"
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "row" },
                                    React.createElement(
                                        "h5",
                                        { style: { 'text-align': 'center' } },
                                        "Testing"
                                    )
                                ),
                                React.createElement("br", null),
                                React.createElement(
                                    "div",
                                    { className: "row" },
                                    React.createElement(
                                        Col,
                                        { md: 6 },
                                        React.createElement(
                                            Button,
                                            { className: "btn btn-success btn-lg" },
                                            "Follow"
                                        )
                                    ),
                                    React.createElement(
                                        Col,
                                        { md: 6 },
                                        React.createElement(
                                            Button,
                                            { className: " btn btn-danger btn-lg" },
                                            "Message"
                                        )
                                    )
                                ),
                                React.createElement("br", null),
                                React.createElement(
                                    "div",
                                    { className: "row" },
                                    React.createElement(
                                        "div",
                                        { className: "list-group" },
                                        React.createElement(
                                            Button,
                                            { onClick: this.onClicked.bind(this), value: "overview", className: "list-group-item" },
                                            React.createElement("i", { className: "fa fa-home", "aria-hidden": "true" }),
                                            "\xA0\xA0Overview"
                                        ),
                                        React.createElement(
                                            Button,
                                            { onClick: this.onClicked.bind(this), value: "accountsetting", className: "list-group-item" },
                                            React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
                                            "\xA0\xA0Account Setting"
                                        ),
                                        React.createElement(
                                            Button,
                                            { onClick: this.onClicked.bind(this), value: "tasks", className: "list-group-item" },
                                            React.createElement("i", { className: "fa fa-check", "aria-hidden": "true" }),
                                            "\xA0\xA0Tasks"
                                        ),
                                        React.createElement(
                                            Button,
                                            { onClick: this.onClicked.bind(this), value: "help", className: "list-group-item" },
                                            React.createElement("i", { className: "fa fa-flag", "aria-hidden": "true" }),
                                            "\xA0\xA0Help"
                                        )
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        Col,
                        { md: 8, sm: 2 },
                        activeRenderPanel
                    )
                )
            );
        }
    }]);

    return Profile;
}(React.Component);

var CardNarv = function (_React$Component51) {
    _inherits(CardNarv, _React$Component51);

    function CardNarv() {
        _classCallCheck(this, CardNarv);

        var _this71 = _possibleConstructorReturn(this, (CardNarv.__proto__ || Object.getPrototypeOf(CardNarv)).call(this));

        _this71.state = {

            orderAPI: []
        };
        return _this71;
    }

    _createClass(CardNarv, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this72 = this;

            // fetch(API_URL+'/orders/'+token(),{headers: API_HEADERS})
            // .then((response)=>response.json())
            // .then((responseData)=>{
            //     this.setState({

            //         orderAPI: responseData
            //     })
            // })
            var newItem = {

                "user": token()
            };

            fetch('https://on3eon5uoh.execute-api.us-east-1.amazonaws.com/live/-orders', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this72.setState({

                    orderAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: "onDelete",
        value: function onDelete(value) {

            var newItem = {

                "id": value
            };

            fetch(API_URL + '/removeorder', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newItem)
            }).then(function (response) {
                return response.json();
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: "checkout",
        value: function checkout(value) {
            var _this73 = this;

            var newItem = {

                "id": value
            };

            fetch('https://6fe0ukszz2.execute-api.us-east-1.amazonaws.com/live/setcheckout', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this73.setState({

                    orderAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this74 = this;

            var sum = 0;

            if (this.state.orderAPI[0]) {
                for (var x = 0; x < this.state.orderAPI.length; x++) {
                    sum += parseInt(this.state.orderAPI[x].project);
                }
            }

            return React.createElement(
                Row,
                null,
                React.createElement(Col, { md: 2 }),
                React.createElement(
                    Col,
                    { md: 10 },
                    React.createElement(
                        "h4",
                        null,
                        "Cart"
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    Col,
                    { md: 12 },
                    React.createElement(
                        Table,
                        null,
                        React.createElement(
                            "tbody",
                            null,
                            this.state.orderAPI.map(function (order) {
                                return React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "td",
                                        { colSpan: "3", style: { 'text-decoration': 'none !important', 'text-align': 'center', 'width': '100%' } },
                                        order.description
                                    ),
                                    React.createElement(
                                        "td",
                                        { colSpan: "2" },
                                        "qty: ",
                                        parseInt(order.quantity)
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        "US$",
                                        parseInt(order.project).toFixed(2)
                                    ),
                                    React.createElement(
                                        "td",
                                        { style: { 'text-align': 'center', 'font-size': '18px' } },
                                        React.createElement("i", { onClick: _this74.onDelete.bind(_this74, order.id), className: "fa fa-trash", "aria-hidden": "true" })
                                    )
                                );
                            }),
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "Discount:"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "$",
                                    (sum * 5 / 100).toFixed(2)
                                )
                            ),
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "Subtotal:"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "$",
                                    (sum - sum * 5 / 100).toFixed(2)
                                )
                            ),
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "\xA0\xA0\xA0\xA0\xA0\xA0"
                                ),
                                React.createElement(
                                    "td",
                                    { style: { 'font-weight': 'bold', 'font-size': '20px' } },
                                    "Total:"
                                ),
                                React.createElement(
                                    "td",
                                    { style: { 'font-weight': 'bold', 'font-size': '20px' } },
                                    "$",
                                    sum.toFixed(2)
                                )
                            ),
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    { colSpan: "7", style: { 'text-align': 'center', 'width': '100%' } },
                                    React.createElement(
                                        Button,
                                        { onClick: this.checkout.bind(this, "hello"), style: { 'width': '100%' }, variant: "outline-success" },
                                        "Proceed to Checkout \xA0 ",
                                        React.createElement("i", { className: "fa fa-arrow-right", "aria-hidden": "true" })
                                    )
                                )
                            ),
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    { colSpan: "7", style: { 'text-align': 'center', 'width': '100%' } },
                                    React.createElement(
                                        Link,
                                        { to: '/upload' },
                                        React.createElement(
                                            Button,
                                            { style: { 'width': '100%' }, variant: "outline-success" },
                                            "Upload \xA0 ",
                                            React.createElement("i", { className: "fa fa-arrow-up", "aria-hidden": "true" })
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return CardNarv;
}(React.Component);

var Order = function (_React$Component52) {
    _inherits(Order, _React$Component52);

    function Order() {
        _classCallCheck(this, Order);

        var _this75 = _possibleConstructorReturn(this, (Order.__proto__ || Object.getPrototypeOf(Order)).call(this));

        _this75.state = {

            orderAPI: []
        };
        return _this75;
    }

    _createClass(Order, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this76 = this;

            // fetch(API_URL+'/orders/'+token(),{headers: API_HEADERS})
            // .then((response)=>response.json())
            // .then((responseData)=>{
            //     this.setState({

            //         orderAPI: responseData
            //     })
            // })
            var newItem = {

                "user": token()
            };
            fetch(API_URL + '/orders', {

                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newItem)
            }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this76.setState({

                    orderAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });
        }
    }, {
        key: "render",
        value: function render() {

            return React.createElement(
                Table,
                { striped: true, bordered: true, condensed: true, hover: true },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            "Username"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Status"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Quantity"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "Address"
                        )
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    this.state.orderAPI.map(function (order) {
                        return React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                null,
                                order.username
                            ),
                            React.createElement(
                                "td",
                                null,
                                'Pending'
                            ),
                            React.createElement(
                                "td",
                                null,
                                order.quantity
                            ),
                            React.createElement(
                                "td",
                                null,
                                order.address
                            )
                        );
                    })
                )
            );
        }
    }]);

    return Order;
}(React.Component);

var Upload = function (_React$Component53) {
    _inherits(Upload, _React$Component53);

    function Upload() {
        _classCallCheck(this, Upload);

        var _this77 = _possibleConstructorReturn(this, (Upload.__proto__ || Object.getPrototypeOf(Upload)).call(this));

        _this77.state = {

            orderAPI: [],
            showModal: false,
            files: [],
            file: '',
            compare: [],
            compare2: [],
            compare3: [],
            compare4: [],
            targetFieldData: ""
        };
        return _this77;
    }

    _createClass(Upload, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this78 = this;

            // fetch(API_URL+'/orders/'+token(),{headers: API_HEADERS})
            // .then((response)=>response.json())
            // .then((responseData)=>{
            //     this.setState({

            //         orderAPI: responseData
            //     })
            // })
            var newItem = {

                "user": token()
                // fetch(API_URL+'/orders', {        

                //     method: 'post',
                //     headers: API_HEADERS,
                //     body: JSON.stringify(newItem)
                // })
                // .then((response)=>response.json())
                // .then((responseData)=>{
                //     this.setState({

                //         orderAPI: responseData
                //     })
                // })
                // .catch((error)=>{
                //     console.log('Error fetching and parsing data', error);
                // })
            };fetch('http://localhost:8080/getstep', { headers: API_HEADERS }).then(function (response) {
                return response.json();
            }).then(function (responseData) {
                _this78.setState({

                    orderAPI: responseData
                });
            }).catch(function (error) {
                console.log('Error fetching and parsing data', error);
            });

            var params = {
                Bucket: albumBucketName,
                MaxKeys: 100
            };

            var params3 = {
                Bucket: albumBucketName3,
                MaxKeys: 100
            };

            s3.listObjects(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    _this78.setState({
                        compare: data
                    });
                }
            });
            anotherS3.listObjects(params3, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {

                    _this78.setState({
                        compare3: data

                    });
                }
            });
        }
    }, {
        key: "onClose",
        value: function onClose() {
            this.setState({

                showModal: false
            });
        }
    }, {
        key: "onOpen",
        value: function onOpen() {

            this.setState({

                showModal: true
            });
        }
    }, {
        key: "onsavedetail",
        value: function onsavedetail(event) {

            event.preventDefault();

            this.onClose();
        }
    }, {
        key: "fileSelectedHandler",
        value: function fileSelectedHandler(e) {

            var files = e.target.files;

            if (!files.length) {
                return alert("Please choose a file to upload first.");
            }

            var file = files[0];

            var fileName = file.name;

            var photoKey = "" + fileName;

            var upload = new AWS.S3.ManagedUpload({
                params: {
                    Bucket: albumBucketName,
                    Key: photoKey,
                    Body: file,
                    ACL: "public-read"
                }
            });

            var promise = upload.promise();

            promise.then(function (data) {
                alert("Successfully uploaded photo.");
            }, function (err) {
                // return alert("There was an error uploading your photo: ", err.message);
                console.log("There was an error uploading your photo: ", err.message);
            });
        }
    }, {
        key: "handleFile",
        value: function handleFile(file) {
            this.setState({
                file: file
            });
        }
    }, {
        key: "onProcess",
        value: function onProcess(event) {
            var _this79 = this;

            event.preventDefault();

            var targetField = event.target.development.value;

            // console.log(targetField)

            this.setState({
                targetFieldData: targetField
            });

            var today = moment(new Date()).format('DD-MM-YYYY');

            var item = {

                "id": Date.now(),
                "date": today,
                "items": []
            };

            var compareData = [];

            var params = {
                Bucket: albumBucketName3,
                MaxKeys: 100
            };

            anotherS3.listObjects(params, function (err, data) {
                if (err) {
                    console.log(err, err.stack);
                } else {
                    compareData = data;
                }
            });

            setTimeout(function () {

                compareData.Contents.map(function (compare) {
                    return item.items.push({
                        "SourceImage": compare.Key,
                        "TargetImage": targetField,
                        "BucketSourceImage": albumBucketName3,
                        "BucketTargetImage": albumBucketName
                        // "BucketTargetImage": "rekognition-video-console-demo-iad-352250014224-1vio7fvwvq5qve"                            
                    });
                });

                fetch('https://hb4ty6ype0.execute-api.us-east-1.amazonaws.com/live/setcomparemw', {

                    method: 'post',
                    headers: API_HEADERS,
                    body: JSON.stringify(item)
                }).then(function (response) {
                    return response.json();
                }).then(function (response) {

                    // console.log(response)
                    _this79.setState({
                        compare4: response
                    });
                }).catch(function (error) {
                    console.log('Error fetching and parsing data', error);
                });

                //console.log(item)

            }, 3000);
        }
    }, {
        key: "render",
        value: function render() {

            var homeOne = this.state.orderAPI;

            var result = homeOne.filter(function (master) {
                return master.token == token();
            });

            console.log(result);

            var item = [];
            var item3 = [];
            var item4 = [];
            var filteredItem4 = [];

            if (this.state.compare.Contents) {

                item3 = this.state.compare.Contents;
            }

            if (this.state.compare3.Contents) {

                item = this.state.compare3.Contents;
            }

            if (this.state.compare4) {

                item4 = this.state.compare4;

                // for(var x=0;x<this.state.compare4.length;x++){

                //     var yTemp = this.state.compare4[x].FaceMatches

                //     for(var y=0;y<yTemp.length;y++){

                //         if( parseInt(yTemp[y].Similarity)>70){
                //             console.log(yTemp[y])

                //         }
                //     }

                // }

                // this.state.compare4.filter(
                //     (master)=> console.log(master.Similarity) 
                // )

                // item4 = this.state.compare4.filter(
                //     (master)=> master.FaceMatches.map(
                //         (match) => parseInt(match.Similarity) >= 70
                //         // (match) => console.log( parseInt(match.Similarity)) 
                //     )
                // )
                // filteredItem4 = this.state.compare4.map(
                //     (master)=> master.FaceMatches.filter(
                //         (match) => parseInt(match.Similarity) >= 70
                //     )
                // )

                console.log(item4);
            }

            // item4.map(
            //     (match)=> match.FaceMatches.map(
            //         (faces)=> console.log(faces)
            //     )
            // )

            if (filteredItem4.length > 0) {

                // console.log(filteredItem4)
            }

            console.log(result);

            return React.createElement(
                Grid,
                null,
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        "h1",
                        { style: { 'color': '#cd6607' } },
                        "AMAZON AWS"
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Button,
                        { className: "pull-right", onClick: this.onOpen.bind(this), variant: "outline-success" },
                        "Upload \xA0 ",
                        React.createElement("i", { className: "fa fa-arrow-up", "aria-hidden": "true" })
                    ),
                    React.createElement(
                        Modal,
                        { show: this.state.showModal, onHide: this.onClose.bind(this) },
                        React.createElement(
                            Modal.Header,
                            { closeButton: true },
                            React.createElement(
                                Modal.Title,
                                null,
                                "Modal heading"
                            )
                        ),
                        React.createElement(
                            Modal.Body,
                            null,
                            React.createElement(
                                Form,
                                { onSubmit: this.onsavedetail.bind(this) },
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        FormGroup,
                                        null,
                                        React.createElement(
                                            Col,
                                            { componentClass: ControlLabel, md: 4, sm: 2 },
                                            "Description"
                                        ),
                                        React.createElement(
                                            Col,
                                            { md: 8, sm: 6 },
                                            React.createElement(FormControl, { type: "text", name: "description", placeholder: "Description" })
                                        )
                                    )
                                ),
                                React.createElement("br", null),
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        FormGroup,
                                        null,
                                        React.createElement(
                                            Col,
                                            { componentClass: ControlLabel, md: 4, sm: 2 },
                                            "Price"
                                        ),
                                        React.createElement(
                                            Col,
                                            { md: 8, sm: 6 },
                                            React.createElement(FormControl, { type: "text", name: "price", placeholder: "Price", disabled: true })
                                        )
                                    )
                                ),
                                React.createElement("br", null),
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        FormGroup,
                                        null,
                                        React.createElement(
                                            Col,
                                            { componentClass: ControlLabel, md: 4, sm: 2 },
                                            "Image"
                                        ),
                                        React.createElement(
                                            Col,
                                            { md: 8, sm: 6 },
                                            React.createElement("input", { type: "file", onChange: this.fileSelectedHandler })
                                        )
                                    )
                                ),
                                React.createElement("br", null),
                                React.createElement(
                                    Row,
                                    null,
                                    React.createElement(
                                        Col,
                                        { className: "col-md-offset-10" },
                                        React.createElement(
                                            Button,
                                            { type: "submit" },
                                            "Save"
                                        )
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement("br", null),
                React.createElement(
                    Row,
                    null,
                    React.createElement(
                        Table,
                        { striped: true, bordered: true, condensed: true, hover: true },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "td",
                                    null,
                                    "Red Light"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "Date"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "Steps"
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    "Distance"
                                )
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            result.map(function (order) {
                                return React.createElement(
                                    "tr",
                                    null,
                                    React.createElement(
                                        "td",
                                        null,
                                        order.redlight
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        order.date
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        order.step
                                    ),
                                    React.createElement(
                                        "td",
                                        null,
                                        order.distance
                                    )
                                );
                            })
                        )
                    )
                )
            );
        }
    }]);

    return Upload;
}(React.Component);

ReactDOM.render(React.createElement(
    Router,
    { history: browserHistory },
    React.createElement(
        Route,
        { path: "/", component: App },
        React.createElement(IndexRedirect, { to: "master" }),
        React.createElement(Route, { path: "login", component: Login }),
        React.createElement(Route, { path: "registration", component: Registration }),
        React.createElement(Route, { path: "order", component: Order }),
        React.createElement(Route, { path: "upload", component: Upload }),
        React.createElement(Route, { path: "profile/:userid", component: Profile }),
        React.createElement(Route, { path: "account", component: Account }),
        React.createElement(Route, { path: "agregar_tiposervicio", component: AgregarPeluquera }),
        React.createElement(Route, { path: "tripartials", component: TriPartials }),
        React.createElement(Route, { path: "bipartials", component: BiPartials }),
        React.createElement(Route, { path: "partials", component: Partials }),
        React.createElement(Route, { path: "about", component: About }),
        React.createElement(Route, { path: "repos/:repo_name", component: Repos }),
        React.createElement(Route, { path: "updatedetail/:detailid", component: DetailModalUpdate }),
        React.createElement(Route, { path: "actions/:actionid", component: Actions }),
        React.createElement(Route, { path: "detail", component: Detail }),
        React.createElement(Route, { path: "master", component: Master })
    )
), document.getElementById('contents'));