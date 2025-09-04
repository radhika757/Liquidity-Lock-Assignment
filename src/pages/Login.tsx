import { LoginForm } from "../components/LoginForm"
import { Container, Box, Typography, Stack } from "@mui/material"

export function Login() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={4} sx={{ width: "100%" }}>
          <Box textAlign="center">
            <Typography variant="h4" component="h1" fontWeight="bold">
              Data Graph Studio
            </Typography>
            <Typography variant="body1" color="text.secondary" mt={1}>
              Sign in to access your interactive graphs
            </Typography>
          </Box>
          <LoginForm />
        </Stack>
      </Box>
    </Container>
  )
}
