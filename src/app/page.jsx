"use client";
import React from "react";

function MainComponent() {
  const [proxyList, setProxyList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [currentProxy, setCurrentProxy] = React.useState("");

  const generateProxies = async () => {
    setLoading(true);
    const generatedProxies = [
      { id: 1, ip: "192.168.1.100", port: "8081", status: "active" },
      { id: 2, ip: "192.168.1.101", port: "8082", status: "active" },
    ];

    setTimeout(() => {
      setProxyList(generatedProxies);
      setLoading(false);
    }, 2000);
  };

  const setProxyAsCurrent = (proxyId) => {
    const proxy = proxyList.find((proxy) => proxy.id === proxyId);
    if (proxy) {
      setCurrentProxy(`${proxy.ip}:${proxy.port}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f8f9fa]">
      <h1 className="mb-8 text-3xl font-bold text-[#343a40]">AutoProxy</h1>
      <div className="mb-4">
        <button
          className="px-4 py-2 font-semibold text-white bg-[#007bff] rounded hover:bg-[#0056b3]"
          onClick={generateProxies}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Proxies"}
        </button>
      </div>
      <p className="mb-4 font-semibold">
        Current Proxy:{" "}
        <span className="text-green-600">{currentProxy || "None"}</span>
      </p>
      {proxyList.length > 0 && (
        <div className="w-full max-w-[600px]">
          {proxyList.map((proxy) => (
            <div
              key={proxy.id}
              className="flex justify-between p-4 mb-2 bg-white border rounded shadow-sm"
            >
              <span className="font-medium">IP: {proxy.ip}</span>
              <span className="font-medium">Port: {proxy.port}</span>
              <button
                className={`px-3 py-1 font-medium rounded ${
                  proxy.status === "active"
                    ? "text-green-500 bg-green-100 hover:bg-green-200"
                    : "text-red-500 bg-red-100 hover:bg-red-200"
                }`}
                onClick={() => setProxyAsCurrent(proxy.id)}
              >
                Use Proxy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainComponent;