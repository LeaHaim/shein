import { Button } from "@/components/ui/button";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IRegister } from "@/types/auth.types";
import { useState } from "react";
export default function RegisterPage() {
    const [user, setUser] = useState<IRegister>({
      name:"",
      email: "",
      password: "",
    });
  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-[550px]">
        <CardHeader>
          <CardTitle className="text-2xl">
            Register to explore new things
          </CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure at
            ipsam aut earum quo incidunt, quasi distinctio! Corrupti, incidunt
            doloremque?
          </CardDescription>
          <br />
          <Label>Your Name</Label>
          <Input placeholder="Israel Israeli" onChange={(e) =>
              setUser((prev) => ({ ...prev, name: e.target.value }))
            } value={user.name} />

          <Label className="mt-5">Your Email</Label>
          <Input placeholder="example@gmail.com" onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            } value={user.email} />

          <Label className="mt-5">Your Password</Label>
          <Input type="password" placeholder="••••••••••" onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            } value={user.password}/>

          <Button className="mt-2">Register Now</Button>
        </CardHeader>
      </div>
      {JSON.stringify(user)}
    </div>
  );
}
