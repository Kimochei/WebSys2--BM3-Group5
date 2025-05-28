const HomePage = ({ setPage }) => {
  return (
    <div className="p-6 md:p-10 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">Group 5 - LE 1.2 Exam App</h2>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Members:</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-1">
          <li>Bonzi James Mendez</li>
          <li>Christian de Gala</li>
          <li>Clark Paglinawan</li>
          <li>Kim Miguel Sobrepeña</li>
          <li>Mark Branon Acpal</li>
          <li>Richard Pua</li>
        </ul>
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => setPage('EXAM_START')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-150 ease-in-out transform hover:scale-105"
        >
          Take the Exam
        </button>
      </div>
    </div>
  );
};