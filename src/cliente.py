import paho.mqtt.client as mqtt #import the client1
############
def on_log(client, userdata, level, buf):
    print("log: "+buf)
def on_connect(client,userdata,flags,rc):
    if rc==0:
        print("Connect ok")
        client.subscribe("3yjQwQaYClIfMrv/nivela")
        client.subscribe("3yjQwQaYClIfMrv/nivelb")
        client.subscribe("3yjQwQaYClIfMrv/temperatura")
    else:
        print("Bad connection Returned code=" , rc)

def on_message(client,userdata,msg):
    print(msg.payload.decode("utf-8"))

client = mqtt.Client() #create new instance
client.on_connect= on_connect
client.on_message=on_message

broker_address="ioticos.org" 
client.username_pw_set("4pDBJ8wUTc41cFp","l5muqCsgOxMFrq0")
client.connect(broker_address,1883,60)

while True:

    client.loop()
