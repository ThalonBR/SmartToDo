"use-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ICreateAITask, ITaskWithListData } from "@/lib/types/task.types"

export function useGenerateIATasks(id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (formData: ICreateAITask) => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/generate-tasks/${id}`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Failed to create task with AI")
            }
            const data: ITaskWithListData[] = await response.json()
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-list-tasks", id],

            })
        },
    })
}
