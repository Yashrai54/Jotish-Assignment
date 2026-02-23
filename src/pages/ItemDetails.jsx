import React, { useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Webcam from "react-webcam";

const ItemDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const webcamRef = useRef(null);
    const [img, setImg] = useState(null);

    const { item, index } = location.state || {};

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
    };

    const retake = () => {
        setImg(null);
    };

    if (!item) return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                <p className="text-gray-500 text-sm">No item data found.</p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors duration-200"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-xl mx-auto flex flex-col gap-6">

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-150"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <h1 className="text-2xl font-bold text-gray-800">Item Details</h1>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Entry #{index + 1}
                    </h2>
                    <ul className="divide-y divide-gray-100">
                        {item.map((value, i) => (
                            <li key={i} className="py-2 text-sm text-gray-700">
                                <span className="text-gray-400 font-medium mr-2">Field {i + 1}:</span>
                                {value}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide self-start">
                        Photo Capture
                    </h2>

                    {!img ? (
                        <>
                            <Webcam
                                ref={webcamRef}
                                screenshotFormat="image/png"
                                className="rounded-xl w-full object-cover"
                            />
                            <button
                                onClick={capture}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Capture Photo
                            </button>
                        </>
                    ) : (
                        <>
                            <img
                                src={img}
                                alt="Captured"
                                className="rounded-xl w-full object-cover shadow-sm"
                            />
                            <button
                                onClick={retake}
                                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Retake
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}

export default ItemDetails;