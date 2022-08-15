const path = require('path');
const fs = require('fs');

module.exports = {
    Mutation: {
        singleUpload: async (_:void, { file }: any) => {
          const { createReadStream, filename, mimetype, encoding } = await file;
    
          // Invoking the `createReadStream` will return a Readable Stream.
          // See https://nodejs.org/api/stream.html#stream_readable_streams
          const stream = createReadStream();
    
          // This is purely for demonstration purposes and will overwrite the
          // local-file-output.txt in the current working directory on EACH upload.
         const filePath = path.join(__dirname, '../../../public/images', filename);
         await stream.pipe(fs.createWriteStream(filePath));
    
          return { 
            url: `/images/${filename}`,
          };
        },
}
}