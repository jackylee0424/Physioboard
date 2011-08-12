#!/usr/bin/env python
#
#  server.py
#
#  Original copy from tornado web server (facebook 2009)
#
#  Last updated by Jackie Lee on 08/12/11.
#
#

import logging
import tornado.httpserver
import tornado.ioloop
import tornado.websocket
import tornado.options
import tornado.web
import uuid

from tornado.options import define, options

# you'll need $ sudo python server.py to run this server on port 80
define("port", default=80, help="run on the given port", type=int)

class PhysioboardWebSocket(tornado.websocket.WebSocketHandler):
    waiters = set()
    cache=[]
    cache_size=200
    
    @classmethod
    def update_cache(cls, chat):
        cls.cache.append(chat)
        if len(cls.cache) > cls.cache_size:
            cls.cache = cls.cache[-cls.cache_size:]

    @classmethod
    def send_updates(cls, chat):
        logging.info("sending message to %d waiters", len(cls.waiters))
        for waiter in cls.waiters:
            try:
                waiter.write_message(chat)
            except:
                logging.error("Error sending message", exc_info=True)
                
    def open(self):
        PhysioboardWebSocket.waiters.add(self)
        print "WebSocket opened"

    def on_close(self):
        try:
            PhysioboardWebSocket.waiters.remove(self)
            print "WebSocket closed"
        except:
            print "Oops!"

    def on_message(self, message):
        logging.info("got message %r", message)
        parsed = tornado.escape.json_decode(message)
        chat = {
            "id": str(uuid.uuid4()),
            "ch_id":parsed["ch_id"],
            "body": parsed,
            }
        PhysioboardWebSocket.update_cache(chat)
        PhysioboardWebSocket.send_updates(chat)


class MainHandler(tornado.web.RequestHandler):
    def get(self):

        ## try to open multiple browser windows of this page, you will see the synchrounized page result.
        ## try to change the channel value in different windows
        
        self.write("""<html><head>
            <script src="http://code.jquery.com/jquery-1.6.2.min.js" type="text/javascript"></script>
            <script type="text/javascript">

            var ws = new WebSocket("ws://localhost:80/websocket");
            
            document.captureEvents(Event.MOUSEMOVE)
            document.onmousedown = getMouseXY;
            var tempX;
            var tempY;
            var ch_id = 100; //need to match the client side channel id (ch_id)
            
            function getMouseXY(e) {
                tempX = e.pageX;
                tempY = e.pageY;
                
                var uid = document.getElementById("UID").value;
                ch_id = document.getElementById("CH_ID").value;
                ws.send('{"uid":"'+uid+'","ch_id":'+ch_id+',"x":'+tempX+',"y":'+tempY+'}');
                return true;
            }

            ws.onopen = function() {
                   ws.send('{"ch_id":100,"uid":"n/a","x":0,"y":0}');
                };
            
            ws.onmessage = function (evt) {
                var r_data = JSON.parse(evt.data)
                if (r_data.ch_id==ch_id){
                    document.getElementById("update").innerHTML= r_data["body"].x+':'+evt.data;
                }
            };</script></head><body><input id="UID" value="guest"><input id="CH_ID" value="100"><div id="update">10</div><br></body></html>
            """)


def main():
    tornado.options.parse_command_line()
    application = tornado.web.Application([
        (r"/", MainHandler),
        (r"/websocket",PhysioboardWebSocket)
    ])
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()


if __name__ == "__main__":
    main()
