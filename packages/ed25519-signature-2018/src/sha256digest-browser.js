/*
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
/* eslint-env browser */
'use strict';
const crypto = self && (self.crypto || self.msCrypto);

module.exports = {
    /**
     * Hashes a string of data using SHA-256.
     *
     * @param {any} input - the string to hash.
     *
     * @return {Uint8Array} the hash digest.
     */
    async sha256digest(input) {
        const bytes = new TextEncoder().encode(input);
        return new Uint8Array(
            await crypto.subtle.digest('SHA-256', bytes)
        );
    }
};
