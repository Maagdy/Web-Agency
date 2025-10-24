import { faq } from "../../../common/assets/images";
import { faqs } from "../../../common/constants/productDetails";

function Faq() {
  return (
    <div className="bg-gradient-to-r max-w-7xl mx-auto from-blue-900 to-cyan-400 py-10 px-16 text-white w-full">
      <p className="text-3xl uppercase font-bold">faq</p>
      <section className="flex flex-col sm:flex-row items-start pt-6 gap-8">
        <div className="w-full sm:w-1/2 ">
          <img
            src={faq}
            alt="FAQ"
            loading="lazy"
            className="object-contain w-full"
          />
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <ul
              key={index}
              className="rounded-lg overflow-hidden transition-shadow duration-300 pl-5 whitespace-break-spaces"
            >
              <li className="font-bold list-disc mb-1">{faq.question}</li>
              <li>{faq.answer}</li>
            </ul>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Faq;
