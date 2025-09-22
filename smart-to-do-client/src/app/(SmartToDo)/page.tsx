"use client"

import {useState, useEffect} from "react"
import Link from "next/link"
import {CreateItemDialog} from "@/components/CreateListDialog"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Badge} from "@/components/ui/badge"
import {
  Calendar,
  ChevronRight,
  List,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react"
import {Input} from "@/components/ui/input"
import {IList} from "@/lib/types/list.types"
import {useGetList} from "@/hooks/list/useGetList"
import {AuroraText} from "@/components/ui/aurora-text"
import ComponentLoading from "@/components/ComponentLoading"
import {formatDateToRelativeDate} from "@/lib/utils/date.utils"
import {toast} from "sonner"

export default function ItemsPage() {
  const {
    data,
    isLoading: loading,
    isRefetching,
    isError,
    error,
    refetch,
  } = useGetList()
  const [filteredItems, setFilteredItems] = useState<IList[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredItems(data || [])
    } else {
      setFilteredItems(
        (data ?? []).filter((item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    }
  }, [data, searchQuery])

  if (loading || isRefetching) {
    return <ComponentLoading />
  }

  if (isError) {
    toast.error(`Erro ao carregar listas: ${(error as Error).message}`, {
      richColors: true,
      duration: 10000,
      description: "Por favor, tente novamente mais tarde.",
      action: {
        label: "Tentar novamente",
        onClick: () => {
          void refetch()
        },
      },
      actionButtonStyle: {backgroundColor: "red"},
    })
  }

  return (
    <div className="bg-gradient-to-br from-background via-background to-background/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 mb-8">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="relative p-8 sm:p-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/20 border border-primary/30">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    Smart Lists
                  </Badge>
                </div>
                <span className="text-4xl sm:text-5xl font-bold text-balance z-10 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Suas Listas Inteligentes
                </span>
                <p className="text-lg text-muted-foreground max-w-2xl text-pretty">
                  Organize, priorize e conquiste seus objetivos com o poder da{" "}
                  <AuroraText className="font-bold">
                    inteligência artificial
                  </AuroraText>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <CreateItemDialog />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 bg-primary/20 rounded-lg">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar nas suas listas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base bg-card/50 border-border/50  focus:bg-card focus:border-primary/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-primary/80 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-white">
                    {data?.length}
                  </p>
                  <p className="text-sm font-medium text-white">
                    Total de Listas
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
                  <List className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 bg-primary/80 border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-white">
                    {
                      data?.filter((item) => {
                        const today = new Date()
                        const itemDate = new Date(item.createdAt)
                        return itemDate.toDateString() === today.toDateString()
                      }).length
                    }
                  </p>
                  <p className="text-sm font-medium text-white">Criadas Hoje</p>
                </div>
                <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20 group-hover:bg-green-500/20 transition-colors">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {filteredItems.length === 0 ? (
          <Card className="border-dashed border-2 border-primary/50 bg-gradient-to-br from-card/30 to-transparent">
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 mb-6">
                <List className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-balance">
                {searchQuery
                  ? "Nenhuma lista encontrada"
                  : "Sua jornada começa aqui"}
              </h3>
              <p className="text-muted-foreground text-center text-lg mb-8 max-w-md text-pretty">
                {searchQuery
                  ? "Tente ajustar sua busca ou criar uma nova lista"
                  : "Transforme suas ideias em ação com listas inteligentes"}
              </p>
              {!searchQuery && <CreateItemDialog />}
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <Link suppressHydrationWarning key={item.id} href={`/${item.id}`}>
                <Card className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 border-primary/50 cursor-pointer overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />

                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          <Badge
                            variant="outline"
                            className="text-xs bg-primary/5 border-primary/20 text-primary"
                          >
                            Lista #{index + 1}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl font-bold text-balance group-hover:text-primary transition-colors leading-tight">
                          {item.title}
                        </CardTitle>
                      </div>
                      <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                        <ChevronRight className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="bg-muted/50 border-border/50 text-xs font-medium"
                        >
                          <Calendar className="h-3 w-3 mr-1.5" />
                          {formatDateToRelativeDate(item.createdAt)}
                        </Badge>
                      </div>
                      <div className="text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                        Explorar →
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
