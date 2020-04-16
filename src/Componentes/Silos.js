import React from 'react';
import './silos.css';

class Silos extends React.Component{
    
    mqtt = require('react-mqtt')
    
    options = {
      useSSL: true,
      userName: "username",
      password: "password",
      onSuccess:onConnect,
      onFailure:doFail
    }
    client = mqtt.connect("ioticos.org",this.options)
    client.on("connect",functioname(params) {
        
    })
    
    handleChange() {
        console.log('Change');
    }

    Connexion(){
        console.log("connect");
        client.subscribe("3yjQwQaYClIfMrv/nivela")
        client.subscribe("3yjQwQaYClIfMrv/nivelb")
        client.subscribe("3yjQwQaYClIfMrv/temperatura")
    }

    MessageArrived(msg){
        console.log("onMessageArrived: "+msg.payloadString);
    }


    render(){
        return(

            <div className="container">
            <div className="row">
                <div className="col-md-4 image">
                <div className="slider">
                    <progress  max="33" className="progrees bajo"  value={33} />
                    <progress  max="33" className="progrees normal"  value={0}/>
                    <progress  max="34" className="progrees peligroso" value={0}/>
                </div>
                </div>
                <div className="col-md-4 cal">
                <div className="slider">
                    <progress  max="33" className="progrees bajo"  value={0} />
                    <progress  max="33" className="progrees normal"  value={0}/>
                    <progress  max="34" className="progrees peligroso" value={0}/>
                </div>
                </div>
                <div className="col-md-4 image">
                <div className="slider">
                    <progress  max="33" className="progrees bajo"  value={0} />
                    <progress  max="33" className="progrees normal"  value={0}/>
                    <progress  max="34" className="progrees peligroso" value={0}/>
                </div>
                </div>
             </div>
            <hr/>
        </div>
  	  )
    }
}
export default Silos;