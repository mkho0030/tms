import { useRouter } from "next/router";
import React, { useState } from "react";
import { useToast } from "../providers/ToastContext";

const useTeam = () => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setToast } = useToast();

  const handleJoinTeam = async ({ link }: { link: string }) => {
    try {
      setIsLoading(true);
      const teamId = link.split("/")[3];
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/test/team/join/${teamId}`,
        {
          method: "POST",
          body: JSON.stringify({ user: "" }),
        }
      );

      const { data } = await req.json();
      const { id } = data;

      if (!id) throw Error("Team not found");

      setToast({
        message: "Team successfully joined",
        type: "success",
      });
      setIsLoading(false);
      handleRedirect(id);
    } catch (error) {
      setToast({
        message: (error as Error).message,
        type: "error",
      });

      setIsLoading(false);
    }
  };

  const handleRedirect = (teamId: string) => {
    router.push(`/teams/${teamId}`);
  };

  return { loading, handleJoinTeam };
};

export default useTeam;
