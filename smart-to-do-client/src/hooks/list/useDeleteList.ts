"use-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeleteList(id: string) {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/list/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (!response.ok) {
                throw new Error("Failed to delete list")
            }

        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["get-lists"],
            })
        },
    })
}
