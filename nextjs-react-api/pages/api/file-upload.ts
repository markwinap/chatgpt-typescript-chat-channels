import fs from 'fs';
import { Configuration, OpenAIApi } from 'openai';
import HttpStatus from 'http-status-codes'
import middleware from '../../middleware/middleware'
import nextConnect from 'next-connect';
import { FileUploadResponse } from '@/types/openapi';

const handler = nextConnect();
handler.use(middleware);

const apiKey = process.env.OPENAI_API_KEY || '';
console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

handler.post(async (req, res) => {
  try {
    const files = req.files
    const body = req.body

    const filepath = files.file.filepath;
    const file = fs.createReadStream(filepath);
    const { data }: FileUploadResponse = await openai.createFile(file, 'fine-tune')
    console.log(data);

    res.status(HttpStatus.OK).json(data);
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
}

export default handler;
