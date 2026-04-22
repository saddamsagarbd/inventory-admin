import { useEffect, useState } from "react";
import Toast from "../../components/Toast";
import { UnitList } from "./units/components/UnitList";
import { UnitForm } from "./units/components/UnitForm";
import api from "../../config/axiosConfig";

/* ─── ROOT APP ────────────────────────────────── */
export default function UnitManagement() {
  const [units, setUnits] = useState([]);
  const [view, setView] = useState("list"); // "list" | "add" | "edit"
  const [editData, setEditData] = useState(null);
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3000);
  };

  const handleAdd = () => {
    setEditData(null);
    setView("add");
  };
  const handleEdit = (unit) => {
    setEditData(unit);
    setView("edit");
  };
  const handleCancel = () => {
    setView("list");
    setEditData(null);
  };

  const handleSave = async (formData) => {

    if (editData) {
      const result = await api.put(`/units/${editData.id}`, formData);
      setUnits((units) => units.map((unit) => 
        {
          if(!result.data.unit) return false;
          return unit.id === result.data.unit.id ? result.data.unit : unit
        }
      ));
    } else {
      const result = await api.post('/units/create', formData);
      setUnits((units) => [...units, result.data.unit]);
    }

    setView("list");

  };

  const handleDelete = (ids) => {
    setUnits((units) => units.filter((c) => !ids.includes(c.id)));
  };

  useEffect(()=>{

    const loadUnits = async () => {
      try {
        const result = await api.get('/units');
        if(result.data.units) setUnits(result.data.units);
      } catch (error) {
        console.log(error.message)
      }

    }

    loadUnits();

  }, []);

  return (
    <div
      className="min-h-screen bg-gray-50 p-6"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        {view === "list" && (
          <UnitList
            units={units}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAdd={handleAdd}
            showToast={showToast}
          />
        )}
        {(view === "add" || view === "edit") && (
          <UnitForm
            editData={editData}
            onSave={handleSave}
            onCancel={handleCancel}
            showToast={showToast}
          />
        )}
      </div>
      <Toast toasts={toasts} />
    </div>
  );
}
