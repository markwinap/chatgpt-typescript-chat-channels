export interface ChatResponse {
    data: Data;
    status: number;
    statusText: string;
}

export interface Data {
    id: string;
    object: string;
    created: number;
    choices: Choice[];
    usage: Usage;
}

export interface Choice {
    index: number;
    message: Message;
    finish_reason: string;
}

export interface Message {
    role: string;
    content: string;
}

export interface Usage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
}
