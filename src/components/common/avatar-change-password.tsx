import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface AvatarChangePasswordProps {
  changeLanguage: (lng: string) => void;
}

export function AvatarChangePassword({
  changeLanguage,
}: AvatarChangePasswordProps) {
  return (
    <div className="flex justify-between cursor-pointer">
      <Avatar>
        <AvatarImage src="/usa.png" onClick={() => changeLanguage("en")} />
        <AvatarFallback>usa flag</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/bra.png" onClick={() => changeLanguage("br")} />
        <AvatarFallback>bra flag</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/esp.png" onClick={() => changeLanguage("es")} />
        <AvatarFallback>spa flag</AvatarFallback>
      </Avatar>
    </div>
  );
}
