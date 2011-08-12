#!/usr/bin/env python
#
#
#  simple.py
#
#  This is an example of sending data to server via websocket.
#
#  Last updated by Jackie Lee on 08/12/11.
#
#

import websocket
import random
import time

print "Initiating..."

# you need to put your server ip or domain name here
ws = websocket.create_connection("ws://localhost:80/websocket")

while 1:

    #
    # this for-loop will keep sending random data to the server
    # you should be able to see your iOS app getting these data in real time
    #
    
    time.sleep(.3)
    simple_data_1 = 2+random.random()
    
    try:
        ws.send('{"clientType":"iCalm","ch_id":100,"uid":"simple1","x":0,"y":'+str(simple_data_1)+'}')
        print "sending...simple1: "+str(simple_data_1)
    except:
        print "can't reach websocket host"

        
    time.sleep(.3)
    simple_data_2 = 3+random.random()*2.0

    try:
        ws.send('{"clientType":"python","ch_id":100,"uid":"simple2","x":0,"y":'+str(simple_data_2)+'}')
        print "sending...simple2: "+str(simple_data_2)
    except:
        print "can't reach websocket host"

ws.close()
		
