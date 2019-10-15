<div id="diagram">
Client->Server: Establish connection
Note over Client: Generate keypair
Client->Server: Clients public key
Server->Client: Servers public key
Note over Client, Server: Connection established
Client->Server: Send hello
Server->Client: Answer hello
Note over Client, Server: Both ends now have a public key\n they know works for communication
Client->Server: Username and password
Server->Client: Token if correct

</div>
