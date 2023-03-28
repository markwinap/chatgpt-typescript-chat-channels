export interface FineTuneResponse {
    data:           FineTune;
}

export interface FineTune {
    object:           string;
    id:               string;
    hyperparams:      Hyperparams;
    organization_id:  string;
    model:            string;
    training_files:   TrainingFile[];
    validation_files: any[];
    result_files:     any[];
    created_at:       number;
    updated_at:       number;
    status:           string;
    fine_tuned_model: null;
    events:           Event[];
}

export interface Event {
    object:     string;
    level:      string;
    message:    string;
    created_at: number;
}

export interface Hyperparams {
    n_epochs:                 number;
    batch_size:               null;
    prompt_loss_weight:       number;
    learning_rate_multiplier: null;
}

export interface TrainingFile {
    object:         string;
    id:             string;
    purpose:        string;
    filename:       string;
    bytes:          number;
    created_at:     number;
    status:         string;
    status_details: null;
}


export interface FileUploadResponse {
    data:           FineTune;
}

export interface FileUpload {
    object: string;
    id: string;
    purpose: string;
    filename: string;
    bytes: number;
    created_at: number;
    status: number;
    status_details: string | null;

}

export interface ChatCompletionResponse {
    data:           FineTune;
}


export interface ChatCompletion {
    id:      string;
    object:  string;
    created: number;
    model:   string;
    usage:   Usage;
    choices: Choice[];
}

export interface Choice {
    message:       Message;
    finish_reason: string;
    index:         number;
}

export interface Message {
    role:    string;
    content: string;
}

export interface Usage {
    prompt_tokens:     number;
    completion_tokens: number;
    total_tokens:      number;
}


export interface ListModelsResponse {
    data:           FineTune;
}

export interface ModelResponse {
    data:           Model;
}

export interface ListModels {
    object: string;
    data:   Model[];
}

export interface Model {
    id:         string;
    object:     DatumObject;
    created:    number;
    owned_by:   OwnedBy;
    permission: Permission[];
    root:       string;
    parent:     null | string;
}

export enum DatumObject {
    Model = "model",
}

export enum OwnedBy {
    Openai = "openai",
    OpenaiDev = "openai-dev",
    OpenaiInternal = "openai-internal",
    System = "system",
    UserBaqh3Anb7Dyl0Ntecmynv0Nh = "user-baqh3anb7dyl0ntecmynv0nh",
}

export interface Permission {
    id:                   string;
    object:               PermissionObject;
    created:              number;
    allow_create_engine:  boolean;
    allow_sampling:       boolean;
    allow_logprobs:       boolean;
    allow_search_indices: boolean;
    allow_view:           boolean;
    allow_fine_tuning:    boolean;
    organization:         Organization;
    group:                null;
    is_blocking:          boolean;
}

export enum PermissionObject {
    ModelPermission = "model_permission",
}

export enum Organization {
    Empty = "*",
    OrgOmES33WJgeP7K2OwKQelef52 = "org-omES33wJgeP7k2OwKQelef52",
}
