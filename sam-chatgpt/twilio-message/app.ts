import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Twilio from 'twilio';
import { Configuration, OpenAIApi } from 'openai';
import { logger } from './utils/logger';
import { Message } from './types/twilio';
import { ChatResponse } from './types/openai';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log(process.env.OPENAI_API_KEY);
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const twiml = new Twilio.twiml.MessagingResponse();
    const log = logger();
    const { body = '' } = event;
    log.info(body);
    try {
        const { Body }: Message = Object.fromEntries(new URLSearchParams(body || ''));
        log.info(Body);
        const { data, status }: ChatResponse = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: Body }],
        });
        if (status === 200) {
            const [choice] = data.choices;
            const content = choice.message.content;
            log.info(content);
            twiml.message(choice.message.content);
        } else {
            twiml.message('Error unable with OpenAI API. Please check the logs.');
        }
    } catch (err) {
        console.log(err);
        twiml.message('Service error. Please check the logs.');
    }
    return {
        headers: {
            'Content-Type': 'text/xml',
        },
        statusCode: 200,
        body: twiml.toString(),
    };
};
