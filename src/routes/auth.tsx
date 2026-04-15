import PublicRoute from '@/guards/public-route';
import AuthLayout from '@/layouts/auth-layout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: () => (
    <PublicRoute>
      <AuthLayout />
    </PublicRoute>
  )
});
