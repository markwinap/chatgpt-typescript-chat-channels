import dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';
import { ListModelsResponse, ListModels } from '@/types/openapi';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || '';
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListModels>
) {
  const { data } : ListModelsResponse = await openai.listModels();
  console.log(data);
  res.status(200).json(data)
}
