import dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';
import { ModelResponse, Model } from '@/types/openapi';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || '';
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Model>
) {
  const { model } = req.body;
  const { data } : ModelResponse = await openai.retrieveModel(model);
  console.log(data);
  res.status(200).json(data)
}
