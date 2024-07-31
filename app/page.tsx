import "../styles/globals.css";
import Link from "next/link";
import { DomainAvailabilityChecker } from "./components/DomainAvailabilityChecker";

export default function Page() {
  return (
    <div>
      <Link href="/about">About</Link>
      <DomainAvailabilityChecker />
    </div>
  );
}
