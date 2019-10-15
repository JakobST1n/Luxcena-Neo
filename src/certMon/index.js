let logger = require(__basedir + "/src/logger");
const fs = require("fs");
const { execSync } = require("child_process");

class CertMon {

    constructor(configPath, certPath, httpsConfig) {
        this.certPath = __datadir + "config/certs/";
        this.httpsConfig = __datadir + "config/https.json";

        let valid = this.checkValidity();
        if (!valid) {
            logger.notice("No valid certificate found, creating one now.");
            this.generateCert();
        }

        let interval = setInterval(() => {
            let certIsValid = this.checkValidity();
            if (!valid) {
                logger.crit("Certificate no longer valid, server should reboot to make a new one.");
                //this.generateCert()
            }
        }, 1440000);  // Run once every day
    }

    checkValidity() {
        let sslConfig = this.getConfig();
        if ((!sslConfig["certMade"]) || (sslConfig["certExpire"] < (Date.now())) ) {
            return false;
        }
        return true;
    }

    getConfig() {
        let fullHTTPSConfig = JSON.parse(fs.readFileSync(this.httpsConfig));
        return {
            "CN": fullHTTPSConfig["CN"],
            "certMade": fullHTTPSConfig["certMade"],
            "certDate": fullHTTPSConfig["certDate"],
            "certExpire": fullHTTPSConfig["certExpire"],
            "certCN": fullHTTPSConfig["certCN"],
        }
    }

    updateConfig(parameters) {
        let fullHTTPSConfig = JSON.parse(fs.readFileSync(this.httpsConfig));
        for (let key in parameters) {
            if (parameters.hasOwnProperty(key)) {
                fullHTTPSConfig[key] = parameters[key];
            }
        }
        fs.writeFileSync(this.httpsConfig, JSON.stringify(fullHTTPSConfig));
    }

    generateCert() {
        let certPath = this.certPath
        let cn = this.getConfig()["CN"];

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
            `-subj "/C=NO/ST=Oslo/L=Oslo/O=Luxcena Neo Self-Signing Authority/CN=${cn}"`
        );

        // Create a Device Certificate for each domain,
        // such as example.com, *.example.com, awesome.example.com
        // NOTE: You MUST match CN to the domain name or ip address you want to use
        res = openssl(
            `genrsa ` +
            `-out "${certPath}/privkey.pem" ` +
            `2048`
        )

        // Create a request from your Device, which your Root CA will sign
        res = openssl(
            `req ` +
            `-new ` +
            `-key "${certPath}/privkey.pem" ` +
            `-out "${certPath}/csr.pem" ` +
            `-subj "/C=NO/ST=Oslo/L=Oslo/O=Luxcena Neo Self-Signing Autohity/CN=${cn}"`
        )

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
        )

        let creationDate = Date.now()
        this.updateConfig({
            "certMade": true,
            "certDate": creationDate,
            "certExpire": creationDate + (500*24*60*60),
            "certCN": cn
        });

        logger.info("Self-signed certificate created.");

    }

}

function openssl(command) {
    try {
        let stdout = execSync("openssl " + command)
        return true
    } catch (e) {
        return false
    }
}

module.exports = () => { return new CertMon(); };
