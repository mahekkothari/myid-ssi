const agent = require('../config/veramo');

exports.createDID = async (req, res) => {
  try {
    const identifier = await agent.didManagerCreate();
    res.json(identifier);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.issueVC = async (req, res) => {
  const { subjectDID, name, university } = req.body;

  try {
    const issuer = await agent.didManagerGetOrCreate();
    const vc = await agent.createVerifiableCredential({
      credential: {
        issuer: { id: issuer.did },
        type: ['VerifiableCredential'],
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        issuanceDate: new Date().toISOString(),
        credentialSubject: {
          id: subjectDID,
          name,
          university,
          age, 
          QR_number, 
          output, 
        },
      },
      proofFormat: 'jwt',
    });
    res.json(vc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
