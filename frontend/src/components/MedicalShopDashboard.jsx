"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, ChevronRight, BarChart, Droplet, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const MedicalShopDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock data for the dashboard
  const recentOrders = [
    {
      id: 1,
      customer: "Sarah R.",
      items: ["Insulin", "Syringes"],
      total: "$52.99",
      status: "pending",
      date: "2023-10-12",
    },
    {
      id: 2,
      customer: "John D.",
      items: ["Amoxicillin"],
      total: "$12.50",
      status: "completed",
      date: "2023-10-10",
    },
    {
      id: 3,
      customer: "Robert J.",
      items: ["Lisinopril", "Vitamin D"],
      total: "$23.75",
      status: "shipped",
      date: "2023-10-09",
    },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="md:col-span-2 bg-white rounded-3xl shadow-sm p-6 border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
            <Link to="#" className="text-sm text-emerald-500 hover:text-emerald-600 flex items-center">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center p-4 bg-gray-50 rounded-2xl">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${
                    order.status === "pending"
                      ? "bg-yellow-100"
                      : order.status === "completed"
                      ? "bg-emerald-100"
                      : "bg-blue-100"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      order.status === "pending"
                        ? "text-yellow-600"
                        : order.status === "completed"
                        ? "text-emerald-600"
                        : "text-blue-600"
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-800">{order.customer}</h4>
                  <p className="text-xs text-gray-500">
                    {order.items.join(", ")} - {order.date}
                  </p>
                </div>
                <div className="text-sm font-medium text-gray-800">{order.total}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {activeTab === "dashboard" && renderDashboard()}
    </div>
  );
};

export default MedicalShopDashboard;