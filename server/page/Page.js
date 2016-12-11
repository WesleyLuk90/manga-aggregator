import { Schema } from 'mongoose';

export default function createPage(connection) {
    return connection.model('Page', {
        pageHandle: new Schema({ url: { type: String, index: true } }),
        imageUrl: String,
        fileName: String,
    });
}


createPage.$name = 'Page';
createPage.$inject = ['connection'];
