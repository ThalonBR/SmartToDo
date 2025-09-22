"use client"

import Link from "next/link"
import {Button} from "@/components/ui/button"
import {Card, CardContent} from "@/components/ui/card"
import {AlertTriangle, FileX, RefreshCw, ArrowLeft} from "lucide-react"
import {IErrorStateProps} from "@/lib/types/utils.type"

export function ErrorState({
  type = "generic",
  title,
  description,
  showRetry = false,
  showBackButton = true,
  onRetry,
  backUrl = "/",
}: IErrorStateProps) {
  const getErrorConfig = () => {
    switch (type) {
      case "not-found":
        return {
          icon: FileX,
          title: title || "Lista não encontrada",
          description:
            description ||
            "A lista que você está procurando não existe ou foi removida.",
          iconColor: "text-primary",
        }
      case "server":
        return {
          icon: AlertTriangle,
          title: title || "Erro no servidor",
          description:
            description ||
            "Ocorreu um erro interno no servidor. Tente novamente em alguns instantes.",
          iconColor: "text-yellow-500",
        }
      default:
        return {
          icon: AlertTriangle,
          title: title || "Algo deu errado",
          description:
            description || "Ocorreu um erro inesperado. Tente novamente",
          iconColor: "text-red-500",
        }
    }
  }

  const config = getErrorConfig()
  const IconComponent = config.icon

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Card className="w-full max-w-md border-border/50 bg-card/50">
            <CardContent className="flex flex-col items-center text-center p-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-full blur-xl"></div>
                <div className="relative bg-background/80 backdrop-blur-sm rounded-full p-4 border border-border/50">
                  <IconComponent className={`h-12 w-12 ${config.iconColor}`} />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-foreground mb-3 text-balance">
                {config.title}
              </h1>
              <p className="text-muted-foreground mb-8 text-pretty leading-relaxed">
                {config.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full">
                {showRetry && onRetry && (
                  <Button
                    onClick={onRetry}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Tentar novamente
                  </Button>
                )}

                {showBackButton && (
                  <Link
                    suppressHydrationWarning
                    href={backUrl}
                    className="flex-1"
                  >
                    <Button variant="outline" className="w-full bg-transparent">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Voltar
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
