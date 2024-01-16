import Login from "@/src/components/Login";
import LoggedOutMessage from "@/src/components/LoggedOutMessage";

export default function LoginPage() {
    return (<main>
        <LoggedOutMessage />
        <Login />
    </main>);
}
