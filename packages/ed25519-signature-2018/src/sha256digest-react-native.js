/*
 * Copyright (c) 2021 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const crypto = require('isomorphic-webcrypto');
require('fast-text-encoding');

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
            await crypto.subtle.digest({name: 'SHA-256'}, bytes)
        );
    }
};
