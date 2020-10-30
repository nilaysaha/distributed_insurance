const Secp256k1KeyPair = require('secp256k1-key-pair');
const EcdsaSepc256k1Signature2019 = require('ecdsa-secp256k1-signature-2019');

async function getSuite(id, controller) {
    const keyPair = await Secp256k1KeyPair.generate();

//    console.log(keyPair)

    keyPair.id = id
    keyPair.controller = controller

    // keyPair.id = 'https://example.edu/issuers/keys/1'; // See Key ID section
    // keyPair.controller = 'https://example.com/i/carol'; // See Controller Document section
    
    const suite = new EcdsaSepc256k1Signature2019({
	verificationMethod: keyPair.id,
	key: keyPair
    });

  //  console.log(suite)
    return suite
}

module.exports = {
    getSuite: getSuite
}
