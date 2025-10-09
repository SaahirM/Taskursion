import BorderHeader from "./BorderHeader";

export default function PlainBorderHeader({ disableTopShadow, children }) {
    return <BorderHeader disableTopShadow={disableTopShadow}>{children}</BorderHeader>;
}