export interface IAIModelResponse {
    id?: string;
    choices?: {
        message?: {
            role?: string;
            content?: string;
        }
    }[]
}