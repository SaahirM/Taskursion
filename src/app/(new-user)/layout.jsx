import HomeBorderHeader from "@/src/components/BorderHeaders/HomeBorderHeader";

export default function NewUserHeader({ children }) {
    return (<HomeBorderHeader>
        {children}
    </HomeBorderHeader>);
}