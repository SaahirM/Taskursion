import HomeBorderHeader from "@/src/components/BorderHeaders/HomeBorderHeader";

export default function NewUserHeader({ children }) {
    return (<HomeBorderHeader linkTarget="/">
        {children}
    </HomeBorderHeader>);
}