import { Injectable } from '@nestjs/common';
import { TaskService } from '../tasks/task.service';
import { HttpClientWrapper } from 'src/providers/http-client-wrapper';
import { IAIModelResponse } from './ai.model';
import { GenerateTasksDto } from './dto/generate-tasks.dto';

@Injectable()
export class AiService {

    constructor(
        private readonly taskService: TaskService,
        private readonly http: HttpClientWrapper
    ) { }

    private async callProviderRaw(props: GenerateTasksDto): Promise<string> {
        const data = await this.http.request<IAIModelResponse>(
            'POST',
            `${process.env.LLM_BASE_URL}`,
            {
                headers: {
                    Authorization: `Bearer ${props.apiKey}`,
                },
                body: {
                    model: process.env.LLM_MODEL,
                    messages: [{
                        role: 'user', content: `
                        Você é um planejador especialista em produtividade. Sua tarefa é analisar o contexto a seguir e gerar uma lista completa e bem estruturada de tarefas práticas, claras e acionáveis para atingir o objetivo descrito.

                        Regras obrigatórias:
                        - Considere dependências lógicas e a melhor ordem de execução das tarefas.
                        - Pense em prioridades: comece por tarefas críticas ou que desbloqueiam outras.
                        - Divida atividades grandes em passos menores e objetivos.
                        - As tarefas devem ser escritas de forma simples, direta e em português.
                        Contexto fornecido pelo usuário:
                        ${props.prompt}
                        ` }],
                    response_format: {
                        type: "json_schema",
                        json_schema: {
                            name: "task_list",
                            strict: true,
                            schema: {
                                type: "object",
                                properties: {
                                    tasks: {
                                        type: "array",
                                        items: {
                                            type: "object",
                                            properties: {
                                                title: {
                                                    type: "string",
                                                    description: "A task title"
                                                }
                                            },
                                            required: ["title"],
                                            additionalProperties: false
                                        }
                                    }
                                },
                                required: ["tasks"],
                                additionalProperties: false
                            }
                        }
                    }
                }
            }
        );


        return data.choices?.[0]?.message?.content || '';
    }

    private parseTasksFromText(text: string): string[] {
        return JSON.parse(text).tasks.map((t: { title: string }) => t.title);
    }

    public async generateTasksForList(dto: GenerateTasksDto, listId: string) {
        const raw = await this.callProviderRaw(dto);
        const titles = this.parseTasksFromText(raw);
        const lastTask = await this.taskService.getLastTaskOfList(listId);
        const startOrder = lastTask ? lastTask.order + 1 : 1;

        const tasksToSave = titles.map((title, index) => ({
            title,
            order: startOrder + index,
        }));

        return await this.taskService.insertGeneratedForList(listId, tasksToSave);
    }
}