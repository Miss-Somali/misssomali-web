import Breadcrumb from "@/components/dashboard/Breadcrumbs/Breadcrumb";
import { InvoiceTable } from "@/components/dashboard/Tables/invoice-table";
import { TopChannels } from "@/components/dashboard/Tables/top-channels";
import { TopChannelsSkeleton } from "@/components/dashboard/Tables/top-channels/skeleton";
import { TopProducts } from "@/components/dashboard/Tables/top-products";
import { TopProductsSkeleton } from "@/components/dashboard/Tables/top-products/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="space-y-10">
        <Suspense fallback={<TopChannelsSkeleton />}>
          <TopChannels />
        </Suspense>
        
        <Suspense fallback={<TopProductsSkeleton />}>
          <TopProducts />
        </Suspense>

        <InvoiceTable />
      </div>
    </>
  );
};

export default TablesPage;
