"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPLOAD_IMAGE = void 0;
const client_1 = require("@apollo/client");
const UPLOAD_IMAGE = (0, client_1.gql) `
    mutation singleUpload($file: upload!) {
  singleUpload(file: $file) {
    url
  }
}
`;
exports.UPLOAD_IMAGE = UPLOAD_IMAGE;
