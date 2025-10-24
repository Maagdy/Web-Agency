import { sizeGuide } from "../../../common/constants/productDetails";

function SizeGuide() {
  return (
    <div className="bg-gradient-to-r from-[#004b8d] via-[#0078b7] to-[#00b5d8] rounded-md overflow-hidden max-w-7xl mx-auto text-white my-6 sm:my-10 shadow-lg px-2 sm:px-0">
      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-white/10 text-left text-base lg:text-lg">
              <th className="py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 font-semibold">
                Size
              </th>
              <th className="py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 font-semibold text-center">
                USA
              </th>
              <th className="py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 font-semibold text-center">
                Europe
              </th>
              <th className="py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 font-semibold text-center">
                Others
              </th>
            </tr>
          </thead>
          <tbody className="text-white/90">
            {sizeGuide.map((row, i) => (
              <tr
                key={i}
                className={`${
                  i % 2 === 0 ? "bg-white/5" : "bg-white/10"
                } border-b border-white/10`}
              >
                <td className="py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 font-semibold text-left text-sm sm:text-base">
                  {row.size}
                </td>
                <td className="py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 text-center text-sm sm:text-base">
                  {row.usa}
                </td>
                <td className="py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 text-center text-sm sm:text-base">
                  {row.europe}
                </td>
                <td className="py-3 sm:py-4 lg:py-5 px-4 sm:px-6 lg:px-8 text-center text-sm sm:text-base">
                  {row.others}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-4 py-4 px-2">
        {sizeGuide.map((row, i) => (
          <div
            key={i}
            className="bg-white/10 rounded-lg p-4 border border-white/20"
          >
            <div className="text-lg font-bold mb-3 pb-2 border-b border-white/20">
              Size: {row.size}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-white/80">USA:</span>
                <span className="font-medium">{row.usa}</span>
              </div>
              <div className="flex justify-between items-center py-2 bg-white/5 rounded px-2">
                <span className="font-semibold text-white/80">Europe:</span>
                <span className="font-medium">{row.europe}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-white/80">Others:</span>
                <span className="font-medium">{row.others}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SizeGuide;
