"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createLogin, login } from "@/services/login";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { usuarioPost } from "@/services/usuario";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [newError, setNewError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success = await login(email, password);
    if (success) {
      router.push("/dashboard");
    } else {
      setError("Credenciais inválidas");
    }
  };

  const handleSubmitNewAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewError("");
    const success = await createLogin(newEmail, newPassword);

    if (success) {
      const newAccount = {
        email: newEmail,
      };
      await usuarioPost(newAccount);
      setIsOpen(false);
      toast.success("Usuário", {
        description: "Usuário criado com sucesso",
      });
    } else {
      toast.error("Usuário", {
        description: "Não foi criar o usuário",
      });
      setNewError("Não foi criar o usuário");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="space-y-4 w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">{t("login.title")}</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder={t("login.placeholderEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder={t("login.placeholderPassword")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="w-full">
            {t("login.buttonEnter")}
          </Button>
        </form>
      </div>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="w-auto ml-5 dark:text-purple-600 dark:hover:bg-purple-300"
            onClick={() => setIsOpen(true)}
          >
            {t("login.buttonCreateAccount")}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Criar nova conta</DrawerTitle>
            <DrawerDescription>
              Preencha os campos abaixo para criar sua conta.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            {newError && <p className="text-red-500 text-center">{newError}</p>}
            <form onSubmit={handleSubmitNewAccount} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Senha"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="secondary"
                className="w-auto dark:text-purple-600 dark:hover:bg-purple-300 mr-5"
              >
                Criar conta
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </form>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
