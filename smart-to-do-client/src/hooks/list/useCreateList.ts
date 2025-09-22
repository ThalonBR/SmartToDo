"use-client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ICreateList, IList } from "@/lib/types/list.types"

export function useCreateList() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (formData: ICreateList) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/list`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Failed to create list")
      }
      const data: IList = await response.json()
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-lists"],
      })
    },
  })
}
