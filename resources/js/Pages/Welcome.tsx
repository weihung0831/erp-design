import { Head } from '@inertiajs/react';

export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
            <main className="flex min-h-screen items-center justify-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <div className="w-full max-w-md space-y-4 text-center">
                    <h1 className="text-3xl font-semibold">Laravel + Inertia + React</h1>
                    <p className="text-sm text-[#706f6c] dark:text-[#A1A09A]">
                        Edit <code className="font-mono">resources/js/Pages/Welcome.tsx</code> to get started.
                    </p>
                </div>
            </main>
        </>
    );
}
