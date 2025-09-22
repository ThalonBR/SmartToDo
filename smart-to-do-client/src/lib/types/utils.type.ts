export interface IErrorStateProps {
    type?: "not-found" | "server" | "generic"
    title?: string
    description?: string
    showRetry?: boolean
    showBackButton?: boolean
    showHomeButton?: boolean
    onRetry?: () => void
    backUrl?: string
}