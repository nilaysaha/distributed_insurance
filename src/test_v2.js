const ecl = require('jsonld-signatures')
const vc = require('vc-js');
const cc = require('./cc_test')
const kp = require("./generate_kp")

const documentLoader = ecl.extendContextLoader(async url => {
  if(url === 'did:test:context:foo') {
    return {
      contextUrl: null,
      documentUrl: url,
      document: cc
    };
  }
  return vc.defaultDocumentLoader(url);
});


// Sample unsigned credential
const insurance_policy_credential = () => {

    var z = {
	"@context": [
	    "https://www.w3.org/2018/credentials/v1",
	    "did:test:context:foo",
	],
	"id": "https://example.com/credentials/1872",
	"type": ["VerifiableCredential", "InsurancePolicyCredential"],
	"issuer": "https://example.edu/issuers/565049",
	"issuanceDate": "2010-01-01T19:23:24Z",
	"credentialSubject": {
	    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
	    "InsurancePolicy": {
		"id": "d41b9b68-17f9-474c-bac8-54bbe864cac3",
		"type": "premiumPolicy",
		"ownrisk": 250,
		"yearlyPremium": 12000,
		"address": {
		    "city": "Berlin",
		    "postcode": "14055",
		    "street": "Unter den linden 14"
		}
	    },
	}
    }
    return z
};

// Sample unsigned credential
const insurance_claim_credential = (insurance_did) => {

    var z = {
	"@context": [
	    "https://www.w3.org/2018/credentials/v1",
	    "did:test:context:foo",
	],
	"id": "https://example.com/credentials/1872",
	"type": ["VerifiableCredential", "InsuranceClaimCredential"],
	"issuer": "https://example.edu/issuers/565049",
	"issuanceDate": "2010-01-01T19:23:24Z",
	"credentialSubject": {
	    "id": "did:example:edfdb1f342abc6g1c276e15ec22",
	    "InsuranceClaim": {
		"id": "e0bf54ee-0dfe-4baf-adb8-ef28f6886adb",
		"type": "InsuranceclaimPolicy",		
		"relatedPolicy": {
		    "id": insurance_did,
		},
		"claimAmount": 20000,
		"claimCurrency":"USD",
		"hostpitalAddress": {
		    "name": "Kaizer hospital",
		    "city": "Munich",
		    "postcode": "108116",
		    "street": "Herzog Heinrich strasse 41"
		}
	     }
	}
    }
    return z
};


async function generateSignedVC() {
    try {
	var id = 'https://example.edu/issuers/keys/1'; // See Key ID section
	var controller = 'https://example.com/i/carol'; // See Controller Document section
	var suite = await kp.getSuite(id, controller)
	
	var pCredential = insurance_policy_credential()
	var iclaimCredential = insurance_claim_credential("did:example:ebfeb1f712ebc6f1c276e12ec21")
	
	const signedVC_pCreds = await vc.issue({credential:pCredential, suite, documentLoader});
	const signedVC_icCreds = await vc.issue({credential:iclaimCredential, suite, documentLoader});
	
	console.log(JSON.stringify(signedVC_pCreds, null, 2));
	console.log(JSON.stringify(signedVC_icCreds, null, 2));
    }
    catch (e) {
	console.error(e)
    } 
}


if (require.main === module) {
    (async () => {
	await generateSignedVC()
    })()
} else {
    console.log('required as a module');
}
