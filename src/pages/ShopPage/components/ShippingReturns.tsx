import { shippingg } from "../../../common/assets/images";
import { shippingInfo } from "../../../common/constants/productDetails";

function ShippingReturns() {
  return (
    <div className="bg-gradient-to-r max-w-7xl mx-auto from-blue-900 to-cyan-400 py-10 px-6 sm:px-16 text-white w-full">
      <p className="text-3xl font-bold">Shipping & Delivery</p>
      <p className="text-lg mt-8">
        All estimated shipping times are in addition to fulfillment times, We
        offer a next working day delivery for orders placed before 6:30 p.m.
        Monday to Friday. Orders placed after this will be delivered within two
        working days. This excludes Saturday, Sunday and holidays. Appointed is
        not responsible for any customs/duties related to international orders.
        We are unable to calculate charges prior to your order being delivered,
        and recommend checking with your local customs office for more
        information. Shipping fees will not be refunded if you refuse these
        charges
      </p>
      <section className="flex flex-col sm:flex-row items-center justify-between py-6 gap-8">
        <div className="w-full sm:w-2/3">
          {shippingInfo.map((info, index) => (
            <ul
              key={index}
              className="rounded-lg overflow-hidden transition-shadow duration-300 pl-5 whitespace-break-spaces"
            >
              <li className="list-disc mb-1 text-lg">{info.text}</li>
            </ul>
          ))}
        </div>
        <div className="w-full sm:w-1/3 ">
          <img
            src={shippingg}
            alt="FAQ"
            loading="lazy"
            className="object-contain w-full"
          />
        </div>
      </section>
      <p className="text-3xl font-bold">Returns & Refunds</p>
      <p className="text-lg mt-8">
        We have a 14-day return policy, which means you have 14 days after
        receiving your item to request a return, To be eligible for a return,
        your item must be in the same condition that you received it, unused,
        and in its original packaging. You’ll also need the order confirmation,
        order number, or proof of purchase. We will notify you once we’ve
        received and inspected your return, and let you know if the refund was
        approved or not. If approved, you’ll be automatically refunded on your
        original payment method. Please remember it can take some time for your
        bank or credit card company to process and post the refund too.
      </p>
    </div>
  );
}

export default ShippingReturns;
