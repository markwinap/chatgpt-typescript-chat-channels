import dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, CreateFineTuneRequest, OpenAIApi } from 'openai';
import { FineTuneResponse, FineTune } from '@/types/openapi';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || '';
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FineTune>
) {
  const { model, fileId } = req.body;
  const params : CreateFineTuneRequest = {
    model,
    training_file: fileId,
  };
  const { data } : FineTuneResponse = await openai.createFineTune(params);
  console.log(data);

  res.status(200).json(data)
}
