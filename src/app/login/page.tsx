'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { login } from '@/services/login';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const success = await login(email, password);
        console.log("🚀  success - ", success)
        if (success) {
            router.push('/dashboard');
        } else {
            setError('Credenciais inválidas');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-background">
            <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md p-8 bg-card rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center">Login</h1>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full">Entrar</Button>
            </form>
        </div>
    );
}