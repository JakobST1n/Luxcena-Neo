/**
 * Module that exports an instance of CertMon
 * see class definition to see what it does.
 *
 * Requires global var '__datadir' to be set.
 *
 * @author jakobst1n.
 * @since  14.16.2019
 */
 let logger = require(__basedir + "/src/logger");
 const fs = require("fs");
 const { execSync } = require("child_process");
 
var neoModules;

 /**
  * This checks if the server has a valid certificate, if not,
  * it will generate one.
  */
 class CertMon {
 
     constructor(configPath, certPath, httpsConfig) {
         this.certPath = __datadir + "/config/certs/";
 
         let valid = this.checkValidity();
         if (!valid) {
             logger.notice("No valid certificate found, creating one now.");
             this.generateCert();
         }
 
         let interval = setInterval(() => {
             let certIsValid = this.checkValidity();
             if (!valid) {
                 logger.crit("Certificate no longer valid, server should reboot to make a new one.");
             }
         }, 1440000);  // Run once every day
     }
 
     checkValidity() {
         let sslConfig = this.getConfig();
         if (!sslConfig["certMade"]) {
             logger.debug("'certMade' in config is false, assuming no valid certificate");
             return false;
         }
         let expire = ((sslConfig["certExpire"] - Date.now()) / 86400000).toFixed(2);
         if (expire > 0) {
             logger.debug(`Certificate should be valid for ${expire} more days.`);
         } else {
             expire = Math.abs(expire);
             logger.debug(`Certificate expired ${expire} days ago`);
             return false;
         }
         return true;
     }
 
     getConfig() {
        return neoModules.userData.config.SSLCert;
     }
 
     updateConfig(parameters) {
         neoModules.userData.config.set(parameters);
     }
 
     generateCert() {
         let certPath = this.certPath;
         let config = this.getConfig();

 
         // Create Root Certificate Autority
         let res = openssl(
             `genrsa ` +
             `-out "${certPath}/root-CA.key.pem" ` +
             `2048`
         );
 
         // Self sign the Root Certificate Autority
         res = openssl(
             `req ` +
             `-x509 ` +
             `-new ` +
             `-nodes ` +
             `-key "${certPath}/root-CA.key.pem" ` +
             `-days 1024 ` +
             `-out "${certPath}/root-CA.crt.pem" ` +
             `-subj "/C=NO/ST=Oslo/L=Oslo/O=Luxcena Neo Self-Signing Authority/CN=${config.CN}"`
         );
 
         // Create a Device Certificate for each domain,
         // such as example.com, *.example.com, awesome.example.com
         // NOTE: You MUST match CN to the domain name or ip address you want to use
         res = openssl(
             `genrsa ` +
             `-out "${certPath}/privkey.pem" ` +
             `2048`
         );
 
         // Create a request from your Device, which your Root CA will sign
         res = openssl(
             `req ` +
             `-new ` +
             `-key "${certPath}/privkey.pem" ` +
             `-out "${certPath}/csr.pem" ` +
             `-subj "/C=NO/ST=Oslo/L=Oslo/O=Luxcena Neo Self-Signing Autohity/CN=${config.CN}"`
         );
 
         // Sign the request from Device with your Root CA
         // -CAserial certs/ca/my-root-ca.srl
         res = openssl(
             `x509 ` +
             `-req ` +
             `-in "${certPath}/csr.pem" ` +
             `-CA "${certPath}/root-CA.crt.pem" ` +
             `-CAkey "${certPath}/root-CA.key.pem" ` +
             `-CAcreateserial ` +
             `-out "${certPath}/cert.pem" ` +
             `-days 500`
         );
 
         let creationDate = Date.now();
         config.certMade = true;
         config.certDate = creationDate;
         config.certExpire = creationDate + (500*86400000);
         config.certCN = config.CN;
 
         logger.info("Self-signed certificate created.");
 
     }
 
 }
 
function openssl(command) {
     try {
         let stdout = execSync("openssl " + command);
         return true
     } catch (e) {
         return false
     }
 }
 
module.exports = (_neoModules) => {
    neoModules = _neoModules;
    return new CertMon(); 
};
 