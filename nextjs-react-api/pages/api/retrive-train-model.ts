import dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai';
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
  const { fineTuneId } = req.body;
  const { data } : FineTuneResponse = await openai.retrieveFineTune(fineTuneId);
  console.log(data);

  res.status(200).json(data)
}
