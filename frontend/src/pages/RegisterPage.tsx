import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
export default function RegisterPage() {
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
          <Input placeholder="Israel Israeli" />

          <Label className="mt-5">Your Email</Label>
          <Input placeholder="••••••••••" />

          <Label className="mt-5">Your Password</Label>
          <Input type="password" placeholder="••••••••••" />

          <Button className="mt-2">Register Now</Button>
        </CardHeader>
      </div>
    </div>
  );
}
