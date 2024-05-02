import Login from "@/src/components/Login/Login";
import LoginPlaceholder from "@/src/components/Login/LoginPlaceholder";
import { Suspense } from "react";

export default function LoginPage() {
    return (<main>
        <Suspense fallback={<LoginPlaceholder />}>
            <Login />
        </Suspense>
    </main>);
}
