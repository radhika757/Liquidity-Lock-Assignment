import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { Button, Card, CardContent, CardHeader, Typography, Input, FormLabel } from "@mui/material"



export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication - in real app, this would call an API
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true")
      navigate("/dashboard")
    }, 1000)
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader
        title={<Typography variant="h5">Login</Typography>}
        subheader={<Typography variant="body2">Enter your credentials</Typography>}
      />
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <FormLabel htmlFor="email" className="text-card-foreground">
              Email
            </FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-input border-border text-foreground"
            />
          </div>
          <div className="space-y-2">
            <FormLabel htmlFor="password" className="text-card-foreground">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-input border-border text-foreground"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
