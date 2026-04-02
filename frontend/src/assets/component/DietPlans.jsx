import React, { useState } from "react";

function DietPlans() {

  const [goal, setGoal] = useState("muscle");
  const [type, setType] = useState("veg");

  const plans = {
    muscle: {
      veg: [
        { title: "Meal 1", food: "Oats + Peanut Butter + Banana" },
        { title: "Meal 2", food: "Paneer + Brown Rice + Vegetables" },
        { title: "Meal 3", food: "Lentils + Quinoa + Salad" },
        { title: "Meal 4", food: "Greek Yogurt + Almonds" },
      ],
      nonveg: [
        { title: "Meal 1", food: "Chicken + Rice + Vegetables" },
        { title: "Meal 2", food: "Egg Omelette + Whole Wheat Bread" },
        { title: "Meal 3", food: "Grilled Fish + Sweet Potato" },
        { title: "Meal 4", food: "Protein Shake + Banana" },
      ],
    },

    fat: {
      veg: [
        { title: "Meal 1", food: "Oats + Chia Seeds" },
        { title: "Meal 2", food: "Vegetable Salad + Tofu" },
        { title: "Meal 3", food: "Boiled Chickpeas + Lemon" },
        { title: "Meal 4", food: "Green Smoothie" },
      ],
      nonveg: [
        { title: "Meal 1", food: "Grilled Chicken Salad" },
        { title: "Meal 2", food: "Boiled Eggs + Avocado" },
        { title: "Meal 3", food: "Fish + Steamed Broccoli" },
        { title: "Meal 4", food: "Protein Shake" },
      ],
    },

    maintain: {
      veg: [
        { title: "Meal 1", food: "Chapati + Paneer + Vegetables" },
        { title: "Meal 2", food: "Oats + Fruits" },
        { title: "Meal 3", food: "Dal + Rice + Salad" },
        { title: "Meal 4", food: "Nuts + Yogurt" },
      ],
      nonveg: [
        { title: "Meal 1", food: "Chicken + Rice + Vegetables" },
        { title: "Meal 2", food: "Eggs + Toast" },
        { title: "Meal 3", food: "Fish + Sweet Potato" },
        { title: "Meal 4", food: "Protein Smoothie" },
      ],
    },
  };

  return (
    <section className="bg-black text-white min-h-screen py-20 px-6">

      <div className="max-w-7xl mx-auto text-center">

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Smart <span className="text-red-500">Diet Plans</span>
        </h1>

        <p className="text-gray-400 mb-10">
          Choose your goal and diet type to get a personalized meal plan.
        </p>

        {/* Goal Buttons */}

        <div className="flex justify-center flex-wrap gap-4 mb-6">

          <button
            onClick={() => setGoal("muscle")}
            className={`px-6 py-2 rounded-lg ${
              goal === "muscle" ? "bg-red-600" : "bg-zinc-800"
            }`}
          >
            Muscle Gain
          </button>

          <button
            onClick={() => setGoal("fat")}
            className={`px-6 py-2 rounded-lg ${
              goal === "fat" ? "bg-red-600" : "bg-zinc-800"
            }`}
          >
            Fat Loss
          </button>

          <button
            onClick={() => setGoal("maintain")}
            className={`px-6 py-2 rounded-lg ${
              goal === "maintain" ? "bg-red-600" : "bg-zinc-800"
            }`}
          >
            Maintain Body
          </button>

        </div>

        {/* Diet Type Buttons */}

        <div className="flex justify-center gap-4 mb-14">

          <button
            onClick={() => setType("veg")}
            className={`px-6 py-2 rounded-lg ${
              type === "veg" ? "bg-green-600" : "bg-zinc-800"
            }`}
          >
            Veg
          </button>

          <button
            onClick={() => setType("nonveg")}
            className={`px-6 py-2 rounded-lg ${
              type === "nonveg" ? "bg-red-600" : "bg-zinc-800"
            }`}
          >
            Non-Veg
          </button>

        </div>

        {/* Meal Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {plans[goal][type].map((meal, index) => (

            <div
              key={index}
              className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 hover:border-red-500 hover:scale-105 transition"
            >

              <h3 className="text-xl font-semibold text-red-500 mb-3">
                {meal.title}
              </h3>

              <p className="text-gray-400">
                {meal.food}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}

export default DietPlans;