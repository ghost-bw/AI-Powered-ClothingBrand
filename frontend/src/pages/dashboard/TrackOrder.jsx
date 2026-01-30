import {
  FaCheckCircle,
  FaBox,
  FaTruck,
  FaMapMarkerAlt,
  FaHome,
  FaPhoneAlt,
} from "react-icons/fa";

export default function TrackOrder() {
  const order = {
    id: "ORD12345",
    placedOn: "26 Jan 2026",
    expectedDelivery: "31 Jan 2026",
    courier: "Akhil Logistics",
    trackingId: "AKL-998877",
    address: "Ashirwad Kumar, Delhi, India",
    items: [
      {
        name: "Premium Black Hoodie",
        qty: 1,
        price: 2499,
        image:
          "https://tse1.mm.bing.net/th/id/OIP.NwIspE8XpblVsI9ThrT4JwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
      },
    ],
  };

  const steps = [
    {
      label: "Order Confirmed",
      date: "26 Jan 2026",
      done: true,
      icon: <FaCheckCircle />,
    },
    { label: "Packed", date: "27 Jan 2026", done: true, icon: <FaBox /> },
    { label: "Shipped", date: "28 Jan 2026", done: true, icon: <FaTruck /> },
    {
      label: "Out for Delivery",
      date: "31 Jan 2026",
      current: true,
      icon: <FaMapMarkerAlt />,
    },
    { label: "Delivered", date: "Expected 31 Jan 2026", icon: <FaHome /> },
  ];

  return (
    <div className="space-y-6">
      {/* ORDER SUMMARY */}
      <div className="bg-white rounded-xl border p-5">
        <h2 className="text-xl font-semibold">Track Your Order</h2>
        <div className="mt-2 text-sm text-gray-600 flex flex-wrap gap-4">
          <span>
            Order ID: <b>#{order.id}</b>
          </span>
          <span>Placed on: {order.placedOn}</span>
          <span className="text-green-600 font-medium">
            Expected Delivery: {order.expectedDelivery}
          </span>
        </div>
      </div>

      {/* TRACKING TIMELINE */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold mb-6">Order Status</h3>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gray-200"></div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full z-10
                  ${
                    step.done
                      ? "bg-green-500 text-white"
                      : step.current
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step.icon}
                </div>

                <div>
                  <p
                    className={`font-medium ${
                      step.current ? "text-blue-600" : ""
                    }`}
                  >
                    {step.label}
                  </p>
                  <p className="text-sm text-gray-500">{step.date}</p>

                  {step.current && (
                    <span className="inline-block mt-1 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      Current Status
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DETAILS GRID */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* ADDRESS */}
        <div className="bg-white rounded-xl border p-5">
          <h4 className="font-semibold mb-2">Delivery Address</h4>
          <p className="text-sm text-gray-600">{order.address}</p>
        </div>

        {/* COURIER */}
        <div className="bg-white rounded-xl border p-5">
          <h4 className="font-semibold mb-2">Courier Partner</h4>
          <p className="text-sm">{order.courier}</p>
          <p className="text-xs text-gray-500 mt-1">
            Tracking ID: {order.trackingId}
          </p>
        </div>

        {/* HELP */}
        <div className="bg-green-600 text-white rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="font-semibold">Need Help?</h4>
            <p className="text-sm opacity-90 mt-1">
              Contact our support team for delivery issues
            </p>
          </div>

          <button className="mt-4 bg-white text-green-600 text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2">
            <FaPhoneAlt /> Contact Support
          </button>
        </div>
      </div>

      {/* ORDER ITEMS */}
      <div className="bg-white rounded-xl border p-6">
        <h3 className="font-semibold mb-4">Ordered Items</h3>

        {order.items.map((item, index) => (
          <div key={index} className="flex gap-4 items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-lg border"
            />
            <div className="flex-1">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.qty}</p>
            </div>
            <p className="font-semibold">₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
