import { RouterProvider, createBrowserRouter } from "react-router-dom";
import TokenizeCarPage from "@/pages/TokenizeCarPage";
import CarInfoPage from "@/pages/CarInfoPage";
import SendNFTPage from "@/pages/SendNFTPage";
import SellCarPage from "@/pages/SellCarPage";
import CarLoanPage from "@/pages/CarLoanPage";
import InsuranceAIPage from "@/pages/InsuranceAIPage";
import InsuranceClaimPage from "@/pages/InsuranceClaimPage";
import DashboardPage from "@/pages/DashboardPage";
import Layout from "@/components/Layout";
import Login from "@/pages/Login";

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Login /> },
        { path: "/tokenize-car", element: <TokenizeCarPage /> },
        { path: "/car-info", element: <CarInfoPage /> },
        { path: "/send-nft", element: <SendNFTPage /> },
        { path: "/sell-car", element: <SellCarPage /> },
        { path: "/car-loan", element: <CarLoanPage /> },
        { path: "/insurance-ai", element: <InsuranceAIPage /> },
        { path: "/insurance-claim", element: <InsuranceClaimPage /> },
        { path: "/dashboard", element: <DashboardPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRouter;
