import dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, CreateCompletionRequest, OpenAIApi } from 'openai';
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
  const { model, message } = req.body;

  const params : CreateCompletionRequest = {
    model,
    prompt: message,
    temperature: 0.9,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  };

  const { data } : FineTuneResponse = await openai.createCompletion(params);
  console.log(data);
  res.status(200).json(data)
}
