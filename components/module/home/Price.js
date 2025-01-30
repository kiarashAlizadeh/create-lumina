function Price() {
  const plans = [
    {
      name: "Starter",
      price: "$19",
      priceSuffix: "/month",
      features: ["5 Projects", "Basic Components", "Community Support"],
      buttonText: "Choose Plan",
    },
    {
      name: "Pro",
      price: "$49",
      priceSuffix: "/month",
      features: [
        "Unlimited Projects",
        "Advanced Components",
        "Priority Support",
        "Custom Themes",
      ],
      buttonText: "Choose Plan",
    },
    {
      name: "Enterprise",
      price: "Custom",
      priceSuffix: "",
      features: [
        "All Pro Features",
        "Dedicated Support",
        "Custom Development",
        "SLA",
      ],
      buttonText: "Contact Us",
    },
  ]

  return `
<section class="mb-16">
    <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
    Choose Your Plan
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    ${plans
      .map(
        (plan, index) =>
          `<div
        key={index}
        class="bg-white p-6 rounded-lg shadow-md hover:scale-110 flex flex-col 
         transition-all duration-500   border-2 border-transparent hover:border-indigo-600 "
        >
        <h3 class="text-xl font-semibold text-gray-800 mb-2">
            ${plan.name}
        </h3>
        <p class="text-3xl font-bold text-indigo-600 mb-4">
            ${plan.price}
            <span class="text-sm text-gray-600">${plan.priceSuffix}</span>
        </p>
        <ul class="mb-6 flex-grow">
            ${plan.features
              .map(
                (feature, i) =>
                  ` <li key={i} class="mb-2">
                ✅ ${feature}
            </li>`
              )
              .join("")}
        </ul>
        <a
            href="#"
            class="bg-indigo-600 text-white px-4 py-2 rounded text-center hover:bg-indigo-700 transition"
        >
            ${plan.buttonText}
        </a>
        </div>`
      )
      .join("")}
    </div>
</section>
    `
}

export default Price
