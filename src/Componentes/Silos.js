import React from 'react';
import './silos.css';

var mqtt = require('mqtt');
var client;


class Silos extends React.Component{

    constructor (){
        super();
        this.state={
          broker:'',
          user:'',
          passwd:'',
          tema:'',
          port:''
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleConnect= this.handleConnect.bind(this);
        this.handleSuscribe= this.handleSuscribe.bind(this);

    }
    
    handleConnect() {
        
        

        client= mqtt.connect(this.state.broker+":"+this.state.port+"/mqtt",{
            clientId: 'my-device',
            keepalive: 60, // Seconds which can be any positive number, with 0 as the default setting
            username: this.state.user ,
            password: this.state.passwd,
            connectTimeout: 2*1000
        });
        console.log('try to connect')

        client.on('connect',function() {
            console.log("Conectado");
            document.getElementById("con").className="conect"
            document.getElementById("id_form").className="ocultar"
            document.getElementById("desconexion").className="tamano"
            document.getElementById("silou").className="col-md-4 image"
            document.getElementById("silod").className="col-md-4 image"
            document.getElementById("temper").className="col-md-4 image"
            //client.subscribe("3EyLfoLCMSY8seG/temperatura")
        })
        
    }

    handleSuscribe(){
        
        client.subscribe(this.state.tema);


        client.on('message', function (topic, message) {
            if(topic==="3EyLfoLCMSY8seG/nivel1"){
            document.getElementById("nivela").innerHTML="Level A: "+message.toString()+" %";
            document.getElementById("lvla").value=message.toString();
        
        }
        if(topic==="3EyLfoLCMSY8seG/nivel2"){
            document.getElementById("nivelb").innerHTML="Level B: "+ message.toString()+" %";
            document.getElementById("lvlb").value=message.toString();


        }
        if(topic==="3EyLfoLCMSY8seG/temperatura"){
            document.getElementById("temperatura").innerHTML="Temperature: "+message.toString()+" C";
            document.getElementById("temp").value=message.toString();
        }
        })

        client.on('disconnect',function() {
            console.log("DesConectado");
        })
    }

    handleDesconexion(){
       window.location.reload(true);
    }

    handleChange (event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value,
        });
        console.log(this.state.tema);

    };

    render(){
        return(

            <div >
                <div id="conexion" className="form">
                    <div id="id_form">
                        <div className="row">
                        <div className="text">
                        <text >Broker</text>
                         </div>
                        <div >
                        <input required="true" value={this.state.broker} name="broker" onChange={this.handleChange} type="text"></input>
                        </div>        
                        </div>
                        <div className="row">
                        <div className="text">
                        <text  >Port SW</text>
                    </div>
                    <div>
                    <input required="true" value={this.state.port} name="port" onChange={this.handleChange} type="text"></input>

                    </div>
                            
                            </div>
                         <div className="row">
                    <div className="text">
                        <text >User</text>
                    </div>
                    <div >
                    <input required="true" type="text" value={this.state.user} name="user" onChange={this.handleChange}></input>

                    </div>                        
                            </div>
                        <div className="row">
                    <div className="text">
                        <text >Password</text>
                    </div>
                    <div className="inpt">
                    <input required="true" type="password"value={this.state.passwd} name="passwd"  onChange={this.handleChange}></input>

                    </div>        
                    </div>
                        <div className="row">
                    <div className="text">
                        <text ></text>
                    </div>
                    <div className="inpt">
                    <button className="boton" onClick={this.handleConnect}>Conectarse</button>

                    </div>        
                    </div>
                    </div>
                    <div id="desconexion" className="ocultar" >
                    <div >
                        <button className="boton" onClick={this.handleDesconexion}>Desconectarse</button>
                    </div>
                    <div className="text">
                        <div className="disconect" id="con"></div>
                        <text>Subscribe to topic</text>
                        <input type="text" value={this.state.tema} name="tema" onChange={this.handleChange}></input>
                    </div>
                    <div className="inpt">
                        <button className="boton" onClick={this.handleSuscribe}>Suscribirse</button>
                    </div>
                    
                    </div>
                </div>
                <div className="row slidera">
                <div id="silou" className="col-md-4 ocultar">
                <div className="textd">
                    <text id="nivela">nivel</text>
                </div>
                <div className="slider">
                    <progress  max="100" className="progrees"  value={0} id="lvla" />
                </div>
                </div>
                <div id="silod" className="col-md-4 ocultar">
                <div className="textd">
                        <text  id="temperatura">nivel</text>
                    </div>
                <div className="slider">
                    <progress max="100" className="progrees" id="temp" value={0}/>
                </div>
                </div>
                <div id="temper" className="col-md-4 ocultar" >
                    <div className="textd">
                        <text id="nivelb" >nivel</text>
                    </div>
                    <div className="slider">
                        <progress  max="100" className="progrees"  value={0} id="lvlb" />
                    </div>
                </div>
             </div>
            <hr/>
        </div>
  	  )
    }
}
export default Silos;