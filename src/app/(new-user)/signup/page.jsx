import Signup from "@/src/components/Signup/Signup";
import SignupPlaceholder from "@/src/components/Signup/SignupPlaceholder";
import { Suspense } from "react";

export default function SignupPage() {
    return (<main>
        <Suspense fallback={<SignupPlaceholder />}>
            <Signup />
        </Suspense>
    </main>);
}