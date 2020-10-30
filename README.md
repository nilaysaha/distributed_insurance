# distributed_insurance

This repository is an effort to create a customized verifiable Claim for an insurance company.
It relies on the schema document src/cc_test.json and the sample document creator src/test_v2.js

To execute this repo, follow these steps:

- Clone this repo.
- npm install
-  cd src
- node test_v2.js

The output is a set of contracts which can be commited to immutable ledger.

Sample output:
```
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "did:test:context:foo"
  ],
  "id": "https://example.com/credentials/1872",
  "type": [
    "VerifiableCredential",
    "InsurancePolicyCredential"
  ],
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
    }
  },
  "proof": {
    "type": "EcdsaSecp256k1Signature2019",
    "created": "2020-10-30T19:10:25Z",
    "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..MEYCIQCx6c0G7CbMpgd8q9T4l14ASW0RAjXXOB9yv4ceDRi7cAIhAKaPFuO9Ht1JGtzTgWyVLlCbzXhOL3ip50LWRdFbd4QH",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://example.edu/issuers/keys/1"
  }
}

{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "did:test:context:foo"
  ],
  "id": "https://example.com/credentials/1872",
  "type": [
    "VerifiableCredential",
    "InsuranceClaimCredential"
  ],
  "issuer": "https://example.edu/issuers/565049",
  "issuanceDate": "2010-01-01T19:23:24Z",
  "credentialSubject": {
    "id": "did:example:edfdb1f342abc6g1c276e15ec22",
    "InsuranceClaim": {
      "id": "e0bf54ee-0dfe-4baf-adb8-ef28f6886adb",
      "type": "InsuranceclaimPolicy",
      "relatedPolicy": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21"
      },
      "claimAmount": 20000,
      "claimCurrency": "USD",
      "hostpitalAddress": {
        "name": "Kaizer hospital",
        "city": "Munich",
        "postcode": "108116",
        "street": "Herzog Heinrich strasse 41"
      }
    }
  },
  "proof": {
    "type": "EcdsaSecp256k1Signature2019",
    "created": "2020-10-30T19:10:25Z",
    "jws": "eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..MEUCIQC7rYY3SlnWeqzQgVa6eiQHzJyMfWcB0LqEo31Zk1dtdAIgAbou5u4nT0WAzW2MrZejjAjQfRh-4FKqYdJR8WrG4hs",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://example.edu/issuers/keys/1"
  }
}
```