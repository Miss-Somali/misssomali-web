import Breadcrumb from "@/components/dashboard/Breadcrumbs/Breadcrumb";
import { ShowcaseSection } from "@/components/dashboard/Layouts/showcase-section";

type PlaceholderPageProps = {
  pageName: string;
};

export function PlaceholderPage({ pageName }: PlaceholderPageProps) {
  return (
    <>
      <Breadcrumb pageName={pageName} />

      <ShowcaseSection title={pageName} className="p-6.5!">
        <div className="rounded-lg border border-stroke bg-gray-1 px-6 py-10 text-center dark:border-dark-3 dark:bg-dark-2">
          <h2 className="mb-2 text-xl font-bold text-dark dark:text-white">
            {pageName}
          </h2>
          <p className="mx-auto max-w-xl font-medium text-dark-5 dark:text-dark-6">
            This placeholder uses the dashboard template layout and component
            system. Content can be added later.
          </p>
        </div>
      </ShowcaseSection>
    </>
  );
}
