import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa6";
import { signIn } from "next-auth/react";

interface OAuthProviderBtnProps {
  provider: "Google" | "Facebook" | "Github";
}

export default function OAuthProviderBtn({ provider }: OAuthProviderBtnProps) {
  const ProviderIcon = () => {
    switch (provider) {
      case "Facebook":
        return <FaFacebook className="mr-2 text-[#4267B2]" size={25} />;
      case "Google":
        return <FcGoogle className="mr-2" size={25} />;
      case "Github":
        return <FaGithub className="mr-2" size={25} />;
    }
  };

  return (
    <button
      type="button"
      className="w-full px-3 sm:px-6 py-3 sm:py-4 border border-white hover:bg-white hover:text-base-100 transition rounded-md flex flex-wrap items-center justify-center font-semibold text-sm sm:text-md"
      onClick={() => signIn(provider.toLowerCase(), { callbackUrl: "/media" })}
    >
      <ProviderIcon /> Sign In with {provider}
    </button>
  );
}
