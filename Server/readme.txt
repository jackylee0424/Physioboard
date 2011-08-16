instruction for setting up a server on amazon ec2,
let me know if you got stuck, email me- jackylee at media.mit.edu

steps:
1. have an amazon ec2 account
2. choose ami-06ad526f
3. generate your own .pem key file, put it in a folder
4. in terminal, do $ chmod 400 your.pem
5. in AWS management console -> network security -> security groups
   in default -> inbound -> add ssh (port 22) and http (port 80)
6. ssh -i your.pem ubuntu@ec2-your-public-dns.amazonaws.com (if u got time-out, check the last step.)
7. $ sudo apt-get update
8. $ sudo apt-get install git
9. download the source, $ git clone git://github.com/jackylee0424/Physioboard.git physioboard-read-only
10. run the server, $ sudo python server.py
11. for production, you need to run the server in the background, do $ sudo nohup python server.py & >/dev/null 2>&1
