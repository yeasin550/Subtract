import { useState } from 'react';

const MAX_VALUE = 150;
const MIN_VALUE = 0;

const Home = () => {
    const [num, setNum] = useState(0);
    const [history, setHistory] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const handleAdd = () => {
        if (num < MAX_VALUE) {
            setHistory([...history, num]);
            setNum(num + 1);
            setRedoStack([]);
        } else {
            setPopupMessage('Maximum value reached!');
            setShowPopup(true);
        }
    };

    const handleSubtract = () => {
        if (num > MIN_VALUE) {
            setHistory([...history, num]);
            setNum(num - 1);
            setRedoStack([]);
        } else {
            setPopupMessage('Minimum value reached!');
            setShowPopup(true);
        }
    };

    const handleUndo = () => {
        if (history.length > 0) {
            const prevNum = history.pop();
            setRedoStack([num, ...redoStack]);
            setNum(prevNum);
            setHistory([...history]);
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
            const nextNum = redoStack.shift();
            setHistory([...history, num]);
            setNum(nextNum);
            setRedoStack([...redoStack]);
        }
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const progressPercentage = (num / MAX_VALUE) * 100;

    return (
        <div className="p-6 mt-20 max-w-lg mx-auto bg-white shadow-lg rounded-lg border border-gray-300 relative">
            <h1 className="text-2xl font-bold text-center mb-4 text-indigo-600">
                Counter App
            </h1>
            <div className="flex justify-between mb-4">
                <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300"
                    onClick={handleSubtract}
                >
                    Subtract
                </button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300"
                    onClick={handleAdd}
                >
                    Add
                </button>
            </div>
            <div className="relative w-full bg-gray-300 rounded-lg h-8 overflow-hidden mb-4">
                <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg transition-all duration-500 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>
            <p className="text-center mb-4 text-xl font-semibold">
                Current Value: <span className="text-indigo-600">{num}</span>
            </p>
            <div className="flex justify-between">
                <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300"
                    onClick={handleUndo}
                >
                    Undo
                </button>
                <button
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:ring-2 focus:ring-purple-300"
                    onClick={handleRedo}
                >
                    Redo
                </button>
            </div>
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md text-center">
                        <p className="mb-4">{popupMessage}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={handleClosePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
