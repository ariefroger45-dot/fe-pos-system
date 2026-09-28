import React, { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import DashboardSummary from "@/components/DashboardSummary";
import SafeProductList from "@/components/SafeProductList";

export default function Dashboard() {
  return (
    <>
      <div>
        <h1>Dashboard Pages</h1>
        <div className="mt-5">
          <DashboardSummary />
        </div>
        <hr />
        <Suspense
          fallback={
            <div>
              <Skeleton className="w-full h-20 rounded-2xl" />
              <Skeleton className="w-full h-20 rounded-2xl" />
              <Skeleton className="w-full h-20 rounded-2xl" />
            </div>
          }
        >
          <div className="mt-5">
            <SafeProductList />
          </div>
        </Suspense>
      </div>
    </>
  );
}
