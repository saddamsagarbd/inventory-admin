// components/orders/OrderTimeline.jsx
import React from "react";

const OrderTimeline = ({ timeline }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
      <div className="flow-root">
        <ul className="-mb-8">
          {timeline.map((event, index) => (
            <li key={index} className="relative pb-8">
              {index < timeline.length - 1 && (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center ring-8 ring-white">
                    <svg
                      className="h-4 w-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M8 4a4 4 0 100 8 4 4 0 000-8z" />
                    </svg>
                  </span>
                </div>
                <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                  <div>
                    <p className="text-sm text-gray-900 font-medium">
                      {event.status}
                    </p>
                    {event.note && (
                      <p className="text-sm text-gray-500 mt-1">{event.note}</p>
                    )}
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={event.date}>
                      {new Date(event.date).toLocaleString()}
                    </time>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderTimeline;
