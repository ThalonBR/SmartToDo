import {IList} from "@/lib/types/list.types"
import {useQuery} from "@tanstack/react-query"

export function useGetList() {
  return useQuery({
    queryKey: ["get-lists"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/list`, {
        method: "GET",
      })
      const data: IList[] = await response.json()
      return data
    },
  })
}
