import React from 'react';
import './silos.css';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dps =[{x:0,y:0}]
var xVal = dps.length;
var yVal=100;
var dpsuno =[{x:0,y:0}]
var xValuno = dps.length;
var yValuno=100;
var dpsdos =[{x:0,y:0}]
var xValdos = dps.length;
var yValdos=100;
var updateInterval=1000;

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
          port:'',
        };
        this.handleChange= this.handleChange.bind(this);
        this.handleConnect= this.handleConnect.bind(this);
        this.handleSuscribe= this.handleSuscribe.bind(this);
		this.updateChart = this.updateChart.bind(this);

    }
    componentDidMount() {
		setInterval(this.updateChart, updateInterval);
	}
	updateChart() {
//		yVal = yVal +  Math.round(5 + Math.random() *(-5-5));
//		dps.push({x: xVal,y: yVal});
//		xVal++;
		if (dps.length >  10 ) {
			dps.shift();
        }
        if (dpsuno.length >  10 ) {
			dpsuno.shift();
        }
        if (dpsdos.length >  10 ) {
			dpsdos.shift();
		}
        this.chart.render();
		this.chartuno.render();
		this.chartdos.render();
        

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
            document.getElementById("desconexion").className="tamanio"
            document.getElementById("monitorin").className="image"
         
            //client.subscribe("3EyLfoLCMSY8seG/temperatura")
        })
        
    }

    handleSuscribe(){
        
        client.subscribe(this.state.tema);


        client.on('message', function (topic, message) {
            console.log(topic+":"+message)
            if(topic.toString()==="3EyLfoLCMSY8seG/nivel1"){
                document.getElementById("nivela").innerHTML="Level A: "+message.toString()+" %";
                document.getElementById("lvla").value=message.toString();
                yValuno = parseInt(message.toString());
                dpsuno.push({x: xValuno,y: yValuno});
                xValuno++;    
                console.log("temperatura"+xValuno)
            }else if(topic.toString()==="3EyLfoLCMSY8seG/nivel2"){
                document.getElementById("nivelb").innerHTML="Level B: "+ message.toString()+" %";
                document.getElementById("lvlb").value=message.toString();
                yValdos = parseInt(message.toString());
                dpsdos.push({x: xValdos,y: yValdos});
                xValdos++;
            }else if(topic.toString()==="3EyLfoLCMSY8seG/temperatura"){
            
                document.getElementById("temperatura").innerHTML="Temperature: "+message.toString()+" C";
                document.getElementById("temp").value=message.toString();
                yVal = parseInt(message.toString());
                dps.push({x: xVal,y: yVal});
                console.log(dps)
                xVal++;
            //this.chart.render();
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
    renderfdghj() {
		const options = {
			title :{
				text: "Dynamic Line Chart"
			},
			data: [{
				type: "line",
				dataPoints : dps
			}]
		}
		
		return (
		<div>
			<h1>React Dynamic Line Chart</h1>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
    render(){

        const options = {
			title :{
				text: "Temperatura"
			},
			data: [{
				type: "line",
				dataPoints : dps
			}]
        }
        const optionsuno = {
			title :{
				text: "Silo 1"
			},
			data: [{
				type: "line",
				dataPoints : dpsuno
			}]
        }
        const optionsdos = {
			title :{
				text: "Silo 2"
			},
			data: [{
				type: "line",
				dataPoints : dpsdos
			}]
		}
        return(
        <>
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
                <div id="monitorin" className="ocultar">
                <h2>Silo A Level</h2>
                <div className="row slidera">

                <div id="silou" className="col-md-6 prog">
                <div className="textd">
                    <text id="nivela">nivel</text>
                </div>
                <div className="slider">
                    <progress  max="100" className="progrees"  value={0} id="lvla" />
                </div>
                </div>

                <div id="siloua" className="col-md-6">
                <CanvasJSChart options = {optionsuno} 
                    onRef={ref => this.chartuno = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
                
		        </div>
                </div>
                <h2>Silo B Level</h2>

                <div className="row slidera">
                <div id="silod" className="col-md-6 prog">
                <div className="textd">
                        <text  id="temperatura">nivel</text>
                    </div>
                <div className="slider">
                    <progress max="100" className="progrees" id="lvlb" value={0}/>
                </div>
                </div>

                <div id="siloda" className="col-md-6">
                <CanvasJSChart options = {optionsdos} 
                    onRef={ref => this.chartdos = ref}
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		    </div>

                </div>
                <h2>Temperatura</h2>

                <div className="row slidera">
                    <div id="temper" className="col-md-6 prog " >
                    <div className="textd">
                        <text id="nivelb" >nivel</text>
                    </div>
                    <div className="slider">
                        <progress  max="100" className="progrees"  value={0} id="temp" />
                    </div>
                    </div>

                    <div id="tempera" className="col-md-6 ">
                    <CanvasJSChart options = {options} 
                        onRef={ref => this.chart = ref}
                    />
                    {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		            </div>
                </div>
             
                </div>
            <hr/>
        </div>
        </>
  	  )
    }
}
export default Silos;