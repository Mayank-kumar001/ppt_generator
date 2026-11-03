import { authClient } from "#/lib/auth-client";
import { LogOut, User } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link, useRouter } from "@tanstack/react-router";

export function Navbar() {
    const router = useRouter()
    const { data: session, isPending } = authClient.useSession()
    const handleSignOut = () => {
        authClient.signOut()
        router.navigate({ to: '/login' })
    }
  return (
    <div className="flex justify-between items-center  min-w-6xl h-fit py-1">
      <div className="font-semibold text-6xl text-[#c70036] tracking-tighter">
        DELTA
      </div>
      <div className="flex gap-4">
        <ModeToggle />
        
        

        {isPending ? (
              <div className="size-9 rounded-full bg-muted animate-pulse" />
            ) : session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="relative size-9 rounded-full p-0"
                    />
                  }
                >
                  <Avatar className="size-9 border-2 border-primary/30">
                    <AvatarImage
                      src={session.user.image!}
                      alt={session.user.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium">
                      {session.user.name ? (
                        session.user.name.charAt(0).toUpperCase()
                      ) : (
                        <User className="size-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 glass border-border/50"
                >
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{session.user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="text-destructive focus:text-destructive cursor-pointer"
                  >
                    <LogOut className="mr-2 size-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                size="sm"
                className="rounded-xl"
                render={<Link to="/login" />}
              >
                Sign in
              </Button>
            )}
      </div>
    </div>
  );
}
