import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

export default function App() {
  const [cars, setCars] = useState([]);
  const [model, setModel] = useState("");
  const [vin, setVin] = useState("");
  const [plate, setPlate] = useState("");
  const [year, setYear] = useState(2018);
  const [mileage, setMileage] = useState(0);

  // Отримання списку авто
  const fetchCars = async () => {
    try {
      const res = await axios.get(`${API_URL}/cars`);
      setCars(res.data);
    } catch (err) {
      console.error("Помилка завантаження авто:", err);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Додавання нового авто
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/cars`, {
        model: model,
        vin: vin,
        plate_number: parseInt(plate),
        year: parseInt(year),
        mileage: parseInt(mileage),
        status: "available",
      });
      // Очищуємо поля форми і перечитуємо дані
      setModel("");
      setVin("");
      setPlate("");
      setMileage(0);
      fetchCars();
    } catch (err) {
      alert("Не вдалося додати авто. Перевірте, чи бекенд запущений і чи увімкнено Auto Increment для id_car в базі.");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
      <h1 style={{ color: "#0f172a", marginBottom: "8px" }}>🚗 Автопарк підприємства</h1>
      <p style={{ color: "#64748b", marginBottom: "25px" }}>Система обліку, контролю та оптимізації роботи транспорту</p>

      {/* Форма додавання авто */}
      <div style={{ background: "#ffffff", padding: "20px", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", marginBottom: "30px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "15px", color: "#334155" }}>Додати новий автомобіль</h3>
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px" }}>
          <input
            placeholder="Модель (напр. Renault Megane)"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
          />
          <input
            placeholder="VIN-код"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            required
            style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
          />
          <input
            placeholder="Номерний знак"
            type="number"
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            required
            style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
          />
          <input
            placeholder="Рік випуску"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
          />
          <input
            placeholder="Пробіг (км)"
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            required
            style={{ padding: "8px 12px", border: "1px solid #cbd5e1", borderRadius: "4px" }}
          />
          <button
            type="submit"
            style={{
              padding: "8px 16px",
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            + Зберегти
          </button>
        </form>
      </div>

      {/* Таблиця списку авто */}
      <div style={{ background: "#ffffff", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "#f1f5f9", borderBottom: "1px solid #e2e8f0" }}>
              <th style={{ padding: "12px 16px", color: "#475569" }}>ID</th>
              <th style={{ padding: "12px 16px", color: "#475569" }}>Модель</th>
              <th style={{ padding: "12px 16px", color: "#475569" }}>Рік</th>
              <th style={{ padding: "12px 16px", color: "#475569" }}>VIN</th>
              <th style={{ padding: "12px 16px", color: "#475569" }}>Номерний знак</th>
              <th style={{ padding: "12px 16px", color: "#475569" }}>Пробіг</th>
              <th style={{ padding: "12px 16px", color: "#475569" }}>Статус</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "25px", color: "#94a3b8" }}>
                  Автомобілів ще не додано. Скористайтеся формою вище або Swagger API.
                </td>
              </tr>
            ) : (
              cars.map((c) => (
                <tr key={c.id_car} style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "12px 16px" }}>{c.id_car}</td>
                  <td style={{ padding: "12px 16px", fontWeight: "600" }}>{c.model}</td>
                  <td style={{ padding: "12px 16px" }}>{c.year}</td>
                  <td style={{ padding: "12px 16px", fontFamily: "monospace" }}>{c.vin}</td>
                  <td style={{ padding: "12px 16px" }}>{c.plate_number}</td>
                  <td style={{ padding: "12px 16px" }}>{c.mileage.toLocaleString()} км</td>
                  <td style={{ padding: "12px 16px" }}>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600",
                        background: c.status === "available" ? "#dcfce7" : "#fef3c7",
                        color: c.status === "available" ? "#166534" : "#92400e",
                      }}
                    >
                      {c.status === "available" ? "Вільний" : c.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}