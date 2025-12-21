import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Join VivaFemini and start your wellness journey today
          </p>
        </div>
        
        <div className="mt-8 rounded-2xl bg-white p-8 shadow-xl ring-1 ring-gray-200">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
