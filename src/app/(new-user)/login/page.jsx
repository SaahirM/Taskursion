import Login from "@/src/components/Login";
import NotLoggedInMessage from "@/src/components/NotLoggedInMessage";

export default function LoginPage() {
    return (<main>
        <NotLoggedInMessage />
        <Login />
    </main>);
}
