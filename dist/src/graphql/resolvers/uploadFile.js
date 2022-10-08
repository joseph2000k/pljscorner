"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path = require('path');
const fs = require('fs');
module.exports = {
    Query: {
        hello: () => {
            return 'Hello world!';
        }
    },
    Mutation: {
        singleUpload: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { createReadStream, filename, mimetype, encoding } = yield args.file.file;
            const stream = createReadStream();
            const filePath = path.join(__dirname, `../../../client/public/images/${filename}`);
            yield stream.pipe(fs.createWriteStream(filePath));
            return {
                url: `http://localhost:5000/images/${filename}`,
            };
        }),
    }
};
