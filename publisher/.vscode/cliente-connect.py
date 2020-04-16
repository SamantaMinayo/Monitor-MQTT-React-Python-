import paho.mqtt.client as mqtt #import the client1
import time
from random import randint
############

host="ioticos.org" 
user="pKGeOCpyFia9Dhy"
psswd="5bJSp0QQKGvuIWM"
port=1883

def on_log(client, userdata, level, buf):
    print("log: "+buf)

def on_connect(client,userdata,flags,rc):
    if rc==0:
        print("Connect ok")
        client.subscribe("3EyLfoLCMSY8seG/nivel1")
        client.subscribe("3EyLfoLCMSY8seG/nivel2")
        client.subscribe("3EyLfoLCMSY8seG/temperatura")

    else:
        print("Bad connection Returned code=" , rc)

def on_message(client,userdata,msg):
    print(msg.payload.decode("utf-8"))

client = mqtt.Client() #create new instance
client.on_connect= on_connect
client.on_message=on_message

client.username_pw_set(user,psswd)
client.connect(host,port,60)

while True:
    time.sleep(5) # wait
    nivel_a=randint(1,100)
    nivel_b=randint(1,100)
    temperatura=randint(1,100)
    client.publish("3EyLfoLCMSY8seG/nivel1",nivel_a)
    client.publish("3EyLfoLCMSY8seG/nivel2",nivel_b)
    client.publish("3EyLfoLCMSY8seG/temperatura",temperatura)

    client.loop()
