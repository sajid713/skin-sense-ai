import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AuthData {
    email: string;
    password: string;
};

interface SignUp extends AuthData {
    name: string;
}


export function useSignUp() {
    const router = useRouter();

    return useMutation({
        mutationKey: ["use-sign-up"],
        mutationFn: async (data: SignUp) => {
            const { data: _data, error } = await authClient.signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
            });
            if (error) throw error;
            return _data;
        },
        onSuccess: () => {
            toast.success("Signed up successfully");
            router.replace("/scans");
        },
        onError: (error: any) => {
            toast.error(error.message || "Error in signing up");
        },
    });
}

export function useSignIn() {
    const router = useRouter();

    return useMutation({
        mutationKey: ["use-sign-in"],
        mutationFn: async (data: AuthData) => {
            const { data: _data, error } = await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });
            if (error) throw error;
            return _data;
        },
        onSuccess: () => {
            toast.success("Logged in successfully");
            router.replace("/scans");
        },
        onError: (error: any) => {
            toast.error(error.message || "Error in signing in");
        },
    });
}

export function useSignOut() {
    const router = useRouter();

    return useMutation({
        mutationKey: ["use-sign-out"],
        mutationFn: async () => {
            const { error } = await authClient.signOut();
            if (error) throw error;
        },
        onSuccess: () => {
            toast.success("Logged out successfully");
            router.replace("/login");
        },
        onError: (error: any) => {
            toast.error(error.message || "Error in signing out");
        },
    });
}
