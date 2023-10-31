import SignedOutHeader from "@/src/components/SignedOutHeader";

export default function NewUserHeader({ children }) {
  return (<>
    <header>
      <SignedOutHeader/>
    </header>
    {children}
  </>);
}