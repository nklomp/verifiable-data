import { getSuite } from '../getSuite';

import customDocumentLoader from '../customDocumentLoader';

import {
  BbsBlsSignatureProof2020,
  deriveProof,
} from '@mattrglobal/jsonld-signatures-bbs';

export default (options: any) => {
  return (fastify: any) => {
    const documentLoader = customDocumentLoader(options);
    fastify.post(
      `/:${options.walletId}/presentations/prove`,
      {
        preValidation: options.hooks ? options.hooks.preValidation : [],
        // schema: {
        //   tags: ['Holder'],
        //   summary: 'provePresentation',
        //   description: 'Prove a Verifiable Presentation',
        //   response: {
        //     201: VerifiablePresentation,
        //   },
        // },
      },
      async (request: any, reply: any) => {
        const wallet = await fastify.wallet.get(
          request.params[options.walletId]
        );
        const k = wallet.contents.find((k: any) => {
          return k.id === request.body.options.verificationMethod;
        });
        if (!k) {
          throw new Error('verificationMethod not found.');
        }
        const suite = await getSuite(k);
        const vp = await wallet.createVerifiablePresentation({
          verifiableCredential: request.body.presentation.verifiableCredential,
          options: {
            holder: request.body.presentation.holder,
            domain: request.body.options.domain,
            challenge: request.body.options.challenge,
            suite,
            documentLoader,
          },
        });

        reply.status(201).send(vp);
      }
    );

    fastify.post(
      `/:${options.walletId}/credentials/derive`,
      {
        preValidation: options.hooks ? options.hooks.preValidation : [],
        // schema: {
        //   tags: ['Holder'],
        //   summary: 'deriveCredential',
        //   description: 'Derive a Verifiable Credential',
        //   response: {
        //     201: VerifiableCredential,
        //   },
        // },
      },
      async (request: any, reply: any) => {
        const wallet = await fastify.wallet.get(
          request.params[options.walletId]
        );
        const suite = new BbsBlsSignatureProof2020();
        const vc = await wallet.deriveCredential({
          verifiableCredential: request.body.verifiableCredential,
          frame: request.body.frame,
          options: {
            suite,
            deriveProof,
            documentLoader,
          },
        });
        reply.status(201).send(vc);
      }
    );
    return Promise.resolve(true);
  };
};
