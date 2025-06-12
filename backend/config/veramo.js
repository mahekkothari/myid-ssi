const { createAgent } = require('@veramo/core');
const { KeyManager } = require('@veramo/key-manager');
const { DIDManager } = require('@veramo/did-manager');
const { CredentialIssuer } = require('@veramo/credential-w3c');
const { EthrDIDProvider } = require('@veramo/did-provider-ethr');
const { KeyManagementSystem, MemoryPrivateKeyStore } = require('@veramo/kms-local');
const { DIDResolverPlugin } = require('@veramo/did-resolver');
const { getResolver } = require('ethr-did-resolver');

const agent = createAgent({
  plugins: [
    new KeyManager({
      store: new MemoryPrivateKeyStore(),
      kms: {
        local: new KeyManagementSystem(),
      },
    }),
    new DIDManager({
      store: new MemoryPrivateKeyStore(),
      defaultProvider: 'did:ethr:goerli',
      providers: {
        'did:ethr:goerli': new EthrDIDProvider({
          defaultKms: 'local',
          network: 'goerli',
          rpcUrl: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        }),
      },
    }),
    new CredentialIssuer(),
    new DIDResolverPlugin({
      resolver: getResolver({
        networks: [{ name: 'goerli', rpcUrl: `https://goerli.infura.io/v3/${process.env.INFURA_PROJECT_ID}` }],
      }),
    }),
  ],
});

module.exports = agent;
