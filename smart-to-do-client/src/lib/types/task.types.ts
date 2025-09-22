import { IList } from "./list.types"

export interface ITask {
    id: string
    title: string
    order: number
    isCompleted: boolean
    createdAt: string
}

export interface ICreateTask {
    title: string
}

export interface ICreateAITask {
    prompt: string
    apiKey: string
}

export interface ITaskWithListData extends ITask {
    list: IList
}