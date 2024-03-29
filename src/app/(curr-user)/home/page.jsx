import HomeBorderHeader from "@/src/components/BorderHeaders/HomeBorderHeader";
import Dashboard from "@/src/components/Dashboard/Dashboard";

export default function AccountHome() {
    return (<HomeBorderHeader linkTarget="/home">
        <Dashboard />
    </HomeBorderHeader>);
}