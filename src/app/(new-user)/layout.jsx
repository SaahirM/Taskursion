import AreCookiesEnabledChecker from "@/src/components/AreCookiesEnabledChecker";
import HomeBorderHeader from "@/src/components/BorderHeaders/HomeBorderHeader";

export default function NewUserHeader({ children }) {
    return (<HomeBorderHeader>
        <AreCookiesEnabledChecker />
        {children}
    </HomeBorderHeader>);
}