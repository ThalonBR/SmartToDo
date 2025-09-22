import { ITask } from "./task.types"

export interface IList {
    id: string
    title: string
    createdAt: string
}

export interface ICreateList {
    title: string
}

export interface IUpdateList extends ICreateList { }

export interface IListWithTasks extends IList {
    tasks: ITask[]
}