import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Box,
} from "@mui/material"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("");
  const navigate = useNavigate()

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuthenticated", "true");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: "auto",
        mt: 8,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardHeader
        title={<Typography variant="h5">Welcome back</Typography>}
        subheader={
          <Typography variant="body2">
            Enter your credentials to access the dashboard
          </Typography>
        }
      />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isLoading}
            sx={{ mt: 2 }}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}
