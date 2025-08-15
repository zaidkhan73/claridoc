import { CheckIcon, Dice1 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PriceType = {
  name: string;
  price: number;
  description: string;
  items: string[];
  id: string;
  paymentLink: string;
  priceId: string;
};

const plans = [
  {
    id: "basic",
    name: "basic",
    price: 10,
    description: "Perfect for ocassional purpose",
    items: [
      "5 PDF summaries per month",
      "Standard processing Speed",
      "Email Support",
    ],
    paymentLink: "",
    priceId: "",
  },
  {
    id: "pro",
    name: "pro",
    price: 20,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    paymentLink: "",
    priceId: "",
  },
];

export default function PricingSection() {
  return (
    <section className="relative overflow-hidden " id="pricing">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500">Pricing</h2>
        </div>
        <div className="relative flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

const PricingCard = ({
  name,
  price,
  items,
  description,
  id,
  paymentLink,
}: PriceType) => {
  return (
    <div className="relative w-full max-w-lg hover:scale-105 transition-transform duration-300 ease-in-out">
      <div
        className={cn(
          "relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 border-[1px] border-gray-500/20 rounded-2xl",
          id === "pro" && "border-rose-500 gap-5 border-2"
        )}
      >
        <div className="flex justify-between  items-center gap-4">
          <div>
            <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs ">/month</p>
          </div>
        </div>
        <div className="space-y-2.5 leading-relaxed text-base flex-1">
          {items.map((items, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <CheckIcon size={18} />
              <span>{items}</span>
            </li>
          ))}
        </div>
        <div className="space-y-2 flex justify-center w-full">
          <Link
            href={paymentLink}
            className={cn(
              "w-full rounded-full flex items-center justify-center gap-2 text-white border-2 py-2 bg-gradient-to-r from-rose-800 via-rose-500 to-rose-800 bg-[length:200%_200%] bg-[position:0%_50%] transition-all duration-500 ease-in-out hover:bg-[position:100%_50%]",
              id === 'pro' ? 'border-rose-900' : 'border-rose-100'
            )}
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};
