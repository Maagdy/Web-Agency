import type { Product } from "../../../hooks/hooks.types";

export const Information: React.FC<{ product: Product }> = ({ product }) => {
  if (!product.information || product.information === null) {
    return null;
  }
  const information = product.information;
  const dtClass =
    "font-bold text-lg hover:text-cyan-200 transition-colors duration-200 cursor-default";
  const ddClass =
    "text-base text-gray-300 hover:text-cyan-100 hover:translate-x-1 transition-all duration-200 cursor-default";
  return (
    <div className="bg-gradient-to-r max-w-7xl mx-auto from-blue-900 to-cyan-400 py-10 px-14 text-white">
      <h1 className="text-2xl font-bold mb-4">Additional information</h1>
      <hr className="opacity-20" />
      <dl className="grid grid-cols-[240px_1fr] gap-y-6 mt-4 p-4">
        <dt className={dtClass}>Weight</dt>
        <dd className={ddClass}>{information.weight}</dd>

        <dt className={dtClass}>Dimensions</dt>
        <dd className={ddClass}>{information.dimensions}</dd>

        <dt className={dtClass}>Product year</dt>
        <dd className={ddClass}>{information.productYear}</dd>

        <dt className={dtClass}>Product Manual</dt>
        <dd className={ddClass}>{information.productManual}</dd>

        <dt className={dtClass}>Refundable</dt>
        <dd className={ddClass}>{information.refundable}</dd>
      </dl>
    </div>
  );
};
