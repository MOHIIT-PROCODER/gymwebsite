function Review() {
  return (
    <div className="bg-[#121212] text-white py-20 px-6 md:px-20">

      <h2 className="text-4xl font-bold text-center mb-12">
        What Our Members Say
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {/* Review 1 */}
        <div className="bg-[#1f1f1f] p-6 rounded-xl">
          <p className="text-gray-300">
            "This gym completely transformed my fitness journey. The trainers are amazing!"
          </p>
          <h3 className="mt-4 font-semibold text-lg">Rahul Sharma</h3>
        </div>

        {/* Review 2 */}
        <div className="bg-[#1f1f1f] p-6 rounded-xl">
          <p className="text-gray-300">
            "Best place to train! Great equipment and friendly environment."
          </p>
          <h3 className="mt-4 font-semibold text-lg">Aman Patel</h3>
        </div>

        {/* Review 3 */}
        <div className="bg-[#1f1f1f] p-6 rounded-xl">
          <p className="text-gray-300">
            "I gained strength and confidence here. Highly recommend!"
          </p>
          <h3 className="mt-4 font-semibold text-lg">Priya Singh</h3>
        </div>

      </div>

    </div>
  );
}

export default Review;