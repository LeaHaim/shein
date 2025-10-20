import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import type { ILogin } from "@/types/auth.types";
import { useState } from "react";

export default function LoginPage() {
  const { loginFunction, error } = useAuth();
  const [user, setUser] = useState<ILogin>({
    email: "",
    password: "",
  });
  function handleClick() {
    //calling hook function with the login to server logic
    loginFunction(user);
    //and that hook will also preform the context updates
  }
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-[550px]">
        <CardHeader>
          <CardTitle className="text-2xl">Login to shop now</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure at
            ipsam aut earum quo incidunt, quasi distinctio! Corrupti, incidunt
            doloremque?
          </CardDescription>
          <br />
          <Label>Your Email</Label>
          <Input
            placeholder="example@gmail.com"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            value={user.email}
          />

          <Label className="mt-5">Your Password</Label>
          <Input
          type="password"
            placeholder="••••••••••"
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            value={user.password}
          />

          <Button className="mt-2" onClick={handleClick}>
            Login
          </Button>
          {error ? <div className="text-red-500 text-sm font-semibold">{error}</div> : null}
        </CardHeader>
      </div>
    </div>
  );
}
