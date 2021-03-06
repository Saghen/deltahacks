const fs = require('fs')
const path = require('path')
const { generateKeyPairSync } = require('crypto')

async function generateKey() {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519', {})
  const config = {
    auth: {
      publicKey: publicKey.export({ type: 'spki', format: 'pem' }),
      privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }),
    },
  }

  fs.writeFileSync(path.join(__dirname, '../public/configs/key.json'), JSON.stringify(config))
}

// Async function necessary because cant use TLA in CJS files
// and IIFs are gross lol
generateKey()
