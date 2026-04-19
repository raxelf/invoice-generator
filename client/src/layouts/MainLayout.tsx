import NavBar from "@/components/NavBarComponent";
import { useRouter } from "next/router";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col">
      {!isLoginPage && <NavBar />}
      <main className="flex-1 flex flex-col">{children}</main>
    </div>
  );
};

export default MainLayout;

