const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const IndexRedirect = ReactRouter.IndexRedirect;
const Link = ReactRouter.Link;
const browserHistory = ReactRouter.browserHistory ;

const Button = ReactBootstrap.Button;
const Modal = ReactBootstrap.Modal;
const Nav = ReactBootstrap.Nav;
const Navbar = ReactBootstrap.Navbar;
const NavItem = ReactBootstrap.NavItem;
const NavDropdown = ReactBootstrap.NavDropdown;
const MenuItem = ReactBootstrap.MenuItem;

const Grid = ReactBootstrap.Grid;
const Row = ReactBootstrap.Row;
const Panel = ReactBootstrap.Panel;

const Pagination = ReactBootstrap.Pagination;
const Form = ReactBootstrap.Form;
const Radio = ReactBootstrap.Radio;
const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;
const ListGroup = ReactBootstrap.ListGroup;
const Table = ReactBootstrap.Table;

var albumBucketName = "webpaa-deployments-mobilehub-2128298286";
var albumBucketName3 = "webpaa-deployments-mobilehub-209995345";
var bucketRegion = "us-east-1";
var IdentityPoolId = "us-east-1:3dd5b3b8-326c-4be6-9f32-67943932637a";

// var socket = io.connect();

const socket = io("localhost:8081");

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
const Autosuggest = Autosuggest;

const moment = moment;

var global = 59
var global2 = 59
var redLight = true
var yellowLight = false
var greenLight = false

// const API_URL = 'http://localhost:8084';
const API_URL = 'http://localhost:8084'; 

const API_HEADERS = {

    'Content-Type':'application/json'
        
}

const TOKEN_KEY = "token";

const languageActive = true;

function token(){
    
       return localStorage.getItem(TOKEN_KEY);
}

class App extends React.Component{

  constructor(){

      super();
      this.state = {

          cookies: false,
          visibility: false,
          cssActiveLogin: "active",
          cssActiveRegistraction: "inactive",
          searchText: ""
      }
  }

  componentDidMount(){

      fetch(API_URL+'/cookies',{headers: API_HEADERS})
      .then((response)=>response.json())
      .then((responseData)=>{
          this.setState({

              cookies: responseData
          })
      })
      .catch((error)=>{
          console.log('Error fetching and parsing data', error);
      })




  }

  setCookie(event){

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

    localStorage.setItem(TOKEN_KEY, "1234")

  }

    isAuthenticated(){

        return !!localStorage.getItem(TOKEN_KEY);
    }

    setRegistration(event){

        event.preventDefault();

        let newCookie = {

            "id":"1",
            "username": event.target.email.value,
            "password": event.target.password.value
        }

        fetch(API_URL+'/register', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newCookie)
        })


        window.location.reload();

    }

    onVisibility(event){

        if(!this.state.visibility){
            
            this.setState({
                
                visibility: true,
                cssActiveRegistraction: "active",
                cssActiveLogin: "inactive"
            })
        }else{
            this.setState({
                
                visibility: false,
                cssActiveRegistraction: "inactive",
                cssActiveLogin: "active",
            })
        }

    }


  onSearch(event){
      this.setState({
          searchText: event.target.value
      })
  }



  render() {

    let activeTab

    let loginTab = (

        <Login
            setcookie={this.setCookie}
            setregistration={this.setRegistration}

        />
    );
    let registrationTab = (

        <Registration
            setcookie={this.setCookie}
            setregistration={this.setRegistration}

        />
    );

    let dashboard = (

          <div>
            <Toolbar
                searchCallback={this.onSearch.bind(this)}
             />
            <div className="container">
                {this.props.children}
                {/* <Master                    
                    searchText={this.state.searchText}
                /> */}
            </div>
          </div>

    )

    if(!this.state.visibility){
        activeTab = loginTab
    }else{
        activeTab = registrationTab
    }

    // if(this.isAuthenticated()){

        return (

            <div>
                {dashboard}
            </div>
        )
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
}

class Actions extends React.Component{

    constructor(){

          super();
          this.state = {

              masterAPI: [],
              parameter: '',
              show: false
          }

    }

    componentDidMount(){

        setTimeout(() => {
            
          fetch(API_URL+'/master',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

        }, 5000);
        
        this.setState({

            // parameter: this.props.params.actionid
        });


    }

    onPrinted(){

        window.print();

        window.location.href = '/';
    }

    setPayment(event){

        event.preventDefault();

        let currentTarget = ''

        // console.log(event.target.card.value)
        // console.log(event.target.groupOptions.value)

        let newMaster = {
            
            // "id": this.props.params.actionid,
            "payment": event.target.groupOptions.value

        }

        fetch(API_URL+'/payment', {
            
                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newMaster)
        })

        window.location.href = '/';
        
        // console.log(newMaster)

    }

    onClicked(){

        this.setState({

            show: true
        })

    }

    onClose(){

        this.setState({
            show: false
        })
    }

    onsavedetail(event){

        event.preventDefault();

        // console.log(event.target.firstname.value);

        // console.log('saved!');

        let newItem = {

            "username" : token(),
            "quantity" : event.target.quantity.value,
            "address" : event.target.address.value
        }

        console.log(newItem)

        fetch(API_URL+'/addorder', {
            
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newItem)
        })

        this.setState({

            show: false
        })
    }

    render(){

        let filteredTable = this.state.masterAPI.filter(

            (master) => master.id == this.state.parameter
        )

        let date
        let name
        let items = []
        let image

        if(filteredTable[0]){

            date = filteredTable[0].date            
            name = filteredTable[0].name
            items = filteredTable[0].item
            image = filteredTable[0].image
            
        }

        let loading = (
            
            <div style={{'text-align':'center'}}>
                {/* <img src="http://locahost:8084/cargando.gif"  alt="Avatar"/>                                     */}
                <img src="http://localhost:8084/cargando.gif"  alt="Avatar"/>                                    
            </div>
        );

        let bodyToLoad = (
                <div className="list-group">                                
                        <div className="list-group-item">
                                    <Row>
                                        <Col md={3}>
                                            <p>Name</p>
                                        </Col>
                                        <Col md={3}>
                                            <p>Time</p>
                                        </Col>
                                        <Col md={3}>
                                            <p>Developer</p>
                                        </Col>
                                        <Col md={2}>
                                            <p>Sign</p>
                                        </Col>
                                        <Col md={1}>
                                            <p>Acceptance</p>
                                        </Col>
                                    </Row>
                                </div>                                         
                        {items.map(
                            (master) =>                                        
                                <div className="list-group-item">
                                    <Row>
                                        <Col md={3}>
                                            <Link to={'/profile/'+master.user}><p>{master.user}</p></Link>
                                        </Col>
                                        <Col md={3}>
                                            <p>{master.quantity}</p>
                                        </Col>
                                        <Col md={3}>
                                            <p>{master.project}</p>
                                        </Col>
                                        <Col md={2}>
                                            <p>Cras justo odio</p>
                                        </Col>
                                        <Col md={1}>
                                            <Button onClick={this.onClicked.bind(this)} className="btn btn-success btn-lg"><i className="fa fa-check" aria-hidden="true"></i></Button>
                                            <Modal show={this.state.show} onHide={this.onClose.bind(this)}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Modal heading</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>                                                                                                                                
                                                        <Form onSubmit={this.onsavedetail.bind(this)}>    
                                                        <Row>                                                                            
                                                                <FormGroup>
                                                                    <Col componentClass={ControlLabel} md={4} sm={2}>
                                                                        Quantity
                                                                    </Col>                              
                                                                    <Col md={8} sm={6}>
                                                                        <FormControl type="text" name="quantity" value={master.quantity} placeholder="Quantity" required />
                                                                    </Col>
                                                                </FormGroup>
                                                            </Row>
                                                            <br/>                                                                
                                                            <Row>                                                                            
                                                                <FormGroup>
                                                                    <Col componentClass={ControlLabel} md={4} sm={2}>
                                                                        Name
                                                                    </Col>                              
                                                                    <Col md={8} sm={6}>
                                                                        <FormControl type="text" name="firstname" value={master.user} placeholder="Name" required />
                                                                    </Col>
                                                                </FormGroup>
                                                            </Row>
                                                            <br/>
                                                            <Row>                                                                            
                                                                <FormGroup>
                                                                    <Col componentClass={ControlLabel} md={4} sm={2}>
                                                                        Address
                                                                    </Col>                              
                                                                    <Col md={8} sm={6}>
                                                                        <FormControl type="text" name="address" value={master.quantity} placeholder="Address" required />
                                                                    </Col>
                                                                </FormGroup>
                                                            </Row>
                                                            <br/>
                                                            <Row>                                                                            
                                                                <Col className="col-md-offset-10">
                                                                    <Button type="submit" >Save</Button>
                                                                </Col>
                                                            </Row>
                                                        </Form>
                                                </Modal.Body>
                                            </Modal>
                                        </Col>
                                    </Row>
                                </div>                                         
                        )}    
                    </div>
        );

        let bodyToLoadIMG = (

            <Panel header={date}>
                <div className="card">
                    <img src={"http://localhost:8084/executed/"+image}  alt="Avatar" style={{"width":"100%"}}/>
                    {/* <img src="http://localhost:8084/img_avatar.png"  alt="Avatar" style={{"width":"100%"}}/>                                     */}
                    <div className="container">
                        <h4><b>{name}</b></h4>                                         
                        <p>Architect  Engineer</p> 
                    </div> 
                                                
                </div>
            </Panel>       
        );

        let activeTable 
            
        if(this.state.masterAPI.length==0){

            activeTable = loading
        }else{
            activeTable = bodyToLoadIMG
        }

        return(
            <Row>                            
                <Col item>                
                       {activeTable}                        
                </Col>            
            </Row>                                        
        );
    }
}

class ActionsTable extends React.Component{


    render(){

let today = moment(new Date()).format('DD-MM-YYYY');

        return(

            <div  id="printcss " style={{'margin-left':'10px'}}>
                <Grid>
                    <Row>
                        <Col xs={12}>
                            {/* <img src="/logoprint.png"/> */}
                            <h3>Orden de Servicio </h3>
                            <h4>Supreme - Lavanderia </h4>
                            <h5>Av. Romulo Betancourt No. 1516 esq. 12 de Julio</h5>
                            <h5>Plaza Thalys, Bella Vista, Sto. Dgo.</h5>
                            <h4>Tel.: 829-594-8430</h4>
                            <h5>Horario Lunes a Viernes 07:30am a 7:00pm</h5>
                            <h5>Sabado 08:30am a 5:00pm</h5>
                            <h5>RNC: 131576958</h5>
                            <h5 className="col-xs-offset-7">Fecha: {today}</h5>
                            <br/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Table striped bordered condensed hover
style={{'position':'relative','width':'55%', 'margin':'0'}}>
                                <thead>
                                  <tr>
                                    <th style={{'width':'15px',
'font-size':'25px', 'border-spacing':'0 30px'}}>#</th>
                                    <th style={{'width':'15px',
'font-size':'25px'}}>Articulo</th>
                                    <th style={{'width':'15px',
'font-size':'25px'}}>Precio</th>
                                    <th style={{'width':'15px',
'font-size':'25px'}}>Servicio</th>
                                  </tr>
                                </thead>
                                    {this.props.masterAPI.map(
                                        (master,index) => <ActionsTableBody
                                                                 key={index}
                                                                 index={index}
                                                                 id={master.id}

item={master.item}
                                                          />
                                    )}
                                <tfoot>
                                    <ActionsTableBodyFooter
                                                 parameter =
{this.props.parameter}
                                                 masterAPI =
{this.props.masterAPI}
                                    />
                                </tfoot>

                              </Table>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

class ActionsTableBodyFooter extends React.Component{

    render(){

        let nextState = this.props.masterAPI;

        let zoom = 0;

        if(nextState[0]){

            zoom = nextState[0].project;
        }

        return(
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
                <td style={{'width':'15px', 'font-size':'20px'}}>Total</td>
                <td style={{'width':'15px',
'font-size':'20px'}}>RD${zoom}.00</td>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </tr>
        );
    }

}

class ActionsTableBody extends React.Component{

    render(){

        return(

                <tbody>
                {this.props.item.map(
                    (master, index) =>  <ActionsTableBodyDetail
                                                key={index}
                                                index={index+1}
                                                id={master.id}
                                                name={master.firstname}
                                                item={master.item}
                                                development={master.development}
                                                project={master.project}
                                        />
                )}
               </tbody>
        );
    }
}

class ActionsTableBodyDetail extends React.Component{

    render(){

        return(
            <tr>
                    <td style={{'font-size':'20px'}}>&nbsp;</td>
                    <td style={{'font-size':'20px'}}>{this.props.item}</td>
                    <td
style={{'font-size':'20px'}}>{this.props.project}.00</td>
                    <td
style={{'font-size':'20px'}}>{this.props.development}</td>
            </tr>
        );
    }
}

class Login extends React.Component{

    onSubmit(event){

        event.preventDefault();

        let newCookie = {

            "id":"1",
            "username": event.target.username.value,
            "password": "1234"
        }

        fetch(API_URL+'/login', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newCookie)
        }).then(response => response.json()).then(response => {
            if(response.token!=undefined){
            localStorage.setItem(TOKEN_KEY, response.token)
            }
        })
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        });

        setTimeout(() => {
                        
            window.location.reload();
        }, 2000);

    }

    render(){

        return(
            
            <form onSubmit={this.onSubmit.bind(this)}>            
                <br/>
                <br/>
                <Row>
                    <Col md={3} sm={3} xs={3}></Col>                    
                    <Col md={6} sm={6} xs={6}>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                        <label>Nickname:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                        <input 
                                type="text"
                                className="form-control" id="username" name="username" placeholder="Type your nickname"/>
                        </div>
                    </div>
                    </Col>
                    <Col md={3} sm={3} xs={3}></Col>
                </Row>
                <Row>
                    <Col md={3} sm={3} xs={3}></Col>
                    <Col md={6} sm={6} xs={6}></Col>                    
                    <Col md={3} sm={3} xs={3}>
                        <Button type="submit">Login</Button>
                    </Col>
                    
                </Row>
          </form>

        );
    }

}

class Registration extends React.Component{

    onSubmit(event){

        event.preventDefault();

        let newCookie = {

            "id":"1",
            "username": event.target.first_name.value,
            "email": event.target.email.value,
            "password": "1234"
        }

        fetch(API_URL+'/register', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newCookie)
        })


        window.location.reload();

    }
    
    render(){

        return(
            

            <form onSubmit={this.onSubmit.bind(this)}>
                <br/>
                <br/>
                <Row>
                    <Col md={3} sm={3} xs={3}></Col>                    
                    <Col md={6} sm={6} xs={6}>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                        <label>Nickname:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                        <input 
                                type="text"                                
                                className="form-control" id="first_name" name="first_name"  placeholder="Type your nickname"/>
                        </div>
                    </div>
                    </Col>
                    <Col md={3} sm={3} xs={3}></Col>
                </Row>
                <br/>
                <Row>
                    <Col md={3} sm={3} xs={3}></Col>                    
                    <Col md={6} sm={6} xs={6}>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                        <label>Email:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                        <input 
                                type="Email"
                                className="form-control" id="email" name="email"  placeholder="Type your email address"/>
                        </div>
                    </div>
                    </Col>
                    <Col md={3} sm={3} xs={3}></Col>
                </Row>
                <Row>
                    <Col md={3} sm={3} xs={3}></Col>
                    <Col md={6} sm={6} xs={6}></Col>                    
                    <Col md={3} sm={3} xs={3}>
                        <Button type="submit">Save</Button>
                    </Col>
                    
                </Row>
            </form>                         

        );
    }
    
}

class Toolbar extends React.Component{

    constructor() {
        
        super();
        this.state = {                        
            searchText: ""
        };
    }

    componentDidMount(){

        document.body.style.backgroundImage = "none";

    }

    onClicked(){

        localStorage.removeItem(TOKEN_KEY)
        window.location.reload();
    }

    onRefreshed(){
        this.props.history.push("/detail")
        window.location.reload();
    }

    onChanged(event){                 
        
        this.props.searchCallback(event);
    }

    render(){

        let toolbarES = (

            <Navbar>
                    <div className="navbar-header">
                        <div className="navbar-brand">
                            <Link to={'/'} onClick={this.onRefreshed.bind(this)}>Info-Solutions SYS</Link>
                        </div>
                    </div>
                    <Nav>
                      <li><Link to={'/master'}>Master</Link></li>
                      <li><Link to={'/detail'}>Detail</Link></li>
                      <NavDropdown eventKey={3} title="Report" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Link to="/partials">Partials</Link></MenuItem>                            
                      </NavDropdown>
                      <NavDropdown style={{'float':'right','position':'absolute','left':'80%'}} eventKey={3} title="Perfil Usuario" id="basic-nav-dropdown">
                            <MenuItem eventKey={3.1}><Link to="/account">Cuenta de Usuario</Link></MenuItem>
                            <MenuItem eventKey={3.2}><Link onClick={this.onClicked} to="/logout">Log Out</Link></MenuItem>
                      </NavDropdown>                      
                    </Nav>
                </Navbar>
        );

        let toolbarEN = (

            <Navbar>
            
                    <div className="navbar-header" >
                        <div className="navbar-brand" style={{"height":"10%"}}>
                            <Link to={'/'} onClick={this.onRefreshed.bind(this)}><img src="http://localhost:8084/testiiiing.jpg" width="100px" height="100px" /></Link>
                        </div>
                    </div>
                    <Nav>                      
                      <li style={{"top":"40px"}}><Link to={'/master'}>Home</Link></li>                      
                      <li style={{"top":"40px"}}><Link to={'/upload'}>Finder</Link></li>                                            
                    </Nav>
                </Navbar>
        );

        if(languageActive){


            return(
                    <div>
                        <br/>
                        {toolbarEN}
                    </div>
            );
        }else{
            return(
                    <div>
                        {toolbarES}
                    </div>
            );
        }
    }

}

class About extends React.Component{

    render(){

        return(

            <h1>About</h1>
        );
    }
}

class Repos extends React.Component{

    render(){

        return(

            <h1>Repos {this.props.params.repo_name}</h1>
        );
    }
}

class Master extends React.Component{

    constructor() {

        super();
        this.state = {
            countDown: 59,
            red: true,
            yellow: false,
            green: false,
            countDownKafka: 0
        }
    }

    componentDidMount(){

        socket.on('connect', function(tradeMsg) {
            console.log("It worked");
        })

    }

    filled(params) {
        global = params   
        this.setState({
            countDown: 10
        })     
    }

    sendKey(event){

        event.preventDefault();

        window.print();
        
        console.log('test');
    }

    render(){     
        
        let semaforoRojoActive
        let semaforoAmarilloActive
        let semaforoVerdeActive

        socket.on('update', function(data){
                        
            var obj = JSON.parse(data);

            global2 = parseInt(obj.second)
            redLight = obj.redlight
            
        })

        setTimeout(() => {
            
            this.filled(global2)
        }, 500);

        let semaforoRojo = (

            <Row>
                <Col md={5}></Col>
                <Col md={3}>
                    <div style={{"height":"100px","width":"100px","border-style":"solid","border-width":"2px","border-radius":"87px", "background-color":"red", "box-shadow": "0 0 6em"}}>
                    </div>
                </Col>
                <Col md={4}></Col>
            </Row>
        )

        let semaforoAmarillo = (

            <Row>
                <Col md={5}></Col>
                <Col md={3}>
                    <div style={{"height":"100px","width":"100px","border-style":"solid","border-width":"2px","border-radius":"87px", "background-color":"yellow", "box-shadow": "0 0 6em"}}>
                    </div>
                </Col>
                <Col md={4}></Col>
            </Row>
        )

        let semaforoVerde = (

            <Row>
                <Col md={5}></Col>
                <Col md={3}>
                    <div style={{"height":"100px","width":"100px","border-style":"solid","border-width":"2px","border-radius":"87px", "background-color":"green", "box-shadow": "0 0 6em"}}>
                    </div>
                </Col>
                <Col md={4}></Col>
            </Row>
        )

        let semaforoRojoOpacity = (

            <Row>
                <Col md={5}></Col>
                <Col md={3}>
                    <div style={{"height":"100px","width":"100px","border-style":"solid","border-width":"2px","border-radius":"87px", "background-color":"red", "opacity": "0.5"}}>
                    </div>
                </Col>
                <Col md={4}></Col>
            </Row>
        )
        let semaforoAmarilloOpacity = (

            <Row>
                <Col md={5}></Col>
                <Col md={3}>
                    <div style={{"height":"100px","width":"100px","border-style":"solid","border-width":"2px","border-radius":"87px", "background-color":"yellow", "opacity": "0.5"}}>
                    </div>
                </Col>
                <Col md={4}></Col>
            </Row>
        )
        let semaforoVerdeOpacity = (

            <Row>
                <Col md={5}></Col>
                <Col md={3}>
                    <div style={{"height":"100px","width":"100px","border-style":"solid","border-width":"2px","border-radius":"87px", "background-color":"green", "opacity": "0.5"}}>
                    </div>
                </Col>
                <Col md={4}></Col>
            </Row>
        )
        
        if(redLight){

            semaforoRojoActive = semaforoRojo
            if(global>58){            

                semaforoRojoActive = semaforoRojoOpacity
                semaforoAmarilloActive = semaforoAmarillo
            }else{
            
                semaforoAmarilloActive = semaforoAmarilloOpacity

            }
            semaforoVerdeActive = semaforoVerdeOpacity

        }else{
            
            semaforoRojoActive = semaforoRojoOpacity
            semaforoAmarilloActive = semaforoAmarilloOpacity
            semaforoVerdeActive = semaforoVerde
        }

        
        if(global==0){            
                                
                if(redLight){
                    redLight=!redLight
                    yellowLight=!yellowLight
                    greenLight=!greenLight
                }else{
                    redLight=!redLight
                    yellowLight=!yellowLight
                    greenLight=!greenLight
                }
                                    
            }        

        
        return(

            <Row>

                <button className="buttonPrint" onClick={this.sendKey.bind(this)}>Test</button>

                {/* <Row>
                    <Col md={5}></Col>                        
                    <Col md={3}>
                        <h1 style={{"margin-left":"11%"}}>{global}</h1>                        
                    </Col>
                    <Col md={4}></Col>
                </Row>
                <br/>
                <Row>
                    {semaforoRojoActive}
                </Row>
                <Row>
                    {semaforoAmarilloActive}
                </Row>
                <Row>
                    {semaforoVerdeActive}
                </Row> */}
            </Row>

        );
    }
}

class MasterPagination extends React.Component{

    render(){

        return(
            <div>
                <Pagination
                  prev
                  next
                  first
                  last
                  ellipsis
                  boundaryLinks
                  bsSize="small"
                  items={5}
                  activePage={this.props.activePage}
                  onSelect={this.props.masterCallback.handleSelect}
                  />
                  <br />
            </div>
        );
    }
}

class MasterSearch extends React.Component{

    render(){

        let MasterSearchEN = (

            <div>
                <Panel header="Search Master">
                  <form>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                          <label>Search:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                          <input
onChange={this.props.masterCallback.onhandleuserinput.bind(this)}
                                 type="text"
                                 className="form-control"
id="first_name" name="first_name"/>
                        </div>
                    </div>
                  </form>
                </Panel>
            </div>
        );

        let MasterSearchES = (

            <div>
                <Panel header="Busqueda de Factura">
                  <form>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                          <label>Buscar:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                          <input
onChange={this.props.masterCallback.onhandleuserinput.bind(this)}
                                 type="text"
                                 className="form-control"
id="first_name" name="first_name"/>
                        </div>
                    </div>
                  </form>
                </Panel>
            </div>
        );

        if(languageActive){
            return(
                <div>
                    {MasterSearchEN}
                </div>
            );
        }else{
            return(
                <div>
                    {MasterSearchES}
                </div>
            );
        }
    }
}

class MasterTable extends React.Component{

    constructor(){
        
        super();
        this.state = {

            masterAPI: [],
            onShowComment: "none",
            searchData : "",
            compare: []
        }
    }

    onComment(event){

        event.preventDefault();

        if(this.state.onShowComment=="none"){
            this.setState({
                
                onShowComment: "block"
            })
        }else{
            this.setState({
                
                onShowComment: "none"
            })
        }
    }

    componentDidMount(){
        
        var params = {
            Bucket: albumBucketName,
            MaxKeys: 100
        };        
        
        s3.listObjects(params, (err, data) =>{
            if (err){
                console.log(err, err.stack);
            }else{                
                this.setState({
                    compare:data
                })
            }
        }) 
    }

    render(){

        var rows = []   
        
        var item = []
        
        let items = []
        
        if(this.state.compare.Contents){
            
            item = this.state.compare.Contents
            
        }
        
        items = item
        //console.log(item)

        for(var i=0;i<items.length;i++){            
            rows.push(
                    <Col item md={4}> 
                        <br/>
                            <Panel style={{'border-color':'#ffffff'}}>
                                    <Row>
                                        <Col md={12}>                                    
                                        {/* <Col md={11} style={{'border-color':'#ffffff !important','border-style':'solid'}} >                                     */}
                                            <Row>
                                                <Link  to={'/actions/1'}>
                                                    <img src={"https://webpaa-deployments-mobilehub-2128298286.s3.amazonaws.com/"+items[i].Key}  alt="Avatar" style={{"width":"100%","height":"100%","padding-left":"10px","padding-right":"10px"}}/>
                                                    {/* <img src={"https://webpaa-deployments-mobilehub-2128298286.s3.amazonaws.com/amazon-ceo-jeff-bezos_2.jpg"}  alt="Avatar" style={{"width":"100%","height":"100%","padding-left":"10px","padding-right":"10px"}}/> */}
                                                    {/* <img src={"http://localhost:8084/img_avatar.png"}  alt="Avatar" style={{"width":"100%","padding":"40px"}}/> */}
                                                </Link>
                                            </Row>
                                            <Row style={{'text-align':'center'}}>
                                                <h5>{items[i].Key}</h5>
                                            </Row>
                                        </Col>                                        
                                    </Row>
                            </Panel>
                    </Col>
            )
        }

        return (

            <Row>                
                {rows}
            </Row>
        );
    }

}

class MasterTableLike extends React.Component{

    render(){
        return(            
            <button className="btn btn-warning" name="like" onClick={this.props.onLike} value={'{"id":'+this.props.id+',"press":"'+this.props.isLiked+'"}'} ><i className="fa fa-shopping-cart" aria-hidden="true"></i> {'Add To Cart'}</button>
        );
    }
}

class MasterTableComment extends React.Component{
    render(){
        return(            
            <button className="btn btn-link" onClick={this.props.onShow} name="comment" value={'{"id":'+this.props.id+',"press":"comments"}'}><i className="fa fa-comments" aria-hidden="true"></i> Comments</button>
        );
    }
}

class MasterTableCommentDisplay extends React.Component{

    render(){
        return(                        
            <div style={{'display':this.props.onShowComment}} className="card">
                    <Row>                                            
                        <Col md={1} sm={1} xs={1}></Col>
                        <Col md={1} sm={6} xs={6}>
                            <br/>
                            {/* <img src={"http://localhost:8084/"+"img_avatar.png"}  alt="Avatar" style={{"width":"100%","padding-left":"10px","padding-right":"10px"}}/> */}
                            <img src={"http://localhost:8084/"+"img_avatar.png"}  alt="Avatar" style={{"width":"100%","padding-left":"10px","padding-right":"10px"}}/>
                        </Col>                                        
                        <Col md={8} sm={6} xs={6}>
                            <br/>
                            <p>
                                {this.props.text}
                            </p>
                        </Col>                          
                        <Col md={2} sm={1} xs={1}></Col>              
                    </Row>
                                  
            </div>            
        );
    }
}

class MasterTableCommentField extends React.Component{

    render(){
        return(            
            <form onSubmit={this.props.onComment} >                
                <div style={{'display':this.props.onShowComment}} className="card">                        
                        <Row>                                                                    
                            <Col md={1} sm={6} xs={6}>                                
                                <img src={"http://localhost:8084/"+"img_avatar.png"}  alt="Avatar" style={{"width":"100%","padding-left":"10px","padding-right":"10px"}}/>
                            </Col>
                            <FormGroup controlId="formHorizontalName">                                        
                                <Col md={2} sm={6}>
                                    <FormControl value={this.props.id} type="text" name="id" style={{'display':'none'}} required />
                                </Col>
                                <Col md={8} sm={6}>
                                    <FormControl type="text" name="firstname" placeholder="Type a Comment" required />
                                </Col>
                                <Col md={2} sm={6}></Col>
                            </FormGroup>                                        
                        </Row>          
                        <div className="row" >
                            <Col md={10} sm={10} xs={10} ></Col>
                            <Col md={1} sm={10} xs={10} >                                            
                                <button type="submit" className="btn btn-primary">Comment</button>
                            </Col>
                            <Col md={1} sm={10} xs={10} ></Col>
                        </div>
                </div>
            </form>
        );
    }
}

class MasterTableBody extends React.Component{

    onClick(){

        fetch(API_URL+'/master',{headers: API_HEADERS})
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({

                masterAPI: responseData
            })
        })
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        })

        console.log('clicked!');
    } 

    render(){

        return(
                <tr>
                    <td>{this.props.id}</td>
                    <td>{this.props.date}</td>
                    <td>{this.props.name}</td>
                    <td>{this.props.items}</td>
                    <td>{this.props.status}</td>
                    <td>
                        {/* <Link className="btn btn-default" to={'/actions/'+this.props.id}><i className="fa fa-eye" aria-hidden="true"></i></Link>{' '}                                                 */}
                        <a target="_blank" onClick={this.onClick} className="btn btn-default" href={"http://localhost:3000/"+this.props.id}><i className="fa fa-eye" aria-hidden="true"></i></a>{' '}
                        {/* <a target="_blank" onClick={this.onClick} className="btn btn-default" href={"http://localhost:3000/"+this.props.id}><i className="fa fa-eye" aria-hidden="true"></i></a>{' '} */}
                        <Link className="btn btn-default" to={'/actions/'+this.props.id}><i className="fa fa-dollar" aria-hidden="true"></i></Link>{' '}                                                
                        <Button onClick={this.props.masterCallback.ondeletemaster.bind(this,this.props.id)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                    </td>
                  </tr>
        );
    }
}

class MasterModalButton extends React.Component{

    render(){

        let MasterModalButtonEN = (


                <Col md={12}>
                    <Button style={{'margin-left':'70%'}}
bsStyle={'default'}
onClick={this.props.masterCallback.onsavemaster.bind(this)}>Save</Button>
                </Col>

        );

        let MasterModalButtonES = (


                <Col md={12}>
                    <Button style={{'margin-left':'70%'}}
bsStyle={'default'}
onClick={this.props.masterCallback.onsavemaster.bind(this)}>Guardar</Button>
                </Col>

        );

        let MasterModalButtonActive;

        if(languageActive){

            MasterModalButtonActive=MasterModalButtonEN
        }else{

            MasterModalButtonActive=MasterModalButtonEN
        }


        return(
            <Row>
                {MasterModalButtonActive}
            </Row>

        );
    }
}

class MasterModal extends React.Component{



    render(){

        let MasterModalEN = (

            <Modal.Title>{this.props.idSelected}</Modal.Title>
        );

        let MasterModalES = (

            <Modal.Title>Agregar Factura</Modal.Title>
        );

        let MasterModalActive;

        if(languageActive){

            MasterModalActive=MasterModalEN
        }else{

            MasterModalActive=MasterModalES
        }


        return(

            <div >
                <Modal show={this.props.showModal}  onHide={this.props.close} >
                  <Modal.Header closeButton>
                    {MasterModalActive}
                  </Modal.Header>
                  <Modal.Body>
                        {/* <MasterModalField 
                            idSelected={this.props.idSelected}
                            masterCallback={this.props.masterCallback}
                        /> */}
                        <br/>
                        {/* <MasterModalTable masterDetail={this.props.masterDetail} masterCallback={this.props.masterCallback} */}
                        {/* /> */}
                        {/* <MasterModalButton masterCallback={this.props.masterCallback} */}
                        {/* /> */}
                  </Modal.Body>
                </Modal>
              </div>
        );
    }
}

const languages = [
  {
    name: 'TRAJES 2 PIEZAS',
    year: 1972
  },
  {
    name: 'SACOS',
    year: 2000
  },
  {
    name: 'PANTALONES',
    year: 1983
  },
  {
    name: 'CAMISAS',
    year: 2007
  },
  {
    name: 'POLO SHIRT',
    year: 2012
  },
  {
    name: 'CHACABANA',
    year: 2009
  },
  {
    name: 'VESTIDO DAMAS',
    year: 1990
  },
  {
    name: 'FALDAS',
    year: 1995
  },
  {
    name: 'BLUSAS',
    year: 1995
  },
  {
    name: 'CORTINAS',
    year: 1987
  },
  {
    name: 'COLCHAS',
    year: 1995
  },
  {
    name: 'FRANELA',
    year: 1991
  },
  {
    name: 'ABRIGO',
    year: 1995
  },
  {
    name: 'OVERALL',
    year: 2003
  },
  {
    name: 'SHORT',
    year: 2003
  },
  {
    name: 'VESTIDO DE NOVIA',
    year: 2003
  }
];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {

    const escapedValue = escapeRegexCharacters(value.trim());

      if (escapedValue === '') {
        return [];
      }

      const regex = new RegExp('^' + escapedValue, 'i');

      return languages.filter(language => regex.test(language.name));

}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.name;
}

class MasterModalField extends React.Component{

    constructor(){

        super();
        this.state = {

            value: '',
            suggestions: [],
            peluqueraData: [],
            masterAPI: []
        }
    }

    componentDidMount(){

        fetch(API_URL+'/master',{headers: API_HEADERS})
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({

                masterAPI: responseData
            })

        })
        fetch(API_URL+'/peluquera',{headers: API_HEADERS})
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({

                peluqueraData: responseData
            })

        })
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        })

}


    onChange(event, {newValue,method}){
        this.setState({

            value: newValue
        });
    }

    onSuggestionsFetchRequested({value}){
        this.setState({

            suggestions: getSuggestions(value)
        });
    }

    onSuggestionsClearRequested(){

        this.setState({
          suggestions: []
        });

    }



    render(){

        const { value, suggestions } = this.state;
        const inputProps = {
          placeholder: "Type 'c'",
          value,
          onChange: this.onChange.bind(this)
        };

        let name

        let filteredData = this.state.masterAPI.filter(

            (master) => master.id == this.props.idSelected
        )

        
        if(filteredData[0]){            
            name = filteredData[0].name
        }

        let MasterModalFieldEN = (

                <Row>
                    <Form onSubmit={this.props.masterCallback.onsavedetail.bind(this)}>
                        <Row>
                            <FormGroup controlId="formHorizontalName">                              
                              <Col md={4} sm={6}>
                                <input type="text" style={{'display':'none'}} name="id" value={this.props.idSelected} />
                              </Col>
                            </FormGroup>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Name
                              </Col>                              
                              <Col md={4} sm={6}>
                                <FormControl type="text" name="firstname" value={name} placeholder="Name" required />
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            {/* <FormGroup controlId="formHorizontalItem">
                                  <Col componentClass={ControlLabel} md={1} sm={2}>
                                    Item
                                  </Col>
                                  <Col md={4} sm={6}>
                                    <Autosuggest
                                               suggestions={suggestions}

onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}

onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}

renderSuggestion={renderSuggestion}
                                        getSuggestionValue={getSuggestionValue}
                                               inputProps={inputProps}
                                    />
                                  </Col>
                            </FormGroup> */}
                        {/* </Row>
                        <br/>
                        <Row> */}
                            {/* <FormGroup controlId="formControlsSelect">
                                <Col md={1} sm={2}>
                                  <ControlLabel>List</ControlLabel>
                                </Col>
                                <Col md={4} sm={6}>
                                  <FormControl componentClass="select" name="development" placeholder="List" required >
                                    <option value="select">Select</option>
                                    <option value="...">...</option>

                                  </FormControl>
                                </Col>
                            </FormGroup> */}
                        </Row>                        
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Project
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="text" name="project" placeholder="Project" required />
                              </Col>                              
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Cantidad
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="text" name="quantity" placeholder="Cantidad" required />
                              </Col>                              
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <Col mdOffset={4} sm={6}>
                                <Button type="submit">Save</Button>                                                            
                            </Col>
                        </Row>
                       
                    </Form>

                  </Row>
        );

        let MasterModalFieldES = (

                <Row>
                    <Form
onSubmit={this.props.masterCallback.onsavedetail.bind(this)}>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Cliente
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="text"
name="firstname" placeholder="Cliente" required />
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalItem">
                                  <Col componentClass={ControlLabel}
md={1} sm={2}>
                                    Articulo
                                  </Col>
                                  <Col md={4} sm={6}>
                                    <Autosuggest
                                               suggestions={suggestions}

onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}

onSuggestionsClearRequested={this.onSuggestionsClearRequested.bind(this)}

renderSuggestion={renderSuggestion}

getSuggestionValue={getSuggestionValue}
                                               inputProps={inputProps}
                                    />
                                  </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formControlsSelect">
                                <Col md={1} sm={2}>
                                  <ControlLabel>Tipo de Servicio</ControlLabel>
                                </Col>
                                <Col md={4} sm={6}>
                                  <FormControl componentClass="select" name="development" placeholder="Tipo de Servicio" required >
                                    {this.state.peluqueraData.sort((a,b)=>a.name>b.name).map(
                                        item => <option value={item.name}>{item.name}</option>                                    
                                    )}
                                  </FormControl>
                                </Col>
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Precio
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="text" name="project" placeholder="Precio" required />
                              </Col>                              
                            </FormGroup>
                        </Row>
                        <br/>
                        <Row>
                            <FormGroup controlId="formHorizontalName">
                              <Col componentClass={ControlLabel} md={1} sm={2}>
                                Cantidad
                              </Col>
                              <Col md={4} sm={6}>
                                <FormControl type="text" name="quantity" placeholder="Cantidad" required />
                              </Col>
                              <Col md={2} sm={2} >
                                    <Button type="submit"><i className="fa fa-plus" aria-hidden="true"></i></Button>
                              </Col>
                            </FormGroup>
                        </Row>
                        <br/>                        
                        <Row>
                            <input
style={{'width':'70px','display':'none'}} type="text" name="suggest"
placeholder="Name" value={this.state.value} />
                        </Row>
                    </Form>

                  </Row>
        );

        let MasterModalFieldActive;

        if(languageActive){

            MasterModalFieldActive=MasterModalFieldEN
        }else{
            MasterModalFieldActive=MasterModalFieldES
        }

        return(
            <Grid>
                {MasterModalFieldActive}
            </Grid>
        );
    }
}

class MasterModalTable extends React.Component{


    render(){

        let MasterModalTableEN = (

              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Item</th>
                <th>Development</th>
                <th>Project</th>
              </tr>
        );

        let MasterModalTableES = (

              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Articulo</th>
                <th>Tipo de Servicio</th>
                <th>Precio</th>
              </tr>
        );

        let MasterModalActive;

        if(languageActive){

            MasterModalActive=MasterModalTableEN
        }else{

            MasterModalActive=MasterModalTableES
        }

        return(

            <div>
                <Table striped bordered condensed hover>
                    <thead>
                      {MasterModalActive}
                    </thead>
                    <tbody>
                        {this.props.masterDetail.map(
                            (masterdetail,index) => <MasterModalTableBody
                                                         index={index+1}
                                                         key={index}
                                                         id={masterdetail.id}

firstname={masterdetail.firstname}

item={masterdetail.item}

development={masterdetail.development}

project={masterdetail.project}
                                              />
                        )}
                    </tbody>
                  </Table>
            </div>
        );
    }
}

class MasterModalTableBody extends React.Component{

    render(){

        return(

            <tr>
                <td>{this.props.index}</td>
                <td>{this.props.firstname}</td>
                <td>{this.props.item}</td>
                <td>{this.props.development}</td>
                <td>{this.props.project}</td>
            </tr>

        );
    }

}

class Detail extends React.Component{

    constructor() {

        super();
        this.state = {
            showModal: false,
            filterText: '',
            detailData: []
        }
    }

    componentDidMount(){

          fetch(API_URL+'/detail',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  detailData: responseData
              })

          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    onSaveDetail(event){

        event.preventDefault();

        let today = moment(new Date()).format('YYYY-MM-DD');

        let newDetail = {

            "id": Date.now(),
            "date": today,
            "id": event.target.id.value,
            "name": event.target.name.value,
            "item": event.target.item.value,
            "environment": event.target.environment.value
        }

        let nextState = this.state.detailData;

        nextState.push(newDetail);


        fetch(API_URL+'/detail', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify(newDetail)
        })

        this.setState({

            detailData: nextState,
            showModal: false
        });

    }

    onHandleChange(event){

        this.setState({

            filterText: event.target.value
        });
    }

    onUpdated(value){

        console.log(value);
    }

    onDeleted(value){

        let nextState = this.state.detailData;

        var index = nextState.findIndex(x=> x.id==value);

        nextState.splice(index,1);

        this.setState({

            detailData: nextState
        });

        fetch(API_URL+'/deletedetail', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify({"index":index,"id":value})
        })
    }

    render(){

        let DetailEN = (

            <Button onClick={this.open.bind(this)}>Add Detail</Button>
        );

        let DetailES = (

            <Button onClick={this.open.bind(this)}>Agregar Articulo</Button>
        );

        let DetailActive;

        if(languageActive){
            DetailActive=DetailEN
        }else{
            DetailActive=DetailES
        }

        return(
            <Grid>

                <Row>
                    <DetailSearch
                                    filterText={this.state.filterText}
                                    detailCallback={{
                                                onHandleChange:
this.onHandleChange.bind(this)
                                    }}
                    />
                </Row>
                <Row>
                        <div className="pull-right">
                            {DetailActive}
                            <DetailModal showModal={this.state.showModal}
                                            detailCallback={{
                                                open:this.open,
                                                close:this.close.bind(this),

onsavedetail:this.onSaveDetail.bind(this)
                                            }}
                            />
                        </div>
                </Row>
                <br/>
                <Row>
                    <DetailTable
                                    filterText={this.state.filterText}
                                    detailData={this.state.detailData}
                                    detailCallback={{
                                              onUpdated:
this.onUpdated.bind(this),
                                              onDeleted:
this.onDeleted.bind(this),
                                    }}
                    />
                </Row>
            </Grid>
        );
    }
}

class DetailPagination extends React.Component{

    constructor(){

        super();
        this.state = {
            activePage: 1
        }
    }

    handleSelect(eventKey) {
        this.setState({
          activePage: eventKey
        });
    }

    render(){

        return(

            <   Pagination
                prev
                next
                first
                last
                ellipsis
                boundaryLinks
                items={5}
                maxButtons={5}
                activePage={this.state.activePage}
                onSelect={this.handleSelect.bind(this)}
            />
        );
    }
}

class DetailSearch extends React.Component{

    render(){

        let DetailSearchEN = (

            <Panel header="Search Detail">
              <form>
                <div className="form-group">
                    <div className="col-md-2 col-sm-2">
                      <label>Search:</label>
                    </div>
                    <div className="col-md-10 col-sm-10">
                      <input
onChange={this.props.detailCallback.onHandleChange.bind(this)}
type="text" className="form-control" id="first_name"
name="first_name"/>
                    </div>
                </div>
              </form>
            </Panel>
        )

        let DetailSearchES = (

            <Panel header="Busqueda ">
              <form>
                <div className="form-group">
                    <div className="col-md-2 col-sm-2">
                      <label>Buscar:</label>
                    </div>
                    <div className="col-md-10 col-sm-10">
                      <input
onChange={this.props.detailCallback.onHandleChange.bind(this)}
type="text" className="form-control" id="first_name"
name="first_name"/>
                    </div>
                </div>
              </form>
            </Panel>
        );

        let DetailSearchActive;

        if(languageActive){

            DetailSearchActive=DetailSearchEN
        }else{
            DetailSearchActive=DetailSearchES
        }

        return(
            <div>
                {DetailSearchActive}
            </div>
        );
    }
}

class DetailTable extends React.Component{

    render(){
        let filteredMaster = this.props.detailData.filter(
            (detail) => detail.name.indexOf(this.props.filterText) !== -1
        )

        let DetailTableEN = (

            <Panel header="Search List">
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Item</th>
                    <th>Environment</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                {filteredMaster.map(
                    (detail,index) => <DetailTableBody
                                                    key={index}
                                                    id={detail.id}
                                                    name={detail.name}
                                                    item={detail.item}

environment={detail.environment}

detailCallback={this.props.detailCallback}
                                />
                )}
                </tbody>
              </Table>
              <div className="pull-right">
                <DetailPagination

                />
              </div>
            </Panel>
        );

        let DetailTableES = (

            <Panel header="Listado ">
              <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Descripcion</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                {filteredMaster.map(
                    (detail,index) => <DetailTableBody
                                                    key={index}
                                                    id={detail.id}
                                                    name={detail.name}
                                                    item={detail.item}

environment={detail.environment}

detailCallback={this.props.detailCallback}
                                />
                )}
                </tbody>
              </Table>
              <div className="pull-right">
                <DetailPagination

                />
              </div>
            </Panel>
        );

        let DetailTableActive;

        if(languageActive){
            DetailTableActive=DetailTableEN
        }else{
            DetailTableActive=DetailTableES
        }

        return(
            <Row>
            {filteredMaster.sort((a,b)=>b.id-a.id).map(
                (master, index) =>                                             
                    <Col item md={4}>
                    <Panel header={master.date}>
                            <div className="card">                                    
                                <Link to={'/actions/'+master.id}>
                                    <img src="http://localhost:8084/img_avatar2.png"  alt="Avatar" style={{"width":"100%"}}/>                                    
                                    {/* <img src="http://localhost:8084/img_avatar2.png"  alt="Avatar" style={{"width":"100%"}}/>                                     */}
                                </Link>                  
                                <div className="container">
                                    <h4><b>{master.name}</b></h4>                                         
                                    <p>Architect  Engineer</p>                                         
                                    <Button style={{'margin-left':'23%'}}  >Add</Button>
                                    
                                </div>
                            </div>
                    </Panel>    
                </Col>
            )}
            </Row>               
        );
    }
}

class DetailModalUpdate extends React.Component{

    constructor(){

        super();
        this.state = {

            parameter: '',
            showModal: true,
            detailData: [],
            name: ''
        }

    }

    close(){

        this.setState({

            showModal: false
        });

        //window.location.href = '/'
    }

    open(){

        this.setState({

            showModal: true
        });
    }

    componentDidMount(){

        fetch(API_URL+'/detail',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  detailData: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
        })

        this.setState({

            parameter: this.props.params.detailid
        });

    }

    onSubmitted(event){

        event.preventDefault();

        let nextState = this.state.detailData;

        let index = nextState.findIndex(x=> x.id==this.state.parameter);

        let name = nextState[index].name;
        nextState[index].name=event.target.name.value
        if(event.target.name.value==''){
            event.target.name.value=name
        }

        let environment = nextState[index].environment;
        if(event.target.environment.value==''){
            event.target.environment.value=environment
        }

        fetch(API_URL+'/updatedetail', {

              method: 'post',
              headers: API_HEADERS,
              body:
JSON.stringify({"index":index,"name":event.target.name.value,"environment":event.target.environment.value})
        })

        this.setState({

            showModal: false
        });

    }

    render(){
        
        return(
        
            <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                <Modal.Header>
                    <Modal.Title>
                        <h1>Editing to {this.state.parameter}</h1>
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={this.onSubmitted.bind(this)} horizontal>
                <Modal.Body>
                        <FormGroup controlId="formHorizontalId">
                          <Col componentClass={ControlLabel} sm={2}>
                            ID
                          </Col>
                          <Col sm={10}>
                            <FormControl value={this.state.parameter} type="id" placeholder="id" disabled />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalName">
                          <Col componentClass={ControlLabel} sm={2}>
                            Nombre
                          </Col>
                          <Col sm={10}>
                            <FormControl name="name" type="text" placeholder="Nombre" />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEnvironment">
                          <Col componentClass={ControlLabel} sm={2}>
                            Cantidad
                          </Col>
                          <Col sm={10}>
                            <FormControl name="environment" type="text" placeholder="Cantidad" />
                          </Col>
                        </FormGroup>
                        <FormGroup controlId="formHorizontalEnvironment">
                          <Col componentClass={ControlLabel} sm={2}>
                            Precio
                          </Col>
                          <Col sm={10}>
                            <FormControl name="project" type="text" placeholder="Precio" />
                          </Col>
                        </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button >Save</Button>
                </Modal.Footer>
                    </Form>
            </Modal>
        );
    }
}

class DetailTableBody extends React.Component{

    render(){

        return(

              <tr>
                <td>{this.props.id}</td>
                <td>{this.props.name}</td>
                <td>{this.props.item}</td>
                <td>{this.props.environment}</td>
                <td>
                    <Link className="btn btn-default"
to={'/updatedetail/'+this.props.id}><i className="fa fa-edit"
aria-hidden="true"></i></Link>
                    <Button
onClick={this.props.detailCallback.onDeleted.bind(this,this.props.id)}><i
className="fa fa-trash" aria-hidden="true"></i></Button>
                </td>
              </tr>

        );
    }
}

class DetailModal extends React.Component{

    render(){

        let DetailModalEN = (


                            <Modal show={this.props.showModal}
onHide={this.props.detailCallback.close}>
                              <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                              </Modal.Header>
                              <Form horizontal
onSubmit={this.props.detailCallback.onsavedetail.bind(this)}>
                                  <Modal.Body>
                                            <FormGroup
controlId="formHorizontalid">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                ID
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="id" placeholder="ID" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalname">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Name
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="name" placeholder="Name" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalEnvironment">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Environment
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="environment" placeholder="Item" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalItem">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Item
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="item" placeholder="Item" />
                                              </Col>
                                            </FormGroup>
                                  </Modal.Body>
                                  <Modal.Footer>
                                        <Button type="submit"
pullRight>Save</Button>
                                  </Modal.Footer>
                              </Form>
                            </Modal>


        );
        let DetailModalES = (


                            <Modal show={this.props.showModal}
onHide={this.props.detailCallback.close}>
                              <Modal.Header closeButton>
                                <Modal.Title>Agregar Articulo</Modal.Title>
                              </Modal.Header>
                              <Form horizontal
onSubmit={this.props.detailCallback.onsavedetail.bind(this)}>
                                  <Modal.Body>
                                            <FormGroup
controlId="formHorizontalid">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Codigo
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="id" placeholder="Codigo" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalname">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Descripcion
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="name" placeholder="Descripcion" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalEnvironment">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Precio
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="environment" placeholder="Precio" />
                                              </Col>
                                            </FormGroup>
                                            <FormGroup
controlId="formHorizontalItem">
                                              <Col
componentClass={ControlLabel} sm={2}>
                                                Cantidad
                                              </Col>
                                              <Col sm={10}>
                                                <FormControl
type="text" name="item" placeholder="Cantidad" />
                                              </Col>
                                            </FormGroup>
                                  </Modal.Body>
                                  <Modal.Footer>
                                        <Button type="submit"
pullRight>Save</Button>
                                  </Modal.Footer>
                              </Form>
                            </Modal>

        );

        let DetailModalActive;

        if(languageActive){
            DetailModalActive=DetailModalEN
        }else{
            DetailModalActive=DetailModalES
        }

        return(
            <div>
                {DetailModalActive}
            </div>

        );
    }
}

class Partials extends React.Component{

     constructor(){

          super();
          this.state = {

              masterAPI: [],
              searchData: '2017-10-06',
              total: 0
          }

    }

    componentDidMount(){

          fetch(API_URL+'/reporte',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

          let today = moment(new Date()).format('YYYY-MM-DD');

          this.setState({

              searchData: today
          });





    }

    onChanged(event){


        this.setState({

            searchData: event.target.value
        });

    }

    onRun(){

                let nextState = this.state.masterAPI.filter((master) => (master.date == this.state.searchData) && (master.payment =="cash"||master.payment=="card"));

                let grand = 0;

                for(var x=0;x<nextState.length;x++){
                    grand+=parseInt(nextState[x].project);
                }

                this.setState({

                    total: grand
                })



        window.print();
    }

    render(){

        let PartialsEN = (

            <h1>Draw List</h1>
        );

        let PartialsES = (

            <h1>Reporte Cuadre</h1>
        );

        let PartialsActive;

        if(languageActive){

            PartialsActive=PartialsEN
        }else{

            PartialsActive=PartialsES
        }

        return(

             <Grid>
                    <Row>
                        <Col xs={6}>
                            {PartialsActive}
                        </Col>
                    </Row>
                    <Row>
                        <PartialsSearch
                                        onChanged={this.onChanged.bind(this)}
                        />
                        <PartialsTable

                            masterAPI={this.state.masterAPI.filter((master)=> master.date == this.state.searchData && (master.payment=="cash"||master.payment=="card") )}
                            total={this.state.total}
                            payment={this.state.payment}
                        />
                    </Row>
                    <Row>
                        <Button onClick={this.onRun.bind(this)}>i</Button>
                    </Row>
            </Grid>
        );
    }
}

class PartialsSearch extends React.Component{

    render(){

        return(



                    <Col xs={6}>
                        <Form horizontal
onChange={this.props.onChanged.bind(this)}>
                            <FormGroup controlId="formHorizontalEmail">
                              <Col componentClass={ControlLabel} xs={2}>

                              </Col>
                              <Col xs={6}>
                                <FormControl type="date" placeholder="Email" />
                              </Col>
                            </FormGroup>
                        </Form>
                    </Col>


        );
    }
}

class PartialsTable extends React.Component{



    render(){

        let partialsTableEN = (

            <tr>
                <th style={{'width':'15px', 'font-size':'25px','border-spacing':'0 30px'}}>#</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Date</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Name</th>
                <th style={{'width':'15px', 'font-size':'25px'}}>Project</th>
              </tr>
        );

        let partialsTableES = (

            <tr>
                <th style={{'width':'15px', 'font-size':'35px','border-spacing':'0 30px'}}>#</th>
                <th style={{'width':'15px', 'font-size':'35px'}}>Fecha</th>
                <th style={{'width':'15px', 'font-size':'35px'}}>Cliente</th>
                <th style={{'width':'15px', 'font-size':'35px'}}>Precio</th>
                <th style={{'width':'15px', 'font-size':'35px'}}>Tipo Pago</th>
              </tr>
        );

        let partialsTableActive;

        if(languageActive){

           partialsTableActive=partialsTableEN
        }else{

           partialsTableActive=partialsTableES
        }

        return(


                    <Row>
                        <Col xs={12}>
                            <Table striped bordered condensed hover style={{'width':'100%'}}>
                                <thead>
                                  {partialsTableActive}
                                </thead>
                                <tbody>
            {this.props.masterAPI.map(

                (master, index) => <PartialsTableBody
                                                key={index}
                                                index={index+1}
                                                id={master.id}
                                                date={master.date}
                                                name={master.name}
                                                project={master.project}
                                                total={this.props.total}
                                                payment={master.payment}
                                    />
            )}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td>&nbsp;</td>
                                        <td>&nbsp;</td>
                                        <td style={{'width':'10px','font-size':'35px'}}>Total</td>
                                        <td style={{'width':'10px','font-size':'35px'}}>RD${this.props.total}.00</td>
                                        <br/>
                                        <br/>
                                    </tr>
                                </tfoot>
                            </Table>
                        </Col>
                    </Row>

        );
    }

}

class PartialsTableBody extends React.Component{

    render(){

        let nextState 
        
        let tipoPagoEF = (

            <td style={{'font-size':'35px'}}>EFECTIVO</td>
 
        );

        let tipoPagoTA = (

            <td style={{'font-size':'35px'}}>TARJETA</td>
 
        );

        if(this.props.payment=="card"){

            nextState = tipoPagoTA
        }else{
            
            nextState = tipoPagoEF
        }


        return(

              <tr>
                <td></td>
                <td style={{'font-size':'35px'}}>{this.props.date}</td>
                <td style={{'font-size':'35px'}}>{this.props.name}</td>
                <td style={{'font-size':'35px'}}>{this.props.project}.00</td>
                <td style={{'font-size':'35px'}}>{nextState}</td>
                {/* <td style={{'font-size':'35px'}}>{this.props.payment}</td> */}
              </tr>
        );
    }
}

class TriPartials extends React.Component{

    constructor(){
        
        super();
        this.state = {
            
            masterAPI: []
        }
    }
    
    componentDidMount(){
        
        fetch(API_URL+'/weeklyreportrecap',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
        })
    }
    
    render(){
        
        return(
        
            <TriPartialsTable
                                masterAPI={this.state.masterAPI}
            />
        );
    }
}

class TriPartialsTable extends React.Component{
    
    render(){
        
        return(
        
            <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Total</th>
                    <th>Porcentaje</th>
                    <th>Total + Porcentaje</th>
                  </tr>
                </thead>
                <tbody>
                    {this.props.masterAPI.map(
                         (master,index) => <TriPartialsTableBody
                                                        master={master._id}
                                                        total={master.total}
                                            />
                    )}                  
                </tbody>
              </Table>
        );
    }
}

class TriPartialsTableBody extends React.Component{

    constructor(){
        super();
        this.state = {
            percentage: 1
        }
    }

    onChanged(data){
        this.setState({
            percentage: data.target.value
        })
    }

    render(){

        let percentageTotal = this.props.total * this.state.percentage / 100;

        return(

            <tr>
                <td>&nbsp;</td>
                <td>{this.props.master}</td>
                <td>{this.props.total.toFixed(2)}</td>
                <td>
                    <input type="number" name="percentage" placeholder="%"  onChange={this.onChanged.bind(this)} />
                </td>
                <td>
                    <h6>{percentageTotal.toFixed(2)}</h6>
                </td>
            </tr>

        );
    }
}

class BiPartials extends React.Component{

     constructor(){

          super();
          this.state = {

              masterAPI: [],
          }

    }

    componentDidMount(){

          fetch(API_URL+'/weeklyreport',{headers: API_HEADERS})
          .then((response)=>response.json())
          .then((responseData)=>{
              this.setState({

                  masterAPI: responseData
              })
          })
          .catch((error)=>{
              console.log('Error fetching and parsing data', error);
          })

    }

    render(){
                
        return(
            <Table striped bordered condensed hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Fecha</th>
                    <th>Tipo de Servicio</th>
                  </tr>
                </thead>
                <tbody>
            {this.state.masterAPI.map(
                (master, index) => <BiPartialsTable
                                                index={index}
                                                fecha={master._id}
                                                count={master.count}
                            />
            )}
                </tbody>
              </Table>
        );
    }
}

class BiPartialsTable extends React.Component{
    
    render(){
        
        return(
                <tr>
                    <td>{this.props.index}</td>
                    <td>{this.props.fecha}</td>
                    <td>
                        <Table>     
                            
                                {this.props.count.map(
                                    (item) => <BiPartialsTableBody
                                                                        totales={item.totales}
                                                                        item={item.item}
                                              />
                                )}
                            
                        </Table>
                    </td>
                  </tr>
        );
    }
}

class BiPartialsTableBody extends React.Component{
    
    render(){
        
        return(
            <tr>
            <td>{this.props.item[0]}</td>
            <td>{this.props.totales}</td>
            </tr>
        );
    }
}

class AgregarPeluquera extends React.Component{

    constructor() {

        super();
        this.state = {
            showModal: false,
            filterText: '',
            peluqueraData: []
        }
    }

    componentDidMount(){

            fetch(API_URL+'/peluquera',{headers: API_HEADERS})
            .then((response)=>response.json())
            .then((responseData)=>{
                this.setState({

                    peluqueraData: responseData
                })

            })
            .catch((error)=>{
                console.log('Error fetching and parsing data', error);
            })

    }

    close() {
        this.setState({
            showModal: false
        });
    }

    open() {
        this.setState({
            showModal: true
        });
    }

    onDeleted(value){

        let nextState = this.state.peluqueraData;

        var index = nextState.findIndex(x=> x.id==value);
        console.log(nextState);
        console.log(value)
        nextState.splice(index,1);

        this.setState({

            peluqueraData: nextState
        });

        fetch(API_URL+'/deletepeluquera', {

              method: 'post',
              headers: API_HEADERS,
              body: JSON.stringify({"index":index,"id":value})
        })
    }

    onSavePeluquera(event){

        event.preventDefault();

        let today = moment(new Date()).format('YYYY-MM-DD');

        let newPeluquera = {

            "id": Date.now(),
            "date": today,
            "name": event.target.name.value,
        }

        let nextState = this.state.peluqueraData;

        nextState.push(newPeluquera);

        fetch(API_URL+'/peluquera', {

                 method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(newPeluquera)
        })

        this.setState({

            peluqueraData: nextState,
            showModal: false
        });

    }

    onHandleChange(event){

        this.setState({

            filterText: event.target.value
        });
    }

    
    render(){   
        return(
                <Grid>
                <Row>
                    <PeluqueraSearch/>
                </Row>
            <Row>
            <div className="pull-right">
                <Button onClick={this.open.bind(this)}>Agregar Tipo de Servicio</Button>
                <PeluqueraModal showModal={this.state.showModal}
                                            peluqueraCallback={{
                                                open:this.open,
                                                close:this.close.bind(this), 
                                                onsavepeluquera:this.onSavePeluquera.bind(this),
                                                ondeletepeluquera:this.onDeleted.bind(this)
                                            }}
                            />

            </div>
            </Row>
            <br/>
            <Row>
                <PeluqueraTable
                                    filterText={this.state.filterText}
                                    peluqueraData={this.state.peluqueraData}     
                                    peluqueraCallback={{
                                        onDeleted: this.onDeleted.bind(this)
                                    }}                                               
                />
            </Row>
            </Grid>
        );
    }
}
class PeluqueraSearch extends React.Component{
    render(){
        return(
            <Panel header="Busqueda ">
                <form>
                <div className="form-group">
                    <div className="col-md-2 col-sm-2">
                        <label>Buscar:</label>
                    </div>
                    <div className="col-md-10 col-sm-10">
                        <input type="text" className="form-control" id="first_name" name="first_name"/>
                    </div>
                </div>
                </form>
            </Panel>
        );
    }
}
class PeluqueraTable extends React.Component{
    render(){

        let filteredMaster = this.props.peluqueraData.filter(

            (master) => master.name.indexOf(this.props.filterText) !== -1
        );

        return(
            <Panel header="Listado de Tipo de Servicio">
                <Table striped bordered condensed hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredMaster.map(
                            (master, index) => <PeluqueraTableBody
                                                                    id={master.id}                                                                    date={master.date}
                                                                    date={master.date}
                                                                    name={master.name}
                                                                    peluqueraCallback={this.props.peluqueraCallback}
                                                />
                    )}
                    </tbody>
                </Table>
            </Panel>
        );
    }
}

class PeluqueraTableBody extends React.Component{
    render(){
        return(
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.date}</td>
                <td>{this.props.name}</td>
                <td>
                    <Button className="btn btn-default"><i className="fa fa-edit" aria-hidden="true"></i></Button>
                    <Button onClick={this.props.peluqueraCallback.onDeleted.bind(this,this.props.id)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
                </td>

            </tr>
        );
    }
}


class PeluqueraModal extends React.Component{

    render(){
        return(
            <Modal show={this.props.showModal} onHide={this.props.peluqueraCallback.close}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar Tipo de Servicio</Modal.Title>
            </Modal.Header>
            <Form horizontal onSubmit={this.props.peluqueraCallback.onsavepeluquera.bind(this)}>
                <Modal.Body>
                          <FormGroup controlId="formHorizontalname">
                            <Col componentClass={ControlLabel} sm={2}>
                              Nombre
                            </Col>
                            <Col sm={10}>
                              <FormControl type="text" name="name" placeholder="Nombre" />
                            </Col>
                          </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                      <Button type="submit" pullRight>Save</Button>
                </Modal.Footer>
            </Form>
          </Modal>

        );
    }
}

class Registration2 extends React.Component{

    render(){
        return(
            <div className="container">
                <div className="row vertical-offset-100">
                    <div className="col-md-4 col-md-offset-4">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h3 className="panel-title">Please sign up</h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={this.props.setregistration.bind(this)}>
                                <fieldset>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="E-mail" name="email" type="text"/>
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Password" name="password" type="password"/>
                                    </div>                                    
                                    <button className="btn btn-lg btn-success btn-block">Save</button>
                                </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

class Account extends React.Component{

    constructor(){

        super();
        this.state = {
  
            password: ""
        }
    }

    onSubmit(event){

        event.preventDefault();

        let newPassword = {
            "token": token(),
            "newpassword":this.state.password
        }
        console.log(newPassword)

        fetch(API_URL+'/resetpassword', {

            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newPassword)
        })

        //window.location.reload();
    }
  

    onhandleuserinput(event){
        this.setState({
            password: event.target.value
        })
    }
    render(){
        return(
            <Panel header="Reset Password">
                  <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group">
                        <div className="col-md-2 col-sm-2">
                          <label>Password:</label>
                        </div>
                        <div className="col-md-10 col-sm-10">
                          <input onChange={this.onhandleuserinput.bind(this)} type="password" className="form-control" id="first_name" name="first_name"/>
                          <br/>
                          <button className="btn btn-lg btn-success btn-block">Reset</button>
                        </div>
                    </div>
                  </form>
                </Panel>

        );
    }
}

class Profile extends React.Component{
    
    constructor(){

        super();
        this.state = {

            masterAPI: [],
            parameter: '',
            activePanel: "overview"
        }
    }

    componentDidMount(){

        this.setState({
            
            parameter: this.props.params.userid
        });
    }

    onClicked(event){

        this.setState({

            activePanel : event.target.value
        })
    }

    render(){

        let activeRenderPanel

        let overview = (

            <div>
                <h1>Overview</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>   
            </div>
        );

        let account = (

            <div>
                <h1>Account Setting</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>   
            </div>
        );

        let tasks = (

            <div>
                <h1>Tasks</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>   
            </div>
        );

        let help = (

            <div>
                <h1>Help</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>   
            </div>
        );

        if(this.state.activePanel=="overview"){
            activeRenderPanel=overview
        }else if(this.state.activePanel=="accountsetting"){
            activeRenderPanel=account        
        }else if(this.state.activePanel=="tasks"){
            activeRenderPanel=tasks
        }else{
            activeRenderPanel=help
        } 
        

        return(
            <Grid>                
                <Row>
                    <Col md={4}>                        
                            <h1>{this.state.parameter}</h1>
                            <Panel>
                                    <div className="card">                                                                      
                                            <img src="http://localhost:8084/img_avatar.png"  alt="Avatar" style={{"width":"100%"}}/>                                    
                                            {/* <img src="http://localhost:8084/img_avatar.png"  alt="Avatar" style={{"width":"100%"}}/>                                     */}
                                        <div className="container">
                                            
                                            <p>Architect  Engineer</p>                                         
                                            
                                        </div> 
                                        <div className="row">
                                            <h5 style={{'text-align':'center'}}>Testing</h5>
                                        </div>
                                        <br/>                                       
                                        <div className="row">
                                            <Col md={6}>
                                                <Button className="btn btn-success btn-lg" >Follow</Button>
                                            </Col>
                                            <Col md={6}>
                                                <Button className=" btn btn-danger btn-lg" >Message</Button>
                                            </Col>                                            
                                        </div>
                                        <br/>                                       
                                        <div className="row">
                                            <div className="list-group">                                                 
                                                <Button onClick={this.onClicked.bind(this)} value="overview" className="list-group-item"><i className="fa fa-home" aria-hidden="true"></i>&nbsp;&nbsp;Overview</Button>
                                                <Button onClick={this.onClicked.bind(this)} value="accountsetting" className="list-group-item"><i className="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;Account Setting</Button>
                                                <Button onClick={this.onClicked.bind(this)} value="tasks" className="list-group-item"><i className="fa fa-check" aria-hidden="true"></i>&nbsp;&nbsp;Tasks</Button>                                                
                                                <Button onClick={this.onClicked.bind(this)} value="help" className="list-group-item"><i className="fa fa-flag" aria-hidden="true"></i>&nbsp;&nbsp;Help</Button>                                                
                                            </div>
                                        </div>
                                    </div>
                            </Panel>
                    </Col>
                    <Col md={8} sm={2}>                        
                        {activeRenderPanel}
                    </Col>
                </Row>
            </Grid>

        );
    }

}

class CardNarv extends React.Component{

    constructor(){
        
        super();
        this.state = {

            orderAPI: []
        }
    }

    componentDidMount(){

        // fetch(API_URL+'/orders/'+token(),{headers: API_HEADERS})
        // .then((response)=>response.json())
        // .then((responseData)=>{
        //     this.setState({
    
        //         orderAPI: responseData
        //     })
        // })
        let newItem = {
            
            "user" : token()
        }

        fetch('https://on3eon5uoh.execute-api.us-east-1.amazonaws.com/live/-orders',{headers: API_HEADERS})
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({
  
                orderAPI: responseData
            })
        })
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        })
    }

    onDelete(value){

        let newItem = {

            "id": value
        }
        
        fetch(API_URL+'/removeorder', {
            
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newItem)
        })
        .then((response)=>response.json())        
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        })
    }

    checkout(value){

        let newItem = {

            "id": value
        }

        fetch('https://6fe0ukszz2.execute-api.us-east-1.amazonaws.com/live/setcheckout',{headers: API_HEADERS})
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({
  
                orderAPI: responseData
            })
        })
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        })
        
    }



    render(){

        let sum = 0;

        if(this.state.orderAPI[0]){
            for(var x=0;x<this.state.orderAPI.length;x++){                
                sum+= parseInt(this.state.orderAPI[x].project)
            }
        }

        return(     
                    <Row>                        
                        <Col md={2}></Col>
                        <Col md={10}>
                        <h4>
                            Cart
                        </h4>                        
                        </Col>
                        <br/>
                        <Col md={12}>                        
                        <Table>                                        
                            <tbody>
                            {this.state.orderAPI.map(
                                (order) =>  <tr>
                                                <td colSpan="3" style={{'text-decoration':'none !important','text-align':'center', 'width':'100%'}}>{order.description}</td>
                                                <td colSpan="2">qty: {parseInt(order.quantity)}</td>
                                                <td>US${parseInt(order.project).toFixed(2)}</td>
                                                <td style={{'text-align':'center','font-size':'18px'}}><i onClick={this.onDelete.bind(this, order.id)} className="fa fa-trash" aria-hidden="true"></i></td>
                                            </tr>
                            )}    
                            
                            <tr>                                                    
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>Discount:</td>
                                <td>${(sum*5/100).toFixed(2)}</td>                        
                            </tr>
                            <tr>                        
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>Subtotal:</td>
                                <td>${((sum)-(sum*5/100)).toFixed(2)}</td>                        
                            </tr>
                            <tr>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                <td style={{'font-weight':'bold','font-size':'20px'}}>Total:</td>
                                <td style={{'font-weight':'bold','font-size':'20px'}}>${sum.toFixed(2)}</td>                        
                            </tr>
                            <tr>                            
                                <td colSpan="7" style={{'text-align':'center', 'width':'100%'}}>
                                    <Button onClick={this.checkout.bind(this,"hello")} style={{'width':'100%'}} variant="outline-success">
                                        Proceed to Checkout &nbsp; <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                    </Button>
                                </td>                                                  
                                {/* <td>@twitter</td>                             */}
                            </tr>
                            <tr>                            
                                <td colSpan="7" style={{'text-align':'center', 'width':'100%'}}>
                                    <Link to={'/upload'}>
                                    <Button style={{'width':'100%'}} variant="outline-success">
                                        Upload &nbsp; <i className="fa fa-arrow-up" aria-hidden="true"></i>
                                    </Button>
                                    </Link>                                    
                                </td>                                                  
                                {/* <td>@twitter</td>                             */}
                            </tr>
                            </tbody>
                        </Table>                    
                    </Col>
                    </Row>
        );
    }

}
class Order extends React.Component{
    
    
    constructor(){

        super();
        this.state = {

            orderAPI: []
        }
    }

    componentDidMount(){

        // fetch(API_URL+'/orders/'+token(),{headers: API_HEADERS})
        // .then((response)=>response.json())
        // .then((responseData)=>{
        //     this.setState({
  
        //         orderAPI: responseData
        //     })
        // })
        let newItem = {

            "user" : token()
        }
        fetch(API_URL+'/orders', {
            
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newItem)
        })
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({
  
                orderAPI: responseData
            })
        })
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        })
    }

    render(){

        return(

                <Table striped bordered condensed hover>
                                    <thead>
                                        <tr>
                                            <td>Username</td>
                                            <td>Status</td>
                                            <td>Quantity</td>
                                            <td>Address</td>
                                        </tr>
                                    </thead>
                                    <tbody>                                            
                {this.state.orderAPI.map(
                    (order) =>
                                
                                        <tr>
                                            <td>{order.username}</td>
                                            <td>{'Pending'}</td>
                                            <td>{order.quantity}</td>
                                            <td>{order.address}</td>
                                        </tr>
                )}
                </tbody>                                            
                </Table>

            
        );
    }

}

class Upload extends React.Component{

    constructor(){
        
        super();
        this.state = {

            orderAPI: [],
            showModal: false,
            files: [],
            file: '',
            compare: [],
            compare2: [],
            compare3: [],           
            compare4: [],
            targetFieldData: ""           
        }
    }

    componentDidMount(){

        // fetch(API_URL+'/orders/'+token(),{headers: API_HEADERS})
        // .then((response)=>response.json())
        // .then((responseData)=>{
        //     this.setState({
    
        //         orderAPI: responseData
        //     })
        // })
        let newItem = {

            "user" : token()
        }
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
        fetch('http://localhost:8080/getstep',{headers: API_HEADERS})
        .then((response)=>response.json())
        .then((responseData)=>{
            this.setState({
  
                orderAPI: responseData
            })
        })        
        .catch((error)=>{
            console.log('Error fetching and parsing data', error);
        })

        var params = {
            Bucket: albumBucketName,
            MaxKeys: 100
        };        

        var params3 = {
            Bucket: albumBucketName3,
            MaxKeys: 100
        };        
        
        s3.listObjects(params, (err, data) =>{
            if (err){
                console.log(err, err.stack);
            }else{                
                this.setState({
                    compare:data
                })
            }
        })        
        anotherS3.listObjects(params3, (err, data) =>{
            if (err){
                console.log(err, err.stack);
            }else{  
                
                this.setState({
                    compare3:data
                    
                })
            }
        })        
    }

    onClose(){
        this.setState({

            showModal: false
        })
    }

    onOpen(){

        this.setState({
            
            showModal: true
        })


    }

    onsavedetail(event){
        
        event.preventDefault();

        
        this.onClose();

    }

    fileSelectedHandler(e){

        
        var files = e.target.files
        
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
        
        promise.then(
            function(data) {
                alert("Successfully uploaded photo.");                
            },
            function(err) {
                // return alert("There was an error uploading your photo: ", err.message);
                console.log("There was an error uploading your photo: ", err.message);
            }
        );

    }

    handleFile(file){
        this.setState({
            file:file 
        });
    }

    onProcess(event){

        event.preventDefault();

        var targetField = event.target.development.value;

        // console.log(targetField)

        this.setState({
            targetFieldData: targetField
        })

        let today = moment(new Date()).format('DD-MM-YYYY');

        var item = {

            "id": Date.now(),
            "date": today,
            "items":[]
        }

        var compareData = []

        var params = {
            Bucket: albumBucketName3,
            MaxKeys: 100
        };        
        
        anotherS3.listObjects(params, (err, data) =>{
            if (err){
                console.log(err, err.stack);
            }else{                               
                compareData=data
            }
        })  

        setTimeout(() => {

            compareData.Contents.map( 
                (compare) =>                    
                    item.items.push(
                        {
                            "SourceImage": compare.Key,
                            "TargetImage": targetField,
                            "BucketSourceImage": albumBucketName3,
                            "BucketTargetImage": albumBucketName                            
                            // "BucketTargetImage": "rekognition-video-console-demo-iad-352250014224-1vio7fvwvq5qve"                            
                        }                        
                    )
            )

            

            fetch('https://hb4ty6ype0.execute-api.us-east-1.amazonaws.com/live/setcomparemw', {
                
                method: 'post',
                headers: API_HEADERS,
                body: JSON.stringify(item)
            }).then(response => response.json()).then(response => {

                // console.log(response)
                this.setState({
                    compare4: response
                })

            })
            .catch((error)=>{
                console.log('Error fetching and parsing data', error);
            });

            //console.log(item)
            
            

        }, 3000);

        

    } 
    
    render(){

        var homeOne = this.state.orderAPI 

        var result = homeOne.filter(
            (master) => master.token == token()
        )

        console.log(result)

        var item = []
        var item3 = []
        var item4 = []
        var filteredItem4 = []
        
        if(this.state.compare.Contents){
            
            item3 = this.state.compare.Contents
        }

        if(this.state.compare3.Contents){
            
            item = this.state.compare3.Contents
        }

        if(this.state.compare4){
            
            item4 = this.state.compare4
   
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

            console.log(item4)
            
        }

        // item4.map(
        //     (match)=> match.FaceMatches.map(
        //         (faces)=> console.log(faces)
        //     )
        // )

        if(filteredItem4.length>0){

            // console.log(filteredItem4)
        }

        console.log(result)

        return(

            <Grid>
                <Row>                    
                    <h1 style={{'color':'#cd6607'}}>AMAZON AWS</h1>
                </Row>
                <br/>
                <Row>                    

                <Button className="pull-right" onClick={this.onOpen.bind(this)} variant="outline-success">Upload &nbsp; <i className="fa fa-arrow-up" aria-hidden="true"></i></Button>
                

                <Modal show={this.state.showModal} onHide={this.onClose.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>                                                                                                                                
                            <Form onSubmit={this.onsavedetail.bind(this)}>    
                            {/* <Form >     */}
                            <Row>      
                                <FormGroup>
                                        <Col componentClass={ControlLabel} md={4} sm={2}>
                                            Description
                                        </Col>                              
                                        <Col md={8} sm={6}>
                                            <FormControl type="text" name="description" placeholder="Description" />                                            
                                        </Col>
                                    </FormGroup>
                                </Row>
                                <br/>                                                                
                                <Row>                                                                            
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} md={4} sm={2}>
                                            Price
                                        </Col>                              
                                        <Col md={8} sm={6}>
                                            <FormControl type="text" name="price" placeholder="Price" disabled />
                                        </Col>
                                    </FormGroup>
                                </Row>    
                                <br/>
                                <Row>    
                                    <FormGroup>
                                        <Col componentClass={ControlLabel} md={4} sm={2}>
                                            Image
                                        </Col>                              
                                        <Col md={8} sm={6}>
                                            {/* <input type="file" name="fileToUpload" placeholder="Quantity" required /> */}
                                            <input type="file" onChange={this.fileSelectedHandler} />
                                        </Col>
                                    </FormGroup>
                                </Row>
                                <br/>                                                                                           
                                <Row>                                                                             
                                    <Col className="col-md-offset-10">
                                        <Button type="submit" >Save</Button>
                                    </Col>
                                </Row>
                            </Form>
                    </Modal.Body>
                </Modal>
                </Row>                
                <br/>
                <Row>                
                    <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <td>Red Light</td>                                                        
                            <td>Date</td>                                                        
                            {/* <td>Image #1 ( New Photo ) - {'webpaa-deployments-mobilehub-2128298286'}</td>                                                         */}
                            <td>Steps</td>
                            <td>Distance</td>
                        </tr>
                    </thead>
                    <tbody>                                            
                        {result.map(
                            (order) => 
                                <tr>
                                    <td>{order.redlight}</td>
                                    <td>{order.date}</td>
                                    <td>{order.step}</td>
                                    <td>{order.distance}</td>
                                </tr>
                        )}
                    </tbody>                                            
                    </Table>
                </Row>
            </Grid>
            
        );
    }

}



ReactDOM.render((
  <Router history={browserHistory}>
    {/* <Route path="/" component={App}> */}
    <Route path="/" component={App}>
        <IndexRedirect to="master" />
        <Route path="login" component={Login}/>
        <Route path="registration" component={Registration}/>
        <Route path="order" component={Order}/>
        <Route path="upload" component={Upload}/>
        <Route path="profile/:userid" component={Profile}/>
        <Route path="account" component={Account}/>
        <Route path="agregar_tiposervicio" component={AgregarPeluquera}/>
        <Route path="tripartials" component={TriPartials}/>
    	<Route path="bipartials" component={BiPartials}/>
        <Route path="partials" component={Partials}/>
        <Route path="about" component={About}/>
        <Route path="repos/:repo_name" component={Repos}/>
        <Route path="updatedetail/:detailid" component={DetailModalUpdate}/>
        <Route path="actions/:actionid" component={Actions}/>
        <Route path="detail" component={Detail}/>
        <Route path="master" component={Master}/>
    </Route>
  </Router>
), document.getElementById('contents'));