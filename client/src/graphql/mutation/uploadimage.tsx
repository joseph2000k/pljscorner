import {gql} from '@apollo/client';

const UPLOAD_IMAGE = gql`
    mutation singleUpload($file: upload!) {
  singleUpload(file: $file) {
    url
  }
}
`;

export {UPLOAD_IMAGE};