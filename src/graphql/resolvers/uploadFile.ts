const path = require('path');
const fs = require('fs');

module.exports = {
    Query: {
      hello: () => {
        return 'Hello world!';
      }
    },

    Mutation: {
        singleUpload: async (_:void, args:{file:{file:any}}) => {
          const {createReadStream, filename, mimetype, encoding} = await args.file.file;
          const stream = createReadStream();
          const filePath = path.join(__dirname, `../../../client/public/images/${filename}`);
          await stream.pipe(fs.createWriteStream(filePath));        
        
          return { 
            url: `http://localhost:5000/images/${filename}`,
          };
        },
}
}