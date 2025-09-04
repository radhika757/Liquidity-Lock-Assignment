import { LoginForm } from "../components/LoginForm";


export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Data Graph Studio</h1>
          <p className="mt-2 text-muted-foreground">Sign in to access your interactive graphs</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
