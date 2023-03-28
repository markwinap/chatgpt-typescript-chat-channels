import dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';
import { ChatCompletionResponse, ChatCompletion } from '@/types/openapi';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY || '';
const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ChatCompletion>
) {
  const { model, message } = req.body;
  const params : CreateChatCompletionRequest = {
    model,
    messages: [{ role: 'user', content: message }],
  };
  const { data } : ChatCompletionResponse = await openai.createChatCompletion(params);
  console.log(data);
  res.status(200).json(data)
}
