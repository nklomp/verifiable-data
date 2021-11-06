import fs from 'fs';
import path from 'path';
const { generateKeyPair } = require('jose/util/generate_key_pair');
const { fromKeyLike } = require('jose/jwk/from_key_like');

import { sign, verify } from '../../__fixtures__/jose-help';
const privateKeyJwk = require('./__fixtures__/jose.privateKeyJwk.json');
describe('jose EdDSA', () => {
  it.skip('can generate key pair', async () => {
    const { privateKey } = await generateKeyPair('EdDSA');
    const privateKeyJwk = await fromKeyLike(privateKey);
    fs.writeFileSync(
      path.resolve(__dirname, './__fixtures__/jose.privateKeyJwk.json'),
      JSON.stringify(privateKeyJwk, null, 2)
    );
  });

  it('can sign and verify simple string', async () => {
    const header = {};
    const { payload } = require('./__fixtures__/simple-string-payload.json');
    const jws = await sign(header, payload, privateKeyJwk);
    const verified = await verify(jws, privateKeyJwk);
    expect(verified).toBe(true);
    fs.writeFileSync(
      path.resolve(__dirname, './__fixtures__/jose.simple-string-signed.json'),
      JSON.stringify({ jws }, null, 2)
    );
  });

  it('can sign and verify complex object', async () => {
    const header = {};
    const payload = require('./__fixtures__/complex-object-payload.json');
    const jws = await sign(header, payload, privateKeyJwk);
    const verified = await verify(jws, privateKeyJwk);
    expect(verified).toBe(true);
    fs.writeFileSync(
      path.resolve(__dirname, './__fixtures__/jose.complex-object-signed.json'),
      JSON.stringify({ jws }, null, 2)
    );
  });
});
