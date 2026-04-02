import React, { useState } from "react";
import axios from "axios";

function Plans() {

  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      name: "Basic",
      monthly: 999,
      yearly: 8390,
      features: [
        "Access to workout programs",
        "Basic nutrition guide",
        "Community access",
        "Email support"
      ]
    },
    {
      name: "Pro",
      monthly: 1999,
      yearly: 16790,
      features: [
        "Everything in Basic",
        "Personalized workout plan",
        "Custom diet plan",
        "Progress tracking",
        "Priority support"
      ]
    },
    {
      name: "Elite",
      monthly: 3999,
      yearly: 33590,
      features: [
        "Everything in Pro",
        "1-on-1 coaching",
        "Weekly video consultation",
        "Supplement guidance",
        "24/7 support"
      ]
    }
  ];

  const choosePlan = async (plan, type, amount) => {

    try {

      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create",
        { amount: amount * 100 }
      );

      const options = {
        key: "rzp_test_SNB6oJE0JEnxv2",
        amount: data.amount,
        currency: data.currency,
        order_id: data.id,
        name: "Fitips Gym",
        description: `${plan} ${type} Plan`,

        handler: async function (response) {

          const user = JSON.parse(localStorage.getItem("user"));

          await axios.post(
            "http://localhost:5000/api/payment/success",
            {
              name: user.name,
              email: user.email,
              phone: user.phone,
              planName: plan,
              planType: type,
              paymentId: response.razorpay_payment_id
            }
          );

          alert("Payment Successful");

        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {

      alert("Payment Failed");

    }

  };

  return (

    <div className="bg-[#0d0d0d] text-white min-h-screen py-20 px-6 md:px-20">

      <h1 className="text-5xl font-bold text-center mb-4">
        Choose Your <span className="text-red-600">Plan</span>
      </h1>

      <p className="text-center text-gray-400 mb-10">
        Flexible pricing options designed for every fitness level.
      </p>

      {/* Toggle */}

      <div className="flex justify-center mb-14">

        <div className="bg-gray-800 rounded-full p-1 flex">

          <button
            onClick={() => setBilling("monthly")}
            className={`px-6 py-2 rounded-full transition ${
              billing === "monthly"
                ? "bg-red-600"
                : "text-gray-300"
            }`}
          >
            Monthly
          </button>

          <button
            onClick={() => setBilling("yearly")}
            className={`px-6 py-2 rounded-full transition ${
              billing === "yearly"
                ? "bg-red-600"
                : "text-gray-300"
            }`}
          >
            Yearly
          </button>

        </div>

      </div>

      {/* Discount badge */}

      {billing === "yearly" && (
        <p className="text-center text-green-400 mb-10">
          Save 30% with yearly subscription 🎉
        </p>
      )}

      {/* Plans */}

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {plans.map((plan, index) => {

          const price =
            billing === "monthly"
              ? plan.monthly
              : plan.yearly;

          return (

            <div
              key={index}
              className={`bg-[#141414] p-8 rounded-2xl border transition duration-300 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-red-600/20 ${
                plan.name === "Pro"
                  ? "border-red-600 scale-105"
                  : "border-gray-800"
              }`}
            >

              {plan.name === "Pro" && (
                <div className="bg-red-600 text-sm px-3 py-1 rounded-full w-fit mb-4">
                  Most Popular
                </div>
              )}

              {billing === "yearly" && (
                <div className="bg-green-600 text-xs px-3 py-1 rounded-full w-fit mb-3">
                  Save 30%
                </div>
              )}

              <h2 className="text-2xl font-bold mb-4">
                {plan.name}
              </h2>

              <h1 className="text-4xl font-bold mb-6">
                ₹{price}
                <span className="text-gray-400 text-lg">
                  /{billing === "monthly" ? "month" : "year"}
                </span>
              </h1>

              <ul className="space-y-3 text-gray-300 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i}>✓ {f}</li>
                ))}
              </ul>

              <button
                onClick={() =>
                  choosePlan(plan.name, billing, price)
                }
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  plan.name === "Pro"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                {plan.name === "Basic"
                  ? "Get Started"
                  : plan.name === "Pro"
                  ? "Join Pro"
                  : "Go Elite"}
              </button>

            </div>

          );

        })}

      </div>

    </div>

  );

}

export default Plans;