import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChartBar, FaDollarSign, FaUserPlus, FaUsers } from "react-icons/fa";
import StatsCard from "./StatsCard";
import { Package, Receipt, ShoppingCart, Tag, User } from "lucide-react";
import ChartCard from "./ChartCard";

const Dashboard = () => {
  const [data, setData] = useState({
    products: 0,
    categories: 0,
    orders: 0,
    payments: 0,
    users: 0,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statsData = [
    {
      icon: <Package className="text-gray-800 text-xl"size={30} />,
      title: "Products",
      value: `${data.products}`,
      href:'/admin/products'
    },
    {
      icon: <Tag className="text-gray-800 text-xl" size={30}/>,
      title: "Categories",
      value: `${data.categories}`,
      percentage: 3,
      description: "than last month",
      isPositive: true,
      href:'/admin/categories'
    },
    {
      icon: <ShoppingCart className="text-gray-800 text-xl" size={30}/>,
      title: "Orders",
      value: `${data.orders}`,
      percentage: 2,
      description: "than yesterday",
      isPositive: false,
      href:'/admin/orders'
    },
    {
      icon: <User className="text-gray-800 text-xl" size={30} />,
      title: "Users",
      value: `${data.users}`,
      percentage: 5,
      description: "than yesterday",
      isPositive: true,
      href:'/admin/users'
    },
    {
      icon: <Receipt className="text-gray-800 text-xl"size={30} />,
      title: "Payments",
      value: `${data.payments}`,
      percentage: 5,
      description: "than yesterday",
      isPositive: true,
      href:'/admin/payments'
    },
  ];

  const ChartData = [
    {
      title: "Website View",
      chartType: "bar",
      chartData: {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        datasets: [
          {
            label: "Views",
            data: [40, 10, 5, 25, 50, 40, 30],
            backgroundColor: 'rgba(76, 175, 80, 0.8)',
            barThickness: 10,
            borderRadius: 5, 
          },
        ],
      },
      description: "Last Campaign Performance",
      updatedAt: "campaign sent 2 days ago",
    },
    {
      title: "Daily Sales",
      chartType: "line",
      chartData: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Sales",
            data: [0, 100, 200, 300, 400, 500, 400, 500, 600],
            borderColor: "rgba(54, 162, 235, 1)",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            fill: true,
          },
        ],
      },
      description: "15% increase in today's sales",
      updatedAt: "updated 4 min ago",
    },
    {
      title: "Completed Tasks",
      chartType: "line",
      chartData: {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
          {
            label: "Tasks",
            data: [0, 100, 200, 300, 400, 500, 400, 450, 500],
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            fill: true,
          },
        ],
      },
      description: "Last Campaign Performance",
      updatedAt: "just updated",
    },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6 p-6 bg-gray-100">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            href={stat.href}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-6 p-6 bg-gray-100">
      {ChartData.map((stat, index) => (
        <ChartCard
          key={index}
          title={stat.title}
          chartType={stat.chartType}
          chartData={stat.chartData}
          description={stat.description}
          updatedAt={stat.updatedAt}
        />
      ))}
    </div>
    </>
  );
};

export default Dashboard;
