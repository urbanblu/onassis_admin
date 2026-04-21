"use client";

import CustomInputComponent from "@/components/custom-input-component";
import ToastService from "@/utils/toast-service";
import { Button, Form, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { redirect, useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/api/auth";
import useAuth from "@/stores/auth.store";
import { useEffect } from "react";

function LoginView() {
  const router = useRouter();
  const { auth, setAuth } = useAuth();

  const profileRequest = useMutation({
    mutationFn: AuthService.fetchProfile,
    onMutate: () => {},
    onError: (error) => {
      ToastService.error({ text: error?.message ?? "Unable to fetch profile" });
    },
    onSuccess: async (result) => {
      setAuth({ user: result!, access: auth!.access, refresh: auth!.refresh });
      router.replace("/sales");
      ToastService.success({ text: "Login Successful" });
    },
  });

  const loginRequest = useMutation({
    mutationFn: AuthService.login,
    onMutate: () => {},
    onSuccess: async (result) => {
      if (result) {
        setAuth({ user: undefined, ...result! });
        profileRequest.mutate();
      }
    },
    onError: (error) => {
      ToastService.error({ text: error?.message ?? "Unable to login" });
    },
  });

  useEffect(() => {
    if (auth) {
      redirect("/sales");
    }
  }, [auth]);

  return (
    <div className="w-screen h-screen">
      <div className="transition-all flex flex-col items-center justify-center w-full h-full px-5 sm:px-0">
        <Image
          src="/images/logo.png"
          alt="onassis-logo"
          className="mb-5"
          width={150}
          height={150}
        />
        <div className="transition-all py-12 px-8 sm:px-16 w-full sm:max-w-sm flex flex-col items-stretch justify-center gap-3 border border-black rounded-md">
          <Button
            className="w-full hover:bg-transparent text-xs border-black rounded-none py-6"
            variant="outline"
            onClick={() =>
              ToastService.info({ text: "Feature not yet available" })
            }
          >
            <div className="flex items-center justify-start w-full">
              <FcGoogle size={15} />
              <span className="ml-3">Sign-in with Google</span>
            </div>
          </Button>
          <span className="text-xs place-self-center text-black">Or</span>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const data = Object.fromEntries(new FormData(e.currentTarget));

              const finalData = {
                email: data.email as string,
                password: data.password as string,
              };

              loginRequest.mutate(finalData);
            }}
          >
            <div className="w-full space-y-4 mb-3">
              <CustomInputComponent type="email" name="email" />
              <CustomInputComponent type="password" name="password" />
            </div>
            <Button
              isPending={loginRequest.isPending || profileRequest.isPending}
              className="w-full bg-black rounded-none py-6 text-xs mt-2 font-gotham-medium"
              type="submit"
            >
              {({ isPending }) => (
                <>
                  {isPending && <Spinner color="current" size="sm" />}
                  {isPending ? "Signing in..." : "Sign In"}
                </>
              )}
            </Button>
          </Form>
          <div className="w-full flex flex-col items-end space-y-2 text-black">
            <Link href={"/login/onassis-cash"} className="text-xs underline">
              Log into Onassis Cash
            </Link>
            <Link href={"/login/onassis-host"} className="text-xs underline">
              Log in as a Host
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
