import formidable from 'formidable';
import fs from 'fs';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadBook = async (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing the files' });
    }

    const { title } = fields;
    const file = files.book;

    // Move the file to the uploads directory
    const data = fs.readFileSync(file.filepath);
    const filePath = `uploads/${file.originalFilename}`;
    fs.writeFileSync(filePath, data);

    // Save book info to MongoDB
    const client = new MongoClient(uri);
    await client.connect();
    const database = client.db('e-reader');
    const books = database.collection('books');

    await books.insertOne({ title, filePath });
    await client.close();

    res.status(200).json({ message: 'File uploaded successfully', title, filePath });
  });
};

export default uploadBook;
