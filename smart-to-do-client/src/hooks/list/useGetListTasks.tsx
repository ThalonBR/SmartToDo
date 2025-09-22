import {IListWithTasks} from "@/lib/types/list.types"
import {useQuery} from "@tanstack/react-query"

export function useGetListTasks(listId: string) {
  return useQuery({
    queryKey: ["get-list-tasks", listId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/list/${listId}`,
        {
          method: "GET",
        }
      )
      if (!response.ok) {
        const errorInfo = await response.json()
        const error = new Error(
          "An error occurred while fetching the list tasks."
        )
        // @ts-ignore
        error.status = response.status
        // @ts-ignore
        error.info = errorInfo
        throw error
      }
      const data: IListWithTasks = await response.json()
      return data
    },
  })
}
