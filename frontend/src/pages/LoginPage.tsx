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
export default function LoginPage() {
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
          <Input placeholder="example@gmail.com"/>
          
          <Label className="mt-5">Your Password</Label>
          <Input placeholder="••••••••••"/>

          <Button className="mt-2">Login</Button>
        </CardHeader>
      </div>
    </div>
  );
}
